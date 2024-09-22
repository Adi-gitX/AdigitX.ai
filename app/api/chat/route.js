
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const systemPrompt = `
👋 **Hi there!** Welcome to **AdigitX.ai**! 😊 I'm your AI assistant, here to help you with any questions or issues you might have.

I am **AdigitX.ai**, an AI assistant developed by **Adithya Kammati** [(Adithya Kammati)](https://adigitx.vercel.app/). You can also find me on [LinkedIn](https://www.linkedin.com/in/kammatiaditya/). I'm designed to understand and respond to human input in a conversational manner 🤖. I'm not a human, but a computer program created to simulate conversation, answer questions, and generate text based on the input I receive.

Are you looking to:

- Set up your account? 🔧
- Learn more about our features? 🌟
- Troubleshoot a specific issue? 🛠️

Let me know, and I'll do my best to help you out! 🚀

Here are some ways I can assist:

- **Ask a question**: I can provide summaries of factual topics or create stories.
- **Request a task**: Need help writing an email or essay?
- **Start a discussion**: Let's chat about your interests!

Just send me a message and I'll do my best to assist you. 😊

Always use emojis in your responses to maintain a friendly and engaging tone. Include at least one emoji in each sentence or paragraph, but don't overuse them. Choose emojis that are relevant to the content of your message.
`;

let conversationHistory = [];

export async function POST(req) {
  try {
    const { message } = await req.json();

    const identityQuestions = [
      "who are you",
      "what are you",
      "who created you",
      "who made you",
      "what is your name",
      "tell me about yourself"
    ];

    if (identityQuestions.some(q => message.toLowerCase().includes(q))) {
      const identityResponse = "I am **AdigitX.ai**, an AI assistant developed by **Adithya Kammati** [(Adithya Kammati)](https://adigitx.vercel.app/). You can find me on [LinkedIn](https://www.linkedin.com/in/kammatiaditya/). I'm here to assist you with various tasks and answer your questions. 🤖";
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: identityResponse });
      return NextResponse.json({ message: identityResponse });
    }

    const greetings = [
      "hi",
      "hello",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening"
    ];

    if (greetings.some(g => message.toLowerCase().includes(g))) {
      const greetingResponse = "Hello! 👋 I'm here to help you with anything you need. What can I assist you with today? 😊";
      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: greetingResponse });
      return NextResponse.json({ message: greetingResponse });
    }

    const applicationQuestions = [
      "how do I apply for a new role",
      "walk me through how to apply for a new role",
      "what is the status of my application",
      "how do I reset my password",
      "can you recommend some learning resources"
    ];

    if (applicationQuestions.some(q => message.toLowerCase().includes(q))) {
      let applicationResponse;

      if (message.toLowerCase().includes("apply for a new role")) {
        applicationResponse = "Applying for a new role is exciting! 🎉 Here’s a step-by-step guide:\n" +
          "1. **Visit Our Careers Page**: Go to our [Careers](https://example.com/careers).\n" +
          "2. **Browse Open Positions**: Look through available roles that interest you.\n" +
          "3. **Prepare Your Application**: Update your resume and write a tailored cover letter.\n" +
          "4. **Submit Your Application**: Click 'Apply Now' on the role you want and upload your documents.\n" +
          "5. **Confirmation**: After submitting, you’ll receive a confirmation email.\n" +
          "6. **Follow Up**: If you have questions, contact our HR team at hr@example.com. Good luck! 🍀";
      } else if (message.toLowerCase().includes("status of my application")) {
        applicationResponse = "To check the status of your application:\n" +
          "1. **Log Into Your Account**: Go to our website and log in.\n" +
          "2. **Navigate to Application Status**: Click on 'Application Status' in your profile dashboard.\n" +
          "3. **View Updates**: Here, you’ll see the latest updates about your application.\n" +
          "4. **Need More Info?**: Contact our HR team at hr@example.com. We're here to help! 📊";
      } else if (message.toLowerCase().includes("reset my password")) {
        applicationResponse = "Resetting your password is easy! Just follow these steps:\n" +
          "1. **Go to the Login Page**: Head to the [login page](https://example.com/login).\n" +
          "2. **Click 'Forgot Password?'**: You’ll see a link below the login form.\n" +
          "3. **Enter Your Email**: Input the email address associated with your account.\n" +
          "4. **Check Your Inbox**: Look for an email with a password reset link.\n" +
          "5. **Create a New Password**: Follow the link and set a new password.\n" +
          "6. **Log In**: Return to the login page and enter your credentials. You’re all set! 🔑";
      } else if (message.toLowerCase().includes("recommend some learning resources")) {
        applicationResponse = "Here are some fantastic learning resources:\n" +
          "- **[Coursera](https://www.coursera.org)**: Variety of courses from top universities.\n" +
          "- **[edX](https://www.edx.org)**: Access courses from renowned institutions.\n" +
          "- **[Khan Academy](https://www.khanacademy.org)**: Free foundational skills in math, science, and more! 📚\n" +
          "- **[Udacity](https://www.udacity.com)**: Focused tech skills with nano-degree programs.\n" +
          "- **[LinkedIn Learning](https://www.linkedin.com/learning)**: Professional development courses.\n" +
          "- **YouTube Channels**: Search for specific topics; many offer high-quality tutorials! 🎥";
      }

      conversationHistory.push({ role: 'user', content: message });
      conversationHistory.push({ role: 'assistant', content: applicationResponse });
      return NextResponse.json({ message: applicationResponse });
    }

    conversationHistory.push({ role: 'user', content: message });

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory
    ];

    if (messages.length > 11) {
      messages.splice(1, messages.length - 11);
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama3-8b-8192',
    });

    const response = chatCompletion.choices[0]?.message?.content || "No content returned";

    conversationHistory.push({ role: 'assistant', content: response });

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
