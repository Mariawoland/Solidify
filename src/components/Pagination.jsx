import React from "react";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination flex pt-1 pb-6">
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} href="#" className={`mx-2 px-3 py-2 rounded-md bg-five hover:bg-one border-2 border-one  text-one hover:text-five font-semibold transition-all duration-300`}>
                        {number}
                    </a>

                </li>
            ))}
        </ul>
    );
};

export default Pagination;