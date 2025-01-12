
import SignIn from "@/components/sign-in";


export default async function Home() {

  return(<div>
    <h1>Welcome to GoldSkill!</h1>
    <p>This is the home page.</p>
    <a href="/about">About Us</a>
    <a href="/users">Users</a>
    <a href="/admin">Admin</a>
    {SignIn()}
    <a href="/api/auth/user">User Profile</a>
    <a href="/api/auth/account/update">Update Account</a>
    <a href="/api/auth/account/delete">Delete Account</a>
  </div>)
}
