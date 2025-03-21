
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  PlusCircle, 
  Trash2,
  UploadCloud,
  Check
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type QuestionType = 'multiple-choice' | 'single-choice' | 'coding' | 'text';

interface QuestionCreatorProps {
  onSave: (question: any) => void;
  onCancel: () => void;
  initialQuestion?: any;
}

const QuestionCreator = ({ onSave, onCancel, initialQuestion }: QuestionCreatorProps) => {
  const { toast } = useToast();
  const [questionType, setQuestionType] = useState<QuestionType>(initialQuestion?.type || 'multiple-choice');
  const [question, setQuestion] = useState(initialQuestion?.question || '');
  const [options, setOptions] = useState(initialQuestion?.options || ['', '']);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(initialQuestion?.correctAnswers || []);
  const [singleCorrectAnswer, setSingleCorrectAnswer] = useState<string>(initialQuestion?.correctAnswer || '');
  const [codeTemplate, setCodeTemplate] = useState(initialQuestion?.codeTemplate || 'function solve() {\n  // Write your solution here\n}');
  const [difficulty, setDifficulty] = useState(initialQuestion?.difficulty || 'medium');
  const [points, setPoints] = useState(initialQuestion?.points || 10);
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [isProcessingJson, setIsProcessingJson] = useState(false);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    
    // Also remove from correct answers if selected
    if (questionType === 'multiple-choice') {
      setCorrectAnswers(correctAnswers.filter(answer => answer !== options[index]));
    } else if (questionType === 'single-choice' && singleCorrectAnswer === options[index]) {
      setSingleCorrectAnswer('');
    }
  };

  const toggleCorrectAnswer = (option: string) => {
    if (correctAnswers.includes(option)) {
      setCorrectAnswers(correctAnswers.filter(answer => answer !== option));
    } else {
      setCorrectAnswers([...correctAnswers, option]);
    }
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setJsonFile(file);
    }
  };

  const processJsonFile = () => {
    if (!jsonFile) return;
    
    setIsProcessingJson(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        
        // Process the first question from the JSON file
        if (jsonData.questions && jsonData.questions.length > 0) {
          const importedQuestion = jsonData.questions[0];
          
          setQuestion(importedQuestion.question || '');
          setQuestionType(importedQuestion.type || 'multiple-choice');
          setOptions(importedQuestion.options || ['', '']);
          setDifficulty(importedQuestion.difficulty || 'medium');
          setPoints(importedQuestion.points || 10);
          
          if (importedQuestion.type === 'multiple-choice') {
            setCorrectAnswers(importedQuestion.correctAnswers || []);
          } else if (importedQuestion.type === 'single-choice') {
            setSingleCorrectAnswer(importedQuestion.correctAnswer || '');
          } else if (importedQuestion.type === 'coding') {
            setCodeTemplate(importedQuestion.codeTemplate || '');
          }
          
          toast({
            title: "JSON Imported",
            description: "Question data has been successfully imported.",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse JSON file. Please check the format.",
          variant: "destructive",
        });
      }
      
      setIsProcessingJson(false);
    };
    
    reader.readAsText(jsonFile);
  };

  const handleSave = () => {
    // Validate question
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question.",
        variant: "destructive",
      });
      return;
    }

    // Validate options for multiple/single choice
    if ((questionType === 'multiple-choice' || questionType === 'single-choice') && 
        options.some(option => !option.trim())) {
      toast({
        title: "Error",
        description: "All options must have content.",
        variant: "destructive",
      });
      return;
    }

    // Validate correct answer selection
    if (questionType === 'multiple-choice' && correctAnswers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one correct answer.",
        variant: "destructive",
      });
      return;
    }

    if (questionType === 'single-choice' && !singleCorrectAnswer) {
      toast({
        title: "Error",
        description: "Please select a correct answer.",
        variant: "destructive",
      });
      return;
    }

    // Create question object
    const newQuestion: any = {
      id: initialQuestion?.id || `q_${Date.now()}`,
      question,
      type: questionType,
      difficulty,
      points: Number(points),
    };

    // Add type-specific properties
    if (questionType === 'multiple-choice') {
      newQuestion.options = options;
      newQuestion.correctAnswers = correctAnswers;
    } else if (questionType === 'single-choice') {
      newQuestion.options = options;
      newQuestion.correctAnswer = singleCorrectAnswer;
    } else if (questionType === 'coding') {
      newQuestion.codeTemplate = codeTemplate;
    }

    onSave(newQuestion);
  };

  return (
    <div className="space-y-6 rounded-xl bg-nexthire-card-gray p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-white">Create Question</h2>
        
        <div className="flex space-x-2">
          <label htmlFor="json-upload" className="cursor-pointer">
            <div className="flex items-center rounded-md border border-nexthire-dark-gray px-3 py-1 text-sm text-white hover:bg-nexthire-dark-gray">
              <UploadCloud className="mr-2 h-4 w-4" />
              Import JSON
            </div>
            <input 
              id="json-upload" 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={handleJsonUpload}
            />
          </label>
          
          {jsonFile && (
            <Button
              variant="outline"
              size="sm"
              onClick={processJsonFile}
              disabled={isProcessingJson}
              className="text-sm"
            >
              {isProcessingJson ? "Processing..." : "Process JSON"}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="question-type" className="text-white">Question Type</Label>
          <Select
            value={questionType}
            onValueChange={(value) => setQuestionType(value as QuestionType)}
          >
            <SelectTrigger id="question-type" className="border-nexthire-dark-gray bg-nexthire-light-gray text-white">
              <SelectValue placeholder="Select a question type" />
            </SelectTrigger>
            <SelectContent className="bg-nexthire-dark-gray text-white">
              <SelectItem value="multiple-choice">Multiple Choice (Multiple Answers)</SelectItem>
              <SelectItem value="single-choice">Multiple Choice (Single Answer)</SelectItem>
              <SelectItem value="coding">Coding Question</SelectItem>
              <SelectItem value="text">Text Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="question-text" className="text-white">Question</Label>
          <Textarea
            id="question-text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here"
            className="min-h-[100px] border-nexthire-dark-gray bg-nexthire-light-gray text-white placeholder:text-nexthire-text-gray"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="difficulty" className="text-white">Difficulty</Label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}
            >
              <SelectTrigger id="difficulty" className="border-nexthire-dark-gray bg-nexthire-light-gray text-white">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-nexthire-dark-gray text-white">
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="points" className="text-white">Points</Label>
            <Input
              id="points"
              type="number"
              min="1"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              className="border-nexthire-dark-gray bg-nexthire-light-gray text-white"
            />
          </div>
        </div>

        {/* Multiple Choice Options */}
        {(questionType === 'multiple-choice' || questionType === 'single-choice') && (
          <div className="space-y-4">
            <Label className="text-white">Options</Label>
            
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                {questionType === 'multiple-choice' ? (
                  <Checkbox
                    id={`option-${index}`}
                    checked={correctAnswers.includes(option)}
                    onCheckedChange={() => option && toggleCorrectAnswer(option)}
                    disabled={!option}
                  />
                ) : (
                  <Radio
                    value={option}
                    checked={singleCorrectAnswer === option}
                    onCheckedChange={() => option && setSingleCorrectAnswer(option)}
                    disabled={!option}
                  />
                )}
                
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 border-nexthire-dark-gray bg-nexthire-light-gray text-white placeholder:text-nexthire-text-gray"
                />
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(index)}
                  className="text-nexthire-text-gray hover:text-white"
                  disabled={options.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addOption}
              className="w-full border-dashed border-nexthire-dark-gray text-nexthire-text-gray hover:border-nexthire-purple hover:text-nexthire-purple"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>
        )}

        {/* Coding Template */}
        {questionType === 'coding' && (
          <div>
            <Label htmlFor="code-template" className="text-white">Code Template</Label>
            <Textarea
              id="code-template"
              value={codeTemplate}
              onChange={(e) => setCodeTemplate(e.target.value)}
              placeholder="Enter starter code template"
              className="font-mono min-h-[200px] border-nexthire-dark-gray bg-nexthire-light-gray text-white placeholder:text-nexthire-text-gray"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-nexthire-dark-gray text-white hover:bg-nexthire-dark-gray"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-nexthire-purple hover:bg-nexthire-dark-purple"
          >
            <Check className="mr-2 h-4 w-4" />
            Save Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreator;
