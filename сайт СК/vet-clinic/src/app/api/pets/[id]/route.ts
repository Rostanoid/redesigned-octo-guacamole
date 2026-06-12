import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { petSchema } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const pet = await prisma.pet.findFirst({
      where: { id: params.id, userId: user.id },
    });

    if (!pet) {
      return NextResponse.json(
        { success: false, error: 'Питомец не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pet,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    const pet = await prisma.pet.updateMany({
      where: { id: params.id, userId: user.id },
      data: {
        ...body,
      },
    });

    if (pet.count === 0) {
      return NextResponse.json(
        { success: false, error: 'Питомец не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Информация обновлена',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Не авторизован' },
        { status: 401 }
      );
    }

    const pet = await prisma.pet.deleteMany({
      where: { id: params.id, userId: user.id },
    });

    if (pet.count === 0) {
      return NextResponse.json(
        { success: false, error: 'Питомец не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Питомец удален',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}