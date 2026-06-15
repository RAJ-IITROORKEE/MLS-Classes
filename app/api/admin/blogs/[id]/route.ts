import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { generateReadingTime } from '@/lib/reading-time';
import { generateHtml } from '@/lib/tiptap-to-html';
import { BlogStatus, Prisma } from '@prisma/client';
import { z } from 'zod';
import { assertAdminApiAccess, AuthError } from '@/lib/admin-auth';

const updateBlogPayloadSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  excerpt: z.string().min(10),
  content: z.unknown(),
  categoryId: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  status: z.nativeEnum(BlogStatus),
});

// PATCH update blog
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdminApiAccess('/api/admin/blogs');

    const { id } = await params;
    const raw = await request.json();
    const data = updateBlogPayloadSchema.parse(raw);

    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        contentHtml: generateHtml(data.content),
        categoryId: data.categoryId,
        imageUrl: data.imageUrl || null,
        featured: data.featured,
        status: data.status,
        publishedAt:
          data.status === 'PUBLISHED'
            ? existingBlog.publishedAt || new Date()
            : existingBlog.publishedAt,
        readingTime: generateReadingTime(data.content),
      },
      include: { category: true },
    });

    return NextResponse.json(blog);
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid blog payload', details: error.flatten() },
        { status: 400 }
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      );
    }

    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE blog (hard delete)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdminApiAccess('/api/admin/blogs');

    const { id } = await params;

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
