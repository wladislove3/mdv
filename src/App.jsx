import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  Building2,
  Calculator,
  ClipboardCheck,
  Camera,
  Hammer,
  Home,
  Layers3,
  MapPin,
  MessageCircle,
  PenTool,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import {
  assets,
  contacts,
  countertopOptions,
  faq,
  legal,
  frontOptions,
  layoutOptions,
  navItems,
  process,
  proof,
  projects,
  trustItems,
} from './data/content.js';

const KitchenScene = lazy(() => import('./components/KitchenScene.jsx'));
const rub = new Intl.NumberFormat('ru-RU');

const roundTo = (value, step) => Math.round(value / step) * step;
const makeWhatsAppLink = (message) => `${contacts.whatsappBase}?text=${encodeURIComponent(message)}`;

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Мебель для Вас">
        <span className="brand-mark">М</span>
        <span>
          <strong>Мебель для Вас</strong>
          <small>Калининград</small>
        </span>
      </a>
      <nav className="nav-links" aria-label="Навигация">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-call" href={contacts.nataliaTel}>
        <Phone size={18} />
        <span>{contacts.natalia}</span>
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-media" src={assets.heroImage} alt="" />
      <div className="hero-edge" />
      <div className="hero-content" data-reveal>
        <p className="hero-city">Кухни на заказ в Калининграде</p>
        <h1>Мебель для Вас</h1>
        <p className="hero-lead">
          Наташа проектирует кухню под ваш быт, Александр лично собирает и доводит посадку до аккуратного результата.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#calculator">
            <Calculator size={19} />
            Рассчитать кухню
          </a>
          <a className="btn btn-ghost" href={contacts.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle size={19} />
            Написать Наташе
          </a>
        </div>
        <div className="hero-proof" aria-label="Ключевые факты">
          {proof.map((item) => (
            <div key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const icons = [Ruler, ShieldCheck, Layers3, Hammer];

  return (
    <section className="trust-bar" aria-label="Почему доверяют">
      <div className="container trust-grid">
        {trustItems.map((item, index) => {
          const Icon = icons[index];
          return (
            <div className="trust-item" key={item} data-reveal>
              <Icon size={22} />
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Works() {
  return (
    <section className="section works" id="works">
      <div className="container section-intro" data-reveal>
        <p className="section-kicker">Реальные работы</p>
        <h2>Сначала смотрят посадку, потом фасады.</h2>
        <p>
          В галерее - свежие фото из открытого Instagram-профиля: кухни в потолок, подсветка, встроенная техника и
          корпусная мебель для всей квартиры. Это не абстрактные рендеры, а реальные установки.
        </p>
      </div>

      <div className="container works-proof" aria-label="Архив кухонных работ" data-reveal>
        <div className="works-proof-lead">
          <strong>Instagram-архив работ</strong>
          <span>
            Отобраны лучшие публичные кадры 2025-2026: без каталожного глянца, зато с реальными углами, посадкой и
            светом в готовых квартирах.
          </span>
          <a className="inline-proof-link" href={contacts.instagram} target="_blank" rel="noreferrer">
            Смотреть Instagram
          </a>
        </div>
        <div className="work-cards">
          {projects.map((project, index) => (
            <article className={index === 0 ? 'work-card wide' : 'work-card'} key={`${project.title}-${index}`}>
              <img src={project.src} alt={project.title} loading="lazy" />
              <div>
                <strong>{project.title}</strong>
                <span>{project.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section team" id="team">
      <div className="container team-grid">
        <div className="team-copy" data-reveal>
          <p className="section-kicker">Саша и Наташа</p>
          <h2>Не потоковый салон, а семейная команда, которая отвечает именами.</h2>
          <p>
            Наташа ведет дизайн: планировка, фасады, техника, хранение и общий вид квартиры. Александр больше 10 лет
            собирает кухни сам и знает, где проект должен быть красивым, а где просто обязан быть точным.
          </p>
          <div className="team-points">
            <span>
              <PenTool size={20} />
              Дизайн кухни или всей квартиры
            </span>
            <span>
              <Hammer size={20} />
              Точная сборка и контроль установки
            </span>
            <span>
              <Home size={20} />
              Мебель, техника, мойки и смесители в одном проекте
            </span>
          </div>
        </div>
        <div className="team-media" data-reveal>
          <img src={assets.craftImage} alt="Работа дизайнера и мастера по мебели" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function SegmentedControl({ label, value, options, onChange }) {
  return (
    <div className="field-group">
      <span>{label}</span>
      <div className="segmented" role="group" aria-label={label}>
        {Object.entries(options).map(([key, option]) => (
          <button
            className={value === key ? 'selected' : ''}
            type="button"
            key={key}
            aria-pressed={value === key}
            onClick={() => onChange(key)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CalculatorSection() {
  const [length, setLength] = useState(360);
  const [layout, setLayout] = useState('corner');
  const [front, setFront] = useState('matteMdf');
  const [countertop, setCountertop] = useState('stone');
  const [upperMode, setUpperMode] = useState('high');
  const [appliances, setAppliances] = useState('base');

  const estimate = useMemo(() => {
    const meters = length / 100;
    const fronts = frontOptions[front];
    const layoutValue = layoutOptions[layout];
    const counter = countertopOptions[countertop];
    const upperMultiplier = upperMode === 'ceiling' ? 1.2 : upperMode === 'high' ? 1.12 : 1;
    const applianceExtra = appliances === 'none' ? 0 : appliances === 'base' ? 85000 : 180000;
    const raw = (fronts.rate * meters * layoutValue.multiplier + counter.rate * meters) * upperMultiplier + applianceExtra;
    return {
      low: roundTo(raw * 0.9, 10000),
      high: roundTo(raw * 1.18, 10000),
      meters,
      frontLabel: fronts.label,
      layoutLabel: layoutValue.label,
      counterLabel: counter.label,
    };
  }, [appliances, countertop, front, layout, length, upperMode]);

  const upperLabels = {
    standard: 'стандарт',
    high: 'высокие',
    ceiling: 'до потолка',
  };

  const calcWhatsapp = useMemo(
    () =>
      makeWhatsAppLink(
        [
          'Здравствуйте! Хочу расчет кухни в Калининграде.',
          `Длина: ${length} см.`,
          `Планировка: ${estimate.layoutLabel}.`,
          `Фасады: ${estimate.frontLabel}.`,
          `Столешница: ${estimate.counterLabel}.`,
          `Верхние шкафы: ${upperLabels[upperMode]}.`,
          `Техника: ${appliances === 'none' ? 'без техники' : appliances === 'base' ? 'базовый комплект' : 'расширенный комплект'}.`,
          `Ориентир на сайте: ${rub.format(estimate.low)} - ${rub.format(estimate.high)} ₽.`,
        ].join('\n'),
      ),
    [appliances, estimate, length, upperMode],
  );

  return (
    <section className="section calculator-section" id="calculator">
      <div className="container calc-grid">
        <div className="calc-copy" data-reveal>
          <p className="section-kicker">3D-расчет</p>
          <h2>Соберите пример кухни и сразу увидьте порядок бюджета.</h2>
          <p>
            Калькулятор показывает ориентир для разговора. После замера Наташа уточнит материалы, технику и сложные узлы,
            а Александр проверит, как это реально встанет в вашей квартире.
          </p>
          <div className="estimate-box" aria-live="polite">
            <span>Ориентир проекта</span>
            <strong>
              {rub.format(estimate.low)} - {rub.format(estimate.high)} ₽
            </strong>
            <p>
              {estimate.layoutLabel.toLowerCase()} кухня {estimate.meters.toFixed(1)} м, {estimate.frontLabel},{' '}
              {estimate.counterLabel}, верх {upperLabels[upperMode]}.
            </p>
          </div>
          <a className="btn btn-primary calc-cta" href={calcWhatsapp} target="_blank" rel="noreferrer">
            <Send size={19} />
            Отправить параметры Наташе
          </a>
        </div>

        <div className="calc-panel" data-reveal>
          <div className="range-row">
            <label htmlFor="kitchen-length">
              Длина кухни
              <strong>{length} см</strong>
            </label>
            <input
              id="kitchen-length"
              type="range"
              min="220"
              max="620"
              step="20"
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
            />
          </div>

          <SegmentedControl label="Планировка" value={layout} options={layoutOptions} onChange={setLayout} />
          <SegmentedControl label="Фасады" value={front} options={frontOptions} onChange={setFront} />
          <SegmentedControl label="Столешница" value={countertop} options={countertopOptions} onChange={setCountertop} />

          <div className="control-grid">
            <label>
              Верхние шкафы
              <select value={upperMode} onChange={(event) => setUpperMode(event.target.value)}>
                <option value="standard">стандарт</option>
                <option value="high">высокие</option>
                <option value="ceiling">до потолка</option>
              </select>
            </label>
            <label>
              Техника
              <select value={appliances} onChange={(event) => setAppliances(event.target.value)}>
                <option value="none">без техники</option>
                <option value="base">базовый</option>
                <option value="full">расширенный</option>
              </select>
            </label>
          </div>
        </div>

        <div className="scene-panel" data-reveal>
          <Suspense fallback={<div className="scene-loading">Загружаем 3D-расчет</div>}>
            <KitchenScene length={length} layout={layout} front={frontOptions[front]} upperMode={upperMode} />
          </Suspense>
          <div className="scene-meta">
            <span>{frontOptions[front].note}</span>
            <span>{layoutOptions[layout].label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const icons = [MessageCircle, Ruler, Calculator, ClipboardCheck, Building2, Truck];

  return (
    <section className="section process" id="process">
      <div className="container section-intro" data-reveal>
        <p className="section-kicker">Как это идет</p>
        <h2>Процесс простой: меньше догадок, больше конкретики до производства.</h2>
      </div>
      <div className="container process-list">
        {process.map(([title, body], index) => {
          const Icon = icons[index];
          return (
            <article className="process-step" key={title} data-reveal>
              <div className="step-index">{String(index + 1).padStart(2, '0')}</div>
              <Icon size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Apartment() {
  return (
    <section className="section apartment">
      <div className="container apartment-layout" data-reveal>
        <div>
          <p className="section-kicker">Не только кухня</p>
          <h2>Можно закрыть всю квартиру одним дизайн-решением.</h2>
        </div>
        <div className="apartment-copy">
          <p>
            Если квартира новая или идет ремонт, Наташа может собрать единую логику хранения: кухня, шкафы, прихожая,
            ванная, техника и бытовые детали. Это убирает хаос из закупок и помогает держать стиль в каждом помещении.
          </p>
          <div className="apartment-tags">
            {['кухни', 'шкафы-купе', 'ванные', 'прихожие', 'матрасы', 'мойки', 'смесители', 'бытовая техника'].map(
              (item) => (
                <span key={item}>{item}</span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="faq-heading" data-reveal>
          <p className="section-kicker">Вопросы перед заявкой</p>
          <h2>Главные возражения лучше снять до звонка.</h2>
        </div>
        <div className="faq-list">
          {faq.map((item) => (
            <details key={item.q} data-reveal>
              <summary>
                {item.q}
                <span>+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    scope: 'kitchen',
    message: '',
  });

  const scopeLabels = {
    kitchen: 'кухня на заказ',
    apartment: 'вся квартира',
    wardrobe: 'шкаф / хранение',
    bathroom: 'мебель для ванной',
  };

  const formWhatsapp = useMemo(
    () =>
      makeWhatsAppLink(
        [
          'Здравствуйте! Хочу консультацию по мебели.',
          `Имя: ${formData.name || 'не указано'}.`,
          `Телефон: ${formData.phone || 'не указан'}.`,
          `Что нужно: ${scopeLabels[formData.scope]}.`,
          formData.message ? `Комментарий: ${formData.message}` : 'Комментарий: пока без деталей.',
        ].join('\n'),
      ),
    [formData],
  );

  const updateForm = (field) => (event) => {
    setSent(false);
    setFormData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    window.open(formWhatsapp, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy" data-reveal>
          <p className="section-kicker">Заявка</p>
          <h2>Пришлите размеры или фото помещения. Наташа скажет, с чего начать.</h2>
          <p>
            Самый быстрый путь - написать в WhatsApp. Для визита и личного разговора есть точка в ТЦ Калининский.
          </p>
          <div className="contact-actions">
            <a className="contact-line" href={contacts.nataliaTel}>
              <Phone size={20} />
              <span>
                Наталья
                <strong>{contacts.natalia}</strong>
              </span>
            </a>
            <a className="contact-line" href={contacts.alexanderTel}>
              <Hammer size={20} />
              <span>
                Александр
                <strong>{contacts.alexander}</strong>
              </span>
            </a>
            <a className="contact-line" href={contacts.yandex} target="_blank" rel="noreferrer">
              <MapPin size={20} />
              <span>
                Адрес
                <strong>{contacts.address}</strong>
              </span>
            </a>
          </div>
        </div>

        <form className="lead-form" onSubmit={handleSubmit} data-reveal>
          <label>
            Имя
            <input name="name" placeholder="Как к вам обращаться" value={formData.name} onChange={updateForm('name')} required />
          </label>
          <label>
            Телефон
            <input name="phone" type="tel" placeholder="+7 ..." value={formData.phone} onChange={updateForm('phone')} required />
          </label>
          <label>
            Что нужно
            <select name="scope" value={formData.scope} onChange={updateForm('scope')}>
              <option value="kitchen">кухня на заказ</option>
              <option value="apartment">вся квартира</option>
              <option value="wardrobe">шкаф / хранение</option>
              <option value="bathroom">мебель для ванной</option>
            </select>
          </label>
          <label>
            Комментарий
            <textarea
              name="message"
              placeholder="Размеры, район, желаемый стиль, техника"
              rows="4"
              value={formData.message}
              onChange={updateForm('message')}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            <Send size={19} />
            Отправить в WhatsApp
          </button>
          <p className="form-note">
            Нажимая кнопку, вы отправляете данные в WhatsApp Наталье для ответа по заявке. На сайте данные не
            сохраняются.
          </p>
          {sent && (
            <p className="form-success" role="status">
              WhatsApp открылся с заполненной заявкой. Если окно не открылось, нажмите кнопку ниже.
            </p>
          )}
          <div className="social-row">
            <a href={formWhatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a href={contacts.instagram} target="_blank" rel="noreferrer">
              <Camera size={18} />
              Instagram
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>Мебель для Вас</strong>
          <p>Кухни, шкафы-купе и корпусная мебель на заказ в Калининграде.</p>
          <p className="footer-legal">
            {legal.name} · ИНН {legal.inn} · ОГРНИП {legal.ogrnip}
          </p>
        </div>
        <div>
          <span>{contacts.address}</span>
          <a href={contacts.sourceSite} target="_blank" rel="noreferrer">
            Публичная карточка магазина
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Works />
        <Team />
        <CalculatorSection />
        <Process />
        <Apartment />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <a className="floating-cta" href={contacts.whatsapp} target="_blank" rel="noreferrer" aria-label="Написать в WhatsApp">
        <MessageCircle size={22} />
      </a>
    </>
  );
}
