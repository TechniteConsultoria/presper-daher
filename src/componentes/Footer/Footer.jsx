import "../Footer/Footer.style.css"

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-home">
          <p>Inicio</p>
          <a href="/" className="link"> Home</a>
          <a href="/" className="link"> Cursos</a>
        </div>
        <div className="footer-about-us">
          <p>Sobre Nós</p>
          <a href="/" className="link"> Informações da empresa</a>
          <a href="/" className="link"> Contato</a>
          
        </div>
        <div className="footer-support">
          <p>Suporte</p>
          <a href="/" className="link"> FAQ</a>
          <a href="/" className="link"> Telefones </a>
          <a href="/" className="link"> Chat</a>
        </div>
        <br/>
  
        <p className="text-footer">
          Ensino EAD © 2022 All Rights Reserved
        </p>{" "}
        <br />
       <span> Feito pela Technite</span>
      </footer>
    </>
  );
}

export default Footer;
