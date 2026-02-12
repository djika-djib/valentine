"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LovePage() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<any>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem(id as string);

    if (stored) {
      setData(JSON.parse(stored));
    }
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading or Page Not Found 💔
      </div>
    );
  }

  // 🔐 PASSWORD SCREEN
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-rose-700 mb-4">
            🔐 Private Love Page
          </h2>

          <p className="text-gray-600 mb-6">
            This page is protected. Enter the secret password to unlock 💝
          </p>

          <input
            type="password"
            placeholder="Enter Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 
            focus:ring-2 focus:ring-rose-400 focus:outline-none 
            text-black placeholder-gray-400"
          />

          <button
            onClick={() => {
              if (inputPassword === data.password) {
                setUnlocked(true);
              } else {
                alert("Wrong password 💔");
              }
            }}
            className="w-full bg-rose-500 text-white py-3 rounded-full font-semibold hover:bg-rose-600 transition"
          >
            Unlock My Heart 💘
          </button>
        </div>
      </div>
    );
  }

  // 💖 LOVE PAGE (UNLOCKED)
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-center px-6 overflow-hidden">
      
      {/* Floating Hearts */}
      <div className="heart left-10 text-3xl">❤️</div>
      <div className="heart left-1/4 text-2xl" style={{ animationDelay: "1s" }}>💖</div>
      <div className="heart left-1/2 text-4xl" style={{ animationDelay: "2s" }}>💕</div>
      <div className="heart right-1/4 text-3xl" style={{ animationDelay: "3s" }}>💘</div>
      <div className="heart right-10 text-2xl" style={{ animationDelay: "4s" }}>💝</div>

      <div className="max-w-2xl z-10">
        <h1 className="text-5xl font-bold mb-6">
          {data.yourName} ❤️ {data.partnerName}
        </h1>

        <p className="text-xl leading-relaxed whitespace-pre-line">
          {data.story}
        </p>

        <p className="mt-12 text-sm opacity-80">
          Made with 💝 on HeartLink 2026 (DjikaTech)
        </p>
      </div>
    </div>
  );
}
