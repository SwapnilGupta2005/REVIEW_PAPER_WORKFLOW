# AI Agent Workflow — University Review Paper Pipeline

> **How to use:** Copy-paste each prompt below into your AI agent (Claude, ChatGPT, Gemini, etc.) in order. Wait for the AI to finish each stage before moving to the next.

---

## Before You Begin

Make sure the AI has access to these files in your working directory:
1. `templates/review_paper_format_guide.md` — The strict university formatting rules
2. `skills/humanizer/SKILL.md` — The tone and style guide to prevent AI-sounding text
3. `skills/docx_generator/SKILL.md` — Instructions for DOCX generation

---

## Stage 1: Research & Discovery

**Goal:** Build a verified list of 30 peer-reviewed research papers.

**Copy this prompt:**

```text
I am writing an academic review paper on the topic:
"[INSERT YOUR TOPIC HERE]"

Your task is to search the web and find exactly 30 unique, peer-reviewed research papers related to this topic. Each paper must meet these criteria:
- Published in 2017 or later
- From a credible venue (IEEE, ACM, CVPR, ICCV, ECCV, NeurIPS, AAAI, Springer, Elsevier journals, or equivalent)
- Directly relevant to the topic

For each paper, provide the following in a clean markdown table:
| # | Title | Authors | Year | Venue | URL |

Save the output as `papers_list.md`.

IMPORTANT RULES:
- No duplicate papers
- No preprints unless from a well-known research group
- Verify that each paper actually exists before including it
- If you cannot find 30 papers on the exact topic, broaden slightly to closely related subtopics but note which ones are broadened

Stop and show me the list for review before proceeding.
```

---

## Stage 2: Drafting & Humanizing

Since 30 summaries exceed what most AI models can generate reliably in a single pass, this stage is split into 4 sub-prompts. Run them in order.

### Stage 2a: Title, Abstract, Introduction, Objective

```text
Please read these local files before starting:
- `templates/review_paper_format_guide.md` (formatting rules)
- `skills/humanizer/SKILL.md` (writing style — remove all AI-sounding patterns)

Using the topic "[INSERT TOPIC HERE]" and the data in `papers_list.md`, generate the following sections:

1. **Title** — Under 12 words, Title Case, no subtitle, no colon
2. **Author Block** — Use these placeholders:
   - Student A (Department of Computer Science, [University Name], [email])
   - Student B (Department of Computer Science, [University Name], [email])
   - [Professor Name] (Assistant Professor, [University Name], [email])
3. **Abstract** — Follow the strict 6-point structure from the format guide. Use the bold inline label with em-dash: "Abstract —". Length: 200-300 words.
4. **Keywords** — 5-7 keywords, Title Case, comma-separated, bold label with em-dash
5. **Section I: Introduction** — 3 paragraphs of background. No bullet points.
6. **Section II: Objective** — 1 paragraph, 5-8 sentences, third person

Apply the humanizer skill to ALL text. The writing must not sound AI-generated.

Save the output to a new file: `REVIEW_CONTENT.md`
```

### Stage 2b: Literature Review — Papers 1-10

```text
Continue building `REVIEW_CONTENT.md`. Add Section III: Literature Review.

Generate literature review paragraphs for papers 1 through 10 from `papers_list.md`.

STRICT RULES (from the format guide):
- ONE paragraph per paper
- Each paragraph is exactly 3-4 sentences following this pattern:
  Sentence 1: What the paper proposes or investigates
  Sentence 2: The method or approach used
  Sentence 3: Key result or finding
  Sentence 4 (optional): Significance or implication
- Citation number [N] appears at the END of each paragraph, in bold
- Do NOT mention author names inside the paragraph body
- Do NOT use bullet points — prose paragraphs only
- Apply the humanizer skill: no inflated significance, no promotional language, no AI vocabulary

Append these 10 paragraphs to `REVIEW_CONTENT.md`.
```

### Stage 2c: Literature Review — Papers 11-20

