"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function EditProfile() {
  const [profile, setProfile] = useState({
    image: "/default-avatar.png", // Default avatar
    fullName: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  });

  const [loading, setLoading] = useState(false);

  // Dropzone logic for image upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfile((prev) => ({ ...prev, image: imageUrl }));
      }
    },
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setLoading(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 p-6"
    >
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Profile Picture Upload */}
          <div className="flex justify-center mb-6">
            <div
              {...getRootProps()}
              className="relative w-32 h-32 rounded-full border-4 border-gray-300 flex justify-center items-center overflow-hidden cursor-pointer hover:border-blue-500 transition"
            >
              <input {...getInputProps()} />
              <Image
                src={profile.image}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <Input
              value={profile.fullName}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, fullName: e.target.value }))
              }
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <Input
              value={profile.role}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, role: e.target.value }))
              }
            />
          </div>

          {/* Save Button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="mt-6 flex justify-center"
          >
            <Button className="w-full" disabled={loading} onClick={handleSave}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
