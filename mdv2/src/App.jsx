import { lazy, Suspense, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Gift,
  Hammer,
  Home,
  Layers3,
  MessageCircle,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  assets,
  contacts,
  defaultAnswers,
  frontByStyle,
  labelByStep,
  promoCode,
  quizSteps,
} from './data/quiz.js';

const KitchenScene = lazy(() => import('./components/KitchenScene.jsx'));

const rub = new Intl.NumberFormat('ru-RU');

const makeWhatsAppLink = (message) => `${contacts.whatsappBase}?text=${encodeURIComponent(message)}`;

const scrollToId = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 76;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top, behavior: 'smooth' });
};

const lengthMeters = {
  'under-3': 2.7,
  '3-4': 3.6,
  '4-5': 4.6,
  '5-6': 5.6,
  '6-plus': 6.8,
  unknown: 4.2,
};

const layout3d = {
  straight: 'straight',
  corner: 'corner',
  ushape: 'ushape',
  island: 'island',
  unsure: 'corner',
};

const upper3d = {
  standard: 'standard',
  high: 'high',
  ceiling: 'ceiling',
  columns: 'ceiling',
};

function roundTo(value, step = 10000) {
  return Math.round(value / step) * step;
}

function estimateRange(answers) {
  const meters = lengthMeters[answers.length] ?? 4.2;
  const layoutMultiplier = {
    straight: 1,
    corner: 1.18,
    ushape: 1.35,
    island: 1.52,
    unsure: 1.16,
  }[answers.layout];
  const styleMultiplier = {
    lightWood: 1.08,
    graphite: 1.12,
    warmModern: 1.16,
    stoneWhite: 1.1,
    unsure: 1.08,
  }[answers.style];
  const upperMultiplier = {
    standard: 1,
    high: 1.1,
    ceiling: 1.2,
    columns: 1.28,
  }[answers.uppers];
  const extrasCount = answers.extras?.length ?? 0;
  const extrasPrice = extrasCount * 18000 + (answers.extras?.includes('all-tech') ? 90000 : 0);
  const raw = meters * 72000 * layoutMultiplier * styleMultiplier * upperMultiplier + extrasPrice;
  return {
    low: Math.max(260000, roundTo(raw * 0.88)),
    high: roundTo(raw * 1.2),
    meters,
  };
}

function Header({ onStart }) {
  return (
    <header className="header">
      <a className="brand" href="#top" aria-label="Мебель для Вас">
        <span className="brand-mark">М</span>
        <span>
          <strong>Мебель для Вас</strong>
          <small>от Саши и Наташи · Калининград</small>
        </span>
      </a>
      <nav className="header-proof" aria-label="Доказательства">
        <span>10+ лет</span>
        <span>700+ кухонь</span>
        <span>3D-проект</span>
      </nav>
      <div className="header-actions">
        <a href={contacts.nataliaTel} className="phone-link">
          <Phone size={17} />
          {contacts.natalia}
        </a>
        <button type="button" className="header-quiz" onClick={onStart}>
          Пройти квиз
        </button>
      </div>
    </header>
  );
}

function PromoStrip() {
  return (
    <section className="promo-strip" aria-label="Подарок по квизу">
      <div>
        <Gift size={18} />
        <span>
          Промокод <strong>{promoCode}</strong>: скидка 5% и мойка в подарок после заявки
        </span>
      </div>
      <div>
        <ShieldCheck size={18} />
        <span>Без спама: заявка уходит сразу Наташе в WhatsApp</span>
      </div>
    </section>
  );
}

function Hero({ onStart }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1>Кухня под ключ в Калининграде: 3 сметы за 2 минуты</h1>
        <p>
          Александр проверит посадку и сборку, Наташа подберет фасады, технику и хранение. В конце квиза откроется
          промокод на скидку 5% и мойку в подарок.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn primary" onClick={onStart}>
            Начать расчет
            <ArrowRight size={18} />
          </button>
          <a href={makeWhatsAppLink('Здравствуйте! Хочу пройти квиз и получить расчет кухни.')} className="btn ghost">
            <MessageCircle size={18} />
            Написать сразу
          </a>
        </div>
        <div className="hero-stats">
          <span>
            <strong>9</strong>
            вопросов без лишнего
          </span>
          <span>
            <strong>3</strong>
            комплектации
          </span>
          <span>
            <strong>3D</strong>
            ориентир кухни
          </span>
        </div>
      </div>
      <div className="hero-media" aria-label="Реальная кухня Мебель для Вас">
        <img src={assets.gallery[0]} alt="П-образная кухня с островом" />
        <div className="hero-media-card">
          <span>Результат квиза</span>
          <strong>разумная / оптимальная / максимальная смета</strong>
        </div>
      </div>
    </section>
  );
}

