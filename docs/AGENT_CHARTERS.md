# Agent Kickoff Charters

Paste the matching charter into a new Cursor chat for each agent with the feature branch.

---
Charter: Agent Athena — Auth & Profiles
Scope: Implement Supabase Auth (magic link), create user profile row on signup, expose `useSession()` hook, add RLS policies for `profiles`.
Constraints: Preserve existing UI; use ENV pattern `REACT_APP_*`; small PRs.
Deliverables: SQL migration (profiles table), RLS, seeds, edge cases, tests, docs.

---
Charter: Agent Hermes — Habits Core
Scope: CRUD habits, 3-face tap cycle, numeric long-press counter, store events in Supabase with RLS.
Deliverables: SQL tables (`habits`, `habit_events`), RLS, minimal UI wiring to existing cards, tests.

---
Charter: Agent Circe — Social Graph
Scope: Buddies (request/accept), Squads (create/join), Communities (join/preview). Add membership tables and RLS.
Deliverables: SQL (`buddies`, `squads`, `squad_members`, `communities`, `community_members`), RLS, seeds.

---
Charter: Agent Apollo — Chat
Scope: Conversations linked to buddy/squad/community; messages with text + image; typing and read receipts via Supabase Realtime.
Deliverables: SQL (`conversations`, `messages`, `message_reactions`), RLS, storage bucket for media, hooks.

---
Charter: Agent Minerva — Approvals & Proof
Scope: Mark habit as requires approval; approver flow; proof media upload and approval status changes.
Deliverables: SQL (`habit_approvals`, `approval_requests`), RLS, storage rules, UI actions.

---
Charter: Agent Boreas — Reminders & Web Push
Scope: Browser FCM registration, token storage, demo scheduled reminder using Supabase Edge Functions; notification click routing.
Deliverables: FCM setup (no secrets committed), `push_tokens` table, edge function, docs.

---
Charter: Agent Ares — Consequences & Competition
Scope: Configure consequences when streak breaks; leaderboards per entity using aggregated events.
Deliverables: SQL (`consequence_rules`, `leaderboard_snapshots`), queries, RLS.

---
Charter: Agent Hephaestus — Trends & Analytics
Scope: Daily/weekly charts from `habit_events`; streaks, perfect days, cached aggregates.
Deliverables: Views/materialized views, queries, charts wiring, offline cache.

---
Charter: Agent Iris — PWA & Offline Shell
Scope: Ensure manifest and service worker installability; cache shell; offline habit list; reduced-motion.
Deliverables: `manifest.json` validate, service worker updates, Workbox if available, tests.

---
Charter: Agent Hestia — Accessibility & Keyboard DnD
Scope: Keyboard operability for tap/long-press equivalents; ARIA labels; focus traps for modals; prefers-reduced-motion.
Deliverables: Audit, small targeted enhancements; no visual redesign.

