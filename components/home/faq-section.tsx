import { prisma } from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DEFAULT_FAQS = [
  {
    id: "1",
    question: "How can I access MLS Classes on the mobile app for Android or iPhone?",
    answer:
      "To access MLS Classes on your mobile device, simply install the MLS Classes app on either Android or iOS. Log in using the same email address you provided to us. This way, you can attend live classes on your phone while traveling or when a desktop isn't available. However, we recommend using a desktop for the best experience.",
  },
  {
    id: "2",
    question: "Does MLS Classes provide tutoring for Test Prep (SAT, ACT, AP, etc.)?",
    answer:
      "Yes, MLS Classes offers Test Prep tutoring for SAT, ACT, AP, AMC, and more, using a 3-step process: Diagnostic Test followed by Personalized Tutoring, and finally tips to maximize scores.",
  },
  {
    id: "3",
    question: "How are weekly classes and schedules managed at MLS Classes?",
    answer:
      "At MLS Classes, we understand that every student's availability is unique. We aim to create a mutually convenient schedule for the student and instructor. Once the schedule is set, live 1:1 Zoom classes are conducted on time. Also, recordings are available year-round, and assignments are provided via the portal and worksheets.",
  },
  {
    id: "4",
    question: "How is homework assigned to students?",
    answer:
      "Homework at MLS Classes is assigned in two ways: via our dedicated class portal or through various technologies. On the portal, we upload worksheets, questions, and discussions, enabling direct interaction. Additionally, we use platforms like IXL, DeltaMath, Quizizz, SaveMyExams, Twinkl, and CorbettMaths based on student needs.",
  },
  {
    id: "5",
    question: "Which subscription plan is best for my child to enroll in multiple subjects?",
    answer:
      "It depends on whether you're enrolling your child for multiple subjects or a single subject. For multiple subjects, we recommend a 75-hour or 100-hour subscription. For a single subject, a 25-hour or 50-hour subscription is ideal.",
  },
  {
    id: "6",
    question: "How many classes are conducted per week for each subject and class timings?",
    answer:
      "At MLS Classes, we value your convenience and recognize your busy schedule. Classes can be arranged once, twice, thrice a week, or more, depending on your preference. We are open 24/7, so regardless of your location in the world, classes can be scheduled according to student time zone and availability.",
  },
  {
    id: "7",
    question: "Can we pause classes for vacations or time off?",
    answer:
      "Absolutely! You can pause your classes anytime if you're planning a vacation or taking leave. Our subscriptions are lifetime, meaning they last until you've consumed all your hours, so you won't lose any time. All we ask is that you inform us at least a day in advance, so we can adjust your classes accordingly. And don't worry — there will be no charges during your break!",
  },
  {
    id: "8",
    question: "How Can I Pay for the Classes?",
    answer:
      "No need to worry about payments. First, explore demo classes in multiple subjects to get an idea. Then, choose a subscription (25, 50, 75, or 100 hours) for all subjects. We'll share the bank details, and you can use Xoom or Remitly for payment. Once done, send a screenshot for verification.",
  },
];

type FAQItem = { id: string; question: string; answer: string };

async function getFAQs(): Promise<FAQItem[]> {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return faqs.length > 0 ? faqs : DEFAULT_FAQS;
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function FAQSection() {
  const faqs = await getFAQs();

  return (
    <section id="faq" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know about MLS Classes tutoring.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-card px-5 shadow-sm"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
