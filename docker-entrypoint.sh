#!/bin/sh
set -eu

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"
export PATH="/app/node_modules/.bin:${PATH}"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set"
  exit 1
fi

PRISMA_CLI="node /app/node_modules/prisma/build/index.js"
TSX_CLI="node /app/node_modules/tsx/dist/cli.mjs"

if [ ! -f /app/node_modules/prisma/build/index.js ]; then
  echo "Prisma CLI missing at /app/node_modules/prisma/build/index.js"
  ls -la /app/node_modules 2>/dev/null || true
  exit 1
fi

echo "Waiting for database TCP…"
i=0
until err=$(node -e "
const net = require('net');
const url = new URL(process.env.DATABASE_URL);
const host = url.hostname;
const port = Number(url.port || 5432);
const socket = net.connect({ host, port });
socket.setTimeout(3000);
socket.on('connect', () => { socket.end(); process.exit(0); });
socket.on('timeout', () => { socket.destroy(); console.error('timeout connecting to ' + host + ':' + port); process.exit(1); });
socket.on('error', (e) => { console.error(e.message); process.exit(1); });
" 2>&1); do
  i=$((i + 1))
  if [ "$i" -eq 1 ] || [ $((i % 10)) -eq 0 ]; then
    echo "  still waiting ($i/90): $err"
  fi
  if [ "$i" -ge 90 ]; then
    echo "Database TCP not ready after 90s"
    echo "Last error: $err"
    echo "DATABASE_URL host must be Compose service name (db) and port 5432 inside the network."
    exit 1
  fi
  sleep 1
done

echo "Database TCP is up. Running migrations…"
$PRISMA_CLI migrate deploy

if [ "${SEED_ON_START:-false}" = "true" ]; then
  echo "Seeding database…"
  $TSX_CLI prisma/seed.ts
fi

echo "Starting app on ${HOSTNAME}:${PORT}…"
exec node server.js
