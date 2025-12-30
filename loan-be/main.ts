import { createClient } from "@supabase/supabase-js";

const url = Deno.env.get("SUPABASE_URL") ??
  "https://cvxlcwykxupqkavwvsmx.supabase.co";
const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase
    .from("denoTest")
    .insert({ message: `Hello @ ${new Date().toISOString()}` })
    .select()
    .maybeSingle();

  if (error) {
    console.error("Insert failed:", error.message);
    console.error(
      "Hint: If this is an RLS error, either disable RLS on 'demo' or add a policy allowing anon inserts.",
    );
    return;
  }

  console.log("Inserted row:", data);
}

if (import.meta.main) main();
