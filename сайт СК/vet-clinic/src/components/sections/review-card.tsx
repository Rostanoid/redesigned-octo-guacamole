import { Star } from 'lucide-react';
import { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const rating = review.rating;

  return (
    <article className="card h-full flex flex-col">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">
          {review.user.firstName[0]}{review.user.lastName[0]}
        </div>
        <div>
          <p className="font-medium text-neutral-900">
            {review.user.firstName} {review.user.lastName}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {review.comment && (
        <p className="text-neutral-600 flex-1 text-sm leading-relaxed">
          {review.comment}
        </p>
      )}

      <time className="mt-4 text-xs text-neutral-500">
        {new Date(review.createdAt).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>
    </article>
  );
}