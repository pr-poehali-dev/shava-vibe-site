import { useState, useRef } from 'react';
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

const MENU_CATS = [
  {
    cat: 'Шаурма', emoji: '🌯', note: 'мясо: курица / свинина · лаваш: класс. / сыр',
    items: [
      { name: 'Классик', price: '290', desc: 'Курица/свинина, капуста, фирменный соус, огурцы, помидоры, картофель фри' },
      { name: 'Грибная', price: '320', desc: 'Курица/свинина, грибы, картофель фри, помидоры, фирменный соус, грибной соус' },
      { name: 'Овощная', price: '260', desc: 'Капуста, помидоры, огурцы, фирменный соус, картошка фри, морковь по-корейски' },
      { name: 'Сырная', price: '330', desc: 'Курица/свинина, капуста, фирменный соус, помидор, картофель фри, сырный соус, сыр' },
      { name: 'Азиатская', price: '320', desc: 'Курица/свинина, капуста, помидор, морковь по-корейски, ананас, соус сладкий чили, халапеньо · сырный лаваш +20₽' },
    ],
  },
  {
    cat: 'Сэндвич', emoji: '🥪', note: '',
    items: [
      { name: 'С курицей', price: '220', desc: 'Тостер, соус чесночный, курица, айсберг, помидор, сыр' },
      { name: 'С беконом', price: '250', desc: 'Тостер, фирменный соус, соус BBQ, айсберг, бекон, помидор, лук красный, сыр' },
      { name: 'С копчёной курицей', price: '250', desc: 'Тостер, соус BBQ, соус гриль, копчёная курица, айсберг, помидор, лук красный, огурцы м-с, сыр' },
    ],
  },
  {
    cat: 'Хот-дог', emoji: '🌭', note: '',
    items: [
      { name: 'Классик', price: '170', desc: 'Булка, соус кетчуп, сосиска свиная, соус горчичный' },
      { name: 'Датский', price: '190', desc: 'Булка, соус кетчуп, огурец м-с, сосиска свиная, соус горчичный, маренный лук' },
      { name: 'Нью-Йорк', price: '230', desc: 'Булка, чесночный соус, корейская морковь, сосиска свиная, бекон, жаренный лук' },
      { name: 'Гавайский', price: '230', desc: 'Булка, помидор, соус 1000 островов, сосиска свиная, соус кисло-сладкий, ананас, айсберг' },
    ],
  },
  {
    cat: 'Ролл', emoji: '🫔', note: '',
    items: [
      { name: 'Цезарь', price: '250', desc: 'Наггетсы, айсберг, соус цезарь, помидор, сыр' },
      { name: 'Шримп', price: '280', desc: 'Креветка, айсберг, соус чесночный, соус горчичный, помидор, лук, сыр' },
      { name: 'Гриль', price: '270', desc: 'Копчёная курица, бекон, соус гриль, помидор, сыр' },
    ],
  },
  {
    cat: 'Донер', emoji: '🥙', note: 'мясо: курица / свинина',
    items: [
      { name: 'Донер', price: '290', desc: 'Курица/свинина, помидор, огурцы, корейская морковь, картошка фри, фирменный соус' },
    ],
  },
  {
    cat: 'Фритюр', emoji: '🍟', note: '',
    items: [
      { name: 'Фри 150г', price: '190', desc: '' },
      { name: 'Деревенская 150г', price: '200', desc: '' },
      { name: 'Сырные палочки 6/9/12 шт', price: '220 / 310 / 380', desc: '' },
      { name: 'Наггетсы 6/9/12 шт', price: '190 / 240 / 310', desc: '' },
      { name: 'Креветки 6/9/12 шт', price: '320 / 460 / 630', desc: '' },
    ],
  },
  {
    cat: 'Напитки', emoji: '🥤', note: '',
    items: [
      { name: 'Морс собственного производства 0,5', price: '100', desc: '' },
      { name: 'Burn', price: '170', desc: '' },
      { name: 'Кол. чай в ассор. 0,5', price: '110', desc: '' },
      { name: 'Кофе в ассор.', price: '150', desc: '' },
      { name: 'Лимонад «Добрый» 0,3 / 0,5 / 1', price: '90 / 110 / 130', desc: '' },
    ],
  },
];

const REVIEWS = [
  { name: 'Алексей', text: 'Лучшая шаурма в Сарове! Сочно, сытно, всегда свежо. Хожу почти каждый день.', stars: 5 },
  { name: 'Марина', text: 'Атмосфера супер, музыка топ, ребята готовят с душой. Сырная — моя любовь!', stars: 5 },
  { name: 'Дмитрий', text: 'Быстро, вкусно, по-домашнему. Цены адекватные, порции огромные.', stars: 5 },
  { name: 'Ольга', text: 'Брала вегги с фалафелем — очень вкусно! Приятно, что есть выбор без мяса.', stars: 5 },
  { name: 'Сергей', text: 'Говяжья — огонь! Мясо нежное, соус барбекю шикарный. Однозначно вернусь.', stars: 5 },
  { name: 'Анна', text: 'Заскочили после работы, накормили быстро и сытно. Чисто, уютно, по-доброму.', stars: 5 },
];

