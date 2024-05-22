import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsSlashLg } from "react-icons/bs";

const Breadcrumb = ({ paths }) => (
  <div className="mx-auto max-w-7xl md:px-12 mt-40 mb-10">
    <nav aria-label="Breadcrumb for site navigation">
      <ol className="mb-6 ml-8 flex flex-row">
        {paths.map((path, index) => (
          <li
            key={path.id}
            className="flex items-center text-sm text-gray-800 underline"
          >
            {index < paths.length - 1 ? (
              <>
                <Link to={path.path}>{path.name}</Link>
                <BsSlashLg className="mx-2 text-gray-500" />
              </>
            ) : (
              <span className="text-gray-500">{path.name}</span>
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
