import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getAuthUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Информация о питомце | ВетКлиника',
};

export default async function PetDetailPage({ params }: { params: { id: string } }) {
  const user = await getAuthUser();
  if (!user) redirect('/login');

  // Mock pet data
  const pet = {
    id: params.id,
    name: 'Шарик',
    type: 'DOG',
    breed: 'Лабрадор',
    sex: 'MALE',
    dateOfBirth: '2020-03-15',
    weightKg: 25.5,
    photoUrl: '/images/pet-placeholder.jpg',
  };

  const PET_TYPE_LABELS: Record<string, string> = {
    DOG: 'Собака',
    CAT: 'Кошка',
    BIRD: 'Птица',
    RODENT: 'Грызун',
    REPTILE: 'Рептилия',
    OTHER: 'Другой',
  };

  const SEX_LABELS: Record<string, string> = {
    MALE: 'Мужской',
    FEMALE: 'Женский',
    UNKNOWN: 'Неизвестно',
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/dashboard/pets"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к списку
          </Link>

          <div className="card mb-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                {pet.photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={pet.photoUrl}
                    alt={pet.name}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary-100 text-4xl font-semibold text-primary-700">
                    {pet.name[0]}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-neutral-900 font-display mb-4">
                  {pet.name}
                </h1>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-500">Тип:</span>
                    <span className="ml-2 font-medium">{PET_TYPE_LABELS[pet.type]}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Порода:</span>
                    <span className="ml-2 font-medium">{pet.breed || '—'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Пол:</span>
                    <span className="ml-2 font-medium">{SEX_LABELS[pet.sex]}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Возраст:</span>
                    <span className="ml-2 font-medium">4 года</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Вес:</span>
                    <span className="ml-2 font-medium">{pet.weightKg} кг</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="font-semibold text-lg mb-4">Последние записи</h2>
              <p className="text-neutral-600 text-sm">30 июня - Терапевтическое осмотр</p>
            </div>

            <div className="card">
              <h2 className="font-semibold text-lg mb-4">Вакцинация</h2>
              <p className="text-neutral-600 text-sm">Бешенство - вакцинирован 15 марта 2024</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}