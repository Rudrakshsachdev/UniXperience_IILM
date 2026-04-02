import { NextResponse } from 'next/server';

// Advanced realistic simulated delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body?.message?.toLowerCase() || '';

    // Simulate network delay to mimic AI thinking (1s - 2s)
    const simulatedDelayMs = Math.floor(Math.random() * 1000) + 1000;
    await delay(simulatedDelayMs);

    let botResponse = "I am UniBot, your IILM Campus AI assistant. I'm currently in demo mode, but I can still tell you about the university!";

    // Simple keyword based responses
    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      botResponse = "Hello! Welcome to IILM University Campus 360. How can I assist you today?";
    } else if (userMessage.includes('notice') || userMessage.includes('notices')) {
      botResponse = "The latest notices involve the **upcoming mid-semester exams** and the new **AI Lab inauguration**. You can check the 'Notices' section on the portal for detailed PDFs.";
    } else if (userMessage.includes('faculty')) {
      botResponse = "IILM has highly experienced faculty across Business, Engineering, and Law. Are you looking for a specific department's faculty contact?";
    } else if (userMessage.includes('faq') || userMessage.includes('faqs')) {
      botResponse = "Our Frequently Asked Questions cover topics like **Hostel Timings**, **Library Resources**, and **Placement Records**. Please let me know what you are curious about!";
    } else if (userMessage.includes('admission') || userMessage.includes('apply')) {
      botResponse = "Admissions are currently **open** for the new academic session. You can apply directly through the 'Apply Now' portal on the university's main website.";
    }

    return NextResponse.json({ message: botResponse });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
