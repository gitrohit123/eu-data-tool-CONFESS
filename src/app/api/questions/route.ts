import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return NextResponse.json({ error: "Invalid request", status: 400 });
    }
    const body = await request.json();
    console.log(body);
    const question = new Question(body);
    console.log(question);
    const savedQuestion = await question.save();
    return NextResponse.json({ data: savedQuestion, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
