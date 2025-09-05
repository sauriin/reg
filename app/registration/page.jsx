"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";
import Link from "next/link";
import RetreatHeader from "../components/retreatHeader";
import { useMutation } from "convex/react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "@/convex/_generated/api";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });

const initialFormState = {
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    parish: "",
    occupation: "",
    paymentMode: "",
    emergencyName: "",
    emergencyPhone: "",
};

export default function RegistrationPage() {
    const createRegistration = useMutation(api.registration.create);
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validate inputs
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.gender) newErrors.gender = "Gender is required.";

        if (!formData.dob) {
            newErrors.dob = "Date of birth is required.";
        } else {
            const dob = new Date(formData.dob);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
            if (age < 16) newErrors.dob = "You must be at least 16 years old.";
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit WhatsApp number.";
        }

        if (!formData.emergencyName.trim()) {
            newErrors.emergencyName = "Emergency contact name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(formData.emergencyName)) {
            newErrors.emergencyName = "Name must contain only letters.";
        }

        if (!phoneRegex.test(formData.emergencyPhone)) {
            newErrors.emergencyPhone = "Enter a valid 10-digit emergency number.";
        }

        if (formData.phone && formData.phone === formData.emergencyPhone) {
            newErrors.emergencyPhone =
                "Emergency number cannot be same as WhatsApp number.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.parish.trim()) newErrors.parish = "Parish is required.";
        if (!formData.occupation) newErrors.occupation = "Occupation is required.";
        if (!formData.paymentMode) newErrors.paymentMode = "Select a payment mode.";

        return newErrors;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            toast.error("⚠️ Please fix the errors before submitting.");
            return;
        }

        try {
            await createRegistration(formData);
            toast.success("✅ Registration submitted successfully!");
            setFormData(initialFormState);
        } catch (err) {
            console.error(err);
            toast.error("❌ Something went wrong. Try again.");
        }
    };

    // Styles
    const inputClass =
        "w-full p-4 border rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-cyan-500 transition placeholder-gray-400";

    const Label = ({ children, required }) => (
        <label className="block font-semibold text-indigo-600 mb-2">
            {children} {required && <span className="text-red-600">*</span>}
        </label>
    );

    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Toast Container */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* Background */}
            <div className="absolute inset-0">
                <div className="sm:hidden absolute inset-0">
                    <Image
                        src="/eternal-phone.png"
                        alt="Eliora Mobile"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div className="hidden sm:block absolute inset-0">
                    <Image
                        src="/eternal.png"
                        alt="Eliora Desktop"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-6 left-6 z-50"
            >
                <Link href="/">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-sm text-white font-medium rounded-lg hover:bg-white/30 transition mb-2">
                        ← Back to Home
                    </button>
                </Link>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center py-20 px-4 min-h-screen">
                <div className="w-full max-w-4xl space-y-12">
                    <RetreatHeader />

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12"
                    >
                        <h2
                            className={`text-3xl sm:text-4xl font-bold text-blue-900 mb-8 ${cinzel.className}`}
                        >
                            Registration Form
                        </h2>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                        >
                            {/* Name */}
                            <div className="sm:col-span-2">
                                <Label required>Your Name</Label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <p className="text-red-600 mt-2">{errors.name}</p>
                                )}
                            </div>

                            {/* Gender */}
                            <div>
                                <Label required>Gender</Label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-red-600 mt-2">{errors.gender}</p>
                                )}
                            </div>

                            {/* DOB */}
                            <div>
                                <Label required>Date of Birth</Label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {errors.dob && (
                                    <p className="text-red-600 mt-2">{errors.dob}</p>
                                )}
                            </div>

                            {/* WhatsApp Phone */}
                            <div>
                                <Label required>Contact Number (WhatsApp)</Label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Enter WhatsApp number"
                                />
                                {errors.phone && (
                                    <p className="text-red-600 mt-2">{errors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <Label required>Email Address</Label>
                                <input
                                    suppressHydrationWarning
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Enter email address"
                                />
                                {errors.email && (
                                    <p className="text-red-600 mt-2">{errors.email}</p>
                                )}
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <Label>Address</Label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`${inputClass} min-h-[120px]`}
                                    placeholder="Enter your complete address"
                                />
                            </div>

                            {/* Parish */}
                            <div>
                                <Label required>Parish</Label>
                                <input
                                    type="text"
                                    name="parish"
                                    value={formData.parish}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Enter your parish name"
                                />
                                {errors.parish && (
                                    <p className="text-red-600 mt-2">{errors.parish}</p>
                                )}
                            </div>

                            {/* Occupation */}
                            <div>
                                <Label required>What are you doing?</Label>
                                <select
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    className={inputClass}
                                >
                                    <option value="">Select Occupation</option>
                                    <option value="Studying">Studying</option>
                                    <option value="Working">Working</option>
                                </select>
                                {errors.occupation && (
                                    <p className="text-red-600 mt-2">{errors.occupation}</p>
                                )}
                            </div>

                            {/* Payment Mode */}
                            <div className="sm:col-span-2">
                                <Label required>Mode of Payment of Registration</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <label className="flex items-center gap-3 p-4 rounded-xl border bg-white text-black hover:bg-gray-100 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="Online Payment"
                                            checked={formData.paymentMode === "Online Payment"}
                                            onChange={handleChange}
                                            className="h-5 w-5 text-cyan-600"
                                        />
                                        <span>Online Payment (details below)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 rounded-xl border bg-white text-black hover:bg-gray-100 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="Cash on Venue"
                                            checked={formData.paymentMode === "Cash on Venue"}
                                            onChange={handleChange}
                                            className="h-5 w-5 text-cyan-600"
                                        />
                                        <span>Cash on Venue</span>
                                    </label>
                                </div>
                                {errors.paymentMode && (
                                    <p className="text-red-600 mb-4">{errors.paymentMode}</p>
                                )}

                                <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 border">
                                    <Image
                                        src="/qr-code.png"
                                        alt="Payment QR Code"
                                        width={200}
                                        height={200}
                                        className="rounded-lg"
                                    />
                                    <p className="mt-4 font-semibold text-gray-800 text-lg">
                                        UPI: something17@oksbi
                                    </p>
                                    <p className="text-gray-600 text-center mt-1">
                                        Scan to pay ₹1000 registration fee
                                    </p>
                                </div>
                            </div>

                            {/* Emergency Contact Name */}
                            <div>
                                <Label required>Emergency Contact Name</Label>
                                <input
                                    type="text"
                                    name="emergencyName"
                                    value={formData.emergencyName}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Enter emergency contact name"
                                />
                                {errors.emergencyName && (
                                    <p className="text-red-600 mt-2">{errors.emergencyName}</p>
                                )}
                            </div>

                            {/* Emergency Contact Number */}
                            <div>
                                <Label required>Emergency Contact Number</Label>
                                <input
                                    type="tel"
                                    name="emergencyPhone"
                                    value={formData.emergencyPhone}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="Enter emergency contact number"
                                />
                                {errors.emergencyPhone && (
                                    <p className="text-red-600 mt-2">{errors.emergencyPhone}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.div
                                className="sm:col-span-2 mt-6"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow hover:from-cyan-500 hover:to-indigo-500 transition"
                                >
                                    Submit Registration
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
