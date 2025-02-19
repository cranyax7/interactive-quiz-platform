function QuizProvider({ children }) {
  const [attempts, setAttempts] = useState([]);

  const addAttempt = (attempt) => {
    setAttempts(prev => [attempt, ...prev.slice(0, 4)]);
  };

  return (
    <QuizContext.Provider value={{ attempts, addAttempt }}>
      {children}
    </QuizContext.Provider>
  );
}