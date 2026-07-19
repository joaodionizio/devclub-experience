export default function Nav() {
  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <a className="logo" href="#"><span className="mark">&lt;/&gt;</span>DevClub</a>
        <div className="nav-links">
          <a href="#formacoes" data-hover>Formações</a>
          <a href="#plataforma" data-hover>Faculdade</a>
          <a href="#tutores" data-hover>Tutores</a>
          <a href="#faq" data-hover>FAQ</a>
        </div>
        <div className="nav-right">
          <span className="status"><i />30.412 devs online</span>
          <a className="btn btn-ghost" href="#" data-hover>Área do aluno</a>
          <a className="btn btn-primary" href="#cta" data-hover><span className="sh" />Quero ser aluno</a>
        </div>
      </div>
    </nav>
  );
}
