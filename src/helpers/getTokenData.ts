import jwt from "jsonwebtoken";

export async function getTokenData(token: any) {
  try {
    const decoderToken: any = await jwt.verify(token, process.env.JWT_SECRET!);
    return decoderToken.id;
  } catch (error: any) {
    throw new Error("Invalid token");
  }
}
