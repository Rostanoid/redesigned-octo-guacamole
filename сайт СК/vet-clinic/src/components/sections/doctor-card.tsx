import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Veterinarian } from '@/types';

interface DoctorCardProps {
  doctor: Veterinarian;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article className="card group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          {doctor.photoUrl ? (
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={doctor.photoUrl}
              alt={`${doctor.firstName} ${doctor.lastName}`}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-semibold text-primary-700">
              {doctor.firstName[0]}{doctor.lastName[0]}
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900">
              {doctor.firstName} {doctor.lastName}
            </h3>
            {doctor.title && (
              <p className="text-sm text-neutral-600">{doctor.title}</p>
            )}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-neutral-500">Опыт:</span>
              <Badge variant="primary">{doctor.experienceYears} лет</Badge>
              {!doctor.isAvailable && (
                <Badge variant="danger">Не доступен</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-neutral-700">График:</span>
          <p className="mt-1 text-sm text-neutral-600">
            Пн-Пт: 9:00 - 18:00
          </p>
        </div>

        <Link
          href={`/specialists/${doctor.slug}`}
          className="btn-secondary text-center text-sm py-2"
        >
          Записаться к врачу
        </Link>
      </div>
    </article>
  );
}