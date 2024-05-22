export const maxDuration = 50; // This function can run for a maximum of 5 seconds
// export const dynamic = 'force-dynamic';

import Exam from "@/models/examModels";
import React from "react";
import EditExamLayout from "../../examComponents/EditExamLayout";
import Question from "@/models/questionModels";
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
  const questions = await Question.find({ exam: params.id });
  return <EditExamLayout exam={exam} questionData={questions} />;
};

export default EditExam;
