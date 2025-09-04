"use client";

import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function RetreatHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-200"
        >
            <div className="p-8 sm:p-12">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text mb-6 text-left ${cinzel.className}`}
                >
                    ELIORA – God is my light!
                </motion.h1>

                {/* Bible Verse */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="italic text-gray-700 mb-6 text-left text-lg sm:text-xl"
                >
                    "Your word is a lamp to my feet and a light to my path." – Psalm 119:105
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-800 mb-8 text-lg sm:text-xl text-left leading-relaxed"
                >
                    <span className="font-bold text-indigo-600">Eliora 2025</span> – An
                    Initial Retreat for the Diocese of Vadodara. Return to where you belong, in
                    God's love!
                </motion.p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[
                        { icon: "📅", label: "Dates", value: "24 – 26 Oct, 2025" },
                        { icon: "📍", label: "Venue", value: "Netrang" },
                        { icon: "🗣️", label: "Language", value: "English" },
                        { icon: "👥", label: "Age Group", value: "16 – 30 years" },
                        {
                            icon: "💰",
                            label: "Registration Fee",
                            value: "₹1000 (includes travel)",
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-white to-cyan-50 rounded-xl p-4 border border-cyan-200 shadow-sm"
                        >
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className="font-bold text-blue-900 text-sm">{item.label}</div>
                            <div className="text-gray-700">{item.value}</div>
                        </div>
                    ))}
                </div>

                {/* Coordinators */}
                <div className="space-y-6">
                    <h3
                        className={`text-xl font-bold text-indigo-700 mb-4 ${cinzel.className}`}
                    >
                        Contact Coordinators
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Honey Chavda",
                                role: "General Coordinator",
                                phone: "+91 63520 55646",
                            },
                            {
                                name: "Francis Tellis",
                                role: "Program Coordinator",
                                phone: "+91 99980 71630",
                            },
                            {
                                name: "Sejal Macwan",
                                role: "Mobilization In-Charge",
                                phone: "+91 93134 33681",
                            },
                        ].map((person, idx) => (
                            <div
                                key={idx}
                                className="bg-white/95 rounded-xl p-6 border border-cyan-200 shadow-sm"
                            >
                                <h4 className="text-blue-900 font-bold text-lg mb-1">
                                    {person.name}
                                </h4>
                                <p className="text-gray-600 mb-3">{person.role}</p>
                                <a
                                    href={`tel:${person.phone}`}
                                    className="flex items-center gap-2 text-indigo-600 font-medium hover:text-cyan-600"
                                >
                                    📞 {person.phone}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
