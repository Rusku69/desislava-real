import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { services } from '../data/services'

const SITE_NAME = 'Desi Slava Studio'
const FALLBACK_SITE_URL = 'https://desislavastudio.com'
const SITE_URL = (import.meta.env.VITE_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, '')
const DEFAULT_IMAGE_PATH = '/textlogo.png'

const sharedKeywords = [
  'лазерна епилация',
  'козметични процедури',
  'естетични процедури',
  'козметично студио',
  'козметичен салон Пловдив',
  'Desi Slava Studio'
]

const routeMeta = {
  '/': {
    title: 'Desi Slava Studio | Лазерна епилация и естетични процедури в Пловдив',
    description:
      'Desi Slava Studio в Пловдив предлага лазерна епилация, фото подмладяване и персонализирани естетични терапии със SuperNova 3in1.',
    keywords: ['лазерна епилация Пловдив', 'SuperNova 3in1', 'фото подмладяване']
  },
  '/salon': {
    title: 'Салон | Desi Slava Studio Пловдив',
    description:
      'Разгледайте нашия козметичен салон в центъра на Пловдив - модерна обстановка, комфорт и професионална грижа.',
    keywords: ['козметичен салон', 'салон Пловдив', 'козметично студио Пловдив']
  },
  '/technology': {
    title: 'Технология SuperNova 3in1 | Desi Slava Studio',
    description:
      'SuperNova 3in1 съчетава няколко режима на работа за епилация, подмладяване и третиране на кожа с прецизни настройки и комфорт.',
    keywords: ['SuperNova 3in1', 'IPL технология', 'лазерна технология']
  },
  '/offers': {
    title: 'Отстъпки и промоции | Desi Slava Studio',
    description:
      'Вижте актуалните промоции и отстъпки за лазерна епилация и естетични процедури в Desi Slava Studio, Пловдив.',
    keywords: ['промоции лазерна епилация', 'козметични отстъпки', 'оферти Пловдив']
  },
  '/gallery': {
    title: 'Галерия | Desi Slava Studio',
    description:
      'Разгледайте снимки от Desi Slava Studio и резултати от процедурите за епилация, подмладяване и грижа за кожата.',
    keywords: ['галерия процедури', 'резултати лазерна епилация', 'снимки козметичен салон']
  },
  '/contact': {
    title: 'Контакти | Desi Slava Studio Пловдив',
    description:
      'Свържете се с Desi Slava Studio в Пловдив. Телефон за записване: +359 88 689 6966. Адрес: ул. Брезовска 14.',
    keywords: ['контакти козметичен салон', 'записване час Пловдив', 'Desi Slava Studio телефон']
  }
}

const serviceMetaById = {
  epilation: {
    title: 'Лазерна епилация | Desi Slava Studio',
    description:
      'Професионална лазерна епилация в Пловдив с модерна 4D технология и система за охлаждане за максимален комфорт.',
    keywords: ['лазерна епилация', 'епилация Пловдив', '4D лазер']
  },
  rejuvenation: {
    title: 'Фото подмладяване | Desi Slava Studio',
    description:
      'Фото подмладяване с IPL и NiR технологии за стегната, сияйна и по-равна кожа без дълъг възстановителен период.',
    keywords: ['фото подмладяване', 'IPL Пловдив', 'подмладяване на лице']
  },
  acne: {
    title: 'Лечение на акне | Desi Slava Studio',
    description:
      'Лечение на акне и проблемна кожа с персонализиран план, насочен към причините за възпаленията и контрола на себума.',
    keywords: ['лечение на акне', 'проблемна кожа', 'козметични процедури за акне']
  },
  peeling: {
    title: 'Карбонов пилинг | Desi Slava Studio',
    description:
      'Карбонов пилинг за дълбоко почистване, по-фина текстура и по-равномерен тен с щадяща неинвазивна процедура.',
    keywords: ['карбонов пилинг', 'почистване на лице', 'лазерен пилинг']
  },
  'laser-rejuvenation': {
    title: 'Лазерно подмладяване | Desi Slava Studio',
    description:
      'Лазерно подмладяване за подобряване на плътност, тонус и текстура на кожата чрез индивидуален терапевтичен план.',
    keywords: ['лазерно подмладяване', 'подмладяване на кожа', 'естетични процедури']
  },
  mesotherapy: {
    title: 'Лазерна мезотерапия | Desi Slava Studio',
    description:
      'Безиглена лазерна мезотерапия за хидратация, еластичност и видимо освежена кожа без възстановителен период.',
    keywords: ['лазерна мезотерапия', 'безиглена мезотерапия', 'хидратация на кожа']
  },
  'pmu-corn': {
    title: 'Премахване на перманентен грим и кокоши трън | Desi Slava Studio',
    description:
      'Прецизно лазерно премахване на перманентен грим и третиране на кокоши трън с внимателен индивидуален подход.',
    keywords: ['премахване на перманентен грим', 'кокоши трън', 'Nd YAG лазер']
  },
  'fungus-treatment': {
    title: 'Лечение на гъбички по кожа и нокти | Desi Slava Studio',
    description:
      'Лазерно лечение на гъбички по кожа и нокти с щадяща процедура, домашни насоки и контролни прегледи.',
    keywords: ['лечение на гъбички', 'гъбички по нокти', 'лазерна терапия']
  }
}

