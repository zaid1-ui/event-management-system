function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="container footer-content">
        <LinkToHome />
        <p>Discover your next unforgettable experience.</p>
        <span>© {new Date().getFullYear()} Eventra</span>
      </div>
    </footer>
  );
}

function LinkToHome() {
  return (
    <a className="brand footer-brand" href="/">
      <span className="brand-mark">E</span>
      <span>Eventra</span>
    </a>
  );
}

export default Footer;