const Index = () => {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [booking, setBooking] = useState(false);
  const [bookForm, setBookForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2' });
  const [bookSent, setBookSent] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookSent(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-body">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-secondary/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-4">
          <button onClick={() => scrollTo('hero')} className="flex items-center">
            <img src="https://cdn.poehali.dev/projects/0b080fae-f7ae-4739-bd77-49237a66845b/bucket/9eee1822-a020-470b-915a-f49786ad92c4.jpg" alt="ShavaVibe" className="h-14 w-14 object-contain mix-blend-multiply" />
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
              <Button onClick={() => setBooking(true)} size="lg" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-base bg-transparent">
                <Icon name="CalendarCheck" size={18} /> Забронировать стол
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
          <div className="text-center mb-10">
            <p className="text-primary font-display font-semibold uppercase tracking-widest mb-3">Меню</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl uppercase text-secondary-foreground">ShavaVibe Menu</h2>
          </div>

          {/* Category tabs */}
          <div ref={tabsRef} className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {MENU_CATS.map((c, i) => (
              <button
                key={c.cat}
                onClick={() => setActiveCat(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold uppercase whitespace-nowrap transition-all text-sm ${
                  activeCat === i
                    ? 'bg-primary text-primary-foreground scale-105'
                    : 'bg-card text-foreground hover:bg-primary/20'
                }`}
              >
                <span>{c.emoji}</span> {c.cat}
              </button>
            ))}
          </div>

          {/* Items */}
          {MENU_CATS.map((cat, ci) => (
            <div key={cat.cat} className={ci === activeCat ? 'block' : 'hidden'}>
              {cat.note && (
                <p className="text-muted-foreground text-sm mb-6 bg-card inline-block px-4 py-1.5 rounded-full">{cat.note}</p>
              )}

              {/* Допы для шаурмы */}
              {ci === 0 && (
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5">
                    <h4 className="font-display font-bold text-lg uppercase mb-2">🔥 Допы</h4>
                    <ul className="text-sm text-foreground/80 space-y-1">
                      <li>Халапеньо / острый соус / морковь по-кор. — +40₽</li>
                      <li>Сыр 40г — +60₽</li>
                      <li>Мясо 50г — +60₽</li>
                      <li>Лук — бесплатно</li>
                    </ul>
                  </div>
                  <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5">
                    <h4 className="font-display font-bold text-lg uppercase mb-2">🥣 Соусы — 30г / 50г</h4>
                    <p className="text-sm text-foreground/80">Сырный · Чесночный · Кисло-сладкий · Горчичный · Кетчуп · Барбекю</p>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.items.map((item) => (
                  <div key={item.name} className="group bg-card rounded-3xl p-6 hover:-translate-y-1.5 transition-transform duration-300 border-2 border-transparent hover:border-primary">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display font-bold text-xl uppercase leading-tight">{item.name}</h3>
                      <span className="font-display font-bold text-lg text-accent whitespace-nowrap shrink-0">{item.price} ₽</span>
                    </div>
                    {item.desc && <p className="text-muted-foreground text-sm">{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+79503409302">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold text-base">
                  <Icon name="Phone" size={18} /> Позвонить
                </Button>
              </a>
              <Button onClick={() => setBooking(true)} size="lg" variant="outline" className="rounded-full border-secondary-foreground/30 text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary font-bold text-base bg-transparent">
                <Icon name="CalendarCheck" size={18} /> Забронировать стол
              </Button>
            </div>
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

      {/* Booking Modal */}
      {booking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => { setBooking(false); setBookSent(false); }}>
          <div className="bg-card w-full max-w-md rounded-3xl p-8 shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-2xl uppercase">Бронирование стола</h3>
              <button onClick={() => { setBooking(false); setBookSent(false); }} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            {bookSent ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="font-display font-bold text-2xl uppercase mb-2">Заявка принята!</h4>
                <p className="text-muted-foreground">Мы перезвоним вам в ближайшее время для подтверждения.</p>
                <Button onClick={() => { setBooking(false); setBookSent(false); }} className="mt-6 bg-primary text-primary-foreground rounded-full font-bold">Отлично!</Button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Ваше имя</label>
                  <input
                    required
                    placeholder="Как вас зовут?"
                    value={bookForm.name}
                    onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                    className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary border border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Телефон</label>
                  <input
                    required
                    type="tel"
                    placeholder="+7 900 000 00 00"
                    value={bookForm.phone}
                    onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                    className="w-full bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary border border-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Дата</label>
                    <input
                      required
                      type="date"
                      value={bookForm.date}
                      onChange={(e) => setBookForm({ ...bookForm, date: e.target.value })}
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary border border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Время</label>
                    <select
                      required
                      value={bookForm.time}
                      onChange={(e) => setBookForm({ ...bookForm, time: e.target.value })}
                      className="w-full bg-muted rounded-xl px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary border border-border"
                    >
                      <option value="">— выбрать —</option>
                      {['11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Количество гостей</label>
                  <div className="flex gap-2">
                    {['1','2','3','4','5','6+'].map(g => (
                      <button
                        key={g} type="button"
                        onClick={() => setBookForm({ ...bookForm, guests: g })}
                        className={`flex-1 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${bookForm.guests === g ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-primary/20'}`}
                      >{g}</button>
                    ))}
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold text-base mt-2">
                  <Icon name="CalendarCheck" size={18} /> Забронировать
                </Button>
                <p className="text-center text-xs text-muted-foreground">Мы свяжемся с вами для подтверждения</p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-secondary border-t border-primary/20">
        <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/projects/0b080fae-f7ae-4739-bd77-49237a66845b/bucket/9eee1822-a020-470b-915a-f49786ad92c4.jpg" alt="ShavaVibe" className="h-10 w-10 object-contain mix-blend-multiply" />
            <span className="text-secondary-foreground/70 font-display font-bold text-lg uppercase">ShavaVibe</span>
          </div>
          <p className="text-secondary-foreground/50 text-sm">© 2026 Шава Вайб · Саров · пр-т Музрукова 17/1</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;