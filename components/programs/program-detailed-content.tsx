import type { ProgramData } from "@/lib/program-data";

interface DetailTopic {
  title: string;
  body: string;
}

interface BulletGroup {
  title?: string;
  items: string[];
}

interface ImageBlock {
  src: string;
  alt: string;
  caption?: string;
}

interface LongFormSection {
  heading: string;
  body?: string[];
  image?: ImageBlock;
  topics?: DetailTopic[];
  bullets?: BulletGroup[];
}

interface ProgramDetailedContentProps {
  data: ProgramData;
}

const ACT_MATH_SECTIONS: LongFormSection[] = [
  {
    heading: "Topics Included in ACT Math",
    body: [
      "You have 60 minutes to answer all 60 questions on the ACT Math Test. There are six main types of topics in the questions:",
    ],
    image: {
      src: "https://www.mlsclasses.com/static/topics-act-math.jpeg",
      alt: "Topics included in ACT Math",
      caption: "Topics Included in ACT Math",
    },
    topics: [
      {
        title: "1. Pre-Algebra (14 Questions)",
        body: "The ACT's pre-algebra topic covers basic math concepts, including whole numbers, fractions, decimals, integers, powers, square roots, and absolute values. These topics are crucial for preparing for more advanced math sections and problem-solving skills. It also includes solving linear equations, working with ratios, percentages, multiples, factors, and interpreting data from graphs or tables.",
      },
      {
        title: "2. Elementary-Algebra (10 Questions)",
        body: "Elementary algebra on the ACT covers variables, polynomials, factoring, quadratic equations, linear inequalities, integer exponents, and square roots. These questions help students learn how to solve mathematical formulas and equations.",
      },
      {
        title: "3. Intermediate Algebra (9 Questions)",
        body: "Intermediate Algebra includes the quadratic formula, radical and rational expressions, inequalities, and absolute values. Students learn to manipulate roots and fractions, solve problems, and graph them effectively.",
      },
      {
        title: "4. Coordinate Geometry (9 Questions)",
        body: "Coordinate Geometry includes concepts and tools that help students understand and solve algebra and geometry problems, including number line graphs and graphical representations of points, lines, polynomials, circles, and curves.",
      },
      {
        title: "5. Plane Geometry (14 Questions)",
        body: "Plane Geometry covers triangles, rectangles, circles, angles, parallel and perpendicular lines. It also emphasizes logical reasoning to solve and validate geometric problems.",
      },
      {
        title: "6. Trigonometry (4 Questions)",
        body: "Trigonometry covers functions, identities, equations, expressions, and real-world periodic phenomena such as waves and oscillations. It focuses on right-triangle ratios like sine, cosine, and tangent.",
      },
    ],
  },
  {
    heading: "Required Documents For Enrollment in the ACT Exam",
    image: {
      src: "https://www.mlsclasses.com/static/documents-act.jpeg",
      alt: "Required documents for ACT exam enrollment",
      caption: "Required documents for enrollment in the ACT Exam",
    },
    bullets: [
      {
        items: [
          "A copy of your driver's license, state ID, temporary ID, or learner's permit.",
          "Along with the applicant's interests, ACT registration also needs the applicant's high school education details.",
          "Students who register for the ACT also indicate the institutions and universities to which they want to submit their results.",
          "It is a time-consuming procedure that demands careful attention to ensure all information is accurate.",
          "Applicants must input accurate information to avoid having to change their ACT exam application.",
        ],
      },
    ],
  },
  {
    heading: "How to Prepare for the ACT Math Test?",
    body: [
      "Excelling in the ACT Math Section requires a strategic approach to mastering the topics and improving problem-solving skills.",
    ],
    bullets: [
      {
        items: [
          "Understand all the Topics: The ACT Math Test consists of 60 questions to be completed in 60 minutes. Read each question carefully and make sure your answer is right.",
          "Practice Regularly: Solve as many practice questions as possible to improve accuracy and speed. Start without time practice to focus on concepts, then move to timed sessions to simulate test conditions.",
          "Time Management: Learn how to use your time well. A positive mindset and confidence in preparation can directly impact performance on test day.",
          "Take Full-Length Practice Test: Take practice tests to simulate real test conditions, build speed, analyze answers, identify mistakes, and learn from them.",
          "Seek Guidance and Use Specific Resources: Enroll in a reliable test prep program like MLS Classes and use official ACT prep materials such as practice tests and question banks.",
        ],
      },
    ],
  },
];

