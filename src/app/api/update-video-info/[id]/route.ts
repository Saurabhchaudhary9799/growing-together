import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import { Video } from "@/model/Video";

export async function PATCH(
  request: NextRequest,
  segmentData: { params: Promise<{ id: string }> }
) {
  const params = await segmentData.params;
  console.log("Received PATCH request for ID:", params.id);

  try {
    // 1. Check if the ID is valid before doing anything else
    if (!mongoose.isValidObjectId(params.id)) {
      console.log("Invalid MongoDB ID format:", params.id);
      return NextResponse.json(
        { error: "Invalid video ID format" },
        { status: 400 }
      );
    }

    // 2. Parse the request body early to catch any JSON parsing errors
    let body;
    try {
      body = await request.json();
      console.log("Request body:", body);
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB
    await dbConnect();
    console.log("MongoDB connection established");

    // 4. Validate the update data
    if (!body.description && (!body.tags || !Array.isArray(body.tags))) {
      console.log("Invalid update data:", body);
      return NextResponse.json(
        {
          error: "Invalid update data. Description or tags array is required.",
        },
        { status: 400 }
      );
    }

    // 5. Attempt to find the video first
    const existingVideo = await Video.findById(params.id);
    if (!existingVideo) {
      console.log("Video not found:", params.id);
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // 6. Perform the update
    const updateData = {
      ...(body.description && { description: body.description }),
      ...(body.tags && { tags: body.tags }),
    };

    console.log("Updating with data:", updateData);

    const updatedVideo = await Video.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    console.log("Update result:", updatedVideo);

    // 7. Return the response
    return NextResponse.json({
      message: "Video updated successfully",
      data: updatedVideo,
    });
  } catch (error) {
    console.error("Error in PATCH route:", error);

    // Specific error handling
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }

    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json(
        { error: "Invalid ID format", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
