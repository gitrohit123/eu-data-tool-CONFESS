"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  exams: any;
  columns: any;
  className?: string;
};

export default function TableDisplay({ exams, columns, className }: Props) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/admin/exams/${id}`);
      toast.success("Assessment deleted successfully");
      router.push("/admin/exams");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const renderCell = (exam: any, columnKey: any) => {
    const cellValue = exam[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2 place-items-center place-content-center">
            <Tooltip content="Edit Assessment">
              <Link href={"/admin/exams/edit/" + exam.id}>
                <Button>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <PencilSquareIcon className="size-7" />
                  </span>
                </Button>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete assessment">
              <Button onClick={() => handleDelete(exam.id)}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <TrashIcon className="size-7" />
                </span>
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
    }
  };

  return (
    <Table aria-label="Exams Table" className={className}>
      <TableHeader>
        {columns.map((column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            className={column.uid === "actions" ? "text-center" : ""}
          >
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {exams.map((exam: any) => (
          <TableRow key={exam.id}>
            {columns.map((column: any) => (
              <TableCell key={exam.id + column.uid}>
                {renderCell(exam, column.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
