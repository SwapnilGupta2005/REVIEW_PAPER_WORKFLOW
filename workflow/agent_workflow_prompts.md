# AI Agent Workflow — University Review Paper Pipeline

> **How to use:** Copy-paste each prompt below into your AI agent (Claude, ChatGPT, Gemini, etc.) in order. Wait for the AI to finish each stage before moving to the next.

---

## CONFIG

Before you begin, replace the bracketed values below with your specific details. Then, whenever a prompt says `{VARIABLE_NAME}`, use the value you set here.

```text
TOPIC: [INSERT YOUR TOPIC HERE]
PAPER_COUNT: 30
AUTHOR_1_NAME: [Your Name]
AUTHOR_1_DEPT: [Your Department]
AUTHOR_1_EMAIL: [your@email.com]
AUTHOR_2_NAME: [Co-author Name]
AUTHOR_2_DEPT: [Co-author Department]
AUTHOR_2_EMAIL: [coauthor@email.com]
PROFESSOR_NAME: [Professor Name]
PROFESSOR_TITLE: Assistant Professor
UNIVERSITY: [Your University Name]
OUTPUT_FILENAME: REVIEW_PAPER
```

---

## Before You Begin

Make sure the AI has access to these files in your working directory:
1. `templates/review_paper_format_guide.md` — The strict university formatting rules
2. `skills/humanizer/SKILL.md` — The tone and style guide to prevent AI-sounding text
3. `skills/docx_generator/SKILL.md` — Instructions for DOCX generation

---

## Stage 0: Input Validation

**Goal:** Verify topic feasibility before wasting time on research.

**Copy this prompt:**

```text
I want to write a review paper on the topic: "{TOPIC}"
Target number of papers: {PAPER_COUNT}

Before we begin the actual research, please validate this topic:
1. Confirm if this topic is specific enough to yield {PAPER_COUNT} legitimate peer-reviewed papers (not too broad like "AI generally" or too narrow).
2. Run a quick search/estimation of paper availability on Google Scholar, Semantic Scholar, or arXiv.
3. Suggest 2-3 refined topic phrasings if the original seems problematic.
4. If the topic looks good and likely to yield {PAPER_COUNT} strong papers, say "TOPIC VALIDATED". Otherwise, warn me.

Do not proceed to research until I confirm the final topic.
```

---

## Stage 1: Research & Discovery

**Goal:** Build a verified list of peer-reviewed research papers.

**Copy this prompt:**

```text
The topic is validated.

Your task is to search the web and find exactly {PAPER_COUNT} unique, peer-reviewed research papers related to this topic: "{TOPIC}". Each paper must meet these criteria:
- Published in 2017 or later
- From a credible venue (IEEE, ACM, CVPR, ICCV, ECCV, NeurIPS, AAAI, Springer, Elsevier journals, or equivalent)
- Directly relevant to the topic

If you cannot find {PAPER_COUNT} peer-reviewed papers on the exact topic, do the following in order:
1. Try 3 alternative phrasings of the topic.
2. Expand the search to include conference papers, theses, and preprints (arXiv, Semantic Scholar).
3. If still under {PAPER_COUNT}, notify me with the count found and ask permission to either (a) lower the target, (b) broaden the topic, or (c) include grey literature.
Do NOT silently pad the list with loosely related papers.

For each paper, provide the following in a clean markdown table:
| # | Title | Authors | Year | Venue | URL |

Save the output as `papers_list.md`.

IMPORTANT RULES:
- No duplicate papers
- Verify that each paper actually exists before including it

Stop and show me the list for review before proceeding.
```

---

## Stage 2: Drafting & Humanizing

Since generating {PAPER_COUNT} summaries exceeds what most AI models can do reliably in one pass, this stage is split into sub-prompts. Run them in order.

### Stage 2a: Title, Abstract, Introduction, Objective

```text
Please read these local files before starting:
- `templates/review_paper_format_guide.md` (formatting rules)
- `skills/humanizer/SKILL.md` (writing style — remove all AI-sounding patterns)

Using the topic "{TOPIC}" and the data in `papers_list.md`, generate the following sections:

1. **Title** — Under 12 words, Title Case, no subtitle, no colon
2. **Author Block** — Use these values:
   - {AUTHOR_1_NAME} ({AUTHOR_1_DEPT}, {UNIVERSITY}, {AUTHOR_1_EMAIL})
   - {AUTHOR_2_NAME} ({AUTHOR_2_DEPT}, {UNIVERSITY}, {AUTHOR_2_EMAIL})
   - {PROFESSOR_NAME} ({PROFESSOR_TITLE}, {UNIVERSITY}, {PROFESSOR_EMAIL})
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

*(Note: Depending on {PAPER_COUNT}, repeat the above prompt for papers 11-20, 21-30, adjusting the numbers in the prompt, until all papers are summarized.)*

### Stage 2c: Synthesis & Assembly

```text
Continue building `REVIEW_CONTENT.md`. Generate the remaining sections:

