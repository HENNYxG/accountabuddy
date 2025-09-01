## Parallel Tracks and Agent Assignment

- Track A: Auth & Profiles — Agent Athena
- Track B: Habits Core — Agent Hermes
- Track C: Social Graph — Agent Circe
- Track D: Chat — Agent Apollo
- Track E: Approvals & Proof — Agent Minerva
- Track F: Reminders & Web Push — Agent Boreas
- Track G: Consequences & Competition — Agent Ares
- Track H: Trends & Analytics — Agent Hephaestus
- Track I: PWA & Offline Shell — Agent Iris
- Track J: Accessibility & Keyboard Fallback — Agent Hestia

### Dependency Graph
- D(Chat) ← A(Auth)
- C(Social) ← A(Auth)
- E(Approvals) ← B(Habits) + C(Social)
- F(Reminders) ← A(Auth) (optional: B(Habits))
- G(Consequences) ← B(Habits) + C(Social)
- H(Trends) ← B(Habits)
- I(PWA) ← none (platform support)
- J(Accessibility) ← all (cross-cutting)

Each arrow indicates the right-hand track must land before the left can fully complete.

