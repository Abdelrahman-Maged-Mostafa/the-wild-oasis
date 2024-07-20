import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cfhswauccdltcdnjealq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmaHN3YXVjY2RsdGNkbmplYWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MDA1NDEsImV4cCI6MjAzNjE3NjU0MX0.2YTXcxEY4gmP4yeTy7yxPeRUdnbXjs4pT6bYx97sVUE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
