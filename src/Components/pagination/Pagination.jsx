const Pagination = ({
  postsPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  let paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumber.push(i);
  }

  return (
    <div className="pagination flex gap-6">
      {currentPage > 1 && (
        <button
          onClick={() => handlePagination(currentPage - 1)}
          className="text-gray-500"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      )}

      {/* Numéros de page */}
      {paginationNumber.map((number) => (
        <button
          key={number}
          onClick={() => handlePagination(number)}
          className={currentPage === number ? "active" : "text-gray-500"}
        >
          {number}
        </button>
      ))}

      {currentPage < paginationNumber.length && (
        <button
          onClick={() => handlePagination(currentPage + 1)}
          className="text-gray-500"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
};

export default Pagination;
