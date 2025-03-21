const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event, context) {
  const { message } = JSON.parse(event.body);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "Sei un facilitatore digitale AI ispirato al progetto Digitale Facile. Aiuta in modo semplice e passo passo persone con difficoltà digitali. Usa un tono empatico, e se richiesto, aggiungi la traduzione in dialetto romagnolo.",
      },
      { role: "user", content: message }
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: response.data.choices[0].message.content }),
  };
};