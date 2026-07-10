# Tuppl Web

Next.js rewrite of the Tuppl marketing site with careers filters, Formik application forms, credential auth (bcrypt), and an admin dashboard.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Formik + Yup
- framer-motion
- NextAuth (Credentials) + bcryptjs
- Prisma + MySQL

## Local setup

1. Create a MySQL database and user (example already used in local `.env`):

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS tuppl; CREATE USER IF NOT EXISTS 'tuppl'@'localhost' IDENTIFIED BY 'tupplpass'; GRANT ALL ON tuppl.* TO 'tuppl'@'localhost'; FLUSH PRIVILEGES;"
```

2. Copy env and install:

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
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

## cPanel deployment

This repo includes a root [`.cpanel.yml`](.cpanel.yml) so **Git Version Control → Deploy** works. It copies the app to `/home/tuppsxpf/tuppl-web/` (change the username/path in `.cpanel.yml` if your cPanel user differs).

1. **Git Version Control** — Clone or **Update from Remote**, ensure the working tree is clean, then **Deploy HEAD Commit**.
2. **Setup Node.js App** — Application root: `tuppl-web`, startup file: `app.js`, production mode. Bind your domain/subdomain.
3. **Environment** — Add MySQL + auth vars in the Node app environment (or a `.env` on the server only — never commit secrets):

```env
DATABASE_URL="mysql://CPANEL_USER:PASSWORD@localhost:3306/CPANEL_DB"
NEXTAUTH_SECRET="long-random-string"
NEXTAUTH_URL="https://your-domain.com"
ADMIN_EMAIL="admin@your-domain.com"
ADMIN_PASSWORD="strong-password"
CONTACT_TO="info@tuppl.com"
```

4. **Install & migrate** (in the app’s Node virtual environment terminal):

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run build
```

5. **Uploads** — Ensure `uploads/resumes` is writable (`chmod 750 uploads uploads/resumes`). Do not expose that folder via Apache aliases.

6. **Cut over** — Verify HTTPS, careers, login, and admin. Then backup and remove old WordPress files from `public_html` (including malware such as `pan.php`).

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
