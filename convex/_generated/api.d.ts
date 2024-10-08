/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as generateCoor from "../generateCoor.js";
import type * as insertCoor from "../insertCoor.js";
import type * as locations from "../locations.js";
import type * as tasks from "../tasks.js";
import type * as userInputs from "../userInputs.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  generateCoor: typeof generateCoor;
  insertCoor: typeof insertCoor;
  locations: typeof locations;
  tasks: typeof tasks;
  userInputs: typeof userInputs;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
