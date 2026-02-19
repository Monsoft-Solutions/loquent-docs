#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CRED_FILE="$PROJECT_ROOT/.claude-cred"

if [ $# -lt 2 ]; then
  echo "Usage: $0 <local-file> <destination-path>" >&2
  echo "Example: $0 src/assets/screenshots/getting-started/sign-up-form.png getting-started/sign-up-form.png" >&2
  exit 1
fi

FILE="$1"
DEST="$2"

if [ ! -f "$FILE" ]; then
  echo "Error: File not found: $FILE" >&2
  exit 1
fi

if [ ! -f "$CRED_FILE" ]; then
  echo "Error: Credentials file not found: $CRED_FILE" >&2
  exit 1
fi

TOKEN=$(grep '^BLOB_READ_WRITE_TOKEN=' "$CRED_FILE" | cut -d'=' -f2-)

if [ -z "$TOKEN" ]; then
  echo "Error: BLOB_READ_WRITE_TOKEN not found in $CRED_FILE" >&2
  exit 1
fi

URL=$(BLOB_READ_WRITE_TOKEN="$TOKEN" node "$SCRIPT_DIR/upload-blob.mjs" "$FILE" "$DEST")

echo "$URL"

rm "$FILE"
