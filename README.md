# Review Paper Workflow — AI Agent Pipeline

A complete, reusable AI-agent workflow for generating university-level 30-paper review documents. Feed these prompts into any advanced AI coding agent (Claude, ChatGPT, Gemini, etc.) and it will autonomously **research**, **summarize**, **humanize**, and **format** an academic review paper as a `.docx` file.

---

## Repository Structure

```
REVIEW_PAPER_WORKFLOW/
├── README.md                          ← You are here
├── workflow/
│   └── agent_workflow_prompts.md      ← The main 4-stage pipeline prompts
├── skills/
│   ├── humanizer/
│   │   └── SKILL.md                   ← Removes AI-sounding text patterns
│   └── docx_generator/
│       └── SKILL.md                   ← Instructs AI to create .docx files
├── templates/
│   ├── review_paper_format_guide.md   ← Strict university formatting rules
│   └── generate_docx_template.js      ← Reusable Node.js DOCX generator
└── examples/
    └── CG_REVIEW_CONTENT.md           ← Sample output (30-paper VFI review)
```

---

## How It Works

The workflow is broken into **4 sequential stages**, each with a ready-to-paste prompt:

| Stage | What It Does | Output |
|---|---|---|
| **1. Research** | AI searches the web for 30 peer-reviewed papers on your topic | `papers_list.md` |
| **2. Draft & Humanize** | AI writes the full paper in batches (Intro → Lit Review → Conclusion) | `REVIEW_CONTENT.md` |
| **3. Assemble** | AI merges all sections into a single, format-compliant markdown file | Final `REVIEW_CONTENT.md` |
| **4. DOCX Export** | AI generates a Node.js script; you run one command to get a `.docx` | `REVIEW_PAPER.docx` |

---

## Quick Start

### Prerequisites
- **Node.js** (v18+) installed on your machine
- **npm** (comes with Node.js)
- An AI coding agent (Claude Code, Gemini in IDE, ChatGPT, etc.)

### Step-by-Step

1. **Clone this repo**
   ```bash
   git clone https://github.com/SwapnilGupta2005/REVIEW_PAPER_WORKFLOW.git
   cd REVIEW_PAPER_WORKFLOW
   ```

2. **Install the DOCX library**
   ```bash
   npm install docx
   ```

3. **Open `workflow/agent_workflow_prompts.md`** and follow the 4 stages sequentially. Copy-paste each prompt into your AI agent.

4. **When you reach Stage 4**, the AI will generate a `generate_docx.js` script. Run it:
   ```bash
   node generate_docx.js
   ```

5. **Open your generated `.docx`** file in Microsoft Word or Google Docs.

---

## Customization

### Change the Topic
In Stage 1 of `agent_workflow_prompts.md`, replace `[INSERT YOUR TOPIC HERE]` with your research topic. Examples:
- "Game Engines in Neuroscience: Leveraging Modern Graphics Pipelines for BCI Feedback"
- "Deep Learning Approaches to Medical Image Segmentation"
- "Blockchain Applications in Supply Chain Management"

### Change the Authors
In Stage 2a, update the author block with your own names, departments, and emails.

### Change the Professor
Replace "Assistant Professor Goldi Soni" with your own professor's details.

---

## Skills Explained

### Humanizer (`skills/humanizer/SKILL.md`)
Based on Wikipedia's "Signs of AI Writing" guide. It detects and fixes 29 categories of AI-generated text patterns including:
- Inflated significance language
- Promotional tone
- Superficial "-ing" analyses
- Em dash overuse
- Rule of three
- Sycophantic tone
- And 23 more patterns

### DOCX Generator (`skills/docx_generator/SKILL.md`)
Instructs the AI on exactly how to create, read, and edit `.docx` files using the `docx` npm library, including:
- Page sizing and margins
- Tables with proper borders
- Headers, footers, and page numbers
- Images, hyperlinks, and footnotes
- Tracked changes and comments

---

## Format Guide Summary

The `templates/review_paper_format_guide.md` enforces a strict academic structure:

| Section | Requirement |
|---|---|
| Title | 24pt Bold, Centered, Title Case |
| Authors | 3-column borderless table |
| Abstract | Inline bold label + em-dash, 6-point structure |
| Keywords | 5-7 keywords, Title Case |
| Introduction | 3 paragraphs + figures |
| Objective | 1 paragraph, third person |
| Literature Review | Exactly 30 paragraphs, citation at end |
| Comparison Table | 7 columns, 5 rows |
| Conclusion | 3 paragraphs |
| Future Scope | 1 paragraph (~150 words) |
| References | APA format, [1]-[30] |

---

## License

MIT — Use freely for academic and personal projects.

---

## Credits

- **Humanizer Skill**: Based on [Wikipedia: Signs of AI Writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- **DOCX Skill**: Based on the `docx` npm library
- **Workflow Design**: Built during a Computer Graphics review paper project at Amity University Raipur
