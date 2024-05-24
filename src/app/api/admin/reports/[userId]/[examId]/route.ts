import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Answer from "@/models/answerModels";
import mongoose from "mongoose";
connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; examId: string } }
) {
  try {
    const answerList = await Answer.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(params.userId),
          exam: new mongoose.Types.ObjectId(params.examId),
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "question",
          foreignField: "_id",
          as: "question",
        },
      },
      {
        $project: {
          "question.name": 1,
          answer: 1,
        },
      },
      { $unwind: { path: "$question" } },
      {
        $group: {
          _id: "$question.name",
          answer: { $first: "$answer" },
        },
      },
    ]);
    return NextResponse.json({ data: answerList, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
