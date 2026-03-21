import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;

async function testOpenRouter() {
  if (!apiKey) {
    console.error('❌ OPENROUTER_API_KEY is not set in .env');
    return;
  }

  console.log('Testing OpenRouter API (Mistral 7B)...');
  
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
          {
            "role": "user",
            "content": "Say 'Mistral 7B is active' if you receive this."
          }
        ],
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(`❌ OpenRouter FAILED: ${response.status} ${JSON.stringify(errorData)}`);
      return;
    }

    const data = await response.json() as any;
    console.log(`✅ OpenRouter (Mistral 7B) is WORKING: ${data.choices[0].message.content}`);
  } catch (error: any) {
    console.log(`❌ Error connecting to OpenRouter: ${error.message}`);
  }
}

testOpenRouter();
