"use client";

import { forwardRef } from "react";

const PrayerCard = forwardRef(({ fullName, gender, lifeStatus, blessing, verse }, ref) => {
    return (
        <div
            ref={ref}
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
                <img src="/images/JYLogo.png" style={{ height: 48 }} crossOrigin="anonymous" />
                <img src="/images/Jaago2025Logo.png" style={{ height: 48 }} crossOrigin="anonymous" />
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
                    "{blessing}"
                </p>
                <p style={{ marginTop: 12, fontSize: 12, color: "#444" }}>
                    {verse}
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
});

PrayerCard.displayName = "PrayerCard";
export default PrayerCard;
