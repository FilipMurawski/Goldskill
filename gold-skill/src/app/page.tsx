
import SignIn from "@/components/sign-in";
import navbar from "@/components/navbar";
import headers from "@/lib/headers";


export default async function Home() {
  return(<div>
    {navbar(headers)}
    
    <h1>Welcome to GoldSkill!</h1>
    <p>This is the home page.</p>
    <a href="/about">About Us</a>
    <a href="/users">Users</a>
    <a href="/admin">Admin</a>
    <a href="/api/auth/user">User Profile</a>
    <a href="/api/auth/account/update">Update Account</a>
    <a href="/api/auth/account/delete">Delete Account</a>
    <div id="start">Start</div>
  </div>)
}
