import { apiURL } from "@/constanst";
import { NextRequest, NextResponse } from "next/server";

//@ts-ignore
export async function GET(): any {
  return await fetch(`${apiURL}/cms/home-page`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
