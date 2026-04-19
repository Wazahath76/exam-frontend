"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [cls, setCls] = useState("");
  const [stream, setStream] = useState("");
  const [search, setSearch] = useState("");

  // Fetch all exams once
useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exams`)
    .then((res) => res.json())
    .then((data) => {
      setExams(data);
      setFiltered(data);
    })
    .catch((err) => console.error("API error:", err));
}, []);

  // Apply filters
  useEffect(() => {
    let data = [...exams];

    if (cls) {
      data = data.filter(
        (e) => e.minClass <= Number(cls) && e.maxClass >= Number(cls)
      );
    }

    if (stream && (cls === "11" || cls === "12")) {
      data = data.filter(
        (e) => e.stream === stream || e.stream === "ALL"
      );
    }

    if (search) {
      data = data.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [cls, stream, search, exams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            📚 Explore Exams
          </h1>
          <p className="text-gray-600">
            Browse and filter exams easily
          </p>
        </div>

        {/* FILTER CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md mb-8">

          <div className="grid md:grid-cols-3 gap-4">

            {/* Class */}
            <select
              className="border p-3 rounded-lg"
              value={cls}
              onChange={(e) => {
                setCls(e.target.value);
                setStream("");
              }}
            >
              <option value="">Class</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>

            {/* Stream */}
            <select
              className="border p-3 rounded-lg disabled:bg-gray-100"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              disabled={!(cls === "11" || cls === "12")}
            >
              <option value="">
                {cls === "11" || cls === "12"
                  ? "Stream"
                  : "Only for 11 & 12"}
              </option>

              {(cls === "11" || cls === "12") && (
                <>
                  <option value="PCM">PCM</option>
                  <option value="PCB">PCB</option>
                  <option value="COMMERCE">Commerce</option>
                </>
              )}
            </select>

            {/* Search */}
            <input
              placeholder="Search exams..."
              className="border p-3 rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>
        </div>

        {/* RESULTS */}
        <div className="grid md:grid-cols-2 gap-6">

          {filtered.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No exams found 😕
            </p>
          )}

          {filtered.map((exam) => (
            <Link key={exam.id} href={`/exams/${exam.slug}`}>
              <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">

                <h2 className="font-semibold text-lg text-gray-900">
                  {exam.name}
                </h2>

                <p className="text-sm text-indigo-600 font-medium">
                  {exam.examType} • {exam.stream}
                </p>

                <p className="text-gray-600 mt-2 text-sm">
                  {exam.description || "No description"}
                </p>

                <span className="inline-block mt-3 text-indigo-600 font-medium">
                  View Details →
                </span>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}