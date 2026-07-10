#!/usr/bin/env bash
# Removes the local infected WordPress dump after the Next.js app is confirmed working.
# Does NOT touch the live cPanel server — clean public_html separately after backup.

set -euo pipefail

DUMP_PATH="${1:-/Users/laxmanbhusal/Downloads/Tuppl}"

echo "============================================================"
echo " Tuppl WordPress dump removal"
echo "============================================================"
echo
echo "This will permanently delete the local infected dump at:"
echo "  $DUMP_PATH"
echo
echo "Only run this AFTER:"
echo "  1. tuppl-web is running and verified locally"
echo "  2. You have deployed the Next.js app (or have a backup)"
echo "  3. You have rotated any credentials exposed in the old wp-config.php"
echo
echo "On the LIVE server you must ALSO:"
echo "  - Backup then delete old WordPress files under public_html"
echo "  - Remove malware files (pan.php, hash-named PHP connectors, etc.)"
echo "  - Rotate DB passwords and WordPress salts if still in use"
echo

if [[ ! -d "$DUMP_PATH" ]]; then
  echo "Path not found: $DUMP_PATH"
  exit 1
fi

read -r -p "Type DELETE to permanently remove the dump: " confirm
if [[ "$confirm" != "DELETE" ]]; then
  echo "Aborted."
  exit 1
fi

rm -rf "$DUMP_PATH"
echo "Removed $DUMP_PATH"
echo "Done."
