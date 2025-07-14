import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  return (
    <nav
      aria-label="breadcrumb"
      className="bg-gray-200 text-gray-700 py-3 shadow-sm "
    >
      <div className="max-w-screen-3xl pl-20 mx-auto px-4">
        <ol className="flex flex-wrap items-center text-sm">
          {paths.map((path, index) => (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <span className="mx-2 text-gray-400">›</span>
              )}

              {index === paths.length - 1 ? (
                <span className="text-gray-500 font-medium">{path.name}</span>
              ) : (
                <Link
                  to={path.link}
                  className="text-pink-600 hover:underline hover:text-blue-800 transition-colors"
                >
                  {path.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
