import ScoreBadge from './ScoreBadge';

interface ICategoryProps {
  title: string;
  score: number;
}

const Category = ({title, score}: ICategoryProps) => {
  const textColor =
    score > 79
      ? 'text-green-600'
      : score > 49
        ? 'text-blue-600'
        : 'text-red-600';

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>

        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

export default Category;
