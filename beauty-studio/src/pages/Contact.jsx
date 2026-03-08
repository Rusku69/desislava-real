export default function Contact() {
  return (
    <div className="page">
      <section className="contact-section contact-bg">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item contact-intro">
                <h3>Запиши час</h3>
                <div className="contact-details">
                  <p>
                    Свържи се с нас за консултация и записване на удобен час. Ще обсъдим каква процедура е
                    най-подходяща за теб и ще ти препоръчаме работещ план според състоянието на кожата.
                  </p>
                  <p>
                    Записването е бързо по телефон, а при нужда ще насочим и към правилната подготовка преди
                    посещението.
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <h3>Адрес</h3>
                <div className="contact-details">
                  <p>гр. Пловдив</p>
                  <p>ул. "Брезовска" 14</p>
                </div>
              </div>

              <div className="contact-item">
                <h3>Телефон</h3>
                <div className="contact-details">
                  <p>За записи и информация</p>
                  <a href="tel:+359886896966" className="phone-link">
                    +359 88 689 6966
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <h3>Работно време</h3>
                <div className="contact-details">
                  <div className="work-hours">
                    <span>Понеделник - Петък: 10:00 - 19:00</span>
                    <span>Събота: 10:00 - 17:00</span>
                    <span>Неделя: Почивен ден</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-section">
              <div className="contact-item map-header">
                <h3>Нашето местоположение</h3>
                <p>Център на Пловдив, удобен достъп</p>
              </div>
              <div className="map-container-large">
                <img src="/Lokaciq.png" alt="Карта на местоположението" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
