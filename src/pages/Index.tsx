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

const STAFF = [
  { id: 1, name: 'Аня', role: 'Повар', emoji: '👩‍🍳' },
  { id: 2, name: 'Максим', role: 'Кассир', emoji: '👨‍💼' },
  { id: 3, name: 'Даша', role: 'Повар', emoji: '👩‍🍳' },
  { id: 4, name: 'Рома', role: 'Администратор', emoji: '👨‍💼' },
];

const MENU_CATS = [
  {
    cat: 'Шаурма', emoji: '🌯', note: 'мясо: курица / свинина · лаваш: класс. / сыр',
    items: [
      { name: 'Классик', price: 290, desc: 'Курица/свинина, капуста, фирменный соус, огурцы, помидоры, картофель фри' },
      { name: 'Грибная', price: 320, desc: 'Курица/свинина, грибы, картофель фри, помидоры, фирменный соус, грибной соус' },
      { name: 'Овощная', price: 260, desc: 'Капуста, помидоры, огурцы, фирменный соус, картошка фри, морковь по-корейски' },
      { name: 'Сырная', price: 330, desc: 'Курица/свинина, капуста, фирменный соус, помидор, картофель фри, сырный соус, сыр' },
      { name: 'Азиатская', price: 320, desc: 'Курица/свинина, капуста, помидор, морковь по-корейски, ананас, соус сладкий чили, халапеньо' },
    ],
  },
  {
    cat: 'Сэндвич', emoji: '🥪', note: '',
    items: [
      { name: 'С курицей', price: 220, desc: 'Тостер, соус чесночный, курица, айсберг, помидор, сыр' },
      { name: 'С беконом', price: 250, desc: 'Тостер, фирменный соус, соус BBQ, айсберг, бекон, помидор, лук красный, сыр' },
      { name: 'С копчёной курицей', price: 250, desc: 'Тостер, соус BBQ, соус гриль, копчёная курица, айсберг, помидор, лук красный, огурцы м-с, сыр' },
    ],
  },
  {
    cat: 'Хот-дог', emoji: '🌭', note: '',
    items: [
      { name: 'Классик', price: 170, desc: 'Булка, соус кетчуп, сосиска свиная, соус горчичный' },
      { name: 'Датский', price: 190, desc: 'Булка, соус кетчуп, огурец м-с, сосиска свиная, соус горчичный, маренный лук' },
      { name: 'Нью-Йорк', price: 230, desc: 'Булка, чесночный соус, корейская морковь, сосиска свиная, бекон, жаренный лук' },
      { name: 'Гавайский', price: 230, desc: 'Булка, помидор, соус 1000 островов, сосиска свиная, соус кисло-сладкий, ананас, айсберг' },
    ],
  },
  {
    cat: 'Ролл', emoji: '🫔', note: '',
    items: [
      { name: 'Цезарь', price: 250, desc: 'Наггетсы, айсберг, соус цезарь, помидор, сыр' },
      { name: 'Шримп', price: 280, desc: 'Креветка, айсберг, соус чесночный, соус горчичный, помидор, лук, сыр' },
      { name: 'Гриль', price: 270, desc: 'Копчёная курица, бекон, соус гриль, помидор, сыр' },
    ],
  },
  {
    cat: 'Донер', emoji: '🥙', note: 'мясо: курица / свинина',
    items: [
      { name: 'Донер', price: 290, desc: 'Курица/свинина, помидор, огурцы, корейская морковь, картошка фри, фирменный соус' },
    ],
  },
  {
    cat: 'Фритюр', emoji: '🍟', note: '',
    items: [
      { name: 'Фри 150г', price: 190, desc: '' },
      { name: 'Деревенская 150г', price: 200, desc: '' },
      { name: 'Сырные палочки 6 шт', price: 220, desc: '' },
      { name: 'Наггетсы 6 шт', price: 190, desc: '' },
      { name: 'Креветки 6 шт', price: 320, desc: '' },
    ],
  },
  {
    cat: 'Напитки', emoji: '🥤', note: '',
    items: [
      { name: 'Морс 0,5', price: 100, desc: 'Собственного производства' },
      { name: 'Burn', price: 170, desc: '' },
      { name: 'Холодный чай 0,5', price: 110, desc: 'В ассортименте' },
      { name: 'Кофе', price: 150, desc: 'В ассортименте' },
      { name: 'Лимонад «Добрый» 0,5', price: 110, desc: '' },
    ],
  },
];

