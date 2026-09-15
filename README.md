# I'm Okay

A daily check-in for someone living alone. One tap during the window you set. If that tap does not come, a person you chose is notified.

Flutter client with a Node.js API. Postgres locally via Docker Compose.

## Run

API:

```bash
cd apps/api
cp .env.example .env
npm install
npm run dev
```

API + Postgres:

```bash
docker compose up --build
```

Mobile (iOS, Android, or web):

```bash
cd apps/mobile
flutter pub get
flutter run
```

## API

```
GET  /health
POST /users
PUT  /users/:id/window
GET  /users/:id/window
POST /users/:id/contacts
GET  /users/:id/contacts
POST /users/:id/check-ins
GET  /users/:id/check-ins
```

## Repo

```
apps/api      Express, TypeScript
apps/mobile   Flutter
```
