import fs from 'fs';
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/VITE_GEMINI_API_KEY=(.*)/);
if (!match) { console.log('API key not found'); process.exit(1); }
const apiKey = match[1].trim();

async function testApi(modelName) {
  try {
    console.log('\n--- Testing Model:', modelName, '---');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello' }] }]
      })
    });
    console.log('Status:', response.status);
    if (!response.ok) {
      console.log('Error Body:', await response.text());
    } else {
      const data = await response.json();
      console.log('Success! Reply:', data.candidates[0].content.parts[0].text.trim());
    }
  } catch (err) {
    console.log('Exception:', err.message);
  }
}

async function run() {
  await testApi('gemini-1.5-flash');
  await testApi('gemini-3.5-flash');
}
run();
