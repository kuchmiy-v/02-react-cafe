import { useState, useEffect } from 'react';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';
import type { Votes, VoteType } from '../../types/votes';
import css from './App.module.css';

const STORAGE_KEY = 'cafe-votes';

export default function App() {
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  }, [votes]);

  const updateFeedback = (feedbackType: VoteType) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [feedbackType]: prevVotes[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
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