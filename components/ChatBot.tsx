"use client";
import { useState } from "react";
import { fetchResponse } from "../lib/openai";

const ChatBot = () => {
    const [messages, setMessages] = useState<
        { sender: string; text: string }[]
    >([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (input.trim() === "") return;

        const userMessage = input;
        setMessages([...messages, { sender: "user", text: userMessage }]);
        setInput("");
        const botResponse = await fetchResponse(userMessage);

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                sender: "bot",
                text: botResponse || "Sorry, I couldn't process that.",
            },
        ]);
    };

    return (
        <div className="w-full max-w-md p-6 border border-gray-300 rounded-xl shadow-lg bg-white m-auto">
            <div className="flex flex-col space-y-4">
                <div className="space-y-3 overflow-y-auto h-96 custom-scrollbar">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`text-sm ${
                                msg.sender === "bot"
                                    ? "text-blue-600"
                                    : "text-gray-800"
                            }`}
                        >
                            <strong>
                                {msg.sender === "bot" ? "Bot: " : "You: "}
                            </strong>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="flex space-x-2 mt-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSend}
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
