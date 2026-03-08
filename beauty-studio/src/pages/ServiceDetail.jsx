import { Link, useParams } from 'react-router-dom'
import { services } from '../data/services'

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const service = services.find((item) => item.id === serviceId)

  if (!service) {
    return (
      <div className="page">
        <section className="service-detail">
          <div className="container">
            <div className="service-detail-card">
              <h2>Услугата не е намерена</h2>
              <p>Моля, изберете услуга от менюто.</p>
              <Link to="/" className="service-back-link">Обратно към началото</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="service-detail">
        <div className="container">
          <div className="service-detail-card">
            <div className="service-detail-header">
              <h2>{service.title}</h2>
              <p>
                Индивидуален подход и ясни стъпки за максимален комфорт и резултат.
              </p>
            </div>
            <div className="service-detail-body">
              {service.description && <p>{service.description}</p>}
              <ul>
                {service.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <Link to="/contact" className="service-back-link">Запази консултация</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
