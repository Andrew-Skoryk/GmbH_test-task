"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import { fetchData } from "../lib/redux/slices/tableSlice";

import { Spinner } from "@nextui-org/spinner";
import { Pagination } from "@nextui-org/pagination";
import DataTable from "./DataTable";

function DataFetcher() {
  const dispatch = useDispatch<AppDispatch>();
  const tableData = useSelector((state: RootState) => state.table.data);
  const tableStatus = useSelector((state: RootState) => state.table.status);

  useEffect(() => {
    if (tableStatus === "idle") {
      dispatch(fetchData());
    }
  }, [tableStatus, dispatch]);

  if (tableStatus === "loading" || !tableData) {
    return <Spinner label="Loading..." size="lg" />;
  }

  if (tableStatus === "failed") {
    return <div>An error occurred while loading data :(</div>;
  }

  return (
    <div className="flex flex-col items-center self-start flex-grow space-y-6">
      <h1 className="text-2xl font-semibold">Table Data</h1>
      <DataTable data={tableData.results} />

      <Pagination
        total={41}
        initialPage={1}
        showControls
        variant="faded"
        size="lg"
        showShadow
      />
    </div>
  );
}

export default DataFetcher;
