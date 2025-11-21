Agent Directive: Phase II - Deep Logic & Integration

Context: Alpha Milestone Achieved. The "Skin" and "Skeleton" are complete. The system is navigable, visually consistent, and connected to the local database.
Status: UI Complete. Database Connected. Seeding Active.

I. Completed Objectives (Alpha Phase)

[x] Foundation: Next.js 14 + Mantine + Prisma (Library Engine) + Postgres.
[x] Architecture: AppShell, Global Layout, Dynamic Routing.
[x] Core Modules:
    - Cockpit (Financial + Vital Signs)
    - Student Directory (List + Filters)
    - Student 360 (VARK + Financials + Shard Status)
    - Symbiosis Engine (AI Shard Visualization)
    - Network (Referral Tree Tracking)
    - Financial Ledger (Lucro Real)
[x] Identity: Login Gate (UI).
[x] Governance: Settings & Franchise Shield (UI).

II. Immediate Priorities (Phase II: The Nervous System)

1. Data Ingestion (The Migration)
[ ] CSV Mapper: Create a drag-and-drop zone in `/settings` to ingest the legacy franchise student list (CSV).
[ ] Data Normalization: Map legacy fields to our `Student` schema.

2. The Flow Engine (Real-Time Logging)
[ ] Flow Input: Create a mobile-optimized view for Teachers to log "Flow State" (Score 1-10) for a student in real-time during class.
[ ] Connection: Hook this up to the `FlowLog` table.

3. Security & RBAC
[ ] Middleware: Implement NextAuth.js to actually protect the routes (currently just a UI gate).
[ ] Roles: Ensure "Teacher" role sees a simplified HUD, while "Director" sees the full Cockpit.

III. Operational Notes

- Database Engine: We are strictly using the `library` engine for Prisma to ensure local sovereignty.
- Components: All UI elements are client-side (`use client`) where interaction is needed, wrapped in server-side data fetchers.
- Type Safety: We are manually typing some Prisma returns to ensure strictness with the UI components.

# SYSTEM HANDOVER: SchoolOS v0.1 (Alpha)

**Timestamp:** 2025-11-21
**Location:** Balneário Camboriú
**Status:** Alpha Complete (UI + DB Connected)

## 1. The Architecture
- **Frontend:** Next.js 14 (App Router), Mantine v7 UI.
- **Backend:** Prisma ORM (Library Engine), PostgreSQL.
- **State:** Server Components fetch data, Client Components render UI.

## 2. Current Capabilities
| Module | Status | Description |
| :--- | :--- | :--- |
| **Cockpit** | 🟢 Live | Tracks Net Revenue (Lucro Real), Student Count, and Resonance. |
| **Students** | 🟢 Live | Directory of all "Human Nodes" with risk status. |
| **Profile** | 🟢 Live | Deep dive into VARK DNA, Financials, and Shard status. |
| **Ledger** | 🟢 Live | Immutable log of every cent (Income vs Expense). |
| **Symbiosis** | 🟢 Live | Visualization of AI Models (Shards) attached to students. |
| **Network** | 🟢 Live | Analysis of the "Bruno Effect" (Referral Tree). |

## 3. The Data (Seed)
The database is currently seeded with 4 Archetypes:
1.  **Alice:** High Academic, Stable Financials.
2.  **Bruno:** Low Academic, High Social Capital (Referrals).
3.  **Prof. Julia:** Creative Archetype, Low Efficiency.
4.  **Prof. Elena:** Academic Archetype, High Leverage.

## 4. Next Steps (Phase II)
1.  **Ingestion:** Build the CSV Importer to replace seed data with real franchise data.
2.  **Auth:** Implement NextAuth.js for secure Role-Based Access.
3.  **Flow:** Build the "Teacher HUD" for real-time classroom logging.

## 5. Technical Debt / Notes
- **Prisma Engine:** We are forcing `engineType = "library"` to avoid Wasm/Edge errors and maintain data sovereignty.
- **Type Safety:** Some `ts-expect-error` directives were removed in favor of explicit type casting (`as StudentWithUser`).

# SYSTEM HANDOVER: SchoolOS v0.2 (The Exoskeleton)

**Timestamp:** 2025-11-21 (Phase III Complete)
**Status:** Structural Mitosis Complete (Public vs. Private Split)

