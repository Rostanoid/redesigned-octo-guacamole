import Link from 'next/link';
import { Plus, PawPrint } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getAuthUser } from '@/lib/auth';
import { Pet } from '@/types';
import { redirect } from 'next/navigation';

async function getPets() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/pets`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

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

export const metadata = {
  title: 'Мои питомцы | ВетКлиника',
};

export default async function PetsPage() {
  const user = await getAuthUser();
  if (!user) redirect('/login');

  const pets = await getPets();

  return (
    <div className="flex min-h-screen bg-neutral-50 lg:bg-white">
      <main className="flex-1 lg:pl-8">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 font-display">
                Мои питомцы
              </h1>
              <p className="text-neutral-600 mt-2">
                Управляйте информацией о ваших животных
              </p>
            </div>
            <Link
              href="/dashboard/pets/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Добавить питомца
            </Link>
          </div>

          {pets.length > 0 ? (
            <div className="card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Питомец</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Пол</TableHead>
                    <TableHead>Возраст</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pets.map((pet: Pet) => (
                    <TableRow key={pet.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {pet.photoUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={pet.photoUrl}
                              alt={pet.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                              <PawPrint className="h-5 w-5" />
                            </div>
                          )}
                          <span className="font-medium">{pet.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{PET_TYPE_LABELS[pet.type]}</TableCell>
                      <TableCell>{SEX_LABELS[pet.sex]}</TableCell>
                      <TableCell>
                        {pet.dateOfBirth
                          ? Math.floor((new Date().getTime() - new Date(pet.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) + ' лет'
                          : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={pet.isActive ? 'success' : 'danger'}>
                          {pet.isActive ? 'Активен' : 'Неактивен'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/dashboard/pets/${pet.id}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Подробнее
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="card text-center py-12">
              <PawPrint className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Пока нет питомцев
              </h2>
              <p className="text-neutral-600 mb-6">
                Добавьте информацию о ваших животных, чтобы быстро записываться на прием
              </p>
              <Link href="/dashboard/pets/new" className="btn-primary inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Добавить питомца
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}