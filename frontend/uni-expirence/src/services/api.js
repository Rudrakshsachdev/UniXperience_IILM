/**
 * Simulates a request to the UniBot backend.
 * Uses the Next.js API route we set up, which acts as a mock for now.
 * 
 * @param {string} message The user's input message
 * @returns {Promise<{message: string}>} The bot's response
 */
export const sendChatMessage = async (message) => {
  try {
    // Calling the FastAPI backend running on port 8000
    const res = await fetch('http://localhost:8000/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    // Map the backend's "response" field to what the frontend expects ("message")
    return { message: data.response || data.message };
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
};
