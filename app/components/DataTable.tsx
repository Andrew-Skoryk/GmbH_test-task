"use client";

import React, { useCallback } from "react";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { updateData } from "../lib/redux/slices/tableSlice";
import { fromServerFormat } from "../lib/utils";
import { AppDispatch } from "../lib/redux/store";
import { fetchData } from "../lib/redux/slices/tableSlice";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  data: TableData[];
};

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "email", label: "EMAIL" },
  { key: "birthday_date", label: "BIRTHDAY DATE" },
  { key: "phone_number", label: "PHONE NUMBER" },
  { key: "address", label: "ADDRESS" },
];

const tableDataSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character." })
    .max(255, { message: "Name must be at max 255 characters." }),
  email: z.string().email({ message: "Invalid email format." }),
  birthday_date: z.string(),
  phone_number: z
    .string()
    .min(1, { message: "Phone number must be at least 1 character." })
    .max(20, { message: "Phone number must be at max 20 characters." }),
  address: z
    .string()
    .min(1, { message: "Address must be at least 1 character." })
    .optional(),
});

function DataTable({ data }: Props) {
  const [editingCell, setEditingCell] = React.useState<TableCell | null>(null);
  const [inputValue, setInputValue] = React.useState<string | number>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleCellClick = (rowId: number, key: keyof TableData) => {
    setEditingCell({ rowId, key });
    const editingCell = data.find((row) => row.id === rowId);

    if (!editingCell) return;

    if (key === "birthday_date") {
      setInputValue(fromServerFormat(editingCell[key]));
    } else {
      setInputValue(editingCell[key]!);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = useCallback(async () => {
    if (editingCell) {
      const row = data.find((item) => item.id === editingCell.rowId);

      if (row) {
        let updatedValue = inputValue;

        if (editingCell.key === "birthday_date") {
          updatedValue = inputValue;
        }
        const updatedRow = { ...row, [editingCell.key]: updatedValue };

        try {
          tableDataSchema.parse(updatedRow);
          dispatch(updateData(updatedRow));
          setEditingCell(null);
          setInputValue("");
          dispatch(fetchData());
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [editingCell, data, inputValue, dispatch]);

  const renderCell = useCallback(
    (row: TableData, columnKey: keyof TableData) => {
      if (editingCell?.rowId === row.id && editingCell?.key === columnKey) {
        if (columnKey === "birthday_date") {
          return (
            <DatePicker
              selected={inputValue ? new Date(inputValue) : null}
              onChange={(date) => {
                if (date) {
                  const formattedDate = date.toISOString().split("T")[0];
                  setInputValue(formattedDate);
                  handleSave();
                }
              }}
              dateFormat="yyyy-MM-dd"
              popperPlacement="top-end"
            />
          );
        }

        return (
          <div className="flex items-center rounded-md ransition-colors">
            <Input
              value={inputValue.toString()}
              onChange={handleInputChange}
              onBlur={handleSave}
              onSubmit={handleSave}
              size="sm"
              color="secondary"
              className="-my-1.5 -mx-2"
            />
          </div>
        );
      }
      if (columnKey === "birthday_date") {
        return row[columnKey];
      }
      return row[columnKey];
    },
    [editingCell, inputValue, handleSave]
  );

  return (
    <Table
      fullWidth
      aria-label="Data table"
      isStriped
      color="primary"
      onSortChange={(descriptor) => {}}
      className="self-start"
    >
      <TableHeader
        columns={columns}
        // allowsSorting
      >
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody
        emptyContent={"Sadly, we have no data to display :("}
        loadingContent={<Spinner label="Loading..." />}
      >
        {data.map((row) => (
          <TableRow key={row.id}>
            {(columnKey) => (
              <TableCell
                className="cursor-pointer"
                onClick={() =>
                  handleCellClick(row.id, columnKey as keyof TableData)
                }
              >
                {renderCell(row, columnKey as keyof TableData)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
