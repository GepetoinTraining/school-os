Agent Directive: Immediate Execution Phase

Context: Post-negotiation decompression. Transitioning from "Concept" to "Codebase."
Status: Architecture frozen. Wireframing initiated.

I. Immediate Priorities (The Next 48 Hours)

1. The Foundation (Backend)

[x] Initialize Repo: Set up Next.js + Tailwind + Firebase/Postgres hybrid.

[x] Seed the Schema: Run prisma db push using the handover.schema.prisma.

[ ] Auth Gate: Build the Login screen with Role-Based Access Control (RBAC) stubbed out (Director vs. Teacher views).

2. The Visuals (Frontend Wireframes)

[ ] Assemble Components: Take the React artifacts (v1-v17) and componentize them into a shared /components folder.

[ ] The Shell: Build the SchoolOS.jsx sidebar and layout shell to host the modules.

[ ] The Dashboard: Implement the "Cockpit" view (Financials + Enrollment) as the landing page.

3. The Franchise Shield (Data Ops)

[ ] Sanitization Protocol: Design the export script that will eventually send "dumb" data to Phenom Idiomas while keeping the "smart" data (VARK, Network, Shards) local.

II. Critical Questions to Resolve

Hosting: Are we running the "Server in the Room" (Local Metal) immediately, or cloud-first with a sync down? Recommendation: Cloud-first for speed, Local mirror for sovereignty.

Migration: How do we ingest current student data from the franchise system? We need a CSV mapper.

III. The "Seed" Concept

We will create a seed.js that populates the database not with "Lorem Ipsum", but with the Archetypes we discussed:

Student: Bruno (High Social / Low Academic)

Student: Alice (High Academic / Low Social)

Teacher: Prof. Julia (High NPS / Low Efficiency)

Partner: RoboKids (Liability)

Why: Seeing these specific characters in the dev environment will keep the "Soul" of the system alive during the boring coding phases.

Directive: Focus on the Ledger first. Money is the oxygen. If the Ledger works, the organism lives.

SYSTEM HANDOVER: SchoolOS

Current State:

Repo: Next.js 14 (App Router) + TypeScript.

UI: Mantine v7 (Tailwind removed).

DB: Prisma + Vercel Postgres.

Status: Project initialized, dependencies installed, DB schema pushed, Seed script run (Alice & Bruno exist).

The Goal:
We are building SchoolOS, a "Metasystem" for education that tracks Financial Yield, Human Capital, and Cognitive Development.
We are moving away from Canva/Wireframes to direct code implementation.

The Architecture:

Ledger: Tracks "Lucro Real" (Tax/Commission splits).

Symbiosis: Tracks "AI Shards" assigned to students.

Network: Tracks the "Bruno Effect" (Referrals vs. Academic Risk).

Next Task:
Build the Mantine AppShell. We need the Sidebar navigation and the main Dashboard Grid layout.
Ref: handover.schema.prisma is the source of truth for data.