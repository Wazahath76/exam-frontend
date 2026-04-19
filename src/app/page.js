"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [cls, setCls] = useState("");
  const [stream, setStream] = useState("");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!cls) {
      alert("Select class");
      return;
    }

    if ((cls === "11" || cls === "12") && !stream) {
      alert("Select stream");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/exams/recommend?cls=${cls}&stream=${stream || "ALL"}`
      );

      const data = await res.json();
      setExams(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            🎯 Exam Hub
          </h1>
          <p className="text-gray-600 text-lg">
            Discover exams based on your profile
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md mb-10">

          <div className="grid md:grid-cols-2 gap-4">

            {/* Class */}
            <select
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              value={cls}
              onChange={(e) => {
                setCls(e.target.value);
                setStream(""); // reset stream
              }}
            >
              <option value="">Select Class</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>

            {/* Stream */}
            <select
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none disabled:bg-gray-100"
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              disabled={!(cls === "11" || cls === "12")}
            >
              <option value="">
                {cls === "11" || cls === "12"
                  ? "Select Stream"
                  : "Stream only for 11 & 12"}
              </option>

              {(cls === "11" || cls === "12") && (
                <>
                  <option value="PCM">PCM</option>
                  <option value="PCB">PCB</option>
                  <option value="COMMERCE">Commerce</option>
                </>
              )}
            </select>

          </div>

          {/* Button */}
          <button
            onClick={getRecommendations}
            className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {loading ? "Loading..." : "Get Recommendations 🚀"}
          </button>

          {/* Navigate */}
          <Link
            href="/exams"
            className="block mt-4 text-center text-indigo-600 font-medium hover:underline"
          >
            Browse all exams →
          </Link>
        </div>

        {/* RESULTS */}
        <div className="space-y-5">
          {exams.length === 0 && !loading && (
            <p className="text-center text-gray-500">
              No results yet. Select options above 👆
            </p>
          )}

          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h2 className="font-semibold text-lg text-gray-900">
                {exam.name}
              </h2>

              <p className="text-sm text-indigo-600 font-medium">
                {exam.examType} • {exam.stream}
              </p>

              <p className="text-gray-600 mt-2 text-sm">
                {exam.description || "No description available"}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}