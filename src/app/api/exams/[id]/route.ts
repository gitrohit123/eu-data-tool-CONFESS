import { NextRequest, NextResponse } from "next/server";
import Exam from "@/models/examModels";
import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import Answer from "@/models/answerModels";
import mongoose from "mongoose";
const { randomUUID } = require('crypto');

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exam = await Exam.findById({ _id: params.id });
    return NextResponse.json({ data: exam, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getTokenData(
      request.cookies.get("token")?.value || ""
    );
    const { answers } = await request.json();

    // Generate a unique exam ID, so multiple activities of the same type can be submitted
    const examId = randomUUID();
    const answerData = answers.map((answer: any) => {
      return {
        question: new mongoose.Types.ObjectId(answer._id.toString()),
        answer: answer.answer || "result",
        exam: new mongoose.Types.ObjectId(params.id),
        examId: examId.toString(),
        user: new mongoose.Types.ObjectId(userId),
      };
    });
    console.log(params.id, answerData);
    const response = await Answer.insertMany(answerData);
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
