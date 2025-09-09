import ScoreBadge from './ScoreBadge';

interface IProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader = ({title, categoryScore}: IProps) => {
  return (
    <div className="flex flex-row items-center py-2 gap-4 ">
      CategoryHeader
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

export default CategoryHeader;
