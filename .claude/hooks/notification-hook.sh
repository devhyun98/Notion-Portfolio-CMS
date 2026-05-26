#!/bin/bash
# Claude Code Notification 훅 - 권한 요청 및 사용자 입력 대기 알림
# Python을 사용하여 UTF-8 인코딩 보장

export PYTHONIOENCODING=utf-8

if [ -f "$CLAUDE_PROJECT_DIR/.env" ]; then
    set -a
    source "$CLAUDE_PROJECT_DIR/.env"
    set +a
else
    echo "오류: .env 파일을 찾을 수 없습니다: $CLAUDE_PROJECT_DIR/.env" >&2
    exit 1
fi

if [ -z "$SLACK_WEBHOOK_URL" ]; then
    echo "오류: SLACK_WEBHOOK_URL이 설정되지 않았습니다." >&2
    exit 1
fi

PROJECT_NAME=$(basename "$CLAUDE_PROJECT_DIR")
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# stdin에서 JSON 읽어 message 추출
INPUT=$(cat)
MESSAGE=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data.get('message', ''))
except:
    print('')
" 2>/dev/null || echo "")

echo "DEBUG: MESSAGE = '$MESSAGE'" >&2
echo "DEBUG: PROJECT_NAME = '$PROJECT_NAME'" >&2
echo "DEBUG: TIMESTAMP = '$TIMESTAMP'" >&2

# Python으로 UTF-8 보장하여 Slack 전송
PROJECT_NAME="$PROJECT_NAME" MESSAGE="$MESSAGE" TIMESTAMP="$TIMESTAMP" python3 << 'EOF'
import sys, json, os
from urllib import request, parse

sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

try:
    webhook_url = os.environ['SLACK_WEBHOOK_URL']
    project_name = os.environ.get('PROJECT_NAME', '')
    message = os.environ.get('MESSAGE', '')
    timestamp = os.environ.get('TIMESTAMP', '')

    payload = {
        'channel': '#claude-code',
        'username': 'Claude Code',
        'text': (
            '🔔 권한 요청 알림\n\n'
            '프로젝트: {}\n상태: {}\n시간: {}\n\n'
            'Claude Code에서 알림이 도착했습니다.'
        ).format(project_name, message, timestamp),
        'icon_emoji': ':bell:'
    }

    body = parse.urlencode({'payload': json.dumps(payload, ensure_ascii=False)}).encode('utf-8')
    req = request.Request(webhook_url, data=body, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')

    with request.urlopen(req) as resp:
        print("Slack 알림이 성공적으로 전송되었습니다." if resp.status == 200 else "Slack 알림 전송에 실패했습니다.", file=sys.stderr)
        sys.exit(0 if resp.status == 200 else 1)
except Exception as e:
    print(f"Slack 알림 전송 중 오류 발생: {e}", file=sys.stderr)
    sys.exit(1)
EOF

exit $?