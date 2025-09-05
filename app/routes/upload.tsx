import {useState, type FormEvent} from 'react';
import Navbar from '~/components/Shared/Navbar';
import FileUploader from '~/components/UI/FileUploader';
import {convertPdfToImage} from '~/utils/pdf2img';
import {usePuterStore} from '~/lib/puter';
import type {THandleAnalyzeProps} from '~/types';
import {generateUUID} from '~/utils/generateUUID';
import {prepareInstructions} from '../../constants';
import {useNavigate} from 'react-router';

const upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('Loading...');
  const [file, setFile] = useState<File | null>(null);

  const {fs, kv, ai} = usePuterStore();
  const navigate = useNavigate();

  const handleAnalyzeResume = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: THandleAnalyzeProps) => {
    setIsProcessing(true);

    // Upload file
    setStatusText('Uploading the file...');
    const uploadFile = await fs.upload([file]);
    if (!uploadFile) return setStatusText('Error: Failed to upload file.');

    // Cover pdf to image
    setStatusText('Converting PDF to image...');
    const imageFile = await convertPdfToImage(file);
    console.log(imageFile);

    if (!imageFile.file)
      return setStatusText('Error: Failed to convert pdf to image');

    // Upload image
    setStatusText('Uploading image...');
    const uploadImage = await fs.upload([imageFile.file]);
    if (!uploadImage) return setStatusText('Error: Failed to upload image');

    // Save key value
    setStatusText('Preparing data...');
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadFile.path,
      imagePath: uploadImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: '',
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    // Get feedback
    setStatusText('Analyzing...');
    const feedback = await ai.feedback(
      uploadFile.path,
      prepareInstructions({jobTitle, jobDescription})
    );

    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analysis completed, redirecting...');
    console.log(data);
    navigate(`/resume/${data.id}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest('form');
    if (!form) return;

    const formData = new FormData(form);

    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;
    if (!file) return;

    console.log(companyName, jobTitle, jobDescription, file);

    handleAnalyzeResume({companyName, jobTitle, jobDescription, file});
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
                className="w-full -mt-20"
              />
            </>
          ) : (
            <h2 className="text-gray-500">
              Drop your resume for an ATS score and improvement tips.
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
