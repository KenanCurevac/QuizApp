export type QuizData = {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  incorrectAnswers: string[];
  isNiche: boolean;
  question: {
    text: string;
  };
  regions?: string[];
  tags?: string[];
  type: "text_choice";
};
