import { useState, useEffect } from 'react';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';
import css from './App.module.css';

export interface Votes {
  good: number;
  neutral: number;
  bad: number;
}

const STORAGE_KEY = 'cafe-votes';

export default function App() {
  // 1. Читання з localStorage при старті (Lazy state initialization)
  const [votes, setVotes] = useState<Votes>(() => {
    const savedVotes = localStorage.getItem(STORAGE_KEY);
    if (savedVotes !== null) {
      try {
        return JSON.parse(savedVotes);
      } catch (error) {
        console.error('Failed to parse saved votes:', error);
      }
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  // 2. Збереження у localStorage при кожній зміні стану votes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  }, [votes]);

  // Функція додавання голосу
  const updateFeedback = (feedbackType: keyof Votes) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [feedbackType]: prevVotes[feedbackType] + 1,
    }));
  };

  // Функція скидання голосів
  const resetFeedback = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = votes.good + votes.neutral + votes.bad;
  const positivePercentage =
    totalFeedback > 0 ? Math.round((votes.good / totalFeedback) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      
      <VoteOptions
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        totalFeedback={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <VoteStats
          good={votes.good}
          neutral={votes.neutral}
          bad={votes.bad}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}