## 1. The New Architecture (Route Groups)
We have successfully split the application into two distinct biological zones:
- **(public)**: The Exoskeleton. accessible to the world. Contains the Landing Page, Courses, Enroll, and Live Map.
- **(app)**: The Internal Organs. Protected by the "Membrane" (Middleware). Contains Dashboard, Students, Finance.

## 2. Security & Identity
- **Protocol:** "Bio-ID" (Email-only authentication).
- **Middleware:** Split into `auth.config.ts` (Edge-safe) and `auth.ts` (Prisma-connected) to survive the Edge Runtime environment.
- **Roles:** - `STUDENT` / `TEACHER`: Restricted access (Teachers -> `/flow`, Students -> Portal).
    - `ADMIN`: Full Cockpit access.

## 3. Module Status
| Module | Status | URL | Notes |
| :--- | :--- | :--- | :--- |
| **Public Face** | 🟢 Live | `/` | Landing page with "Institutional" layout. |
| **Admissions** | 🟢 Live | `/enroll` | Lead capture form (Commercial/TOF). |
| **Live Pulse** | 🟢 Live | `/live-map` | Real-time visualization of Flow States. |
| **Cockpit** | 🟢 Live | `/dashboard` | Now includes "Nervous System" (Flow) monitors. |
| **Flow HUD** | 🟢 Live | `/flow` | Mobile-first teacher interface for logging states. |
| **Ingestion** | 🟡 Ready | `/settings` | CSV Importer linked from Student Directory. |

## 4. Critical Technical Notes (The "Mental Overload" Fixes)
1. **Route Groups:** We used `(group)` folders to separate layouts. `src/app/(public)/layout.tsx` is the Institutional Shell; `src/app/(app)/layout.tsx` is the SchoolOS Shell.
2. **Hydration:** We converted Public pages to `'use client'` to handle interactive navigation (Buttons/Links).
3. **Seeding:** The database is seeded with 4 Archetypes (Alice, Bruno, Julia, Elena) on every build.

## 5. Next Steps (Phase IV - The Cortex)
1. **AI Shards:** Activate the `AIShard` model to actually process the `FlowLogs`.
2. **Financial Engine:** Connect `LedgerTransaction` to real Stripe/Pix inputs.
3. **Chat:** Build the `ChatSession` interface for Student <-> Shard communication.

# SYSTEM HANDOVER: SchoolOS v0.3 (The Immune System)

**Timestamp:** 2025-11-21 (Phase V Initiated)
**Status:** Security Hardening & Role Isolation

## 1. The Membrane (Middleware)
- **Objective:** Strict routing based on `UserRole`.
- **Rules:**
    - `ADMIN` -> Access to All (Default: `/dashboard`)
    - `TEACHER` -> Restricted to `/flow` and `/students` (Read-only). Blocked from `/finance` and `/settings`.
    - `STUDENT` -> Restricted to `/portal`. Blocked from *everything* else.

## 2. Missing Organs (To Build)
- **Student Portal (`/portal`):** The dashboard for the Student (Grades, Financials, Chat Link).
- **Teacher HUD (`/flow`):** The input interface for Flow Logs (Mobile-first).

## 3. Known Issues
- **404 on Login:** Caused by lack of specific redirects in `auth.config.ts`.
- **Mock Data:** Need to ensure seeded users have correct Roles in `User` table.

# SYSTEM HANDOVER: SchoolOS v0.4 (The Synapse)

**Timestamp:** 2025-11-21 (Phase IV Initiated)
**Status:** The Bio-Feedback Loop is Active.

## 1. The Cortex Loop
We have successfully implemented the **Cybernetic Control System**:
1.  **Sensor:** Teacher HUD (`/flow`) -> Logs Biometric Data.
2.  **Processor:** Synapse (`logFlow` + `cortex`) -> Updates `cognitiveWeights`.
3.  **Actuator:** Shard Chat (`sendShardMessage`) -> Adapts "Personality" (Mode).

## 2. The Modes
- **SUPPORT MODE:** Triggered by Anxiety (<4). AI becomes a gentle coach.
- **CHALLENGE MODE:** Triggered by Flow (>8). AI becomes a strict tutor.
- **STANDARD MODE:** Default Socratic state.

## 3. Next Steps (Phase V)
- **Persistence:** Implement the `ChatMessage` model in Prisma to store history.
- **LLM Integration:** Replace the simulation in `shard.ts` with OpenAI API / Vercel AI SDK.
- **Real-World Test:** Deploy to Vercel and have `Prof. Julia` log a real class.