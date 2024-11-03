// pages/api/get-all-videos.ts

import { Video } from "../../../model/Video";

// Connect to MongoDB
import dbConnect from "../../../lib/db";

export async function GET() {
  await dbConnect();
  try {
    const videos = await Video.find();
    return Response.json(
      { videos, success: true },
      { status: 200 }
    );
   
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error, success: false },
      { status: 500 }
    );
  }

}
