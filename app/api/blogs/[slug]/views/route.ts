import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find and increment views
    await prisma.blog.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}
