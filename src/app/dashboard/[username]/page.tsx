"use client";
import Video from "@/components/Video";
import React, { useEffect, useState } from "react";
import AddItem from "@/components/AddItem";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton"

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
 
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://growing-together.vercel.app";
 
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/api/get-all-video`);
        const data = await response.json();
        if (data.success) {
          setVideos(data.videos);
        } else {
          console.log("error", data, response);
          setError("Failed to fetch videos");
        }
      } catch (err) {
        console.error(err);
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
  const addVideo = (newVideo: VideoType) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };
  const editVideo = (
    id: string,
    newData: { description: string; tags: string[] }
  ) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === id
          ? { ...video, description: newData.description, tags: newData.tags }
          : video
      )
    );
  };
  
 
  return (
    <div className="items mx-4 pt-5">
      <AddItem onAddVideo={addVideo} onAddArticle={() => {}} /> {/* Pass the addVideo function to AddItem */}
      {
        loading ? (<div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-10 mx-auto"><Skeleton className=" h-64 rounded" />
        <Skeleton className="" />
        <Skeleton className="" />
        <Skeleton className="" />

        </div>) : ( <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-10 mx-auto">
          {videos.map((video) => (
            <Video
            key={video._id}
            _id={video._id}
            videoSrc={video.link}
            description={video.description}
            tags={video.tags}
            addedBy={video.addedBy}
            onEdit={(newData) => editVideo(video._id, newData)}
            />
          ))}

          {
            error && <div className="text-red-500"> {error}</div>
          }
        </div>)
      }
   </div>  
  )}
  
export default Page;
