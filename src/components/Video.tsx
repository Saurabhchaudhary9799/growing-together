"use client";
import React, { useState } from "react";
import { FaRegStar, FaRegEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface VideoProps {
  _id: string;
  videoSrc: string;
  description: string;
  tags: string[];
  addedBy: string;
  onEdit?: (newData: { description: string; tags: string[] }) => void;
}
const Video: React.FC<VideoProps> = ({
  _id: id,
  videoSrc,
  description,
  tags,
  addedBy,
  onEdit,
}) => {
  const [starred, setStarred] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editedTags, setEditedTags] = useState<string>(tags.join(", "));
  const [editedDescription, setEditedDescription] =
    useState<string>(description);
  const { toast } = useToast();
  console.log("yha par2", videoSrc, description, tags, id);
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://growing-together.vercel.app";
  const handleSubmit = async () => {
    const newTags = editedTags.split(",").map((tag) => tag.trim());
    const updatedData = { description: editedDescription, tags: newTags };
    try {
      console.log("Sending update request:", {
        url: `${baseUrl}/api/videos/${id}`,
        data: updatedData,
      });
      await axios.patch(`${baseUrl}/api/update-video-info/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      onEdit?.(updatedData);
      toast({ description: "Video updated successfully" });
    } catch (error) {
      toast({ variant: "destructive", description: "Failed to update video" });
      console.error("Error updating video:", error);
    } finally {
      setIsEditModalOpen(false);
    }
  };
  return (
    <div className="video">
      {" "}
      {/* Video Frame */}{" "}
      <iframe
        width="400"
        height="200"
        loading="lazy"
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full"
      ></iframe>{" "}
      {/* Description */}{" "}
      <div className="flex items-start justify-between mt-4">
        {" "}
        <div>
          {" "}
          <p className="text-gray-700">{description}</p> {/* Tags */}{" "}
          <div className="mt-2 flex flex-wrap gap-2">
            {" "}
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`inline-block px-3 py-1 text-white rounded-full ${getTagColor(
                  tag
                )}`}
              >
                {" "}
                {tag}{" "}
              </span>
            ))}{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex flex-col gap-y-2">
          {" "}
          <span className="cursor-pointer" onClick={() => setStarred(!starred)}>
            {" "}
            {starred ? <FaStar /> : <FaRegStar />}{" "}
          </span>{" "}
          <span
            className="cursor-pointer"
            onClick={() => setIsEditModalOpen(true)}
          >
            {" "}
            <FaRegEdit />{" "}
          </span>{" "}
          <span
            className="cursor-pointer"
            onClick={() => setCompleted(!completed)}
          >
            {" "}
            {completed ? <FaCircleCheck /> : <FaRegCircleCheck />}{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <div className="bg-black text-white text-center p-2 rounded mt-2">
        {" "}
        {`Added By : ${addedBy}`}{" "}
      </div>{" "}
      {/* Edit Modal */}{" "}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        {" "}
        <DialogContent className="sm:max-w-[425px]">
          {" "}
          <DialogHeader>
            {" "}
            <DialogTitle>Edit Video Details</DialogTitle>{" "}
          </DialogHeader>{" "}
          <div className="grid gap-4 py-4">
            {" "}
            <div className="grid gap-2">
              {" "}
              <Label htmlFor="videoSrc">Video Source (Non-editable)</Label>{" "}
              <Input id="videoSrc" value={videoSrc} disabled />{" "}
            </div>{" "}
            <div className="grid gap-2">
              {" "}
              <Label htmlFor="description">Description</Label>{" "}
              <Textarea
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="grid gap-2">
              {" "}
              <Label htmlFor="tags">Tags (comma-separated)</Label>{" "}
              <Input
                id="tags"
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                placeholder="React, NextJS, JavaScript"
              />{" "}
            </div>{" "}
            <div className="grid gap-2">
              {" "}
              <Label htmlFor="addedBy">Added By (Non-editable)</Label>{" "}
              <Input id="addedBy" value={addedBy} disabled />{" "}
            </div>{" "}
          </div>{" "}
          <DialogFooter>
            {" "}
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              {" "}
              Cancel{" "}
            </Button>{" "}
            <Button onClick={handleSubmit}>Save Changes</Button>{" "}
          </DialogFooter>{" "}
        </DialogContent>{" "}
      </Dialog>{" "}
    </div>
  );
};
const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "react":
      return "bg-blue-500";
    case "nextjs":
      return "bg-gray-800";
    case "javascript":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
};
export default Video;
