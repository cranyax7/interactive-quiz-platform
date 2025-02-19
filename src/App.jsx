import { QuizProvider } from './context/QuizContext';
import Quiz from './components/Quiz';
import { quizData } from './data/questions';
import AttemptHistory from './components/AttemptHistory';

function App() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{quizData.title}</h1>
        <Quiz questions={quizData.questions} />
        <AttemptHistory />
      </div>
    </QuizProvider>
  );
}

export default App;