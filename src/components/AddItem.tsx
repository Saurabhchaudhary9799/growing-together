import React, { useState } from 'react';
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

interface AddItemProps {
  onAdd: (newItem: VideoType) => void; // Use VideoType instead of any
}

const AddItem: React.FC<AddItemProps> = ({ onAdd }) => {
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [type, setType] = useState<'article' | 'video'>('article');

  const handleAddTag = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const username = localStorage.getItem("user");
    const newItem = { link, description, tags, type };

    if (type === 'video') {
      if (!link || !description || tags.length === 0) {
        alert('Please fill in all fields for videos.');
        return;
      }

      try {
        const response = await fetch('https://growing-together.vercel.app/api/add-video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ link, description, tags, addedBy: username })
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Video added successfully:", data);
          onAdd(data.video); // Call the onAdd prop to update the video list
          setLink('');
          setDescription('');
          setTags([]);
        } else {
          alert(data.message || 'Failed to add video');
        }
      } catch (error) {
        console.error("Error adding video:", error);
        alert('An error occurred while adding the video');
      }
    } else {
      // Handle article submission logic here
      console.log("New item:", newItem);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-black text-white py-2 px-6 rounded">Add</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new item.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="link" className="text-sm">Link</label>
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
              <label htmlFor="description" className="text-sm">Description</label>
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
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="type" className="text-sm">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as 'article' | 'video')}
                className="border rounded px-3 py-2"
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded"
            >
              Add Item
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddItem;
