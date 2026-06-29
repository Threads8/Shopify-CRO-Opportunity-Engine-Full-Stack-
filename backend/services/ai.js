const OpenAI = require('openai');
const { croAuditPrompt } = require('../utils/prompt');

const openai = new OpenAI({
  baseURL: process.env.NVIDIA_API_BASE_URL || 'https://integrate.api.nvidia.com/v1',
  apiKey: process.env.NVIDIA_API_KEY
});

const generateCROAudit = async (structuredData) => {
  try {
    const response = await openai.chat.completions.create({
      model: "z-ai/glm-5.1",
      messages: [
        {
          role: "system",
          content: croAuditPrompt
        },
        {
          role: "user",
          content: JSON.stringify(structuredData, null, 2)
        }
      ],
      temperature: 0.2,
      max_tokens: 4000,
      response_format: { type: "json_object" } // Assume the model supports JSON mode or we rely on the prompt to format as valid JSON.
    });

    const content = response.choices[0].message.content;
    
    // Parse the returned JSON
    let audit;
    try {
      audit = JSON.parse(content);
    } catch (parseError) {
      // In case the model returns markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        audit = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    return audit;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error(`Failed to generate CRO audit: ${error.message}`);
  }
};

module.exports = {
  generateCROAudit
};
