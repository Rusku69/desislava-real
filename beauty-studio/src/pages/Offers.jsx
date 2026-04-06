import { useState } from 'react'

const promotions = [
  { id: 'promotion1', src: '/promotion1.png', alt: 'Промоция 1' },
  { id: 'promotion2', src: '/april1.png', alt: 'Промоция 2', position: '58% 50%' }
]

export default function Offers() {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpanded = (id) => {
    setExpandedItems((current) => ({
      ...current,
      [id]: !current[id]
    }))
  }

  return (
    <div className="page">
      <section className="offers-section">
        <div className="container">
          <div className="offers-grid">
            {promotions.map((promotion) => (
              <button
                key={promotion.id}
                type="button"
                className={`offer-item${expandedItems[promotion.id] ? ' expanded' : ''}`}
                onClick={() => toggleExpanded(promotion.id)}
                aria-pressed={Boolean(expandedItems[promotion.id])}
              >
                <div className="offer-image-container">
                  <img
                    src={promotion.src}
                    alt={promotion.alt}
                    style={{ objectPosition: promotion.position ?? '50% 50%' }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
