import React from "react";
import Pagination from "material-ui-flat-pagination";

export default function CustomPagination(props) {
    const {
        limit,
        offset,
        total,
        handlePageChange,
        handleOffsetChange
    } = props;

    const handleClick = (e, offset, page) => {
        if (typeof handlePageChange === "function") handlePageChange(page);
        if (typeof handleOffsetChange === "function") handleOffsetChange(offset);
    }

    return (
        <Pagination
            limit={limit}
            offset={offset}
            total={total}
            onClick={handleClick}
        />
    )
}