import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import "./Table.css";

const Table = ({
  headerColor,
  dataColor,
  columns,
  data,
  itemsPerPageOptions,
  defaultItemsPerPage,
  maxHeight,
  headerTextColor
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [contentHeight, setContentHeight] = useState("auto"); // Initialize as "auto".

  // Update the content height when the data or itemsPerPage changes.
  useEffect(() => {
    // Calculate the content height based on data length and items per page.
    const rowsPerPage = Math.min(data.length, itemsPerPage);
    const calculatedHeight =
      rowsPerPage * /* Height of a single row in pixels */ 50;

    // Set the content height based on whether it exceeds maxHeight.
    setContentHeight(calculatedHeight > maxHeight ? maxHeight : "auto");
  }, [data, itemsPerPage, maxHeight]);

  const handleAction = (actionType) => {
    // Handle the action here (e.g., perform a download)
    if (actionType === "Download") {
      // Add your download logic here
      console.log("Download button clicked");
    }
    // Add more conditions for other action types
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page.
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(currentPage + 1, totalPages);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => paginate(number)}
        className={number === currentPage ? "current-page" : ""}
      >
        {number}
      </button>
    ));
  };

  return (
    <div
      className="table-container"
      style={{
        maxHeight,
        overflowX: contentHeight === "auto" ? "hidden" : "scroll",
        overflowY: "auto",
      }}
    >
      <table
        style={{
          maxHeight,
          overflowX: contentHeight === "auto" ? "hidden" : "scroll",
          overflowY: "auto",
          width: "-webkit-fill-available"
        }}
      >
        <thead style={{ background: headerColor, color: headerTextColor }}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width || "auto", textAlign: "center" }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ background: dataColor }}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={{ textAlign: "center" }}>
                  {column.name === "Action"
                    ? column.render(row)
                    : column.selector
                    ? column.selector(row)
                    : row[column.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="pagination"
        style={{ display: "flex", justifyContent: "space-between", width: "inherit" }}
      >
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <span>
          <span>
            Rows:
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </span>
          {canGoPrevious && (
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={!canGoPrevious}
            >
              Previous
            </button>
          )}

          {renderPageNumbers()}

          {canGoNext && (
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={!canGoNext}
            >
              Next
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Table;
