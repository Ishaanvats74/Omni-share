import Generate from "../generate/page"
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
 
export default async function Page() {
  const generate = getGenerate()
  const { data, error } = await supabase.storage.from('files').upload(fileName, file);
    console.log("Result for", fileName, { data, error });
  
  return (
    <Generate generate={generate}/>
  )
}
