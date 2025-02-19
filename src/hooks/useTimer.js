export default function useTimer(initialTime, resetDependency) {
    const [timeLeft, setTimeLeft] = useState(initialTime);
  
    useEffect(() => {
      setTimeLeft(initialTime);
    }, [resetDependency, initialTime]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return { timeLeft };
  }