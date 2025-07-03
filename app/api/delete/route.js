import { createClient } from '@supabase/supabase-js';


export async function POST(request) {
    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try{
        const { url } = await request.json();
        const filename = url.split("/").pop();
        const filepath = `zips/${filename}`;
        const { error } = await supabase.storage.from('files').remove([filepath]);
        if (error) {
      console.error("Delete error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }catch(error){
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });

  };
}