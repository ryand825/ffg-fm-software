import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

function Paging(props) {
  const {
    listLength = 1,
    getPage = () => {
      throw new Error("Paging component needs a getPage() function");
    },
    getPerPage = () => null
  } = props;

  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    getPage(page);
    getPerPage(perPage);
  }, [page]);

  const totalPages = Math.ceil(listLength / perPage);

  return (
    <Pagination>
      <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />
      {page > 2 && (
        <Pagination.Item onClick={() => setPage(page - 2)}>
          {page - 2}
        </Pagination.Item>
      )}
      {page > 1 && (
        <Pagination.Item onClick={() => setPage(page - 1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active onClick={() => setPage(page)}>
        {page}
      </Pagination.Item>
      {page < totalPages && (
        <Pagination.Item onClick={() => setPage(page + 1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {page + 1 < totalPages && (
        <Pagination.Item onClick={() => setPage(page + 2)}>
          {page + 2}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      />
      <Pagination.Last
        disabled={page >= totalPages}
        onClick={() => setPage(totalPages)}
      />
    </Pagination>
  );
}

export default Paging;
