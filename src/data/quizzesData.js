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
      question: "What is a mandatory requirement regarding watches for all instructors?",
      options: [
        "A smartwatch connected to the manager's phone",
        "A waterproof watch",
        "A digital stopwatch only",
        "Watches are not allowed for safety reasons"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Must have a waterproof watch.'"
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
      options: ["wetsuit", "first", "wetsuit", "lycra", "second", "harness", "helmet"],
      explanation: "General Guidelines state: 'Must always wear a wetsuit except for the first lesson. Never put a student on the water without a wetsuit.'"
    },
    {
      id: 'pa-q5',
      type: 'qna',
      question: "If you think the allocated kite or board sizes are not ideal for your student, what must you do?",
      options: [
        "Use the allocated gear anyway to save time",
        "Talk to reception and other instructors to make sure you can change it",
        "Cancel the lesson immediately",
        "Decide on the water by testing it yourself first"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'If you think kite/board sizes are not ideal you MUST talk to reception and instructors to make sure you can change.'"
    },
    {
      id: 'pa-q6',
      type: 'qna',
      question: "When should all kites and boards be checked for leaks, cuts, or other damages?",
      options: [
        "Once a week on Monday mornings",
        "Only when a student crashes the kite hard",
        "After every session",
        "At the start of the summer season only"
      ],
      correctIndex: 2,
      explanation: "The manual states: 'All kites and boards must be checked for damages, leaks or cuts after every session.'"
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
        "Approve, Reschedule, or Decline the lesson, and define the instructor/remarks",
        "Charge the customer's credit card manually",
        "Conduct a wind assessment at the beach",
        "Cancel the lesson if there is no wind forecast"
      ],
      correctIndex: 0,
      explanation: "The manual states: '* 2/3 days before: Approve, Reschedule or Decline lesson. Define Instructor and Remarks (notes & gear)'"
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
    },
    {
      id: 'c-q4',
      type: 'qna',
      question: "When the planner contacts the client to schedule a lesson, what three things must they warn the client about?",
      options: [
        "Wind speed, water temperature, and wetsuit sizes",
        "Payment, Waiver, and arriving 15 minutes ahead",
        "Kite models, board sizes, and helmet colors",
        "Parking availability, beach restaurants, and weather forecasts"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'PLANNER contacts the client to schedule the lesson, confirm location and warn about Payment, Waiver and arriving 15 min. ahead;'"
    },
    {
      id: 'c-blank2',
      type: 'blanks',
      question: "Fill in the missing details for scheduling:",
      text: "The Planner approves, reschedules, or declines the lesson {0} days before the lesson, defining the {1} and {2}.",
      blanks: ["2 or 3", "instructor", "remarks"],
      options: ["2 or 3", "instructor", "remarks", "5 or 6", "receptionist", "deposit"],
      explanation: "Under Planner tasks: '2 or 3 days before: Approve, Reschedule or Decline lesson. Define Instructor and Remarks (notes & gear)'"
    },
    {
      id: 'c-q5',
      type: 'qna',
      question: "What should you do if no booking is made after welcoming a client at the beach?",
      options: [
        "Let the client walk away without taking any details",
        "Create a booking anyway and charge their card later",
        "Pass the client's details to 'Pendentes' list",
        "Immediately assign an instructor to wait at the beach"
      ],
      correctIndex: 2,
      explanation: "The manual states under beach contacts: 'If no booking is made, pass it to Pendentes.'"
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
    },
    {
      id: 'ub-q3',
      type: 'qna',
      question: "What criteria defines an 'urgent booking' request at GUSTYKITE?",
      options: [
        "Any booking made during high wind conditions",
        "A booking request for the same day or within the next 3 days",
        "Bookings for groups larger than 5 people",
        "A request made after the school office is closed"
      ],
      correctIndex: 1,
      explanation: "The manual defines urgent booking as: '(booking request for same day or in the next 3 days)'"
    },
    {
      id: 'ub-blank2',
      type: 'blanks',
      question: "Fill in the missing terms for urgent scheduling:",
      text: "When GUSTYKITE receives an urgent booking request, staff informs the client to contact the {0} immediately, who then requests booking and {1}.",
      blanks: ["Planner", "Full Payment"],
      options: ["Planner", "Full Payment", "Manager", "deposit", "instructor", "waiver"],
      explanation: "The manual workflow: 'GUSTYKITE receives request and informs client to contact Planner -> Planner requests booking and Full Payment'"
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
    },
    {
      id: 'r-q4',
      type: 'qna',
      question: "Which of the following should you ask a student about during the initial greetings protocol?",
      options: [
        "Their swimming credentials and certificates",
        "Goals, previous sports, life experiences, health problems, or family history",
        "Their budget and how much cash they brought",
        "Their preferred kite color and brand"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Greetings; ask for goals, previous sports, life experiences, known health problems or family history.'"
    },
    {
      id: 'r-blank2',
      type: 'blanks',
      question: "Fill in the missing words for starting lesson time:",
      text: "Make sure the student understands that the class time starts by looking at the clock and saying: “{0}? Can we {1}?”",
      blanks: ["All clear", "start the lesson"],
      options: ["All clear", "start the lesson", "Are you ready", "begin now", "Is it wind", "go to water"],
      explanation: "The manual states: 'Look at the clock and make sure the student understands the Class time will start now: “All clear? Can we start the lesson?”'"
    },
    {
      id: 'r-q5',
      type: 'qna',
      question: "What information should you gather when an inquiry is received at the beach?",
      options: [
        "Their social security number and ID photocopy",
        "Name, phone number, and/or email address",
        "Their credit card details and deposit",
        "Their weight and height only"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Contact at the beach: Gather name, phone number and/or email address.'"
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
    },
    {
      id: 'l1-q5',
      type: 'qna',
      question: "During preflight checks, how do you verify that direction lines are not twisted or crossed?",
      options: [
        "Launch the kite first to see if it flies straight",
        "Tension the direction lines to check that none are over center lines",
        "Lay the lines in circles on the sand",
        "Hold both lines and pull as hard as possible"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Go back to the bar and do the Preflight check (Tension direction lines to check none are over these [center lines])'"
    },
    {
      id: 'l1-q6',
      type: 'qna',
      question: "Where should the kite and lines setup be completed relative to the client's preparation?",
      options: [
        "After dressing the client in their wetsuit and harness",
        "Before dressing up the client, close to the camp",
        "Directly in the deep water before launching",
        "Simultaneously while the client puts on their helmet"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Kite and lines setup is done BEFORE dressing up the client and close to the camp.'"
    },
    {
      id: 'l1-blank2',
      type: 'blanks',
      question: "Fill in the missing words for launch assistance:",
      text: "To assist launching, hold the LE in the {0} strut until lines are tensioned, making sure the kite is not touching the {1}.",
      blanks: ["central", "sand"],
      options: ["central", "sand", "side", "water", "upper", "dunes"],
      explanation: "The manual states: 'Pick up the kite to transport position... hold lower, under the central strut of the kite. Make sure kite is not touching the sand.'"
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
    },
    {
      id: 'l2-q4',
      type: 'qna',
      question: "When bodydraging to recover a lost board, when should you change your travel direction?",
      options: [
        "Every 30 seconds exactly",
        "Only when you see the board over your back shoulder",
        "When the kite backstalls in the wind",
        "Only when you reach the shore line"
      ],
      correctIndex: 1,
      explanation: "The manual tip states: 'While bodydraging to recover the board only changes direction when you see the board over your back shoulder.'"
    },
    {
      id: 'l2-q5',
      type: 'qna',
      question: "For a student bodydraging with a board, where can their free hand be placed on the board?",
      options: [
        "They must hold the fin only",
        "Either on the board handle or strap, whatever feels better",
        "They must hold both footstraps with one hand",
        "They should never touch the board with their hands while bodydraging"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Hand can be on the board handle or strap, whatever feels better.'"
    },
    {
      id: 'l2-blank2',
      type: 'blanks',
      question: "Fill in the missing terms for water lesson prep:",
      text: "Before going on the first water exercises, students must practice fast {0} relaunches, and instructors must explain {1} signals.",
      blanks: ["power", "international"],
      options: ["power", "international", "water", "hand", "beach", "safety"],
      explanation: "The manual states: 'Students must practice fast power relaunch before going on the first water exercises... Explain international signals...'"
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
    },
    {
      id: 'l3-q3',
      type: 'qna',
      question: "When practicing the cruise balance stance on land, what should the student do if they feel themselves falling forward?",
      options: [
        "Pull the bar all the way in and throw shoulders back",
        "Give power to the kite (sheet out) and move shoulders back",
        "Release the chicken loop immediately",
        "Jump forward off the instructor's leg"
      ],
      correctIndex: 1,
      explanation: "The manual tip states: 'Falling forward -> power to kite; shoulders back; Falling back -> power to me; shoulders forward.'"
    },
    {
      id: 'l3-q4',
      type: 'qna',
      question: "How far should a student ride on the board after a waterstart before transitioning to the Engage/Cruising stance?",
      options: [
        "At least 50 to 100 meters",
        "Ride 5 to 10 meters to gain speed/momentum first",
        "Change immediately as soon as they stand up",
        "They should remain in the crouched stance for the entire run"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Stay more on top of the board and ride 5/10m... Remember to use “Stay on the board” position until having enough speed/momentum. When having enough speed adopt Engage Position!'"
    },
    {
      id: 'l3-blank2',
      type: 'blanks',
      question: "Fill in the missing words for waterstart stopping:",
      text: "To stop immediately after a waterstart, the student should stay {0} and {1} in the water.",
      blanks: ["low", "fall back"],
      options: ["low", "fall back", "high", "stand up", "crouched", "sheet out"],
      explanation: "The manual states: 'Stay low/Don't stretch legs -> Fall back/Sit down to stop immediately.'"
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
    },
    {
      id: 'rt-q4',
      type: 'qna',
      question: "When handing allocated gear to a rental customer, what key responsibility must you mention?",
      options: [
        "That the instructor will pack it up for them on the beach",
        "That the client is responsible for the gear from that moment on",
        "That they must clean it with sand before returning",
        "That GUSTYKITE covers all damages for free"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Check allocated gear and hand it to the client (mention he is responsible for it from now on)'"
    },
    {
      id: 'rt-q5',
      type: 'qna',
      question: "What gear inspection tasks must the instructor complete before launching a rental customer's kite?",
      options: [
        "Check that the colors of the kite match the harness",
        "Check bar, lines, kite pressure, and attachment points",
        "Test the student's wetsuit zipper speed",
        "Measure the distance from the dunes to the water"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'Check bar, lines, kite pressure and attachment points.'"
    },
    {
      id: 'rt-blank2',
      type: 'blanks',
      question: "Fill in the missing details for rental client greeting:",
      text: "At the first rental meeting, greet the client, ask for previous {0} and kite {1}.",
      blanks: ["sports", "experience"],
      options: ["sports", "experience", "injuries", "lessons", "equipment", "licenses"],
      explanation: "The manual states: 'Greetings; ask for previous sports, kite experience.'"
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
    },
    {
      id: 'gm-q4',
      type: 'qna',
      question: "What is the rule regarding leaving gear hanging to dry overnight?",
      options: [
        "It must never be left hanging overnight",
        "It can be left overnight hanging to dry but must be stored out of the sun when it is dry",
        "It must be dried in the warehouse using heaters",
        "It should only dry on the boat deck overnight"
      ],
      correctIndex: 1,
      explanation: "The manual states: 'It can be left overnight hanging to dry but must be stored out of the Sun when it's dry.'"
    },
    {
      id: 'gm-blank2',
      type: 'blanks',
      question: "Fill in the missing words for gear washing:",
      text: "Gear must be brought back to the {0} and washed with {1} after every class.",
      blanks: ["warehouse", "clean water"],
      options: ["warehouse", "clean water", "beach camp", "salt water", "office", "soap"],
      explanation: "The manual states: 'Gear is brought back to the warehouse and washed with clean water after every class'"
    }
  ]
};
