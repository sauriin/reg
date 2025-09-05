import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    gender: v.string(),
    dob: v.string(),
    phone: v.string(),
    email: v.string(),
    address: v.optional(v.string()),
    parish: v.string(),
    occupation: v.string(),
    paymentMode: v.string(),
    emergencyName: v.string(),
    emergencyPhone: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("registrations", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
