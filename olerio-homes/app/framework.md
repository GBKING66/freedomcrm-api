# Olerio Homes PM App — Product Framework

_Working document. Iterate freely._

---

## 1. Problem

Custom home builders are underserved by construction management software.

- **Buildertrend, BuildPro, Procore** are built for production builders — high-volume, standardized, repeatable. Custom builders have constant customization, which those tools don't accommodate cleanly.
- **They're clunky.** Buildertrend needs an iPad or laptop; the mobile app is a shadow of the desktop version. PMs waste time in the software instead of building houses.
- **Things fall through the cracks.** POs missed. Vendors not called. Missed deliveries. Delay reasons not tracked, so year-over-year you can't answer *"where are we losing time?"*
- **Management can't get a fast answer.** Lou or Scott has to call the PM to find out where any given house stands.

Result: overruns, homeowner frustration, PM burnout, no learning across houses.

---

## 2. Solution — Two Apps, One Backend

**PM App** — iPhone-first, task-driven, adjustable detail level. Owns the day-to-day of running a house.

**Management Snapshot** — lightweight web page or simple app. Enter an address, get a snapshot: status, ECD, phase, blockers, delay reasons. Read-only. If Lou needs more, he calls the PM.

Both apps read from the same backend. Both are lightweight. Both are built specifically for how Olerio builds.

---

## 3. User Personas

| Role | Uses | Cares about |
|---|---|---|
| **Project Manager** (Robert + others) | Daily, on iPhone in the field | Fast task entry, vendor coordination, house drill-down, "what's next" clarity |
| **Management** (Lou Olerio, Scott Penta) | Occasional, on phone/desktop | "Type address → see status." No workflow, no clicks. |
| **Purchasing dept.** | Receives POs, no login required | Clean formatted PO emails |
| **Designer / design center** | Reads/writes selections per house | Fixture + material info lives per-house |
| **Vendors / field crew** | Text notifications (Twilio) | "Task X at 5525 Forsan ready for you" |

---

## 4. Core Features — MVP (First Build)

### PM App
- **Add house** — enter address + series (Encore / Reserve / Fort Worth Tier). App auto-generates the full task list from the series template.
- **Task list per house** — sequenced, with vendor pre-assigned, ETA per task.
- **Check off tasks** as complete → triggers next-task logic (email vendor, request PO, notify PM).
- **Auto-email vendors** when their task is up ("Ready for tile at 5525 Forsan on [date]").
- **Auto-request POs** from purchasing (`purchasing@oleriohomes.com`) when a task requires one.
- **Log delays** with reason category (Weather, Owner approval, Design files, Cabinet plans, Vendor no-show, Materials back-order, Inspection, Change order, Other) + free-text description.
- **View Dropbox docs** for each house without leaving the app (colors, plans, specs).
- **Adjustable detail level** — PMs can view a simple "today only" screen or drill deep into any house.

### Management Snapshot
- **Address lookup** — type or pick from list.
- **Snapshot view:** current status, current phase, ECD, days slipped, most recent delay + reason.
- **No editing, no workflow.** Read only.
- **"Call PM" button** — one tap to reach the PM if more detail needed.

### Automatic Behind the Scenes
- Task complete → email vendor for next task
- Task requires PO → email purchasing with PO request
- Delay logged → snapshot updates for management
- Weekly Monday email → this week's tasks by house
- Weekly Monday email → purchasing needs for the coming 2 weeks

---

## 5. Data Model (High-Level)

| Object | Key Fields |
|---|---|
| **House** | id, address, series, current_phase, ecd, target_completion, status, owner_name, homeowner_contact |
| **Series Template** | series_name, task_list[], typical_lead_times, vendor_assignments |
| **Task** | id, house_id, name, sequence, vendor_id, status (pending/in-progress/complete/blocked), po_required (bool), po_status, expected_start, actual_complete |
| **Vendor** | id, company, trade, contact_name, email, phone, preferred_contact |
| **PO** | id, house_id, task_id, vendor_id, description, amount, requested_date, sent_date, status |
| **Delay** | id, house_id, days, category, description, date_logged, resolved_date |
| **Document** | id, house_id, category (plans/colors/specs/permits), dropbox_path, uploaded_by |

---

## 6. Integrations Required

