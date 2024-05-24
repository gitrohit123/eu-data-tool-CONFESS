export const maxDuration = 50;
import Exam from "@/models/examModels";
import React from "react";
import EditExamLayout from "../examComponents/EditExamLayout";
import { connect } from "../../../../dbConfig/dbConfig";

type Props = {
  params: {
    id: string;
  };
};

connect();
const EditExam = async ({ params }: Props) => {
  const exam = await Exam.findById(params.id).select(
    "_id name category duration"
  );
  return <EditExamLayout />;
};

export default EditExam;
