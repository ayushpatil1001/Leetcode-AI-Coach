import { useState } from "react";
import HintCard from "../components/HintCard";
import ProblemCard from "../components/ProblemCard";
import ExplanationCard from "../components/ExplanationCard";
import Navbar from "../components/Navbar";


import {
  analyzeProblem,
  explainProblem,
  runCode,
} from "../services/coachApi";

import toast, { Toaster } from "react-hot-toast";
import { Sparkles, Brain, Code2 } from "lucide-react";

export default function Coach() {
    
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [code, setCode] = useState("// Write your solution here...");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState(null);

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast.error("Please enter a problem");
      return;
    }
    
    try {
      setLoading(true);

      const data = await analyzeProblem(input);

      setAnalysis(data);

      toast.success("Problem analyzed successfully");
    } catch (err) {
      toast.error("Failed to analyze problem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExplain = async () => {
    try {
      const data = await explainProblem(input);

      setExplanation(data);

      toast.success("Explanation generated");
    } catch (err) {
      toast.error("Failed to generate explanation");
      console.error(err);
    }
  };

  const handleRun = async () => {

  try {

    const result =
      await runCode(
        code,
        language
      );

    setOutput(result);

    if (
      result.status ===
      "Accepted"
    ) {

      toast.success(
        "🎉 Passed!"
      );

    } else {

      toast.error(
        "❌ Failed"
      );

    }

  } catch (err) {

    toast.error(
      "Execution Failed"
    );

    console.error(err);

  }

};

  return (
    
    <div className="min-h-screen pb-24">
      <Toaster position="top-right" />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-40">

        {/* Hero */}
        <div className="text-center">

          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-600 px-4 py-2 rounded-full mb-6">
            <Sparkles size={18} />
            AI Powered Problem Solving
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold">
            🧠 Crack Any
            <span className="text-sky-500"> Coding Problem</span>
          </h1>

          <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
            Get hints, understand logic, write code, and
            learn like a real software engineer.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-5xl mx-auto mt-14">
          <div className="flex flex-col md:flex-row gap-4">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste LeetCode URL or problem statement..."
              className="
                flex-1
                h-14
                rounded-2xl
                border
                border-sky-200
                bg-white/80
                backdrop-blur-xl
                px-5
                shadow-lg
                outline-none
              "
            />

            <button
              onClick={handleAnalyze}
              className="
                h-14
                px-8
                rounded-2xl
                text-white
                font-semibold
                bg-gradient-to-r
                from-sky-500
                to-blue-600
                shadow-lg
                hover:scale-105
                transition-all
              "
            >
              Analyze
            </button>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 text-center">

            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-5 shadow-xl">

              <Brain className="text-sky-500 animate-pulse" />

              <span className="font-medium">
                🧠 Understanding Problem...
              </span>

            </div>

          </div>
        )}

        {/* Analysis Section */}
        {analysis && (
          <>
            <div className="grid lg:grid-cols-2 gap-8 mt-12">

              {/* Problem Card */}
              <div
                className="
                  bg-white/70
                  backdrop-blur-xl
                  rounded-3xl
                  shadow-xl
                  p-8
                  border border-white/50
                "
              >
                <ProblemCard analysis={analysis} />
              </div>

              {/* AI Guidance */}
              <div
                className="
                  bg-white/70
                  backdrop-blur-xl
                  rounded-3xl
                  shadow-xl
                  p-8
                  border border-white/50
                "
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Brain className="text-sky-500" />
                  AI Guidance
                </h2>

                <div className="space-y-4">
                  {analysis.hints?.map((hint, index) => (
                    <HintCard
                      key={index}
                      title={`Hint #${index + 1}`}
                      content={hint}
                    />
                  ))}
                </div>

                <div className="mt-8">

                  <h3 className="font-bold mb-3">
                    Complexity Target
                  </h3>

                  <div className="bg-sky-50 rounded-2xl p-4">
                    {analysis.complexity || "Optimized Solution Expected"}
                  </div>

                </div>
              </div>

            </div>
            
            {/* Code Section */}
            <div
              className="
                mt-12
                bg-white/70
                backdrop-blur-xl
                rounded-3xl
                shadow-xl
                p-8
                border border-white/50
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="text-sky-500" />
                <h2 className="text-3xl font-bold">
                  Code Playground
                </h2>
              </div>
                 <div className="flex justify-between items-center mb-6">

                    <h2 className="text-3xl font-bold">
                        Code Playground
                    </h2>

                    <select
                        value={language}
                        onChange={(e) =>
                        setLanguage(
                            e.target.value
                        )
                        }
                        className="
                        border
                        border-sky-200
                        rounded-xl
                        px-4
                        py-2
                        bg-white
                        "
                    >

                        <option value="python">
                        Python
                        </option>

                        <option value="javascript">
                        JavaScript
                        </option>

                        <option value="cpp">
                        C++
                        </option>

                        <option value="java">
                        Java
                        </option>

                    </select>

                    </div>
                    <div className="h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center">
                    Editor Disabled
                    </div><CodeEditor
                code={code}
                setCode={setCode}
                language={language}
              />

              <div className="flex flex-wrap gap-4 mt-6">

  <button
    onClick={handleRun}
    className="
      px-6
      py-3
      rounded-xl
      bg-green-500
      text-white
      font-semibold
    "
  >
    Run Code
  </button>

  <button
    onClick={handleExplain}
    className="
      px-6
      py-3
      rounded-xl
      bg-gradient-to-r
      from-sky-500
      to-blue-600
      text-white
      font-semibold
    "
  >
    Explain Logic
  </button>

</div>

{output && (

  <div
    className="
      mt-8
      bg-slate-900
      text-white
      rounded-2xl
      p-6
    "
  >

    <h3 className="font-bold text-xl">
      Execution Result
    </h3>

    <div className="mt-4">

      <p>
        Status:
        {" "}
        <span className="text-green-400">
          {output.status}
        </span>
      </p>

      <pre className="mt-4 whitespace-pre-wrap">
        {output.output}
      </pre>

    </div>

  </div>

)}
            </div>

            {/* Explanation */}
            {explanation && (
              <div className="mt-12">
                <ExplanationCard
                  explanation={explanation}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}