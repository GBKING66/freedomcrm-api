# Olerio Homes — Office Discovery Questionnaire

## Purpose

Before we build the "central system" (the octopus body) for Olerio Homes, we need to understand how each department actually works today: what they touch, where it lives, what hurts, what they need. This questionnaire captures that.

The answers to this become the **data model** (what objects exist), the **workflow map** (how info flows between roles), and the **pain ranking** (what to fix first).

---

## How to use this

1. Schedule **30–45 minutes** with one person at a time. Don't try to do this in groups — people self-censor.
2. Walk through the **Common Questions** with everyone, then their **Role-Specific** section.
3. Take notes directly under each question (copy this doc into a Google Doc per person if that's easier).
4. The "Pain & wishlist" section is where the real gold is — don't rush it.
5. After everyone is interviewed, we sit down and turn the answers into a system design.

---

## Common Questions (ask everyone)

### Your day

1. Walk me through a typical day — first hour to last hour.
2. What's the first thing you check when you sit down at your desk?
3. What's the last thing you do before leaving?
4. How much of your day is "the thing I'm supposed to be doing" vs. "chasing down information"?

### Systems & tools

5. List every system, app, or place where you store or find information for your job. (Builder Trend, Outlook, OneNote, Google Drive, OneDrive, Dropbox, paper files, Excel, text messages, your phone's photo library, your head — name everything.)
6. For each kind of document or data you work with, **which system is the source of truth?** (e.g., "Plans live in Builder Trend, but I keep my own copy on my desktop because BT is slow.")
7. Which system do you use the **most**? Which one do you **hate** the most?
8. If a system disappeared tomorrow, which one would hurt the worst?

### Handoffs

9. Who do you regularly receive information FROM? (Other roles, vendors, inspectors, owner, etc.) How does it arrive — email, phone, in person, system notification, hallway?
10. Who do you regularly send information TO, and how?
11. What handoffs frequently break down, get lost, or arrive too late?

### Finding stuff

12. When you need a specific document (a plan, a permit, an invoice, a photo, a contract), walk me through the steps you take to find it.
13. How long does it usually take?
14. Have you ever had to recreate something because you couldn't find the original?
15. What do you keep your **own private copy** of because the official copy is unreliable or hard to get to?

### Pain & wishlist

16. What's the single most painful or frustrating part of your job — the thing that wastes the most time?
17. If you could wave a magic wand and change ONE thing about how this office works, what would it be?
18. What would have to be true for you to call this office "well-organized"?
19. What's something you do today that you're convinced should be automated?

---

## Role-Specific Questions

### Owner / Principal

- What metrics do you check across the portfolio (active houses, status, schedule, financial)?
- How often do you want a snapshot of "where everything stands"?
- What decisions land on your desk that you wish were handled before they got to you?
- What do you currently have to chase down vs. what comes to you automatically?
- If you could see one dashboard each morning that told you everything important, what would be on it?

### Operations Manager

- What's the master schedule you maintain (or wish you maintained)?
- How do you know when a house hits a milestone (foundation poured, framing done, inspection passed)?
- What inter-department coordination falls on your desk?
- What's the worst kind of fire drill you regularly handle?
- Who tells you when something slips, and how?

### Area Construction Manager

- How many houses are in your area at any given time?
- How do you know what's blocking each one?
- How do you decide where to spend your day?
- What information do PMs send you proactively vs. what do you have to dig out yourself?
- What's the longest you've gone without knowing a house had a problem?

### Project Manager *(do this separately with each PM)*

- How many houses do you manage at once?
- What does your iPad/laptop have on it that you check daily?
- When you walk a house, what do you take notes on? Where do those notes go after?
- How do you communicate with vendors — phone, text, email, Builder Trend, in person? Which works best?
- What paperwork do you spend the most time looking for?
- Who do you ask when you can't find something? How long do you wait?
- What do you wish your phone or tablet could do for you on a job site that it can't today?

### Designer

- What artifacts do you produce (selections, fixture lists, drawings, materials lists, mood boards)?
- How do you communicate selections to PMs, purchasing, and vendors?
- How do you track what's been **ordered**, what's been **delivered**, and what's been **installed**?
- When a homeowner changes their mind mid-build, how does that propagate to everyone who needs to know?
- How often do you find out about a problem (wrong fixture, back-order, install error) too late?

### Payroll

- What systems do you use to track hours and labor across all the jobs?
- How does time get from the field to you (paper time card, photo, app, text)?
- How do you tie labor to specific houses for job costing?
- What's the worst pay period you've ever had, and what made it bad?
- What information do you wish PMs/foremen would give you that they currently don't?

### Purchasing

- What's the trigger to start ordering for each phase of a build?
- How do you know what each house needs and when?
- How do you confirm what's been delivered to which job?
- What's coming in via email, phone, paper, or text today that should be in a system?
- What slows down the order-to-delivery cycle most often?

### Lou *(and any other named superintendent / foreman)*

- *Use the PM questions as a base.*
- What do you do that nobody else does or knows how to do?
- If you were out for two weeks, what would the office not know? What balls would get dropped?
- What information lives only in your head?

---

## After the interviews

Once all roles are interviewed, the answers will let us:

1. **Build the data model** — what "objects" exist (House, Vendor, Document, Inspection, Order, Punchlist Item, etc.) and what attributes each one needs.
2. **Map the workflow** — who hands off what to whom, and where the breakdowns are.
3. **Rank the pain** — top 3 most-painful problems across the office, by frequency × severity.

From there, we **pick ONE workflow** to fix end-to-end as the proof. Build it. Prove it works. Then expand to the next.

---

## Notes for the interviewer

- **Listen for verbs**: "I email this to…", "I download this and save it to…", "I copy this onto a sheet…". Verbs reveal the actual workflow, not the imagined one.
- **Listen for "I keep my own copy"**: every time someone says this, it's evidence the official system isn't trusted. Note which artifact and why.
- **Don't pitch solutions during the interview.** Just listen and capture. Solutions come later.
- **Save names of recurring documents and tools verbatim** ("the green binder", "the punchlist tab in BT", "Lou's spreadsheet") — those are the real names of objects in the data model.
