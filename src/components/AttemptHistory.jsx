function AttemptHistory() {
    const { attempts } = useQuiz();
  
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Attempt History</h2>
        {attempts.map((attempt, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded mb-2">
            {new Date(attempt.timestamp).toLocaleString()} - 
            {attempt.score}/{attempt.total} (
            {Math.round((attempt.score / attempt.total) * 100})%)
          </div>
        ))}
      </div>
    );
}

export default AttemptHistory;