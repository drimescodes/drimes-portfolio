import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uczcbonklkmgzdtqeulx.supabase.co";
const supabaseKey = "sb_publishable_SS1XoSstAPQjgehDEvZfaw_QAmep2_a";

export const supabase = createClient(supabaseUrl, supabaseKey);
