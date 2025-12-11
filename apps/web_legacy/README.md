# Google Map Review Analysis App

A high-precision analysis application for Google Map reviews using Vertex AI (Gemini).

## Environment Setup

### Prerequisites
- Docker & Docker Compose
- Node.js (for local script execution)

### Starting the Application
To start the application and the Firestore emulator, run:

```bash
docker-compose up
```

- **App**: http://localhost:3001
- **Firestore Emulator**: localhost:8080

### Restarting the App
If you make changes to the code, you may need to restart the app container:

```bash
docker-compose restart app
```

## Data Inspection

To inspect the data stored in the local Firestore emulator, use the provided utility script.

### Run Inspection Script
```bash
npx -y tsx inspect_db.ts
```

This will output the list of analyzed places, including their status, AI scores, and usage summaries.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Recharts
- **Backend**: Next.js Server Actions
- **AI**: Google Vertex AI (Gemini 2.0 Flash)
- **Database**: Firestore (Emulator for local dev)

