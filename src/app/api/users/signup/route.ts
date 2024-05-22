import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
    try {
        if (!request.body) {
            return NextResponse.json({ error: "Invalid request", status: 400 });
        }
        const { name, email, password } = await request.json(); 

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists", status: 400 });
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            status: 201,
            savedUser,
        
        })
    } catch (error :any) {
        return NextResponse.json({error: error.message, status: 500});
    }
}