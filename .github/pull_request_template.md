## PR Title

feat(agent-<name>-<topic>): short scope summary

## Scope
- What this PR does (functional changes only; no visual redesign)
- Any assumptions made where requirements were unclear

## Screenshots / GIFs
- Before
- After

## Notes
- Accessibility considerations (keyboard, ARIA, reduced-motion)
- ENV usage (no secrets committed)
- Offline/PWA behavior if relevant

## Testing Notes
- Steps to validate locally
- Edge cases covered

## Checklist
- [ ] Small, reversible PR on feature branch `feat/agent-<name>-<topic>`
- [ ] Follows composition-over-refactor; preserves component/class names & CSS
- [ ] Supabase migrations + RLS + seeds + down/rollback notes applied (if schema)
- [ ] Web push via FCM where applicable
- [ ] PWA installable and offline shell unaffected
- [ ] No hardcoded secrets; uses existing ENV pattern
- [ ] Accessibility: keyboard DnD fallback, ARIA, reduced-motion respected
- [ ] Added acceptance criteria coverage in tests or manual steps
- [ ] Updated docs/tracker

