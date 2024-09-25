
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
      "what cool features does adigitx.ai provide for users?",
      "how does anonymous.dev benefit developers in their projects?",
      "what unique role does adigitx.ai play in the tech community?",
      "is anonymous.dev under construction and what can we expect soon?",
      "what does anonymous.dev offer for collaboration and skill development?",
      "what is anynominous dev?",
      "what is adigitx.ai?",
      "is anynominous dev under construction?",
      "what is the use of it?"
    ];

    if (applicationQuestions.some(q => message.toLowerCase().includes(q))) {
      let applicationResponse;

    //   if (message.toLowerCase().includes("what cool features does adigitx.ai provide for users?")) {
    //     applicationResponse = "AdigitX.ai offers several cool features for users, including:\n" +
    //         " **Personalized Assistance**: Tailored responses to your queries.\n" +
    //         " **Task Management**: Help with writing, planning, and organizing tasks.\n" +
    //         " **Learning Resources**: Access to various educational materials and platforms.\n" +
    //         " **Engaging Conversations**: Friendly and interactive discussions to enhance your experience. 🌟";
    // }
    //   if (message.toLowerCase().includes("how does anonymous.dev benefit developers in their projects?")) {
    //     applicationResponse = "Anynomous.dev offers several benefits to developers, including:\n" +
    //         "- **Collaboration Tools**: Effortless integration for team projects, enhancing teamwork.\n" +
    //         "- **Skill Development**: Access to a variety of resources and learning paths for continuous growth.\n" +
    //         "- **Community Support**: A vibrant community for sharing ideas, solutions, and feedback.\n" +
    //         "- **Project Management**: Effective tools to help manage tasks and timelines efficiently. 🛠️"; 
    // }
    //   if (message.toLowerCase().includes("what unique role does adigitx.ai play in the tech community?")) {
    //     applicationResponse = "AdigitX.ai plays a unique role in the tech community by:\n" +
    //         "- **Fostering Innovation**: Encouraging new ideas and approaches to problem-solving.\n" +
    //         "- **Providing Guidance**: Offering insights and assistance for tech enthusiasts and professionals.\n" +
    //         "- **Connecting Individuals**: Bridging gaps between learners, developers, and industry experts.\n" +
    //         "- **Promoting Inclusivity**: Ensuring resources and support are accessible to everyone. 🌈";
    // } 
    //   if (message.toLowerCase().includes("is anonymous.dev under construction and what can we expect soon?")) {
    //     applicationResponse = "Yes, Anynomous.dev is currently under construction! 🚧 Soon, you can expect:\n" +
    //         "- **Enhanced Features**: New tools and resources for developers.\n" +
    //         "- **User-Friendly Interface**: A more intuitive design for better navigation.\n" +
    //         "- **Increased Collaboration Opportunities**: New ways to connect and work with peers.\n" +
    //         "- **Regular Updates**: Stay tuned for exciting announcements! 📢";
    // } 
    // if (message.toLowerCase().includes("what does anonymous.dev offer for collaboration and skill development?")) {
    //     applicationResponse = "Anynomous.dev offers several advantages for collaboration and skill development:\n" +
    //         "- **Real-Time Collaboration**: Work together on projects seamlessly.\n" +
    //         "- **Resource Sharing**: Easily share tools, tips, and materials with peers.\n" +
    //         "- **Mentorship Programs**: Connect with experienced developers for guidance.\n" +
    //         "- **Skill-Building Workshops**: Participate in events to enhance your abilities. 💡";
    // }
    // if (message.toLowerCase().includes("what is anynominous dev?")) {
    //   applicationResponse = "Anynomous.dev is a platform for developers to collaborate, meet people, share connections, work on projects together, and discover new skill sets. Adi-gitx.ai is a part of Anynomous.dev.";
    // }
    
    // if (message.toLowerCase().includes("what is adigitx.ai?")) {
    //     applicationResponse = "AdigitX.ai is an AI platform designed to match the skill sets of two people, facilitating anonymous connections that help find individuals with similar interests as well as those looking to collaborate and help you build your dream idea.";
    // }
    
    // if (message.toLowerCase().includes("is anynominous dev under construction?")) {
    //     applicationResponse = "Yes, Anynomous.dev is currently under construction. Adi-gitx is working hard to complete the project soon. Anynomous.dev will be available shortly with many more features and functionalities, so stay tuned!";
    // }
    
    // if (message.toLowerCase().includes("what is the use of this?")) {
    //     applicationResponse = "I’ve shared all the important key aspects of the app related to collaboration and much more. If you’re still curious, stay tuned—you’ll learn more soon!";
    // }
    if (message.toLowerCase().includes("what is anynominous dev?")) {
      applicationResponse = "🌟✨ Anynomous.dev is like your ultimate playground for developers! 🎠\nIt's a vibrant platform where you can collaborate, meet fellow innovators, share connections, work on exciting projects together, and even discover new skills. 🔗💻\nAnd guess what? Adi-gitx.ai is a fantastic part of this community, helping you make the most of your connections! 🤝🚀";
    }
    
    if (message.toLowerCase().includes("what is adigitx.ai?")) {
        applicationResponse = "🤖🌐 AdigitX.ai is your personal AI matchmaker for skills! 🎯\nIt cleverly pairs you with like-minded individuals who share your interests. 💡✨\nWhether you're looking to collaborate or find inspiration for your next big idea, AdigitX.ai is here to help you connect and bring your dreams to life! 🎉🌈";
    }
    
    if (message.toLowerCase().includes("is anynominous dev under construction?")) {
        applicationResponse = "🚧🔧 Yes, Anynomous.dev is currently under construction! 🏗️\nBut don't worry—Adi-gitx is working tirelessly behind the scenes to bring you a whole new experience. 🌟\nStay tuned for a grand unveiling filled with awesome features and functionalities that will elevate your collaboration game! 🎉💪";
    }
    
    if (message.toLowerCase().includes("what is the use of it?")) {
        applicationResponse = "💡✨ I’ve shared all the key aspects of our platform, focusing on collaboration and more! 🤔\nIf you're still curious, it just means you're ready for some exciting discoveries. 🌈\nStick around—there's so much more to come, and you won't want to miss it! 🚀🔍";
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
