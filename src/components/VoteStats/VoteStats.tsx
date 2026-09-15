import css from './VoteStats.module.css';

interface VoteStatsProps {
  good: number;
  neutral: number;
  bad: number;
  total: number;
  positivePercentage: number;
}

export default function VoteStats({
  good,
  neutral,
  bad,
  total,
  positivePercentage,
}: VoteStatsProps) {
  return (
    <div className={css.container}>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Positive feedback: {positivePercentage}%</p>
    </div>
  );
}