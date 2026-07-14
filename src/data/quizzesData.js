export const quizzesData = {
  'pre-arriving': [
    {
      id: 'pa-q1',
      type: 'qna',
      question: "What must all instructors wear on arrival at the school?",
      options: [
        "Any casual beachwear",
        "The GUSTYKITE polo or lycra",
        "A wetsuit only",
        "A harness and helmet"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Must bring the GUSTYKITE polo or lycra on when arriving.'"
    },
    {
      id: 'pa-q2',
      type: 'qna',
      question: "What is the rule regarding wetsuits for instructors?",
      options: [
        "They are optional depending on the wind",
        "Instructors never wear wetsuits",
        "All instructors must always wear a wetsuit except for the first lesson",
        "Only students wear wetsuits"
      ],
      correctIndex: 2,
      explanation: "The manual states: 'All instructors must always wear a wetsuit except for the first lesson. Never put a student on the water without a wetsuit.'"
    },
    {
      id: 'pa-q3',
      type: 'qna',
      question: "What is the maximum number of times a kite should crash per lesson before you must revert to improving kite control?",
      options: [
        "1 time max",
        "2 or 3 times max",
        "5 times max",
        "No limit as long as they learn"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Kites should not crash more than 2 or 3 times per lesson, on land or water. If this happens, the kite control must be improved, even if this means going back on the exercise sequence.'"
    },
    {
      id: 'pa-q4',
      type: 'qna',
      question: "What is the exact 4-step sequence all exercises must follow?",
      options: [
        "Explain -> Assist -> Correct -> Demonstrate",
        "Demonstrate -> Explain -> Assist -> Correct",
        "Demonstrate -> Correct -> Assist -> Repeat",
        "Explain -> Demonstrate -> Correct -> Let Go"
      ],
      correctIndex: 1,
      explanation: "The manual sequence is: '1- DEMONSTRATE, 2- EXPLAIN, 3- ASSIST, 4- CORRECT.'"
    },
    {
      id: 'pa-seq1',
      type: 'sequencing',
      question: "Order the GUSTYKITE exercise sequence correctly:",
      sequence: [
        "DEMONSTRATE (show mistakes first, then correct way)",
        "EXPLAIN (shortly review key points)",
        "ASSIST (client makes it with instructor attached behind)",
        "CORRECT (fix mistakes, keep it simple)"
      ],
      explanation: "The manual sequence is: 1- DEMONSTRATE, 2- EXPLAIN, 3- ASSIST, 4- CORRECT."
    },
    {
      id: 'pa-blank1',
      type: 'blanks',
      question: "Fill in the missing words for GUSTYKITE general guidelines:",
      text: "All instructors must always wear a {0} except for the {1} lesson. Never put a student on the water without a {2}.",
      blanks: ["wetsuit", "first", "wetsuit"],
      options: ["wetsuit", "first", "lycra", "second", "harness"],
      explanation: "General Guidelines state: 'Must always wear a wetsuit except for the first lesson. Never put a student on the water without a wetsuit.'"
    }
  ],
  'contacts': [
    {
      id: 'c-q1',
      type: 'qna',
      question: "When is the automatic email sent to the client?",
      options: [
        "Immediately on booking",
        "1 or 2 weeks before the lesson",
        "2 or 3 days before",
        "On the morning of the lesson"
      ],
      correctIndex: 1,
      explanation: "The manual timeline shows: '> 1/2 weeks before, an automatic email is sent <'"
    },
    {
      id: 'c-q2',
      type: 'qna',
      question: "What should the planner do 2 or 3 days before the scheduled lesson?",
      options: [
        "Approve, Release, or Decline the lesson, and define the instructor/remarks",
        "Charge the customer's credit card manually",
        "Conduct a wind assessment at the beach",
        "Cancel the lesson if there is no wind forecast"
      ],
      correctIndex: 0,
      explanation: "The manual states: '* 2/3 days before: Approve, Release or Decline lesson. Define Instructor and Remarks (notes & gear)'"
    },
    {
      id: 'c-blank1',
      type: 'blanks',
      question: "Fill in the missing details regarding the Planner's responsibilities:",
      text: "Planner contacts the client to schedule the lesson, confirm location and warn about {0}, {1} and arriving {2} ahead.",
      blanks: ["Payment", "Waiver", "15 min."],
      options: ["Payment", "Waiver", "15 min.", "Equipment", "1 hour", "Passport"],
      explanation: "The manual states: 'PLANNER contacts the client to schedule the lesson, confirm location and warn about Payment, Waiver and arriving 15 min. ahead.'"
    },
    {
      id: 'c-q3',
      type: 'qna',
      question: "What is the standard procedure when a GUSTYKITE staff member welcomes a new client at the beach?",
      options: [
        "Welcome them, gather basic info & concerns, ask to book on website, and pass to Planner",
        "Have them pay in cash immediately and start dressing them in a wetsuit",
        "Tell them to wait for the manager to arrive",
        "Give them a kite to play with on the sand"
      ],
      correctIndex: 0,
      explanation: "Under GUSTYKITE tasks: 'welcome and gather basic info and concerns; ask the client to book it at website; receive confirmation; pass to Planner.'"
    }
  ],
  'urgent-booking': [
    {
      id: 'ub-q1',
      type: 'qna',
      question: "If GUSTYKITE beach staff receives a same-day booking request, what must they instruct the client to do?",
      options: [
        "Start setting up the gear immediately",
        "Contact the Planner immediately",
        "Go back home and wait for an email",
        "Pay the instructor cash directly"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'GUSTYKITE receives request and informs client to contact Planner.'"
    },
    {
      id: 'ub-q2',
      type: 'qna',
      question: "What is the payment rule for urgent bookings (same day or next 3 days)?",
      options: [
        "Payment is made after the lesson",
        "Planner requests booking and Full Payment before approving",
        "It is a free trial",
        "A small deposit is required"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Planner requests booking and Full Payment.'"
    },
    {
      id: 'ub-blank1',
      type: 'blanks',
      question: "Fill in the missing workflow steps for an urgent booking:",
      text: "The Planner requests booking and {0}, then {1} the lesson and defines {2} and remarks.",
      blanks: ["Full Payment", "approves", "instructor"],
      options: ["Full Payment", "approves", "instructor", "deposit", "cancels", "manager"],
      explanation: "Urgent Booking procedure: 'Planner requests booking and Full Payment $\rightarrow$ Approve lesson $\rightarrow$ Define Instructor and Remarks.'"
    },
    {
      id: 'ub-seq1',
      type: 'sequencing',
      question: "Order the urgent booking workflow steps correctly:",
      sequence: [
        "GUSTYKITE receives same-day or next-3-days booking request",
        "Staff informs the client to contact the Planner",
        "Planner requests booking and Full Payment",
        "Planner approves the lesson and defines instructor/remarks"
      ],
      explanation: "The manual workflow: GUSTYKITE receives request -> client contacts Planner -> Planner requests Full Payment -> Approve lesson -> Define instructor."
    }
  ],
  'reception': [
    {
      id: 'r-q1',
      type: 'qna',
      question: "What is the correct sequence to assist a student setting up their gear?",
      options: [
        "Vest -> Harness -> Helmet -> Lycra -> Wetsuit",
        "Wetsuit -> Harness -> Vest -> Lycra -> Helmet -> Radio",
        "Wetsuit -> Vest -> Harness -> Lycra -> Helmet -> Radio",
        "Helmet -> Vest -> Harness -> Lycra -> Wetsuit"
      ],
      correctIndex: 2,
      explanation: "According to step 5, the setup order is: 5.1 Wetsuit, 5.2 Vest, 5.3 Harness, 5.4 Lycra, 5.5 Helmet, 5.6 Radio on check."
    },
    {
      id: 'r-q2',
      type: 'qna',
      question: "When should the wetsuit be fully put on by the student?",
      options: [
        "Immediately upon arriving at the beach reception",
        "Only for water lessons starting immediately (can keep it down at legs during setup)",
        "After the kite launch is completed",
        "Before the radio check only"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Wetsuit (ONLY for water lesson starting immediately)... Can keep wetsuit down (legs only) while kite setup.'"
    },
    {
      id: 'r-seq1',
      type: 'sequencing',
      question: "Order the student gear setup sequence correctly:",
      sequence: [
        "Wetsuit (only if water lesson starts immediately)",
        "Vest (adjust shoulder and lateral straps)",
        "Harness (legs in, velcro under belly button, leg straps first, then Spreader bar)",
        "Lycra",
        "Helmet (straight straps and snug)",
        "Radio on check"
      ],
      explanation: "The manual setup sequence: 5.1 Wetsuit, 5.2 Vest, 5.3 Harness, 5.4 Lycra, 5.5 Helmet, 5.6 Radio on check."
    },
    {
      id: 'r-q3',
      type: 'qna',
      question: "What lesson packages and prices should you quote to beach inquiries?",
      options: [
        "2 hours: 100€; 6 hours: 300€; 12 hours: 600€",
        "2 hours: 165€; 6 hours: 390€; 12 hours: 730€",
        "2 hours: 180€; 6 hours: 450€; 12 hours: 800€",
        "Hourly flat rate of 50€"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Private lessons for faster and safer progression and 2 HOURS: 165€; 6 HOURS (3 days): 390€; 12 HOURS (6 days): 730€;'"
    },
    {
      id: 'r-blank1',
      type: 'blanks',
      question: "Fill in the missing procedures for post-lesson reception tasks:",
      text: "Assess client {0}, check availability for {1}, check for visible {2} on gear, and verify all gear has arrived and is stored properly in the right {3}.",
      blanks: ["satisfaction", "next days", "damage", "bags"],
      options: ["satisfaction", "next days", "damage", "bags", "wetsuits", "next weeks", "receipts"],
      explanation: "The manual tasks include: Assess client satisfaction, check availability for next days, check for visible damage on gear, and check all gear is stored in the right bags."
    }
  ],
  'lesson-1': [
    {
      id: 'l1-q1',
      type: 'qna',
      question: "Is Lesson 1 supposed to go on the water?",
      options: [
        "Yes, always in the last 30 minutes",
        "No. Every exception must be approved by the manager",
        "Only if the student demands it",
        "Yes, body dragging is included"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'First lesson is not supposed to go on the water. Every exception must be approved by me.'"
    },
    {
      id: 'l1-q2',
      type: 'qna',
      question: "What safety requirement is mandatory when the student controls the kite on the sand?",
      options: [
        "They must wear two helmets",
        "They must always be connected to the instructor with a long leash to their back handle",
        "The instructor must hold the bar at all times",
        "No special safety connection is required on dry sand"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'On the sand clients must ALWAYS be connected to instructor with long leash to their back handle.'"
    },
    {
      id: 'l1-q3',
      type: 'qna',
      question: "When passing the kite to the student, what should the instructor say to confirm control?",
      options: [
        "\"Here you go\"",
        "\"Do you have it?\"",
        "\"You have it?\" (Student replies \"I have it\")",
        "\"Release hands!\""
      ],
      correctIndex: 2,
      explanation: "The manual states: 'The instructor says “You have it?” so the student understands this is an important command. He should reply “I have it” and he is in control.'"
    },
    {
      id: 'l1-q4',
      type: 'qna',
      question: "Where should launch and land exercises on the sand be conducted?",
      options: [
        "On hard clean sand close to the shore, avoiding sticks/debris",
        "Deep inside the dunes near obstacles",
        "On soft dry sand only",
        "Anywhere the client finds comfortable"
      ],
      correctIndex: 0,
      explanation: "The manual states: 'Launch/land exercises (or if touching the sand is needed) should be done on hard clean sand close to the shore, avoiding the sticks and debris close to the dunes.'"
    },
    {
      id: 'l1-blank1',
      type: 'blanks',
      question: "Fill in the missing words for preventing thermal shock on warm days:",
      text: "Make sure student is not too hot to enter the water. If too hot, wash the {0}, {1} and {2} before diving in completely.",
      blanks: ["face", "feet", "hands"],
      options: ["face", "feet", "hands", "chest", "harness", "ears"],
      explanation: "The manual notes: 'If too hot, wash the face, feet and hands before diving in completely.'"
    }
  ],
  'lesson-2': [
    {
      id: 'l2-q1',
      type: 'qna',
      question: "Where should the instructor always stand relative to the student during water exercises?",
      options: [
        "Upwind of the student",
        "Downwind of the student",
        "Directly next to them holding their harness",
        "On the shore watching with binoculars"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Instructor must ALWAYS stay downwind of the student, especially when getting close to the shore of swimmers inside their wind window.'"
    },
    {
      id: 'l2-q2',
      type: 'qna',
      question: "What should the student do immediately if the waves are big and the kite crashes on them?",
      options: [
        "Try to launch the kite as fast as possible",
        "Swim toward the kite to save it",
        "Activate the quick-release immediately",
        "Wait for the instructor to rescue them"
      ],
      correctIndex: 2,
      explanation: "The manual states: 'If the waves are big, the client should immediately quick-release.'"
    },
    {
      id: 'l2-q3',
      type: 'qna',
      question: "When a kite crashes in the waves, who goes to the kite and what does the student do?",
      options: [
        "Instructor stays away; student swims to the kite to rescue it",
        "Instructor goes to the kite; student moves to the kite to avoid ripping and strong pulls",
        "Both wait for the wind to carry the kite away",
        "Student releases the leash completely"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'When kites crash on the waves the instructor must go to the kite (not the student). Students must move to the kite to avoid ripping and strong pulls.'"
    },
    {
      id: 'l2-blank1',
      type: 'blanks',
      question: "Fill in the missing words for upwind bodydrag technique:",
      text: "Point arm and look to where you want to go. Point to the {0} to speed up, point {1} to speed down, and stay in between at about {2} upwind.",
      blanks: ["kite", "upwind", "45º"],
      options: ["kite", "upwind", "45º", "bar", "downwind", "90º"],
      explanation: "The manual states: 'Point to the kite (speed up). Point upwind (speed down), then manage to stay in between (about 45º upwind).'"
    }
  ],
  'lesson-3': [
    {
      id: 'l3-q1',
      type: 'qna',
      question: "What is the 'small ball' concept in waterstart?",
      options: [
        "Carving heels, keeping butt as close to feet as possible, and not just pushing feet to stand up",
        "Tucking the knees and rolling like a ball on the water",
        "Inhaling deeply and floating like a ball",
        "Using a small training kite instead of the full size"
      ],
      correctIndex: 0,
      explanation: "The manual states: 'Small ball: After having board correctly on the feet student must adopt a... Toes up Carve the heels on the sand. butt as close to feet as possible (small ball). Explain ball rotation concept, not pushing the feet to stand up.'"
    },
    {
      id: 'l3-q2',
      type: 'qna',
      question: "What should the student do to stop immediately after a waterstart?",
      options: [
        "Steer the kite straight into the water",
        "Fall back/sit down in the water",
        "Pull the bar all the way in",
        "Turn the board straight downwind"
      ],
      correctIndex: 1,
      explanation: "The manual guide states: 'Stay low/Don't stretch legs -> Fall back/Sit down to stop immediately.'"
    },
    {
      id: 'l3-seq1',
      type: 'sequencing',
      question: "Order the quick sequence guide for waterstart correctly:",
      sequence: [
        "Kite at 45º and Bar at sweetspot",
        "Adopt 'Small Ball' (crouch and push board under water/ass)",
        "Perform Power Stroke (2-12-2)",
        "Throw shoulders forward to stand on the board (stay low)",
        "Fall back / sit down to stop immediately"
      ],
      explanation: "The manual quick guide: 'Kite at 45º; Bar at sweetspot; Small ball; Push board under water/ass; Power stroke (2-12-2); Board under the ass and throw shoulders forward to stand on the board -> Fall back/Sit down to stop immediately.'"
    },
    {
      id: 'l3-blank1',
      type: 'blanks',
      question: "Fill in the missing words for practicing the cruise balance stance on land:",
      text: "Student sits on instructor's {0}. Facing the kite, he pulls the bar to balance in a {1} body position until no pressure is on the instructor's {0}.",
      blanks: ["leg", "45º"],
      options: ["leg", "45º", "arm", "90º", "shoulder", "180º"],
      explanation: "The manual states: 'Student sits on the instructor's leg. Facing the kite, he will pull the bar to balance in a 45º body position until no pressure is on the instructor's leg.'"
    }
  ],
  'rentals': [
    {
      id: 'rt-q1',
      type: 'qna',
      question: "What is required if a rental customer refuses to wear a helmet or vest?",
      options: [
        "We must cancel their rental booking",
        "They must mark and sign the Disclaimer at the bottom of the registration form",
        "They must pay a double deposit",
        "Nothing, they are free to choose"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Offer helmet and vest (If client refuses to wear helmet or vest HE MUST MARK AND SIGN Disclaimer at the bottom.)'"
    },
    {
      id: 'rt-q2',
      type: 'qna',
      question: "What safety warning must you give a rental customer regarding self-rescue in deep water?",
      options: [
        "They must self-rescue immediately if the kite crashes",
        "They should NOT try to self-rescue or reactivate if quick release is activated. If in danger, release secondary safety; the school will retrieve them",
        "Instruct them to always swim towards the kite in big waves",
        "No safety instructions are required for rentals"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Warning: Client should NOT try to Self Rescue or reactivate if the Quick Release is activated. If you are really in danger or hurt, activate the Secondary Safety on the leash to release the kite completely. We will get to you and the kite'"
    },
    {
      id: 'rt-q3',
      type: 'qna',
      question: "What is the correct protocol for launching a rental client's kite?",
      options: [
        "Let them launch it alone on the dunes",
        "Launch the kite yourself, then walk it to them in deep water",
        "Lower the kite to the sand, pass the bar to the client, and make sure they launch it properly themselves",
        "Wait for another client to launch it for them"
      ],
      correctIndex: 2,
      explanation: "The manual states: 'Lower the kite to the sand, pass the bar to client and make sure he launches properly.'"
    },
    {
      id: 'rt-blank1',
      type: 'blanks',
      question: "Fill in the missing requirements for rental check-in:",
      text: "Ensure rental clients have {0} and signed the {1} on the system, and demonstrate the Safety {2} procedure.",
      blanks: ["PAID", "WAIVER", "Quick Release"],
      options: ["PAID", "WAIVER", "Quick Release", "registered", "deposit", "leash", "helmet"],
      explanation: "The manual states: 'Make sure they have PAID and signed WAIVER on the system. Demonstrate Safety Quick Release procedure.'"
    }
  ],
  'maintenance': [
    {
      id: 'gm-q1',
      type: 'qna',
      question: "What is the gear maintenance protocol after every class?",
      options: [
        "Pack it in the bag immediately at the beach",
        "Bring it back to the warehouse and wash with clean water",
        "Leave it on the sand to dry",
        "Wipe it with a dry towel only"
      ],
      correctIndex: 1,
      explanation: "The manual states: '. Gear is brought back to the warehouse and washed with clean water after every class'"
    },
    {
      id: 'gm-q2',
      type: 'qna',
      question: "How should dry gear be stored overnight?",
      options: [
        "Hanging outside under the direct sun",
        "Out of the sun once it is dry",
        "Stored in airtight plastic boxes",
        "Left on the boat"
      ],
      correctIndex: 1,
      explanation: "The manual states: '. It can be left overnight hanging to dry but must be stored out of the Sun when it\'s dry.'"
    },
    {
      id: 'gm-q3',
      type: 'qna',
      question: "How should you handle and identify defective or damaged gear?",
      options: [
        "Store it in the bag as usual for the next instructor to find",
        "Throw it away in the camp bin immediately",
        "Notice and mark the defective gear with visible tape",
        "Leave it out in the sun to shrink back together"
      ],
      correctIndex: 2,
      explanation: "The manual states: 'Notice and mark defected gear with visible tape'"
    },
    {
      id: 'gm-blank1',
      type: 'blanks',
      question: "Fill in the missing words for gear maintenance inspections:",
      text: "Periodically check that {0} are working smoothly and check for wear and tear on {1}, {2} and bars.",
      blanks: ["safety systems", "kites", "bridles"],
      options: ["safety systems", "kites", "bridles", "pumps", "wetsuits", "leashes"],
      explanation: "The manual states: 'Periodically check safety systems are working smooth and any tear and wear on kites, bridles and bars.'"
    }
  ]
};
