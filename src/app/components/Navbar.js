"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg text-indigo-600">Exam Hub</h1>

      <div className="space-x-4">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <Link href="/exams" className="hover:text-indigo-600">Exams</Link>
        <Link href="/saved" className="hover:text-indigo-600">Saved ⭐</Link>
      </div>
    </nav>
  );
}