import {Link} from 'react-router';
import ScoreCircle from '../UI/ScoreCircle';

const ResumeCard = ({resume}: {resume: TResume}) => {
  const {id, companyName, jobTitle, imagePath, feedback} = resume;

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2 text-center md:text-start">
          <h2 className="font-bold break-words">{companyName}</h2>
          <h3 className="text-gray-500 break-words text-lg">{jobTitle}</h3>
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt="resume image"
            className="w-full h-[350px] max-sm:h-[300px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
