"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exams`)
      .then((res) => res.json())
      .then((data) => setExams(data))
      .catch((err) => console.error(err));
  }, []);

  const getBadgeColor = (level) => {
    if (level === "HARD") return "bg-red-100 text-red-600";
    if (level === "MEDIUM") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        📚 All Exams
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        {exams.map((exam) => (
          <Link key={exam.id} href={`/exams/${exam.slug}`}>
            <div className="bg-white p-5 rounded-xl border hover:shadow-lg transition cursor-pointer">

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

              {/* SAVE BUTTON */}
              <button
                onClick={(e) => {
                  e.preventDefault();

                  fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/saved?slug=${exam.slug}&userId=demoUser`,
                    { method: "POST" }
                  )
                    .then(() => alert("Saved ⭐"))
                    .catch(() => alert("Error"));
                }}
                className="mt-3 text-yellow-600 text-sm font-medium hover:underline"
              >
                ⭐ Save
              </button>

              <p className="text-indigo-600 mt-2 text-sm font-medium">
                View Details →
              </p>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}