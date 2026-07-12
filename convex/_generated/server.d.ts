import {
  GenericActionCtx,
  GenericQueryCtx,
  GenericMutationCtx,
} from "convex/server";

export declare const query: any;
export declare const mutation: any;
export declare const action: any;

export type QueryCtx = GenericQueryCtx<any>;
export type MutationCtx = GenericMutationCtx<any>;
export type ActionCtx = GenericActionCtx<any>;
