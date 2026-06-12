import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const vets = await prisma.veterinarian.findMany({
      where: { isAvailable: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        slug: true,
        title: true,
        photoUrl: true,
        experienceYears: true,
        rating: true,
      },
      orderBy: { rating: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: vets,
    });
  } catch {
    // Return mock data
    return NextResponse.json({
      success: true,
      data: [
        { id: '1', firstName: 'Алексей', lastName: 'Смирнов', slug: 'smirnov-a', title: 'Ветеринар', experienceYears: 8, rating: 4.9 },
        { id: '2', firstName: 'Елена', lastName: 'Кузнецова', slug: 'kuznetsova-e', title: 'Дерматолог', experienceYears: 5, rating: 4.8 },
        { id: '3', firstName: 'Максим', lastName: 'Петров', slug: 'petrov-m', title: 'Хирург', experienceYears: 12, rating: 5.0 },
        { id: '4', firstName: 'Ольга', lastName: 'Волкова', slug: 'volkova-o', title: 'Терапевт', experienceYears: 7, rating: 4.7 },
      ],
    });
  }
}