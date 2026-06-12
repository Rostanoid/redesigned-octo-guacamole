import Link from 'next/link';
import { PawPrint, Shield, Clock, Stethoscope } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 font-display">
              Заботимся о ваших питомцах с заботой и любовью
            </h1>
            <p className="text-lg text-neutral-600 mb-8 max-w-lg">
              Современная ветеринарная клиника в Москве. Профессиональная диагностика, 
              лечение, вакцинация и стерилизация животных. Доступные цены, опытные врачи.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-primary text-base px-8 py-4">
                Записаться онлайн
              </Link>
              <Link href="/services" className="btn-secondary text-base px-8 py-4">
                Наши услуги
              </Link>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-full bg-primary-200/30 blur-2xl" />
              <img
                src="/images/hero-dog.png"
                alt="Собака и ветеринар"
                className="relative z-10 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Гарантия качества', text: 'Сертифицированные врачи и оборудование' },
            { icon: Clock, title: 'Работаем 24/7', text: 'Круглосуточная приемная' },
            { icon: Stethoscope, title: 'Современное оборудование', text: 'Цифровая диагностика и лечение' },
            { icon: PawPrint, title: 'Любим животных', text: 'Индивидуальный подход к каждому пациенту' },
          ].map((item, i) => (
            <div key={i} className="card text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}