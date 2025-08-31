import ResumeCard from '~/components/Resume/ResumeCard';
import {resumes} from '../../constants';
import type {Route} from './+types/home';
import Navbar from '~/components/Shared/Navbar';

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
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      {/* Navbar */}
      <Navbar />

      <section className="main-section">
        {/* Heading */}
        <div className="page-heading">
          <h1>Track Your Applications & Resume Rating</h1>
          <h3 className="text-gray-500">
            Review your submission and check AI-Powered feedback
          </h3>
        </div>

        {/* Resume */}

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume: TResume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
