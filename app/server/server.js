

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)


const handleUpload = async () => {
    if (selected.length === 0) return console.log("Nothing is selected");
    
    setIsUploading(true);
    try {
      for (const file of selected) {
        const fileName = `${Date.now()}-${file.name}`;
        console.log("Uploading:", file.name);
        const { data, error } = await supabase.storage
          .from('files')
          .upload(fileName, file);
          console.log("Result for", fileName, { data, error });
        
        if (error) throw error;
        
        console.log(`Uploaded: ${fileName}`);
      }
      alert('Files uploaded successfully!');
      handleRemove(); 
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed!');
    } finally {
      setIsUploading(false);
    }
  }