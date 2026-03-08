import { useRef, useState } from 'react'

const galleryImages = [
  { src: '/gallery1.png', alt: 'Галерия 1', ratio: 983 / 1310, fit: 'cover', scale: 1.06, posY: '50%' },
  { src: '/gallery2.png', alt: 'Галерия 2', ratio: 979 / 1305, fit: 'cover', scale: 1.06, posY: '50%' },
  { src: '/gallery3.png', alt: 'Галерия 3', ratio: 1536 / 2048, fit: 'cover', scale: 1.06, posY: '50%' },
  { src: '/gallery4.png', alt: 'Галерия 4', ratio: 1188 / 1520, fit: 'cover', scale: 1.04, posY: '50%' },
  { src: '/gallery5.png', alt: 'Галерия 5', ratio: 1, fit: 'cover', scale: 1, posY: '50%' },
  { src: '/gallery6.png', alt: 'Галерия 6', ratio: 1, fit: 'cover', scale: 1, posY: '50%' },
  { src: '/gallery7.png', alt: 'Галерия 7', ratio: 1536 / 2048, fit: 'cover', scale: 1.06, posY: '50%' }
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(null)
  const touchDeltaX = useRef(0)

  const showPrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX
    touchDeltaX.current = 0
  }

  const handleTouchMove = (event) => {
    if (touchStartX.current === null) return
    touchDeltaX.current = event.changedTouches[0].clientX - touchStartX.current
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return
    if (touchDeltaX.current <= -50) showNext()
    if (touchDeltaX.current >= 50) showPrev()
    touchStartX.current = null
    touchDeltaX.current = 0
  }

  const activeImage = galleryImages[activeIndex]
  const ratio = activeImage.ratio ?? 1
  const frameWidth = ratio >= 1 ? '100%' : `${(ratio * 100).toFixed(2)}%`
  const frameHeight = ratio >= 1 ? `${(100 / ratio).toFixed(2)}%` : '100%'

  return (
    <div className="page">
      <section className="gallery-section gallery-bg">
        <div className="container">
          <div className="gallery-stage">
            <div
              className="gallery-target"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <div
                className="gallery-photo-shell"
                style={{
                  '--frame-width': frameWidth,
                  '--frame-height': frameHeight
                }}
              >
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="gallery-photo"
                  style={{
                    '--photo-fit': activeImage.fit ?? 'cover',
                    '--photo-scale': String(activeImage.scale ?? 1),
                    '--photo-pos-x': activeImage.posX ?? '50%',
                    '--photo-pos-y': activeImage.posY ?? '50%'
                  }}
                />
              </div>

              <button type="button" className="gallery-nav gallery-nav-prev" onClick={showPrev} aria-label="Предишна снимка">
                {'<'}
              </button>
              <button type="button" className="gallery-nav gallery-nav-next" onClick={showNext} aria-label="Следваща снимка">
                {'>'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
