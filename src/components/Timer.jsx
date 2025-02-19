import { useEffect, useCallback } from 'react';
import useTimer from '../hooks/useTimer';

const Timer = React.memo(({ questionIndex }) => {
  const { timeLeft, resetTimer } = useTimer(30, questionIndex);

  return (
    <div className="text-xl font-bold text-blue-600">
      Time Left: {timeLeft}s
    </div>
  );
});