function trimTrailingSlash(path) {
  if (path.length > 1) {
    return path.replace(/\/+$/, '')
  }

  return path
}

function buildUrl(pathname) {
  const cleanPath = trimTrailingSlash(pathname || '/')
  if (cleanPath === '/') return `${SITE_URL}/`
  return `${SITE_URL}${cleanPath}`
}

function buildKeywords(keywords = []) {
  return [...new Set([...keywords, ...sharedKeywords])].join(', ')
}

function sanitizeServiceTitle(rawTitle, serviceId) {
  if (!rawTitle || rawTitle.includes('Р')) {
    return serviceId.replaceAll('-', ' ')
  }

  return rawTitle
}

export default function RouteSeo() {
  const { pathname } = useLocation()
  const cleanPath = trimTrailingSlash(pathname)

  let meta = routeMeta[cleanPath]

  if (!meta && cleanPath.startsWith('/services/')) {
    const serviceId = cleanPath.split('/')[2]
    const service = services.find((item) => item.id === serviceId)
    const serviceMeta = serviceMetaById[serviceId]
    const fallbackTitle = sanitizeServiceTitle(service?.title, serviceId || 'service')

    if (serviceMeta) {
      meta = serviceMeta
    } else if (service) {
      meta = {
        title: `${fallbackTitle} | ${SITE_NAME}`,
        description:
          'Разгледайте детайлна информация за процедурата и индивидуален подход за максимален комфорт и видим резултат.',
        keywords: [fallbackTitle, 'козметични услуги', 'естетични процедури']
      }
    } else {
      meta = {
        title: `Страницата не е намерена | ${SITE_NAME}`,
        description: 'Търсената страница не съществува. Върнете се към началото на сайта.',
        keywords: ['404', 'страницата не е намерена'],
        robots: 'noindex, nofollow'
      }
    }
  }

  if (!meta) {
    meta = {
      title: `Страницата не е намерена | ${SITE_NAME}`,
      description: 'Търсената страница не съществува. Върнете се към началото на сайта.',
      keywords: ['404', 'страницата не е намерена'],
      robots: 'noindex, nofollow'
    }
  }

  const canonicalUrl = buildUrl(cleanPath)
  const imageUrl = buildUrl(DEFAULT_IMAGE_PATH)
  const robots = meta.robots || 'index, follow'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: SITE_NAME,
    image: imageUrl,
    url: `${SITE_URL}/`,
    telephone: '+359886896966',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Plovdiv',
      streetAddress: 'ul. Brezovska 14',
      addressCountry: 'BG'
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00'
      }
    ]
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang="bg" />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={buildKeywords(meta.keywords)} />
      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="bg_BG" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
    </Helmet>
  )
}
