# AccountaBuddy Orchestration Tracker

This tracker defines workstreams, acceptance criteria, and current status. All work must land in small, reversible PRs off `feat/agent-<name>-<topic>`.

## Tracks

1) Auth & Profiles (Supabase Auth)
- AC: Email magic link works; profile row created; RLS prevents cross-user access; session persisted offline.

2) Habits Core (CRUD + completion)
- AC: Create/edit/archive habits; 3-face tap cycle; long-press numeric counter; completion recorded to Supabase with RLS.

3) Social Graph (buddies/squads/communities)
- AC: Buddy request/accept; create/join squad; join/preview community; RLS to enforce membership.

4) Chat (realtime messages + attachments)
- AC: Conversations per entity; text + image upload; read receipts; typing indicators using Supabase Realtime.

5) Approvals & Proof
- AC: Habit completion can require approval; approvers notified; approve/reject flows; proof media stored via Supabase Storage.

6) Reminders & Web Push (FCM)
- AC: FCM browser push permission; token stored; scheduled reminder demo via Supabase Edge Function; offline notification click opens app route.

7) Consequences & Competition
- AC: Configurable consequences on missed streaks; leaderboard per buddy/squad; basic point rules.

8) Trends & Analytics
- AC: Daily/weekly charts from events; streaks; perfect days; minimal Recharts integration; offline cache.

9) PWA & Offline Shell
- AC: Installable manifest; service worker caches shell; offline habit list view; reduced-motion respected.

10) Accessibility & Keyboard DnD Fallback
- AC: All primary interactions keyboard-operable; ARIA roles; focus management for modals; prefers-reduced-motion gate.

## Dependencies
- Chat depends on Auth & Profiles.
- Social Graph depends on Auth & Profiles.
- Approvals depends on Habits Core and Social Graph.
- Reminders depends on Auth & Profiles; optional on Habits.
- Consequences & Competition depends on Habits Core and Social Graph.
- Trends depends on Habits Core.
- PWA/Offline is independent but should not conflict; supports all.
- Accessibility spans all tracks.

## Branching & PR Rules
- Use `feat/agent-<name>-<topic>` branches.
- Keep component/class names and CSS as-is whenever possible.
- Document any minor assumptions inline in PR description.

## Status Log
- Use checkboxes per track to indicate shipped items linked to PRs.

