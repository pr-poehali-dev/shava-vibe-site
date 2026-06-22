import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const FOOD_IMG = 'https://cdn.poehali.dev/projects/0b080fae-f7ae-4739-bd77-49237a66845b/files/ca206a09-ef69-4566-8a4d-f3b0b9ee1c6a.jpg';
const VIBE_IMG = 'https://cdn.poehali.dev/projects/0b080fae-f7ae-4739-bd77-49237a66845b/files/a212d43d-b9f6-4676-b510-af50791b220e.jpg';

const NAV = [
  { id: 'about', label: 'О нас' },
  { id: 'menu', label: 'Меню' },
  { id: 'vibe', label: 'Атмосфера' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const MENU = [
  { name: 'Классика', desc: 'Курица, свежие овощи, фирменный соус', price: '290 ₽', emoji: '🌯' },
  { name: 'Острая', desc: 'Курица, халапеньо, чили-соус', price: '320 ₽', emoji: '🌶️' },
  { name: 'Сырная', desc: 'Курица, моцарелла, чеддер, соус ранч', price: '350 ₽', emoji: '🧀' },
  { name: 'Говяжья', desc: 'Сочная говядина, овощи, барбекю', price: '390 ₽', emoji: '🥩' },
  { name: 'Вегги', desc: 'Фалафель, овощи, хумус, тахини', price: '270 ₽', emoji: '🥗' },
  { name: 'Двойная', desc: 'Двойная порция мяса для голодных', price: '430 ₽', emoji: '🔥' },
];

const REVIEWS = [
  { name: 'Алексей', text: 'Лучшая шаурма в Сарове! Сочно, сытно, всегда свежо. Хожу почти каждый день.', stars: 5 },
  { name: 'Марина', text: 'Атмосфера супер, музыка топ, ребята готовят с душой. Сырная — моя любовь!', stars: 5 },
  { name: 'Дмитрий', text: 'Быстро, вкусно, по-домашнему. Цены адекватные, порции огромные.', stars: 5 },
];

const Index = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-body">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-secondary/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-4">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 text-primary font-display text-2xl font-bold tracking-wide">
            <span className="text-3xl">🌯</span> ШАВА ВАЙБ
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-secondary-foreground/90 hover:text-primary transition-colors font-medium">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('contacts')} className="hidden md:flex bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold rounded-full">
            <Icon name="Phone" size={16} /> Заказать
          </Button>
          <button className="md:hidden text-primary" onClick={() => setOpen(!open)}>
            <Icon name={open ? 'X' : 'Menu'} size={28} />
          </button>
        </div>
        {open && (
          <div className="md:hidden bg-secondary border-t border-primary/20 px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-secondary-foreground text-left font-medium">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative bg-secondary pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="container mx-auto relative grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              📍 Саров · работаем до 22:00
            </span>
            <h1 className="font-display font-bold text-secondary-foreground leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase">
              Сочная <span className="text-primary">шаурма</span> с характером
            </h1>
            <p className="mt-6 text-lg text-secondary-foreground/70 max-w-md">
              Готовим на огне, заворачиваем с любовью. Уличная еда, ради которой возвращаются.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={() => scrollTo('menu')} size="lg" className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold text-base">
                Смотреть меню <Icon name="ArrowRight" size={18} />
              </Button>
              <Button onClick={() => scrollTo('contacts')} size="lg" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-base bg-transparent">
                <Icon name="Phone" size={18} /> Позвонить
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-primary rounded-[2.5rem] rotate-6 opacity-90" />
            <img src={FOOD_IMG} alt="Шаурма Шава Вайб" className="relative rounded-[2rem] w-full h-[420px] object-cover shadow-2xl animate-float" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-primary py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 font-display text-xl font-bold uppercase text-primary-foreground">
              <span>Сочно</span>🌯<span>Свежо</span>🔥<span>Сытно</span>🌶️<span>С характером</span>🧀<span>Саров</span>🥩
              <span>Сочно</span>🌯<span>Свежо</span>🔥<span>Сытно</span>🌶️<span>С характером</span>🧀<span>Саров</span>🥩
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="container mx-auto py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-accent font-display font-semibold uppercase tracking-widest mb-3">О нас</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase leading-tight">
            Не просто шаурма — <span className="text-primary bg-secondary px-2">это вайб</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            «Шава Вайб» — это место в Сарове, где уличная еда становится событием. Мы готовим из свежих продуктов каждый день, маринуем мясо по своим рецептам и не экономим на начинке.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: '5+', t: 'видов шаурмы' },
              { n: '100%', t: 'свежие продукты' },
              { n: '22:00', t: 'работаем до' },
            ].map((s) => (
              <div key={s.t} className="bg-card rounded-2xl p-4 text-center border border-border">
                <div className="font-display font-bold text-3xl text-primary">{s.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: 'Flame', t: 'На огне', d: 'Готовим прямо при вас' },
            { icon: 'Leaf', t: 'Свежесть', d: 'Овощи каждое утро' },
            { icon: 'Heart', t: 'С душой', d: 'Любим своё дело' },
            { icon: 'Zap', t: 'Быстро', d: 'Готово за 5 минут' },
          ].map((c) => (
            <div key={c.t} className="bg-secondary text-secondary-foreground rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                <Icon name={c.icon} size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl uppercase">{c.t}</h3>
              <p className="text-secondary-foreground/60 text-sm mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary font-display font-semibold uppercase tracking-widest mb-3">Меню</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl uppercase text-secondary-foreground">Выбирай свою</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENU.map((m) => (
              <div key={m.name} className="group bg-card rounded-3xl p-6 hover:-translate-y-2 transition-transform duration-300 border-2 border-transparent hover:border-primary">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{m.emoji}</div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display font-bold text-2xl uppercase">{m.name}</h3>
                  <span className="font-display font-bold text-xl text-accent whitespace-nowrap">{m.price}</span>
                </div>
                <p className="text-muted-foreground mt-2">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vibe */}
      <section id="vibe" className="container mx-auto py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -inset-6 bg-accent rounded-[2.5rem] -rotate-6 opacity-80" />
          <img src={VIBE_IMG} alt="Атмосфера кафе" className="relative rounded-[2rem] w-full h-[420px] object-cover shadow-2xl" />
        </div>
        <div className="order-1 md:order-2">
          <p className="text-accent font-display font-semibold uppercase tracking-widest mb-3">Атмосфера</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase leading-tight">
            Заходи как <span className="text-primary bg-secondary px-2">к своим</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Тёплый свет, любимая музыка и запах свежей лепёшки. У нас можно перехватить на бегу или зависнуть с друзьями — всегда найдётся свой вайб.
          </p>
          <ul className="mt-6 space-y-3">
            {['Уютный зал и быстрая выдача', 'Музыка, под которую вкуснее', 'Wi-Fi и зарядки для гостей'].map((t) => (
              <li key={t} className="flex items-center gap-3 text-foreground">
                <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Icon name="Check" size={16} className="text-primary-foreground" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-primary py-20 md:py-28">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-secondary font-display font-semibold uppercase tracking-widest mb-3">Отзывы</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl uppercase text-primary-foreground">Что говорят гости</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card rounded-3xl p-7 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground text-lg flex-1">«{r.text}»</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-secondary text-primary font-display font-bold flex items-center justify-center">
                    {r.name[0]}
                  </span>
                  <span className="font-semibold">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="container mx-auto py-20 md:py-28">
        <div className="bg-secondary rounded-[2.5rem] p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary font-display font-semibold uppercase tracking-widest mb-3">Контакты</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase text-secondary-foreground leading-tight">
              Ждём тебя <span className="text-primary">в гости</span>
            </h2>
            <div className="mt-8 space-y-5">
              {[
                { icon: 'MapPin', t: 'Адрес', d: 'г. Саров, пр-т Музрукова 17/1' },
                { icon: 'Phone', t: 'Телефон', d: '+7 950 340 93 02' },
                { icon: 'Clock', t: 'Время работы', d: 'Ежедневно до 22:00' },
              ].map((c) => (
                <div key={c.t} className="flex items-start gap-4">
                  <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={22} className="text-primary-foreground" />
                  </span>
                  <div>
                    <div className="text-secondary-foreground/60 text-sm">{c.t}</div>
                    <div className="text-secondary-foreground font-semibold text-lg">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="tel:+79503409302">
              <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold text-base">
                <Icon name="Phone" size={18} /> Позвонить и заказать
              </Button>
            </a>
          </div>
          <div className="rounded-[2rem] overflow-hidden h-[340px] border-4 border-primary">
            <iframe
              title="Карта Шава Вайб"
              src="https://yandex.ru/map-widget/v1/?text=Саров%20проспект%20Музрукова%2017/1&z=16"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-primary/20">
        <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-primary font-display text-xl font-bold">
            <span className="text-2xl">🌯</span> ШАВА ВАЙБ
          </div>
          <p className="text-secondary-foreground/50 text-sm">© 2026 Шава Вайб · Саров · пр-т Музрукова 17/1</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;