import { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const stripMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")  // bold
    .replace(/\*(.*?)\*/g, "$1")      // italic
    .replace(/`(.*?)`/g, "$1")        // inline code
    .replace(/[_~>#-]/g, "")          // other symbols
    .replace(/\n{2,}/g, "\n")         // remove excessive new lines
    .trim();
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Starter bot message on open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { role: "bot", content: "Hi, I’m MediLink assistant. How may I help you?" },
      ]);
    }
  }, [open]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput("");

  try {
    const res = await fetch("http://localhost:5001/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `You are a helpful assistant for MediLink, a healthcare platform. Only answer questions related to:
        - Booking appointments
        - Uploading reports
        - Consulting with doctors
        - Viewing medical history
        - Registration or login process

        If the user asks unrelated questions, reply:
        "I'm here to assist with MediLink-related queries only.".

        User: ${input}
        Answer in simple plain text only, no formatting or symbols.`,
      }),
    });

    const data = await res.json();
    const botReply = { role: "bot", content: stripMarkdown(data.reply) };
    setMessages(prev => [...prev, botReply]);
  } catch (err) {
    console.error(err);
    setMessages(prev => [...prev, { role: "bot", content: "Oops! Something went wrong." }]);
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg"
        >
          <FaRobot size={24} />
        </button>
      ) : (
        <div className="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col">
          <div className="flex justify-between items-center px-4 py-2 bg-blue-500 text-white rounded-t-xl">
            <span>MediLink Chatbot</span>
            <button onClick={() => setOpen(false)}>
              <IoMdClose size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-${msg.role === "user" ? "right" : "left"}`}>
                <span
                  className={`inline-block p-2 rounded max-w-[80%] ${
                    msg.role === "user" ? "bg-blue-100" : "bg-gray-200"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left text-xs text-gray-500 italic animate-pulse">
                MediLink is typing...
              </div>
            )}
          </div>

          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border p-2 rounded text-sm"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSend}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
