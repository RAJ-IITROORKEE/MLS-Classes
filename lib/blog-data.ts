// Sample blog data for MVP (static content)
// Later will be replaced with dynamic content from database

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: {
    name: string;
    slug: string;
  };
  imageUrl: string;
  featured: boolean;
  readingTime: number;
  views: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
  order: number;
}

export const blogCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Exam Prep",
    slug: "exam-prep",
    description: "Tips and strategies for SAT, ACT, JEE, and other standardized tests",
    color: "#3B82F6",
    icon: "BookOpen",
    order: 1,
  },
  {
    id: "2",
    name: "Study Tips",
    slug: "study-tips",
    description: "Effective study techniques and time management strategies",
    color: "#10B981",
    icon: "Lightbulb",
    order: 2,
  },
  {
    id: "3",
    name: "Student Stories",
    slug: "student-stories",
    description: "Success stories and experiences from our students",
    color: "#F59E0B",
    icon: "Star",
    order: 3,
  },
  {
    id: "4",
    name: "College Guidance",
    slug: "college-guidance",
    description: "College selection, applications, and admission tips",
    color: "#8B5CF6",
    icon: "GraduationCap",
    order: 4,
  },
  {
    id: "5",
    name: "Academics",
    slug: "academics",
    description: "Subject-specific articles and academic insights",
    color: "#EF4444",
    icon: "BookMarked",
    order: 5,
  },
];

