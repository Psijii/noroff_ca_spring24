import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsSlashLg } from "react-icons/bs";

const Breadcrumb = ({ paths }) => (
  <div className="mx-auto max-w-7xl md:px-12 mt-40 mb-10">
    <nav aria-label="Site navigation">
      <ol className="mb-6 ml-8 flex flex-row">
        {paths.map((path, index) => (
          <li
            key={path.id}
            className="flex items-center text-sm text-white underline"
          >
            {index < paths.length - 1 ? (
              <>
                <Link to={path.path}>{path.name}</Link>
                <BsSlashLg className="mx-2 text-white" />
              </>
            ) : (
              <span className="text-white">{path.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  </div>
);

Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
