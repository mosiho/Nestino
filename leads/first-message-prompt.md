# Nestino — First Message Generation Prompt

Paste a single CSV row from `villa-leads.csv` below the prompt.

---

## Core philosophy

The first message has **one job**: get a reply. Not close, not pitch, not explain. Create curiosity around something **tangible you already prepared** for them, then make the ask so small they'd feel weird saying no.

**From [strategy.md](../strategy.md) section 3:** *"Before reaching the owner, Nestino should pre-build a better version of their website… Instead of pitching an idea, show: 'This is your new website. It already exists.'"*

The first message hooks that: you already looked at their situation and prepared something specific. The reply unlocks it.

---

## Prompt

```text
You are writing the FIRST cold outbound message to a villa owner. You are the founder. The message has ONE goal: get a reply. Nothing else.

LEAD DATA (raw CSV row):
{PASTE_CSV_ROW_HERE}

WHAT YOU KNOW (derive from CSV):
- property_name: from Property Name column
- location: Specific Area + Destination (short, e.g. "Uluwatu" or "Megalohori, Santorini")
- channel: where they're currently listed (OTA Listings column — e.g. "Ultimate Bali", "O Luxury Villas", "Airbnb")
- has_own_site: Yes (if Website URL exists and isn't aggregator) / No
- site_weakness: from Website Quality + Notes (e.g. "aggregator only", "basic/outdated site", "OTA dependent")
- owner_name: from Owner/Host Name; if N/A → skip name entirely

WHAT YOU'VE ALREADY DONE (this is the hook — state it as fact):
- If has_own_site = No: "I put together a quick breakdown of what [property_name] is missing online for direct bookings"
- If has_own_site = Yes but weak: "I took a look at [property website] and noted a few things that are probably costing you direct inquiries"

MESSAGE RULES (non-negotiable):

1. DO NOT start with a greeting. No "Hey there", no "Hi", no "Hello". Start with the property name or a direct hook. Like a text from someone who's already mid-thought.

2. UNDER 45 WORDS. Hard limit. Every word must earn its place.

3. Structure (3 parts only):
   a) ONE sentence: property name + one specific digital observation (what channel they're on, what's missing). Not villa features.
   b) ONE sentence: what you already prepared for them (breakdown / audit / notes).
   c) ONE sentence: the ask. Dead simple. "Want me to send it?" / "Mind if I share?" / "Worth a look?"

4. DO NOT include any of these in the first message (save for reply):
   - Who you are or what you do
   - Commission structure or pricing
   - "I'm a founder" or any self-introduction
   - How your service works
   - The word "branding"
   - Villa amenities or features
   - Emojis, bullet points, formatting

5. Tone: like a short text from someone who did homework on their property and has something ready. Not formal. Not salesy. Not casual-fake. Just direct.

6. The ask must be so small that saying "sure" costs them nothing. You're not asking for a call, a meeting, or their time. You're asking if they want to see something you already made.

7. If owner_name is known, use it naturally (not as first word). If N/A, skip — no generic substitute.

8. Subject line (email only): property name + 3-4 words max. No clickbait.

EXAMPLES OF GOOD MESSAGES (for calibration, don't copy):

"[Villa X] — only showing up through [Aggregator] right now, no standalone site. I put together a short breakdown of what's missing for direct bookings. Want me to send it over?"

"[Villa Y] in [Location] — your site's live but most of the booking path still runs through [OTA]. I noted a few gaps that are probably leaking direct inquiries. Mind if I share?"

"[Villa Z] — no independent site, everything runs via [Platform]. I sketched out what a direct booking setup could look like for it. Worth a look?"

OUTPUT:

SUBJECT (email): [property_name] — [3-4 words]
MESSAGE: [under 45 words, 3 sentences, rules above]
```

---

## WhatsApp adaptation (sender: Mosiho, founder)

WhatsApp is different from email: no subject line, they see your name + photo, but they don't know who you are. You need one tiny clause of context ("I build direct booking sites for luxury villas") woven into the message — not a separate intro paragraph. Sign off with `— Mosiho`.

**WhatsApp-specific rules (override email rules above):**

- You **may** include one half-sentence about what you do (direct booking setups for villas) — because on WhatsApp there's no other way for them to know. Keep it inside the flow, not as an opening.
- Sign with `— Mosiho` at the end.
- No subject line obviously.
- Even shorter than email. Under 40 words (excluding signature).
- Lowercase-ish punctuation is fine (matches WhatsApp tone) but don't overdo it.

**Structure (WhatsApp):**

1. Property name + specific digital observation (what's missing, where traffic goes)
2. What that's costing them (commission angle — one clause)
3. What you already prepared + one clause of who you are
4. Tiny ask
5. `— Mosiho`

---

## Worked example — Uluwatu Estate (WhatsApp, from Mosiho)

**Lead data:**
`Uluwatu Estate, $5,380+/night, aggregator only (Ultimate Bali), no standalone site, no owner name known`

**Message:**

> Uluwatu Estate — no standalone site, everything runs through Ultimate Bali. At $5k+/night that's a lot of revenue staying with the channel.
>
> I build direct booking sites for luxury villas and already put together a short breakdown for yours. Worth a look?
>
> — Mosiho

**Why this works:**

- Opens with property name, not a greeting — signals "I know your property"
- Specific observation (Ultimate Bali, no standalone site) — not generic
- ADR + commission angle creates immediate "wait, how much am I losing?" reaction
- "already put together" = reciprocity + tangible deliverable waiting
- "Worth a look?" = costs them nothing to say yes
- Who you are is woven in, not a separate pitch line
- 42 words. Under 10 seconds to read.

---

## Quick-start

Paste one CSV row. Get a 3-sentence message that hooks with something you already prepared, asks one tiny question, and creates curiosity. Everything else (pricing, how it works, trial details) goes in the reply when they say "sure."
