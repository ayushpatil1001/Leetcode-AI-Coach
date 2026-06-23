import Reveal from "./Reveal";
import { TypeAnimation } from "react-type-animation";

export default function HowItWorks() {
  return (
    <section className="py-40 px-6">

      <div className="max-w-6xl mx-auto">

        <Reveal>
          <h2 className="text-6xl font-bold text-center">
            How Our AI Coach Works
          </h2>

          <p className="text-center text-gray-500 mt-5">
            Learn DSA without copying solutions.
          </p>
        </Reveal>

        <div className="mt-24 space-y-32">

          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div className="
                bg-white
                p-8
                rounded-3xl
                shadow-xl
              ">
                <input
                  className="
                    w-full
                    p-4
                    rounded-xl
                    border
                  "
                  value="leetcode.com/problems/two-sum"
                  readOnly
                />
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  Paste Any Problem
                </h3>

                <p className="mt-4 text-gray-500">
                  Paste a LeetCode URL or full statement.
                </p>
              </div>

            </div>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div>
                <h3 className="text-4xl font-bold">
                  AI Generates Hints
                </h3>

                <p className="mt-4 text-gray-500">
                  Get progressive hints instead of answers.
                </p>
              </div>

              <div className="
                bg-white
                p-8
                rounded-3xl
                shadow-xl
              ">
                <h4 className="font-bold">
                  Hint #1
                </h4>

                <p className="mt-3 text-gray-500">
                  Think about storing previously seen values.
                </p>
              </div>

            </div>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div className="
                bg-white
                p-5
                rounded-3xl
                shadow-xl
              ">
                <div
                className="
                  h-94
                  rounded-2xl
                  bg-slate-900
                  p-9
                  shadow-2xl
                  overflow-hidden
                  font-mono
                  text-sm
                "
              >
                {/* Editor Header */}
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <TypeAnimation
                  sequence={[
                `function twoSum(nums, target) {
                  const map = new Map();

                  for(let i = 0; i < nums.length; i++) {

                    const complement =
                      target - nums[i];

                    if(map.has(complement)) {
                      return [
                        map.get(complement),
                        i];
                    }
                    map.set(nums[i], i);
                  }}`,
                  ]}
                  speed={80}
                  cursor={true}
                  repeat={Infinity}
                  className="text-slate-200 whitespace-pre-line"
                />
              </div>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  Solve Yourself
                </h3>

                <p className="mt-4 text-gray-500">
                  Build problem-solving skills.
                </p>
              </div>

            </div>
          </Reveal>

        </div>

      </div>

    </section>
  );
}