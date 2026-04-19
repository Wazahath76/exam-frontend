"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full bg-white/90 backdrop-blur-md shadow-sm px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-indigo-600">
        🎯 Exam Hub
      </Link>

      <div className="flex gap-6">
        <Link href="/" className="text-gray-700 hover:text-indigo-600">
          Home
        </Link>
        <Link href="/exams" className="text-gray-700 hover:text-indigo-600">
          Explore
        </Link>
      </div>
    </div>
  );
}