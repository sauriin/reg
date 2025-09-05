"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jylogo from "./images/JYLogo.png"
import jaagologo from './images/Jaago2025Logo.png'
import ladderImage from './images/image.png'
import { useRouter } from "next/navigation";

export default function PrayerCard() {
  const cardRef = useRef(null);
  const [details, setDetails] = useState({ name: "", gender: "", lifeStatus: {} })
  const [loading, setLoading] = useState(true)
  const nav = useRouter()

  useEffect(() => {
    const storedDetails = window.localStorage.getItem("Details");
    if (storedDetails) {
      const dets = JSON.parse(storedDetails);
      setDetails(dets)
      console.log(dets.name);       // Access name
      console.log(dets.gender);     // Access gender
      console.log(dets.lifeStatus); // Access life status
    }
    else {
      nav.push("/")
    }

    setTimeout(()=>{
      setLoading(false);
    }, 500)

  }, [])

  const getPrayerHTML = () => {
    const prayer =
      details.gender === "male"
        ? `
          <h2 style="font-size: 1.25rem; font-weight: bold; color: #333; margin-bottom: 12px;">
            Eliora Prayer
          </h2>
          <p style="font-size: 0.95rem; color: #444; line-height: 1.6;">
            Heavenly Father, I, <strong>${details.name}</strong>, come before You today as Your son,
            seeking Your light to guide my path.
          </p>
          <p style="font-size: 0.95rem; color: #444; line-height: 1.6; margin-top: 12px;">
            Strengthen me to be a man of faith, courage, and integrity.
            Bless me in my journey ${details.lifeStatus === "Study"
          ? "as I grow in wisdom and knowledge"
          : "as I carry the responsibilities of my work"
        }.
          </p>
          <p style="font-size: 0.95rem; color: #444; line-height: 1.6; margin-top: 12px;">
            Prepare me for the Eliora retreat — to be renewed in Your Spirit and to become a beacon of Your light.
            Amen.
          </p>
        `
        : `
          <h2 style="font-size: 1.25rem; font-weight: bold; color: #333; margin-bottom: 12px;">
            Eliora Prayer
          </h2>
          <p style="font-size: 0.95rem; color: #444; line-height: 1.6;">
            Loving Father, I, <strong>${details.name}</strong>, come before You as Your daughter,
            seeking Your gentle light to lead my heart.
          </p>
          <p style="font-size: 0.95rem; color: #444; line-height: 1.6; margin-top: 12px;">
            Guide me ${details.lifeStatus === "Study"
          ? "as I grow in grace and understanding"
          : "as I serve in my responsibilities at work"
        }.
            Help me to nurture those around me and to radiate Your love in all I do.
          </p>
          <p style="font-size: 0.95rem; color: #444; line-height: 1.6; margin-top: 12px;">
            As I prepare for the Eliora retreat, fill me with Your Spirit and renew my heart.
            Amen.
          </p>
        `;

    return `
        <div style="
          background: rgb(137, 196, 255);
          width: 340px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 30px;
          text-align: center;
          font-family: 'Arial', sans-serif;
          position: relative;
        ">
          <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          ">
            <img src="${jylogo.src}" style="height: 48px;" />
            <img src="${jaagologo.src}" style="height: 48px;" />
          </div>
          ${prayer}
        </div>
      `;
  };

  function RegisterSuccessSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 animate-pulse px-6">
            {/* Skeleton for Image */}
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-6" />

            {/* Skeleton for Heading */}
            <div className="w-64 h-6 bg-gray-200 rounded mb-4" />

            {/* Skeleton for Subtext */}
            <div className="w-48 h-4 bg-gray-200 rounded mb-6" />

            {/* Skeleton for Retreat Info */}
            <div className="w-72 h-16 bg-gray-200 rounded mb-6" />

            {/* Skeleton for Prayer Card */}
            <div className="w-80 h-96 bg-gray-200 rounded-lg mb-6" />

            {/* Skeleton for Button */}
            <div className="w-48 h-10 bg-gray-300 rounded-full" />
        </div>
    );
}

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true });
    const link = document.createElement("a");
    link.download = `${details.name}-eliora-prayer.png`;
    link.href = dataUrl;
    link.click();
  };

  if(loading){
    return <RegisterSuccessSkeleton />
  }

  return (
    <div className="flex flex-col items-center py-10 space-y-6 fade-in-on-load">
      {/* Success Illustration */}
      <img
        src={ladderImage.src} // Replace with actual image path
        alt="Step towards God"
        className="h-auto"
      />

      {/* Success Message */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        You have taken one more step towards God!
      </h2>
      <p className="text-gray-600 text-center">
        Your registration was successful. Below is your personalized prayer card.
      </p>

      {/* Retreat Info */}
      <div className="text-center text-gray-700">
        <p className="text-sm">
          <strong>Date:</strong> 24–26 October 2025
        </p>
        <p className="text-sm">
          <strong>Place:</strong> Jagruti Animation, Netrang
        </p>
        <p className="mt-2 text-base font-medium text-orange-600">
          See you there!
        </p>
      </div>

      {/* Prayer Card */}
      <div
        ref={cardRef}
        dangerouslySetInnerHTML={{ __html: getPrayerHTML() }}
      />

      {/* Download Button */}
      <button
        onClick={downloadCard}
        className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Download Prayer Card
      </button>
    </div>


  );
}
