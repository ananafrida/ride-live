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
  locations: defineTable({
    longitude: v.float64(), 
    latitude: v.float64(),  
  }),
  locations2: defineTable({
    locationName: v.string(),
    longitude: v.float64(), 
    latitude: v.float64(),  
  }),
});