const ACT_ENGLISH_SECTIONS: LongFormSection[] = [
  {
    heading: "Usage/Mechanics (40 Questions)",
    bullets: [
      {
        items: [
          "Punctuation marks like commas, apostrophes, colons, dashes, question marks, and semicolons are key to clear and effective writing.",
          "Grammar and usage covers subject-verb agreement, pronoun agreement and forms, adjectives, adverbs, verb forms, modifiers, and idioms.",
          "Sentence structure includes subordinate clauses, sentence fragments, and misplaced modifiers.",
        ],
      },
    ],
  },
  {
    heading: "Rhetorical Skills in ACT (35 Questions)",
    bullets: [
      {
        items: [
          "Strategy questions check your ability to develop a topic by selecting suitable expressions that match the essay's purpose and audience.",
          "Organization questions evaluate how effectively you organize ideas, including strong opening, transitional, and closing sentences.",
          "Style questions measure word choice, imagery, sentence elements, consistent style and tone, and avoiding unclear pronouns.",
        ],
      },
    ],
  },
  {
    heading: "Format of the ACT English Test?",
    body: [
      "The ACT English section is structured to evaluate your understanding of English language conventions through a series of passages and questions.",
    ],
    image: {
      src: "https://www.mlsclasses.com/static/format-act-eng.jpg",
      alt: "Format of the ACT English Test",
      caption: "Format of the ACT English Test",
    },
    bullets: [
      {
        items: [
          "The English section includes a total of 75 multiple-choice questions.",
          "You have 45 minutes to complete this section, so manage your time wisely.",
          "The questions are based on passages, each followed by multiple-choice questions on grammar, punctuation, and rhetorical skills.",
          "Some questions focus on underlined portions for revision, while others address the passage or specific sections.",
          "The questions cover grammar, usage, punctuation, sentence structure, and rhetorical skills from high school curriculum.",
          "Understanding this format helps students prepare for ACT English and improve test-taking strategies.",
        ],
      },
    ],
  },
  {
    heading: "Best Tips for ACT English Prep for students?",
    bullets: [
      {
        items: [
          "Understanding the Format: Familiarize yourself with the structure of the test and the types of questions you will encounter.",
          "Grammar Review: Brush up on grammar rules, focusing on common errors and usage.",
          "Practice Tests: Take numerous practice tests to get comfortable with test format and timing.",
          "Identify Weaknesses: Analyze mistakes to identify areas where you need improvement.",
          "Vocabulary Enhancement: Work on expanding vocabulary to better comprehend complex passages.",
          "Rhetorical Strategies: Study different rhetorical strategies to enhance passage analysis skills.",
        ],
      },
    ],
  },
  {
    heading: "What are the benefits to Students?",
    body: [
      "Achieving a strong score on the ACT English test can have a major impact on a student's chances of getting into college.",
      "A high score shows that a student is good at language skills and can make them more attractive to colleges and universities.",
      "Doing well on the ACT English test also shows solid English knowledge, which helps students both in college and throughout their career.",
    ],
  },
];

function getSections(slug: string) {
  if (slug === "act-math") return ACT_MATH_SECTIONS;
  if (slug === "act-english") return ACT_ENGLISH_SECTIONS;
  return null;
}

export function ProgramDetailedContent({ data }: ProgramDetailedContentProps) {
  const sections = getSections(data.slug);

  if (!sections) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Live MLS Content
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Detailed {data.title} Guide
          </h2>
          <p className="mt-3 text-muted-foreground">
            Full source-page sections reformatted into the current MLS Classes design.
          </p>
        </div>

        {sections.map((section) => (
          <article
            key={section.heading}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-2xl font-bold tracking-tight">{section.heading}</h3>

            {section.body && (
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}

            {section.image && (
              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-muted/30">
                <img
                  src={section.image.src}
                  alt={section.image.alt}
                  className="h-auto w-full object-contain"
                  loading="lazy"
                />
                {section.image.caption && (
                  <figcaption className="border-t border-border px-4 py-3 text-sm font-medium text-muted-foreground">
                    {section.image.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {section.topics && (
              <div className="mt-6 space-y-5">
                {section.topics.map((topic) => (
                  <div key={topic.title} className="rounded-2xl bg-muted/30 p-5">
                    <h4 className="font-semibold text-foreground">{topic.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{topic.body}</p>
                  </div>
                ))}
              </div>
            )}

            {section.bullets && (
              <div className="mt-5 space-y-5">
                {section.bullets.map((group, index) => (
                  <div key={`${section.heading}-${index}`}>
                    {group.title && <h4 className="font-semibold">{group.title}</h4>}
                    <ul className="mt-3 space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base">
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
