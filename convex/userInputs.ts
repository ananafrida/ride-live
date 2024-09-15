// mutations/userInputs.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertUserInput = mutation({
  args: {
    destination: v.string(),
    tripType: v.string(),
    budget: v.string(),
    description: v.string(),
  },
  handler: async (ctx, { destination, tripType, budget, description }) => {
    await ctx.db.insert("userInputs", {
      destination,
      tripType,
      budget,
      description,
    });
  },
});
