import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import { createClient } from "@supabase/supabase-js";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const app = new Application();
const router = new Router();

router.get("/api/customers", async (context) => {
  const { data, error } = await supabase
    .from("denoTest")
    .select('id, "First Name", "Last Name", "Email", "Company", "Country"')
    .order("id", { ascending: false });

  if (error) {
    context.response.status = 500;
    context.response.body = { error: error.message };
    return;
  }

  context.response.body = data ?? [];
});

router.get("/api/customers/:id", async (context) => {
  const id = Number(context.params.id);

  if (!Number.isFinite(id)) {
    context.response.status = 400;
    context.response.body = { error: "Invalid id" };
    return;
  }

  const { data, error } = await supabase
    .from("denoTest")
    .select(
      'id, "First Name", "Last Name", "Email", "Company", "Country", "City", "Phone 1", "Phone 2", "Subscription Date", "Website", message, created_at',
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    context.response.status = 500;
    context.response.body = { error: error.message };
    return;
  }

  if (!data) {
    context.response.status = 404;
    context.response.body = { error: "Not found" };
    return;
  }

  context.response.body = data;
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/dist`,
  `${Deno.cwd()}/public`,
]));

if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
