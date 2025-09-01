import {useState, type FormEvent} from 'react';
import Navbar from '~/components/Shared/Navbar';
import FileUploader from '~/components/UI/FileUploader';

const upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('Initial Text');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest('form');
    if (!form) return;

    const formData = new FormData(form);

    const companyName = formData.get('company-name');
    const jobTitle = formData.get('job-title');
    const jobDescription = formData.get('job-description');
    if (!file) return;

    console.log(companyName, jobTitle, jobDescription, file);
  };

  return (
    <main className="bg-[url('images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        {/* Heading */}
        <div className="page-heading">
          <h1>Track Your Applications & Resume Rating</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="images/resume-scan.gif"
                alt="pdf scan"
                className="w-full"
              />
            </>
          ) : (
            <h2 className="text-gray-500">
              Drop your resume fir an ATS score and improvement tips.
            </h2>
          )}

          {!isProcessing && (
            <>
              <form
                onSubmit={handleSubmit}
                id="upload-form"
                className="flex flex-col gap-4 mt-8">
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="Company Name"
                    id="company-name"
                  />
                </div>

                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="Job Title"
                    id="job-title"
                  />
                </div>

                <div className="form-div">
                  <label htmlFor="job-description">Job Description</label>
                  <input
                    type="text"
                    name="job-description"
                    placeholder="Job Description"
                    id="job-description"
                  />
                </div>

                <div className="form-div">
                  <label htmlFor="job-description">Upload Resume</label>
                  <FileUploader setFile={setFile} />
                </div>

                <button className="primary-button" type="submit">
                  Analyze Resume
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
