"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [cls, setCls] = useState("");
  const [stream, setStream] = useState("");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!cls) return alert("Select class");
    if ((cls === "11" || cls === "12") && !stream)
      return alert("Select stream");

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

  const getBadgeColor = (level) => {
    if (level === "HARD") return "bg-red-100 text-red-600";
    if (level === "MEDIUM") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            🎯 Exam Hub
          </h1>
          <p className="text-gray-600 text-lg">
            Find the best exams for your future 🚀
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 border">

          <div className="grid md:grid-cols-2 gap-4">

            <select
              className="border p-3 rounded-lg"
              value={cls}
              onChange={(e) => {
                setCls(e.target.value);
                setStream("");
              }}
            >
              <option value="">Select Class</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>

            <select
              className="border p-3 rounded-lg disabled:bg-gray-100"
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

          <button
            onClick={getRecommendations}
            className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Loading..." : "Get Recommendations 🚀"}
          </button>

          <Link
            href="/exams"
            className="block text-center mt-4 text-indigo-600 hover:underline"
          >
            Browse all exams →
          </Link>
        </div>

        {/* RESULTS */}
        <div className="grid md:grid-cols-2 gap-6">

          {exams.length === 0 && !loading && (
            <p className="text-gray-500 col-span-full text-center">
              No results yet 👆
            </p>
          )}

{exams.map((exam, index) => (
  <Link key={exam.id} href={`/exams/${exam.slug}`}>
    <div className="bg-white p-5 rounded-xl border hover:shadow-xl transition cursor-pointer">

      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">
          {exam.name}
        </h2>

        <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(exam.difficultyLevel)}`}>
          {exam.difficultyLevel}
        </span>
      </div>

      <p className="text-sm text-indigo-600">
        {exam.examType} • {exam.stream}
      </p>

      <p className="text-gray-600 mt-2 text-sm">
        {exam.description}
      </p>

      {/* ⭐ SAVE BUTTON */}
      <button
        onClick={(e) => {
          e.preventDefault(); // stop link navigation

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/saved?slug=${exam.slug}&userId=demoUser`,
            { method: "POST" }
          )
            .then(() => alert("Saved ⭐"))
            .catch(() => alert("Error saving"));
        }}
        className="mt-3 text-yellow-600 text-sm font-medium hover:underline"
      >
        ⭐ Save
      </button>

      {index === 0 && (
        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded mt-2 inline-block ml-2">
          Best Match
        </span>
      )}

      <p className="text-indigo-600 mt-2 text-sm font-medium">
        View Details →
      </p>

    </div>
  </Link>
))}
        </div>

      </div>
    </div>
  );
}