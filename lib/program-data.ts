export interface ProgramStep {
  number: number;
  title: string;
  description: string;
}

export interface ProgramFeature {
  title: string;
  description: string;
}

export interface ProgramData {
  slug: string;
  title: string;
  category: string;
  categoryColor: "blue" | "purple" | "teal" | "green" | "orange";
  heroTitle: string;
  heroSubtitle: string;
  stats: string[];
  overview: {
    heading: string;
    body: string[];
  };
  subjects?: {
    heading: string;
    items: string[];
  };
  enrollSteps?: ProgramStep[];
  whyChoose: ProgramFeature[];
}

const STANDARD_ENROLL_STEPS: ProgramStep[] = [
  {
    number: 1,
    title: "Choose Your Course",
    description: "Browse our programs and select the course that matches your academic goals.",
  },
  {
    number: 2,
    title: "Diagnostic Assessment",
    description: "Take a free diagnostic test so we can understand your current level and learning needs.",
  },
  {
    number: 3,
    title: "Register & Plan",
    description: "Complete registration and work with your advisor to create a personalized study plan.",
  },
  {
    number: 4,
    title: "Schedule Sessions",
    description: "Pick session times that fit your schedule — fully flexible, 1-on-1 live online classes.",
  },
  {
    number: 5,
    title: "Start Learning",
    description: "Begin your journey with an expert tutor and track your progress every step of the way.",
  },
];

