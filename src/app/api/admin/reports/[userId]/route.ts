import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Answer from "@/models/answerModels";
import mongoose from "mongoose";
connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const examList = await Answer.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(params.userId) } },
      {
        $lookup: {
          from: "exams",
          localField: "exam",
          foreignField: "_id",
          as: "exam",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          "exam.name": 1,
          "exam.category": 1,
          "exam.duration": 1,
          "exam._id": 1,
          "user._id": 1,
        },
      },
      { $unwind: { path: "$exam" } },
      { $unwind: { path: "$user" } },
      {
        $group: {
          _id: "$exam._id",
          category: { $first: "$exam.category" },
          name: { $first: "$exam.name" },
          duration: { $first: "$exam.duration" },
          user: { $first: "$user._id" },
        },
      },
    ]);
    return NextResponse.json({ data: examList, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
