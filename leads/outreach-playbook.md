# Nestino — Villa Lead Outreach & Reply Playbook

How we talk to villa owners and short-term rental operators: principles, CRM fields, AI prompts, first-message frameworks, and reply playbooks. Use this with `villa-leads.csv` and your CRM / outreach tab.

---

## Table of contents

1. [Communication principles](#1-communication-principles)
2. [Required lead variables](#2-required-lead-variables-for-ai-personalization)
3. [AI message generation — master prompt](#3-ai-message-generation-master-prompt)
4. [Channel-specific modifiers](#4-channel-specific-prompt-modifiers)
5. [First message frameworks](#5-first-message-frameworks)
6. [First message examples (template-ready)](#6-first-message-examples-template-ready)
7. [Reply handling — decision tree](#7-reply-handling-decision-tree)
8. [Response playbooks by reply type](#8-response-playbooks-by-reply-type)
9. [Advanced AI reply prompt](#9-advanced-ai-reply-prompt)
10. [Conversation stage map](#10-conversation-stage-map)
11. [Micro-objectives by stage](#11-micro-objectives-by-stage)
12. [Do / don’t](#12-do--dont)
13. [Final rule](#13-final-rule)

---

## 1. Communication principles

### Rule 1 — Never sound like a generic marketing agency

| Avoid | Prefer |
|--------|--------|
| “We help businesses grow online with AI-powered solutions” | “I noticed your villa is relying heavily on OTA channels” |
| “We can improve your digital presence” | “You’re probably leaving direct booking revenue on the table” |
| | “I think your property could convert well with a proper direct booking setup” |

### Rule 2 — Sell the outcome, not the website

**Do not lead with:** design, AI, CRM, SEO jargon, automation buzzwords.

**Lead with:** more direct bookings, less OTA dependency, repeat guest capture, direct inquiry flow, stronger branded booking experience.

### Rule 3 — Never dump the full pitch in the first message

The first message exists only to:

- get a reply  
- create curiosity  
- open a thread  

It is not there to close.

### Rule 4 — Personalization must feel real, not robotic

Draw personalization from:

- their villa design, location, branding, photos  
- current website weakness, OTA dependence  

Not fake flattery.

### Rule 5 — Every message must push toward the next micro-step

Move each thread toward one of:

reply → send example → send audit → send mockup → WhatsApp voice → call → pilot  

If the conversation is not moving, it is drifting.

---

## 2. Required lead variables for AI personalization

Add these fields to your Leads CRM or Outreach tab (merge tags shown as `{variable}`).

| Variable | Meaning | Example |
|----------|---------|---------|
| `{property_name}` | Villa / business name | Villa Uma Canggu |
| `{owner_name}` | Owner or manager first name | Daniel |
| `{location}` | Area / city | Uluwatu |
| `{market}` | Region / country cluster | Bali |
| `{property_type}` | Villa / boutique stay / manager | Villa |
| `{ota_platform}` | Main OTA platform | Airbnb |
| `{website_status}` | None / weak / decent | weak |
| `{direct_booking_status}` | no / weak / decent | no |
| `{personal_hook}` | One specific observation | Your pool / cliffside design stands out visually |
| `{brand_hook}` | One branding / positioning angle | The villa feels premium enough for direct booking traffic |
| `{pain_hook}` | One likely business pain | You may be losing repeat guests to OTA dependency |
| `{opportunity_hook}` | One direct booking opportunity | A branded direct booking page could convert IG / referral traffic better |
| `{social_channel}` | Main active channel | Instagram |
| `{language_tone}` | Warm / premium / casual | premium |
| `{cta_type}` | Desired next action | send mockup |
| `{objection_guess}` | Likely hesitation | already has website |

---

## 3. AI message generation — master prompt

Use this as the main prompt when generating a **first** outbound message.

```text
You are writing a cold outbound message for a villa owner / short-term rental operator.
Your job is to write a short, natural, high-converting outreach message that does NOT sound spammy, over-marketed, robotic, or like a generic agency.

Business context: Nestino helps boutique villa and short-term rental owners reduce OTA dependency by launching direct booking websites and branded booking flows.

Main goal of the message: Get a reply and open the conversation. Do NOT over-sell. Do NOT dump too much information.

Lead details:
Property name: {property_name}
Owner name: {owner_name}
Location: {location}
Market: {market}
Property type: {property_type}
Main OTA platform: {ota_platform}
Website status: {website_status}
Direct booking status: {direct_booking_status}
Personal hook: {personal_hook}
Brand hook: {brand_hook}
Pain hook: {pain_hook}
Opportunity hook: {opportunity_hook}
Main active channel: {social_channel}
Tone style: {language_tone}
Desired CTA: {cta_type}
Likely objection: {objection_guess}

Rules:
- Keep it under 90 words unless asked otherwise
- Sound human and founder-led
- Mention one real personalized observation
- Focus on direct bookings / OTA dependency / repeat guest opportunity
- No cheesy flattery
- No fake urgency
- No corporate jargon
- No emojis unless specifically requested
- End with a soft CTA

Output:
- Main message
- Shorter version
- Slightly more premium version
```

---

## 4. Channel-specific prompt modifiers

Append the relevant block to the master prompt (or reply prompt) for that channel.

### Instagram DM

```text
Write it in a lighter, more natural, DM-friendly tone. Make it feel easy to reply to. Keep it between 35 and 75 words.
```

### WhatsApp

```text
Write it like a direct founder-to-founder / operator message. Natural, clear, slightly more serious than Instagram, but still conversational.
```

### Email

```text
Write it in a concise but credible email style. Use a clean subject line. Keep the message sharp and easy to scan.
```

---

## 5. First message frameworks

### Framework A — Observation → Opportunity → Soft CTA

**When:** Strong personalization angle.

**Structure:** Specific observation → direct booking opportunity → soft CTA.

**Logic:** “I noticed…” → “You’d probably convert well with…” → “Happy to send a quick idea if useful.”

### Framework B — Pain → Relief → Pilot

**When:** They clearly rely on OTAs.

**Structure:** OTA dependency pain → what Nestino helps with → mention pilot lightly.

### Framework C — Audit hook

**When:** You want highest reply probability.

**Structure:** Noticed 2–3 missed opportunities → direct booking / repeat guest angle → ask if they want a quick breakdown.

### Framework D — Mockup hook

**When:** Property looks visually strong.

**Structure:** Strong visuals / premium feel → could convert on a branded booking page → offer a quick mockup idea.

---

## 6. First message examples (template-ready)

Replace `{…}` with lead variables from [section 2](#2-required-lead-variables-for-ai-personalization).

### A) General

> Hey {owner_name} — came across {property_name} in {location} and thought it looked like the kind of place that could do well with a stronger direct booking setup. {personal_hook}. If you’re mainly relying on {ota_platform}, there’s probably room to capture more direct inquiries and repeat guests. Happy to send a quick idea for how a branded booking page for it could look.

### B) OTA pain angle

> Hey {owner_name} — I was checking out {property_name} and noticed you seem to be relying mostly on {ota_platform} / OTA traffic. For properties like yours, that usually means leaving some direct booking and repeat guest revenue on the table. I help villa owners launch simple branded booking sites to reduce that dependency. Happy to show you a quick idea if useful.

### C) Mockup angle

> Hey {owner_name} — your place in {location} looks visually strong enough to convert really well on a direct booking page, especially with the way {personal_hook}. I’m currently helping villa owners build branded booking setups outside heavy OTA dependence. If you want, I can send a quick mockup idea for {property_name}.

### D) Audit angle

> Hey {owner_name} — I had a quick look at {property_name} and noticed a couple of missed direct booking opportunities around how the property is currently positioned online. Nothing huge, just some obvious conversion gaps. If useful, I can send you a very quick breakdown.

---

## 7. Reply handling — decision tree

**Rule:** Do not improvise emotionally. Use a system.

When a lead replies, **classify** into one bucket, then use the matching playbook in [section 8](#8-response-playbooks-by-reply-type).

| Bucket | Examples of lead language |
|--------|---------------------------|
| Curious / open | “Sure”, “Okay”, “Tell me more”, “What do you mean?” |
| Wants details | “Can you explain?”, “What exactly do you do?” |
| Wants pricing | “How much?”, “What’s the cost?” |
| Wants proof / example | “Do you have examples?”, “Can I see something?” |
| Already has website | “We already have a website”, “We already do direct bookings” |
| Not now / later | “Maybe later”, “Not right now”, “Busy now” |
| Not interested | “No thanks”, “Not interested” |
| Asks how it works | “How would this work exactly?”, “What’s the process?” |
| Asks for call | “Let’s talk”, “Can we have a call?” |
| No reply after first interaction | (use follow-up sequence) |

---

## 8. Response playbooks by reply type

Fill `{property_name}`, `{personal_hook}`, etc. from your CRM.

### 1) Curious / open

**Goal:** Move to example / audit / mockup.

> Absolutely — the main idea is helping properties like {property_name} build a stronger direct booking channel outside pure OTA dependence. Usually that means a branded booking page, better direct inquiry flow, and a cleaner path for repeat guests. If useful, I can send you a quick example / mockup idea based on your property.

### 2) Wants details

**Goal:** Explain simply, then push next step.

> Yes — in simple terms, I help villa owners launch a branded direct booking setup so they’re not relying only on Airbnb / Booking / OTA traffic. That usually includes a booking-focused website, direct inquiry flow, and a better path for repeat guests and referral traffic. I’m offering this as a pilot right now, so if you want I can show you what it could look like specifically for {property_name}.

### 3) Wants pricing

**Goal:** Do not lead with price only — reframe + qualify.

> Right now I’m offering a founding pilot setup, so there’s no upfront setup fee. The first 30 days are free, and if you want to keep it live after the pilot, it continues on a simple monthly plan. I usually like to first show what the setup would look like for the property, because the real value is whether it actually gives you a stronger direct booking channel. If you want, I can send a quick example.

### 4) Wants proof / example

**Goal:** Show proof fast.

> Yes — I can send over a quick example / demo and also outline what I’d improve specifically for {property_name}. That usually makes it much easier to see whether it would actually be useful for you. Want me to send the short version here?

### 5) Already has website

**Goal:** Do not retreat — reframe to conversion + direct booking quality.

> That’s actually a good sign — usually the issue isn’t just having a website, it’s whether it’s doing enough to convert direct traffic, capture repeat guests, and reduce OTA dependency meaningfully. A lot of properties have a site, but not a real direct booking system. If you want, I can point out 2–3 things I’d look at on yours specifically.

### 6) Not now / later

**Goal:** Do not disappear — lock timing.

> Totally fair. When would be a better time for me to circle back — next week, later this month, or after your current busy period? I can also just send a short summary now so it’s easy to revisit when timing is better.

### 7) Not interested

**Goal:** Leave door open without sounding needy.

> No worries at all — totally understand. If it’s useful down the line, I’d still be happy to send over a quick direct booking audit for {property_name} at some point. Either way, wishing you a strong season.

### 8) Asks how it works

**Goal:** Reduce uncertainty and friction.

> It’s pretty simple — I first look at the property and map out a cleaner direct booking setup for it. Then I build the booking-focused pages and direct inquiry flow, and once it’s live you can decide after the pilot whether you want to keep it running. It’s meant to be low-friction and not disruptive to your current OTA setup.

### 9) Asks for call

**Goal:** Move fast.

> Absolutely — happy to. I can do a short 10–15 minute call and walk you through the idea specifically for {property_name}. What time works better for you, or I can send a booking link if easier?

### 10) No reply after first interaction

**Goal:** Revive without sounding desperate.

**Follow-up 1:**

> Just following up in case this got buried — I still think {property_name} could do well with a stronger direct booking setup, especially given {personal_hook}. Happy to send a quick idea if useful.

**Follow-up 2:**

> Quick nudge here — I had one or two specific ideas for how {property_name} could capture more direct inquiries outside OTA traffic. If you want, I can send the short version here.

**Follow-up 3:**

> Last follow-up from my side — if improving direct bookings becomes more relevant later, I’d be happy to share a quick audit for {property_name}.

---

## 9. Advanced AI reply prompt

Use when a lead has replied and you want AI help drafting your answer.

```text
You are helping me reply to a lead for Nestino.

Context: Nestino helps villa and short-term rental owners reduce OTA dependency by launching direct booking websites and branded booking flows.

Lead details:
Property name: {property_name}
Owner name: {owner_name}
Location: {location}
Market: {market}
Website status: {website_status}
Direct booking status: {direct_booking_status}
Personal hook: {personal_hook}
Likely business pain: {pain_hook}
Current stage: {current_stage}
My desired next step: {cta_type}

Lead’s exact reply: {lead_reply}

Your task:
- Classify the reply type
- Explain the best strategic response in 1–2 lines
- Write a reply that feels natural, founder-led, and not salesy
- Keep it concise
- Move the conversation one step forward
- Give me 2 versions: one more casual, one more premium
```

Optional: append the channel modifier from [section 4](#4-channel-specific-prompt-modifiers).

---

## 10. Conversation stage map

Use these stages in your CRM / pipeline.

| Stage | Meaning | Goal |
|-------|---------|------|
| New | Lead added but untouched | Research / qualify |
| Ready to contact | Good lead prepared | Send first message |
| Contacted | First message sent | Get reply |
| Replied | Lead answered | Classify reply |
| Warm | Some interest shown | Send proof / audit / mockup |
| Audit sent | Value sent | Move to call |
| Call booked | Call scheduled | Qualify + close |
| Proposal sent | Offer explained | Close pilot |
| Pilot won | Agreed | Launch fast |
| Later | Timing issue | Follow up on date |
| Dead | Not moving | Archive |

---

## 11. Micro-objectives by stage

| Stage | Goal |
|-------|------|
| Contacted | Get reply |
| Replied | Identify intent |
| Warm | Send proof / mockup / audit |
| Audit sent | Move to call |
| Call booked | Get verbal yes |
| Proposal sent | Close pilot |
| Later | Preserve future opportunity |

---

## 12. Do / don’t

**Do**

- Personalize one real thing  
- Keep messages easy to reply to  
- Speak like a founder, not a salesperson  
- Use curiosity more than pressure  
- Push toward the next step  
- Use AI for speed, but human-edit before sending  

**Don’t**

- Sound like an agency brochure  
- Overexplain the product too early  
- Dump pricing immediately without context  
- Write walls of text  
- Sound needy after no reply  
- Promise guaranteed bookings  

---

## 13. Final rule

AI should help you scale **quality** — not automate laziness.

If a message could be sent to 500 random businesses, it is too generic.

**Bar:** *“This person actually looked at my property and understands the opportunity.”*
