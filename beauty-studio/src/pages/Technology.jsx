const technology = {
  videoUrl: 'https://www.facebook.com/share/v/1DMQX2dRsw/',
  description:
    'SuperNova 3in1 комбинира няколко режима на работа в една система, за да покрием различни нужди в лицето и тялото с по-точен контрол на параметрите. Технологията позволява персонализиран подход според типа кожа, зоната на третиране и целта на процедурата. Работи се с акцент върху комфорт, безопасност и предвидим резултат във всяка сесия. Благодарение на модерната апаратна конфигурация процедурите са по-ефективни и с по-кратко време за изпълнение. Всеки план се съобразява индивидуално след консултация, за да постигнем видима и устойчива промяна.'
}

export default function Technology() {
  return (
    <div className="page">
      <section className="technology-section technology-bg">
        <div className="container">
          <div className="technology-layout">
            <div className="tech-right">
              <div className="tech-copy">
                <p className="tech-summary">{technology.description}</p>
              </div>
              <div className="tech-video-card">
                <a
                  href={technology.videoUrl}
                  className="tech-video-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Видео
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
