import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router';
import ATS from '~/components/Feedback/ATS';
import Details from '~/components/Feedback/Details';
import Summary from '~/components/Feedback/Summary';
import {usePuterStore} from '~/lib/puter';

const resume = () => {
  const [resumeUrl, setResumeUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [feedback, setFeedback] = useState('');

  const {id} = useParams();
  const {auth, isLoading, fs, kv} = usePuterStore();

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    const resumeData = await kv.get(`resume:${id}`);
    if (!resumeData) return;
    const data = JSON.parse(resumeData);

    const resumeBlob = await fs.read(data.resumePath);
    if (!resumeBlob) return;
    const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
    const resumeUrl = URL.createObjectURL(pdfBlob);
    setResumeUrl(resumeUrl);

    const imageBlob = await fs.read(data.imagePath);
    if (!imageBlob) return;
    const imageUrl = URL.createObjectURL(imageBlob);
    setImageUrl(imageUrl);

    setFeedback(data.feedback);
    console.log({imageUrl, resumeUrl, feedback: data.feedback});
  };

  return (
    <main>
      <nav className="resume-nav">
        <Link to={'/'} className="back-button">
          <img src="/icons/back.svg" alt="back logo" className="h-2.5 w-2.5" />
          <span className="text-gray-900 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse ">
        <div className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center ">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-xl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="resume"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </a>
            </div>
          )}
        </div>

        {/* Feedback Section */}
        <div className="feedback-section">
          <h2 className="text-4xl font-bold">Resume Review</h2>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary />
              <ATS />
              <Details />
            </div>
          ) : (
            <img
              src="/images/resume-scan-2.gif"
              alt="scanner"
              className="w-full"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default resume;
