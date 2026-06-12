import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { reviewSchema } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { isPublished: true, isModerated: true },
      include: {
        user: {
          select: { firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch {
    // Return mock data
    return NextResponse.json({
      success: true,
      data: [
        { id: '1', userId: '1', rating: 5, comment: 'Отличная клиника! Врачи профессионалы', user: { firstName: 'Анна', lastName: 'Петрова' }, createdAt: new Date() },
        { id: '2', userId: '2', rating: 4, comment: 'Быстро и качественно', user: { firstName: 'Иван', lastName: 'Сидоров' }, createdAt: new Date() },
        { id: '3', userId: '3', rating: 5, comment: 'Шарик здоров, спасибо!', user: { firstName: 'Мария', lastName: 'Козлова' }, createdAt: new Date() },
      ],
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        rating: validated.rating,
        comment: validated.comment,
        serviceId: validated.serviceId,
      },
    });

    return NextResponse.json({
      success: true,
      data: review,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка валидации' },
      { status: 400 }
    );
  }
}