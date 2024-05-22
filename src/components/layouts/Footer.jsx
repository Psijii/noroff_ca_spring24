const Footer = () => {
  return (
    <footer className="mt-20 bg-secondary-100">
      <div className="px-20 py-20 md:py-8 bg-primary">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Holidaze</h3>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © 2024{" "}
          <a
            href="https://example.com"
            className="hover:underline"
            aria-label="Holidaze front page"
          >
            Holidaze™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
