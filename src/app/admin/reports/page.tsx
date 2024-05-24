"use client";
import Section from "@/components/Section";
import { EyeIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {};

const columns = [
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Email",
    uid: "email",
  },
  {
    name: "Actions",
    uid: "actions",
  },
];

const Reports = (props: Props) => {
  const [userList, setUserList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.get("/api/admin/reports");
      setUserList(res.data.data);
      setLoading(false);
    };
    getUserList();
  }, []);

  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2 place-items-center place-content-center">
            <Tooltip content="View exams">
              <Link href={"/admin/reports/" + user._id}>
                <Button color="success" variant="ghost">
                  <span className="text-lg text-slate-400 cursor-pointer active:opacity-50  flex">
                    <EyeIcon className="size-7 mr-[15px]" />
                    View Exams
                  </span>
                </Button>
              </Link>
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
    <Section className="flex-col">
      {loading ? (<Spinner size="lg" />) : (
        <Table aria-label="Exams Table" className={"mt-[30px]"}>
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
            {userList.map((user: any) => (
              <TableRow key={user._id}>
                {columns.map((column: any) => (
                  <TableCell key={user.id + column.uid}>
                    {renderCell(user, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Section>
  );
};

export default Reports;
