import { createClient } from '@supabase/supabase-js';
import JSZip from 'jszip';

export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    const formData = await request.formData();
    const files = formData.getAll('file');
    const folderName = `session-${crypto.randomUUID()}`;
    const uploaded = [];
    const zip = new JSZip();


    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer(); 
      zip.file(file.name, arrayBuffer);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipFileName = `${folderName}.zip`;
     
    const { data, error } = await supabase.storage.from('files').upload(`zips/${zipFileName}`, zipBlob, {contentType: 'application/zip',});

    if (error) {
      console.error('Upload error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    const { data: publicUrlData } = supabase.storage.from('files').getPublicUrl(`zips/${zipFileName}`);

    uploaded.push({
      name: zipFileName,
      url: publicUrlData.publicUrl,
    }); 
    console.log('Uploaded:', zipFileName,'\nurl:',publicUrlData.publicUrl );
  
    return new Response(JSON.stringify({ success: true,folder: zipFileName, files: uploaded  ,url:publicUrlData.publicUrl}), {status: 200,});
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }

  
}