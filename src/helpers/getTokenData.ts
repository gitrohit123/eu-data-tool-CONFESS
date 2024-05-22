import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getTokenData(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decoderToken:any = jwt.verify(token, process.env.JWT_SECRET!);
        return decoderToken.id;
    } catch (error: any) {
        throw new Error("Invalid token");
    }
}