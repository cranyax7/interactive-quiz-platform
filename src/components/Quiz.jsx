function Quiz({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { addAttempt } = useQuiz();

  const handleAnswer = (answer, isCorrect) => {
    if (isCorrect) setScore(s => s + 1);
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        setIsCompleted(true);
        addAttempt({
          score,
          total: questions.length,
          timestamp: new Date().toISOString()
        });
      }
    }, 2000);
  };

  if (isCompleted) return <Scoreboard score={score} total={questions.length} />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Timer questionIndex={currentIndex} />
      <Question
        question={questions[currentIndex]}
        onSubmit={handleAnswer}
      />
      <Progress current={currentIndex + 1} total={questions.length} />
    </div>
  );
}

const Progress = React.memo(({ current, total }) => (
  <div className="mt-4">
    Progress: {current} / {total}
  </div>
));