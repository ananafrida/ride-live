import { query } from "./_generated/server";

export const getLocations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("locations2").collect();  
  },
});