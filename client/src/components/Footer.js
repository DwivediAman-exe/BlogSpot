const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-center text-dark fixed-bottom"
      style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
    >
      <div className="text-center p-3 fw-light float-start">
        Made with <i class="far fa-heart"></i> by Aman Dwivedi, {year}
      </div>
    </footer>
  );
};

export default Footer;
