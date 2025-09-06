"use client";

import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { toPng } from "html-to-image";

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

  const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];

  const PrayerCard = () => {
    return (
      <div
        ref={cardRef}
        style={{
          width: 400,
          height: 600,
          background: "linear-gradient(180deg, #89c4ff 0%, #ffffff 100%)",
          border: "2px solid #ddd",
          borderRadius: 16,
          padding: 30,
          fontFamily: "Arial, sans-serif",
          color: "#333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header logos */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src="/images/JYLogo.png"
            style={{ height: 48 }}
            crossOrigin="anonymous"
          />
          <img
            src="/images/Jaago2025Logo.png"
            style={{ height: 48 }}
            crossOrigin="anonymous"
          />
        </div>

        {/* Main text */}
        <div>
          <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6 }}>
            {gender.toLowerCase() === "male"
              ? `Heavenly Father, I, ${fullName}, come before You today as Your son, seeking Your light to guide my path.`
              : `Loving Father, I, ${fullName}, come before You as Your daughter, seeking Your gentle light to lead my heart.`}
          </p>

          <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6 }}>
            {lifeStatus === "Study"
              ? "Guide me as I grow in wisdom and understanding."
              : "Strengthen me as I serve faithfully in my work and life responsibilities."}
          </p>

          <p style={{ marginTop: 20, fontStyle: "italic", color: "#555" }}>
            "{randomBlessing}"
          </p>
          <p style={{ marginTop: 12, fontSize: 12, color: "#444" }}>
            {randomVerse}
          </p>
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: 20,
            fontWeight: "bold",
            color: "#FF6F00",
            textAlign: "right",
          }}
        >
          Eliora 2025
        </p>
      </div>
    );
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        foreignObjectRendering: true, // important fix
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
      <PrayerCard />

      <button
        onClick={downloadCard}
        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Download Prayer Card
      </button>
    </div>
  );
}
