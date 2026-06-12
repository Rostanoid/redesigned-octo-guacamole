import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Файл не найден' },
        { status: 400 }
      );
    }

    // Mock upload - return fake URL
    const fakeUrl = `https://storage.vetclinic.ru/uploads/${Date.now()}-${file.name}`;

    return NextResponse.json({
      success: true,
      data: { url: fakeUrl },
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Ошибка загрузки файла' },
      { status: 500 }
    );
  }
}