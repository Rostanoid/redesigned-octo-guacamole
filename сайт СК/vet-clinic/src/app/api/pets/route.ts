import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { petSchema } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const pets = await prisma.pet.findMany({
      where: { userId: user.id, isActive: true },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: pets,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
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
    const validated = petSchema.parse(body);

    const pet = await prisma.pet.create({
      data: {
        ...validated,
        userId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      data: pet,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ошибка валидации' },
      { status: 400 }
    );
  }
}