- **Dropbox** — Olerio's Dropbox for plans, colors, materials specs. Read + link.
- **Outlook** (via Microsoft Graph) — auto-send vendor emails and PO requests from `robert@oleriohomes.com` or a shared `pm@oleriohomes.com`.
- **Twilio** — SMS notifications to vendors (already wired into this repo).
- **Design center** — TBD what tool they use. If it's a spreadsheet or Dropbox folder, we pull from that.

---

## 7. Technology Recommendation

**For the MVP, low-code — not custom from scratch.**

| Layer | Recommended | Why |
|---|---|---|
| **PM App (mobile)** | **Glide** or **FlutterFlow** | Phone-first, real app feel, fast to build, ~$50/user/mo |
| **Management Snapshot** | **Static web page** hosted on Vercel (this repo) reading from Airtable | Simple, zero-friction for Lou, no login flow needed for read-only |
| **Backend / Data** | **Airtable** | Native to Glide, easy to inspect/edit as human, cheap ($20/mo) |
| **Automation** | **Make (Integromat)** or **Zapier** | Connects Airtable → Dropbox → Outlook → Twilio |
| **File storage** | Existing **Dropbox + Google Drive** | Don't reinvent |
| **SMS** | Twilio via this repo's existing endpoints | Already built |

**Why not custom native?** Custom native mobile app: 6+ months, $80–200k, and needs a dev to maintain. Low-code buys 80% of the experience for 20% of the cost, and you can migrate to custom later once the workflow is proven.

**Why Glide specifically?** Best mobile UX of the no-code tools. Real "feels like an app" experience. Real construction companies use it in production.

---

## 8. Build Phases

### Phase 1 — MVP for Robert only (Weeks 1–4)
- Data model in Airtable (Houses, Tasks, Vendors, POs, Delays)
- Glide app: add house → task list → check off → log delay
- **Encore series template** fully written (task list, sequence, vendor assignments)
- Auto-email vendor + PO request wired up
- Robert uses it on his houses for 2–3 weeks. Iterate.

### Phase 2 — Complete the workflow (Weeks 5–8)
- Reserve series template
- Fort Worth Tier template
- Dropbox integration (view plans/colors per house)
- Delay tracking + weekly report auto-email
- Vendor SMS notifications via Twilio

### Phase 3 — Management view (Weeks 9–12)
- Management Snapshot web page (address lookup → status)
- Portfolio calendar (2-month view, all houses' ECDs)
- Weekly Monday email to Lou/Scott: portfolio summary

### Phase 4 — Roll out to other PMs (Weeks 13+)
- Onboard 1 PM at a time
- Refine based on their feedback
- Standardize training

### Phase 5 — SaaS play (later, if the internal build works)
- Multi-tenant architecture
- Sign-up flow, billing (Stripe), onboarding
- Sales page
- Sell to other custom home builders — NOT production. Target: $99–299/PM/month.

---

## 9. Cost Estimate

| Phase | Time | Robert's cost | Subscription cost |
|---|---|---|---|
| MVP | 4 weeks | ~$15k (dev + PM time) | ~$50/mo (Glide, Airtable, Make) |
| Full internal rollout | 3 months total | ~$40–60k | ~$150–250/mo (5 PMs) |
| SaaS launch (future) | +2–3 months | +$25–50k | +$500–2k/mo scaling costs |

**Note:** If Robert builds this himself with AI assistance (like this session), the "dev cost" is his own hours. If we outsource part to a Fiverr/Upwork developer, add $3–8k per phase.

---

## 10. Why This Wins Over Buildertrend for Custom Builders

- **Purpose-built for custom** — task templates match how Olerio *actually* builds
- **Phone-first** — real usability in the field, not just at a desk
- **Task-based, not module-based** — PMs think "what's next?", not "which BT screen has that?"
- **Lightweight for management** — Lou gets a status snapshot in 3 seconds, not a login-and-navigate exercise
- **Auto-communications** — PM doesn't have to remember to email the vendor; the system does it
- **Delay analytics** — over time, you know *where* time gets lost. Nobody else's software tracks this.

---

## 11. Open Questions to Resolve Before Building

1. What are the actual differences between Encore / Reserve / Fort Worth Tier?
2. Full task list for an Encore build — sequence + vendor + typical lead time per task.
3. Where does the "design center" data live today? (Dropbox folder? Excel? Their own tool?)
4. What does a typical PO from Olerio look like? (Format, fields, who signs off.)
5. Which trades handle their own PO vs. central purchasing?
6. Multi-PM: does each PM see only their houses, or all houses?
7. Homeowner communication — in scope for v1 or later?

Answer these and the MVP goes from "framework" to "buildable."
