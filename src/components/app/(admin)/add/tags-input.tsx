import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TagsInput = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) => {
  const [tag, setTag] = useState("");

  const addTag = () => {
    if (tag.trim() && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add a tag..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTag()}
        />
        <Button onClick={addTag}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((t, i) => (
          <div
            key={i}
            className="px-3 py-1  bg-gray-200 rounded-lg flex items-center"
          >
            <span>{t}</span>
            <button
              className="ml-2 text-red-500 cursor-pointer"
              onClick={() => removeTag(i)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
