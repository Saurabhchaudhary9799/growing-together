// pages/api/get-all-videos.ts


// Connect to MongoDB
import dbConnect from "../../../lib/db";
import { Article } from "@/model/Article";

export async function GET() {
  await dbConnect();
  try {
    const articles = await Article.find();
    console.log(articles)
    return Response.json(
      { articles, success: true },
      { status: 200 }
    );
   
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error, success: false },
      { status: 500 }
    );
  }

}