const REVIEWS = [
  { name: 'Алексей', text: 'Лучшая шаурма в Сарове! Сочно, сытно, всегда свежо. Хожу почти каждый день.', stars: 5 },
  { name: 'Марина', text: 'Атмосфера супер, музыка топ, ребята готовят с душой. Сырная — моя любовь!', stars: 5 },
  { name: 'Дмитрий', text: 'Быстро, вкусно, по-домашнему. Цены адекватные, порции огромные.', stars: 5 },
  { name: 'Ольга', text: 'Брала вегги — очень вкусно! Приятно, что есть выбор без мяса.', stars: 5 },
  { name: 'Сергей', text: 'Говяжья — огонь! Мясо нежное, соус барбекю шикарный. Однозначно вернусь.', stars: 5 },
  { name: 'Анна', text: 'Заскочили после работы, накормили быстро и сытно. Чисто, уютно, по-доброму.', stars: 5 },
];

type CartItem = { name: string; price: number; qty: number; cat: string };
type Screen = 'cart' | 'tips' | 'payment' | 'receipt';
type Order = {
  id: string;
  table: number;
  items: CartItem[];
  total: number;
  tip: number;
  tipStaffName: string;
  date: string;
  status: 'active' | 'done';
};

function genOrderId() {
  return 'SV-' + Math.random().toString(36).slice(2,7).toUpperCase();
}
function genTable() {
  return Math.floor(Math.random() * 12) + 1;
}
function loadOrders(): Order[] {
  try { return JSON.parse(localStorage.getItem('sv_orders') || '[]'); } catch { return []; }
}
function saveOrder(o: Order) {
  const all = loadOrders();
  localStorage.setItem('sv_orders', JSON.stringify([o, ...all]));
}