1. **Section IV: Comparison of {PAPER_COUNT} Published Research Papers**
   - Write ONE introductory paragraph explaining why comparison is needed
   - Create a 7-column table with EXACTLY 5 rows of data
   - Columns: S.No | Title of RP | Author Name | Year | Objective | Methodology | Conclusion/Result
   - Author format: "Last et al. (Year)" for 3+ authors
   - Select 5 papers that represent DIFFERENT techniques from the {PAPER_COUNT} reviewed
   - Add a table caption ABOVE the table: "Table 1. Comparative Summary of Selected Published Research Papers"

2. **Section V: Conclusion** — Exactly 3 paragraphs:
   - Paragraph 1: Summary of techniques and methods reviewed
   - Paragraph 2: Remaining challenges and limitations
   - Paragraph 3: Forward-looking closing statement
   - Do NOT introduce any new information

3. **Section VI: Future Scope** — 1 paragraph, approximately 150 words
   - Mention emerging technologies, application domains, hardware improvements, open problems

4. **References** — All papers in strict APA format
   - Label: "References" (no Roman numeral)
   - Numbered [1] through [{PAPER_COUNT}] in square brackets
   - Use proper APA citation format

Apply the humanizer skill to all prose sections. Append everything to `REVIEW_CONTENT.md`.
Then, merge all sections in order to form the final, complete `REVIEW_CONTENT.md`.
```

### Stage 2d: Citation Audit

**Goal:** Verify academic integrity before locking the document.

**Copy this prompt:**

```text
Review every in-text citation in the drafted `REVIEW_CONTENT.md`. For each [N] reference:
- Confirm it matches an entry in the `papers_list.md` exactly (title, author, year).
- Confirm it is cited in the correct section context.
- Confirm the APA reference entry at the end is correctly formatted.
List any mismatches, missing references, or formatting errors. Fix all issues in `REVIEW_CONTENT.md` before proceeding.
```

---

## Stage 3: Pre-Export Quality Check & DOCX Generation

**Goal:** Ensure the document perfectly matches university formatting and export it to DOCX.

**Copy this prompt:**

```text
Before generating the DOCX script, verify the following against `templates/review_paper_format_guide.md`:
- [ ] Title is 24pt Bold, Centered, Title Case
- [ ] Authors are in a 3-column borderless table
- [ ] Abstract follows the 6-point structure with inline bold label + em-dash
- [ ] Keywords: exactly 5–7, Title Case
- [ ] Introduction has exactly 3 paragraphs
- [ ] Literature Review has exactly {PAPER_COUNT} paragraphs, each ending with a citation
- [ ] Comparison table has 7 columns and 5 rows
- [ ] Conclusion has exactly 3 paragraphs
- [ ] References are APA format, numbered [1]–[{PAPER_COUNT}]
- [ ] Word count of Future Scope section is approximately 150 words
Report any failures. Fix them in `REVIEW_CONTENT.md` before proceeding.

I now have the fully audited and formatted markdown file `REVIEW_CONTENT.md`.

You have three options for generating the final DOCX file. Choose ONE based on my environment:

**Option A (Node.js):**
Write a complete Node.js script using the `docx` npm library. Read `skills/docx_generator/SKILL.md` to ensure correct usage. Name the script `generate_docx.js`.
Then tell me to run: `npm install docx && node generate_docx.js`

**Option B (Python):**
Write a complete Python script using the `python-docx` library. Name the script `generate_docx.py`.
Then tell me to run: `pip install python-docx && python generate_docx.py`

**Option C (Pandoc):**
Provide the exact Pandoc CLI command to convert `REVIEW_CONTENT.md` directly into `{OUTPUT_FILENAME}.docx`.

No matter which option you take, the output MUST enforce these formatting rules:
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

I prefer Option [CHOOSE A, B, or C].
```

---

## Troubleshooting

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
