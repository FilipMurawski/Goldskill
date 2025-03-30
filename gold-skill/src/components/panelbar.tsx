"use client"
import { useEffect, useState } from "react";
import Button from "./button";
import { Hamburger } from "./hamburger";
import Link from "next/link";
import { User } from "@prisma/client";

import Image from "next/image";
import { getSelfUser } from "@/actions/user_actions";

declare type link = {
    title: string,
    id: string,    
}


const Panelbar = ({ links,user }: { user: User, links: link[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(()=> {
    getSelfUser(user.email)
  }, [])

  return (
    <nav className="bg-black shadow-md fixed z-50 w-full lg:w-56 h-16 lg:h-full">
      <div className="container lg:px-8 flex lg:justify-start lg:items-start lg:flex-col md:gap-10 items-center justify-between px-4  lg:pt-10  mx-auto">
        <Link href="/panel">
          <Image src="/Logo Biel.jpg" alt="Logo" className="h-16 w-auto" width={64} height={64}/>
        </Link>

        <ul className="hidden lg:flex lg:flex-col lg:gap-10 lg:items-start list-none">
          {links.filter(link => !((link.title === "Moja struktura" || link.title === "Moje zarobki") && (!user.isActive || user.role === "USER"))).map((link) =>
            (
            <li key={link.id} id={link.title} className={`text-gray-300 hover:text-yellow-500 font-medium transition duration-200 active:text-yellow-500 list-none`}>
              <Link href={link.id} id={link.title}>{link.title}</Link>
            </li>
          )
        )}
            {user.role === "ADMIN" ? <><li key={"Użytkownicy"} className={`text-gray-300 hover:text-yellow-500 font-medium transition duration-200 active:text-yellow-500 `}>
          <Link href="/panel/users">Użytkownicy</Link>
          </li>
          <li key={"Mail"} className={`text-gray-300 hover:text-yellow-500 font-medium transition duration-200 active:text-yellow-500 `}>
          <Link href="/panel/marketing">Mail Marketing</Link>
          </li></> : null}
        </ul>

        <Hamburger active={isMenuOpen} setActive={setIsMenuOpen} />
          <Button type="button" width={"160px"} reference="/sign-out">
Wyloguj się
          </Button>

      </div>

      {isMenuOpen && (
        <ul className="lg:hidden bg-black shadow-md absolute top-16 left-0 w-full flex flex-col items-center py-4 space-y-4">
          {links.map((link) => (
            <li key={link.title} className={`text-gray-300 hover:text-yellow-500 font-medium transition duration-200 active:text-yellow-500 list-none`}><Link href={link.id}>{link.title}</Link></li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export { Panelbar };
