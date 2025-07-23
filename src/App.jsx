import './App.css';
import { Play } from 'lucide-react';
import { useState } from 'react';
import { URL } from './custom';
import Answer from './components/Answer';
import Logo from './assets/logo';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('history'))
  );

  const payload = {
    contents: [
      {
        parts: [
          {
            text: question,
          },
        ],
      },
    ],
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    if (localStorage.getItem('history')) {
      let historyData = JSON.parse(localStorage.getItem('history'));
      historyData = [question, ...historyData];
      localStorage.setItem('history', JSON.stringify(historyData));
      setHistory(historyData);
    } else {
      localStorage.setItem('history', JSON.stringify([question]));
      setHistory([question]);
    }
    let res = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    res = await res.json();
    const ans = res.candidates[0].content.parts[0].text;
    setAnswer((prev) => [
      ...prev,
      { type: 'q', text: question },
      { type: 'a', text: ans },
    ]);
    setQuestion('');
  };

  return (
    <div className="grid grid-cols-5 h-screen text-center overflow-auto">
      {/* sidebar */}
      <div className="col-span-1 bg-sidebar border border-black">
        <div className="flex justify-center p-5 bg-logoBG mb-2 border border-black">
          <Logo />
          <h1 className="font-bold text-2xl mt-2">RetroBot</h1>
        </div>
        <h1 className="font-bold text-xl text-start p-2">Conversations</h1>
        <ul className="p-2">
          {history &&
            history.map((item) => (
              <li className="text-start hover:bg-white hover:text-black-500">
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-span-4 border border-black p-10">
        <h1 className="text-3xl font-small">How can I help you today?</h1>
        <div className="container h-3/4 overflow-scroll flex-grow mb-4 p-5">
          {/* display Q&A */}
          {answer.map((item, index) =>
            item.type == 'q' ? (
              <div className="mb-3 flex justify-end" key={index}>
                <p className="text-right p-2 font-semibold text-gray-700 border border-black rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl w-fit bg-sidebar/50">
                  {item.text}
                </p>
              </div>
            ) : (
              <div className="mb-6" key={index}>
                <Answer answer={item.text} />
              </div>
            )
          )}
        </div>
        <div className="w-1/2 bg-sidebar text-black m-auto rounded-2xl text-black border border-black flex p-1 pr-5 h-16">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full h-full p-3 outline-none bg-transparent"
            placeholder="Ask me anything"
            onKeyDown={(e) => {
              if (e.key === 'Enter') askQuestion();
            }}
          />
          <button onClick={askQuestion} className="m-auto">
            <Play className="h-5 w-5 rotate-180" color="black" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
