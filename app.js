let lastReply = "";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value;
  if (!message) return;
  chatBox.innerHTML += `<p><strong>Tu:</strong> ${message}</p>`;
  input.value = "";

  const res = await fetch("/.netlify/functions/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await res.json();
  lastReply = data.reply;
  chatBox.innerHTML += `<p><strong>Assistente:</strong> ${data.reply}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  speak(lastReply);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'it-IT';
  speechSynthesis.speak(utterance);
}

function speakLast() {
  if (lastReply) speak(lastReply);
}