import axios from "axios";

const API =
  "http://localhost:8000/api";

export const analyzeProblem =
  async (input) => {

    const response =
      await axios.post(
        `${API}/analyze-problem`,
        { input }
      );

    return response.data;
};

export const explainProblem =
  async (input) => {

    const response =
      await axios.post(
        `${API}/explain`,
        { input }
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

