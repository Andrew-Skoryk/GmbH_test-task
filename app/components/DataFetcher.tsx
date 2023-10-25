"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import { fetchData } from "../lib/redux/slices/tableSlice";

import { Spinner } from "@nextui-org/spinner";
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

  return <DataTable data={tableData.results} />;
}

export default DataFetcher;
