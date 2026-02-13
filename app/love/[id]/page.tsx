"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../lib/supabase";

export default function LovePage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<any>(null);
  const [inputPassword, setInputPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [displayedText, setDisplayedText] = useState("");
  const [timeLeft, setTimeLeft] = useState<any>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 🔹 Fetch from Supabase
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("love_pages")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) setData(data);
    };

    fetchData();
  }, [id]);

  // 🔹 GMT Countdown (UTC+0)
  useEffect(() => {
    const targetDate = new Date(Date.UTC(2026, 1, 14, 0, 0, 0));

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

  // 🔹 Typing Animation
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

  const toggleMusic = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 bg-black">
        Loading Love Page... 💘
      </div>
    );
  }

  // 🔐 PASSWORD PAGE
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-rose-900 to-black flex items-center justify-center px-4 text-pink-200">
        <div className="bg-black/40 backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-md text-center">

          <h2 className="text-3xl font-bold mb-4">
            🔐 Private Love Page
          </h2>

          {/* ⏳ GMT Countdown */}
          {timeLeft && (
            <div className="mb-6 bg-black/50 px-6 py-4 rounded-2xl">
              <p className="text-sm mb-2 opacity-80">
                💘 Valentine Begins (GMT) In:
              </p>
              <div className="flex justify-center gap-4 text-lg font-bold">
                <div>{timeLeft.days}d</div>
                <div>{timeLeft.hours}h</div>
                <div>{timeLeft.minutes}m</div>
                <div>{timeLeft.seconds}s</div>
              </div>
            </div>
          )}

          {/* 💌 Share Button */}
          <button
            onClick={() => {
              const url = window.location.href;
              const text = `💖 I made something special for you...\n${url}`;
              window.open(
                `https://wa.me/?text=${encodeURIComponent(text)}`,
                "_blank"
              );
            }}
            className="mb-6 bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition"
          >
            💌 Share on WhatsApp
          </button>

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

  // 💖 UNLOCKED LOVE PAGE
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-br from-black via-rose-900 to-gray-900 text-pink-200">

      {/* 🌹 Falling Petals */}
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

      {/* 🎵 Music */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="max-w-2xl z-10">

        <button
          onClick={toggleMusic}
          className="mb-6 bg-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-700 transition"
        >
          {isPlaying ? "⏸ Pause Our Song" : "🎵 Play Our Song"}
        </button>

        <h1 className="text-5xl font-bold mb-6">
          {data.your_name} ❤️ {data.partner_name}
        </h1>

        {/* 📸 Love Image */}
        {data.image_url && (
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <img
                src={data.image_url}
                alt="Love Memory"
                className="w-72 md:w-96 rounded-3xl shadow-[0_0_40px_rgba(255,105,180,0.6)] border-4 border-pink-300 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-3xl bg-pink-400 opacity-0 group-hover:opacity-10 transition duration-500"></div>
            </div>
          </div>
        )}

        <p className="text-xl leading-relaxed whitespace-pre-line min-h-[120px]">
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>

         {/* ✨ Signature */}
        <p className="mt-16 text-m opacity-60 tracking-wide">
          Made with 💘 by <span className="font-semibold text-pink-300">DjikaTech</span> © {new Date().getFullYear()}
        </p>

      </div>
    </div>
  );
}
