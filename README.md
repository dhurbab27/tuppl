# Tuppl Web

Next.js rewrite of the Tuppl marketing site with careers filters, Formik application forms, credential auth (bcrypt), and an admin dashboard.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Formik + Yup
- framer-motion
- NextAuth (Credentials) + bcryptjs
- Prisma + PostgreSQL

## Local setup

1. Create a PostgreSQL database (or use Docker):

```bash
docker run -d --name tuppl-pg -e POSTGRES_DB=tuppl -e POSTGRES_USER=tuppl -e POSTGRES_PASSWORD=tupplpass -p 5432:5432 postgres:16-alpine
```

2. Copy env and install:

```bash
cp .env.example .env
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

### Default admin (from seed / env)

- Email: `ADMIN_EMAIL` (default `admin@tuppl.com`)
- Password: `ADMIN_PASSWORD` (default `Admin123!`)

Change these before any production deploy.

## Project structure (atomic design)

```
src/components/atoms|molecules|organisms|templates
src/app/(site)   marketing pages
src/app/(auth)   login / register
src/app/admin    admin dashboard
src/content      static marketing copy
src/lib          prisma, auth, mail, validations
```

## Careers

- `/careers` — filter by department, location, and type
- `/careers/[slug]` — detail + Formik apply (login required)
- Resumes stored under `uploads/resumes/` (not publicly browsable)
- Admins download resumes from `/admin/applications`

## Security notes (infected WordPress dump)

The previous WordPress tree under `Downloads/Tuppl` contained malware indicators (e.g. `pan.php` web console, suspicious root PHP connectors, and a compromised `functions.php`). **Do not port PHP from that dump.**

After this app is verified:

```bash
chmod +x scripts/remove-wordpress-dump.sh
./scripts/remove-wordpress-dump.sh
```

Also rotate any credentials that appeared in the old `wp-config.php` (DB password, salts) if those accounts still exist on the host.

## Docker / GitHub Actions

cPanel deploy is not used. On every push to **`master`**, GitHub Actions builds a production image and publishes it to GHCR:

`ghcr.io/<owner>/<repo>:latest` (and `sha-…` tags)

## Docker Compose (app + PostgreSQL)

```bash
docker compose pull
docker compose up -d
```

- App: http://localhost:3123  
- Postgres host port: `5433` → container `5432`  
- Use a **new** data dir (e.g. `/mnt/mainpool/apps/tuppl/pgdata`) — do not reuse an old MySQL volume  
- On start the web container waits for Postgres, runs `prisma migrate deploy`, seeds when `SEED_ON_START=true`, then starts the app.

```bash
docker compose logs -f web
docker compose down
```

### Pull and run

```bash
docker pull ghcr.io/dhurbab27/tuppl:latest

docker run --rm -p 3000:3000 \
  -e DATABASE_URL="postgresql://USER:PASS@HOST:5432/DB?schema=public" \
  -e NEXTAUTH_SECRET="long-random-string" \
  -e NEXTAUTH_URL="https://your-domain.com" \
  -e ADMIN_EMAIL="admin@tuppl.com" \
  -e ADMIN_PASSWORD="strong-password" \
  -v tuppl-uploads:/app/uploads \
  ghcr.io/dhurbab27/tuppl:latest
```

Run migrations against the same database before or after first start:

```bash
docker run --rm --entrypoint npx \
  -e DATABASE_URL="postgresql://USER:PASS@HOST:5432/DB?schema=public" \
  ghcr.io/dhurbab27/tuppl:latest \
  prisma migrate deploy
```

Package visibility: repo **Settings → Packages** (or make the package public if needed). Actions uses `GITHUB_TOKEN` with `packages: write`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Generate Prisma client + production build |
| `npm run db:migrate` | Create/apply migrations (dev) |
| `npm run db:deploy` | Apply migrations (production) |
| `npm run db:seed` | Seed admin + sample jobs |
| `./scripts/remove-wordpress-dump.sh` | Delete local infected WP dump |

## License

Private — Tuppl.
