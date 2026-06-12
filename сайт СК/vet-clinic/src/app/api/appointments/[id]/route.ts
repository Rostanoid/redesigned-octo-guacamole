import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    const appointment = await prisma.appointment.findFirst({
      where: { id: params.id, userId: user.id },
      include: {
        service: true,
        vet: true,
        pets: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Запись не найдена' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment,
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

    const appointment = await prisma.appointment.updateMany({
      where: { id: params.id, userId: user.id },
      data: body,
    });

    if (appointment.count === 0) {
      return NextResponse.json(
        { success: false, error: 'Запись не найдена' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Запись обновлена',
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

    const appointment = await prisma.appointment.deleteMany({
      where: { id: params.id, userId: user.id },
    });

    if (appointment.count === 0) {
      return NextResponse.json(
        { success: false, error: 'Запись не найдена' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Запись удалена',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}