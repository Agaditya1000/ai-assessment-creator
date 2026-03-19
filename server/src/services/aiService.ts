import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface AIResponse {
  sections: {
    title: string;
    instruction: string;
    questions: {
      text: string;
      difficulty: 'easy' | 'medium' | 'hard';
      marks: number;
    }[];
  }[];
}

export const generateAssessment = async (
  topic: string,
  numQuestions: number,
  questionTypes: string[],
  additionalInstructions?: string
): Promise<AIResponse> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Generate a structured question paper on the topic: "${topic}".
    Number of questions: ${numQuestions}.
    Question types: ${questionTypes.join(', ')}.
    Additional instructions: ${additionalInstructions || 'None'}.

    Output the response in strict JSON format with the following structure:
    {
      "sections": [
        {
          "title": "Section Title",
          "instruction": "Section Instruction",
          "questions": [
            {
              "text": "Question text?",
              "difficulty": "easy/medium/hard",
              "marks": number
            }
          ]
        }
      ]
    }

    Ensure the total number of questions across all sections matches ${numQuestions}.
    Use professional language suitable for an academic assessment.
    Do not include any text before or after the JSON.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    // Clean up the response text in case it contains markdown code blocks
    const cleanedText = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedText) as AIResponse;
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('Invalid response from AI');
  }
};
