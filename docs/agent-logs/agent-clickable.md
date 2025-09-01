AccountaBuddy Clickable Sweep Log
=================================

Conventions
- Minimal flows only; preserve visual design; reuse existing components/tokens.
- Supabase for auth/db/realtime/storage. Media cap 50MB. Share starts tomorrow. Week starts Sunday.

Pass 1: Affordances Inventory (initial)

1) Social Page → Friends button (top right)
- Mini-spec: Toggle popover; supports search, send request, accept/decline, remove friend, copy invite link, QR add.
- Acceptance: Clicking shows popover; add friend triggers API with optimistic feedback; accept/decline updates lists; remove updates list; link copied; QR modal opens.

2) Social Page → Buddies list item (card)
- Mini-spec: Opens Buddy Detail view; actions: Chat, Share Habit, View Leaderboard.
- Acceptance: Click navigates to BuddyDetail; buttons call handlers; Share Habit opens modal with tomorrow start.

3) Social Page → Communities Join buttons
- Mini-spec: Join public community immediately; show toast; updates membership count.
- Acceptance: Click Join updates UI to Joined; count increments; idempotent.

4) Dashboard → FAB → Add Friend
- Mini-spec: Opens Friends Popover (or Add Friend modal) focused on Add tab.
- Acceptance: Click reveals input and can send request.

5) Friends Popover → Add tab → Add action
- Mini-spec: Search by handle; send request with optional message; optimistic pending state in Sent.
- Acceptance: After Add, Sent tab shows pending; backend row created; errors toast.

6) Friends Popover → Received tab → ✓ / ✗
- Mini-spec: Accept creates friendship; Decline marks declined; both remove from received.
- Acceptance: Accept moves to Friends list; Decline removes; backend updated.

7) Friends Popover → Friends tab → Remove
- Mini-spec: Removes friendship; confirmation inline; optimistic UI.
- Acceptance: Row removed; backend deleted; undo within 5s optional.

8) Friends Popover → Sent tab → Cancel
- Mini-spec: Allow canceling a pending outgoing request.
- Acceptance: Click Cancel removes request; backend deleted; toast confirms.

8) Buddy Detail → Share Another Habit
- Mini-spec: Opens share flow; pick habit; select rules; start date tomorrow; sends invite to buddy.
- Acceptance: Invite appears to recipient; status pending until accepted; banner shows "Starts Tomorrow".

Notes
- Wire up to Supabase: tables friend_requests, friends if absent; add RLS and seeds.
- Use react-hot-toast for feedback.

Implementation Notes (Friends)
- Added social.service with: searchUsers, listFriendRequests, listFriends, send/accept/decline/cancel, removeFriend, block/report.
- Wired Social page + FriendsPopover; added Cancel action; optimistic updates and toasts.
- Created Supabase migrations for friend_requests, friends, user_blocks, user_reports with RLS.

Progress Log
- 2025-09-01: Created branch `feat/agent-clickable/sweep`, initialized logs.
- 2025-09-01: Logged initial affordances and mini-specs.
- 2025-09-01: Implemented Friends flows; added `src/services/social.service.ts` and UI wiring; added Supabase migrations with RLS.
- 2025-09-01: Build is green (warnings only). Pushed branch to origin. Open PR via GitHub UI: visit repository PRs and create from `feat/agent-clickable/sweep`.

Next
- Implement Share Habit invite flow with “Starts Tomorrow” banner and accept/decline.
- Add minimal happy-path tests.