export const sampleBlogs: BlogPost[] = [
  {
    id: "1",
    title: "10 Essential Tips for SAT Success in 2024",
    slug: "10-essential-tips-sat-success-2024",
    excerpt:
      "Master the SAT with these proven strategies. From time management to section-specific tips, learn what top scorers do differently.",
    author: "Sarah Chen",
    category: {
      name: "Exam Prep",
      slug: "exam-prep",
    },
    content: `# 10 Essential Tips for SAT Success in 2024

The SAT is one of the most important standardized tests for college admissions. Whether you're taking it for the first time or retaking it, these proven strategies will help you achieve your best score.

## 1. Master Time Management

Time is your greatest challenge on the SAT. With only 3 hours to answer hundreds of questions, efficient time management is crucial.

- **Reading & Writing**: Allocate 2 minutes 20 seconds per passage (including questions)
- **Math**: Spend about 1 minute 20 seconds per problem
- **Practice with a timer**: Always simulate test conditions during practice

## 2. Focus on Your Weakest Areas

While consistency matters, targeted improvement in weak areas yields faster score increases.

- Take a diagnostic test to identify weak sections
- Create a personalized study plan
- Allocate more time to challenging topics

## 3. Read the Question Before the Passage

This reading strategy saves time and increases accuracy. When you know what to look for, you'll spot relevant information faster.

## 4. Use Process of Elimination

Even if you're unsure of the correct answer, eliminate obviously wrong choices. This significantly improves your odds.

## 5. Never Leave Blank Answers

Unlike previous SAT versions, there's no penalty for wrong answers. Always guess if you're unsure—you have a 25% chance on multiple choice.

## 6. Practice with Official Tests

Use only official SAT practice tests. They're the most accurate representation of the real test.

## 7. Review Your Mistakes

The most important part of studying isn't taking more tests—it's understanding why you got questions wrong.

- Create a mistake log
- Categorize errors (careless vs. conceptual)
- Focus on fixing conceptual gaps

## 8. Understand the Test Format

Know exactly what to expect:
- **Evidence-Based Reading & Writing**: 154 minutes
- **Math**: 80 minutes
- **Essay** (optional): 50 minutes

## 9. Get Adequate Sleep Before Test Day

Never underestimate the power of rest. Sleep deprivation hurts performance more than last-minute cramming helps.

## 10. Manage Test Anxiety

Anxiety is normal, but it shouldn't derail your performance:
- Use breathing techniques
- Positive visualization
- Remember: one section doesn't determine your entire score

## Final Thoughts

SAT success comes from consistent practice, strategic studying, and the right mindset. Start early, stay focused, and trust your preparation. You've got this!`,
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    featured: true,
    readingTime: 8,
    views: 2543,
    status: "PUBLISHED",
    publishedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  {
    id: "2",
    title: "The Ultimate Guide to JEE Advanced Preparation",
    slug: "ultimate-guide-jee-advanced-preparation",
    excerpt:
      "A comprehensive roadmap for JEE Advanced success. Learn the best preparation strategies, time allocation, and expert tips from top scorers.",
    author: "Rajesh Kumar",
    category: {
      name: "Exam Prep",
      slug: "exam-prep",
    },
    content: `# The Ultimate Guide to JEE Advanced Preparation

JEE Advanced is one of the most competitive exams in the world. With only the top 2,50,000 JEE Main qualifiers eligible, you need a strategic and systematic approach to succeed.

## Understanding JEE Advanced

### Exam Structure
- **Duration**: 3 hours per paper (2 papers total)
- **Total Questions**: Around 54 questions
- **Time per Question**: ~3-4 minutes
- **Difficulty Level**: Extremely high

### Syllabus Overview
- Physics: Mechanics, Thermodynamics, Electricity & Magnetism, Optics, Modern Physics
- Chemistry: Organic, Inorganic, Physical Chemistry
- Mathematics: Algebra, Trigonometry, Calculus, Coordinate Geometry

## Preparation Timeline

### 6-9 Months Before Exam
- Complete all important topics
- Build conceptual clarity
- Solve NCERT examples and problems
- Start with moderate difficulty problems

### 3-6 Months Before Exam
- Solve problems from multiple sources
- Attempt full-length mock tests
- Identify weak areas and revise
- Practice tough problem-solving

### 1-3 Months Before Exam
- Take frequent mock tests
- Review mistakes systematically
- Practice time management
- Focus on speed and accuracy

## Subject-Wise Strategy

### Physics
- Focus on conceptual understanding first
- Practice numerical problems extensively
- Use free-body diagrams for mechanics
- Pay special attention to modern physics

### Chemistry
- Memorize important reactions and mechanisms
- Practice numerical problems in physical chemistry
- Understand periodic properties
- Balance organic chemistry synthesis problems

### Mathematics
- Master formula derivations
- Practice coordinate geometry problems
- Develop strong integral and differentiation skills
- Solve variety of problems from each chapter

## Study Tips

1. **Quality over Quantity**: 2 hours of focused study beats 8 hours of distracted studying
2. **Concept First**: Never memorize; always understand the concept
3. **Practice Variety**: Don't stick to one source; try multiple
4. **Mock Tests**: Take at least 1-2 full-length mocks weekly
5. **Revision**: Regularly revisit and revise concepts

## Common Mistakes to Avoid

- Skipping NCERT thoroughly
- Solving problems without understanding concepts
- Not analyzing mock test performance
- Neglecting weak areas
- Time management issues during exams

## Final Preparation Week

- Don't study new topics
- Revise important formulas and concepts
- Take one last mock test
- Get adequate sleep and rest
- Stay confident and positive`,
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=1200&h=600&fit=crop",
    featured: true,
    readingTime: 10,
    views: 3201,
    status: "PUBLISHED",
    publishedAt: "2024-01-10T14:30:00Z",
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },

  {
    id: "3",
    title: "5 Proven Study Techniques That Actually Work",
    slug: "5-proven-study-techniques-that-work",
    excerpt:
      "Science-backed study methods that improve retention and reduce study time. Stop wasting hours and study smarter.",
    author: "Emily Rodriguez",
    category: {
      name: "Study Tips",
      slug: "study-tips",
    },
    content: `# 5 Proven Study Techniques That Actually Work

Most students study inefficiently, spending countless hours without retaining information. Here are scientifically-proven techniques that actually work.

## 1. Spaced Repetition

Reviewing material at increasing intervals maximizes long-term retention.

**How to use it:**
- Review material after 1 day
- Review again after 3 days
- Review once more after 7 days
- Final review after 2 weeks

This technique leverages the spacing effect, backed by decades of cognitive psychology research.

## 2. Active Recall

Instead of re-reading notes, test yourself on the material.

**Why it works:**
- Forces your brain to retrieve information
- Strengthens neural pathways
- Improves retention by 50-80%

**Practical application:**
- Use flashcards
- Practice tests
- Explain concepts to others
- Write from memory without looking at notes

## 3. The Feynman Technique

Explain concepts in simple language, as if teaching a 5-year-old.

**Steps:**
1. Choose a concept
2. Explain it in simple terms
3. Identify knowledge gaps
4. Simplify your explanation further

This technique reveals what you truly understand vs. what you think you understand.

## 4. Interleaving

Mix different types of problems instead of solving them in blocks.

**Example:**
- ❌ Wrong: Solve 20 algebra problems, then 20 geometry problems
- ✅ Right: Alternate between algebra and geometry problems

Interleaving improves problem-solving ability and transfer of knowledge.

## 5. Pomodoro Technique

Study in focused 25-minute intervals with short breaks.

**The formula:**
- 25 minutes focused study
- 5 minutes break
- After 4 cycles: 15-30 minute break

**Benefits:**
- Maintains focus
- Reduces mental fatigue
- Prevents procrastination
- Improves productivity`,
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=1200&h=600&fit=crop",
    featured: true,
    readingTime: 6,
    views: 5420,
    status: "PUBLISHED",
    publishedAt: "2024-01-08T09:15:00Z",
    createdAt: "2024-01-08T09:15:00Z",
    updatedAt: "2024-01-08T09:15:00Z",
  },

  {
    id: "4",
    title: "From 1500 to 1550 in 2 Months: A Student's Journey",
    slug: "from-1500-to-1550-sat-score-journey",
    excerpt:
      "Meet Aisha, who improved her SAT score by 50 points in just 2 months. Read her story and the strategies that worked.",
    author: "Aisha Patel",
    category: {
      name: "Student Stories",
      slug: "student-stories",
    },
    content: `# From 1500 to 1550: My SAT Score Journey

When I scored 1500 on my first SAT attempt, I was disappointed. My dream schools required 1550+. But instead of giving up, I created a strategic improvement plan. Here's how I improved by 50 points in just 2 months.

## The Starting Point

My diagnostic test revealed:
- **Evidence-Based Reading**: 760 (strong)
- **Math**: 740 (weak area)

Math was clearly my bottleneck. I needed to improve it by at least 30-40 points.

## Month 1: Foundation Building

**Week 1-2: Mistake Analysis**
I reviewed every single mistake from my practice tests:
- Careless errors: 45%
- Conceptual gaps: 55%

I created a spreadsheet categorizing each mistake.

**Week 3-4: Targeted Practice**
- Focused on conceptual gaps in algebra and advanced math
- Practiced problem-solving from Khan Academy
- Reviewed formulas daily

**Result**: Mock test score improved from 740 to 770 in math

## Month 2: Refinement & Strategy

**Week 5-6: Speed Training**
- Practiced harder problems with time limits
- Developed shortcuts for common problem types
- Improved accuracy in complex questions

**Week 7-8: Full Tests & Refinement**
- Took 3 full-length practice tests
- Maintained focus for 3 hours
- Fine-tuned test-day strategy

**Final mock test**: Math 800, Reading 760, Total 1560!

## Key Strategies That Worked

### 1. Consistent Daily Practice
I studied math for 1.5 hours daily without fail. Consistency beat intensity.

### 2. Problem Categorization
I grouped problems by type:
- Time-based questions
- Algebra heavy
- Word problems
- Data analysis

Knowing problem patterns helped me solve faster.

### 3. Shortcut Development
I discovered shortcuts for:
- Quadratic equations
- SAT geometry tricks
- Percentage problems

### 4. Sleep & Health
I ensured 8 hours of sleep, exercised daily, and ate well. Physical health directly impacted mental performance.

## Test Day

On test day, I was nervous but prepared. I:
- Reviewed key formulas one last time
- Did breathing exercises before the test
- Stayed calm during each section
- Managed time effectively

## Final Scores

- **Math**: 790 (50-point improvement!)
- **Reading**: 760 (maintained)
- **Total**: 1550

## Lessons Learned

1. **Targeted improvement beats general study**: Focus on weak areas
2. **Consistency matters more than intensity**: Daily practice beats weekend marathons
3. **Don't just retake tests—analyze them**: Learn from mistakes
4. **Mental health is crucial**: Rest, exercise, and stress management matter
5. **You can improve—don't give up**: A 50-point improvement is possible with the right strategy

## Message to Future Test Takers

If you're struggling with standardized tests, remember: every score can improve. It takes dedication, strategic planning, and the right mindset. Believe in yourself, work hard, and your score will follow.

All the best on your testing journey!`,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
    featured: true,
    readingTime: 9,
    views: 4156,
    status: "PUBLISHED",
    publishedAt: "2024-01-05T16:45:00Z",
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-05T16:45:00Z",
  },

  {
    id: "5",
    title: "College Major Selection: How to Choose What's Right for You",
    slug: "college-major-selection-guide",
    excerpt:
      "Choosing a college major is one of the biggest decisions you'll make. This guide helps you explore options and make the right choice.",
    author: "Michael Torres",
    category: {
      name: "College Guidance",
      slug: "college-guidance",
    },
    content: `# College Major Selection: How to Choose What's Right for You

Choosing a college major is more important than which college you attend. Yet many students feel unprepared for this decision. Here's a comprehensive guide to help you choose wisely.

## Why Your Major Matters

Your college major influences:
- Career path options
- Earning potential
- Job satisfaction
- Skill development

But it's not permanent—most students change majors, and many successful professionals work outside their field.

## Step 1: Explore Your Interests

Ask yourself:
- What subjects fascinate you?
- What problems do you want to solve?
- What activities do you lose track of time doing?
- What would you do for free?

## Step 2: Evaluate Your Skills

Assess your strengths:
- Are you analytical or creative?
- Do you prefer working with people or data?
- Are you detail-oriented or big-picture thinker?
- What comes naturally to you?

## Step 3: Research Career Outcomes

For each potential major:
- What jobs can you do after graduation?
- What's the median salary?
- What's the job outlook?
- What skills do employers seek?

Resources:
- Bureau of Labor Statistics (BLS)
- Glassdoor
- LinkedIn
- Professional association websites

## Step 4: Consider Job Market Trends

Some fields are growing; others are declining:
- **Growing**: Data Science, Cybersecurity, Environmental Science, Healthcare
- **Declining**: Print Journalism, Manufacturing Engineering
- **Stable**: Business, Education, Engineering

## Step 5: Talk to Professionals

Informational interviews reveal reality:
- Email professionals in your target field
- Ask about day-to-day work
- Ask about challenges
- Ask for advice

Most people love talking about their work!

## Step 6: Test Your Interest

Before committing:
- Take free online courses (Coursera, edX)
- Volunteer in related fields
- Intern during summer
- Talk to professors
- Take electives in the major

## Common Major Categories

### STEM (Science, Technology, Engineering, Math)
- Pros: Strong job market, good salaries
- Cons: Challenging coursework, less flexibility
- Best for: Problem solvers, detail-oriented people

### Business
- Pros: Versatile, good job market, practical
- Cons: Competitive, less specialized
- Best for: Leadership-oriented, entrepreneurial people

### Humanities
- Pros: Flexible, critical thinking, well-rounded
- Cons: Less obvious career path, lower starting salaries
- Best for: Communicators, creative thinkers

### Social Sciences
- Pros: Interesting subjects, research opportunities
- Cons: Less obvious career path
- Best for: People-oriented, curious minds

### Fine Arts
- Pros: Creative outlet, passion-driven
- Cons: Competitive field, lower starting salaries
- Best for: Artistic people, willing to hustle

## Red Flags to Avoid

- Choosing a major just for money
- Choosing based solely on parent pressure
- Not researching actual careers
- Ignoring your genuine interests
- Being afraid to change majors if unhappy

## The Bottom Line

Your college major should:
1. Align with your genuine interests
2. Match your skills and strengths
3. Lead to careers you'd enjoy
4. Have reasonable job prospects
5. Feel right when you imagine studying it daily

Remember: Your major is important, but not final. Most successful people weren't sure about their path when starting college—and that's okay!`,
    imageUrl:
      "https://images.unsplash.com/photo-1523579608736-6f3031224c94?w=1200&h=600&fit=crop",
    featured: false,
    readingTime: 7,
    views: 1234,
    status: "PUBLISHED",
    publishedAt: "2024-01-02T11:20:00Z",
    createdAt: "2024-01-02T11:20:00Z",
    updatedAt: "2024-01-02T11:20:00Z",
  },

  {
    id: "6",
    title: "Understanding Calculus: Derivatives Simplified",
    slug: "understanding-calculus-derivatives-simplified",
    excerpt:
      "Calculus intimidates many students, but derivatives don't have to be scary. Learn the fundamentals with clear explanations.",
    author: "Dr. James Wilson",
    category: {
      name: "Academics",
      slug: "academics",
    },
    content: `# Understanding Calculus: Derivatives Simplified

Calculus is often perceived as the most difficult math subject. But derivatives, the core concept of calculus, can be understood with the right approach. Let me break it down.

## What is a Derivative?

At its heart, a derivative measures how fast something is changing.

**Everyday examples:**
- Speed is the derivative of distance (how fast position changes)
- Acceleration is the derivative of speed
- Profit margin is the derivative of profit relative to production quantity

## The Derivative Represents Slope

The derivative at any point equals the slope of the tangent line at that point.

Think of it this way:
- If you're driving, your speed (derivative) tells you how steeply the distance is increasing
- If a slope is steep, the derivative is large
- If a curve is flat, the derivative is zero

## Calculating Derivatives: The Limit Definition

The formal definition uses limits:

f'(x) = lim[h→0] (f(x+h) - f(x)) / h

In English: "The derivative is how much the function changes divided by how much x changes, when that change becomes infinitesimally small."

## Common Derivative Rules

Once you understand the concept, these shortcuts make calculating derivatives quick:

### Power Rule
- d/dx(x^n) = n·x^(n-1)

### Sum Rule
- d/dx(f + g) = f' + g'

### Product Rule
- d/dx(f·g) = f'·g + f·g'

### Chain Rule
- d/dx(f(g(x))) = f'(g(x))·g'(x)

## Real-World Applications

Derivatives solve real problems:

### Business
- Find maximum profit by taking derivative of profit function
- Set derivative = 0 to find optimal production level

### Physics
- Calculate velocity (derivative of position)
- Calculate acceleration (derivative of velocity)

### Medicine
- Drug concentration derivatives help determine optimal dosing

### Engineering
- Optimize designs using derivatives
- Predict system behavior

## Tips for Mastering Derivatives

1. **Understand the concept first**: Master the intuition before memorizing rules
2. **Practice multiple examples**: Each type of function behaves differently
3. **Check your work**: Use numerical approximation to verify answers
4. **Connect to applications**: See how derivatives solve real problems
5. **Don't just memorize rules**: Understand why the rules work

## Common Mistakes

- Forgetting the chain rule
- Mixing up product and chain rules
- Not simplifying final answers
- Applying rules mechanically without understanding
- Forgetting the limit concept

## Conclusion

Derivatives measure change. Once you understand this intuition, the formulas make sense and calculation becomes mechanical. Take time to understand the concept, and calculus becomes much less intimidating!`,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
    featured: false,
    readingTime: 6,
    views: 892,
    status: "PUBLISHED",
    publishedAt: "2023-12-28T13:00:00Z",
    createdAt: "2023-12-28T13:00:00Z",
    updatedAt: "2023-12-28T13:00:00Z",
  },

  {
    id: "7",
    title: "Time Management During Exams: Beat the Clock",
    slug: "time-management-during-exams",
    excerpt:
      "Running out of time during exams? Master these time management strategies to answer more questions accurately.",
    author: "Lisa Anderson",
    category: {
      name: "Study Tips",
      slug: "study-tips",
    },
    content: `# Time Management During Exams: Beat the Clock

Time pressure is the enemy of many test-takers. You know the material but run out of time. Here's how to manage time effectively during exams.

## Know Your Enemy: Test Format & Timing

Before the test, know:
- Total time available
- Number of questions
- Time per question
- Section time limits

**Example (SAT):**
- Reading & Writing: 154 minutes, ~52 questions = 3 min/question
- Math: 80 minutes, ~58 questions = 1.4 min/question

## Pre-Test Preparation

### Understand the Test Format
- Take practice tests under timed conditions
- Find your natural pace
- Identify time-consuming question types

### Develop Speed through Practice
- Practice problems regularly
- Time yourself on practice sets
- Gradually increase speed while maintaining accuracy

## During the Test: Strategic Approach

### 1. Scan Before Diving Deep

Don't start solving immediately:
- Quickly read all questions in a section
- Identify easy vs. difficult questions
- Plan your approach

### 2. Do Easy Questions First

Maximize your score:
- Attempt easy questions first
- This builds confidence and points
- Save hard questions for when you're warmed up

### 3. Use the Skipping Strategy

- Skip questions that seem too time-consuming
- Come back to them if time permits
- Never spend more than 2-3 minutes on a single question

### 4. Develop Question-Type Shortcuts

For tests like SAT/ACT:
- Geometry has common patterns (memorize triangle properties, circle formulas)
- Word problems can use back-solving or number picking
- Reading passages have predictable structure

### 5. Check Your Watch Regularly

Divide time into sections:
- 1/3 of section time: finish 1/2 of questions
- 2/3 of section time: finish 3/4 of questions
- Full time: attempt all questions

If behind, you know you need to speed up.

## Specific Strategies by Subject

### Reading/Comprehension
- Read passage actively (don't re-read unnecessarily)
- Reference the passage for answers (don't rely on memory)
- Skip ultra-difficult passages temporarily

### Math
- Don't show all work (unless required)
- Use answer choices to guide problem-solving
- Try numbers before algebra

### Multiple Choice Exams
- Read all answer choices before deciding
- Don't overthink—your first instinct is often right
- Skip unclear questions

## What NOT to Do

- ❌ Spend 5+ minutes on one question
- ❌ Re-read passages multiple times
- ❌ Leave questions blank (always guess)
- ❌ Get caught up in perfection
- ❌ Panic if behind schedule

## Practice Exercises

### Exercise 1: Speed Drills
- Take 10 practice problems
- Double your normal pace
- You'll likely make mistakes—that's okay
- Goal: Train your brain for speed

### Exercise 2: Time Sections
- Take 3 practice tests
- Record time per question
- Identify which question types slow you down
- Practice those specific types

### Exercise 3: Mock Tests
- Take full-length tests under strict time limits
- No extra time for "just one more minute"
- Get comfortable with time pressure

## Managing Test Anxiety During Timing

When you feel rushed:
- Take deep breaths
- Remember: 80% of something beats 100% of nothing
- Focus on what you CAN control
- Move forward—don't dwell on past questions

## The Bottom Line

Time management isn't about rushing—it's about strategic pacing. Know which questions take longer, prioritize wisely, and practice under timed conditions. Speed comes with practice, not panic.`,
    imageUrl:
      "https://images.unsplash.com/photo-1434186988533-86531c853f1d?w=1200&h=600&fit=crop",
    featured: false,
    readingTime: 8,
    views: 2156,
    status: "PUBLISHED",
    publishedAt: "2023-12-25T09:30:00Z",
    createdAt: "2023-12-25T09:30:00Z",
    updatedAt: "2023-12-25T09:30:00Z",
  },

  {
    id: "8",
    title: "ACT vs SAT: Which Test Should You Take?",
    slug: "act-vs-sat-which-test",
    excerpt:
      "Confused between ACT and SAT? Compare format, difficulty, and content to choose the test that plays to your strengths.",
    author: "Dr. Patricia Wong",
    category: {
      name: "Exam Prep",
      slug: "exam-prep",
    },
    content: `# ACT vs SAT: Which Test Should You Take?

Choosing between ACT and SAT is crucial. While most colleges now accept both (and some are test-optional), picking the right test for you can lead to a higher score and less stress.

## Quick Comparison

| Feature | SAT | ACT |
|---------|-----|-----|
| Duration | 3 hours | 3 hours 35 minutes |
| Sections | 2 (Reading/Writing, Math) | 4 (English, Math, Reading, Science) |
| Science | No dedicated section | Yes, dedicated section |
| Math | Calculator + Non-calculator | All calculator-allowed |
| Essay | Optional | Optional |
| Scoring | 200-1600 | 1-36 (composite) |

## Content Differences

### SAT
- Emphasizes reading comprehension and inference
- Data interpretation from charts/graphs
- More wordplay and context clues in reading
- Math focuses on problem-solving
- Calculator-allowed vs. calculator-not-allowed sections

### ACT
- Emphasizes factual details and main ideas
- Dedicated science reasoning section (data interpretation + scientific concepts)
- More straightforward reading passages
- Math is broader but less complex (pre-calculus level)
- All math problems allow calculator

## Pacing Differences

### SAT
- **Reading/Writing**: 2 min 20 sec per passage + questions
- **Math**: 1 min 24 sec per problem
- More time per question overall

### ACT
- **English**: 45 sec per question (quick!)
- **Math**: 1 min per question
- **Reading**: 2 min 50 sec per passage + questions
- **Science**: 1 min 22 sec per question
- Faster overall pace

## Question Format Differences

### SAT
- Evidence-based questions (cite where in passage your answer comes from)
- Multiple correct approaches
- Grid-in math (fill-in answers)
- Vocabulary in context

### ACT
- Straightforward multiple choice
- One correct answer per question
- Multiple choice math
- Conventional English usage focus

## Which Test Is Right for You?

### Choose SAT if you:
- Prefer fewer sections and simpler structure
- Enjoy reading complex passages
- Like working with data/charts
- Want more time per question
- Prefer problem-solving math

### Choose ACT if you:
- Are fast test-taker (you need speed)
- Have science background/interest
- Prefer straightforward questions
- Good at detailed reading
- Comfortable with calculator-permitted math

## Test Both: Dual Testing Strategy

Consider this approach:
1. Take a practice SAT
2. Take a practice ACT
3. Compare your scores (convert to same scale)
4. Evaluate which felt more natural
5. Commit to whichever test gave better results

## Conversion Guide

Not sure how to compare? Use ACT to SAT conversion:

- ACT 28 ≈ SAT 1280
- ACT 30 ≈ SAT 1360
- ACT 32 ≈ SAT 1440
- ACT 34 ≈ SAT 1520
- ACT 36 ≈ SAT 1600

## What Colleges Prefer

**Reality check**: Almost all colleges accept both tests equally. A strong score on either test serves you well.

Some considerations:
- Top schools often see more SAT scores
- ACT is more popular in Midwest and South
- SAT is more popular on coasts
- Specific schools don't have strong preferences

## Bottom Line Strategy

1. **Take official practice tests** of both
2. **Score both fairly** (ensure similar prep level)
3. **Choose based on results**—use whichever you score higher
4. **Commit fully** to one test for preparation
5. **Aim for excellence** on your chosen test

The best test for you is the one that plays to your strengths. Don't stress over the choice—most test-takers do equally well with proper preparation on either test.`,
    imageUrl:
      "https://images.unsplash.com/photo-1456073528246-08f27fe3a174?w=1200&h=600&fit=crop",
    featured: false,
    readingTime: 9,
    views: 3421,
    status: "PUBLISHED",
    publishedAt: "2023-12-20T14:15:00Z",
    createdAt: "2023-12-20T14:15:00Z",
    updatedAt: "2023-12-20T14:15:00Z",
  },

  {
    id: "9",
    title: "Building Confidence as a Student: Mental Health Matters",
    slug: "building-student-confidence-mental-health",
    excerpt:
      "Academic success starts with mental health. Learn strategies to build confidence, manage stress, and thrive as a student.",
    author: "Dr. Karen Mitchell",
    category: {
      name: "Student Stories",
      slug: "student-stories",
    },
    content: `# Building Confidence as a Student: Mental Health Matters

Many high-achieving students struggle with confidence and mental health. Grades might look good, but internally, many feel anxious and inadequate. This ends today.

## The Confidence Crisis Among Students

Why do capable students feel inadequate?
- Perfectionism standards (nothing is ever "good enough")
- Comparison to peers (especially on social media)
- Fear of failure
- Impostor syndrome
- Constant pressure and competition

## What Confidence Actually Is

Confidence isn't:
- Arrogance or overconfidence
- Never doubting yourself
- Being the smartest person
- Always getting A's

Confidence IS:
- Believing in your ability to handle challenges
- Accepting failure as part of learning
- Being authentic and vulnerable
- Trusting your judgment

## Building Real Confidence

### 1. Track Your Achievements

Keep a "wins journal":
- Note every accomplishment (big and small)
- Review it when feeling inadequate
- Provides perspective on your capability

This simple practice rewires your brain to notice positive evidence of competence.

### 2. Practice Self-Compassion

Talk to yourself like a good friend:
- ❌ "I'm so stupid for making this mistake"
- ✅ "I made a mistake; I'm learning and I'll do better next time"

Research shows self-compassion increases resilience and performance more than self-criticism.

### 3. Embrace the Growth Mindset

Your abilities can be developed:
- Challenges are opportunities to grow
- Effort is the path to mastery
- Others' success is inspiring, not threatening
- Failure provides valuable feedback

### 4. Set Process Goals (Not Just Outcome Goals)

❌ "I must get a 1500 on the SAT"
✅ "I will study for 1 hour daily, complete 10 practice problems, and review mistakes"

Process goals:
- Are within your control
- Build confidence through consistency
- Often lead to better outcomes anyway

### 5. Develop Competence in One Area

Master something you care about:
- Get really good at one specific skill
- Use this as your confidence foundation
- This proves to yourself that mastery is possible

## Managing Academic Stress

### Time Management
- Create a realistic schedule
- Include breaks (not just studying)
- Avoid all-nighters (they hurt performance)

### Perfectionism Management
- Aim for 80%, not 100%
- Reflect: "Is this effort proportional to importance?"
- Remember: Done is better than perfect

### Social Connection
- Join study groups
- Talk to friends about stress
- Participate in activities unrelated to academics
- Remember: You're not alone in struggling

## When to Seek Help

Red flags suggesting professional support would help:
- Persistent anxiety or worry
- Difficulty concentrating despite good sleep
- Loss of interest in activities you enjoy
- Feeling hopeless or overwhelmed
- Changes in eating or sleep patterns

**Reach out to**:
- School counselor
- Therapist or psychologist
- Crisis hotline (if in crisis)

There's absolutely no shame in getting professional support. The strongest students know when to ask for help.

## Reframing Your Narrative

Notice your self-talk patterns:

| Limiting Belief | Growth Perspective |
|---|---|
| "I'm not smart enough" | "I haven't learned this yet" |
| "I always fail" | "I failed this time; let me try differently" |
| "Others are smarter" | "Others have different strengths; so do I" |
| "I'm too anxious" | "Anxiety is normal; I can handle it" |
| "Success is luck" | "Success is effort + strategy + opportunity" |

## The Confidence-Competence Cycle

1. **Effort** → You try despite fear
2. **Practice** → You get better through repetition
3. **Small Wins** → You notice progress
4. **Confidence Builds** → You feel capable
5. **Bigger Challenges** → You attempt harder things
6. Repeat

This cycle compounds over time, creating genuine confidence.

## Daily Confidence Practices

- **Morning**: Affirmation or positive intention
- **Throughout day**: Notice one thing you did well
- **Evening**: Journaling about challenges you handled
- **Weekly**: Reflect on progress and lessons learned

## Final Thought

Confidence isn't something you're born with—it's built through consistent effort, self-compassion, and evidence of your capabilities. Start small, be patient with yourself, and trust the process.

Your greatest competitor isn't other students—it's yesterday's version of yourself. Focus on being better than that, and genuine confidence will follow.`,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
    featured: false,
    readingTime: 10,
    views: 1876,
    status: "PUBLISHED",
    publishedAt: "2023-12-15T10:45:00Z",
    createdAt: "2023-12-15T10:45:00Z",
    updatedAt: "2023-12-15T10:45:00Z",
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return sampleBlogs.find((blog) => blog.slug === slug);
}

export function getFeaturedBlogs(): BlogPost[] {
  return sampleBlogs.filter((blog) => blog.featured && blog.status === "PUBLISHED");
}

export function getPublishedBlogs(): BlogPost[] {
  return sampleBlogs.filter((blog) => blog.status === "PUBLISHED");
}

export function getBlogsByCategory(categorySlug: string): BlogPost[] {
  return sampleBlogs.filter(
    (blog) => blog.category.slug === categorySlug && blog.status === "PUBLISHED"
  );
}

export function searchBlogs(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return sampleBlogs.filter(
    (blog) =>
      blog.status === "PUBLISHED" &&
      (blog.title.toLowerCase().includes(lowerQuery) ||
        blog.excerpt.toLowerCase().includes(lowerQuery) ||
        blog.category.name.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedBlogs(currentBlogId: string, limit: number = 3): BlogPost[] {
  const currentBlog = sampleBlogs.find((blog) => blog.id === currentBlogId);
  if (!currentBlog) return [];

  return sampleBlogs
    .filter(
      (blog) =>
        blog.id !== currentBlogId &&
        blog.category.slug === currentBlog.category.slug &&
        blog.status === "PUBLISHED"
    )
    .slice(0, limit);
}
