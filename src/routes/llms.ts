import {
  createHtmlFromOpenApi,
  createMarkdownFromOpenApi,
} from "@scalar/openapi-to-markdown";
import { type HonoOpenAPIRouterType, OpenAPIRoute } from "chanfana";
import type { Env, Hono, Schema } from "hono";
import type { Context } from "../types";

export function registerLLMRoutes<
  E extends Env,
  S extends Schema,
  BasePath extends string,
>(
  app: Hono<E, S, BasePath>,
  openapi: HonoOpenAPIRouterType<E, S, BasePath>,
): void {
  class LLMsMarkdown extends OpenAPIRoute {
    override async handle(c: Context): Promise<Response> {
      const response = await app.request("/openapi.json");
      const content: string = await response.text();
      const markdown: string = await createMarkdownFromOpenApi(content);
      return c.text(markdown);
    }
  }

  class LLMsHTML extends OpenAPIRoute {
    override async handle(c: Context): Promise<Response> {
      const response = await app.request("/openapi.json");
      const content: string = await response.text();
      const html: string = await createHtmlFromOpenApi(content);
      return c.html(html);
    }
  }

  openapi.get("/llms.html", LLMsHTML);
  openapi.get("/llms.txt", LLMsMarkdown);
}
