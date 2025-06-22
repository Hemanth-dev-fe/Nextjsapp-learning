"use client"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

function RegisterAuth({ openAuth }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordLength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  const handleOpenLogin = () => {
    openAuth(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setMsg("All fields are required.");
      return;
    }

    if (!passwordLength.test(form.password)) {
      setMsg("Password must include uppercase, lowercase, number, special character, and be at least 6 characters.");
      return;
    }

    setLoading(true);
    setMsg(""); // Clear old messages

    try {
      const res = await fetch("/api/UserAuth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);
      setMsg(data.message);

      if (data.message.toLowerCase().includes("success")) {
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setMsg("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="bg-white w-full max-w-sm shadow-lg rounded-xl p-8 border-2">
        <h1 className="font-bold text-2xl mb-4">Register</h1>

        {msg && (
          <p className={`mb-3 font-bold ${msg.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </p>
        )}

        <form className="flex flex-col items-center justify-center w-full max-w-sm" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-400 rounded p-2 mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-400 rounded p-2 mb-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 rounded p-2 mb-3"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className={`w-full border border-gray-400 rounded p-2 mb-3 bg-blue-700 text-white font-bold ${
              loading ? "opacity-50 cursor-wait" : "cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <button onClick={handleOpenLogin}>Already have an account? Login</button>
      </div>
    </div>
  );
}


function LoginAuth({openAuth})
{
   
    const [form,setForm]=useState({email:"",password:""})
    const [msg,setMsg]=useState(false)
    const [loading,setLoading]=useState(false)
    const router=useRouter()
  /*   const [registerForm,setRegisterForm]=useState(true)
    const [loginForm,setLoginForm]=useState(false) */
     const handleOpenRegister=()=>{
        openAuth(false)
    }
    const handleLogin=async(e)=>{
        e.preventDefault()
        setLoading(true); 
       try{
         const res=await  fetch('/api/UserAuth/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',  // Telling server we're sending JSON
            },
            body:JSON.stringify(form)
        })
        const data=await res.json()
        setMsg(data.message)
         setLoading(false)
       // Only clear form if registration success
    if (data.message.toLowerCase().includes('success')) {
      setForm({ email: '', password: '' });
router.push("/hemanth/tile")
    }
       }
       catch(err)
       {
        setMsg("Something went wrong.");
       }
      
    }
    return(
        <>
        <div className="flex flex-col items-center justify-center  mt-16">
           <div className="bg-white w-full max-w-sm shadow-lg rounded-xl p-8  border-2">
             <h1 className="font-bold text-2xl mb-4">Login</h1>

             {msg && (
  <p className={`mb-3 font-bold ${msg.toLowerCase().includes("success")? "text-green-600":"text-red-600" }`}>
    {msg}
  </p>
)}


            <form className="flex flex-col items-center justify-center w-full max-w-sm"
            onSubmit={handleLogin}
            >
                <input type="email" placeholder="Email" 
                className="w-full border border-gray-400 rounded p-2 mb-3"
                value={form.email}
                onChange={(e)=>setForm({...form, email:e.target.value})}
                />
                <input type="password" placeholder="Password" 
                className="w-full border border-gray-400 rounded p-2 mb-3"
                value={form.password}
                onChange={(e)=>setForm({...form, password:e.target.value})}
                />
                <button type="submit" 
                className={
                    `w-full border border-gray-400 rounded p-2 mb-3 bg-blue-700 cursor-pointer text-white font-bold 
                    ${loading?"opacity-50 cursor-wait":""}
                    `
                }
disabled={loading}
                >
                    {loading?"Loging...":"Login"}
                    </button>
            </form>
            <button onClick={handleOpenRegister}>Don't have an account?Register</button>
           </div>
        </div>
        </>
    )
}

export default function AuthForm()
{
    const [openAuthForm,setOpenAuthForm]=useState(true)

    return(
        <>
        {
openAuthForm ? <LoginAuth openAuth={setOpenAuthForm}/> :<RegisterAuth openAuth={setOpenAuthForm}/>
        }
        </>
    )
}




/* On the client, you have a JavaScript object like this:

js
Copy
Edit
const form = { name: "Alice", email: "alice@example.com" };
You use JSON.stringify(form) to convert that object into a JSON string:

json
Copy
Edit
'{"name":"Alice","email":"alice@example.com"}'
This JSON string is sent as the HTTP request body.

On the server, when it receives the request, it reads the body as a string.

The server then parses the JSON string back into a JavaScript object using something like:

js
Copy
Edit
const data = JSON.parse(requestBody);
Or in Next.js API routes:

js
Copy
Edit
const data = await req.json();
This parsing step transforms the raw JSON string into an object the server can use. */