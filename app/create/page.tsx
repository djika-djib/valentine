"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function CreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    yourName: "",
    partnerName: "",
    story: "",
    password: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.yourName ||
      !formData.partnerName ||
      !formData.story ||
      !formData.password
    ) {
      alert("Please fill all fields 💔");
      return;
    }

    setLoading(true);

    let imageUrl = null;

    // 📸 Upload Image If Exists
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("love-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Image upload failed 😢");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("love-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // 💾 Insert Into Database
    const { data, error } = await supabase
      .from("love_pages")
      .insert([
        {
          your_name: formData.yourName,
          partner_name: formData.partnerName,
          story: formData.story,
          password: formData.password,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert("Something went wrong 😢");
      return;
    }

    router.push(`/love/${data.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">

        <h1 className="text-3xl font-bold text-rose-700 text-center mb-6">
          💌 Create Your Love Page
        </h1>

        <input
          type="text"
          name="yourName"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 text-black"
        />

        <input
          type="text"
          name="partnerName"
          placeholder="Partner's Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 text-black"
        />

        <textarea
          name="story"
          placeholder="Write your love message..."
          rows={4}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 text-black"
        />

        <input
          type="password"
          name="password"
          placeholder="Set a Password"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 text-black"
        />

        {/* 📸 Image Upload */}
        <div className="mb-6">
          <label className="block text-sm text-black font-medium mb-2">
            Add a Special Photo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files ? e.target.files[0] : null)
            }
            className="w-full text-black"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-rose-500 text-white py-3 rounded-full font-semibold hover:bg-rose-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Generate Love Link 💘"}
        </button>

      </div>
    </div>
  );
}
