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

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;
  const canReset = totalVotes > 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={updateFeedback}
        onReset={resetFeedback}
        canReset={canReset}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}