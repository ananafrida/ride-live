import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
 tasks: defineTable({
   text: v.string(),
   isCompleted: v.boolean(),
 }),
 locations: defineTable({
   longitude: v.string(),
   latitude: v.string(),
 }),
});
