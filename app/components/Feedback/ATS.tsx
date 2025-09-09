interface TSuggestion {
  type: 'good' | 'improve';
  tip: string;
}

interface IATSProps {
  score: number;
  suggestions: TSuggestion[];
}

const ATS: React.FC<IATSProps> = ({score, suggestions}) => {
  const gradientClass =
    score > 69
      ? 'from-green-100'
      : score > 49
        ? 'from-blue-100'
        : 'from-red-100';

  const iconSrc =
    score > 69
      ? '/icons/ats-good.svg'
      : score > 49
        ? '/icons/ats-warning.svg'
        : '/icons/ats-bad.svg';

  const subTitle =
    score > 69 ? 'Great Job!' : score > 49 ? 'Good Work' : 'Needs Improvement';

  return (
    <div
      className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-ull p-6`}>
      {/* Icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="icons" />
        <div>
          <h2 className="text-2xl font-bold">ATS Score - {score}/100</h2>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{subTitle}</h2>
        <p className="text-gray-600 mb-4">
          This score represents how well your resume is likely to perform in
          Applicant Tracking Systems used by employers.
        </p>
      </div>

      {/* Suggestion */}
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div className="flex items-start gap-3" key={index}>
            <img
              src={
                suggestion.type === 'good'
                  ? '/icons/check.svg'
                  : '/icons/warning.svg'
              }
              alt={suggestion.type === 'good' ? 'good' : 'warning'}
              className="w-5 h-5 mt-1"
            />

            <p
              className={`${suggestion.type === 'good' ? 'text-green-700' : 'text-amber-700'}`}>
              {suggestion.tip}
            </p>
          </div>
        ))}
      </div>

      <p className="text-gray-700 italic mt-1">
        Keep refining your resume to improve your chances of getting past ATS
        filters and into the hands of recruiters.
      </p>
    </div>
  );
};

export default ATS;
