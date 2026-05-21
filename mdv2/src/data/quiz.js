import heroImage from '../assets/hero-kitchen.webp';
import craftImage from '../assets/craft-design.webp';
import kitchen01 from '../assets/instagram/ig-01.webp';
import kitchen02 from '../assets/instagram/ig-02.webp';
import kitchen03 from '../assets/instagram/ig-03.webp';
import kitchen04 from '../assets/instagram/ig-04.webp';
import kitchen05 from '../assets/instagram/ig-05.webp';
import kitchen06 from '../assets/instagram/ig-06.webp';
import kitchen07 from '../assets/instagram/ig-07.webp';
import kitchen08 from '../assets/instagram/ig-08.webp';
import kitchen09 from '../assets/instagram/ig-09.webp';
import kitchen10 from '../assets/instagram/ig-10.webp';
import kitchen11 from '../assets/instagram/ig-11.webp';
import kitchen12 from '../assets/instagram/ig-12.webp';
import kitchen13 from '../assets/instagram/ig-13.webp';
import kitchen14 from '../assets/instagram/ig-14.webp';
import kitchen15 from '../assets/instagram/ig-15.webp';
import kitchen16 from '../assets/instagram/ig-16.webp';
import kitchen17 from '../assets/instagram/ig-17.webp';
import kitchen18 from '../assets/instagram/ig-18.webp';

export const promoCode = 'MDV-KGD5';

export const contacts = {
  natalia: '+7 (981) 455-32-55',
  alexander: '+7 (911) 461-15-62',
  nataliaTel: 'tel:+79814553255',
  whatsappBase: 'https://wa.me/79814553255',
  instagram: 'https://www.instagram.com/mebel_dla_was',
  address: 'Калининград, пр-кт Калинина 117, ТЦ Калининский',
  legal: 'ИП Бородко Н.Г. · ИНН 391600991914 · ОГРНИП 310392627400031',
};

export const assets = {
  heroImage,
  craftImage,
  gallery: [
    kitchen01,
    kitchen02,
    kitchen03,
    kitchen04,
    kitchen05,
    kitchen06,
    kitchen07,
    kitchen08,
    kitchen09,
    kitchen10,
    kitchen11,
    kitchen12,
    kitchen13,
    kitchen14,
    kitchen15,
    kitchen16,
    kitchen17,
    kitchen18,
  ],
};

export const frontLooks = {
  lightWood: {
    label: 'Белый + дерево',
    color: '#e9e5dc',
    accent: '#9b6a42',
    texture: 'stone',
    note: 'самый спокойный вариант для квартиры',
  },
  graphite: {
    label: 'Темный акцент',
    color: '#2d3432',
    accent: '#b17a4b',
    texture: 'matte',
    note: 'выглядит дороже, если хватает света',
  },
  warmModern: {
    label: 'Теплый современный',
    color: '#c6ad8a',
    accent: '#f0eee7',
    texture: 'wood',
    note: 'мягкий интерьер без холодного салона',
  },
  stoneWhite: {
    label: 'Светлый минимализм',
    color: '#f3f1eb',
    accent: '#303938',
    texture: 'stone',
    note: 'визуально расширяет маленькую кухню',
  },
  unsure: {
    label: 'Покажите варианты',
    color: '#e9e5dc',
    accent: '#3e6f59',
    texture: 'stone',
    note: 'Наташа подберет 2-3 направления',
  },
};

export const defaultAnswers = {
  goal: 'kitchen',
  layout: 'corner',
  length: '4-5',
  style: 'lightWood',
  uppers: 'ceiling',
  extras: ['sink', 'lighting', 'dishwasher'],
  stage: 'renovation',
  timing: '1-2',
  budget: '550-800',
  channel: 'whatsapp',
};

