import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FeedbackData {
  id: string;
  name: string;
  overallExperience: string;
  platformUsability: string;
  assessmentFairness: string;
  improvementSuggestions: string;
  submitted: boolean;
}

interface RadioQuestionProps {
  question: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const RadioQuestion: React.FC<RadioQuestionProps> = ({
  question,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="mb-8">
      <div className="text-lg font-medium text-gray-300 mb-3">{question}</div>
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option}
            className={`p-3 border rounded-lg flex items-center cursor-pointer transition-all ${
              value === option
                ? "border-purple-600 bg-gray-800 text-white"
                : "border-gray-700 hover:border-gray-600"
            }`}
            onClick={() => onChange(option)}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                value === option ? "border-purple-600" : "border-gray-600"
              }`}
            >
              {value === option && (
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              )}
            </div>
            <span className="text-gray-300">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TextFeedbackProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextFeedback: React.FC<TextFeedbackProps> = ({
  label,
  value,
  onChange,
  placeholder = "Share your thoughts...",
}) => {
  return (
    <div className="mb-8">
      <div className="text-lg font-medium text-gray-300 mb-3">{label}</div>
      <textarea
        className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white min-h-32 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-purple-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const FeedbackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Mock data - in a real app, you would fetch this from an API
        const mockData: FeedbackData = {
          id: id || "1",
          name: "Priyanshu Sandeep Kayarkar",
          overallExperience: "",
          platformUsability: "",
          assessmentFairness: "",
          improvementSuggestions: "",
          submitted: false,
        };

        setFeedbackData(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  useEffect(() => {
    if (feedbackData) {
      const fields = [
        "overallExperience",
        "platformUsability",
        "assessmentFairness",
        "improvementSuggestions",
      ];
      const filledFields = fields.filter(
        (field) => feedbackData[field as keyof FeedbackData],
      );
      setProgress((filledFields.length / fields.length) * 100);
    }
  }, [feedbackData]);

  const updateRating = (field: keyof FeedbackData, value: string) => {
    if (feedbackData) {
      setFeedbackData({
        ...feedbackData,
        [field]: value,
      });
    }
  };

  const updateText = (field: keyof FeedbackData, value: string) => {
    if (feedbackData) {
      setFeedbackData({
        ...feedbackData,
        [field]: value,
      });
    }
  };

  const handleSubmit = async () => {
    if (!feedbackData) return;

    setSubmitting(true);

    try {
      // In a real app, you would send this data to your API
      console.log("Submitting feedback:", feedbackData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFeedbackData({
        ...feedbackData,
        submitted: true,
      });

      setSubmitting(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitting(false);
      alert("There was an error submitting your feedback. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-gray-400">
          Loading feedback form...
        </div>
      </div>
    );
  }

  if (!feedbackData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <p className="text-gray-300 mb-4">Feedback form not found.</p>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="border-gray-700 text-gray-300"
        >
          Go Home
        </Button>
      </div>
    );
  }

  // Define the question options
  const overallOptions = ["Excellent", "Good", "Average", "Poor", "Very Poor"];
  const usabilityOptions = [
    "Very User-Friendly",
    "Somewhat User-Friendly",
    "Neutral",
    "Not Very User-Friendly",
    "Not User-Friendly at All",
  ];
  const assessmentOptions = [
    "Very Fair and Accurate",
    "Somewhat Fair and Accurate",
    "Neutral",
    "Not Very Fair or Accurate",
    "Not Fair or Accurate at All",
  ];

  if (feedbackData.submitted) {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        {/* Logo in top left corner */}
        <div
          className="absolute top-4 left-4 flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-12 h-12 border border-white rounded flex items-center justify-center">
            {/* Empty box for logo as requested */}
          </div>
          <h1 className="text-2xl font-bold text-white ml-2">NextHire</h1>
        </div>

        <div className="max-w-xl mx-auto bg-gray-950 rounded-xl shadow-sm p-8 mt-16">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-purple-900 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">Thank you!</h2>
            <p className="mt-2 text-gray-400">
              We appreciate your feedback, {feedbackData.name}.
            </p>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-6 px-4">
      {/* Logo in top left corner */}
      <div
        className="absolute top-4 left-4 flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-12 h-12 border border-white rounded flex items-center justify-center">
          {/* Empty box for logo as requested */}
        </div>
        <h1 className="text-2xl font-bold text-white ml-2">NextHire</h1>
      </div>

      <div className="max-w-xl mx-auto mt-16">
        {/* Header with Back Button */}
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>

        {/* Progress bar */}
        <ProgressBar progress={progress} />

        {/* Form Container */}
        <div className="bg-gray-950 rounded-xl shadow-sm p-6 mt-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">
              Hey, {feedbackData.name}!
            </h1>
            <p className="text-gray-400 mt-2">
              We'd love to hear about your interview experience with NextHire.
              Your feedback helps us improve.
            </p>
          </div>

          {/* Form Questions */}
          <RadioQuestion
            question="How would you rate your overall experience with NextHire?"
            options={overallOptions}
            value={feedbackData.overallExperience}
            onChange={(value) => updateRating("overallExperience", value)}
          />

          <RadioQuestion
            question="How user-friendly do you find the NextHire platform?"
            options={usabilityOptions}
            value={feedbackData.platformUsability}
            onChange={(value) => updateRating("platformUsability", value)}
          />

          <RadioQuestion
            question="How fair and accurate were the technical skill assessments?"
            options={assessmentOptions}
            value={feedbackData.assessmentFairness}
            onChange={(value) => updateRating("assessmentFairness", value)}
          />

          <TextFeedback
            label="Do you have any suggestions for improvement?"
            value={feedbackData.improvementSuggestions}
            onChange={(value) => updateText("improvementSuggestions", value)}
            placeholder="Your suggestions help us make NextHire better for everyone..."
          />

          <div className="mt-8">
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 h-auto text-base font-medium"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
