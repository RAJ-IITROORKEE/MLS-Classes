import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!blog || blog.status !== 'PUBLISHED') {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } },
    });

    // Get related blogs
    const relatedBlogs = await prisma.blog.findMany({
      where: {
        categoryId: blog.categoryId,
        id: { not: blog.id },
        status: 'PUBLISHED',
      },
      take: 3,
      include: { category: true },
    });

    return NextResponse.json({
      blog,
      relatedBlogs,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}
