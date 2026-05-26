#!/bin/bash
# Claude Code Stop 훅 - 작업 완료 알림
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

# stdin에서 JSON 읽어 hook_event_name 추출
INPUT=$(cat)
REASON=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data.get('hook_event_name', ''))
except:
    print('')
" 2>/dev/null || echo "")

echo "DEBUG: REASON = '$REASON'" >&2
echo "DEBUG: PROJECT_NAME = '$PROJECT_NAME'" >&2
echo "DEBUG: TIMESTAMP = '$TIMESTAMP'" >&2

# Python으로 UTF-8 보장하여 Slack 전송
PROJECT_NAME="$PROJECT_NAME" REASON="$REASON" TIMESTAMP="$TIMESTAMP" python3 << 'EOF'
import sys, json, os
from urllib import request, parse

sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

try:
    webhook_url = os.environ['SLACK_WEBHOOK_URL']
    project_name = os.environ.get('PROJECT_NAME', '')
    reason = os.environ.get('REASON', '')
    timestamp = os.environ.get('TIMESTAMP', '')

    payload = {
        'channel': '#claude-code',
        'username': 'Claude Code',
        'text': (
            '✅ 작업 완료 알림\n\n'
            '프로젝트: {}\n상태: {}\n시간: {}\n\n'
            'Claude Code 작업이 완료되었습니다.'
        ).format(project_name, reason, timestamp),
        'icon_emoji': ':white_check_mark:'
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