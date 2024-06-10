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
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
  params: {
    userId: string;
    examId: string;
  };
};

const columns = [
  {
    name: "Question",
    uid: "_id",
  },
  {
    name: "Answer",
    uid: "answer",
  },
];

const ExamsByUser = ({ params }: Props) => {
  const [examList, setExamList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.get(
        "/api/admin/reports/" + params.userId + "/" + params.examId
      );
      setExamList(res.data.data);
      setLoading(false);
    };
    getUserList();
  }, [params.userId, params.examId]);

  const renderCell = (answer: any, columnKey: any) => {
    const cellValue = answer[columnKey];
    switch (columnKey) {
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
                      {
                          examList.map((exam: any) => (
                              <TableRow key={exam._id}>
                                  {columns.map((column: any) => (
                                      <TableCell key={exam.id + column.uid}>
                                          {renderCell(exam, column.uid)}
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

export default ExamsByUser;
export const dynamic = "force-dynamic";
