import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Answer from "@/models/answerModels";


connect();

export async function GET(request: NextRequest) {
  try {
    const userList = await Answer.aggregate([
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
          "user.name": 1,
          "user.email": 1,
          "user._id": 1,
        },
      },
      { $unwind: { path: "$user" } },
      {
        $group: {
          _id: "$user._id",
          email: { $first: "$user.email" },
          name: { $first: "$user.name" },
        },
      },
    ]);
    return NextResponse.json({ data: userList, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

