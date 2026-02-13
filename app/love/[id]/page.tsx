"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function LovePage() {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState<any>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [displayedText, setDisplayedText] = useState("");
  const [timeLeft, setTimeLeft] = useState<any>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔹 Load Data
  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem(id as string);
    if (stored) setData(JSON.parse(stored));
  }, [id]);

  // 🔹 Stable Typing Animation (NO SKIP, NO UNDEFINED)
  useEffect(() => {
    if (!unlocked || !data?.story) return;

    const fullText = data.story;
    let currentIndex = 0;

    setDisplayedText("");

    const interval = setInterval(() => {
      currentIndex++;

      setDisplayedText(fullText.slice(0, currentIndex));

      if (currentIndex >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [unlocked, data]);

  // 🔹 Countdown
  useEffect(() => {
    const targetDate = new Date("2026-02-14T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading or Page Not Found 💔
      </div>
    );
  }

  // 🔐 PASSWORD SCREEN
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-rose-900 to-black flex items-center justify-center px-4 text-pink-200">
        <div className="bg-black/40 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">
            🔐 Private Love Page
          </h2>

          <input
            type="password"
            placeholder="Enter Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full p-3 border border-pink-300 bg-transparent rounded-lg mb-6 text-pink-200 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <button
            onClick={() => {
              if (inputPassword === data.password) {
                setUnlocked(true);
              } else {
                alert("Wrong password 💔");
              }
            }}
            className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition"
          >
            Unlock My Heart 💘
          </button>
        </div>
      </div>
    );
  }

  // 💖 LOVE PAGE (DARK MODE)
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-br from-black via-rose-900 to-gray-900 text-pink-200 transition-all duration-700">

      {/* 🌹 Falling Rose Petals */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="petal text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          🌹
        </div>
      ))}

      {/* ❤️ Floating Hearts */}
      <div className="heart left-10 text-3xl">❤️</div>
      <div className="heart left-1/4 text-2xl" style={{ animationDelay: "1s" }}>💖</div>
      <div className="heart left-1/2 text-4xl" style={{ animationDelay: "2s" }}>💕</div>
      <div className="heart right-1/4 text-3xl" style={{ animationDelay: "3s" }}>💘</div>
      <div className="heart right-10 text-2xl" style={{ animationDelay: "4s" }}>💝</div>

      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="max-w-2xl z-10 animate-fadeIn">

        {/* ⏳ Countdown */}
        {timeLeft && (
          <div className="mb-6 bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl">
            <p className="text-lg font-semibold mb-2">
              💘 Valentine Begins In:
            </p>
            <div className="flex justify-center gap-6 text-xl font-bold">
              <div>{timeLeft.days}d</div>
              <div>{timeLeft.hours}h</div>
              <div>{timeLeft.minutes}m</div>
              <div>{timeLeft.seconds}s</div>
            </div>
          </div>
        )}

        {/* 🎵 Music Button */}
        <button
          onClick={toggleMusic}
          className="mb-6 bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition"
        >
          {isPlaying ? "⏸ Pause Our Song" : "🎵 Play Our Song"}
        </button>

        <h1 className="text-5xl font-bold mb-6">
          {data.yourName} ❤️ {data.partnerName}
        </h1>

        {/* ⌨ Typing Text */}
        <p className="text-xl leading-relaxed whitespace-pre-line min-h-[120px]">
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>

        <p className="mt-12 text-m opacity-70">
          Made with 💝 on HeartLink 2026 (DjikaTech)
        </p>
      </div>
    </div>
  );
}