function Progress({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div className="progress-block" aria-label={`Шаг ${current + 1} из ${total}`}>
      <div className="progress-top">
        <span>
          Шаг {current + 1} из {total}
        </span>
        <strong>{percent}%</strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function OptionCard({ option, selected, onSelect, compact = false }) {
  return (
    <button type="button" className={selected ? 'option-card selected' : 'option-card'} onClick={onSelect}>
      {option.image && <img src={option.image} alt="" loading="lazy" />}
      <span className="option-check" aria-hidden="true">
        <Check size={16} />
      </span>
      <strong>{option.title}</strong>
      <small>{option.text}</small>
      {compact && <ChevronRight size={17} className="option-arrow" />}
    </button>
  );
}

function RowOption({ option, selected, onSelect, multi = false }) {
  return (
    <button type="button" className={selected ? 'row-option selected' : 'row-option'} onClick={onSelect}>
      <span className={multi ? 'box-indicator' : 'radio-indicator'} aria-hidden="true">
        {selected && <Check size={14} />}
      </span>
      <span>
        <strong>{option.title}</strong>
        <small>{option.text}</small>
      </span>
    </button>
  );
}

function QuizStep({ step, answers, setAnswer }) {
  const value = answers[step.id];

  if (step.type === 'cards') {
    return (
      <div className="option-grid cards">
        {step.options.map((option) => (
          <OptionCard
            key={option.value}
            option={option}
            selected={value === option.value}
            onSelect={() => setAnswer(step.id, option.value)}
          />
        ))}
      </div>
    );
  }

  if (step.type === 'multi') {
    const selectedValues = Array.isArray(value) ? value : [];
    return (
      <div className="option-grid rows">
        {step.options.map((option) => (
          <RowOption
            key={option.value}
            option={option}
            multi
            selected={selectedValues.includes(option.value)}
            onSelect={() => {
              const next = selectedValues.includes(option.value)
                ? selectedValues.filter((item) => item !== option.value)
                : [...selectedValues, option.value];
              setAnswer(step.id, next);
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="option-grid rows">
      {step.options.map((option) => (
        <RowOption
          key={option.value}
          option={option}
          selected={value === option.value}
          onSelect={() => setAnswer(step.id, option.value)}
        />
      ))}
    </div>
  );
}

function VisualPanel({ answers, currentStep }) {
  const estimate = useMemo(() => estimateRange(answers), [answers]);
  const front = frontByStyle[answers.style] ?? frontByStyle.lightWood;
  const layout = layout3d[answers.layout] ?? 'corner';
  const upperMode = upper3d[answers.uppers] ?? 'ceiling';
  const length = Math.round((estimate.meters || 4.2) * 100);
  const promoUnlocked = currentStep >= 5;

  return (
    <aside className="visual-panel">
      <div className="panel-head">
        <div>
          <span>Живой 3D-ориентир</span>
          <strong>{labelByStep.layout[answers.layout] || 'Угловая'} кухня</strong>
        </div>
        <Layers3 size={22} />
      </div>
      <div className="scene-shell">
        <Suspense fallback={<div className="scene-loading">Загружаем 3D</div>}>
          <KitchenScene length={length} layout={layout} front={front} upperMode={upperMode} />
        </Suspense>
      </div>
      <div className="estimate-mini">
        <span>Ориентир после ответов</span>
        <strong>
          {rub.format(estimate.low)} - {rub.format(estimate.high)} ₽
        </strong>
        <small>точно считаем после замера и выбора материалов</small>
      </div>
      <div className={promoUnlocked ? 'promo-card unlocked' : 'promo-card'}>
        <Gift size={20} />
        <div>
          <span>{promoUnlocked ? 'Промокод открыт' : 'Промокод откроется после 60%'}</span>
          <strong>{promoUnlocked ? promoCode : '•••-••••'}</strong>
          <small>скидка 5% и мойка в подарок при заявке</small>
        </div>
      </div>
      <div className="trust-list">
        <span>
          <BadgeCheck size={18} />
          Наташа ведет дизайн и комплектацию
        </span>
        <span>
          <Hammer size={18} />
          Александр лично отвечает за сборку
        </span>
        <span>
          <Ruler size={18} />
          700+ кухонь за 10+ лет
        </span>
      </div>
    </aside>
  );
}

function SummaryList({ answers }) {
  const labels = [
    ['Что нужно', labelByStep.goal[answers.goal]],
    ['Планировка', labelByStep.layout[answers.layout]],
    ['Длина', labelByStep.length[answers.length]],
    ['Стиль', labelByStep.style[answers.style]],
    ['Верх', labelByStep.uppers[answers.uppers]],
    ['Срок', labelByStep.timing[answers.timing]],
    ['Бюджет', labelByStep.budget[answers.budget]],
  ];

  return (
    <div className="summary-list">
      {labels.map(([label, value]) => (
        <span key={label}>
          <small>{label}</small>
          <strong>{value || 'уточнить'}</strong>
        </span>
      ))}
    </div>
  );
}

function LeadStep({ answers, setAnswers }) {
  const [sent, setSent] = useState(false);
  const estimate = useMemo(() => estimateRange(answers), [answers]);
  const extras = (answers.extras || []).map((value) => labelByStep.extras[value]).filter(Boolean);
  const channelLabels = {
    whatsapp: 'WhatsApp',
    call: 'звонок',
    any: 'как удобно',
  };
  const message = [
    'Здравствуйте! Прошел(ла) квиз на сайте Мебель для Вас.',
    `Промокод: ${promoCode}.`,
    `Имя: ${answers.name || 'не указано'}.`,
    `Телефон: ${answers.phone || 'не указан'}.`,
    `Что нужно: ${labelByStep.goal[answers.goal]}.`,
    `Планировка: ${labelByStep.layout[answers.layout]}.`,
    `Длина: ${labelByStep.length[answers.length]}.`,
    `Стиль: ${labelByStep.style[answers.style]}.`,
    `Верхние модули: ${labelByStep.uppers[answers.uppers]}.`,
    `Комплектация: ${extras.length ? extras.join(', ') : 'уточнить'}.`,
    `Этап: ${labelByStep.stage[answers.stage]}.`,
    `Срок: ${labelByStep.timing[answers.timing]}.`,
    `Бюджет: ${labelByStep.budget[answers.budget]}.`,
    `Удобный канал: ${channelLabels[answers.channel] || 'WhatsApp'}.`,
    `Ориентир сайта: ${rub.format(estimate.low)} - ${rub.format(estimate.high)} ₽.`,
    'Хочу получить 3 комплектации и похожие проекты.',
  ].join('\n');
  const href = makeWhatsAppLink(message);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="lead-step">
      <div className="lead-hero">
        <span className="finish-label">Финальный шаг</span>
        <h2>Оставьте телефон, и Наташа отправит 3 комплектации кухни</h2>
        <p>
          В заявку добавится промокод <strong>{promoCode}</strong>. Назовите его при общении, чтобы закрепить скидку 5%
          и мойку в подарок.
        </p>
      </div>
      <SummaryList answers={answers} />
      <form className="lead-form" onSubmit={submit}>
        <label>
          Имя
          <input
            name="name"
            placeholder="Как к вам обращаться"
            value={answers.name || ''}
            onChange={(event) => setAnswers((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </label>
        <label>
          Телефон
          <input
            name="phone"
            type="tel"
            placeholder="+7 ..."
            value={answers.phone || ''}
            onChange={(event) => setAnswers((current) => ({ ...current, phone: event.target.value }))}
            required
          />
        </label>
        <div className="channel-row" role="group" aria-label="Удобный канал">
          {[
            ['whatsapp', 'WhatsApp'],
            ['call', 'Звонок'],
            ['any', 'Как удобно'],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              className={answers.channel === value ? 'selected' : ''}
              onClick={() => setAnswers((current) => ({ ...current, channel: value }))}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="btn primary lead-submit" type="submit">
          Получить результаты
          <Send size={18} />
        </button>
        <p className="privacy-note">
          На сайте данные не сохраняются: кнопка открывает WhatsApp с заполненной заявкой для Натальи.
        </p>
        {sent && (
          <p className="success-note" role="status">
            WhatsApp открыт с вашей заявкой. Если окно не открылось, нажмите “Получить результаты” еще раз.
          </p>
        )}
      </form>
    </div>
  );
}

function QuizShell() {
  const [answers, setAnswers] = useState(defaultAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const total = quizSteps.length;
  const step = quizSteps[stepIndex];
  const isLead = stepIndex === total;

  const setAnswer = (id, value) => {
    setAnswers((current) => ({ ...current, [id]: value }));
  };

  const next = () => {
    setStepIndex((current) => Math.min(current + 1, total));
    window.setTimeout(() => scrollToId('quiz'), 40);
  };

  const back = () => {
    setStepIndex((current) => Math.max(current - 1, 0));
    window.setTimeout(() => scrollToId('quiz'), 40);
  };

  const isMultiEmpty = step?.type === 'multi' && (!answers[step.id] || answers[step.id].length === 0);

  return (
    <section className="quiz-section" id="quiz">
      <div className="quiz-copy">
        <span>Квиз вместо долгого брифа</span>
        <h2>Каждый ответ приближает смету к реальной кухне, а не к рекламной цене “от”.</h2>
      </div>
      <div className="quiz-layout">
        <div className="quiz-main">
          {!isLead && (
            <>
              <Progress current={stepIndex} total={total} />
              <div className="step-heading">
                <h3>{step.title}</h3>
                <p>{step.helper}</p>
              </div>
              <QuizStep step={step} answers={answers} setAnswer={setAnswer} />
              <div className="step-note">
                <Sparkles size={17} />
                <span>{step.note}</span>
              </div>
              <div className="nav-row">
                <button type="button" className="circle-btn" onClick={back} disabled={stepIndex === 0} aria-label="Назад">
                  <ArrowLeft size={19} />
                </button>
                <button type="button" className="btn primary" onClick={next} disabled={isMultiEmpty}>
                  {stepIndex === total - 1 ? 'Открыть промокод' : 'Дальше'}
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}
          {isLead && (
            <>
              <Progress current={total - 1} total={total} />
              <LeadStep answers={answers} setAnswers={setAnswers} />
              <div className="nav-row lead-nav">
                <button type="button" className="circle-btn" onClick={back} aria-label="Назад">
                  <ArrowLeft size={19} />
                </button>
              </div>
            </>
          )}
        </div>
        <VisualPanel answers={answers} currentStep={stepIndex} />
      </div>
    </section>
  );
}

function ProofSection() {
  const items = [
    {
      icon: Home,
      title: 'Можно закрыть квартиру целиком',
      text: 'Кухня, шкафы, прихожая, ванная мебель, техника, мойки и смесители в одном проекте.',
    },
    {
      icon: Ruler,
      title: 'Проект под реальные размеры',
      text: 'После квиза Наташа видит вводные, но точная смета появляется после замера и выбора материалов.',
    },
    {
      icon: Hammer,
      title: 'Сборку контролирует Александр',
      text: 'Кухня должна не просто красиво выглядеть, а ровно встать в конкретной квартире.',
    },
    {
      icon: CheckCircle2,
      title: 'Подарок не спрятан',
      text: `Промокод ${promoCode} виден на финале и автоматически попадает в WhatsApp-заявку.`,
    },
  ];

  return (
    <section className="proof-section">
      <div className="proof-media">
        <img src={assets.craftImage} alt="Дизайн и сборка кухни" loading="lazy" />
      </div>
      <div className="proof-copy">
        <h2>Это семейная команда, а не обезличенный салон с чужой сборкой.</h2>
        <div className="proof-list">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={22} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ onStart }) {
  return (
    <section className="gallery-section">
      <div className="gallery-head">
        <h2>Реальные кадры из работ 2024-2026, чтобы вы выбирали не по картинкам из каталога.</h2>
        <button type="button" className="btn ghost dark" onClick={onStart}>
          Рассчитать похожую кухню
        </button>
      </div>
      <div className="gallery-rail" aria-label="Примеры работ">
        {assets.gallery.slice(0, 14).map((image, index) => (
          <img key={image} src={image} alt={`Пример кухни ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Мебель для Вас</strong>
        <span>{contacts.address}</span>
      </div>
      <div>
        <a href={contacts.nataliaTel}>{contacts.natalia}</a>
        <span>{contacts.legal}</span>
      </div>
    </footer>
  );
}

export default function App() {
  const scrollToQuiz = () => {
    scrollToId('quiz');
  };

  return (
    <>
      <Header onStart={scrollToQuiz} />
      <main>
        <PromoStrip />
        <Hero onStart={scrollToQuiz} />
        <QuizShell />
        <ProofSection />
        <GallerySection onStart={scrollToQuiz} />
      </main>
      <Footer />
      <a
        className="floating-whatsapp"
        href={makeWhatsAppLink(`Здравствуйте! Хочу расчет кухни. Промокод ${promoCode}.`)}
        target="_blank"
        rel="noreferrer"
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </>
  );
}
