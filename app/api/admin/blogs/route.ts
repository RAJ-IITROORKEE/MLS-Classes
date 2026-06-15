import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { generateReadingTime } from '@/lib/reading-time';
import { generateHtml } from '@/lib/tiptap-to-html';
import { Prisma, BlogStatus } from '@prisma/client';
import { z } from 'zod';
import { assertAdminApiAccess, AuthError } from '@/lib/admin-auth';

const blogPayloadSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  excerpt: z.string().min(10),
  content: z.unknown(),
  categoryId: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  status: z.nativeEnum(BlogStatus).optional(),
});

// GET all blogs for admin
export async function GET(request: NextRequest) {
  try {
    await assertAdminApiAccess('/api/admin/blogs');

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
    const safeLimit = Number.isNaN(limit) || limit < 1 ? 10 : Math.min(limit, 50);
    const skip = (safePage - 1) * safeLimit;

    const where: Prisma.BlogWhereInput = {};

    if (status) where.status = status;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: safeLimit,
      }),
      prisma.blog.count({ where }),
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    console.error('Error fetching admin blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create blog
export async function POST(request: NextRequest) {
  try {
    await assertAdminApiAccess('/api/admin/blogs');

    const raw = await request.json();
    const data = blogPayloadSchema.parse(raw);

    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        contentHtml: generateHtml(data.content),
        categoryId: data.categoryId,
        imageUrl: data.imageUrl || null,
        featured: data.featured || false,
        status: data.status || 'DRAFT',
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        readingTime: generateReadingTime(data.content),
      },
      include: { category: true },
    });

    return NextResponse.json(blog, { status: 201 });
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

    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
