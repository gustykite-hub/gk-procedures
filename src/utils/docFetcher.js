import proceduresMarkdown from '../../public/procedures.md?raw';

export const FALLBACK_RAW_TEXT = proceduresMarkdown;

// Fetch procedures.md directly from the website host
export async function fetchRawText() {
  const response = await fetch('/procedures.md');
  if (!response.ok) {
    throw new Error("Failed to retrieve procedures.md from server.");
  }
  const text = await response.text();
  return text;
}

// Function to extract text and tag it with a type based on prefixes (e.g. Tip:, Note:, Warning:, Caution:)
function extractItemType(text) {
  const prefixMatch = text.match(/^(Tip|Note|Warning|Caution|Trick|Subtitle):\s*(.*)$/i);
  if (prefixMatch) {
    let type = prefixMatch[1].toLowerCase();
    // Rule: Map 'trick' to 'tip', map 'caution' to 'warning'
    if (type === 'trick') type = 'tip';
    if (type === 'caution') type = 'warning';
    
    return {
      type: type,
      text: prefixMatch[2]
    };
  }
  return {
    type: 'normal',
    text: text
  };
}

// Main parser that structures raw text into sections, lessons, timelines, and checklists
export function parseManualText(rawText) {
  // Normalize newlines and split
  const rawLines = rawText.split(/\r?\n/);

  // Define section keywords and their standard titles
  const SECTION_KEYWORDS = [
    { key: 'GENERAL GUIDELINES', id: 'pre-arriving', title: 'General Guidelines', icon: 'Sparkles' },
    { key: 'CONTACTS', id: 'contacts', title: 'Contacts & Bookings', icon: 'Phone' },
    { key: 'URGENT BOOKING', id: 'urgent-booking', title: 'Urgent Bookings', icon: 'AlertTriangle' },
    { key: 'RECEPTION', id: 'reception', title: 'Reception Protocols', icon: 'Users' },
    { key: 'LESSON 1', id: 'lesson-1', title: 'Lesson 1: Sand & Safety', icon: 'Compass', isLesson: true },
    { key: 'LESSON 2', id: 'lesson-2', title: 'Lesson 2: Body Drag & Pull', icon: 'Waves', isLesson: true },
    { key: 'LESSON 3', id: 'lesson-3', title: 'Lesson 3: Waterstart', icon: 'Zap', isLesson: true },
    { key: 'RENTALS', id: 'rentals', title: 'Rentals Protocol', icon: 'ClipboardList' },
    { key: 'GEAR MAINTENANCE', id: 'maintenance', title: 'Gear Maintenance', icon: 'Settings' }
  ];

  const sections = SECTION_KEYWORDS.map(meta => ({
    ...meta,
    rawLines: [],
    items: [],
    generalNotes: []
  }));

  let currentSection = null;

  // Step 1: Group raw lines by section
  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();
    if (!trimmed) {
      if (currentSection) {
        currentSection.rawLines.push(rawLine);
      }
      continue;
    }

    // Check if line switches section (must be a standalone heading, not a list item)
    const isBulletLine = /^[*\-•◦▪.]\s*/.test(trimmed) || /^\d+[\-.]\s*/.test(trimmed) || /^->\s*/.test(trimmed);
    let matchingSection = null;
    if (!isBulletLine) {
      const cleanUpper = trimmed.replace(/^#+\s*/, '').toUpperCase();
      matchingSection = SECTION_KEYWORDS.find(s => {
        return cleanUpper === s.key || cleanUpper.startsWith(s.key + ' ') || cleanUpper.startsWith(s.key + '(');
      });
    }

    if (matchingSection) {
      currentSection = sections.find(s => s.id === matchingSection.id);
      continue;
    }

    if (currentSection) {
      currentSection.rawLines.push(rawLine);
    }
  }

  // Step 2: Parse each section based on its baseline indentation
  sections.forEach(section => {
    // Find baseline indentation of bullets (from the first bullet in the section)
    let baselineIndent = null;
    
    for (let i = 0; i < section.rawLines.length; i++) {
      const line = section.rawLines[i];
      const trimmed = line.trim();
      const leadingSpaces = line.length - line.trimStart().length;
      
      const isBullet = /^[*\-•◦▪.]\s*/.test(trimmed) || /^\d+[\-.]\s*/.test(trimmed) || /^->\s*/.test(trimmed);
      if (isBullet) {
        baselineIndent = leadingSpaces;
        break;
      }
    }

    if (baselineIndent === null) baselineIndent = 0;

    let currentItem = null;
    let activeSubtitle = null;

    section.rawLines.forEach(line => {
      const trimmed = line.trim();
      const leadingSpaces = line.length - line.trimStart().length;

      // If empty line, reset active item grouping
      if (!trimmed) {
        currentItem = null;
        return;
      }
      
      // Time marker check (e.g. 00h10, 01h25, 02h00)
      const timeMatch = trimmed.match(/^(\d{2})h(\d{2})$/);
      if (timeMatch) {
        if (currentItem) {
          currentItem.checkpoint = trimmed;
        }
        if (activeSubtitle) {
          activeSubtitle.checkpoint = trimmed;
        }
        currentItem = null;
        return;
      }

      // Check if it's a bullet (no dot bullet like ".")
      const bulletMatch = trimmed.match(/^([*\-•◦▪.]|->|\d+[\-.]\s*)\s*(.*)$/);
      
      if (bulletMatch) {
        const text = bulletMatch[2];
        const extracted = extractItemType(text);
        const isSubtitleText = extracted.text.toUpperCase() === 'GUSTYKITE' || 
                               extracted.text.toUpperCase() === 'PLANNER' || 
                               extracted.text.startsWith('#');
        
        // Inside lessons, a bullet is only considered a main exercise card if it has a duration (e.g. 10min) or ends with a colon
        const isExerciseTitle = !section.isLesson || text.match(/\d+\s*min/i) || text.trim().endsWith(':');

        if (isExerciseTitle) {
          // Threshold: if indented by baselineIndent + 2 or more spaces, it's a sub-item
          // BUT if the current item is a subtitle, we do NOT group under it
          const isSub = currentItem && currentItem.type !== 'subtitle' && leadingSpaces > (currentItem.indent || 0);
          
          // A subtitle is a heading if it starts with '#' or matches GUSTYKITE/PLANNER,
          // or is a lesson exercise heading (has duration),
          // or is a non-lesson root heading (leadingSpaces <= baselineIndent)
          const isSubtitle = isSubtitleText || 
                             (section.isLesson && text.match(/\d+\s*min/i)) ||
                             (!section.isLesson && leadingSpaces <= baselineIndent);

          const itemType = isSubtitle ? 'subtitle' : extracted.type;
          const cleanText = extracted.text.replace(/^#\s*/, '');

          if (isSub) {
            currentItem.subItems.push({ ...extracted, text: cleanText });
          } else {
            currentItem = { text: cleanText, type: itemType, subItems: [], indent: leadingSpaces };
            section.items.push(currentItem);
            if (itemType === 'subtitle') {
              activeSubtitle = currentItem;
            }
          }
        } else {
          // Bulleted description lines are treated as sub-items under the active exercise (type === 'normal')
          const isSub = currentItem && currentItem.type === 'normal' && leadingSpaces > (currentItem.indent || 0);
          const cleanText = extracted.text.replace(/^#\s*/, '');
          if (isSub) {
            currentItem.subItems.push({ ...extracted, text: cleanText });
          } else {
            const newItem = { text: cleanText, type: extracted.type, subItems: [], indent: leadingSpaces };
            section.items.push(newItem);
            if (extracted.type === 'normal') {
              currentItem = newItem;
            }
          }
        }
      } else {
        // Regular line (no bullet marker)
        const isRoot = leadingSpaces <= baselineIndent;
        const isNotePrefix = trimmed.match(/^(Tip|Note|Warning|Caution|Trick):\s*(.*)$/i);
        const isSubtitleText = trimmed.toUpperCase() === 'GUSTYKITE' || 
                               trimmed.toUpperCase() === 'PLANNER' || 
                               trimmed.startsWith('#');

        if ((isRoot || trimmed.startsWith('#')) && isSubtitleText) {
          const cleanSubtitle = trimmed.replace(/^#+\s*/, '');
          currentItem = { text: cleanSubtitle, type: 'subtitle', subItems: [], indent: leadingSpaces };
          section.items.push(currentItem);
          activeSubtitle = currentItem;
        } else if (isRoot && isNotePrefix) {
          const extracted = extractItemType(trimmed);
          section.items.push({ text: extracted.text, type: extracted.type, subItems: [], indent: leadingSpaces });
          // Note: we do NOT update currentItem here to preserve the active bullet parent
        } else if (currentItem && currentItem.type === 'normal') {
          const extracted = extractItemType(trimmed);
          currentItem.subItems.push(extracted);
        } else {
          const extracted = extractItemType(trimmed);
          section.generalNotes.push(extracted);
        }
      }
    });
  });

  return sections;
}
