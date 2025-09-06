export const dynamic = "force-dynamic";

"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useMemo } from "react";
import { toPng } from "html-to-image";
import PrayerCard from "./PrayerCard";

export default function RegisterSuccess() {
  const searchParams = useSearchParams();
  const fullName = searchParams.get("fullName");
  const gender = searchParams.get("gender");
  const lifeStatus = searchParams.get("lifeStatus");

  const cardRef = useRef(null);

  if (!fullName || !gender) {
    return (
      <p className="min-h-screen flex items-center justify-center">
        Invalid access
      </p>
    );
  }

  const blessings = [
    "May your heart be filled with wonder as you journey through Eliora.",
    "Blessed are you with courage and faith for the path ahead.",
    "May you find peace and calm amidst life’s challenges.",
    "May God's light guide your every step.",
    "Let your spirit be renewed and strengthened.",
  ];

  const verses = [
    "“Your word is a lamp to my feet and a light to my path.” — Psalm 119:105",
    "“I can do all things through Christ who strengthens me.” — Philippians 4:13",
    "“Trust in the Lord with all your heart...” — Proverbs 3:5",
  ];

  // lock blessing/verse so they don’t change on re-render
  const randomBlessing = useMemo(
    () => blessings[Math.floor(Math.random() * blessings.length)],
    []
  );
  const randomVerse = useMemo(
    () => verses[Math.floor(Math.random() * verses.length)],
    []
  );

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        foreignObjectRendering: true,
      });

      const link = document.createElement("a");
      link.download = `${fullName}-eliora-prayer.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating card:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 space-y-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        You have taken one more step towards God!
      </h2>
      <p className="text-gray-600 text-center">
        Your registration was successful. Below is your personalized prayer card.
      </p>

      {/* Prayer Card */}
      <PrayerCard
        ref={cardRef}
        fullName={fullName}
        gender={gender}
        lifeStatus={lifeStatus}
        blessing={randomBlessing}
        verse={randomVerse}
      />

      <button
        onClick={downloadCard}
        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Download Prayer Card
      </button>
    </div>
  );
}