export const PROGRAMS: Record<string, ProgramData> = {
  "ap-test": {
    slug: "ap-test",
    title: "AP Test Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Achieve Top Scores With Expert AP Tutoring",
    heroSubtitle:
      "MLS Classes help you master AP subjects, improve your skills, and achieve top scores in every Advanced Placement exam.",
    stats: [
      "Live Online Interactive Classes",
      "50+ Hours Tutoring",
      "1:1 AP Courses",
      "100+ Practice Tests",
      "Support for AP Exam",
    ],
    overview: {
      heading: "What is the AP Test?",
      body: [
        "Advanced Placement (AP) is a program created by the College Board that offers college-level courses and exams to high school students. Scoring well on AP exams can earn you college credit, helping you save time and money in higher education.",
        "MLS Classes provides expert 1-on-1 AP tutoring tailored to each student's pace and learning style. Our experienced tutors cover every AP subject with a structured curriculum, targeted practice tests, and ongoing progress tracking.",
      ],
    },
    subjects: {
      heading: "AP Subjects We Cover",
      items: [
        "AP Computer Science",
        "AP Precalculus",
        "AP Calculus AB",
        "AP Calculus BC",
        "AP Physics 1 & 2",
        "AP Physics C: Mechanics",
        "AP Physics C: E&M",
        "AP Chemistry",
        "AP Biology",
        "AP Environmental Science",
        "AP Statistics",
        "AP English Language",
        "AP English Literature",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Expert Tutors",
        description:
          "Our AP tutors hold advanced degrees and have years of experience helping students score 4s and 5s on their exams.",
      },
      {
        title: "Progress Tracking",
        description:
          "Detailed progress reports keep you and your parents informed after every session so you always know where you stand.",
      },
      {
        title: "Comprehensive Curriculum",
        description:
          "From foundational concepts to exam strategy, our curriculum leaves nothing to chance and aligns with the latest College Board guidelines.",
      },
      {
        title: "Targeted Assessments",
        description:
          "100+ practice tests and adaptive mock exams mirror the real AP exam format, building confidence and familiarity.",
      },
      {
        title: "Adaptable Learning",
        description:
          "Fully flexible scheduling and a personalized study plan mean tutoring fits seamlessly into your life, not the other way around.",
      },
    ],
  },

  "digital-sat": {
    slug: "digital-sat",
    title: "Digital SAT Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Digital SAT Tutoring — Your Path to a 1500+ Score",
    heroSubtitle:
      "MLS Classes provide top-tier Digital SAT tutoring, combining adaptive practice, expert strategy, and 1-on-1 coaching for exam success.",
    stats: [
      "Live Online Interactive Classes",
      "50+ Hours Tutoring",
      "1:1 Classes",
      "100+ Adaptive Mock Tests",
      "Support for 2 Attempts",
    ],
    overview: {
      heading: "What is the Digital SAT?",
      body: [
        "The Digital SAT is College Board's fully computer-adaptive redesign of the SAT. It features a shorter test time (~2 hours), adaptive modules that adjust difficulty based on your performance, and a stronger emphasis on real-world reading and math skills.",
        "MLS Classes provides personalized Digital SAT prep that covers Math, Reading & Writing with adaptive mock exams that mirror the real test. Our tutors build your skills systematically and fine-tune your test-taking strategy to maximize your score on test day.",
      ],
    },
    subjects: {
      heading: "What We Teach",
      items: [
        "Digital SAT Math — Algebra",
        "Digital SAT Math — Advanced Math",
        "Digital SAT Math — Problem-Solving & Data",
        "Digital SAT Reading & Writing — Craft & Structure",
        "Digital SAT Reading & Writing — Information & Ideas",
        "Digital SAT Reading & Writing — Standard English",
        "PSAT 8/9 Preparation",
        "PSAT 10 Preparation",
        "PSAT/NMSQT Preparation",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Dedicated Student Support",
        description:
          "Our tutors are available beyond scheduled sessions to answer questions and provide guidance whenever you need it.",
      },
      {
        title: "Monitoring Progress",
        description:
          "Detailed analytics after every session and practice test show exactly where you've improved and where to focus next.",
      },
      {
        title: "Transparency and Trust",
        description:
          "Parents and students receive full visibility into lesson plans, scores, and progress milestones at every stage.",
      },
      {
        title: "Fast and Efficient",
        description:
          "Adaptive curriculum removes time wasted on topics you've mastered, so every minute of study is high-impact.",
      },
      {
        title: "Optimize Your Time",
        description:
          "Smart scheduling and focused prep mean you reach your target score in fewer hours without compromising quality.",
      },
    ],
  },

  act: {
    slug: "act",
    title: "ACT Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "ACT Tutoring and Online ACT Prep Classes — Quick & Easy",
    heroSubtitle:
      "MLS Classes provide the best ACT tutoring for effective, convenient exam success. Target a 35+ composite score.",
    stats: [
      "Live Online Interactive Classes",
      "50+ Hours Tutoring",
      "1:1 Classes",
      "100+ Adaptive Mock Tests",
      "Support for Multiple Attempts",
    ],
    overview: {
      heading: "What is the ACT?",
      body: [
        "The ACT is a standardized college admissions test accepted by all US colleges and universities and widely recognized in Canada. It measures your academic readiness in English, Mathematics, Reading, and Science, with an optional Writing section.",
        "MLS Classes offers targeted 1-on-1 ACT coaching that covers every section in depth. Our tutors identify your weak areas through diagnostic testing and build a customized study plan to help you reach your goal score efficiently.",
      ],
    },
    subjects: {
      heading: "ACT Sections We Cover",
      items: [
        "ACT English — Grammar & Usage",
        "ACT English — Rhetorical Skills",
        "ACT Math — Pre-Algebra & Algebra",
        "ACT Math — Geometry & Trigonometry",
        "ACT Reading — Comprehension Strategies",
        "ACT Reading — Inference & Tone",
        "ACT Science — Data Representation",
        "ACT Science — Research Summaries",
        "ACT Writing (Optional Essay)",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Skilled Tutors",
        description:
          "Our ACT tutors have scored in the 99th percentile and know exactly what strategies lead to top composite scores.",
      },
      {
        title: "Tests & Analytics",
        description:
          "Full-length mock ACTs and section-level analytics pinpoint your strengths and the highest-impact areas to improve.",
      },
      {
        title: "Complete Curriculum",
        description:
          "Every ACT topic — from algebra to science reasoning — is covered thoroughly with our structured, up-to-date curriculum.",
      },
      {
        title: "Focused Assessments",
        description:
          "Regular mini-tests and timed drills simulate real exam pressure and build the consistency you need on test day.",
      },
      {
        title: "Flexible Learning",
        description:
          "Sessions are scheduled around your life — evening, weekends, or any time — with no disruption to school or activities.",
      },
    ],
  },

  "amc-8": {
    slug: "amc-8",
    title: "AMC Competition Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Expert AMC 8, AMC 10 & AMC 12 Competition Preparation",
    heroSubtitle:
      "Build a strong math foundation and master competition problem-solving with personalized AMC coaching from MLS Classes.",
    stats: [
      "1:1 Live Online Coaching",
      "AMC 8 / 10 / 12 Coverage",
      "Official Past Papers",
      "Personalized Learning Plans",
      "Competition Strategy Training",
    ],
    overview: {
      heading: "Overview of AMC Competitions",
      body: [
        "The AMC (American Mathematics Competition) series is administered by the Mathematical Association of America (MAA). AMC 8 is a 25-question, 40-minute multiple-choice contest for middle school students up to grade 8. AMC 10 and AMC 12 are for students in grades 10 and 12 respectively, and high scorers advance to the AIME.",
        "MLS Classes provides structured AMC coaching that goes beyond textbook math. We build deep conceptual understanding in number theory, algebra, geometry, and combinatorics — the exact topics tested in competition settings — while developing speed and accuracy through timed practice.",
      ],
    },
    subjects: {
      heading: "Topics We Cover",
      items: [
        "Number Theory",
        "Algebra & Functions",
        "Geometry",
        "Combinatorics",
        "Probability",
        "Problem-Solving Strategies",
        "Proof Techniques",
        "AMC 8 Specific Topics",
        "AMC 10 / 12 Advanced Topics",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Affordable & High-Quality",
        description:
          "Premium competition coaching at accessible prices — we believe every student deserves world-class math mentorship.",
      },
      {
        title: "Consistent Progress Tracking",
        description:
          "Regular mock competitions and detailed score reports show measurable improvement over time.",
      },
      {
        title: "Official Contest Materials",
        description:
          "We work through official AMC past papers and AIME problems, ensuring students train on the most authentic material available.",
      },
      {
        title: "Personalized Learning Plans",
        description:
          "Your tutor designs a plan around your current level, target competition, and available time — nothing generic, ever.",
      },
      {
        title: "Expert Competition Tutors",
        description:
          "Our coaches have competed at AIME and higher levels themselves and understand the mindset needed to excel.",
      },
    ],
  },

  mathcounts: {
    slug: "mathcounts",
    title: "MATHCOUNTS Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Expert MATHCOUNTS Competition Coaching for Grades 6–8",
    heroSubtitle:
      "Build contest math skills and competition confidence with personalized MATHCOUNTS coaching from MLS Classes.",
    stats: [
      "1:1 Live Online Coaching",
      "Sprint, Target & Team Round Prep",
      "Official Competition Materials",
      "Personalized Learning Plans",
      "Expert Competition Tutors",
    ],
    overview: {
      heading: "Overview of MATHCOUNTS",
      body: [
        "MATHCOUNTS is a prestigious national middle school math competition for grades 6–8. It features four rounds: Sprint (speed-focused), Target (pairs of problems), Team (group challenge), and Countdown (head-to-head). Top competitors advance from school to chapter, state, and national levels.",
        "MLS Classes provides focused MATHCOUNTS coaching that develops both speed and deep problem-solving ability. We cover every competition topic systematically, run timed practice rounds, and help students build the mental agility needed to excel under competition pressure.",
      ],
    },
    subjects: {
      heading: "Topics We Cover",
      items: [
        "Algebra & Equations",
        "Geometry",
        "Number Theory",
        "Combinatorics & Probability",
        "Advanced Problem-Solving",
        "Sprint Round Strategies",
        "Target Round Techniques",
        "Team Round Collaboration",
        "Countdown Round Speed Drills",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Affordable & Expert-Led Coaching",
        description:
          "Professional competition coaching that is accessible to every middle schooler who wants to take their math to the next level.",
      },
      {
        title: "Consistent Progress Tracking",
        description:
          "Timed mock rounds and regular feedback sessions ensure students improve steadily towards competition readiness.",
      },
      {
        title: "Official Competition Materials",
        description:
          "We train with official MATHCOUNTS past handbooks, sprint rounds, and target round problems for authentic preparation.",
      },
      {
        title: "Personalized Learning Plans",
        description:
          "Each student gets a study plan tailored to their current skill level, competition date, and time availability.",
      },
      {
        title: "Expert Tutors with Proven Results",
        description:
          "Our coaches have extensive experience guiding students to chapter and state-level MATHCOUNTS competitions.",
      },
    ],
  },

  "as-a-level-curriculum": {
    slug: "as-a-level-curriculum",
    title: "AS / A Level",
    category: "UK Curriculum",
    categoryColor: "purple",
    heroTitle: "Expert AS / A Level Tutoring — Cambridge & Edexcel",
    heroSubtitle:
      "Achieve your full A-level potential with individualized 1-on-1 coaching that follows the Cambridge and Edexcel curriculum from MLS Classes.",
    stats: [
      "Live Online Interactive Classes",
      "50+ Subjects Covered",
      "1:1 Personalized Tutoring",
      "Cambridge & Edexcel Aligned",
      "Flexible Scheduling",
    ],
    overview: {
      heading: "Overview of the AS / A Level Curriculum",
      body: [
        "AS (Advanced Subsidiary) and A Level qualifications are administered by Cambridge International Examinations (CIE), Edexcel, AQA, and other UK boards. Taken by students aged 16–19, A Levels are the gateway to UK universities and are widely recognized by institutions worldwide.",
        "MLS Classes provides comprehensive AS/A Level tutoring across 50+ subjects, with a structured approach that builds deep conceptual understanding and strong exam technique. Our tutors are specialists in their fields and help students navigate complex syllabi with confidence.",
      ],
    },
    subjects: {
      heading: "Subjects We Cover",
      items: [
        "Mathematics & Further Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "English Language",
        "English Literature",
        "History",
        "Geography",
        "Economics",
        "Business Studies",
        "Psychology",
        "Sociology",
        "Foreign Languages",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Comprehensive Curriculum Coverage",
        description:
          "Our tutors follow the exact CIE, Edexcel, and AQA syllabi, ensuring nothing is missed in your exam preparation.",
      },
      {
        title: "Personalized Learning Plans",
        description:
          "Every student receives a bespoke study plan designed around their subjects, exam board, target grades, and timeline.",
      },
      {
        title: "AS and A Level Practice",
        description:
          "We use official past papers and mark schemes so students are fully familiar with exam style and expectations.",
      },
      {
        title: "Expert Subject Tutors",
        description:
          "Our tutors hold university degrees in their subjects and have extensive experience with the UK curriculum.",
      },
      {
        title: "Flexible Learning Options",
        description:
          "Evening, weekend, or daytime sessions — fully flexible scheduling tailored to fit around school and activities.",
      },
    ],
  },

  "igcse-curriculum": {
    slug: "igcse-curriculum",
    title: "IGCSE / GCSE",
    category: "UK Curriculum",
    categoryColor: "purple",
    heroTitle: "Complete IGCSE & GCSE Mastery with Expert Tutoring",
    heroSubtitle:
      "Dedicated 1-on-1 IGCSE/GCSE tutoring covering 70+ subjects with Cambridge-aligned curriculum and exam technique from MLS Classes.",
    stats: [
      "Live Online Interactive Classes",
      "70+ Subjects Covered",
      "1:1 Personalized Tutoring",
      "Cambridge & Edexcel Aligned",
      "Students Aged 14–16",
    ],
    overview: {
      heading: "Overview of the IGCSE Curriculum",
      body: [
        "The International General Certificate of Secondary Education (IGCSE) is administered by Cambridge International Examinations (CIE) and is taken by students aged 14–16. It is the world's most popular international qualification for this age group, recognized by universities and employers globally.",
        "MLS Classes offers thorough IGCSE and GCSE tutoring across more than 70 subjects. Our tutors ensure students master every topic in the syllabus, develop strong exam technique, and approach their final exams with confidence.",
      ],
    },
    subjects: {
      heading: "Subjects We Cover",
      items: [
        "Mathematics (Core & Extended)",
        "Physics",
        "Chemistry",
        "Biology",
        "Combined Science",
        "English Language",
        "English Literature",
        "History",
        "Geography",
        "Economics",
        "Business Studies",
        "Computer Science",
        "French / Spanish / German",
        "Art & Design",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Complete Curriculum Coverage",
        description:
          "We cover the full CIE and Edexcel IGCSE syllabi for each subject, leaving no topic untouched before your exams.",
      },
      {
        title: "Customized Learning Plans",
        description:
          "Your tutor tailors each lesson to your pace, learning style, and specific exam board requirements.",
      },
      {
        title: "IGCSE Practice Papers",
        description:
          "Extensive past-paper practice with mark-scheme feedback builds familiarity and boosts exam confidence.",
      },
      {
        title: "Expert Tutors",
        description:
          "Subject-specialist tutors with in-depth IGCSE experience guide students through even the most challenging topics.",
      },
      {
        title: "Flexible Learning Options",
        description:
          "Sessions available at any time to fit around school timetables and extracurricular commitments.",
      },
    ],
  },

  "ib-curriculum": {
    slug: "ib-curriculum",
    title: "IB Curriculum",
    category: "International",
    categoryColor: "purple",
    heroTitle: "Comprehensive IB Online Tutoring for Every Programme",
    heroSubtitle:
      "Expert 1-on-1 IB tutoring for PYP, MYP, DP, and CP — covering every subject and preparing students for academic excellence worldwide.",
    stats: [
      "Live Online Interactive Classes",
      "All IB Programmes",
      "1:1 Personalized Tutoring",
      "DP Exam-Focused Practice",
      "Global Students Served",
    ],
    overview: {
      heading: "Overview of the IB Curriculum",
      body: [
        "The International Baccalaureate (IB), founded in Geneva, offers four rigorous programmes for students aged 3–19: the Primary Years Programme (PYP), Middle Years Programme (MYP), Diploma Programme (DP), and Career-related Programme (CP). The IB is recognized by top universities worldwide and promotes holistic, inquiry-based learning.",
        "MLS Classes provides expert IB tutoring across all four programmes, with particular depth in the Diploma Programme (DP) where exam performance is critical. Our tutors align lessons with IB assessment criteria and Internal Assessment requirements to help students achieve the grades they need.",
      ],
    },
    subjects: {
      heading: "IB Programmes & Subjects",
      items: [
        "PYP — Primary Years (Ages 3–12)",
        "MYP — Middle Years (Ages 11–16)",
        "DP Mathematics AA & AI",
        "DP Physics",
        "DP Chemistry",
        "DP Biology / ESS",
        "DP English A & B",
        "DP Economics & Business",
        "DP History & Geography",
        "DP Computer Science",
        "Theory of Knowledge (TOK)",
        "Extended Essay (EE) Support",
        "CP — Career-related Programme",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Complete IB Programme Coverage",
        description:
          "From PYP through DP and CP, we support students at every level of the IB framework with subject-specialist tutors.",
      },
      {
        title: "Personalized Learning Plans",
        description:
          "Customized plans account for your specific HL/SL subjects, Internal Assessments, and upcoming exam timeline.",
      },
      {
        title: "IB Exam Practice",
        description:
          "Official past papers and mark-scheme analysis prepare students for the exact demands of IB examinations.",
      },
      {
        title: "Expert Tutors",
        description:
          "Our IB tutors have studied or taught within the IB framework and understand its unique assessment style deeply.",
      },
      {
        title: "Flexible Learning Options",
        description:
          "1-on-1 online sessions that schedule around your school week, CAS commitments, and exam calendar.",
      },
      {
        title: "Focused Exam Preparation",
        description:
          "Dedicated revision sessions in the weeks before exams, targeting command terms, marking criteria, and exam strategy.",
      },
    ],
  },

  naplan: {
    slug: "naplan",
    title: "NAPLAN Prep",
    category: "AU Curriculum",
    categoryColor: "teal",
    heroTitle: "Online NAPLAN Prep — Australian Curriculum Tutoring",
    heroSubtitle:
      "Boost your NAPLAN performance with expert tutors who align every session to the Australian Curriculum and NAPLAN exam format.",
    stats: [
      "Live Online Interactive Classes",
      "Years 3, 5, 7 & 9",
      "1:1 Personalized Tutoring",
      "Australian Curriculum Aligned",
      "NAPLAN-Specific Practice",
    ],
    overview: {
      heading: "What is NAPLAN?",
      body: [
        "NAPLAN (National Assessment Program — Literacy and Numeracy) is administered by ACARA and assesses all Australian students in Years 3, 5, 7, and 9 in Reading, Writing, and Numeracy. Results are used to track student progress and school performance across the country.",
        "MLS Classes provides targeted NAPLAN tutoring that builds the foundational literacy and numeracy skills tested in the assessment while familiarizing students with the online format, question types, and time management strategies needed to perform at their best.",
      ],
    },
    subjects: {
      heading: "What We Cover",
      items: [
        "Reading Comprehension",
        "Narrative & Persuasive Writing",
        "Grammar & Punctuation",
        "Spelling",
        "Numeracy — Number & Algebra",
        "Numeracy — Measurement & Geometry",
        "Numeracy — Statistics & Probability",
        "Year 3 Preparation",
        "Year 5 Preparation",
        "Year 7 Preparation",
        "Year 9 Preparation",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Comprehensive Curriculum Coverage",
        description:
          "Every NAPLAN literacy and numeracy strand is covered systematically, aligned to the Australian Curriculum.",
      },
      {
        title: "Tailored Learning Plans",
        description:
          "Lessons adapt to each student's year level, starting with their diagnostic results to close specific knowledge gaps.",
      },
      {
        title: "NAPLAN-Specific Practice",
        description:
          "We use NAPLAN-style practice questions and past papers to build confidence with the actual test format.",
      },
      {
        title: "Expert Tutors",
        description:
          "Our tutors are familiar with the Australian Curriculum and NAPLAN requirements for each year level.",
      },
      {
        title: "Flexible Learning Options",
        description:
          "Online sessions available at times that suit Australian families, including early morning and evening slots.",
      },
    ],
  },

  "college-biology": {
    slug: "college-biology",
    title: "College Biology",
    category: "College Courses",
    categoryColor: "green",
    heroTitle: "Online College Biology Tutoring — Tailored for Higher Education Success",
    heroSubtitle:
      "Unlock your potential in college-level biology with expert 1-on-1 tutoring that covers every topic from cells to ecosystems.",
    stats: [
      "Live Online Interactive Classes",
      "Affordable Rates",
      "1:1 Personalized Tutoring",
      "Expert Tutors",
      "Flexible Scheduling",
    ],
    overview: {
      heading: "College Biology at MLS Classes",
      body: [
        "College biology encompasses a wide range of complex topics — from molecular genetics and cellular biology to ecology and evolutionary biology. Many students find the jump from high school biology to college-level coursework challenging without expert guidance.",
        "MLS Classes provides personalized college biology tutoring that simplifies difficult concepts, reinforces lecture material, and prepares students for exams. Whether you need help with a specific unit or ongoing support throughout the semester, our expert tutors are here.",
      ],
    },
    subjects: {
      heading: "Topics We Cover",
      items: [
        "Cell Biology & Cell Division",
        "Molecular Biology & DNA",
        "Genetics & Inheritance",
        "Evolutionary Biology",
        "Ecology & Ecosystems",
        "Physiology — Organ Systems",
        "Microbiology",
        "Biochemistry",
        "Developmental Biology",
        "Plant Biology",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Affordable Rates",
        description:
          "High-quality college-level tutoring at transparent, competitive prices with no hidden fees.",
      },
      {
        title: "Customized Learning",
        description:
          "Lessons follow your course syllabus and exam schedule, so every session is directly relevant to your coursework.",
      },
      {
        title: "Expert Tutors",
        description:
          "Our biology tutors hold degrees in biological sciences and have extensive experience teaching at the college level.",
      },
      {
        title: "Flexible Scheduling",
        description:
          "Book sessions whenever you need — before an exam, after a confusing lecture, or on a regular weekly schedule.",
      },
      {
        title: "Engaging Resources",
        description:
          "Diagrams, annotated notes, and interactive visuals make complex biological processes easy to understand and remember.",
      },
    ],
  },

  "college-english": {
    slug: "college-english",
    title: "College English",
    category: "College Courses",
    categoryColor: "green",
    heroTitle: "Online College English Tutoring — Tailored for Higher Education Success",
    heroSubtitle:
      "Strengthen your academic writing, critical reading, and literary analysis with expert 1-on-1 college English tutoring from MLS Classes.",
    stats: [
      "Live Online Interactive Classes",
      "Affordable Rates",
      "1:1 Personalized Tutoring",
      "Expert Tutors",
      "Flexible Scheduling",
    ],
    overview: {
      heading: "College English at MLS Classes",
      body: [
        "College English courses challenge students to think critically, write persuasively, and analyze complex texts at an advanced level. From freshman composition to upper-division literature seminars, the demands of college-level English go well beyond what most students encountered in high school.",
        "MLS Classes offers expert 1-on-1 college English tutoring that helps students master academic writing, refine grammar and style, and develop confident analytical thinking. Whether you need essay feedback, grammar coaching, or literary analysis help, we've got you covered.",
      ],
    },
    subjects: {
      heading: "Topics We Cover",
      items: [
        "Academic & Argumentative Writing",
        "Essay Structure & Thesis Development",
        "Critical Reading & Textual Analysis",
        "Grammar, Syntax & Style",
        "Composition Techniques",
        "Literary Theory & Criticism",
        "Research & Citation (MLA, APA, Chicago)",
        "Public Speaking & Presentations",
        "Creative Writing",
        "Business & Professional Writing",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Affordable Rates",
        description:
          "Expert English tutoring at fair, transparent prices — no subscription traps or session minimums.",
      },
      {
        title: "Customized Learning",
        description:
          "Every session is tailored to your specific assignments, essays, and upcoming exams so you always work on what matters most.",
      },
      {
        title: "Expert Tutors",
        description:
          "Our English tutors hold degrees in English, Literature, or Writing and are skilled at breaking down complex writing concepts.",
      },
      {
        title: "Flexible Scheduling",
        description:
          "Need help the night before an essay is due? Our flexible scheduling means you can book last-minute or plan ahead.",
      },
      {
        title: "Engaging Resources",
        description:
          "Annotated model essays, grammar guides, and reading frameworks give you tools to improve independently between sessions.",
      },
    ],
  },

  "html-web-development": {
    slug: "html-web-development",
    title: "HTML & Web Development",
    category: "IT Courses",
    categoryColor: "orange",
    heroTitle: "Online IT Courses — HTML & Web Development Tutoring",
    heroSubtitle:
      "Learn to build real websites from scratch with expert 1-on-1 web development tutoring covering HTML, CSS, JavaScript, and beyond.",
    stats: [
      "Live Online Interactive Classes",
      "Beginner to Advanced",
      "1:1 Personalized Tutoring",
      "Project-Based Learning",
      "Flexible Scheduling",
    ],
    overview: {
      heading: "Web Development at MLS Classes",
      body: [
        "Web development is one of the most in-demand and rewarding skills a student can learn today. Starting with the fundamentals of HTML and CSS, students progress through JavaScript, responsive design, and modern web development tools — building real, deployable projects along the way.",
        "MLS Classes provides 1-on-1 web development tutoring that moves at your pace. Whether you're a complete beginner or an intermediate developer looking to solidify your skills, our expert tutors guide you through structured projects that build genuine competence and confidence.",
      ],
    },
    subjects: {
      heading: "Topics We Cover",
      items: [
        "Introduction to HTML5",
        "CSS Styling & Flexbox/Grid",
        "Responsive Web Design",
        "Advanced HTML & CSS Techniques",
        "JavaScript Fundamentals",
        "DOM Manipulation & Events",
        "Web Development Best Practices",
        "Version Control with Git",
        "Introduction to Web Dev Tools",
        "Building & Deploying Projects",
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Project-Based Learning",
        description:
          "Students build real websites and applications from day one, making learning concrete, practical, and motivating.",
      },
      {
        title: "Beginner-Friendly Approach",
        description:
          "No prior coding experience needed — we start from the very basics and build confidence step by step.",
      },
      {
        title: "Expert Tutors",
        description:
          "Our web development tutors are professional developers who teach modern, industry-relevant skills and techniques.",
      },
      {
        title: "Flexible Scheduling",
        description:
          "Sessions available on your schedule — perfect for students balancing school, college, or other commitments.",
      },
      {
        title: "Career-Ready Skills",
        description:
          "By the end of the program, students have portfolio projects and a working knowledge of real-world web development.",
      },
    ],
  },
};
