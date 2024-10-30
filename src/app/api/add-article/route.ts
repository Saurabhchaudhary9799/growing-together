// pages/api/add-video.ts

import { Video } from '../../../model/Video';


// Connect to MongoDB (assuming a connection function)
import dbConnect  from '../../../lib/db';

export async function POST(request: Request) {
  await dbConnect();
  const { link, description, tags, addedBy } = await request.json();
    // Validation
    if (!link || !description || !tags || !addedBy) {
      return Response.json(
        { message: 'Fill all the field', success: false },
        { status: 400 }
      );

    }
    
    if (typeof description !== 'string' || description.length > 500) {
      return Response.json(
        { message: 'Description is required and must be 500 characters or fewer', success: false },
        { status: 400 }
      );

      
    }
    if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === 'string')) {
      return Response.json(
        { message: 'Tags must be an array of strings.', success: false },
        { status: 400 }
      );

      
    }
    if (typeof addedBy !== 'string') {
      return Response.json(
        { message: 'addedBy must be a string.', success: false },
        { status: 400 }
      );

    }

    try {
      const newVideo = new Video({ link, description, tags, addedBy });
      await newVideo.save();
      return Response.json(
        { message: 'Video added successfully',video: newVideo,success:true},
        { status: 201 }
      );
      
    } catch (error) {
      return Response.json(
        { message: 'Internal Server Error',error,success:false},
        { status: 500 }
      );
      
    }
}