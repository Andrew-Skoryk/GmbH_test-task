"use client";

import React, { useCallback } from "react";
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

function DataTable({ data }: Props) {
  const [editingCell, setEditingCell] = React.useState<{
    rowId: number;
    key: keyof TableData;
  } | null>(null);
  const [inputValue, setInputValue] = React.useState<string | number>("");

  const handleCellClick = (rowId: number, key: keyof TableData) => {
    setEditingCell({ rowId, key });
    const editingCell = data.find((row) => row.id === rowId);

    if (!editingCell) return;

    if (editingCell[key]) setInputValue(editingCell[key]!);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    setEditingCell(null);
    setInputValue("");
  };

  const renderCell = useCallback(
    (row: TableData, columnKey: keyof TableData) => {
      if (editingCell?.rowId === row.id && editingCell?.key === columnKey) {
        return (
          <div className="flex items-center rounded-md ransition-colors">
            <Input
              value={inputValue.toString()}
              onChange={handleInputChange}
              onBlur={handleSave}
              onSubmit={handleSave}
              size="sm"
              color="secondary"
              isClearable
              className="-my-1.5 -mx-2 w-full"
            />
          </div>
        );
      }
      return row[columnKey];
    },
    [editingCell, inputValue]
  );

  return (
    <Table
      fullWidth
      aria-label="Data table"
      isStriped
      color="primary"
      onSortChange={(descriptor) => {}}
    >
      <TableHeader columns={columns}
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
