import Generate from "../generate/page"
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
 
// export default async function POST(request) {
//   let formData = await request.formData()
//   try {
    
//     // ACCESS DATA FROM THE FORM
    
//     const input = formData.get('file')
//     const { data, error } = await supabase.storage.from('files').upload(fileName, file);
//     console.log("Result for", fileName, { data, error });


//         // SENDING A REQUEST TO AN EXTERNAL API
//         // YOU CAN DO YOUR THING HERE
       
//         const response = await fetch(`http://localhost:8080`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': credentials,
//             },
//         });

//         if (response.ok) {
            
//             //get the response 
//             const data = await response.json();

//             // GET DATA FROM RESPONSE
//             const fileName = data.fileName;
            
//             // // SEND A RESPONSE BACK TO CLIENT
//             const resData = {redirect : true}
//             return new Response(JSON.stringify(resData))

//         }
//         else {
//             // TODO : handle errors thrown by server side
//             console.log(response.status)
            
//             const resData = {redirect : false}
//             return new Response(JSON.stringify(resData))
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
  
//   return (
//     <Generate formData={formData}/>
//   )
// }

export default async function POST(request) {
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
async function uploadFile(file) {
  let formData = await request.formData()
  try{
    const input = formData.get('file')
    const { data, error } = await supabase.storage.from('files').upload(input, file)
    console.log("Result for", input, { data, error });
  }catch(error){
    console.log(error)
  }
} return (
    <Generate />
  )
}