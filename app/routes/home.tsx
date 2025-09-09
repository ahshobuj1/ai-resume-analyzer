import ResumeCard from '~/components/Resume/ResumeCard';
import type {Route} from './+types/home';
import Navbar from '~/components/Shared/Navbar';
import {usePuterStore} from '~/lib/puter';
import {Link, useNavigate} from 'react-router';
import {useEffect, useState} from 'react';
import type {TResume} from '~/types';
import WipeApp from './wipe';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'CareerScan'},
    {
      name: 'description',
      content:
        'CareerScan | AI Resume Analyzer & Scanner for Better Job Opportunities!',
    },
  ];
}

export default function Home() {
  const [resumes, setResumes] = useState<TResume[]>([]);
  const [loading, setLoading] = useState(false);
  const {auth, kv} = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResume = async () => {
      setLoading(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as TResume
      );

      console.log(parsedResumes);
      setResumes(parsedResumes);
      setLoading(false);
    };

    loadResume();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      {/* Navbar */}
      <Navbar />

      <section className="main-section">
        {/* Heading */}
        <div className="page-heading">
          <h1>Track Your Applications & Resume Rating</h1>

          {!loading && resumes.length === 0 ? (
            <h3 className="text-gray-500">
              No resumes found. Upload your first resume to get feedback.
            </h3>
          ) : (
            <h3 className="text-gray-500">
              Review your submission and check AI-Powered feedback
            </h3>
          )}
        </div>

        {/* loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/resume-scan-2.gif"
              className="w-52"
              alt="loading image"
            />
          </div>
        )}

        {/* Resume */}

        {!loading && resumes.length > 0 && (
          <>
            <Link
              to={'/wipe'}
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
              Clear all History
            </Link>

            <div className="resumes-section">
              {resumes.map((resume: TResume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          </>
        )}

        {!loading && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center  mt-10 gap-4">
            <Link
              to={'/upload'}
              className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
