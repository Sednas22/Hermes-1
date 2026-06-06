export default function Sustentabilidade() {
  return (
    <div className="page">
      <img src="../public/iss.jpg" alt="Vista da terra a partir da órbita - missão Hermes-1" className="bg-image"/>
      <div className="container">

        <div className="hero">
          <div className="hero-tag">IMPACTO GLOBAL</div>
          <h1>Sustentabilidade e <span>ODS</span></h1>
          <p>
            O Hermes-1 está diretamente conectado aos Objetivos de Desenvolvimento
            Sustentável da ONU relevantes para a indústria espacial e engenharia de software.
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '3rem' }}>

          <div className="ods-card">
            <div className="ods-number">09</div>
            <h3>Indústria, inovação e infraestrutura</h3>
            <p>
              O Hermes-1 representa a nova geração de infraestrutura aeroespacial comercial.
              Resiliente, automatizada e baseada em software. Ao desenvolver um sistema embarcado
              capaz de monitorar e reagir autonomamente a falhas críticas de suporte à vida,
              o projeto demonstra como a engenharia de software é o alicerce da infraestrutura
              espacial do século XXI.
            </p>
            <p style={{ marginTop: '1rem' }}>
              A automação de sistemas críticos embarcados reduz a dependência de intervenção
              humana em ambientes hostis, aumenta a confiabilidade das missões e viabiliza
              operações de longa duração em órbita, contribuindo diretamente para o
              desenvolvimento de infraestrutura tecnológica de alta resiliência.
            </p>
          </div>

          <div className="ods-card">
            <div className="ods-number">13</div>
            <h3>Ação contra a mudança global do clima</h3>
            <p>
              As tripulações que operam em órbita baixa (LEO) são responsáveis por instalar,
              calibrar e coletar dados de satélites de monitoramento climático. Os mesmos
              que rastreiam queimadas, mapeiam desmatamento, medem temperatura dos oceanos
              e antecipam eventos climáticos extremos na Terra.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Garantir a segurança dessas tripulações não é apenas uma questão de missão,
              é salvaguardar a continuidade dos dados climáticos que protegem o planeta.
              O Hermes-1 atua diretamente nessa cadeia: sem suporte à vida confiável,
              não há missão. Sem missão, não há dados. Sem dados, não há ação climática.
            </p>
          </div>

        </div>

        <hr className="divider" />

        <div className="section-title">A CADEIA DE IMPACTO</div>
        <div className="section-heading">Como o software conecta o espaço à terra</div>
        <div className="section-desc">
          O impacto do Hermes-1 não termina na cápsula, ele se estende até as decisões
          climáticas tomadas com base nos dados que as missões seguras tornam possível.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { num: '01', titulo: 'Sistema embarcado confiável', desc: 'O ESP32 monitora os parâmetros críticos e dispara alertas em tempo real antes que a situação se torne irreversível.' },
            { num: '02', titulo: 'Tripulação segura em órbita', desc: 'Com suporte à vida garantido, os astronautas podem executar a missão, calibrar instrumentos, coletar amostras, operar satélites.' },
            { num: '03', titulo: 'Satélites operacionais', desc: 'Satélites calibrados e operacionais transmitem dados contínuos de temperatura, umidade, cobertura vegetal e emissões para a Terra.' },
            { num: '04', titulo: 'Dados climáticos precisos', desc: 'Agências como NASA, ESA, INPE e Copernicus processam esses dados e os disponibilizam para pesquisadores e governos.' },
            { num: '05', titulo: 'Ação climática baseada em evidência', desc: 'Políticas públicas, alertas de desastre e iniciativas de preservação são fundamentadas em dados reais do espaço.' },
          ].map((item, i) => (
            <div className="arch-item" key={i}>
              <div className="arch-number">{item.num}</div>
              <div className="arch-content">
                <h3>{item.titulo}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
