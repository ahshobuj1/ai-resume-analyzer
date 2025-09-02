interface TJob {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

export interface TResume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: TFeedback;
}

export interface TFeedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
    }[];
  };
}

export interface THandleAnalyzeProps {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
}
