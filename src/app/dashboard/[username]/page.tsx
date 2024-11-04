"use client";
import Video from "@/components/Video";
import React, { useEffect, useState } from "react";
import AddItem from "@/components/AddItem"; // Ensure you import AddItem component
import { toast } from "@/hooks/use-toast";

interface VideoType {
  _id: string;
  link: string;
  description: string;
  tags: string[];
  addedBy: string;
}

const Page = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://growing-together.vercel.app"

  console.log(baseUrl)


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/get-all-video`);
        const data = await response.json();
        if (data.success) {
          setVideos(data.videos); // Assuming the response has this structure
        } else {
          setError("Failed to fetch videos");
        }
      } catch (err) {
        console.error(err); // Log the error
        toast({
          variant: "destructive",
          description: "Failed to fetch videos",
        });
        setError("An error occurred while fetching videos");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [baseUrl]);

  // Function to add a new video to the list
  const addVideo = (newVideo: VideoType) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  if (loading) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  if (error) {
    return <div>{error}</div>; // Display any error messages
  }

  return (
    <div className="items mx-4 pt-5">
      <AddItem onAddVideo={addVideo} onAddArticle={() => {}} /> {/* Pass the addVideo function to AddItem */}
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-10 mx-auto">
        {videos.map((video) => (
          <Video
            key={video._id}
            videoSrc={video.link} // Use the actual video link
            description={video.description}
            tags={video.tags}
            addedBy={video.addedBy}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
