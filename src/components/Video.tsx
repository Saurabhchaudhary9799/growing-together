"use client"
import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

interface VideoProps {
  videoSrc: string; // URL of the video
  description: string; // Description of the video
  tags: string[]; // Array of tags
}

const Video: React.FC<VideoProps> = ({ videoSrc, description, tags }) => {
  const [starred,setStarred] = useState<boolean>(false)
  const [completed,setCompleted] = useState<boolean>(false)



  return (
    <div className="video">
      {/* Video Frame */}
      <iframe
        width="400"
        height="200"
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full"
      ></iframe>

      {/* Description */}
      <div className="flex items-start mt-4">
        <div>
          <p className=" text-gray-700">{description}</p>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`inline-block px-3 py-1 text-white rounded-full ${getTagColor(
                  tag
                )}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
           <span className="cursor-pointer" onClick={()=> setStarred(!starred)}>{starred ? <FaStar/> : <FaRegStar/>}</span>
           <span className="cursor-pointer" onClick={()=> setCompleted(!completed)}>{completed ? <FaCircleCheck/> : <FaRegCircleCheck/>}</span>
        </div>
      </div>
      <div className="bg-black text-white text-center p-2 rounded mt-2">
         Added By : Saurbh
      </div>
    </div>
  );
};

// Function to determine tag color based on the tag name
const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "react":
      return "bg-blue-500"; // Example color for React
    case "nextjs":
      return "bg-gray-800"; // Example color for Next.js
    case "javascript":
      return "bg-yellow-500"; // Example color for JavaScript
    default:
      return "bg-green-500"; // Default color
  }
};

export default Video;
