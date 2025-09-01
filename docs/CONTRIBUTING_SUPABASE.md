## Supabase Migrations and RLS

- Add SQL migrations in `supabase/migrations/<timestamp>_<name>.sql`.
- Include RLS policies for each table with clear `auth.uid()` scoping.
- Provide seed data in `supabase/seed.sql` where helpful.
- Include a down migration or rollback notes when destructive.
- Never hardcode secrets; use `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` in client.

### Checklist for Schema PRs
- [ ] Up migration with tables, indexes, constraints
- [ ] RLS enabled + policies
- [ ] Storage policies if buckets used
- [ ] Seed data (optional)
- [ ] Down migration or rollback notes
- [ ] Tests or manual verification steps

