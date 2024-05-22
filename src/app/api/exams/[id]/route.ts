import { NextRequest, NextResponse } from "next/server";
import Exam from "@/models/examModels";
import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import Answer from "@/models/answerModels";
import mongoose from "mongoose";

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
    const userId = await getTokenData(request);
    const { answers } = await request.json();
    const answerData = answers.map((answer: any) => {
      return {
        question: new mongoose.Types.ObjectId(answer._id.toString()),
        user: new mongoose.Types.ObjectId(userId),
        answer: answer.answer,
        exam: new mongoose.Types.ObjectId(params.id),
      };
    });
    const response = await Answer.insertMany(answerData);
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!request.body) {
      return NextResponse.json({ error: "Invalid request", status: 400 });
    }
    const body = await request.json();
    console.log(body);
    const response = await Exam.updateOne({ _id: params.id }, body);
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await Exam.deleteOne({ _id: params.id });
    return NextResponse.json({ data: response, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
