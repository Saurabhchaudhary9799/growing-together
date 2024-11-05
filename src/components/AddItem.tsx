import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlinePlus } from "react-icons/ai";

interface VideoType {
  _id: string;
  link: string;
  description: string;
  tags: string[];
  addedBy: string;
}

interface ArticleType {
  _id: string;
  link: string;
  description: string;
  tags: string[];
  addedBy: string;
}

interface AddItemProps {
  onAddVideo: (newItem: VideoType) => void;
  onAddArticle: (newItem: ArticleType) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAddVideo, onAddArticle }) => {
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [type, setType] = useState<"article" | "video">("article");
  const [loading, setLoading] = useState(false);

  const handleAddTag = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  function extractYouTubeID(link: string) {
    const match = link.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=))([^&?\/\s]{11})/
    );
    return match ? match[1] : null;
  }

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://growing-together.vercel.app";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const username = localStorage.getItem("user");

    if (!link || !description || tags.length === 0) {
      alert(`Please fill in all fields for ${type}s.`);
      return;
    }

    setLoading(true);

    try {
      if (type === "video") {
        const videoID = extractYouTubeID(link);
        const newLink = `https://www.youtube.com/embed/${videoID}`;

        const response = await axios.post(`${baseUrl}/api/add-video`, {
          link: newLink,
          description,
          tags,
          addedBy: username,
        });

        if (response.status === 201) {
          onAddVideo(response.data.video);
        } else {
          alert(response.data.message || "Failed to add video");
        }
      } else {
        const response = await axios.post(`${baseUrl}/api/add-article`, {
          link,
          description,
          tags,
          addedBy: username,
        });

        if (response.status === 201) {
          onAddArticle(response.data.article);
        } else {
          alert(response.data.message || "Failed to add article");
        }
      }

      setLink("");
      setDescription("");
      setTags([]);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        alert("Duplicate entry. This video or another field already exists.");
      } else {
        console.error(`Error adding ${type}:`, error);
        alert(`An error occurred while adding the ${type}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-black text-white py-2 px-6 rounded">
          Add
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new item.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="link" className="text-sm">
                Link
              </label>
              <input
                id="link"
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                className="border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-gray-200 p-2 rounded-full"
                aria-label="Add tag"
              >
                <AiOutlinePlus />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="type" className="text-sm">
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as "article" | "video")}
                className="border rounded px-3 py-2"
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Item"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddItem;
