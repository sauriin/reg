import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    name: v.string(),
    gender: v.string(),
    dob: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.optional(v.string()),
    parish: v.string(),
    occupation: v.string(),
    paymentMode: v.string(), // store one selected option
    emergencyName: v.string(),
    emergencyPhone: v.string(),
    createdAt: v.number(), // timestamp
  }),
});
