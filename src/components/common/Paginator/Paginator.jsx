import React from "react";
import styles from "./Paginator.module.css";

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
  let pageCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pages.map((page) => {
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
  );
};

export default Paginator;