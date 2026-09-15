import css from './VoteOptions.module.css';
import type { VoteType } from '../../types/votes';

interface VoteOptionsProps {
  onLeaveFeedback: (option: VoteType) => void;
  onReset: () => void;
  totalFeedback: number;
}

export default function VoteOptions({
  onLeaveFeedback,
  onReset,
  totalFeedback,
}: VoteOptionsProps) {
  return (
    <div className={css.container}>
      <button onClick={() => onLeaveFeedback('good')}>Good</button>
      <button onClick={() => onLeaveFeedback('neutral')}>Neutral</button>
      <button onClick={() => onLeaveFeedback('bad')}>Bad</button>
      {totalFeedback > 0 && (
        <button onClick={onReset} className={css.resetBtn}>
          Reset
        </button>
      )}
    </div>
  );
}