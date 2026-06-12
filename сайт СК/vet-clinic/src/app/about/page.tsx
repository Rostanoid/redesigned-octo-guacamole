export const metadata = {
  title: 'О клинике | ВетКлиника',
  description: 'История создания, миссия и ценности нашей ветеринарной клиники',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-6 font-display">
          О нашей клинике
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Мы стремимся обеспечить высочайший уровень здоровья и благополучия ваших питомцев
        </p>
      </div>

      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              История создания
            </h2>
            <p className="text-neutral-600 mb-4">
              ВетКлиника была основана в 2010 году группой ветеринаров с многолетним опытом. 
              Наша история началась с маленькой клиники в центре Москвы, где мы стремились 
              создать место, где каждый пациент получал бы индивидуальный уход.
            </p>
            <p className="text-neutral-600 mb-4">
              За годы работы мы выросли от небольшого лечебного пункта до современного 
              центра, обслуживающего более 10 000 клиентов ежегодно. Мы постоянно внедряем 
              новые технологии и методы лечения.
            </p>
            <p className="text-neutral-600">
              Сегодня ВетКлиника — это команда из 15 ветеринаров, 8 медсестер и 
              опытной административный персонал, работающих для вас и ваших питомцев.
            </p>
          </div>
          <div className="aspect-video rounded-2xl bg-neutral-100 overflow-hidden">
            <img
              src="/images/clinic-history.jpg"
              alt="История клиники"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mb-16 bg-neutral-100 -mx-4 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Миссия и ценности
          </h2>
          <p className="text-lg text-neutral-700 mb-8">
            Мы верим, что каждый питомец заслуживает качественной медицинской помощи. 
            Наша миссия — предоставить современную ветеринарную помощь, сочетающую 
            научный подход и эмоциональную поддержку для владельцев.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="card">
              <h3 className="font-bold text-xl text-primary-600 mb-3">Профессионализм</h3>
              <p className="text-neutral-600">
                Постоянное развитие и повышение квалификации наших специалистов
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold text-xl text-primary-600 mb-3">Забота</h3>
              <p className="text-neutral-600">
                Индивидуальный подход к каждому пациенту и его семье
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold text-xl text-primary-600 mb-3">Инновации</h3>
              <p className="text-neutral-600">
                Использование передовых методов и оборудования в лечении
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Фотогалерея
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square rounded-lg bg-neutral-100 overflow-hidden">
              <img
                src={`/images/gallery-${i}.jpg`}
                alt={`Фото ${i}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Лицензии и сертификаты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            'Лицензия на ветеринарную деятельность',
            'Сертификат качества услуг',
            'Награда за профессионализм',
          ].map((license, i) => (
            <div key={i} className="card text-center">
              <div className="aspect-[3/2] rounded-lg bg-neutral-100 mb-4 flex items-center justify-center">
                <span className="text-neutral-400">Лицензия</span>
              </div>
              <p className="font-medium text-neutral-900">{license}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}