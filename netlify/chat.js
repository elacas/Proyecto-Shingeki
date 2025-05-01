const { Configuration, OpenAIApi } = require('openai');

exports.handler = async function(event, context) {
  // Verificar método
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const { character, message } = JSON.parse(event.body);
    
    // Configurar OpenAI (la API key se configura en las variables de entorno de Netlify)
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    // Contextos de personajes
    const characterContexts = {
      "eren": "Eres Eren Yeager de Shingeki no Kyojin...",
      // Más personajes...
    };
    
    // Verificar personaje
    if (!characterContexts[character.toLowerCase()]) {
      return {
        statusCode: 200,
        body: JSON.stringify({ response: "Este personaje no está disponible para chat." })
      };
    }
    
    // Solicitud a OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: characterContexts[character.toLowerCase()] },
        { role: "user", content: message }
      ],
      max_tokens: 150,
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ response: completion.data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' })
    };
  }
};
