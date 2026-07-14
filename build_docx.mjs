import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { parseManualText, FALLBACK_RAW_TEXT } from './src/utils/docFetcher.js';

const sections = parseManualText(FALLBACK_RAW_TEXT);

const children = [
  new Paragraph({
    text: "GUSTYKITE OPERATIONS & TRAINING MANUAL",
    heading: HeadingLevel.TITLE,
    spacing: { after: 300 }
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Procedures, Lesson Timelines, Reception, Rentals, and Gear Maintenance",
        italics: true
      })
    ],
    spacing: { after: 400 }
  })
];

sections.forEach(sec => {
  // Heading 1 for Section Title
  children.push(new Paragraph({
    text: sec.title.toUpperCase(),
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 }
  }));

  // General notes
  sec.generalNotes.forEach(noteObj => {
    const noteText = typeof noteObj === 'object' ? noteObj.text : noteObj;
    const noteType = typeof noteObj === 'object' ? noteObj.type : 'normal';
    const noteRun = [];

    if (noteType !== 'normal') {
      const typeStr = noteType.charAt(0).toUpperCase() + noteType.slice(1);
      noteRun.push(new TextRun({ text: `${typeStr}: `, bold: true, color: getTypeColor(noteType) }));
    }
    noteRun.push(new TextRun({ text: noteText }));

    children.push(new Paragraph({
      children: noteRun,
      spacing: { after: 150 }
    }));
  });

  // Checklist items heading
  if (sec.items.length > 0) {
    children.push(new Paragraph({
      text: sec.isLesson ? "Lesson Exercises & Steps" : "Procedure Checklist",
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 250, after: 120 }
    }));
  }

  // Checklist items
  sec.items.forEach(item => {
    const itemRun = [];
    if (item.type !== 'normal') {
      const typeStr = item.type.charAt(0).toUpperCase() + item.type.slice(1);
      itemRun.push(new TextRun({ text: `${typeStr}: `, bold: true, color: getTypeColor(item.type) }));
    }
    itemRun.push(new TextRun({ text: item.text }));

    children.push(new Paragraph({
      children: itemRun,
      bullet: { level: 0 },
      spacing: { after: 100 }
    }));

    // Sub-items
    item.subItems.forEach(sub => {
      const subText = typeof sub === 'object' ? sub.text : sub;
      const subType = typeof sub === 'object' ? sub.type : 'normal';
      const subRun = [];
      
      if (subType !== 'normal') {
        const subTypeStr = subType.charAt(0).toUpperCase() + subType.slice(1);
        subRun.push(new TextRun({ text: `${subTypeStr}: `, bold: true, color: getTypeColor(subType) }));
      }
      subRun.push(new TextRun({ text: subText }));

      children.push(new Paragraph({
        children: subRun,
        bullet: { level: 1 },
        spacing: { after: 80 }
      }));
    });

    // Checkpoint
    if (item.checkpoint) {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: `⏱️ Checkpoint: ${item.checkpoint}`, bold: true, color: "4A90E2" })
        ],
        indent: { left: 360 }, // Indent under bullets
        spacing: { before: 80, after: 150 }
      }));
    }
  });
});

function getTypeColor(type) {
  switch (type) {
    case 'warning':
    case 'caution':
      return 'E74C3C'; // Red
    case 'tip':
    case 'trick':
      return '4A90E2'; // Blue
    case 'note':
      return '718096'; // Gray
    default:
      return '2D3748';
  }
}

const doc = new Document({
  sections: [{ properties: {}, children }]
});

const outputPath = './Gustykite_Procedures_Manual.docx';
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log("Word document generated dynamically successfully!");
}).catch(err => {
  console.error("Error creating document:", err);
  process.exit(1);
});
