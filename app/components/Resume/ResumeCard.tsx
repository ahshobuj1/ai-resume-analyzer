import {Link} from 'react-router';
import ScoreCircle from '../UI/ScoreCircle';
import type {TResume} from '~/types';
import {useEffect, useState} from 'react';
import {usePuterStore} from '~/lib/puter';

const ResumeCard = ({resume}: {resume: TResume}) => {
  const {fs} = usePuterStore();
  const {id, companyName, jobTitle, feedback} = resume;
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [resume]);

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
          <ScoreCircle score={feedback?.overallScore} />
        </div>
      </div>

      {resumeUrl ? (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume image"
              className="w-full h-[350px] max-sm:h-[300px] object-cover object-top"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan.gif" alt="resume" />
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
