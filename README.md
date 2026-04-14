# Review Paper Workflow — AI Agent Pipeline

A complete, reusable AI-agent workflow for generating university-level 30-paper review documents. Feed these prompts into any advanced AI coding agent (Claude, ChatGPT, Gemini, etc.) and it will autonomously **research**, **summarize**, **humanize**, and **format** an academic review paper as a `.docx` file.

---

## ⚠ Academic Integrity

**This tool generates AI-assisted academic content. Before submitting any output:**
- Check your institution's policy on AI-assisted writing.
- Disclose AI use if required by your professor, department, or journal.
- Verify all citations independently — AI-generated references may contain errors.
- Use this tool for drafting and learning, not for submitting work that must be wholly your own.

The authors of this workflow are not responsible for any academic misconduct arising from its misuse.

---

## Repository Structure

```
REVIEW_PAPER_WORKFLOW/
├── README.md                          ← You are here
├── run.sh / run.bat                   ← CLI Wrapper to guide you through prompts
├── config.md                          ← Central variables for the wrapper scripts
├── workflow/
│   └── agent_workflow_prompts.md      ← The main 4-stage pipeline prompts
├── skills/
│   ├── humanizer/
│   │   └── SKILL.md                   ← Removes AI-sounding text patterns
│   └── docx_generator/
│       └── SKILL.md                   ← Instructs AI to create .docx files
├── templates/
│   ├── review_paper_format_guide.md   ← Strict university formatting rules
│   ├── generate_docx_template.js      ← Reusable Node.js DOCX script
│   └── generate_docx_template.py      ← Reusable Python DOCX script
└── examples/
    └── CG_REVIEW_CONTENT.md           ← Sample output (30-paper VFI review)
```

---

## How It Works

The workflow is broken into **4 sequential stages**, handled interactively by the CLI wrapper or via a copy-paste prompts file:

| Stage | What It Does | Output |
|---|---|---|
| **0. Validate** | Checks if the topic is feasible for 30 papers | Validation |
| **1. Research** | Finds peer-reviewed papers with logical fallbacks | `papers_list.md` |
| **2. Draft & Assemble** | Writes the paper, humanizes it, and audits citations | Final `REVIEW_CONTENT.md` |
| **3. DOCX Export** | Generates the document using Node, Python, or Pandoc | `REVIEW_PAPER.docx` |

---

## Quick Start

### Step 1: Clone and Configure
1. Clone this repo:
   ```bash
   git clone https://github.com/SwapnilGupta2005/REVIEW_PAPER_WORKFLOW.git
   cd REVIEW_PAPER_WORKFLOW
   ```
2. Open `config.md` (or the top of `agent_workflow_prompts.md`) and customize your topic, author names, and university.

### Step 2: Run the Workflow
The easiest way is to use the interactive CLI wrapper:

- **Windows:** Run `run.bat`
- **Mac/Linux:** Run `./run.sh`

The script will read your config and print exact prompts to copy-paste into your AI agent (like Claude Code or ChatGPT) one step at a time. 

Alternatively, open `workflow/agent_workflow_prompts.md` and manually copy the prompts sequentially.

---

## Export Options (Stage 3)

The workflow supports three different ways to generate your final `.docx`. Choose the one you already have installed:

### Option A: Node.js (Recommended)
Requires [Node.js](https://nodejs.org/) installed.
```bash
npm install docx
node generate_docx.js
```

### Option B: Python
Requires [Python](https://www.python.org/) installed.
```bash
pip install python-docx
python generate_docx.py
```

### Option C: Pandoc
Requires [Pandoc](https://pandoc.org/) installed. (The AI will provide the exact command, usually something like):
```bash
pandoc REVIEW_CONTENT.md -o REVIEW_PAPER.docx
```

---

## Skills Explained

### Humanizer (`skills/humanizer/SKILL.md`)
Based on Wikipedia's "Signs of AI Writing" guide. It detects and fixes 29 categories of AI-generated text patterns (with exact Before/After rules for each) including:
- Inflated significance language
- Promotional tone
- Sycophantic tone
- Verbose filler phrases

### DOCX Generator (`skills/docx_generator/SKILL.md`)
Instructs the AI on exactly how to create `.docx` files using the `docx` library, enforcing borders, fonts, margins, and layouts.

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
- **Workflow Design**: Built during a Computer Graphics review paper project at Amity University Raipur
