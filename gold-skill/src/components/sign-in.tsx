
import { signIn }from "@/lib/auth"



const Sign_in = async () =>{
  return (
    <form
      action={async () => {
        "use server"
          await signIn("facebook")
      }}
    >
      <button type="submit">Signin with Facebook</button>
    </form>
  )
} 
export { Sign_in }