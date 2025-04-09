import axios from "axios";

const BIN_ID = process.env.JSONBIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;


exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method not allowed",
    };
  }

  try {
    const feedback = JSON.parse(event.body);

    if (!feedback.name || !feedback.email || !feedback.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    feedback.timestamp = new Date().toISOString();

    // Get current data
    const getRes = await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY
      }
    });

    const feedbacks = getRes.data.record || [];
    feedbacks.push(feedback);

    // Update bin
    await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, feedbacks, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      }
    });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Feedback submitted successfully" }),
    };
  } catch (error) {
    console.error("Submit error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to submit feedback" }),
    };
  }
};