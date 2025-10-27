"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { SECTIONS } from "@/lib/sections";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { getDisplayName } from "@/lib/displayNames";
import { getSectionTips, getSectionQuestions, hasSectionTips, type Tip, type QuizQuestion } from "@/lib/tipsData";
import type { Section } from "@/lib/sections";

type Tab = "tips" | "quiz";

export default function DicasPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguageContext();
  const section = params.section as string;
  const [activeTab, setActiveTab] = useState<Tab>("tips");
  const [tips, setTips] = useState<Tip[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!section || !SECTIONS.includes(section as Section)) {
      router.push("/");
      return;
    }

    if (!hasSectionTips(section as Section)) {
      router.push(`/estudo/${section}`);
      return;
    }

    const sectionTips = getSectionTips(section as Section);
    const sectionQuestions = getSectionQuestions(section as Section);
    
    // Carregar progresso salvo
    const savedTips = localStorage.getItem(`tips-${section}`);
    const savedProgress = savedTips ? JSON.parse(savedTips) : {};
    
    setTips(sectionTips.map(tip => ({
      ...tip,
      completed: savedProgress[tip.id] || false
    })));
    
    setQuestions(sectionQuestions);
    setSelectedAnswers(new Array(sectionQuestions.length).fill(-1));
  }, [section, router]);

  const handleTipToggle = (tipId: string) => {
    setTips(prev => prev.map(tip => {
      if (tip.id === tipId) {
        const updated = { ...tip, completed: !tip.completed };
        
        // Salvar no localStorage
        const saved = localStorage.getItem(`tips-${section}`);
        const savedProgress = saved ? JSON.parse(saved) : {};
        savedProgress[tipId] = updated.completed;
        localStorage.setItem(`tips-${section}`, JSON.stringify(savedProgress));
        
        return updated;
      }
      return tip;
    }));
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (showResults) return;
    
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!showResults) return 0;
    
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / questions.length) * 100);
  };

  const getCompletedTipsCount = () => {
    return tips.filter(tip => tip.completed).length;
  };

  if (!section || !SECTIONS.includes(section as Section) || !hasSectionTips(section as Section)) {
    return null;
  }

  const completedTips = getCompletedTipsCount();
  const totalTips = tips.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 to-white/60">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dicas e Prova: {getDisplayName(section)}
          </h1>
          <p className="text-gray-600">Aprenda as principais dicas e teste seu conhecimento</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab("tips")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "tips"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            📝 Dicas ({completedTips}/{totalTips})
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "quiz"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            🎯 Prova
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          {activeTab === "tips" ? (
            /* Tips Section */
            <div className="space-y-3">
              {tips.map((tip) => (
                <div
                  key={tip.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    tip.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => handleTipToggle(tip.id)}
                >
                  <div className={`flex-shrink-0 mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    tip.completed
                      ? "bg-green-500 border-green-600"
                      : "bg-white border-gray-400"
                  }`}>
                    {tip.completed && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className={`flex-1 text-sm leading-relaxed ${
                    tip.completed ? "text-gray-600 line-through" : "text-gray-800"
                  }`}>
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Quiz Section */
            <div>
              {!showResults ? (
                <>
                  {questions.length > 0 && currentQuestionIndex < questions.length ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm font-medium text-gray-500">
                          Pergunta {currentQuestionIndex + 1} de {questions.length}
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                          {questions[currentQuestionIndex].question}
                        </h2>

                        <div className="space-y-3">
                          {questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                                selectedAnswers[currentQuestionIndex] === index
                                  ? "bg-blue-50 border-blue-500 shadow-md"
                                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  selectedAnswers[currentQuestionIndex] === index
                                    ? "bg-blue-500 border-blue-600"
                                    : "bg-white border-gray-400"
                                }`}>
                                  <span className={`text-xs font-bold ${
                                    selectedAnswers[currentQuestionIndex] === index
                                      ? "text-white"
                                      : "text-gray-400"
                                  }`}>
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                </div>
                                <span className="text-gray-800">{option}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        {currentQuestionIndex > 0 && (
                          <button
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                          >
                            Anterior
                          </button>
                        )}
                        {currentQuestionIndex < questions.length - 1 ? (
                          <button
                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                            disabled={selectedAnswers[currentQuestionIndex] === -1}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Próxima
                          </button>
                        ) : (
                          <button
                            onClick={handleSubmitQuiz}
                            disabled={selectedAnswers.every(answer => answer === -1)}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Finalizar Prova
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">Nenhuma questão disponível para esta seção.</p>
                    </div>
                  )}
                </>
              ) : (
                /* Results */
                <div className="space-y-6">
                  <div className={`text-center py-8 rounded-2xl ${
                    calculateScore() >= 70 ? "bg-green-50" : calculateScore() >= 50 ? "bg-yellow-50" : "bg-red-50"
                  }`}>
                    <div className="text-6xl mb-4">
                      {calculateScore() >= 70 ? "🎉" : calculateScore() >= 50 ? "🙂" : "📚"}
                    </div>
                    <h2 className="text-3xl font-bold mb-2">
                      {calculateScore()}%
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {calculateScore() >= 70
                        ? "Parabéns! Você dominou este tema!"
                        : calculateScore() >= 50
                        ? "Bom trabalho! Continue estudando."
                        : "Continue praticando para melhorar."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {questions.map((question, index) => {
                      const isCorrect = selectedAnswers[index] === question.correctAnswer;
                      return (
                        <div
                          key={question.id}
                          className={`p-4 rounded-xl border-2 ${
                            isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold ${
                              isCorrect ? "bg-green-500" : "bg-red-500"
                            }`}>
                              {index + 1}
                            </div>
                            <p className="font-medium text-gray-900">{question.question}</p>
                          </div>
                          {question.explanation && (
                            <p className="text-sm text-gray-600 ml-9 mb-2">{question.explanation}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleRestartQuiz}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Fazer Novamente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

