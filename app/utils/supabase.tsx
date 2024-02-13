import { createClient } from "@supabase/supabase-js";

const sb_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (sb_url === undefined) {
  throw new Error("Supabase URL not found");
}
const sb_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (sb_key === undefined) {
  throw new Error("Supabase Key not found");
}

export const supabase = createClient(sb_url, sb_key);

