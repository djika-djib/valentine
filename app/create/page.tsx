"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    yourName: "",
    partnerName: "",
    story: "",
    password: "",
  });

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

    const { data, error } = await supabase
      .from("love_pages")
      .insert([
        {
          your_name: formData.yourName,
          partner_name: formData.partnerName,
          story: formData.story,
          password: formData.password,
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Something went wrong 😢");
      return;
    }

    // Redirect to dynamic love page using real database ID
    router.push(`/love/${data.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-rose-700 text-center mb-6">
          💌 Create Your Love Page
        </h1>

        {/* Your Name */}
        <input
          type="text"
          name="yourName"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />

        {/* Partner Name */}
        <input
          type="text"
          name="partnerName"
          placeholder="Partner's Name"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />

        {/* Love Story */}
        <textarea
          name="story"
          placeholder="Write your love message..."
          rows={4}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Set a Password"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />

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
