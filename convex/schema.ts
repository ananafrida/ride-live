import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  userInputs: defineTable({
    destination: v.string(),
    tripType: v.string(),
    budget: v.string(),
    description: v.string(),
  }),
});