export const quizSteps = [
  {
    id: 'goal',
    title: 'Что нужно рассчитать?',
    helper: 'Так мы сразу поймем, считать только кухню или весь мебельный сценарий квартиры.',
    type: 'cards',
    note: 'Если квартира новая, выгоднее сразу связать кухню, хранение и технику в один проект.',
    options: [
      {
        value: 'kitchen',
        title: 'Кухня на заказ',
        text: 'Планировка, фасады, столешница, фурнитура.',
        image: kitchen01,
      },
      {
        value: 'kitchen-tech',
        title: 'Кухня + техника',
        text: 'Сразу учтем духовку, варочную, вытяжку, ПММ.',
        image: kitchen02,
      },
      {
        value: 'apartment',
        title: 'Вся квартира под ключ',
        text: 'Кухня, шкафы, прихожая, ванная, техника.',
        image: kitchen05,
      },
      {
        value: 'storage',
        title: 'Кухня и хранение',
        text: 'Пеналы, шкафы, ниши и мебель по размерам.',
        image: kitchen06,
      },
    ],
  },
  {
    id: 'layout',
    title: 'Какая планировка ближе?',
    helper: 'Выбор можно поменять после замера. Сейчас нужен ориентир для 3D и вилки цены.',
    type: 'cards',
    note: 'Угловая и П-образная кухни чаще требуют больше точных узлов, зато дают больше рабочей поверхности.',
    options: [
      { value: 'straight', title: 'Прямая', text: 'Для студии или компактной стены.', image: kitchen14 },
      { value: 'corner', title: 'Угловая', text: 'Самый частый сценарий в Калининграде.', image: kitchen09 },
      { value: 'ushape', title: 'П-образная', text: 'Максимум хранения и рабочей зоны.', image: kitchen01 },
      { value: 'island', title: 'С островом', text: 'Когда кухня становится центром квартиры.', image: kitchen05 },
      { value: 'unsure', title: 'Пока не знаю', text: 'Подскажем по фото и размерам.', image: kitchen03 },
    ],
  },
  {
    id: 'length',
    title: 'Примерная длина гарнитура',
    helper: 'Можно выбрать на глаз. Если есть план БТИ или замер, Наташа уточнит после заявки.',
    type: 'rows',
    note: 'Даже 20-30 см могут менять наполнение, поэтому точную смету делаем после замера.',
    options: [
      { value: 'under-3', title: 'До 3 метров', text: 'Компактная кухня или студия.' },
      { value: '3-4', title: 'От 3 до 4 метров', text: 'Базовая квартира с понятной стеной.' },
      { value: '4-5', title: 'От 4 до 5 метров', text: 'Хороший баланс хранения и бюджета.' },
      { value: '5-6', title: 'От 5 до 6 метров', text: 'Кухня с пеналами или большим углом.' },
      { value: '6-plus', title: 'Более 6 метров', text: 'Большая кухня, П-форма или остров.' },
      { value: 'unknown', title: 'Не знаю длину', text: 'Пришлю фото, план или адрес на замер.' },
    ],
  },
  {
    id: 'style',
    title: 'Какой внешний вид ближе?',
    helper: 'Этот ответ меняет 3D-модель справа и помогает Наташе не присылать лишние варианты.',
    type: 'cards',
    note: 'Если сомневаетесь, выбирайте “покажите варианты”: на консультации дадим 2-3 направления.',
    options: [
      { value: 'lightWood', title: 'Белый + дерево', text: 'Тепло, спокойно, легко продать квартиру.', image: kitchen11 },
      { value: 'graphite', title: 'Темный акцент', text: 'Графит, черная техника, выразительный контраст.', image: kitchen13 },
      { value: 'warmModern', title: 'Теплый современный', text: 'Дерево, свет, мягкий интерьер.', image: kitchen17 },
      { value: 'stoneWhite', title: 'Светлый минимализм', text: 'Чистые линии, светлая столешница, много воздуха.', image: kitchen15 },
      { value: 'unsure', title: 'Покажите варианты', text: 'Наташа соберет подборку по вашему помещению.', image: kitchen16 },
    ],
  },
  {
    id: 'uppers',
    title: 'Какие верхние модули считать?',
    helper: 'Это сильно влияет на хранение, внешний вид и стоимость.',
    type: 'cards',
    note: 'Для квартир с ремонтом под ключ обычно рекомендуем верх до потолка: меньше пыли и больше хранения.',
    options: [
      { value: 'standard', title: 'Стандартные', text: 'Дешевле, если бюджет жесткий.', image: kitchen10 },
      { value: 'high', title: 'Высокие', text: 'Больше хранения без перегруза.', image: kitchen03 },
      { value: 'ceiling', title: 'До потолка', text: 'Ровная линия и максимум хранения.', image: kitchen04 },
      { value: 'columns', title: 'Колонны хранения', text: 'Пеналы, техника и запасы в одном блоке.', image: kitchen07 },
    ],
  },
  {
    id: 'extras',
    title: 'Что учесть в комплектации?',
    helper: 'Можно выбрать несколько пунктов. Чем точнее состав, тем честнее первая вилка.',
    type: 'multi',
    note: 'Мойку можно получить в подарок по промокоду, но в ТЗ ее все равно лучше отметить заранее.',
    options: [
      { value: 'sink', title: 'Мойка + смеситель', text: 'В промо можно получить мойку в подарок.' },
      { value: 'lighting', title: 'Светодиодная подсветка', text: 'Рабочая зона выглядит дороже и удобнее.' },
      { value: 'dishwasher', title: 'Посудомоечная машина', text: 'Сразу заложим фасад и коммуникации.' },
      { value: 'oven', title: 'Духовой шкаф', text: 'В колонне или под варочной поверхностью.' },
      { value: 'cooktop', title: 'Варочная поверхность', text: 'Газ или индукция.' },
      { value: 'hood', title: 'Вытяжка', text: 'Открытая, встроенная или декоративная.' },
      { value: 'all-tech', title: 'Подобрать всю технику', text: 'Наташа может собрать технику вместе с мебелью.' },
      { value: 'storage', title: 'Больше хранения', text: 'Пеналы, бутылочницы, выдвижные системы.' },
    ],
  },
  {
    id: 'stage',
    title: 'На каком этапе квартира?',
    helper: 'Так мы поймем, можно ли сразу проектировать розетки, технику и высоты.',
    type: 'rows',
    note: 'Если ремонт еще идет, можно заранее избежать дорогих переделок по электрике и коммуникациям.',
    options: [
      { value: 'has-sizes', title: 'Размеры уже есть', text: 'Есть план, замер или понятная стена.' },
      { value: 'renovation', title: 'Идет ремонт', text: 'Можно еще повлиять на розетки и выводы.' },
      { value: 'new-flat', title: 'Новая квартира', text: 'Нужна логика кухни и хранения с нуля.' },
      { value: 'lived-in', title: 'Живем и хотим заменить кухню', text: 'Важно быстро и аккуратно спланировать замену.' },
      { value: 'need-design', title: 'Нужен дизайн всей квартиры', text: 'Наташа может собрать мебель и технику под ключ.' },
    ],
  },
  {
    id: 'timing',
    title: 'Когда кухня должна стоять дома?',
    helper: 'Срок влияет на подбор материалов, фурнитуры и очередь производства.',
    type: 'rows',
    note: 'Если нужно срочно, лучше сразу написать в WhatsApp после квиза.',
    options: [
      { value: 'asap', title: 'Чем быстрее, тем лучше', text: 'Нужно быстро понять возможные сроки.' },
      { value: '1-2', title: 'В ближайшие 1-2 месяца', text: 'Оптимально для замера, проекта и изготовления.' },
      { value: '3-plus', title: 'Через 3 месяца и позже', text: 'Можно спокойно подготовить дизайн и бюджет.' },
      { value: 'estimate', title: 'Пока прицениваюсь', text: 'Получить вилку и понять порядок бюджета.' },
    ],
  },
  {
    id: 'budget',
    title: 'Какой бюджет держим в голове?',
    helper: 'Нужен не для давления, а чтобы Наташа не считала неподходящие комплектации.',
    type: 'rows',
    note: 'Финально пришлем 3 комплектации: разумная, оптимальная и максимальная.',
    options: [
      { value: 'under-350', title: 'До 350 тыс. ₽', text: 'Смотрим компактные и практичные решения.' },
      { value: '350-550', title: '350-550 тыс. ₽', text: 'Хороший рабочий диапазон для кухни на заказ.' },
      { value: '550-800', title: '550-800 тыс. ₽', text: 'Больше свободы по фасадам, технике и хранению.' },
      { value: '800-plus', title: '800 тыс. ₽ и выше', text: 'Премиальнее материалы, сложные узлы, квартира целиком.' },
      { value: 'three-options', title: 'Хочу увидеть 3 варианта', text: 'Разумный, оптимальный и максимальный расчет.' },
    ],
  },
];

export const labelByStep = quizSteps.reduce((acc, step) => {
  acc[step.id] = step.options.reduce((map, option) => {
    map[option.value] = option.title;
    return map;
  }, {});
  return acc;
}, {});

export const frontByStyle = {
  lightWood: frontLooks.lightWood,
  graphite: frontLooks.graphite,
  warmModern: frontLooks.warmModern,
  stoneWhite: frontLooks.stoneWhite,
  unsure: frontLooks.lightWood,
};
