import axios from "axios";

const BIN_ID = process.env.JSONBIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method not allowed",
    };
  }

  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY
      }
    });

    const feedbacks = response.data.record || [];

    feedbacks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
      statusCode: 200,
      body: JSON.stringify(feedbacks),
    };
  } catch (error) {
    console.error("Get error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve feedbacks" }),
    };
  }
};
