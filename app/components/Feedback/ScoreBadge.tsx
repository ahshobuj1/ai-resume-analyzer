const ScoreBadge = ({score}: {score: number}) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 79) {
    badgeColor = 'text-green-600';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'text-blue-600';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'text-red-600';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
