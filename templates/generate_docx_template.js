/**
 * DOCX Generator Template for Review Papers
 * 
 * USAGE:
 *   1. npm install docx
 *   2. Replace the placeholder content below with your actual paper content
 *   3. node generate_docx_template.js
 * 
 * This template follows the review_paper_format_guide.md formatting rules:
 *   - Times New Roman throughout
 *   - 24pt Bold centered title
 *   - 3-column borderless author table
 *   - 7-column comparison table
 *   - Page numbers in footer
 *   - US Letter size (8.5 x 11 inches)
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, ExternalHyperlink, PageNumber, Header, Footer,
  LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
const CONFIG = {
  title: '[YOUR PAPER TITLE HERE]',
  runningTitle: '[Short Running Title]',
  outputFile: 'REVIEW_PAPER.docx',
  authors: [
    { name: 'Student A', dept: 'Department of Computer Science', uni: 'University Name, City, State', email: 'studentA@university.edu' },
    { name: 'Student B', dept: 'Department of Computer Science', uni: 'University Name, City, State', email: 'studentB@university.edu' },
    { name: 'Professor Name', designation: 'Assistant Professor', dept: 'Department of Computer Science', uni: 'University Name, City, State', email: 'professor@university.edu' },
  ]
};

// ─── BORDERS ──────────────────────────────────────────────────────────────────
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER };
const TABLE_BORDER = { style: BorderStyle.SINGLE, size: 1, color: 'AAAAAA' };
const TABLE_BORDERS = { top: TABLE_BORDER, bottom: TABLE_BORDER, left: TABLE_BORDER, right: TABLE_BORDER };

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const tnr = (text, opts = {}) => new TextRun({ text, font: 'Times New Roman', ...opts });

function body(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 120 },
    children: [tnr(text, { size: 24 })]
  });
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 280, after: 140 },
    children: [tnr(text, { size: 28, bold: true })]
  });
}

function tableCell(text, widthDxa, shade = null, bold = false, size = 20) {
  return new TableCell({
    borders: TABLE_BORDERS,
    width: { size: widthDxa, type: WidthType.DXA },
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    verticalAlign: VerticalAlign.TOP,
    children: [new Paragraph({ children: [tnr(text, { size, bold })] })]
  });
}

// ─── AUTHOR BLOCK ─────────────────────────────────────────────────────────────
function makeAuthorBlock() {
  const colW = 3120;
  const makeCell = (author) => new TableCell({
    borders: NO_BORDERS,
    width: { size: colW, type: WidthType.DXA },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [tnr(author.name, { size: 24, bold: true })] }),
      ...(author.designation ? [new Paragraph({ alignment: AlignmentType.CENTER, children: [tnr(author.designation, { size: 24 })] })] : []),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [tnr(author.dept, { size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [tnr(author.uni, { size: 24 })] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new ExternalHyperlink({
          link: `mailto:${author.email}`,
          children: [new TextRun({ text: author.email, font: 'Times New Roman', size: 24, style: 'Hyperlink', underline: {} })]
        })]
      }),
    ]
  });

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [colW, colW, colW],
    rows: [new TableRow({ children: CONFIG.authors.map(makeCell) })]
  });
}

// ─── CONTENT (REPLACE THESE WITH YOUR ACTUAL CONTENT) ─────────────────────────
const abstractText = '[YOUR ABSTRACT TEXT HERE - 200-300 words covering all 6 required points]';
const keywordsText = 'Keyword One, Keyword Two, Keyword Three, Keyword Four, Keyword Five';

const introParas = [
  '[Introduction paragraph 1]',
  '[Introduction paragraph 2]',
  '[Introduction paragraph 3]',
];

const objectiveText = '[Your objective paragraph here - 5-8 sentences, third person]';

// Literature review: array of 30 objects { text, citation }
const litReview = [
  // { text: 'Paragraph text here...', citation: '[1]' },
  // ... repeat for all 30 papers
];

// Comparison table: 5 rows of 7 columns
const compRows = [
  // ['1', 'Paper Title', 'Author et al. (Year)', 'Year', 'Objective', 'Methodology', 'Result'],
  // ... repeat for 5 papers
];

const conclusionParas = [
  '[Conclusion paragraph 1 - summary]',
  '[Conclusion paragraph 2 - challenges]',
  '[Conclusion paragraph 3 - forward-looking]',
];

const futureText = '[Future scope paragraph - ~150 words]';

// References: array of 30 APA-formatted strings
const references = [
  // '[1] Author, A. (Year). Title. Journal, Vol(Issue), pages.',
  // ... repeat for 30
];

// ─── BUILD DOCUMENT ───────────────────────────────────────────────────────────
const children = [
  // Title
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [tnr(CONFIG.title, { size: 48, bold: true })]
  }),

  // Authors
  makeAuthorBlock(),
  new Paragraph({ spacing: { after: 200 }, children: [] }),

  // Abstract
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 120 },
    children: [
      tnr('Abstract\u2014', { size: 24, bold: true }),
      tnr(abstractText, { size: 24 })
    ]
  }),

  // Keywords
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 240 },
    children: [
      tnr('Keywords\u2014', { size: 24, bold: true }),
      tnr(keywordsText, { size: 24 })
    ]
  }),

  // Introduction
  sectionHeading('I. Introduction'),
  ...introParas.map(p => body(p)),

  // Objective
  sectionHeading('II. Objective'),
  body(objectiveText),

  // Literature Review
  sectionHeading('III. Literature Review'),
  ...litReview.map(({ text, citation }) => new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 120 },
    children: [
      tnr(text, { size: 24 }),
      tnr(' ' + citation, { size: 24, bold: true })
    ]
  })),

  // Comparison Table
  sectionHeading('IV. Comparison of 30 Published Research Papers'),
  body('[Introductory paragraph explaining why comparison is needed]'),
  new Paragraph({ spacing: { after: 80 }, children: [tnr('Table 1. Comparative Summary of Selected Published Research Papers', { size: 18, bold: true })] }),
  ...(compRows.length > 0 ? [new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [500, 1500, 1300, 500, 1700, 1800, 2060],
    rows: [
      new TableRow({
        tableHeader: true,
        children: ['S.No', 'Title of the RP', 'Author Name', 'Year', 'Objective', 'Methodology', 'Conclusion / Result']
          .map((h, i) => tableCell(h, [500, 1500, 1300, 500, 1700, 1800, 2060][i], 'D5E8F0', true, 18))
      }),
      ...compRows.map(row => new TableRow({
        children: row.map((cell, i) => tableCell(cell, [500, 1500, 1300, 500, 1700, 1800, 2060][i], null, false, 18))
      }))
    ]
  })] : []),

  // Conclusion
  sectionHeading('V. Conclusion'),
  ...conclusionParas.map(p => body(p)),

  // Future Scope
  sectionHeading('VI. Future Scope'),
  body(futureText),

  // References
  sectionHeading('References'),
  ...references.map(ref => new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 100 },
    indent: { left: 360, hanging: 360 },
    children: [tnr(ref, { size: 20 })]
  }))
];

// ─── ASSEMBLE & WRITE ─────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Times New Roman', size: 24 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Times New Roman' },
        paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '444444', space: 1 } },
          children: [tnr(CONFIG.runningTitle, { size: 18, italics: true })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: '444444', space: 1 } },
          children: [
            tnr('Page ', { size: 18 }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 18 }),
            tnr(' of ', { size: 18 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 18 })
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(CONFIG.outputFile, buffer);
  console.log(`Done! Generated ${CONFIG.outputFile}`);
}).catch(err => {
  console.error('Error generating DOCX:', err);
});
