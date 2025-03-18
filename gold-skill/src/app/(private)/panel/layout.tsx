import { Panelbar } from "@/components/panelbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {User} from "@prisma/client"
import panel_links from "@/lib/statics/panel_links";
import { Footer } from "@/components/footer";


export default async function PanelLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
        const session = await auth()
        if (!session) redirect('/sign-in');
        if (!session.user) redirect('/sign-in');
        const user = session.user as User;
    return (
    //  layout dla całego panelu
   <>
   <Panelbar user={user} links={panel_links}/>
   <div className="lg:ml-56 pt-32 lg:pt-10 px-10 h-[100vh] flex justify-between flex-col">
   {children}
   <Footer type="panel"></Footer>
   </div>
   </>
  )}