```text
Continue building `REVIEW_CONTENT.md`.

Generate literature review paragraphs for papers 11 through 20 from `papers_list.md`.

Follow the EXACT same rules as the previous batch:
- 3-4 sentences per paragraph
- Citation [N] at the end in bold
- No author names in body
- No bullets
- Humanizer skill applied

Append these 10 paragraphs to `REVIEW_CONTENT.md`.
```

### Stage 2d: Literature Review — Papers 21-30

```text
Continue building `REVIEW_CONTENT.md`.

Generate the final literature review paragraphs for papers 21 through 30 from `papers_list.md`.

Follow the EXACT same rules as the previous batches.

Append these 10 paragraphs to `REVIEW_CONTENT.md`.
```

---

## Stage 3: Synthesis & Assembly

```text
Continue building `REVIEW_CONTENT.md`. Generate the remaining sections:

1. **Section IV: Comparison of 30 Published Research Papers**
   - Write ONE introductory paragraph explaining why comparison is needed
   - Create a 7-column table with EXACTLY 5 rows of data
   - Columns: S.No | Title of RP | Author Name | Year | Objective | Methodology | Conclusion/Result
   - Author format: "Last et al. (Year)" for 3+ authors
   - Select 5 papers that represent DIFFERENT techniques from the 30 reviewed
   - Add a table caption ABOVE the table: "Table 1. Comparative Summary of Selected Published Research Papers"

2. **Section V: Conclusion** — Exactly 3 paragraphs:
   - Paragraph 1: Summary of techniques and methods reviewed
   - Paragraph 2: Remaining challenges and limitations
   - Paragraph 3: Forward-looking closing statement
   - Do NOT introduce any new information

3. **Section VI: Future Scope** — 1 paragraph, approximately 150 words
   - Mention emerging technologies, application domains, hardware improvements, open problems

4. **References** — All 30 papers in strict APA format
   - Label: "References" (no Roman numeral)
   - Numbered [1] through [30] in square brackets
   - Use proper APA citation format

Apply the humanizer skill to all prose sections.

Append everything to `REVIEW_CONTENT.md`.
```

---

## Stage 4: DOCX Generation

```text
I now have the fully compiled markdown file `REVIEW_CONTENT.md`.

Please read `skills/docx_generator/SKILL.md` to understand how to generate DOCX files.

Write a complete Node.js script using the `docx` npm library that contains all my content from `REVIEW_CONTENT.md` and generates a professionally formatted DOCX file.

The script MUST enforce these formatting rules:
- Font: Times New Roman throughout
- Title: 24pt Bold, Centered
- Body text: 12pt
- Section headings: 14-16pt Bold with Roman numerals (I, II, III...)
- Author block: 3-column borderless table with Name, Department, University, Email per cell
- Comparison table: 7 columns with light blue header row, proper borders
- Page size: US Letter (8.5 x 11 inches)
- Margins: 1 inch on all sides
- Header: Running title (italics, right-aligned)
- Footer: "Page X of Y" (centered)
- References: Hanging indent, 10pt font
- Page breaks before major sections where appropriate

Name the script `generate_docx.js`.

After creating the script, tell me to run:
npm install docx
node generate_docx.js
```

---

## Troubleshooting

### "Cannot find module 'docx'"
Run `npm install docx` in the same directory as your `generate_docx.js` script.

### "Cannot find module" with wrong path
On Windows, use the full path: `node D:\path\to\generate_docx.js`
Or switch drives first: `D: && cd \folder && node generate_docx.js`

### AI loses context mid-workflow
This is why the workflow is batched. If the AI forgets the format rules, re-paste the instruction to read `review_paper_format_guide.md` and `humanizer/SKILL.md` at the start of your next prompt.

### Generated text sounds too "AI"
Re-run the specific section with this additional instruction appended:
```text
Before finalizing, perform the humanizer anti-AI audit:
1. Ask: "What makes the below so obviously AI generated?"
2. List the remaining tells briefly
3. Ask: "Now make it not obviously AI generated."
4. Revise accordingly
```

---

*End of Workflow Guide*
