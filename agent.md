Agent Directive: Immediate Execution Phase

Context: Post-negotiation decompression. Transitioning from "Concept" to "Codebase."
Status: Architecture frozen. Wireframing initiated.

I. Immediate Priorities (The Next 48 Hours)

1. The Foundation (Backend)

[ ] Initialize Repo: Set up Next.js + Tailwind + Firebase/Postgres hybrid.

[ ] Seed the Schema: Run prisma db push using the handover.schema.prisma.

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