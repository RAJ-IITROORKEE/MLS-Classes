import QuestionEditor from "@/components/admin/question-editor"

export const metadata = {
  title: "Mock Questions | MLS Admin",
}

export default async function AdminMockQuestionsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="flex flex-col gap-6 p-6">
      <QuestionEditor mockId={id} />
    </div>
  )
}
