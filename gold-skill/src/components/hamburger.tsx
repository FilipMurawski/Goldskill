"use client";

import React from "react";

const Hamburger = ({ active, setActive }: { active: boolean; setActive: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
        onClick={() => setActive(!active)}
      >
        <span className="sr-only">{active ? "Close main menu" : "Open main menu"}</span>
        {active ? (
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  );
};

export { Hamburger };
