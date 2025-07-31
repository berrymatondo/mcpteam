import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const poles = await prisma.pole.findMany();
    return NextResponse.json(poles);
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to fetch poles" },
      { status: 500 }
    );
  }
}
