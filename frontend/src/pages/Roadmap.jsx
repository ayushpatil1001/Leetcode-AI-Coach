import { useState } from "react";
import Navbar from "../components/Navbar";
import RoadmapBlock from "../components/RoadmapBlock";
import { generateRoadmap } from "../services/roadmapApi";

export default function Roadmap() {

  const [concept, setConcept] =
    useState("");

  const [roadmap, setRoadmap] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleGenerate =
    async () => {

      try {

        setLoading(true);

        const result =
          await generateRoadmap(
            concept
          );

        const clean =
          result.response
            .replace(
              "```json",
              ""
            )
            .replace(
              "```",
              ""
            );

        setRoadmap(
          JSON.parse(clean)
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }
    };

  return (
    <div
      className="
        min-h-screen
        pb-24
      "
    >

      <Navbar />

      <div
        className="
          max-w-6xl
          mx-auto
          px-6
          pt-40
        "
      >

        <h1
          className="
            text-6xl
            font-extrabold
            text-center
          "
        >
          AI Roadmaps
        </h1>

        <p
          className="
            text-center
            text-gray-500
            mt-4
          "
        >
          Learn any concept from
          beginner to expert.
        </p>

        <div
          className="
            mt-12
            flex
            gap-4
          "
        >

          <input
            value={concept}
            onChange={(e) =>
              setConcept(
                e.target.value
              )
            }
            placeholder="
              Dynamic Programming
            "
            className="
              flex-1
              p-4
              rounded-2xl
              border
            "
          />

          <button
            onClick={
              handleGenerate
            }
            className="
              px-8
              rounded-2xl
              text-white
              bg-gradient-to-r
              from-sky-500
              to-blue-600
            "
          >
            Generate
          </button>

        </div>

        {loading && (

          <div
            className="
              mt-10
              text-center
            "
          >
            Generating roadmap...
          </div>

        )}

        {roadmap && (

          <div
            className="
              mt-12
              space-y-6
            "
          >

            {roadmap.levels.map(
              (
                level,
                index
              ) => (
                <RoadmapBlock
                  key={index}
                  level={level}
                />
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}