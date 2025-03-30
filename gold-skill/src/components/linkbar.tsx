"use client"
import { useState } from "react";
import Button from "./button";
import { Hamburger } from "./hamburger";
import Link from "next/link";
import { User } from "@prisma/client";
import Image from "next/image";

declare type link = {
    title: string,
    id: string,    
}


const Linkbar = ({ links,user }: { user: User | undefined, links: link[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-16">
        <Link href="/">
          <Image src="/Logo Biel.jpg" alt="Logo" className="h-16 w-auto" width={64} height={64}/>
        </Link>

        <ul className="hidden md:flex space-x-8">
          {links.map((link) => (
            <li key={link.id} className={`text-gray-300 hover:text-yellow-500 font-medium transition duration-200 active:text-yellow-500 `}>
              <Link href={link.id}>{link.title}</Link>
            </li>
          ))}
          {user?.isActive ? <li key={"regulamin"} className={`text-gray-300 hover:text-yellow-500 font-medium transition duration-200 active:text-yellow-500 `}>
          <Link href="/regulamin-systemu-prowizyjnego">Regulamin Systemu Prowizyjnego</Link>
          </li> : null}
        </ul>

        <Hamburger active={isMenuOpen} setActive={setIsMenuOpen} />
          <Button type="button" width={"160px"} reference={user ? "/panel" : "/sign-in"}>
            {user ? "Panel" : "Zaloguj się"}
          </Button>

      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black shadow-md absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4">
          {links.map((link) => (
            <Link href={link.id} key={link.id}>{link.title}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export { Linkbar };
