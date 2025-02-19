import { useState } from "react";

export default function Question({ question, onSubmit, showFeedback }) {
    const [answer, setAnswer] = useState('');
  
    const handleSubmit = () => {
      onSubmit(answer);
      setAnswer('');
    };
  
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{question.question}</h3>
        {question.type === 'mcq' ? (
          question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSubmit(i)}
              className={`block w-full p-2 text-left rounded ${
                showFeedback 
                  ? i === question.correct 
                    ? 'bg-green-200' 
                    : 'bg-red-200'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {opt}
            </button>
          ))
        ) : (
          <>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border p-2 rounded"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button onClick={handleSubmit} className="bg-blue-500 ml-2 text-white p-2 rounded">Submit</button>
          </>
        )}
      </div>
    );
  }