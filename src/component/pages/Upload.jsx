import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import worker from "pdfjs-dist/build/pdf.worker?url";

// ✅ FIX: worker सेट करना (NO CORS, NO VERSION ERROR)
pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // 📁 File Handle
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // 📄 Extract Text from PDF
  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const strings = content.items.map((item) => item.str);
        text += strings.join(" ") + "\n";
      }

      return text;
    } catch (error) {
      console.error("PDF Error:", error);
      alert("❌ Unable to read this PDF. Try another resume.");
      return "";
    }
  };

  // 🚀 Upload + Extract
  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF file allowed");
      return;
    }

    const text = await extractTextFromPDF(file);

    console.log("PDF TEXT:", text);

    if (!text || text.length < 20) {
      alert("❌ Could not extract data from this resume");
      return;
    }

    // ✅ BASIC INFO
    const email = text.match(/\S+@\S+\.\S+/)?.[0] || "Not Found";
    const phone = text.match(/(\+91[-\s]?)?[6-9]\d{9}/)?.[0] || "Not Found";

    // Better Name (first line)
    const name = text.split("\n")[0] || "Not Found";

    // ✅ SKILLS
    const skillsList = [
      "React",
      "Java",
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
    ];

    const skills = skillsList.filter((skill) =>
      text.toLowerCase().includes(skill.toLowerCase())
    );

    // ✅ QUALIFICATION EXTRACTION
    let qualification = [];

    const eduMatch = text.match(
      /Education([\s\S]*?)(Skill|Project|Certifications)/i
    );

    if (eduMatch) {
      qualification.push({
        degree: eduMatch[1].trim(),
        description: "Extracted from resume",
      });
    }

    // ✅ PROJECT EXTRACTION
    let project = [];

    const projectMatch = text.match(
      /Project([\s\S]*?)(Certifications|$)/i
    );

    if (projectMatch) {
      const projects = projectMatch[1].split(",");

      project = projects.map((p) => ({
        title: p.trim(),
        description: "From resume",
      }));
    }

    // ✅ FINAL DATA
    const userData = {
      teachername: name,
      email,
      phone,
      Skill: skills,
      qualification,
      project,
    };

    console.log("FINAL DATA:", userData);

    // 💾 Store
    localStorage.setItem("current_user", JSON.stringify(userData));

    // 🔄 Navigate
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center mt-20 bg-gray-100 p-6 rounded-lg shadow-md w-[350px] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Upload Resume 📄
      </h2>

      <input type="file" onChange={handleFile} className="mb-4" />

      {file && (
        <p className="text-sm mb-2">
          Selected: <b>{file.name}</b>
        </p>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition"
      >
        Upload & Analyze 🚀
      </button>
    </div>
  );
};

export default Upload;