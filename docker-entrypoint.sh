#!/bin/sh
set -eu

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"

echo "Waiting for database..."
i=0
until node -e "
const mariadb = require('mariadb');
(async () => {
  const url = new URL(process.env.DATABASE_URL);
  const conn = await mariadb.createConnection({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\\//, ''),
    connectTimeout: 5000,
  });
  await conn.end();
})().catch((e) => { console.error(e.message); process.exit(1); });
" 2>/dev/null; do
  i=$((i + 1))
  if [ "$i" -ge 60 ]; then
    echo "Database not ready after 60s"
    exit 1
  fi
  sleep 1
done

echo "Running migrations..."
npx prisma migrate deploy

if [ "${SEED_ON_START:-false}" = "true" ]; then
  echo "Seeding database..."
  npx tsx prisma/seed.ts
fi

echo "Starting app on ${HOSTNAME}:${PORT}..."
exec node server.js
