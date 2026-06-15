import { prisma } from '@/lib/prisma';
import BlogEditor from '../../../../components/admin/blog-editor-form';
import { requireAdminPathAccess } from '@/lib/admin-auth';

export const metadata = {
  title: 'Create Blog | Admin',
};

export default async function CreateBlogPage() {
  await requireAdminPathAccess('/admin/blogs/create');

  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BlogEditor
        categories={categories}
      />
    </div>
  );
}
