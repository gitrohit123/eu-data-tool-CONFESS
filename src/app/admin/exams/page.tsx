export const maxDuration = 50;
import Section from "@/components/Section";
import TableDisplay from "@/app/admin/exams/examComponents/ExamTableDisplay";
import Exam from "@/models/examModels";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {};

const Activities = async (props: Props) => {
  let exams: any = await Exam.find(
    {},
    {
      name: 1,
      category: 1,
      _id: 1,
      duration: 1,
    }
  );
  exams = exams.map((exam: any) => ({
    id: exam._id.toString(),
    name: exam.name,
    category: exam.category,
    duration: exam.duration,
  }));

  const columns = [
    {
      name: "Name",
      uid: "name",
    },
    {
      name: "Duration",
      uid: "duration",
    },
    {
      name: "Category",
      uid: "category",
    },
    {
      name: "Actions",
      uid: "actions",
    },
  ];

  return (
    <Section className="flex-col">
      <Link href="/admin/exams/create" className="place-self-end">
        <Button color="success" variant="ghost">
          Create Exam
        </Button>
      </Link>
      <TableDisplay exams={exams} columns={columns} className="mt-[30px]" />
    </Section>
  );
};

export default Activities;
