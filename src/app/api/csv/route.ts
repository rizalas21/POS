import { NextRequest, NextResponse } from "next/server";
import { Parser } from "json2csv";

export default async function csv(req: NextRequest) {
  try {
    const parser = new Parser();
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(error);
  }
}

// dataTable
// :
// Array(3)
// 0
// :
// {month: 'Jan 26', expense: '0', revenue: '5000', earning: '5000'}
// 1
// :
// {month: 'Feb 26', expense: '50000', revenue: '44000', earning: '-6000'}
// 2
// :
// {month: 'Mar 26', expense: '0', revenue: '96000', earning: '96000'}
