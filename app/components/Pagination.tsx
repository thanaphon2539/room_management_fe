import React from "react";

const Pagination = (props: {
  [x: string]: any;
  totalPages: number;
  currentPage: number;
}) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 7;

    if (props.totalPages <= maxVisible) {
      // ถ้าจำนวนหน้าทั้งหมด <= 7 แสดงทุกหน้า
      for (let i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // มีหน้ามากกว่า 7 ต้องใช้ ...
      if (props.currentPage <= 4) {
        // ถ้าอยู่ในหน้าแรกๆ
        pageNumbers.push(1, 2, 3, 4, 5, "...", props.totalPages);
      } else if (props.currentPage > props.totalPages - 4) {
        // ถ้าอยู่ในหน้าสุดท้าย
        pageNumbers.push(
          1,
          "...",
          props.totalPages - 4,
          props.totalPages - 3,
          props.totalPages - 2,
          props.totalPages - 1,
          props.totalPages
        );
      } else {
        // ถ้าอยู่ตรงกลาง
        pageNumbers.push(
          1,
          "...",
          props.currentPage - 1,
          props.currentPage,
          props.currentPage + 1,
          "...",
          props.totalPages
        );
      }
    }

    return pageNumbers;
  };

  const onChangePage = (value: number) => {
    props.onChangePage(value);
  };

  return (
    <div>
      {props.totalPages > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          {/* ปุ่ม Previous */}
          <button
            className={`btn ${
              props.currentPage === 1
                ? "bg-dark-light/30 cursor-not-allowed"
                : "btn-dark"
            }`}
            onClick={() => onChangePage(1)}
            disabled={props.currentPage === 1}
          >
            <i className="bi-chevron-double-left" />
          </button>
          <button
            className={`btn ${
              props.currentPage === 1
                ? "bg-dark-light/30 cursor-not-allowed"
                : "btn-dark"
            }`}
            onClick={() => onChangePage(props.currentPage - 1)}
            disabled={props.currentPage === 1}
          >
            <i className="bi-chevron-left" />
          </button>

          {/* แสดงปุ่มตัวเลข */}
          {generatePageNumbers().map((page, index) => (
            <button
              key={index}
              className={`btn !text-dark-base ${
                props.currentPage === page
                  ? "btn-primary !text-white"
                  : page === "..."
                  ? "cursor-default bg-transparent"
                  : "bg-dark-light/30 hover:!bg-primary-base hover:!text-white"
              }`}
              onClick={() => typeof page === "number" && onChangePage(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          {/* ปุ่ม Next */}
          <button
            className={`btn ${
              props.currentPage === props.totalPages
                ? "bg-dark-light/30 cursor-not-allowed"
                : "btn-dark"
            }`}
            onClick={() => onChangePage(props.currentPage + 1)}
            disabled={props.currentPage === props.totalPages}
          >
            <i className="bi-chevron-right" />
          </button>
          <button
            className={`btn ${
              props.currentPage === props.totalPages
                ? "bg-dark-light/30 cursor-not-allowed"
                : "btn-dark"
            }`}
            onClick={() => onChangePage(props.totalPages)}
            disabled={props.currentPage === props.totalPages}
          >
            <i className="bi-chevron-double-right" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
