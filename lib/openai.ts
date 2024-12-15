"use server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const fetchResponse = async (message: string) => {
    try {
        const response = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo",
        });
        return response.choices[0].message?.content;
    } catch (error) {
        console.error("Error fetching OpenAI response:", error);
        return "Sorry, I couldn't process that.";
    }
};
