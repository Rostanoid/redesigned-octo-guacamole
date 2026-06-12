import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

async function getBlogPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blog`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Блог | ВетКлиника',
  description: 'Полезные статьи о здоровье, уходе и лечении домашних животных',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const defaultPosts = [
    {
      id: '1',
      title: 'Как правильно кормить щенка младше 6 месяцев',
      excerpt: 'Подбор правильного корма для маленьких щенков требует знания особенностей роста и развития.',
      coverImage: '/images/blog-1.jpg',
      publishedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Признаки стресса у кошек: что нужно знать владельцу',
      excerpt: 'Кошки очень чувствительны к изменениям в окружающей среде. Узнайте, как распознать стресс.',
      coverImage: '/images/blog-2.jpg',
      publishedAt: new Date('2024-01-10'),
    },
    {
      id: '3',
      title: 'Чек-лист полной вакцинации: от щенка до пожилого пса',
      excerpt: 'Вакцинация — важная профилактика. Мы рассказываем, какие прививки нужны вашему питомцу.',
      coverImage: '/images/blog-3.jpg',
      publishedAt: new Date('2024-01-05'),
    },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4 font-display">
          Блог о здоровье животных
        </h1>
        <p className="text-lg text-neutral-600">
          Полезные статьи, советы и рекомендации от наших ветеринаров
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post: any) => (
          <article key={post.id} className="card h-full flex flex-col">
            <div className="aspect-video rounded-lg bg-neutral-100 mb-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage || '/images/placeholder.jpg'}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-neutral-900 mb-2">
                <Link href={`/blog/${post.slug || post.id}`} className="hover:text-primary-600">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="text-neutral-600 text-sm mb-4">{post.excerpt}</p>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-neutral-500 mt-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString('ru-RU')}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                ВетКлиника
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}