import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex flex-col h-full">
        {service.imageUrl && (
          <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.imageUrl}
              alt={service.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">{service.name}</h3>
          {service.description && (
            <p className="text-sm text-neutral-600 mb-4">{service.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {service.duration} мин
            </div>
            <span className="font-semibold text-primary-600">{service.price} ₽</span>
          </div>
        </div>
        
        <Link
          href={`/services/${service.slug}`}
          className="mt-4 inline-flex justify-center btn-secondary text-sm py-2"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}