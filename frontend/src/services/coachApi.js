import axios from "axios";

const API =
  "http://localhost:8000/api/analyze-problem";

export const analyzeProblem =
  async (problem) => {

    const response =
      await axios.post(
        API,
        {
          problem
        }
      );

    return response.data;
  };

export const explainProblem =
  async (problem, language = "python") => {

    const response =
      await axios.post(
        `${API}/explain`,
        {
          input: problem,
          language: language
        }
      );

    return response.data;
};

export const runCode =
async (
  code,
  language
) => {

  const response =
    await axios.post(
      `${API}/run-code`,
      {
        code,
        language,
      }
    );

  return response.data;
};

