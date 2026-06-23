import axios from "axios";

const API_URL =
  "http://localhost:8000/api/generate-roadmap";

export const generateRoadmap = async (
  concept
) => {

  const response = await axios.post(
    API_URL,
    {
      concept
    }
  );

  return response.data;
};