import dotenv from 'dotenv';

dotenv.config();

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
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set in environment variables');
  }

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
              "marks": number,
              "correctAnswer": "Brief answer or solution"
            }
          ]
        }
      ]
    }

    Notes:
    - Use "hard" for challenging questions, "medium" for moderate, and "easy" for easy ones.
    - Difficulty labels for students should be [Easy], [Moderate], [Challenging].
    - Ensure the total number of questions across all sections matches ${numQuestions}.
    Use professional language suitable for an academic assessment.
    Do not include any text before or after the JSON.
  `;

  // Fallback models for Mistral 7B on OpenRouter
  const mistralModels = [
    "mistralai/mistral-7b-instruct",
    "mistralai/mistral-7b-instruct-v0.2",
    "mistralai/mistral-7b-instruct:free",
    "mistralai/mistral-7b-instruct-v0.1"
  ];

  let lastError: Error | null = null;

  for (const model of mistralModels) {
    try {
      console.log(`Attempting AI generation with OpenRouter (${model})...`);
      
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://veda-ai.com",
          "X-Title": "VedaAI",
        },
        body: JSON.stringify({
          "model": model,
          "messages": [
            {
              "role": "user",
              "content": prompt
            }
          ],
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenRouter API error (${model}): ${response.status} ${JSON.stringify(errorData)}`);
      }

      const data = (await response.json()) as any;
      const text = data.choices[0].message.content;

      // Clean up the response text in case it contains markdown code blocks
      const cleanedText = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanedText) as AIResponse;
    } catch (error: any) {
      console.error(`Generation failed with ${model}:`, error.message);
      lastError = error;
      continue; // Try next model
    }
  }

  throw lastError || new Error('All Mistral models failed');
};
