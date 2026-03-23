import { Link } from 'react-router-dom'
import { priceListHighlights, priceListSections } from '../data/priceList'

const emphasizedSubtitles = new Set([
  'Жени',
  'Мъже',
  'Цени и пакети',
  'Терапии за кожа и подмладяване',
  'Татуировки, папиломи и кокоши трън',
  'Фина корекция'
])

function PriceRow({ item }) {
  return (
    <div className="pricelist-row">
      <div className="pricelist-row-copy">
        <h3>{item.name}</h3>
      </div>

      <div className="pricelist-price-stack">
        {item.prices.map((price) => (
          <span key={price} className="pricelist-price-line">
            {price}
          </span>
        ))}
      </div>
    </div>
  )
}

function PriceSection({ section }) {
  const subtitleClassName = emphasizedSubtitles.has(section.subtitle)
    ? 'pricelist-card-subtitle pricelist-card-subtitle-emphasis'
    : 'pricelist-card-subtitle'

  return (
    <article className="pricelist-card">
      <div className="pricelist-card-head">
        <p className={subtitleClassName}>{section.subtitle}</p>
        <h2>{section.title}</h2>
      </div>

      {section.items ? (
        <div className="pricelist-rows">
          {section.items.map((item) => (
            <PriceRow key={item.name} item={item} />
          ))}
        </div>
      ) : null}

      {section.callout ? (
        <div className="pricelist-callout">{section.callout}</div>
      ) : null}

      {section.groups ? (
        <div className="pricelist-group-grid">
          {section.groups.map((group) => (
            <section key={group.title} className="pricelist-group">
              <h3 className="pricelist-group-title">{group.title}</h3>
              <div className="pricelist-rows">
                {group.items.map((item) => (
                  <PriceRow key={item.name} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </article>
  )
}

export default function PriceList() {
  const womenSection = priceListSections.find(
    (section) => section.title === 'Епилация' && section.subtitle === 'Жени'
  )
  const menSection = priceListSections.find(
    (section) => section.title === 'Епилация' && section.subtitle === 'Мъже'
  )
  const centerSections = priceListSections.filter(
    (section) => section !== womenSection && section !== menSection
  )

  return (
    <div className="page">
      <section className="pricelist-section">
        <div className="container">
          <div className="pricelist-hero">
            <div className="pricelist-intro">
              <h1>Ценоразпис</h1>
              <p>
                Актуалните цени за процедурите в студиото са подредени по секции,
                за да се ориентирате по-лесно. При пакетните предложения цената е
                изписана директно под съответната услуга.
              </p>
            </div>

            <aside className="pricelist-note">
              <h2>Важно</h2>
              <ul className="pricelist-note-list">
                {priceListHighlights.map((highlight) => (
                  <li key={typeof highlight === 'string' ? highlight : highlight.id}>
                    {typeof highlight === 'string' ? (
                      highlight
                    ) : (
                      <>
                        <span className="pricelist-note-highlight-line">{highlight.intro}</span>
                        <span className="pricelist-note-highlight-line">{highlight.emphasis}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="pricelist-layout">
            <div className="pricelist-column pricelist-column-side">
              {womenSection ? <PriceSection section={womenSection} /> : null}
            </div>

            <div className="pricelist-column pricelist-column-center">
              {centerSections.map((section) => (
                <PriceSection
                  key={`${section.title}-${section.subtitle}`}
                  section={section}
                />
              ))}
            </div>

            <div className="pricelist-column pricelist-column-side">
              {menSection ? <PriceSection section={menSection} /> : null}
            </div>
          </div>

          <div className="pricelist-cta">
            <div>
              <p className="pricelist-cta-label">Нужна ви е консултация?</p>
              <h2>Свържете се с нас за записване на час или въпрос за процедура.</h2>
            </div>

            <div className="pricelist-actions">
              <Link to="/contact" className="pricelist-action pricelist-action-primary">
                Запиши час
              </Link>
              <a href="tel:+359886896966" className="pricelist-action pricelist-action-secondary">
                +359 88 689 6966
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
