import React, { useState } from "react";
import styles from "./Paginator.module.css";

type Props = {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (page: number) => void,
  portionSize?: number,
}

const Paginator: React.FC<Props> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pageCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  let portionCount = Math.ceil(pageCount / portionSize);
  const [portionNumber, setPortionNumber] = useState<number>(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.pagination}>
      <div className={styles.buttonWrapper}>
        {portionNumber > 1 && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}>
            Prev
          </button>
        )}
      </div>
      <div className={styles.pages}>
        {pages
          .filter(
            (page) =>
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
          )
          .map((page) => {
            return (
              <span
                className={currentPage === page ? styles.selectedPage : ""}
                onClick={(e) => {
                  onPageChanged(page);
                }}>
                {page}
              </span>
            );
          })}
      </div>
      <div className={styles.buttonWrapper}>
        {portionCount > portionNumber && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
