import "./App.css";
import OpenAI from "../node_modules/openai-api";

// This is stored in the .env file in the root directory. This file is .gitignored
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

function App() {
  return (
    <div className="App">
      <h1>AI-Powered interview questions generator</h1>
      <textarea
        id="userText"
        name="Specification"
        rows="12"
        defaultValue="Create a list of questions for my interview with a data scientist: 1."
      />
      <p></p>
      <button onClick={getAIResponse}>Generate</button>
      <h2 id="responseData">
        {/* This is rendered in via the getAIResponse function that is called when the button is pressed */}
      </h2>
    </div>
  );
}

function getAIResponse() {
  (async () => {
    const gptResponse = await openai.complete({
      engine: "davinci-instruct-beta",
      prompt: document.getElementById("userText").value,
      maxTokens: 64,
      temperature: 0.8,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["\n", "testing"],
    });

    console.log(gptResponse.data.choices[0].text);
    document.getElementById("responseData").innerHTML =
      gptResponse.data.choices[0].text;
    // return gptResponse.data.choices[0];
  })();
  console.log(document.getElementById("userText").value);
}

export default App;
