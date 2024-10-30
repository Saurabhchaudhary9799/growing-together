import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlinePlus } from "react-icons/ai"; // Import an add icon (install react-icons if needed)

const AddItem: React.FC = () => {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newItem = { link, description, tags, type };
    console.log("New item:", newItem);
    // Add your submit logic here
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
                type="url"
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
            
            {/* Display added tags */}
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
