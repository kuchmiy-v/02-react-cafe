import css from './VoteOptions.module.css';

export type VoteType = 'good' | 'neutral' | 'bad';

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
      
      {/* Умовний рендеринг кнопки Reset */}
      {totalFeedback > 0 && (
        <button onClick={onReset} className={css.resetBtn}>
          Reset
        </button>
      )}
    </div>
  );
}