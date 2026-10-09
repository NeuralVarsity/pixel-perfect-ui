<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Lead form writes to `fashion_leads` only via the `submitLead` server function (admin client); the table has RLS with no public policies so visitors can never read leads.
- n8n automation is triggered from `submitLead` only when `N8N_WEBHOOK_URL` (and optional `N8N_WEBHOOK_SECRET`) secrets exist; lead id is sent as Idempotency-Key so retries don't duplicate.
- Brand contact, URLs, WhatsApp flag and image sources live only in `src/config/brand.ts` so content swaps never touch components.
- `submitLead` treats only an identical inquiry from the same email within 10 minutes as a duplicate and tells the user; n8n delivery status is written to `lead_status`/`automation_error`.
