import { Footer } from "@/components/footer";
import { Linkbar } from "@/components/linkbar";
import { auth } from "@/lib/auth";
import links from "@/lib/statics/links";
import { User } from "@prisma/client";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth()
  return (
      <>        
        <Linkbar user={session?.user as User | undefined} links={links}/>
        <div className="pt-16">
        {children}
        <Footer type="front"></Footer>
        </div>
      </>
  );
}
