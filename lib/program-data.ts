export interface ProgramStep {
  number: number;
  title: string;
  description: string;
}

export interface ProgramFeature {
  title: string;
  description: string;
}

export interface ProgramModuleGroup {
  title: string;
  items: string[];
}

export interface ProgramData {
  slug: string;
  title: string;
  category: string;
  categoryColor: "blue" | "purple" | "teal" | "green" | "orange";
  heroTitle: string;
  heroSubtitle: string;
  stats: string[];
  coverage?: string;
  media?: {
    image: string;
    caption: string;
    legacyAssets?: string[];
  };
  overview: {
    heading: string;
    body: string[];
  };
  subjects?: {
    heading: string;
    items: string[];
  };
  modules?: {
    heading: string;
    description?: string;
    groups: ProgramModuleGroup[];
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

const BASE_PROGRAMS: Record<string, ProgramData> = {
  "ap-test": {
    slug: "ap-test",
    title: "AP Test Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Achieve Top Scores With Expert AP Tutoring",
    heroSubtitle:
      "MLS Classes help you master AP subjects, improve your skills, and achieve top scores.",
    stats: [
      "Live Online Interactive Classes",
      "50+ Hours Tutoring",
      "1:1 AP Courses",
      "100+ Practice Tests",
      "Support for AP Exam",
    ],
    overview: {
      heading: "What is the AP Test? A Complete Guide",
      body: [
        "The Advanced Placement exam is crucial for students who want to take university-level courses while still in high school. The College Board administers AP exams across math, computer science, English, science, history, and more.",
        "MLS Classes provides expert AP guidance so students can excel, earn college credits, and prepare efficiently at an affordable rate with complete transparency.",
      ],
    },
    subjects: {
      heading: "AP Courses Online Offered By MLS Classes",
      items: [
        "AP Computer Science - algorithms, data structures, and object-oriented programming",
        "AP Precalculus - trigonometry, algebraic concepts, and problem solving",
        "AP Calculus - limits, derivatives, integrals, and the fundamental theorem",
        "AP Physics - motion, forces, energy, electricity, and science reasoning",
        "AP Environmental Science - ecosystems, ecology, energy flow, and data analysis",
        "AP English Literature and Composition - literary analysis, writing, and critical thinking",
      ],
    },
    modules: {
      heading: "Key Features of the Best Online AP Courses",
      description:
        "The legacy MLS Classes AP page highlights live instruction, individual support, practice tests, and exam-specific preparation.",
      groups: [
        moduleGroup("Live AP Support", ["Live Online Interactive Classes", "50+ hours of comprehensive tutoring", "1:1 AP course options available"]),
        moduleGroup("Exam Readiness", ["100+ practice tests tailored for AP exams", "Support for quality AP exam performance", "Targeted diagnostic review"]),
        moduleGroup("AP Eligibility Notes", ["College-credit opportunity", "Valid ID proof for registration", "One exam per AP subject per year"]),
        moduleGroup("AP Pathways", ["Computer Science", "Precalculus and Calculus", "Physics and Environmental Science", "English Literature"]),
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Expert Tutors",
        description:
          "MLS Classes highlights expert tutors with a proven track record of helping students reach 5/5 AP scores.",
      },
      {
        title: "Progress Tracking",
        description:
          "Detailed test results and insights help students monitor performance and refine their AP preparation.",
      },
      {
        title: "Comprehensive Curriculum",
        description:
          "Students receive essential AP materials, subject review, and exam-aligned preparation across the selected course.",
      },
      {
        title: "Targeted Assessments",
        description:
          "Proven assessment methods identify weak areas and turn practice into measurable score improvement.",
      },
      {
        title: "Adaptable Learning",
        description:
          "Students can study anytime and from anywhere with flexible online preparation.",
      },
    ],
  },

  "digital-sat": {
    slug: "digital-sat",
    title: "Digital SAT Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Digital SAT Tutoring and Online SAT Prep Classes - Your Path to Success",
    heroSubtitle:
      "MLS Classes provide top digital SAT tutoring for exam preparation.",
    media: {
      image: "https://www.mlsclasses.com/static/leftsideSAT.jpg",
      caption: "Digital SAT Tutoring and Online SAT Prep by MLS Classes",
      legacyAssets: [
        "https://www.mlsclasses.com/static/digital.jpg",
        "https://www.mlsclasses.com/static/leftsideSAT.jpg",
        "https://www.mlsclasses.com/static/calendar.jpg",
        "https://www.mlsclasses.com/static/clock.png",
        "https://www.mlsclasses.com/static/computer.png",
        "https://www.mlsclasses.com/static/paper.jpg",
        "https://www.mlsclasses.com/static/attempts.png",
        "https://www.mlsclasses.com/static/book.jpg",
        "https://www.mlsclasses.com/static/girl.png",
        "https://www.mlsclasses.com/static/sat-math.jpg",
        "https://www.mlsclasses.com/static/sat-reading.png",
        "https://www.mlsclasses.com/static/stepbystep.png",
        "https://www.mlsclasses.com/static/sat-prep.jpg",
        "https://www.mlsclasses.com/static/alevel.png",
      ],
    },
    stats: [
      "Live Online Interactive Classes",
      "+50 hours of tutoring",
      "1:1 Classes available for SAT Exam",
      "100+ Adaptive Mock Tests",
      "Support for 2 attempts for the Digital SAT Exam",
      "Specialized prep materials",
    ],
    overview: {
      heading: "What is the Digital SAT?",
      body: [
        "The Digital SAT (Scholastic Assessment Test) is a globally recognized standardized exam used for university admissions, especially in the United States. It plays a critical role in determining college admission and scholarship eligibility, and assessing a student's proficiency in reading, writing, and arithmetic skills.",
        "MLS Classes offers 1-on-1 tutoring for Digital SAT prep and comprehensive courses to help increase your score and allow you to get into your dream college.",
        "MLS Classes provides knowledgeable support at affordable costs, smooth and stress-free online classes, dedicated exam guidance, and 5+ years of experience delivering the best results.",
      ],
    },
    subjects: {
      heading: "SAT Prep Courses Offered by MLS Classes for Students",
      items: [
        "Digital SAT Math Prep - designed for students who need extra practice in problem-solving and advanced math concepts",
        "Digital SAT Reading & Writing Prep - specialized coaching to improve reading comprehension and essay-writing skills",
        "Live online interactive classes",
        "+50 hours of tutoring",
        "1:1 classes available for the SAT exam",
        "100+ adaptive mock tests",
        "Support for 2 attempts for the Digital SAT exam",
        "Specialized prep materials",
      ],
    },
    modules: {
      heading: "Digital SAT Prep Program Details",
      description:
        "The Digital SAT page highlights live online classes, adaptive mock tests, specialized prep materials, flexible scheduling, personalized feedback, and a clear enrollment path.",
      groups: [
        moduleGroup("Main Features", ["Live Online Interactive Classes", "+50 hours of tutoring", "1:1 Classes available for SAT Exam", "100+ adaptive mock tests", "Support for 2 attempts for the Digital SAT Exam", "Specialized prep materials"]),
        moduleGroup("Benefits of SAT Prep Online Classes", ["Study anytime, anywhere with online SAT prep classes tailored to your schedule", "Receive personalized feedback and resources tailored to strengths and improvement areas", "Study with the best tutors committed to your success", "Save on commuting and study materials with affordable online options", "Use live sessions, practice tests, and discussion forums to boost performance"]),
        moduleGroup("SAT Prep Courses", ["Digital SAT Math Prep for problem-solving and advanced math concepts", "Digital SAT Reading & Writing Prep for reading comprehension and essay-writing skills"]),
        moduleGroup("Enrollment Guide", ["Choose Your Course", "Diagnostic Test & Evaluation", "Register on the platform", "Schedule Your Sessions", "Start Learning"]),
      ],
    },
    enrollSteps: [
      {
        number: 1,
        title: "Choose Your Course",
        description: "Select from our variety of offerings.",
      },
      {
        number: 2,
        title: "Diagnostic Test & Evaluation",
        description: "We start by conducting an SAT diagnostic test to evaluate readiness.",
      },
      {
        number: 3,
        title: "Register on the platform",
        description: "Create your account and complete the registration.",
      },
      {
        number: 4,
        title: "Schedule Your Sessions",
        description: "Pick a time slot that works for you.",
      },
      {
        number: 5,
        title: "Start Learning",
        description: "Access lessons, practice tests, and tutoring sessions.",
      },
    ],
    whyChoose: [
      {
        title: "Student Support",
        description:
          "Have questions about SAT prep or need guidance? The MLS Classes team is always available to address your queries.",
      },
      {
        title: "Monitoring Progress",
        description:
          "MLS Classes provides regular updates on your SAT preparation journey.",
      },
      {
        title: "Transparency and Trust",
        description:
          "MLS Classes values your trust and prioritizes complete transparency in the SAT prep process.",
      },
      {
        title: "Fast and Efficient",
        description:
          "Tailored strategies ensure students are well-prepared to achieve top scores without delays.",
      },
      {
        title: "Optimize Your Time",
        description:
          "Expertly designed study plans and strategies help students make the most of their preparation time.",
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
      "MLS Classes provide the best ACT tutoring for effective, convenient exam success.",
    stats: [
      "Live Online Interactive Classes",
      "Over 50 Hours Tutoring",
      "1:1 ACT Classes Available",
      "100+ Adaptive Mock Tests",
      "Specialized Materials",
    ],
    overview: {
      heading: "What is the ACT?",
      body: [
        "The ACT is a standardized college admissions exam in the United States. It measures English, mathematics, reading, science, and optional writing skills so colleges can evaluate academic preparedness.",
        "The MLS Classes ACT preparation course covers all ACT sections through top-rated tutoring and online prep classes. The live page highlights a result-driven program, top-tier faculty, updated content, and ample mock tests.",
        "MLS Classes states that 90% of its students score over 32/36 on the ACT and positions the program as intensive, flexible, and designed for efficient exam success.",
      ],
    },
    subjects: {
      heading: "ACT Sections We Cover",
      items: [
        "ACT Math Prep - focused preparation to improve problem-solving skills and confidence",
        "ACT Science Prep - interpret data, analyze scientific information, and solve problems efficiently",
        "ACT English Prep - grammar, punctuation, sentence structure, and passage improvement",
        "ACT Reading & Writing Prep - reading comprehension, analysis, and effective written communication",
      ],
    },
    modules: {
      heading: "Benefits of Online ACT Prep",
      description:
        "The live ACT page emphasizes experienced educators, live interaction, affordability, schedule fit, and a clear path toward college goals.",
      groups: [
        moduleGroup("ACT Program Features", ["Live online interactive classes", "Over 50 hours of tutoring", "1:1 classes available for the ACT exam"]),
        moduleGroup("Practice and Materials", ["Over 100 adaptive mock tests", "Support for attempts on the ACT exam", "Specialized preparation materials"]),
        moduleGroup("ACT Course Options", ["ACT Math Prep", "ACT Science Prep", "ACT English Prep", "ACT Reading & Writing Prep"]),
        moduleGroup("Enrollment Path", ["Select your course", "Diagnostic test and evaluation", "Register", "Schedule sessions", "Begin learning"]),
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Skilled Tutors",
        description:
          "MLS Classes highlights skilled ACT tutors with a track record of helping students achieve high test scores.",
      },
      {
        title: "Tests & Analytics",
        description:
          "Comprehensive test results and insights help students monitor progress and improve the right skills.",
      },
      {
        title: "Complete Curriculum",
        description:
          "Every major ACT section is covered with updated content, structured lessons, and section-specific practice.",
      },
      {
        title: "Focused Assessments",
        description:
          "Time-tested techniques and assessments help students build exam consistency.",
      },
      {
        title: "Flexible Learning",
        description:
          "Students can study anytime and anywhere with online prep that fits their schedule.",
      },
    ],
  },

  "amc-8": {
    slug: "amc-8",
    title: "AMC 8 Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Online AMC 8 Tutoring | MLS Classes",
    heroSubtitle:
      "MLS Classes offer AMC 8 tutoring to help students reach their full potential and get high rankings in the AMC 8 exam.",
    stats: [
      "1:1 Live Online Coaching",
      "AMC 8 Coverage",
      "Official Contest Materials",
      "Personalized Learning Plans",
      "Competition Strategy Training",
    ],
    overview: {
      heading: "Online AMC 8 Tutoring",
      body: [
        "The AMC 8 program helps students master essential arithmetic, algebra, geometry, and counting principles tested on the AMC 8.",
        "MLS Classes uses official past AMC 8 problems, reputable math resources, timed full-length practice tests, and expert mistake review to build pacing, accuracy, confidence, and logical reasoning.",
      ],
    },
    subjects: {
      heading: "Topics We Cover",
      items: [
        "Arithmetic",
        "Algebra",
        "Geometry",
        "Counting Principles",
        "Real AMC 8 Questions",
        "Timed Full-Length Practice Tests",
        "Mistake Review",
        "Logical Reasoning",
      ],
    },
    modules: {
      heading: "How to Prepare for AMC 8",
      description:
        "The live AMC 8 page is structured around real AMC questions, official materials, timed tests, and expert correction.",
      groups: [
        moduleGroup("Core Math Areas", ["Arithmetic", "Algebra", "Geometry", "Counting principles"]),
        moduleGroup("Practice Materials", ["Real AMC 8 questions", "Past contest problems", "High-quality workbooks"]),
        moduleGroup("Practice Testing", ["Timed full-length tests", "Pacing improvement", "Accuracy training"]),
        moduleGroup("Feedback Loop", ["Review mistakes", "Expert guidance", "Continuous improvement"]),
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Affordable & High-Quality",
        description:
          "Get expert AMC 8 education at an affordable price without financial stress.",
      },
      {
        title: "Consistent Progress Tracking",
        description:
          "Focused feedback helps students identify weaknesses and refine their contest skills.",
      },
      {
        title: "Official Contest Materials",
        description:
          "Past AMC 8 questions familiarize students with genuine formats and problem types.",
      },
      {
        title: "Personalized Learning Plans",
        description:
          "Custom lesson plans are based on each student's strengths, weaknesses, and learning style.",
      },
      {
        title: "Flexible & Accessible Learning",
        description:
          "Students can access practice tests and tutoring sessions anytime for a customized study plan.",
      },
    ],
  },

  mathcounts: {
    slug: "mathcounts",
    title: "MATHCOUNTS Prep",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "MATHCOUNTS Tutoring",
    heroSubtitle:
      "Prepare for MATHCOUNTS with expert coaching, real competition problems, timed practice, and detailed feedback.",
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
        "The MATHCOUNTS program at MLS Classes focuses on core math topics, real MATHCOUNTS problems, reliable math resources, timed full-length practice tests, and expert mistake review.",
        "Students build algebra, geometry, number concepts, combinatorics, time-control, accuracy, critical thinking, and confidence through structured competition coaching.",
      ],
    },
    subjects: {
      heading: "Topics We Cover",
      items: [
        "Algebra",
        "Geometry",
        "Number Concepts",
        "Combinatorics",
        "Real MATHCOUNTS Problems",
        "Timed Full-Length Practice Tests",
        "Mistake Review",
        "Critical Thinking",
      ],
    },
    modules: {
      heading: "MATHCOUNTS Preparation Plan",
      description:
        "The live MATHCOUNTS source emphasizes foundation building, authentic practice, timed tests, and expert explanations.",
      groups: [
        moduleGroup("Core Foundation", ["Algebra", "Geometry", "Number concepts", "Combinatorics"]),
        moduleGroup("Authentic Practice", ["Past competition questions", "Competition-style problems", "Reliable workbooks"]),
        moduleGroup("Timed Testing", ["Full-length practice tests", "Time control", "Speed and accuracy"]),
        moduleGroup("Expert Review", ["Mistake analysis", "Detailed explanations", "Problem-solving refinement"]),
      ],
    },
    enrollSteps: STANDARD_ENROLL_STEPS,
    whyChoose: [
      {
        title: "Affordable & Expert-Led Coaching",
        description:
          "Get top-quality instruction from experienced math competition mentors at an accessible price.",
      },
      {
        title: "Consistent Progress Tracking",
        description:
          "Regular assessments and feedback ensure steady improvement.",
      },
      {
        title: "Official Competition Materials",
        description:
          "The curriculum includes past MATHCOUNTS problems for a real competition experience.",
      },
      {
        title: "Personalized Learning Plans",
        description:
          "Lessons are tailored to individual learning styles and goals.",
      },
      {
        title: "Expert Tutors with Proven Results",
        description:
          "Tutors have a successful track record preparing students for MATHCOUNTS success.",
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

function program(input: ProgramData): ProgramData {
  return {
    enrollSteps: STANDARD_ENROLL_STEPS,
    ...input,
  };
}

function feature(title: string, description: string): ProgramFeature {
  return { title, description };
}

function moduleGroup(title: string, items: string[]): ProgramModuleGroup {
  return { title, items };
}

function testPrepProgram(
  slug: string,
  title: string,
  heroTitle: string,
  heroSubtitle: string,
  stats: string[],
  overviewHeading: string,
  overviewBody: string[],
  subjects: string[],
  whyChoose: ProgramFeature[],
  moduleGroups?: ProgramModuleGroup[],
): ProgramData {
  return program({
    slug,
    title,
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle,
    heroSubtitle,
    stats,
    media: {
      image: "/carousal.webp",
      caption: `${title} live online prep with MLS Classes`,
    },
    overview: { heading: overviewHeading, body: overviewBody },
    subjects: { heading: "What We Cover", items: subjects },
    modules: moduleGroups
      ? {
          heading: `${title} Course Breakdown`,
          description: "Legacy MLS Classes course structure converted into a clearer, responsive curriculum view.",
          groups: moduleGroups,
        }
      : undefined,
    whyChoose,
  });
}

function academicProgram(
  slug: string,
  title: string,
  category: string,
  heroTitle: string,
  heroSubtitle: string,
  coverage: string,
  overviewHeading: string,
  overviewBody: string[],
  subjects: string[],
  whyChoose: ProgramFeature[],
  moduleGroups?: ProgramModuleGroup[],
): ProgramData {
  return program({
    slug,
    title,
    category,
    categoryColor: category.includes("IT") ? "orange" : category.includes("College") ? "green" : category.includes("AU") ? "teal" : "purple",
    heroTitle,
    heroSubtitle,
    coverage,
    stats: ["Live Online Interactive Classes", coverage, "1:1 Personalized Tutoring", "Flexible Scheduling", "Expert Tutors"],
    media: {
      image: "/features/live-class-explanation.webp",
      caption: `${title} tutoring designed from the legacy MLS Classes curriculum`,
    },
    overview: { heading: overviewHeading, body: overviewBody },
    subjects: { heading: "Subjects and Skills", items: subjects },
    modules: moduleGroups
      ? {
          heading: `${title} Learning Pathway`,
          description: "A structured pathway based on the original MLS Classes course coverage.",
          groups: moduleGroups,
        }
      : undefined,
    whyChoose,
  });
}

const AP_WHY = [
  feature("Affordable & Accessible", "High-quality AP support with transparent learning plans and flexible scheduling."),
  feature("Standard AP Resources", "Lessons align with College Board-style practice, AP textbooks, past questions, and scoring expectations."),
  feature("Personalized Learning Plans", "Every student gets a plan around current level, target score, school timeline, and exam date."),
  feature("Expert Tutors", "Subject-specialist tutors teach the concept, exam pattern, and response strategy together."),
];

const TEST_PREP_EXTRA_PROGRAMS: Record<string, ProgramData> = {
  "sat-math": program({
    slug: "sat-math",
    title: "Digital SAT Math",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Achieve Top Scores in Digital SAT Math Test",
    heroSubtitle:
      "Boost your SAT math score with a comprehensive Digital SAT Math guide, insider strategies, and focused tutoring for every tested skill.",
    coverage: "Digital SAT Math: algebra, advanced math, data analysis, geometry, and trigonometry",
    stats: ["Algebra", "Advanced Math", "Data Analysis", "Geometry", "Trigonometry", "Practice Tests"],
    media: {
      image: "https://www.mlsclasses.com/static/dsat-math.jpg",
      caption: "All Information About the Digital SAT Math Test",
      legacyAssets: [
        "https://www.mlsclasses.com/static/dsat-math.jpg",
        "https://www.mlsclasses.com/static/long.jpg",
      ],
    },
    overview: {
      heading: "What is the Digital SAT Math Course?",
      body: [
        "The Digital SAT Math section is essential to getting your dream score in the SAT exam. It evaluates mathematical concepts and problem-solving abilities, and effective Digital SAT Math prep with a tutor can significantly enhance performance.",
        "Preparing for the Digital SAT Math test requires algebra, geometry, trigonometry, and problem-solving. Students should understand the structure and schedule of the section while building the essential mathematical foundation needed for advanced mathematics and beyond.",
        "MLS Classes helps students approach the section with a complete plan: concept review, College Board-style questions, diagnostic review, full-length practice tests, detailed scorecards, and personalized feedback after each practice cycle.",
      ],
    },
    subjects: {
      heading: "Digital SAT Math Topics Covered",
      items: [
        "Linear Equations and Inequalities",
        "Systems of Equations",
        "Expressions and Polynomials",
        "Quadratic Equations",
        "Functions",
        "Nonlinear Expressions",
        "Ratios, Proportions, and Percentages",
        "Statistics: Mean, Median, Mode, and Standard Deviation",
        "Probability",
        "Plane Geometry: Circles, Triangles, and Polygons",
        "Coordinate Geometry",
        "Trigonometric Ratios: Sine, Cosine, and Tangent",
        "Advanced Geometric Concepts: Radians and Sector Areas",
      ],
    },
    modules: {
      heading: "Digital SAT Math Curriculum Overview",
      description:
        "A redesigned version of the live MLS Classes SAT Math curriculum, organized into clear learning blocks for concept mastery and test-day readiness.",
      groups: [
        moduleGroup("Algebra", [
          "Linear equations and inequalities: master solving equations, inequalities, and algebraic expressions.",
          "Systems of equations: solve systems with multiple variables and constraints confidently.",
          "Expressions and polynomials: simplify and manipulate expressions for more complex algebraic operations.",
        ]),
        moduleGroup("Advanced Math", [
          "Quadratic equations: strengthen the bridge between basic and advanced algebra.",
          "Functions: explore types of functions, their properties, and their applications.",
          "Nonlinear expressions: build a deeper understanding of mathematical relationships.",
        ]),
        moduleGroup("Problem Solving and Data Analysis", [
          "Ratios, proportions, and percentages for real-world quantitative reasoning.",
          "Statistics, including mean, median, mode, and standard deviation.",
          "Probability skills for interpreting outcomes and solving applied problems.",
        ]),
        moduleGroup("Geometry and Trigonometry", [
          "Plane geometry with circles, triangles, and polygons.",
          "Coordinate geometry for graph-based reasoning.",
          "Trigonometric ratios: sine, cosine, and tangent.",
          "Advanced geometry concepts, including radians and sector areas.",
        ]),
        moduleGroup("Study Timeline", [
          "Starting proficiency: strong math students may need a few focused weeks for a slight improvement.",
          "Moderate improvement: many students need two to three months of weekly practice.",
          "Significant improvement: larger score gains often require three to six months of consistent work.",
          "Progress checks: regular assessments help adjust the plan before test day.",
        ]),
        moduleGroup("Course Highlights", [
          "Official and expert materials, including Digital SAT Math question-bank style practice.",
          "Diagnostic test review to identify gaps before the study plan begins.",
          "Practice test mastery through full-length assignments and mistake review.",
          "Personalized feedback, realistic practice, and comprehensive topic coverage.",
        ]),
      ],
    },
    whyChoose: [
      feature(
        "Strategic SAT Math Prep",
        "Students learn the structure, sections, and timing of Digital SAT Math before practicing advanced question strategy.",
      ),
      feature(
        "Targeted Weakness Review",
        "Diagnostic tests, scorecards, and mistake review help tutors focus on the exact concepts limiting performance.",
      ),
      feature(
        "Practice Under Real Conditions",
        "Full-length supervised practice tests simulate test conditions and train pacing, accuracy, and confidence.",
      ),
      feature(
        "Reliable Resources",
        "Lessons use College Board-style practice, prep guides, online tools, and teacher-curated materials for consistent progress.",
      ),
      feature(
        "Test-Day Readiness",
        "Tutors reinforce estimation, elimination, formula fluency, time management, positive mindset, and simulated test conditions.",
      ),
    ],
  }),
  "sat-read-write": program({
    slug: "sat-read-write",
    title: "Digital SAT Reading & Writing",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Mastering Digital SAT Reading and Writing Section",
    heroSubtitle:
      "Learn how the Digital SAT Reading and Writing section works, then build stronger comprehension, grammar, expression, and test strategy with MLS Classes.",
    coverage: "Digital SAT Reading and Writing: passages, question domains, grammar, and expression",
    stats: ["25-150 Word Passages", "Single MCQ Per Passage", "4 Content Domains", "Grammar", "Reading Comprehension", "Expert Feedback"],
    media: {
      image: "https://www.mlsclasses.com/static/sat-rw.jpg",
      caption: "Improve Your Digital SAT Reading and Writing Section for Exam",
      legacyAssets: [
        "https://www.mlsclasses.com/static/sat-rw.jpg",
        "https://www.mlsclasses.com/static/format.jpg",
      ],
    },
    overview: {
      heading: "What are Digital SAT Reading and Writing Passages Like?",
      body: [
        "The Digital SAT Reading and Writing section evaluates reading comprehension and writing skills. Success in this section contributes significantly to the overall SAT score and strengthens the college application profile.",
        "Passages come from literature, history, science, and social studies. They usually range from 25 to 150 words, and each passage is followed by a single multiple-choice question.",
        "Questions that test similar information and skills are grouped together and generally move from easier to harder, so students need both content knowledge and a clear section strategy.",
      ],
    },
    subjects: {
      heading: "Digital SAT Reading and Writing Question Format",
      items: [
        "Information and Ideas",
        "Craft and Structure",
        "Expression of Ideas",
        "Standard English Conventions",
        "Main Ideas and Details",
        "Evidence and Inference",
        "Vocabulary in Context",
        "Author Reasoning",
        "Grammar and Usage",
        "Punctuation",
        "Sentence Improvement",
        "Clear Organization and Expression",
      ],
    },
    modules: {
      heading: "Digital SAT Reading and Writing Prep Plan",
      description:
        "A clearer redesigned pathway based on the live MLS Classes SAT Reading and Writing page.",
      groups: [
        moduleGroup("Question Domains", [
          "Information and Ideas: understand, evaluate, and combine information from texts and data displays.",
          "Craft and Structure: analyze word choice, text structure, purpose, and author technique.",
          "Expression of Ideas: improve organization, clarity, transitions, and written communication.",
          "Standard English Conventions: apply grammar, punctuation, usage, and sentence rules.",
        ]),
        moduleGroup("Passage Practice", [
          "Read short passages from literature, history, science, and social studies.",
          "Identify main ideas, details, themes, evidence, and author reasoning.",
          "Handle varying passage styles, complexity levels, and content areas.",
        ]),
        moduleGroup("MLS Tutoring Approach", [
          "Customized instruction based on each student's strengths and weaknesses.",
          "Comprehensive practice with Digital SAT-style questions and assignments.",
          "Strategic techniques for question types, time management, and comprehension.",
          "Detailed feedback on practice tests and assignments for steady improvement.",
        ]),
        moduleGroup("Student Feedback", [
          "Students report remarkable score improvements after Digital SAT Reading and Writing tutoring with MLS Classes.",
          "Families highlight personalized attention, expert guidance, and practical tips that boost confidence and performance.",
          "The tutoring gives students a clear roadmap for excelling in the SAT Reading and Writing section.",
        ]),
        moduleGroup("Conclusion", [
          "Acing Digital SAT Reading and Writing requires practical strategies, steady practice, and expert guidance.",
          "MLS Classes helps students refine reading comprehension and writing skills for their best possible Digital SAT score.",
        ]),
      ],
    },
    whyChoose: [
      feature("Customized Instruction", "Tutors analyze strengths and weaknesses and adapt the SAT Reading and Writing plan around the student."),
      feature("Comprehensive Practice", "Students work through realistic Digital SAT-style passages, grammar questions, and expression drills."),
      feature("Strategic Techniques", "MLS tutors teach question tactics, time management, close reading, and elimination strategies."),
      feature("Feedback and Improvement", "Practice tests and assignments are reviewed so students know exactly what to fix next."),
      feature("Confidence for Test Day", "Students build a clear roadmap for improving comprehension, writing accuracy, and overall section performance."),
    ],
  }),
  "act-math": program({
    slug: "act-math",
    title: "ACT Math",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "ACT Math Tutor for Comprehensive Guide to Success",
    heroSubtitle:
      "Build ACT Math confidence with topic mastery, test strategy, document guidance, timed practice, and expert MLS Classes tutoring.",
    coverage: "ACT Math: 60 questions in 60 minutes across algebra, geometry, and trigonometry",
    stats: ["60 Questions", "60 Minutes", "Pre-Algebra", "Geometry", "Trigonometry", "Full-Length Tests"],
    media: {
      image: "https://www.mlsclasses.com/static/act-maths.jpeg",
      caption: "ACT Math Tutor For A Comprehensive Guide To Success",
      legacyAssets: [
        "https://www.mlsclasses.com/static/act-maths.jpeg",
        "https://www.mlsclasses.com/static/topics-act-math.jpeg",
        "https://www.mlsclasses.com/static/documents-act.jpeg",
      ],
    },
    overview: {
      heading: "Overview of ACT Math",
      body: [
        "High school students preparing for college applications need a clear understanding of the ACT and all of its sections. ACT Math is one of the most important parts because it directly affects the total score.",
        "ACT Math is an important part of the total ACT score and college admissions process. It assesses mathematical skills, mathematical thinking, and the ability to solve real-world problems.",
        "The section covers topics from pre-algebra and elementary algebra through coordinate geometry, plane geometry, and trigonometry. Students need both concept clarity and the speed to answer accurately under time pressure.",
        "MLS Classes helps students understand why ACT Math matters, review every tested topic, practice regularly, manage time, take full-length tests, and use official ACT-specific resources effectively.",
      ],
    },
    subjects: {
      heading: "Topics Included in ACT Math",
      items: [
        "Pre-Algebra: 14 questions",
        "Elementary Algebra: 10 questions",
        "Intermediate Algebra: 9 questions",
        "Coordinate Geometry: 9 questions",
        "Plane Geometry: 14 questions",
        "Trigonometry: 4 questions",
        "Whole Numbers, Fractions, Decimals, and Integers",
        "Powers, Roots, Ratios, and Percentages",
        "Polynomials, Factoring, and Quadratic Equations",
        "Number Line Graphs, Points, Lines, Circles, and Curves",
        "Triangles, Rectangles, Circles, Angles, and Logical Reasoning",
        "Right-Triangle Sine, Cosine, and Tangent",
      ],
    },
    modules: {
      heading: "ACT Math Preparation Pathway",
      description:
        "The live MLS Classes ACT Math content reorganized into topic, strategy, document, and practice blocks.",
      groups: [
        moduleGroup("Why ACT Math Matters", [
          "ACT Math performance can significantly impact the overall ACT score.",
          "Many colleges and universities consider ACT scores during admissions.",
          "A strong math score can open doors to stronger academic opportunities.",
        ]),
        moduleGroup("Pre-Algebra", [
          "Whole numbers, fractions, decimals, integers, powers, roots, and absolute values.",
          "Linear equations, ratios, percentages, multiples, factors, graphs, and tables.",
        ]),
        moduleGroup("Algebra", [
          "Elementary algebra: variables, polynomials, factoring, quadratic equations, inequalities, exponents, and square roots.",
          "Intermediate algebra: quadratic formula, radical expressions, rational expressions, inequalities, and absolute values.",
        ]),
        moduleGroup("Geometry", [
          "Coordinate geometry with number lines, points, lines, polynomials, circles, and curves.",
          "Plane geometry with triangles, rectangles, circles, angles, parallel lines, perpendicular lines, and logical reasoning.",
        ]),
        moduleGroup("Trigonometry", [
          "Functions, identities, equations, and right-triangle sine, cosine, and tangent.",
          "Trigonometric reasoning connected to periodic phenomena and ACT-style problem solving.",
        ]),
        moduleGroup("Enrollment Documents", [
          "Valid identification such as driver license, state ID, temporary ID, or learner permit.",
          "Accurate student interests, high-school education details, and institutions for ACT score submission.",
          "ACT registration can be time-consuming and needs careful attention so every detail is accurate.",
          "Correct information helps students avoid changes to the ACT exam application later.",
        ]),
        moduleGroup("Preparation Strategy", [
          "Understand all ACT Math topics before timed practice and read each question carefully.",
          "Practice regularly, first without time pressure and then in timed sessions that simulate test conditions.",
          "Use time management and a positive mindset to improve performance on test day.",
          "Take full-length practice tests, analyze mistakes, and build speed over time.",
          "Seek expert guidance and use official ACT practice tests and question banks.",
        ]),
        moduleGroup("Student Feedback", [
          "Students praise the personalized approach, complete study materials, and improvement in math skills.",
          "Many students report substantial score increases after participating in MLS Classes' ACT Math tutoring.",
        ]),
        moduleGroup("Sum Up", [
          "Mastering ACT Math is vital for the college admissions journey.",
          "MLS Classes provides resources, guidance, and expertise so students can confidently tackle the ACT Math test.",
        ]),
      ],
    },
    whyChoose: [
      feature("Complete Topic Coverage", "Students review all six ACT Math categories with clear explanations and guided practice."),
      feature("Regular Practice", "Consistent question practice builds speed, accuracy, and confidence before timed tests."),
      feature("Time Management", "Tutors teach pacing strategies for the 60-question, 60-minute ACT Math section."),
      feature("Full-Length Practice", "Practice tests simulate ACT conditions and expose the mistakes that need review."),
      feature("Expert Guidance", "MLS Classes combines resources, strategy, and tutor support so students can improve their score path."),
    ],
  }),
  "act-english": program({
    slug: "act-english",
    title: "ACT English",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "ACT English Practice Test Your Key to High Score",
    heroSubtitle:
      "Practice ACT English with MLS Classes to improve grammar, punctuation, usage, rhetorical skills, and college admissions readiness.",
    coverage: "ACT English: 75 passage-based questions in 45 minutes",
    stats: ["75 Questions", "45 Minutes", "Usage/Mechanics", "Rhetorical Skills", "Grammar", "Practice Tests"],
    media: {
      image: "https://www.mlsclasses.com/static/act-eng.jpg",
      caption: "Practice for the ACT English Test with MLS Classes",
      legacyAssets: [
        "https://www.mlsclasses.com/static/act-eng.jpg",
        "https://www.mlsclasses.com/static/format-act-eng.jpg",
        "https://www.mlsclasses.com/static/prep-act-eng.jpg",
      ],
    },
    overview: {
      heading: "Overview of the ACT English Section",
      body: [
        "The ACT English section evaluates understanding of language fundamentals and comprehension skills. MLS Classes presents it through two main question types: Usage/Mechanics and Rhetorical Skills.",
        "The section includes 75 multiple-choice, passage-based questions in 45 minutes. Some questions focus on underlined portions, while others ask about full passages or larger sections.",
        "Students practice grammar, usage, punctuation, sentence structure, strategy, organization, style, vocabulary, and rhetorical decisions so they can improve both test performance and writing confidence.",
      ],
    },
    subjects: {
      heading: "ACT English Skills Covered",
      items: [
        "Punctuation: commas, apostrophes, colons, dashes, question marks, and semicolons",
        "Grammar and Usage",
        "Subject-Verb Agreement",
        "Pronoun Agreement and Pronoun Forms",
        "Adjectives and Adverbs",
        "Verb Forms and Modifiers",
        "Idioms",
        "Sentence Structure",
        "Subordinate Clauses and Sentence Fragments",
        "Strategy Questions",
        "Organization Questions",
        "Style, Word Choice, Tone, and Clarity",
      ],
    },
    modules: {
      heading: "ACT English Practice Structure",
      description:
        "A redesigned version of the live MLS Classes ACT English page, organized around question types and preparation steps.",
      groups: [
        moduleGroup("Usage/Mechanics", [
          "Punctuation rules for clear writing.",
          "Grammar and usage, including agreement, pronouns, adjectives, adverbs, verbs, modifiers, and idioms.",
          "Sentence structure, subordinate clauses, fragments, and misplaced modifiers.",
        ]),
        moduleGroup("Rhetorical Skills", [
          "Strategy questions about purpose, audience, details, and revision choices.",
          "Organization questions covering ideas, openings, transitions, and closing sentences.",
          "Style questions covering word choice, imagery, sentence elements, tone, and unclear pronouns.",
        ]),
        moduleGroup("Preparation Tips", [
          "Understand the test format before building speed.",
          "Review grammar rules and complete ACT English practice tests.",
          "Identify weaknesses, improve vocabulary, and learn rhetorical strategies.",
        ]),
        moduleGroup("MLS Classes Support", [
          "Professional tutors provide individualized help and focused practice.",
          "Structured lessons and practical tips help students gain confidence and skill.",
          "Full-length practice tests and official ACT materials improve exam readiness.",
        ]),
        moduleGroup("Student Benefits", [
          "A strong ACT English score can improve college admission opportunities.",
          "A high score shows language strength and can make students more attractive to colleges and universities.",
          "Strong English knowledge supports students in college and throughout their careers.",
        ]),
        moduleGroup("How to Prepare", [
          "Use preparation books and approved ACT overview material to understand what to expect.",
          "Review previous ACT English questions and improve reading comprehension.",
          "Use online study tools, online or offline classes, full-length practice tests, and official ACT practice tests.",
        ]),
        moduleGroup("Student Feedback and Conclusion", [
          "Students report score improvements and appreciate knowledgeable, approachable teachers with useful strategies.",
          "MLS Classes helps students handle harder English texts by improving language and rhetoric skills.",
          "With the right guidance, preparation, and tools, students can show colleges stronger English speaking and writing ability.",
        ]),
      ],
    },
    whyChoose: [
      feature("Format Mastery", "Students learn exactly how the 75-question, 45-minute ACT English section works."),
      feature("Grammar Review", "Tutors target punctuation, usage, sentence structure, and recurring ACT grammar patterns."),
      feature("Rhetorical Strategy", "Students practice organization, word choice, tone, purpose, and author-intent questions."),
      feature("Practice-Test Review", "MLS Classes uses practice tests and prior-style questions to expose and fix weak areas."),
      feature("College Readiness", "A stronger ACT English score helps demonstrate language skills for college and future academic work."),
    ],
  }),
  "act-science": program({
    slug: "act-science",
    title: "ACT Science",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Overview and Tips for ACT Science Section",
    heroSubtitle:
      "Master ACT Science through data interpretation, experiment analysis, conflicting viewpoints, and practical MLS Classes strategies.",
    coverage: "ACT Science: 40 multiple-choice questions in 35 minutes",
    stats: ["40 Questions", "35 Minutes", "Data Representation", "Research Summaries", "Conflicting Viewpoints", "No Calculator"],
    media: {
      image: "https://www.mlsclasses.com/static/act-sci.jpg",
      caption: "Overview and Tips for ACT Science Section by MLS Classes",
      legacyAssets: [
        "https://www.mlsclasses.com/static/act-sci.jpg",
        "https://www.mlsclasses.com/static/topics-act-sci.jpg",
        "https://www.mlsclasses.com/static/format-act-sci.jpg",
      ],
    },
    overview: {
      heading: "Topics Included in the ACT Science Section",
      body: [
        "The ACT Science section evaluates the capacity to analyze and interpret scientific data. It does not require deep science knowledge; instead, it measures critical thinking, data analysis, and scientific reasoning.",
        "Questions use graphs, charts, tables, figures, passages, and research summaries across biology, chemistry, earth and space science, and physics.",
        "The section includes 40 multiple-choice questions in 35 minutes. Calculators are not allowed, so students need fast interpretation, careful reading, and efficient decision-making.",
      ],
    },
    subjects: {
      heading: "ACT Science Question Types",
      items: [
        "Data Representation: 15 questions",
        "Research Summaries: 18 questions",
        "Conflicting Viewpoints: 7 questions",
        "Graphs, Charts, Tables, and Figures",
        "Scientific Passages",
        "Biology",
        "Chemistry",
        "Earth and Space Science",
        "Physics",
        "Experimental Design",
        "Scientific Reasoning",
        "No-Calculator Data Interpretation",
      ],
    },
    modules: {
      heading: "ACT Science Preparation Plan",
      description:
        "A redesigned pathway based on the live MLS Classes ACT Science page, focused on reasoning rather than memorization.",
      groups: [
        moduleGroup("Data Representation", [
          "Interpret tables, graphs, charts, and figures quickly.",
          "Read labels, axes, values, and relationships before answering.",
          "Practice the shortest and most direct route from data to answer choice.",
        ]),
        moduleGroup("Research Summaries", [
          "Comprehend and analyze scientific studies and experiments.",
          "Evaluate experiment design, variables, results, and conclusions.",
          "Connect data patterns to the question being asked.",
        ]),
        moduleGroup("Conflicting Viewpoints", [
          "Compare multiple hypotheses, explanations, or scientific perspectives.",
          "Track agreements, disagreements, evidence, and assumptions.",
          "Use passage structure to answer questions efficiently.",
        ]),
        moduleGroup("Prep Strategies", [
          "Do not try to memorize every paragraph; read for substance, then return to the passage as needed.",
          "Practice official ACT exams and categorize mistakes by passage and question type.",
          "Develop time strategies and become familiar with question layouts.",
        ]),
        moduleGroup("Importance and Benefits", [
          "ACT Science assesses scientific reasoning, a skill useful across academic fields and careers.",
          "A strong ACT Science score can strengthen college prospects and demonstrate adaptability with complex information.",
          "Students learn to analyze relationships between data, conclusions, hypotheses, and new predictions.",
        ]),
        moduleGroup("Science Test Format", [
          "Students have 35 minutes to answer 40 multiple-choice questions.",
          "Seven passages cover Data Representation, Research Summaries, and Conflicting Viewpoints with five to seven questions each.",
          "Many passages include charts, tables, graphs, and figures that students must interpret without a calculator.",
        ]),
        moduleGroup("How to Prepare", [
          "Become familiar with question types and test layout.",
          "Regularly work with scientific data and practice deriving conclusions.",
          "Read scientific passages critically, manage time effectively, and take practice tests to track progress.",
        ]),
        moduleGroup("Student Feedback and Conclusion", [
          "Students praise tutor expertise, supportive teaching, and effective methods.",
          "Many students feel more comfortable with complex scientific passages and data analysis after tutoring.",
          "MLS Classes helps students sharpen scientific reasoning and prepare confidently for an outstanding ACT Science score.",
        ]),
      ],
    },
    whyChoose: [
      feature("Scientific Reasoning", "Tutors train students to analyze data, relationships, hypotheses, and conclusions under time pressure."),
      feature("Hands-On Data Practice", "Students repeatedly work with charts, tables, graphs, and figures so visual data becomes less intimidating."),
      feature("Question-Type Familiarity", "MLS Classes teaches the exact differences between Data Representation, Research Summaries, and Conflicting Viewpoints."),
      feature("Mistake Tracking", "Students categorize errors from official ACT practice exams and adjust strategy accordingly."),
      feature("Confidence Building", "Personalized support helps students feel more comfortable with dense scientific passages and data analysis."),
    ],
  }),
  "act-read-write": program({
    slug: "act-read-write",
    title: "ACT Reading & Writing",
    category: "Test Prep",
    categoryColor: "blue",
    heroTitle: "Online ACT Reading and Writing Tutoring for Top Scores in the Exam",
    heroSubtitle:
      "Improve ACT reading comprehension, analysis, written communication, essay organization, grammar, and time management with MLS Classes.",
    coverage: "ACT Reading: 40 questions in 35 minutes, plus optional 40-minute ACT Writing essay",
    stats: ["ACT Reading", "40 Questions", "35 Minutes", "Optional Writing", "40-Minute Essay", "Passage Analysis"],
    media: {
      image: "https://www.mlsclasses.com/static/act-rw.jpg",
      caption: "Top ACT Reading and Writing Tutoring Online by MLS Classes",
      legacyAssets: [
        "https://www.mlsclasses.com/static/act-rw.jpg",
        "https://www.mlsclasses.com/static/topics-act-rw.jpg",
        "https://www.mlsclasses.com/static/prep-act-rw.jpg",
      ],
    },
    overview: {
      heading: "What is the ACT Reading Section?",
      body: [
        "ACT Reading measures close reading, logical reasoning about texts, evidence use, and the ability to integrate facts from sources. The section includes 40 questions in 35 minutes.",
        "ACT Writing is an optional 40-minute essay based on a complex issue with three perspectives. It complements the English and Reading tests by providing a direct sample of standard written English.",
        "MLS Classes helps students improve reading comprehension, analysis, essay organization, grammar, written communication, and timing so they can approach both sections with confidence.",
      ],
    },
    subjects: {
      heading: "ACT Reading and Writing Skills Covered",
      items: [
        "Key Ideas and Details: 52-60%",
        "Craft and Structure: 25-30%",
        "Integration of Knowledge and Ideas: 13-23%",
        "Main Ideas, Themes, Details, and Summaries",
        "Relationships, Inferences, and Cause-Effect Reasoning",
        "Word and Phrase Meaning",
        "Language, Structure, and Rhetorical Choice",
        "Claims, Facts, Opinions, and Evidence",
        "Essay Organization",
        "Grammar Review",
        "Time Management",
        "Passage Analysis",
      ],
    },
    modules: {
      heading: "ACT Reading and Writing Preparation Plan",
      description:
        "The live MLS Classes ACT Reading and Writing content reorganized into a clear, responsive tutoring pathway.",
      groups: [
        moduleGroup("ACT Reading", [
          "Key Ideas and Details: identify themes, details, summaries, relationships, and inferences.",
          "Craft and Structure: analyze language, text structure, word choice, and rhetorical effect.",
          "Integration of Knowledge and Ideas: evaluate claims, facts, opinions, and evidence across related texts.",
        ]),
        moduleGroup("ACT Writing", [
          "Understand the 40-minute essay prompt with one complex issue and three perspectives.",
          "Write organized, clear responses using standard written English conventions.",
          "Decide whether to take Writing based on target college requirements.",
        ]),
        moduleGroup("Why ACT Writing is Optional", [
          "Postsecondary schools have different ACT Writing requirements.",
          "Each institution decides whether ACT Writing results are required for admission or course placement.",
          "Students choose whether to take Writing based on the requirements of the schools they are considering.",
        ]),
        moduleGroup("Importance and Benefits", [
          "ACT Reading and Writing reflects a student's ability to comprehend and respond to complex written material.",
          "One-on-one tutoring builds reading and writing skills needed for academic success and effective communication.",
          "A strong score can improve college applications by showing advanced literacy and coherent communication.",
        ]),
        moduleGroup("Preparation Steps", [
          "Practice reading newspapers, magazines, and varied texts to improve comprehension and vocabulary.",
          "Analyze passages for main ideas, key information, evidence, and structure.",
          "Practice essays, reports, and research-style writing with strong organization and clear grammar.",
          "Review grammar rules, correct writing errors, and use time management routines for reading and writing tasks.",
        ]),
        moduleGroup("MLS Classes Support", [
          "Personalized instruction targets comprehension, writing, and test strategy together.",
          "Tutors provide targeted practice, valuable reading/writing strategies, and feedback.",
          "Students build confidence analyzing complex passages and writing coherent essays.",
        ]),
        moduleGroup("Student Feedback and Conclusion", [
          "Students praise tutor expertise, encouragement, and effective teaching techniques.",
          "Many students feel better equipped to analyze complex passages and write structured, coherent essays.",
          "MLS Classes helps students refine reading and writing skills and prepare for an exceptional ACT score.",
        ]),
      ],
    },
    whyChoose: [
      feature("Reading Comprehension", "Students learn how to find key ideas, evidence, relationships, and author choices in dense passages."),
      feature("Writing Practice", "Tutors strengthen essay structure, grammar, clarity, and timed response skills."),
      feature("Passage Analysis", "Students practice analyzing language, structure, claims, facts, opinions, and evidence."),
      feature("Time Management", "MLS Classes teaches pacing routines for both the 35-minute Reading section and optional 40-minute Writing essay."),
      feature("Personalized Tutoring", "Each student receives targeted instruction and feedback to refine reading, writing, and communication skills."),
    ],
  }),
  "psat": testPrepProgram("psat", "PSAT Prep", "Online PSAT Tutoring for Every PSAT Pathway", "Prepare for PSAT 8/9, PSAT 10, and PSAT/NMSQT with affordable, tailored MLS Classes tutoring.", ["PSAT 8/9", "PSAT 10", "PSAT/NMSQT", "Reading & Writing", "Math"], "PSAT Prep at MLS Classes", ["The live MLS menu separates PSAT preparation into PSAT 8/9, PSAT 10, and PSAT/NMSQT pathways.", "This parent page helps families choose the right PSAT level while keeping the same MLS focus on reading, writing, mathematics, test-taking strategies, and mistake review."], ["Reading and Writing", "Mathematics", "Test-Taking Strategies", "College Board Practice", "Timed Tests", "Mistake Review"], [feature("Right-Level Placement", "Students are guided to the PSAT pathway that matches grade level and goals."), feature("College Board Alignment", "Practice follows digital PSAT skill domains and question styles."), feature("Confidence Building", "Tutoring strengthens the skills needed for PSAT and future SAT preparation.")], [moduleGroup("PSAT Pathways", ["PSAT 8/9", "PSAT 10", "PSAT/NMSQT"]), moduleGroup("Core Sections", ["Reading and Writing", "Mathematics", "Timed practice", "Mistake review"])]),
  "psat-8-9": testPrepProgram("psat-8-9", "PSAT 8/9", "Online PSAT 8/9 Tutoring", "Affordable tailored tutoring to strengthen PSAT 8/9 foundations and future standardized-test readiness.", ["Reading & Writing", "Mathematics", "Test Strategies", "Critical Thinking", "1:1 Feedback"], "What You'll Learn in PSAT 8/9", ["MLS Classes positions PSAT 8/9 tutoring as tailored and affordable support that strengthens key skills and prepares students for future standardized exams.", "Tutors build foundational reading, writing, math, critical thinking, and test-taking skills through interactive lessons, targeted practice, and one-on-one feedback."], ["Reading Comprehension", "Main Ideas", "Grammar and Usage", "Vocabulary in Context", "Arithmetic", "Algebra", "Geometry", "Ratios and Percentages", "Data and Graphs", "Critical Thinking"], [feature("Affordable Rates", "Families receive focused preparation without unnecessary packages."), feature("Personalized Learning", "Tutors tailor methods to each student's strengths and improvement areas."), feature("Focused Exam Preparation", "Structured plans, targeted instruction, and feedback build confidence before higher-stakes exams.")], [moduleGroup("Reading and Writing", ["Comprehension across genres", "Main ideas and details", "Grammar and punctuation", "Vocabulary in context"]), moduleGroup("Mathematics", ["Arithmetic", "Algebra", "Geometry", "Ratios and proportions", "Graphs and charts"]), moduleGroup("Test-Taking Strategies", ["Format familiarity", "Time management", "Sample tests", "Result review"]), moduleGroup("Critical Thinking", ["Logical reasoning", "Analytical skills", "Systematic problem solving", "Confidence through practice"])]),
  "psat-10": testPrepProgram("psat-10", "PSAT 10", "Online PSAT 10 Tutoring", "Personalized and affordable PSAT 10 tutoring for Reading, Writing and Language, Mathematics, and test strategy.", ["Reading", "Writing and Language", "Mathematics", "Strategy", "Practice Review"], "What You'll Learn in PSAT10 Tutoring", ["MLS Classes helps students achieve their best PSAT 10 score with personalized and affordable tutoring. Specialized classes help students master key skills and strategies for PSAT 10 and future academic challenges.", "The program develops critical skills in Reading, Writing and Language, Mathematics, and Test-Taking Strategies while building confidence and readiness."], ["Complex Texts", "Main Ideas", "Vocabulary in Context", "Grammar", "Punctuation", "Sentence Clarity", "Algebra", "Geometry", "Statistics", "Word Problems", "Multiple-Choice Strategy"], [feature("Affordable Rates", "The live PSAT 10 page highlights affordable tutoring with expert support."), feature("Same Test Prep Materials", "Students practice with PSAT 10-style questions and structured resources."), feature("Customized Learning", "Tutors adapt methods to strengths, areas for improvement, and practice-test results.")], [moduleGroup("Reading", ["Complex texts", "Main ideas and themes", "Details", "Vocabulary in context"]), moduleGroup("Writing and Language", ["Grammar", "Punctuation", "Usage", "Sentence clarity", "Correcting errors"]), moduleGroup("Mathematics", ["Algebra", "Geometry", "Statistics", "Word problems", "Quantitative reasoning"]), moduleGroup("Test-Taking Strategies", ["Time management", "Multiple-choice strategy", "Real PSAT10 questions", "Practice-test review"])]),
  "psat-nmsqt": testPrepProgram("psat-nmsqt", "PSAT/NMSQT", "Digital PSAT/NMSQT Tutoring | MLS Classes", "Digital PSAT/NMSQT tutoring using real PSAT questions, College Board materials, timed tests, and expert review.", ["PSAT/NMSQT", "Math", "English", "College Board Materials", "Timed Tests"], "Digital PSAT/NMSQT Tutoring", ["MLS Classes helps students master critical math and English ideas examined on the PSAT/NMSQT and reach their full potential for high rankings.", "The live source emphasizes real PSAT questions, College Board-approved study guides and textbooks, timed full-length practice tests, detailed mistake feedback, and continuous improvement."], ["Key Math Ideas", "English Skills", "Real PSAT Questions", "College Board Study Materials", "Timed Full-Length Practice Tests", "Mistake Review", "Logical Reasoning", "Time Management"], [feature("Affordable & High-Quality Tutoring", "Expert digital PSAT/NMSQT tutoring is offered with professional classes at an affordable price."), feature("Consistent Progress Tracking", "Focused feedback helps students identify weaknesses and refine skills."), feature("Core Academic Skills", "Targeted practice strengthens math, reading, and writing for PSAT and future SAT assessments.")], [moduleGroup("Foundation", ["Critical math ideas", "English ideas", "Reading", "Writing"]), moduleGroup("Practice", ["Real PSAT questions", "College Board materials", "Timed full-length tests"]), moduleGroup("Improvement", ["Mistake feedback", "Problem-solving refinement", "Logical reasoning", "Critical thinking"])]),
  "amc-10": testPrepProgram("amc-10", "AMC 10/12", "Online AMC 10/12 Tutoring with MLS Classes", "Advanced contest math tutoring for AMC 10, AMC 12, and AIME readiness.", ["AMC 10", "AMC 12", "25 Questions", "75 Minutes", "AIME Readiness"], "Overview of the AMC 10/12 Exam", ["AMC 10 and AMC 12 are prestigious math contests organized by the Mathematical Association of America for high school students. Each exam includes 25 multiple-choice questions in 75 minutes.", "MLS Classes boosts performance with affordable expert-led tutoring, core-concept mastery, strategic problem solving, authentic contest problems, and top-score preparation that can support AIME qualification."], ["Algebra", "Geometry", "Number Theory", "Combinatorics", "Advanced Problem-Solving Strategies", "Timed Full-Length Practice Tests", "AIME Readiness"], [feature("Affordable & Expert-Led Tutoring", "Get top-tier coaching from experienced math competition instructors at an accessible cost."), feature("Official AMC Practice Materials", "Past exam problems and solutions familiarize students with the test format."), feature("Expert Tutors with Proven Results", "Tutors have a strong track record helping students qualify for AIME and beyond.")], [moduleGroup("Core Topics", ["Algebra", "Geometry", "Number theory", "Combinatorics"]), moduleGroup("Practice", ["Real AMC 10/12 questions", "Contest workbooks", "Timed full-length practice tests"]), moduleGroup("Review", ["Targeted feedback", "Mistake analysis", "Alternative solutions", "Performance tracking"]), moduleGroup("Advanced Goals", ["Critical thinking", "Analytical skills", "AIME readiness"])]),
  staar: testPrepProgram("staar", "STAAR", "Online STAAR Tutoring with MLS Classes", "STAAR tutoring for Texas ELA, Math, Science, Social Studies, and test-taking strategy.", ["Texas STAAR", "ELA", "Math", "Science", "Social Studies"], "Overview of the STAAR Test", ["STAAR is Texas statewide standardized testing that evaluates students' knowledge and competencies in core subjects. It includes computer- and paper-based tests in ELA, Mathematics, Science, and Social Studies for grades 3-8 and high school.", "MLS Classes provides expert-led STAAR tutoring to reinforce key subjects and improve test performance through structured concepts, strategic test-taking, in-depth practice, and confidence building."], ["English Language Arts", "Mathematics", "Science", "Social Studies", "Test-Taking Strategies", "Official STAAR Questions", "Timed Practice", "Mistake Review"], [feature("Affordable & Expert-Led Tutoring", "Students get targeted STAAR support from experienced tutors."), feature("Official STAAR Practice Materials", "Official-style questions and state-aligned resources build test familiarity."), feature("Personalized Learning Plans", "Tutors tailor plans to strengths, weak areas, grade level, and upcoming assessments.")], [moduleGroup("STAAR Subjects", ["ELA reading and writing", "Mathematics", "Science", "Social Studies"]), moduleGroup("Practice Benefits", ["Core knowledge", "Time management", "Instant feedback", "Critical thinking"]), moduleGroup("Preparation", ["Master core subjects", "Practice official questions", "Use quality materials", "Take full-length timed tests", "Review mistakes"])]),
};

const AP_EXTRA_PROGRAMS: Record<string, ProgramData> = {
  "ap-precalculus": testPrepProgram("ap-precalculus", "AP Precalculus", "Online AP Precalculus Tutoring | MLS Classes", "Master core AP Precalculus concepts with full-length practice tests, problem-solving strategies, and consistent review.", ["AP Precalculus", "Core Concepts", "Practice Tests", "Study Resources", "Exam Strategy"], "AP Precalculus at MLS Classes", ["Legacy AP Precalculus content highlights core concept mastery, full-length tests, problem-solving strategies, study resources, and review cycles.", "The revamped page packages those requirements into a premium AP tutoring pathway."], ["Polynomial Functions", "Rational Functions", "Exponential Functions", "Logarithmic Functions", "Trigonometric Functions", "Polar Functions", "Vectors", "AP-Style Questions"], AP_WHY),
  "ap-calculus-ab": testPrepProgram("ap-calculus-ab", "AP Calculus AB", "AP Calculus AB Tutoring", "Focused AP Calculus AB tutoring for limits, derivatives, integrals, and College Board-style free-response practice.", ["Limits", "Derivatives", "Integrals", "FRQ Practice", "Exam Readiness"], "AP Calculus AB at MLS Classes", ["The legacy content emphasizes limits, derivatives, integrals, AP-style questions, College Board resources, and problem-solving.", "MLS Classes helps students connect concepts to exam technique through guided examples and timed practice."], ["Limits", "Derivatives", "Applications of Derivatives", "Integrals", "Applications of Integration", "Differential Equations", "FRQs", "MCQs"], AP_WHY),
  "ap-calculus-bc": testPrepProgram("ap-calculus-bc", "AP Calculus BC", "AP Calculus BC Tutoring", "Advanced AP Calculus BC support for limits, derivatives, integrals, series, and college-credit exam readiness.", ["Calculus BC", "Series", "Parametric", "Polar", "FRQ Practice"], "AP Calculus BC at MLS Classes", ["Legacy AP Calculus BC content adds series and advanced concepts to the AB foundation.", "Our tutoring builds both conceptual depth and speed for high-stakes AP performance."], ["Limits", "Derivatives", "Integrals", "Series", "Parametric Equations", "Polar Coordinates", "Vector-Valued Functions", "AP FRQs"], AP_WHY),
  "ap-statistics": testPrepProgram("ap-statistics", "AP Statistics", "AP Statistics Tutoring", "Learn data analysis, probability, sampling, inference, and AP statistical reasoning with expert support.", ["Data Analysis", "Probability", "Inference", "FRQs", "Statistical Reasoning"], "AP Statistics at MLS Classes", ["The legacy page centers on data analysis, probability, sampling, inference, full-length exams, and statistical reasoning.", "MLS Classes teaches students to interpret problems, justify methods, and communicate statistical conclusions clearly."], ["Exploring Data", "Sampling", "Experimental Design", "Probability", "Random Variables", "Confidence Intervals", "Significance Tests", "FRQs"], AP_WHY),
  "ap-physics-1-2": testPrepProgram("ap-physics-1-2", "AP Physics 1 & 2", "AP Physics 1 & 2 Tutoring", "Build physics reasoning for AP multiple-choice, free-response, experiments, graphs, and timed problem solving.", ["AP Physics", "MCQs", "FRQs", "Labs", "Timed Practice"], "AP Physics 1 & 2 at MLS Classes", ["Legacy AP Physics 1 & 2 content emphasizes exam format, MCQs, FRQs, problem-solving, strategic MCQ approach, and timed practice.", "The revamped pathway teaches concept, equation choice, graph interpretation, and written response strategy together."], ["Kinematics", "Dynamics", "Work and Energy", "Momentum", "Rotational Motion", "Electricity", "Waves", "Experimental Analysis"], AP_WHY),
  "ap-physics-c-electricity-magnetism": testPrepProgram("ap-physics-c-electricity-magnetism", "AP Physics C: Electricity and Magnetism", "AP Physics C: Electricity and Magnetism", "Calculus-based AP Physics C tutoring for electrostatics, circuits, magnetic fields, and electromagnetism.", ["Physics C", "Electricity", "Magnetism", "Calculus-Based", "FRQ Practice"], "AP Physics C: E&M at MLS Classes", ["This legacy menu route is intended to mirror the AP Physics C specialist page structure for electricity and magnetism.", "MLS Classes supports students with calculus-based concept explanations, problem sets, and AP free-response review."], ["Electrostatics", "Conductors", "Capacitors", "Electric Circuits", "Magnetic Fields", "Electromagnetism", "Gauss's Law", "FRQs"], AP_WHY),
  "ap-physics-c-mechanics": testPrepProgram("ap-physics-c-mechanics", "AP Physics C: Mechanics", "Online AP Physics C: Mechanics Tutoring | MLS Classes", "Master calculus-based mechanics with expert tutoring in motion, forces, energy, momentum, rotation, and oscillations.", ["Mechanics", "Calculus-Based", "FRQs", "Problem Solving", "Instant Feedback"], "AP Physics C: Mechanics at MLS Classes", ["Legacy content lists kinematics, Newton's laws, work, energy, momentum, rotational motion, and oscillations.", "Our tutors pair calculus skills with physics reasoning so students can handle the most demanding AP Physics C problems."], ["Kinematics", "Newton's Laws", "Work and Energy", "Momentum", "Rotational Motion", "Oscillations", "Gravitation", "FRQ Strategy"], AP_WHY),
  "ap-chemistry": testPrepProgram("ap-chemistry", "AP Chemistry", "AP Chemistry Tutoring", "AP Chemistry support for atomic structure, bonding, thermodynamics, kinetics, equilibrium, and electrochemistry.", ["Atomic Structure", "Bonding", "Equilibrium", "FRQs", "Lab Reasoning"], "AP Chemistry at MLS Classes", ["The legacy AP Chemistry route highlights atomic structure, bonding, thermodynamics, kinetics, equilibrium, and electrochemistry.", "MLS Classes helps students connect calculations, lab reasoning, and written explanations for AP success."], ["Atomic Structure", "Chemical Bonding", "Thermodynamics", "Kinetics", "Equilibrium", "Acids and Bases", "Electrochemistry", "FRQs"], AP_WHY),
  "ap-biology": testPrepProgram("ap-biology", "AP Biology", "AP Biology Tutoring", "AP Biology tutoring for cell biology, molecular genetics, evolution, ecology, and physiology.", ["Cell Biology", "Genetics", "Evolution", "Ecology", "FRQ Practice"], "AP Biology at MLS Classes", ["Legacy AP Biology content covers cell biology, molecular genetics, evolution, ecology, and physiology or anatomy.", "The revamped pathway strengthens biological reasoning, vocabulary, data analysis, and AP free-response writing."], ["Cell Biology", "Molecular Genetics", "Evolution", "Ecology", "Physiology", "Data Analysis", "Experimental Design", "FRQs"], AP_WHY),
  "ap-environmental-science": testPrepProgram("ap-environmental-science", "AP Environmental Science", "AP Environmental Science Tutoring", "Study ecosystems, biodiversity, resources, pollution, climate change, and AP environmental data analysis.", ["Ecosystems", "Biodiversity", "Pollution", "Climate", "Data Analysis"], "AP Environmental Science at MLS Classes", ["The legacy route emphasizes ecosystems, biodiversity, energy resources, pollution, climate change, and data analysis.", "MLS Classes builds content knowledge and the analytical habits needed for AP Environmental Science questions."], ["Ecosystems", "Biodiversity", "Population", "Energy Resources", "Pollution", "Climate Change", "Sustainability", "FRQs"], AP_WHY),
  "ap-computer-science-a": testPrepProgram("ap-computer-science-a", "AP Computer Science A", "AP Computer Science A Tutoring", "Learn Java programming, OOP, algorithms, data structures, and timed AP coding practice.", ["Java", "OOP", "Algorithms", "Data Structures", "Coding Practice"], "AP Computer Science A at MLS Classes", ["Legacy content lists Java programming, object-oriented programming, syntax, algorithms, data structures, and timed coding practice.", "Our tutors help students write, debug, and explain Java code for AP-style questions."], ["Java Syntax", "Classes and Objects", "Arrays", "ArrayLists", "Loops", "Methods", "Recursion", "FRQ Coding"], AP_WHY),
  "ap-english-literature-composition": testPrepProgram("ap-english-literature-composition", "AP English Literature and Composition", "AP English Literature Tutoring", "Build AP Literature skills in poetry, prose, drama, figurative language, symbolism, essay writing, and literary analysis.", ["Poetry", "Prose", "Drama", "Essays", "Literary Analysis"], "AP English Literature at MLS Classes", ["The legacy route focuses on poetry, prose, drama, figurative language, symbolism, essay writing, and literary analysis.", "MLS Classes trains students to read closely, build interpretations, and write timed essays with clarity."], ["Poetry Analysis", "Prose Analysis", "Drama", "Figurative Language", "Symbolism", "Theme", "Essay Writing", "Timed Responses"], AP_WHY),
  "ap-microeconomics": testPrepProgram("ap-microeconomics", "AP Microeconomics", "AP Microeconomics Tutoring", "AP Microeconomics tutoring for supply and demand, markets, costs, efficiency, MCQs, and FRQs.", ["Supply and Demand", "Markets", "Costs", "FRQs", "Economic Reasoning"], "AP Microeconomics at MLS Classes", ["Legacy content highlights supply and demand, market forces, production costs, economic efficiency, and FRQ/MCQ practice.", "MLS Classes helps students read graphs, explain incentives, and write concise economic reasoning."], ["Supply and Demand", "Elasticity", "Consumer Choice", "Production Costs", "Perfect Competition", "Monopoly", "Externalities", "FRQs"], AP_WHY),
  "ap-macroeconomics": testPrepProgram("ap-macroeconomics", "AP Macroeconomics", "AP Macroeconomics Tutoring", "AP Macroeconomics tutoring for indicators, GDP, inflation, unemployment, fiscal policy, monetary policy, and global markets.", ["GDP", "Inflation", "Unemployment", "Policy", "Global Markets"], "AP Macroeconomics at MLS Classes", ["Legacy AP Macroeconomics content covers supply and demand, economic indicators, GDP, inflation, unemployment, fiscal and monetary policy, and global markets.", "Students learn to connect models, graphs, and policy effects for AP-style questions."], ["Economic Indicators", "GDP", "Inflation", "Unemployment", "Aggregate Demand", "Fiscal Policy", "Monetary Policy", "International Trade"], AP_WHY),
};

const ACADEMIC_EXTRA_PROGRAMS: Record<string, ProgramData> = {
  "us-curriculum": academicProgram("us-curriculum", "US Curriculum", "US Curriculum", "Experience the Best US Curriculum Tutoring with MLS Classes", "Expert US curriculum tutoring for Grades K-12 with flexible schedules, 1:1 sessions, and tailored learning plans.", "Grades K-12", "US Curriculum at MLS Classes", ["The legacy US Curriculum page covers core American school subjects from elementary through high school.", "MLS Classes supports foundational learning, grade-level confidence, and future readiness through personalized online tutoring."], ["English Language Arts", "Mathematics", "Science", "Coding", "Elementary School", "Middle School", "High School"], [feature("Classroom Training", "Interactive online sessions replicate the clarity and accountability of classroom learning."), feature("Unit-Wise Tests", "Students complete module checks to confirm mastery before moving forward."), feature("Mentor Support", "Tutors guide academic habits, revision plans, and confidence building." )], [moduleGroup("Core Subjects", ["English Language Arts", "Mathematics", "Science", "Coding"]), moduleGroup("Grade Bands", ["Elementary", "Middle School", "High School"])]),
  "elementary-school": academicProgram("elementary-school", "Elementary School", "US Curriculum", "Expert Elementary School Tutoring Services With MLS Classes", "Personalized elementary tutoring in math, reading, writing, science, and English.", "Grades K-5", "Elementary School Tutoring", ["Legacy elementary content emphasizes confidence, independent work habits, and strong foundations in core subjects.", "MLS Classes makes early learning engaging with one-on-one support adapted to each child."], ["Arithmetic Operations", "Geometry and Spatial Reasoning", "Number Theory", "Magnetism", "Food Web", "Metric System", "Weather", "Phases of Matter", "Syntax", "Punctuation", "Inference", "Paragraph Writing"], [feature("Customized Learning Plans", "Lessons match the child's grade, pace, strengths, and learning gaps."), feature("Interactive Lessons", "Young learners stay engaged with guided practice and clear explanations."), feature("Confidence Building", "Students practice until they can work independently and explain their thinking." )], [moduleGroup("Math", ["Arithmetic", "Geometry", "Number theory", "Early algebra"]), moduleGroup("Science", ["Magnetism", "Food web", "Metric system", "Weather", "Matter"]), moduleGroup("English", ["Syntax", "Punctuation", "Inference", "Paragraph writing"])]),
  "middle-school": academicProgram("middle-school", "Middle School", "US Curriculum", "Expert Middle School Tutoring Services with MLS Classes", "Personalized middle-school tutoring in math, reading, science, and future-ready skills.", "Grades 6-8", "Middle School Tutoring", ["The legacy middle-school page covers Math, Science, English, history, geography, and coding while emphasizing confidence and readiness for high school.", "MLS Classes helps students handle the academic transition with structured practice and continuous feedback."], ["Algebra", "Geometry", "Statistics and Probability", "Physics", "Chemistry", "Biology", "Earth Science", "Creative Writing", "Reading Comprehension", "Grammar", "Composition"], [feature("Engaging Teaching", "Lessons are interactive, direct, and adapted to middle-school attention and confidence needs."), feature("Progress Tracking", "Families see what improved and what needs review after each learning cycle."), feature("Essential Skills", "Students build study routines, problem-solving habits, and communication skills." )], [moduleGroup("Math", ["Algebra", "Geometry", "Statistics", "Probability"]), moduleGroup("Science", ["Physics", "Chemistry", "Biology", "Earth science"]), moduleGroup("English", ["Creative writing", "Comprehension", "Grammar", "Composition"])]),
  "high-school": academicProgram("high-school", "High School", "US Curriculum", "Expert High School Tutoring Services with MLS Classes", "Personalized online courses and SAT-ready academic support for students in grades 9-12.", "Grades 9-12", "High School Tutoring", ["Legacy high-school content combines core subject tutoring with college-readiness support.", "MLS Classes helps students master advanced topics, strengthen critical skills, and prepare for exams with confidence."], ["Algebra", "Geometry", "Trigonometry", "Calculus", "Physics", "Chemistry", "Biology", "Environmental Science", "Literature", "Grammar", "History", "Geography", "Coding"], [feature("Affordable Learning", "High-quality support is structured around clear goals and practical schedules."), feature("Expert Tutors", "Subject specialists explain advanced topics clearly and patiently."), feature("Continuous Assessment", "Regular checks keep students accountable and ready for school exams." )], [moduleGroup("Math", ["Algebra", "Geometry", "Trigonometry", "Calculus"]), moduleGroup("Science", ["Physics", "Chemistry", "Biology", "Environmental science"]), moduleGroup("Humanities and Coding", ["English", "History", "Geography", "Coding"])]),
  "uk-curriculum": academicProgram("uk-curriculum", "UK Curriculum", "UK Curriculum", "UK Curriculum Tutoring", "Online tutoring aligned to UK Key Stages and exam pathways.", "Key Stage 1-5, ages 5-18", "UK Curriculum at MLS Classes", ["The legacy UK Curriculum route organizes tutoring by Key Stage, from early foundations through GCSE and A-Level readiness.", "MLS Classes supports English, Maths, Science, Computing, and exam preparation with flexible online tutoring."], ["English", "Maths", "Science", "Computing", "GCSE Preparation", "A-Level Readiness"], [feature("Curriculum-Aligned Lessons", "Sessions map to the student's Key Stage and school expectations."), feature("Progress Tracking", "Parents receive a clear view of strengths, gaps, and next steps."), feature("Practice Tests", "Students build exam familiarity through structured assessment practice." )], [moduleGroup("Key Stages", ["Key Stage 1", "Key Stage 2", "Key Stage 3", "Key Stage 4", "Key Stage 5"])]),
  "key-stage-1": academicProgram("key-stage-1", "Key Stage 1", "UK Curriculum", "KEY STAGE 1 | 5-7 YEARS OLD", "Early literacy, numeracy, and science-awareness tutoring for young UK curriculum learners.", "Ages 5-7", "Key Stage 1 Support", ["Legacy Key Stage 1 coverage focuses on early English basics, maths foundations, and science awareness.", "MLS Classes builds confidence through gentle, interactive one-on-one lessons."], ["English Basics", "Maths Foundations", "Science Awareness", "Early Literacy", "Numeracy", "Confidence Building"], [feature("Early Literacy", "Students develop reading, vocabulary, and sentence confidence."), feature("Numeracy", "Tutors strengthen number sense through guided practice."), feature("Confidence Building", "Lessons encourage participation and independent thinking." )]),
  "key-stage-2": academicProgram("key-stage-2", "Key Stage 2", "UK Curriculum", "KEY STAGE 2 | 7-11 YEARS OLD", "Primary subject mastery and SATs-style support for UK curriculum learners.", "Ages 7-11", "Key Stage 2 Support", ["Legacy Key Stage 2 coverage includes English, Maths, Science, and skill reinforcement.", "MLS Classes helps primary students consolidate foundations before secondary school."], ["English", "Maths", "Science", "SATs-Style Support", "Skill Reinforcement", "Reading and Writing"], [feature("Primary Mastery", "Students revisit core concepts until they can apply them independently."), feature("SATs-Style Practice", "Practice questions build assessment confidence."), feature("Skill Reinforcement", "Tutors close gaps before they become secondary-school problems." )]),
  "key-stage-3": academicProgram("key-stage-3", "Key Stage 3", "UK Curriculum", "KEY STAGE 3 | 11-14 YEARS OLD", "Secondary transition tutoring in English, Maths, Science, and Computing.", "Ages 11-14", "Key Stage 3 Support", ["Legacy Key Stage 3 coverage focuses on secondary transition, concept strengthening, and progress tracking.", "MLS Classes helps students adapt to deeper subject demands and stronger independent study habits."], ["English", "Maths", "Science", "Computing", "Secondary Transition", "Progress Tracking"], [feature("Secondary Transition", "Students adjust to faster pacing and deeper subject expectations."), feature("Concept Strengthening", "Tutors rebuild weak foundations before GCSE preparation begins."), feature("Progress Tracking", "Regular feedback keeps families informed." )]),
  "key-stage-4": academicProgram("key-stage-4", "Key Stage 4", "UK Curriculum", "KEY STAGE 4 | 14-16 YEARS OLD", "Exam-focused GCSE and IGCSE tutoring for Key Stage 4 learners.", "Ages 14-16", "Key Stage 4 Support", ["Legacy Key Stage 4 coverage centers on GCSE/IGCSE English, Maths, Sciences, Humanities, past-paper work, and revision planning.", "MLS Classes teaches both subject content and exam technique."], ["GCSE English", "IGCSE English", "Maths", "Sciences", "Humanities", "Past Papers", "Revision Planning"], [feature("Exam-Focused Practice", "Students learn how marks are earned and how to avoid common errors."), feature("Past-Paper Work", "Tutors use timed questions and mark-scheme review."), feature("Revision Planning", "Clear schedules reduce stress before exams." )]),
  "key-stage-5": academicProgram("key-stage-5", "Key Stage 5", "UK Curriculum", "KEY STAGE 5 | 16-18 YEARS OLD", "Advanced subject coaching and university-readiness support for Key Stage 5 students.", "Ages 16-18", "Key Stage 5 Support", ["Legacy Key Stage 5 coverage aligns with A-Level level subjects and university readiness.", "MLS Classes supports advanced coursework, exam technique, and strong independent study."], ["A-Level Maths", "Sciences", "English", "Economics", "Business", "University Readiness", "Exam Technique"], [feature("Advanced Coaching", "Subject specialists break down demanding A-Level concepts."), feature("University Readiness", "Tutoring strengthens the academic skills needed after school."), feature("Exam Technique", "Students practice concise, mark-focused responses." )]),
  "au-curriculum": academicProgram("au-curriculum", "AU Curriculum", "AU Curriculum", "AU Curriculum Tutoring", "Australian Curriculum-aligned online tutoring for Primary, Secondary, Senior, and NAPLAN learners.", "Years 2-12 and NAPLAN", "AU Curriculum at MLS Classes", ["The legacy AU Curriculum route covers Primary Years 2-6, Secondary Years 7-10, Senior Years 11-12, and NAPLAN.", "MLS Classes supports literacy, numeracy, science, and assessment readiness with flexible online tutoring."], ["English", "Maths", "Science", "NAPLAN Literacy", "NAPLAN Numeracy", "Assessment Practice"], [feature("Australian Curriculum Aligned", "Lessons match the student's year level and curriculum expectations."), feature("1:1 Tutoring", "Students get direct explanation and practice instead of generic worksheets."), feature("Assessment Practice", "Tutors prepare students for school assessments and NAPLAN-style tasks." )], [moduleGroup("AU Pathways", ["Primary 2-6", "Secondary 7-10", "Senior 11-12", "NAPLAN"])]),
  primary: academicProgram("primary", "AU Primary 2-6", "AU Curriculum", "Primary 2-6", "Foundational literacy, numeracy, and science support for Australian primary learners.", "Years 2-6", "AU Primary Tutoring", ["Legacy AU Primary coverage focuses on English, Maths, Science, literacy, numeracy, and confidence building.", "MLS Classes helps primary students strengthen foundations with patient one-on-one tutoring."], ["English", "Maths", "Science", "Foundational Literacy", "Numeracy", "Confidence Building"], [feature("Foundational Literacy", "Reading and writing skills grow through guided practice."), feature("Numeracy", "Students develop number confidence and problem-solving habits."), feature("Confidence Building", "Tutors help young learners participate without fear of mistakes." )]),
  secondary: academicProgram("secondary", "AU Secondary 7-10", "AU Curriculum", "Secondary 7-10", "Core concept mastery and assessment readiness for Australian secondary learners.", "Years 7-10", "AU Secondary Tutoring", ["Legacy AU Secondary coverage includes English, Maths, Science, progress tracking, and assessment readiness.", "MLS Classes supports the transition into higher-level thinking and stronger school performance."], ["English", "Maths", "Science", "Core Concept Mastery", "Progress Tracking", "Assessment Readiness"], [feature("Core Mastery", "Students revisit difficult concepts until they can apply them confidently."), feature("Progress Tracking", "Families receive clear insight into improvement."), feature("Assessment Readiness", "Practice is aligned to school tests and curriculum expectations." )]),
  senior: academicProgram("senior", "AU Senior 11-12", "AU Curriculum", "Senior 11-12", "Advanced coursework support, exam preparation, and study planning for senior Australian students.", "Years 11-12", "AU Senior Tutoring", ["Legacy AU Senior coverage focuses on advanced Maths, Sciences, English, coursework support, exam preparation, and study planning.", "MLS Classes helps senior students manage pressure with structured content review and exam-focused practice."], ["Advanced Maths", "Sciences", "English", "Senior Coursework", "Exam Preparation", "Study Planning"], [feature("Senior Coursework Support", "Tutors explain advanced concepts and help students stay on track."), feature("Exam Preparation", "Timed practice and revision planning build exam confidence."), feature("Study Planning", "Students learn how to organize workload and reduce stress." )]),
  "college-math": academicProgram("college-math", "College Math", "College Courses", "College Math Tutoring", "1-on-1 support for college-level mathematics, exams, assignments, and concept clarity.", "College and undergraduate students", "College Math at MLS Classes", ["Legacy College Math coverage focuses on higher-education math support, problem solving, exam preparation, and concept clarity.", "MLS Classes tutors align sessions to the student's actual course syllabus and upcoming deadlines."], ["College Algebra", "Precalculus", "Trigonometry", "Calculus", "Statistics", "Linear Algebra", "Differential Equations"], [feature("Customized Learning", "Sessions follow the student's course, professor expectations, and exam schedule."), feature("Expert Tutors", "Advanced math tutors explain methods clearly and efficiently."), feature("Flexible Scheduling", "Students can book regular support or urgent pre-exam review." )]),
  "csharp-programming": academicProgram("csharp-programming", "C# Programming", "IT Courses", "C# Programming Tutoring", "Learn C# programming through practical 1:1 online instruction.", "Beginner to advanced", "C# Programming at MLS Classes", ["Legacy IT-course coverage emphasizes project-based learning, beginner-friendly instruction, expert tutors, and career-ready skills.", "MLS Classes teaches C# syntax, .NET basics, object-oriented programming, debugging, and projects."], ["C# Syntax", ".NET Basics", "Object-Oriented Programming", "Data Structures", "Debugging", "Projects"], [feature("Project-Based Learning", "Students write working programs instead of only reading syntax."), feature("Beginner-Friendly", "Tutors start from fundamentals and build step by step."), feature("Career-Ready Skills", "Lessons connect coding concepts to practical software work." )]),
  "cplusplus-programming": academicProgram("cplusplus-programming", "C++ Programming", "IT Courses", "C++ Programming Tutoring", "Build programming foundations and advanced C++ skills through practical tutoring.", "Beginner to advanced", "C++ Programming at MLS Classes", ["Legacy C++ coverage includes syntax, functions, OOP, pointers, memory, data structures, algorithms, and projects.", "MLS Classes helps students move from basic code to structured problem-solving."], ["C++ Syntax", "Functions", "OOP", "Pointers and Memory", "Data Structures", "Algorithms", "Projects"], [feature("Project-Based Learning", "Concepts are reinforced through working C++ programs."), feature("Debugging Support", "Students learn how to reason through errors and memory issues."), feature("Problem Solving", "Tutors build algorithmic thinking through guided challenges." )]),
  java: academicProgram("java", "Java Programming", "IT Courses", "Java Programming Tutoring", "Learn Java fundamentals, object-oriented design, data structures, and application projects.", "Beginner to advanced", "Java Programming at MLS Classes", ["Legacy Java coverage focuses on syntax, OOP, collections, exception handling, data structures, algorithms, and projects.", "MLS Classes teaches Java through direct instruction and practical coding tasks."], ["Java Syntax", "OOP", "Collections", "Exception Handling", "Data Structures", "Algorithms", "Projects"], [feature("Beginner-Friendly", "Students learn Java step by step with clear examples."), feature("Object-Oriented Thinking", "Tutors explain classes, objects, inheritance, and design patterns practically."), feature("Project Practice", "Students build programs that connect concepts into real skills." )]),
  python: academicProgram("python", "Python Programming", "IT Courses", "Python Programming Tutoring", "Learn Python with beginner-friendly, project-based online tutoring.", "Beginner to advanced", "Python Programming at MLS Classes", ["Legacy Python coverage includes syntax, control flow, functions, OOP, data structures, file handling, automation, and projects.", "MLS Classes makes Python approachable through guided coding and practical examples."], ["Python Syntax", "Control Flow", "Functions", "OOP", "Data Structures", "File Handling", "Automation", "Projects"], [feature("Beginner-Friendly", "Python lessons start with clear fundamentals and quick wins."), feature("Automation Practice", "Students learn how code can solve real tasks."), feature("Project-Based Learning", "Every concept is reinforced through practical mini-projects." )]),
};

const ALL_PROGRAMS: Record<string, ProgramData> = {
  ...BASE_PROGRAMS,
  ...TEST_PREP_EXTRA_PROGRAMS,
  ...AP_EXTRA_PROGRAMS,
  ...ACADEMIC_EXTRA_PROGRAMS,
};

export const PROGRAMS: Record<string, ProgramData> = Object.fromEntries(
  Object.entries(ALL_PROGRAMS).map(([slug, item]) => [
    slug,
    {
      enrollSteps: STANDARD_ENROLL_STEPS,
      media: {
        image: item.category === "IT Courses" ? "/features/live-class-practice-test.webp" : "/carousal.webp",
        caption: `${item.title} live online tutoring with MLS Classes`,
      },
      ...item,
    },
  ]),
) as Record<string, ProgramData>;

export function getProgram(slug: string) {
  return PROGRAMS[slug];
}
