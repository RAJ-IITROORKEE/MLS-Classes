import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { generateReadingTime } from '@/lib/reading-time';
import { generateHtml } from '@/lib/tiptap-to-html';

const SEED_BLOGS = [
  {
    title: 'Getting Started with Multiple Listing Services: A Beginner\'s Guide',
    slug: 'getting-started-with-multiple-listing-services',
    excerpt: 'Learn the fundamentals of MLS platforms and how to maximize your real estate career with proper database management.',
    category: 'MLS Basics',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Getting Started with Multiple Listing Services' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Multiple Listing Services (MLS) are the backbone of the real estate industry. Whether you\'re a new agent or transitioning careers, understanding MLS is crucial for success.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'What is MLS?' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'An MLS is a database used by real estate agents to share and search property listings. It\'s essential for marketing properties, finding clients, and understanding market trends.',
            },
          ],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Access comprehensive property data' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Compare market values accurately' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Market properties to other agents' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Stay updated with market trends' }] }] },
          ],
        },
      ],
    },
  },
  {
    title: 'Advanced Search Techniques for MLS Professionals',
    slug: 'advanced-mls-search-techniques',
    excerpt: 'Master advanced MLS search filters and queries to find perfect properties and identify investment opportunities.',
    category: 'Pro Tips',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Advanced Search Techniques for MLS' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Effective MLS searching is a skill that separates top performers from average agents. Learn advanced techniques to find opportunities faster.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Filter Combinations' }],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Use multiple filters together: price range, property type, location, and days on market.' },
          ],
        },
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Pro tip: Saved searches can alert you to new listings matching your criteria immediately.' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    title: 'Understanding Market Analysis and Pricing Strategies',
    slug: 'market-analysis-pricing-strategies',
    excerpt: 'Dive deep into market analysis methods and learn data-driven pricing strategies for maximum ROI.',
    category: 'Market Trends',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Market Analysis and Pricing' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Proper market analysis is essential for competitive pricing and client confidence.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Key Metrics to Track' }],
        },
        {
          type: 'orderedList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Average days on market' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Price per square foot' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Selling price vs list price' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Market inventory levels' }] }] },
          ],
        },
      ],
    },
  },
  {
    title: 'Building Your Real Estate Brand in the Digital Age',
    slug: 'building-real-estate-brand-digital',
    excerpt: 'Create a powerful online presence and attract more clients through strategic digital marketing.',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-adf4e565db31?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Building Your Real Estate Brand' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'In today\'s digital world, having a strong brand is more important than ever for real estate professionals.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Essential Elements' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Professional website and online portfolio' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Active social media presence' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Client testimonials and reviews' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Regular blog content and updates' }] }] },
          ],
        },
      ],
    },
  },
  {
    title: 'Negotiation Skills Every Real Estate Agent Needs',
    slug: 'negotiation-skills-real-estate',
    excerpt: 'Master the art of negotiation to close more deals and ensure better outcomes for your clients.',
    category: 'Skills',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Negotiation Skills in Real Estate' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Strong negotiation skills are what separate successful agents from struggling ones. Learn proven strategies.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Key Principles' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Always prioritize your client\'s interests' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Stay informed with current market data' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Listen actively and understand the other party\'s position' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Maintain professional relationships' }] }] },
          ],
        },
      ],
    },
  },
  {
    title: 'Leveraging Technology to Streamline Your Real Estate Business',
    slug: 'technology-real-estate-business',
    excerpt: 'Discover tools and software that can automate tasks and increase your productivity.',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Technology for Real Estate Success' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Technology is revolutionizing real estate. Learn which tools can give you a competitive advantage.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Essential Tools' }],
        },
        {
          type: 'orderedList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'MLS platforms and databases' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'CRM systems for lead management' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Virtual tour software' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Digital transaction management' }] }] },
          ],
        },
      ],
    },
  },
  {
    title: 'Client Management Best Practices for Long-Term Success',
    slug: 'client-management-best-practices',
    excerpt: 'Build lasting relationships with clients through exceptional service and consistent follow-up.',
    category: 'Client Relations',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Client Management Best Practices' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Long-term success in real estate depends on building strong client relationships. Here\'s how to do it right.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Core Strategies' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Regular communication and updates' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Personalized service and attention' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Follow-up after closing' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Seek referrals and testimonials' }] }] },
          ],
        },
      ],
    },
  },
  {
    title: 'Legal Compliance and Contracts in Real Estate Transactions',
    slug: 'legal-compliance-real-estate',
    excerpt: 'Understand essential legal requirements and best practices for protecting yourself and your clients.',
    category: 'Legal',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Legal Compliance in Real Estate' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Understanding legal requirements is critical for protecting your clients and your business.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Key Areas' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Fair Housing Laws' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Contract requirements and disclosures' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Fiduciary responsibilities' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Commission agreements' }] }] },
          ],
        },
      ],
    },
  },
];

export async function POST(request: NextRequest) {
  try {
    // Check if blogs already exist
    const existingCount = await prisma.blog.count();
    if (existingCount > 0) {
      return NextResponse.json(
        { message: 'Blogs already seeded', count: existingCount },
        { status: 200 }
      );
    }

    // Get or create categories
    const categories = await Promise.all([
      prisma.blogCategory.findUnique({ where: { slug: 'mls-basics' } }).catch(() => null),
      prisma.blogCategory.findUnique({ where: { slug: 'pro-tips' } }).catch(() => null),
      prisma.blogCategory.findUnique({ where: { slug: 'market-trends' } }).catch(() => null),
      prisma.blogCategory.findUnique({ where: { slug: 'marketing' } }).catch(() => null),
      prisma.blogCategory.findUnique({ where: { slug: 'skills' } }).catch(() => null),
      prisma.blogCategory.findUnique({ where: { slug: 'technology' } }).catch(() => null),
      prisma.blogCategory.findUnique({ where: { slug: 'client-relations' } }).catch(() => null),
      prisma.blogCategory.findUnique({ where: { slug: 'legal' } }).catch(() => null),
    ]);

    const categoryMap: { [key: string]: string } = {};

    for (const seedBlog of SEED_BLOGS) {
      let category = await prisma.blogCategory.findUnique({
        where: { slug: seedBlog.category.toLowerCase().replace(/\s+/g, '-') },
      }).catch(() => null);

      if (!category) {
        category = await prisma.blogCategory.create({
          data: {
            name: seedBlog.category,
            slug: seedBlog.category.toLowerCase().replace(/\s+/g, '-'),
          },
        });
      }

      categoryMap[seedBlog.category] = category.id;
    }

    // Create blogs
    const createdBlogs = await Promise.all(
      SEED_BLOGS.map((blog, index) =>
        prisma.blog.create({
          data: {
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            contentHtml: generateHtml(blog.content),
            categoryId: categoryMap[blog.category],
            imageUrl: blog.imageUrl,
            featured: index < 3,
            status: 'PUBLISHED',
            publishedAt: new Date(Date.now() - index * 86400000), // Stagger publication dates
            readingTime: generateReadingTime(blog.content),
            author: 'MLS Classes',
          },
        })
      )
    );

    return NextResponse.json(
      {
        message: 'Successfully seeded blogs',
        count: createdBlogs.length,
        blogs: createdBlogs,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error seeding blogs:', error);
    return NextResponse.json(
      { error: 'Failed to seed blogs' },
      { status: 500 }
    );
  }
}
