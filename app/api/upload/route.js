import Generate from "../../generate/page"

export default async function POST(request) {
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
async function uploadFile(file) {
  let formData = await request.formData()
  try {
    const formData = await request.formData();
    const files = formData.getAll('file');

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('files')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
        });
      }

      console.log('Uploaded:', fileName);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
});
}
} return (
    <Generate />
  )
}