const Index = () => {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Booking
  const [booking, setBooking] = useState(false);
  const [bookForm, setBookForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2' });
  const [bookSent, setBookSent] = useState(false);
  const handleBook = (e: React.FormEvent) => { e.preventDefault(); setBookSent(true); };

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>('cart');

  // Tips
  const [tipStaff, setTipStaff] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(0);

  // Payment
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [paying, setPaying] = useState(false);
  const [orderId] = useState(genOrderId);
  const [tableNum] = useState(genTable);

  // History
  const [historyOpen, setHistoryOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const grandTotal = totalPrice + tipAmount;

  const addToCart = (name: string, price: number, cat: string) => {
    setCart(prev => {
      const ex = prev.find(i => i.name === name);
      if (ex) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name, price, qty: 1, cat }];
    });
  };

  const changeQty = (name: string, delta: number) => {
    setCart(prev => prev
      .map(i => i.name === name ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    );
  };

  const openCart = () => { setScreen('cart'); setCartOpen(true); };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: orderId,
        table: tableNum,
        items: [...cart],
        total: grandTotal,
        tip: tipAmount,
        tipStaffName: tipStaff ? (STAFF.find(s => s.id === tipStaff)?.name || '') : '',
        date: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        status: 'active',
      };
      saveOrder(newOrder);
      setOrders(loadOrders());
      setPaying(false);
      setScreen('receipt');
    }, 2000);
  };

  const closeAll = () => {
    setCartOpen(false);
    setCart([]);
    setTipStaff(null);
    setTipAmount(0);
    setCardNum(''); setCardExp(''); setCardCvv(''); setCardName('');
    setScreen('cart');
  };

  const formatCard = (v: string) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExp = (v: string) => { const d = v.replace(/\D/g,'').slice(0,4); return d.length>2?d.slice(0,2)+'/'+d.slice(2):d; };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const now = new Date();
  const receiptDate = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

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
          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button onClick={() => setHistoryOpen(true)} className="relative flex items-center gap-2 bg-secondary-foreground/10 text-secondary-foreground px-4 py-2 rounded-full font-bold hover:bg-secondary-foreground/20 transition-colors border border-secondary-foreground/20">
                <Icon name="Receipt" size={18} />
                <span className="hidden sm:inline">Мои заказы</span>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-secondary-foreground text-secondary text-xs font-bold flex items-center justify-center">{orders.length}</span>
              </button>
            )}
            <button onClick={openCart} className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold hover:bg-accent transition-colors">
              <Icon name="ShoppingCart" size={18} />
              <span className="hidden sm:inline">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">{totalItems}</span>
              )}
            </button>
            <button className="md:hidden text-primary" onClick={() => setOpen(!open)}>
              <Icon name={open ? 'X' : 'Menu'} size={28} />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-secondary border-t border-primary/20 px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-secondary-foreground text-left font-medium">{n.label}</button>
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
            <p className="text-muted-foreground mt-2">Добавляй в корзину и оплачивай онлайн — стол забронируется автоматически</p>
          </div>

          <div ref={tabsRef} className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
            {MENU_CATS.map((c, i) => (
              <button
                key={c.cat}
                onClick={() => setActiveCat(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold uppercase whitespace-nowrap transition-all text-sm ${
                  activeCat === i ? 'bg-primary text-primary-foreground scale-105' : 'bg-card text-foreground hover:bg-primary/20'
                }`}
              >
                <span>{c.emoji}</span> {c.cat}
              </button>
            ))}
          </div>

          {MENU_CATS.map((cat, ci) => (
            <div key={cat.cat} className={ci === activeCat ? 'block' : 'hidden'}>
              {cat.note && (
                <p className="text-muted-foreground text-sm mb-6 bg-card inline-block px-4 py-1.5 rounded-full">{cat.note}</p>
              )}
              {ci === 0 && (
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5">
                    <h4 className="font-display font-bold text-lg uppercase mb-2">🔥 Допы</h4>
                    <ul className="text-sm text-foreground/80 space-y-1">
                      <li>Халапеньо / острый соус / морковь по-кор. — +40₽</li>
                      <li>Сыр 40г — +60₽ · Мясо 50г — +60₽ · Лук — бесплатно</li>
                    </ul>
                  </div>
                  <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5">
                    <h4 className="font-display font-bold text-lg uppercase mb-2">🥣 Соусы — 30г / 50г</h4>
                    <p className="text-sm text-foreground/80">Сырный · Чесночный · Кисло-сладкий · Горчичный · Кетчуп · Барбекю</p>
                  </div>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.items.map((item) => {
                  const inCart = cart.find(i => i.name === item.name);
                  return (
                    <div key={item.name} className="group bg-card rounded-3xl p-6 border-2 border-transparent hover:border-primary transition-all">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-display font-bold text-xl uppercase leading-tight">{item.name}</h3>
                        <span className="font-display font-bold text-lg text-accent whitespace-nowrap shrink-0">{item.price} ₽</span>
                      </div>
                      {item.desc && <p className="text-muted-foreground text-sm mb-4">{item.desc}</p>}
                      {inCart ? (
                        <div className="flex items-center gap-3 mt-auto">
                          <button onClick={() => changeQty(item.name, -1)} className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center font-bold transition-colors">−</button>
                          <span className="font-display font-bold text-lg w-5 text-center">{inCart.qty}</span>
                          <button onClick={() => changeQty(item.name, 1)} className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center font-bold transition-colors">+</button>
                          <span className="ml-auto text-sm text-muted-foreground">{inCart.qty * item.price} ₽</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item.name, item.price, cat.cat)}
                          className="mt-2 w-full py-2 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-bold transition-all text-sm flex items-center justify-center gap-2"
                        >
                          <Icon name="Plus" size={16} /> В корзину
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {totalItems > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
              <button onClick={openCart} className="flex items-center gap-4 bg-secondary text-secondary-foreground border-2 border-primary px-6 py-3 rounded-full shadow-2xl font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                <Icon name="ShoppingCart" size={20} />
                <span>Корзина · {totalItems} шт</span>
                <span className="bg-primary text-primary-foreground px-3 py-0.5 rounded-full">{totalPrice} ₽</span>
              </button>
            </div>
          )}
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

      {/* Tips section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <p className="text-primary font-display font-semibold uppercase tracking-widest mb-3">Чаевые</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl uppercase text-secondary-foreground">Поблагодари команду</h2>
            <p className="text-muted-foreground mt-2">Выбери сотрудника и сумму прямо в корзине при оплате</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-2xl mx-auto">
            {STAFF.map((s) => (
              <div key={s.id} className="bg-card rounded-3xl p-6 text-center border-2 border-border">
                <div className="text-5xl mb-3">{s.emoji}</div>
                <div className="font-display font-bold text-xl">{s.name}</div>
                <div className="text-muted-foreground text-sm mt-1">{s.role}</div>
              </div>
            ))}
          </div>
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
                  <span className="w-10 h-10 rounded-full bg-secondary text-primary font-display font-bold flex items-center justify-center">{r.name[0]}</span>
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
              width="100%" height="100%" frameBorder="0"
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

      {/* ===== CART MODAL ===== */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
          <div className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col animate-fade-in" onClick={e => e.stopPropagation()}>

            {/* Cart screen */}
            {screen === 'cart' && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h3 className="font-display font-bold text-2xl uppercase">🛒 Корзина</h3>
                  <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Icon name="X" size={18} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="text-5xl mb-3">🌯</div>
                      <p>Корзина пуста — добавь что-нибудь из меню!</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.name} className="flex items-center gap-4 bg-muted rounded-2xl p-4">
                        <div className="flex-1">
                          <div className="font-bold">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.price} ₽ × {item.qty}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => changeQty(item.name, -1)} className="w-7 h-7 rounded-full bg-card hover:bg-primary/20 flex items-center justify-center font-bold">−</button>
                          <span className="font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item.name, 1)} className="w-7 h-7 rounded-full bg-card hover:bg-primary/20 flex items-center justify-center font-bold">+</button>
                        </div>
                        <div className="font-display font-bold text-accent w-16 text-right">{item.price * item.qty} ₽</div>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="p-6 border-t border-border space-y-3">
                    <div className="flex justify-between font-display font-bold text-xl">
                      <span>Итого</span><span>{totalPrice} ₽</span>
                    </div>
                    <Button onClick={() => setScreen('tips')} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold">
                      Далее — чаевые <Icon name="ArrowRight" size={18} />
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Tips screen */}
            {screen === 'tips' && (
              <>
                <div className="flex items-center gap-3 p-6 border-b border-border">
                  <button onClick={() => setScreen('cart')} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Icon name="ArrowLeft" size={18} />
                  </button>
                  <h3 className="font-display font-bold text-2xl uppercase">Чаевые</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <p className="text-muted-foreground">Хочешь поблагодарить кого-то из команды?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {STAFF.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setTipStaff(tipStaff === s.id ? null : s.id)}
                        className={`rounded-2xl p-4 text-center border-2 transition-all ${tipStaff === s.id ? 'border-primary bg-primary/10' : 'border-border bg-muted hover:border-primary/50'}`}
                      >
                        <div className="text-4xl mb-2">{s.emoji}</div>
                        <div className="font-bold">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.role}</div>
                      </button>
                    ))}
                  </div>
                  {tipStaff && (
                    <div>
                      <p className="font-semibold mb-3">Сумма чаевых:</p>
                      <div className="flex gap-2">
                        {[0, 50, 100, 150, 200].map(a => (
                          <button
                            key={a}
                            onClick={() => setTipAmount(a)}
                            className={`flex-1 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${tipAmount === a ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-primary/20'}`}
                          >
                            {a === 0 ? 'Нет' : `${a}₽`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-border space-y-3">
                  <div className="flex justify-between font-display font-bold text-xl">
                    <span>Итого{tipAmount > 0 ? ' + чаевые' : ''}</span>
                    <span>{grandTotal} ₽</span>
                  </div>
                  <Button onClick={() => setScreen('payment')} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold">
                    К оплате <Icon name="CreditCard" size={18} />
                  </Button>
                </div>
              </>
            )}

            {/* Payment screen */}
            {screen === 'payment' && (
              <>
                <div className="flex items-center gap-3 p-6 border-b border-border">
                  <button onClick={() => setScreen('tips')} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Icon name="ArrowLeft" size={18} />
                  </button>
                  <h3 className="font-display font-bold text-2xl uppercase">Оплата</h3>
                  <div className="ml-auto flex gap-1 text-muted-foreground">
                    <Icon name="Lock" size={16} /><span className="text-xs">Защищено</span>
                  </div>
                </div>
                <form onSubmit={handlePay} className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4">
                    <div className="text-sm text-muted-foreground mb-1">К оплате</div>
                    <div className="font-display font-bold text-3xl text-primary">{grandTotal} ₽</div>
                    {tipAmount > 0 && tipStaff && (
                      <div className="text-xs text-muted-foreground mt-1">
                        включая {tipAmount}₽ чаевых {STAFF.find(s=>s.id===tipStaff)?.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Номер карты</label>
                    <input
                      required value={cardNum}
                      onChange={e => setCardNum(formatCard(e.target.value))}
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border font-mono tracking-widest"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Срок действия</label>
                      <input
                        required value={cardExp}
                        onChange={e => setCardExp(formatExp(e.target.value))}
                        placeholder="MM/YY"
                        className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">CVV</label>
                      <input
                        required value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,3))}
                        placeholder="•••"
                        type="password"
                        className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Имя владельца</label>
                    <input
                      required value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                      placeholder="IVAN IVANOV"
                      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border font-mono tracking-wider"
                    />
                  </div>
                  <Button type="submit" disabled={paying} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold text-base">
                    {paying ? (
                      <span className="flex items-center gap-2"><Icon name="Loader" size={18} className="animate-spin" /> Обрабатываем...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Icon name="CreditCard" size={18} /> Оплатить {grandTotal} ₽</span>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">Демо-режим · Реальное списание не происходит</p>
                </form>
              </>
            )}

            {/* Receipt screen */}
            {screen === 'receipt' && (
              <div className="flex-1 overflow-y-auto p-6 text-center">
                <div className="text-6xl mb-2">🎉</div>
                <h3 className="font-display font-bold text-3xl uppercase mb-1">Оплачено!</h3>
                <p className="text-muted-foreground mb-4">Покажи чек сотруднику при входе</p>

                {/* Table highlight */}
                <div className="bg-primary rounded-2xl p-5 mb-5 flex items-center justify-center gap-4">
                  <div>
                    <div className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-wide">Твой стол</div>
                    <div className="font-display font-bold text-6xl text-primary-foreground leading-none">№{tableNum}</div>
                  </div>
                  <div className="text-5xl">🪑</div>
                </div>

                <div className="bg-muted rounded-2xl p-5 text-left mb-4 border-2 border-dashed border-primary/40">
                  <div className="text-center font-display font-bold text-xl mb-3 uppercase">🌯 Шава Вайб</div>
                  <div className="text-xs text-muted-foreground text-center mb-4">{receiptDate} · {orderId}</div>
                  <div className="space-y-2 mb-4">
                    {cart.map(item => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span>{item.name} × {item.qty}</span>
                        <span className="font-bold">{item.price * item.qty} ₽</span>
                      </div>
                    ))}
                    {tipAmount > 0 && tipStaff && (
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Чаевые ({STAFF.find(s=>s.id===tipStaff)?.name})</span>
                        <span>{tipAmount} ₽</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-lg">
                    <span>ИТОГО</span><span>{grandTotal} ₽</span>
                  </div>
                  <div className="mt-3 text-center text-xs text-muted-foreground">г. Саров, пр-т Музрукова 17/1</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => { closeAll(); setHistoryOpen(true); }} size="lg" variant="outline" className="rounded-full font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                    <Icon name="Receipt" size={18} /> Мои заказы
                  </Button>
                  <Button onClick={closeAll} size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-bold">
                    До встречи! 👋
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setHistoryOpen(false)}>
          <div className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-display font-bold text-2xl uppercase">🧾 Мои заказы</h3>
              <button onClick={() => setHistoryOpen(false)} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-5xl mb-3">📭</div>
                  <p>Заказов пока нет</p>
                </div>
              ) : orders.map(o => (
                <div key={o.id} className="bg-muted rounded-2xl overflow-hidden border-2 border-border">
                  {/* Order header */}
                  <div className="bg-primary px-5 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-primary-foreground font-display font-bold text-lg">Стол №{o.table}</div>
                      <div className="text-primary-foreground/70 text-xs">{o.date} · {o.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-primary-foreground font-display font-bold text-xl">{o.total} ₽</div>
                      <div className="flex items-center gap-1 justify-end">
                        <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                        <span className="text-primary-foreground/80 text-xs">Оплачено</span>
                      </div>
                    </div>
                  </div>
                  {/* Items */}
                  <div className="px-5 py-4 space-y-1.5">
                    {o.items.map(item => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-foreground">{item.name} × {item.qty}</span>
                        <span className="font-bold">{item.price * item.qty} ₽</span>
                      </div>
                    ))}
                    {o.tip > 0 && o.tipStaffName && (
                      <div className="flex justify-between text-sm text-muted-foreground pt-1 border-t border-border">
                        <span>Чаевые ({o.tipStaffName})</span>
                        <span>{o.tip} ₽</span>
                      </div>
                    )}
                  </div>
                  {/* Show receipt hint */}
                  <div className="bg-primary/10 px-5 py-3 flex items-center gap-2 text-sm text-primary font-semibold">
                    <Icon name="Smartphone" size={16} />
                    Покажи этот экран сотруднику при получении
                  </div>
                </div>
              ))}
            </div>
            {orders.length > 0 && (
              <div className="p-4 border-t border-border">
                <button
                  onClick={() => { localStorage.removeItem('sv_orders'); setOrders([]); }}
                  className="w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors py-2"
                >
                  Очистить историю
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
                  <input required placeholder="Как вас зовут?" value={bookForm.name} onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                    className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Телефон</label>
                  <input required type="tel" placeholder="+7 900 000 00 00" value={bookForm.phone} onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                    className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Дата</label>
                    <input required type="date" value={bookForm.date} onChange={(e) => setBookForm({ ...bookForm, date: e.target.value })}
                      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">Время</label>
                    <select required value={bookForm.time} onChange={(e) => setBookForm({ ...bookForm, time: e.target.value })}
                      className="w-full bg-muted rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-border">
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
                      <button key={g} type="button" onClick={() => setBookForm({ ...bookForm, guests: g })}
                        className={`flex-1 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${bookForm.guests === g ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-primary/20'}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-full font-bold text-base mt-2">
                  <Icon name="CalendarCheck" size={18} /> Забронировать
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;