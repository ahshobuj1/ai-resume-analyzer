interface TJob {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface TResume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: TFeedback;
}

interface TFeedback {
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
