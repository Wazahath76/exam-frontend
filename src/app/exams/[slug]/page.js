"use client";

import { useEffect, useState, use } from "react";

export default function ExamDetail({ params }) {
  const { slug } = use(params);
  const [exam, setExam] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exams/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => setExam(data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!exam) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const getBadgeColor = (level) => {
    if (level === "HARD") return "bg-red-100 text-red-600";
    if (level === "MEDIUM") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-10">

      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow">

        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">{exam.name}</h1>

          <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(exam.difficultyLevel)}`}>
            {exam.difficultyLevel}
          </span>
        </div>

        <p className="text-indigo-600 mb-4">
          {exam.examType} • {exam.stream}
        </p>

        <p className="mb-4 text-gray-700">
          {exam.description}
        </p>

        <div className="mb-3">
          <strong>Eligibility:</strong>
          <p>{exam.eligibility}</p>
        </div>

        <div className="mb-3">
          <strong>Syllabus:</strong>
          <p>{exam.syllabus}</p>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={() => {
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/saved?slug=${exam.slug}&userId=demoUser`,
              { method: "POST" }
            )
              .then(() => alert("Saved ⭐"))
              .catch(() => alert("Error"));
          }}
          className="mt-4 text-yellow-600 font-medium hover:underline"
        >
          ⭐ Save this exam
        </button>

        <a
          href={exam.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-indigo-600 hover:underline"
        >
          Visit Official Website →
        </a>

      </div>
    </div>
  );
}