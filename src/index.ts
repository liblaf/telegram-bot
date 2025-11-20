import type { Hono } from "hono";
import { newHonoApp } from "./routes";

const app: Hono<{ Bindings: CloudflareBindings }> = newHonoApp();

export default app;
