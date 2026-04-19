"use client";

import { useEffect, useState, use } from "react";

export default function ExamDetail({ params }) {
  const { slug } = use(params); // ✅ FIX HERE

  const [exam, setExam] = useState(null);

  useEffect(() => {
    fetch(`https://examtracker-production.up.railway.app/api/exams/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => setExam(data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!exam) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-10 flex justify-center">

      <div className="max-w-2xl w-full bg-white p-6 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          {exam.name}
        </h1>

        <p className="text-indigo-600 mb-4">
          {exam.examType} • {exam.stream}
        </p>

        <p className="mb-4 text-gray-800">
          {exam.description}
        </p>

        <div className="mb-4">
          <h3 className="font-semibold">Eligibility</h3>
          <p>{exam.eligibility}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Syllabus</h3>
          <p>{exam.syllabus}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Difficulty</h3>
          <p>{exam.difficultyLevel}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Official URL</h3>
<a
  href={exam.officialUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-1 text-indigo-600 font-medium hover:underline"
>
  Visit Official Website →
</a>
        </div>

      </div>
    </div>
  );
}