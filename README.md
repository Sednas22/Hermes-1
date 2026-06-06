# Hermes-1 - Front-End Design & Web Development
<p>Entrega desenvolvida para as disciplinas de <b>Front-End Design</b> e <b>Web Development</b>, como parte da Global Solution 2026 da FIAP. Projeto apresentado ao curso de Engenharia de Software.<p>
Desenvolvido por Cainã Sandes Batista - RM: 568571. <hr>

<h3>Sobre o projeto:</h3>
<p>
O <b>Hermes-1</b> é um ecossistema integrado de monitoramento de suporte à vida e telemetria para cápsulas espaciais, com foco na indústria espacial. Esta branch contém a camada de interface do ecossistema, o painel de controle utilizado pela equipe em terra para acompanhar a missão em tempo real. As demais camadas do projeto (hardware embarcado, auditoria em Python e documentação completa) estão disponíveis nas branches específicas deste repositório.
</p>

<h3>Estrutura do projeto:</h3>
<p>
<ul>
  <li>src (folder)</li>
  <ul>
    <b><li>index.css</b> - Estilos globais da aplicação, incluindo reset CSS, variáveis CSS, classes utilitárias, componentes visuais, animações e media queries para responsividade completa (320px a 2560px);</li>
    <b><li>App.jsx</b> - Define todas as rotas da aplicação utilizando <code>BrowserRouter</code>, <code>Routes</code> e <code>Route</code> do React Router DOM;</li>
    <b><li>main.jsx</b> - Entry point que monta a aplicação no DOM.</li>
    <li>components</li>
    <ul>
      <b><li>Navbar.jsx</b> - Barra de navegação fixa com logo animado, links desktop e menu hambúrguer para mobile. Usa <code>NavLink</code> para destacar a rota ativa e <code>useState</code> para controle do menu;</li>
      <b><li>Footer.jsx</b> - Rodapé padrão exibido em todas as páginas.</li>
    </ul>
    <li>pages</li>
    <ul>
      <b><li>Dashboard.jsx</b> - Página principal com informações da missão e cards de telemetria em tempo real (O₂, pressão e temperatura), com badges de status automáticos baseados nos limites críticos definidos no JSON;</li>
      <b><li>Historico.jsx</b> - Histórico completo das leituras de telemetria em tabela, com resumo de eventos nominais e críticos e tabela de limites de referência;</li>
      <b><li>Tecnologia.jsx</b> - Detalhamento técnico das cinco camadas do ecossistema Hermes-1, fluxo de dados e justificativas das decisões de engenharia;</li>
      <b><li>Sustentabilidade.jsx</b> - Defesa dos ODS 9 e ODS 13 com narrativa da cadeia de impacto do software espacial no monitoramento climático terrestre;</li>
      <b><li>Tripulacao.jsx</b> - Monitoramento biomédico da tripulação com filtros interativos por status (NOMINAL, CRÍTICO, REPOUSO), barras de estresse e badges dinâmicos.</b></li>
    </ul>
    <li>data</li>
    <ul>
      <b><li>dados.json</b> - Fonte de dados local da aplicação. Contém informações da missão, registros de telemetria, limites críticos de segurança, dados biomédicos da tripulação e arquitetura do ecossistema.</li>
    </ul>
  </ul>
</ul>
</p>

<h3>Rotas da aplicação:</h3>
<p>
<ul>
  <li><code>/</code> - Dashboard · Central de telemetria com cards de O₂, pressão e temperatura;</li>
  <li><code>/historico</code> - Histórico · Log completo das leituras de voo com tabela e resumo de anomalias;</li>
  <li><code>/tecnologia</code> - Tecnologia · Arquitetura do ecossistema e decisões de engenharia;</li>
  <li><code>/sustentabilidade</code> - Sustentabilidade · Defesa dos ODS 9 e ODS 13;</li>
  <li><code>/tripulacao</code> - Tripulação · Status biomédico interativo e filtrável da tripulação.</li>
</ul>
</p>

<h3>Tecnologias utilizadas:</h3>
<p>
<ul>
  <li><b>React + Vite</b> - Framework e bundler da aplicação;</li>
  <li><b>React Router DOM</b> - Roteamento entre páginas;</li>
  <li><b>CSS puro com variáveis</b> - Estilização sem bibliotecas externas, com design system próprio baseado em variáveis CSS;</li>
  <li><b>Google Fonts</b> - Rajdhani (tipografia principal) e Share Tech Mono (tipografia monospace);</li>
  <li><b>JSON local</b> - Fonte de dados da aplicação, sem dependência de API externa;</li>
  <li><b>Flexbox</b> - Sistema de layout responsivo em toda a aplicação.</li>
</ul>
</p>

<h3>Como executar:</h3>
<p>
É necessário ter o <a href="https://nodejs.org/">Node.js</a> instalado (versão 18 ou superior).
</p>

```bash
# Clone o repositório
git clone https://github.com/Sednas22/Hermes-1.git

# Acesse a branch
git checkout frontend/webdev

# Entre na pasta do projeto
cd Hermes-1

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

<p>Acesse no navegador: <b>http://localhost:5173</b></p>

<h3>Publicação:</h3>
<p>

🔗 Link do repositório: https://github.com/Sednas22/Hermes-1/tree/Frontend/Webdev

🔗 Link do deploy: https://hermes-1-frontend-webdev.vercel.app/

🔗 Link do Hermes-1: https://github.com/Sednas22/Hermes-1/
</p>
