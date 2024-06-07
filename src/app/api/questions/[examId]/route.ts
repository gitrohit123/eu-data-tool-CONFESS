import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    const questions = await Question.find({ exam: params.examId }).select(
      "_id name questionType questionCategory questionID nextQuestion options"
    );
    return NextResponse.json({ data: questions, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

