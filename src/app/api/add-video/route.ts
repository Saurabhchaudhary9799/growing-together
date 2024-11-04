// pages/api/add-video.ts

import { Video } from "../../../model/Video";
import dbConnect from "../../../lib/db";

interface MongoDBDuplicateKeyError extends Error {
  code: number;
  keyValue?: Record<string, unknown>;
}

export async function POST(request: Request) {
  await dbConnect();
  const { link, description, tags, addedBy } = await request.json();

  // Validation
  if (!link || !description || !tags || !addedBy) {
    return Response.json(
      { message: "Fill all the fields", success: false },
      { status: 400 }
    );
  }

  if (typeof description !== "string" || description.length > 500) {
    return Response.json(
      {
        message: "Description is required and must be 500 characters or fewer",
        success: false,
      },
      { status: 400 }
    );
  }

  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    return Response.json(
      { message: "Tags must be an array of strings.", success: false },
      { status: 400 }
    );
  }

  if (typeof addedBy !== "string") {
    return Response.json(
      { message: "addedBy must be a string.", success: false },
      { status: 400 }
    );
  }

  try {
    const newVideo = new Video({ link, description, tags, addedBy });
    await newVideo.save();
    return Response.json(
      { message: "Video added successfully", video: newVideo, success: true },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log("Error adding video:", error);

    // Type guard to check if error is a MongoDBDuplicateKeyError
    if (
      error instanceof Error &&
      (error as MongoDBDuplicateKeyError).code === 11000
    ) {
      const mongoError = error as MongoDBDuplicateKeyError;
      console.log("MongoDB Duplicate Key Error:", mongoError);
      return Response.json(
        {
          message:
            "Duplicate entry. The video link or another field already exists.",
          success: false,
        },
        { status: 409 }
      );
    } else {
      console.log("Unexpected Error:", error);
      return Response.json(
        { message: "Internal Server Error", error, success: false },
        { status: 500 }
      );
    }
  }
}
