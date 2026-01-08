Perfect — below is a **clean, high-quality prompt** you can drop straight into **Cursor / Claude / GPT-5** to scaffold this properly. It’s opinionated enough to get a strong result, but flexible for iteration.

---

## 🎯 **Prompt: Personal Portfolio + Blog (Typewriter Style)**

> **Role:**
> You are a senior full-stack developer and product designer with strong experience building minimalist personal portfolio websites for professionals in healthcare, technology, and consulting.

> **Task:**
> Build a **personal portfolio website** that represents a multidisciplinary professional career.
> The site should include:
>
> * A **personal profile / landing page**
> * A **consultancy services** section
> * An **integrated blog** (first-person writing)
> * A **contact section**
>
> The design aesthetic must be **typewriter / editorial / black-and-white**, minimal, timeless, and text-first.

---

## 🧱 **Technical Requirements**

* Framework: **Next.js (App Router)**
* Styling: **Tailwind CSS**
* Fonts:

  * Primary: typewriter-style monospace (e.g. `IBM Plex Mono`, `JetBrains Mono`, or `Courier Prime`)
* No heavy animations
* Fast load time, SEO-friendly
* Mobile responsive
* Clean folder structure
* Markdown-based blog (MDX preferred)

---

## 🎨 **Design System (Very Important)**

* **Black & white only**
* No gradients
* No cards
* No glassmorphism
* No rounded buttons
* No icons unless absolutely necessary
* Layout inspired by:

  * Academic journals
  * Typewritten manuscripts
  * Minimal Unix documentation pages
* Cursor should feel like reading a document, not a “startup website”

Examples of tone:

* Plain
* Precise
* Thoughtful
* Human
* Not salesy

---

## 🧩 **Pages & Content Structure**

### 1. Home (`/`)

* Large typewriter headline with name
* One-paragraph professional summary written in first person
* Short list of current focus areas
* Subtle links to:

  * Blog
  * Consultancy
  * Contact

---

### 2. Consultancy (`/consulting`)

Explain services clearly and professionally, aimed at:

* Healthcare
* AI / digital health
* Technical consulting
* Education / training

Structure:

* What I help with
* Who this is for
* How I work
* Engagement style (short-term, advisory, project-based)
* Clear call to contact (email or form)

Avoid buzzwords. Write like a senior professional.

---

### 3. Blog (`/blog`)

* Markdown/MDX-based posts
* Chronological list
* Minimal metadata (date, title, reading time)
* Blog tone:

  * Reflective
  * Analytical
  * First-person
  * Professional but personal
* Topics may include:

  * Career reflections
  * Healthcare innovation
  * AI & medicine
  * Systems thinking
  * Lessons learned

---

### 4. Blog Post (`/blog/[slug]`)

* Single-column reading layout
* Large readable text
* Wide line spacing
* No distractions
* Optional footnotes style links

---

### 5. Contact (`/contact`)

* Minimal
* One paragraph explaining how to reach me
* Email displayed plainly
* Optional simple contact form
* No social media clutter

---

## 🗂️ **File Structure Example**

```
/app
  /page.tsx
  /consulting/page.tsx
  /blog/page.tsx
  /blog/[slug]/page.tsx
  /contact/page.tsx
/components
  Layout.tsx
  Header.tsx
  Footer.tsx
/content
  /blog
    first-post.mdx
/styles
```

---

## 🧠 **Extra Instructions**

* Write placeholder copy that sounds **human**, not corporate
* Avoid marketing clichés
* Do not over-engineer
* Prefer clarity over cleverness
* This site should feel credible to:

  * Clinicians
  * Engineers
  * Academics
  * Founders

---

## ✅ **Output Expected**

1. Project scaffold (Next.js + Tailwind)
2. Core layout components
3. Example homepage copy
4. Example consultancy copy
5. Example blog post MDX
6. Font + styling setup
7. Brief explanation of design decisions

---

If you want, next we can:

* Strip this down even further (ultra-minimal)
* Add **CV-style timeline**
* Add **“Selected Work / Projects”**
* Convert it into a **static Markdown-only site**
* Or tailor copy specifically to **NHS / healthcare consulting**

Just say the word.
