"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  CheckCircle2,
  ArrowRight,
  Brain,
  Target,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userName, setUserName] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: userData } = await supabase
      .from('users')
      .select('name')
      .eq('id', user.id)
      .single();

    if (userData) {
      setUserName(userData.name.split(' ')[0]);
    }
  };

  const quizQuestions = [
    {
      question: "Qual é a estrutura básica de uma redação dissertativa-argumentativa?",
      options: [
        "Introdução, desenvolvimento e conclusão",
        "Título, corpo e referências",
        "Resumo, análise e opinião",
        "Apresentação, discussão e finalização"
      ],
      correct: 0,
      explanation: "A estrutura clássica é: Introdução (apresentação do tema), Desenvolvimento (argumentação) e Conclusão (proposta de intervenção)."
    },
    {
      question: "Quantas competências são avaliadas na redação do ENEM?",
      options: ["3 competências", "4 competências", "5 competências", "6 competências"],
      correct: 2,
      explanation: "O ENEM avalia 5 competências: domínio da norma culta, compreensão do tema, argumentação, coesão e proposta de intervenção."
    },
    {
      question: "O que é coesão textual?",
      options: [
        "A beleza do texto",
        "A conexão lógica entre as partes do texto",
        "O tamanho do texto",
        "A quantidade de parágrafos"
      ],
      correct: 1,
      explanation: "Coesão é o uso de conectivos e elementos linguísticos que garantem a conexão lógica entre frases e parágrafos."
    },
    {
      question: "Qual o tamanho ideal de uma redação do ENEM?",
      options: [
        "Entre 7 e 15 linhas",
        "Entre 15 e 20 linhas",
        "Entre 20 e 30 linhas",
        "Acima de 30 linhas"
      ],
      correct: 2,
      explanation: "O ideal é escrever entre 20 e 30 linhas, garantindo desenvolvimento completo dos argumentos sem ser prolixo."
    },
    {
      question: "O que caracteriza uma boa proposta de intervenção?",
      options: [
        "Apenas sugerir uma solução genérica",
        "Apresentar agente, ação, meio, finalidade e detalhamento",
        "Criticar o governo",
        "Repetir o que foi dito na introdução"
      ],
      correct: 1,
      explanation: "Uma proposta completa deve ter: quem vai fazer (agente), o que fazer (ação), como fazer (meio/modo), para quê (finalidade) e detalhamento."
    },
    {
      question: "Qual a importância do repertório sociocultural?",
      options: [
        "Apenas para encher o texto",
        "Para demonstrar conhecimento e fundamentar argumentos",
        "Não é importante",
        "Apenas para impressionar o corretor"
      ],
      correct: 1,
      explanation: "O repertório (citações, dados, referências culturais) demonstra conhecimento de mundo e fortalece seus argumentos."
    },
    {
      question: "Como deve ser a linguagem em uma redação dissertativa?",
      options: [
        "Informal e coloquial",
        "Formal e impessoal",
        "Poética e subjetiva",
        "Técnica e complexa"
      ],
      correct: 1,
      explanation: "A linguagem deve ser formal (norma culta), impessoal (3ª pessoa), clara e objetiva, evitando gírias e expressões coloquiais."
    },
    {
      question: "Qual erro pode zerar sua redação no ENEM?",
      options: [
        "Usar conectivos demais",
        "Fugir do tema proposto",
        "Escrever menos de 25 linhas",
        "Não usar citações"
      ],
      correct: 1,
      explanation: "Fugir do tema (tangenciar ou não abordar o tema proposto) pode resultar em nota zero. Outros motivos: cópia dos textos motivadores, texto insuficiente (<7 linhas), desrespeito aos direitos humanos."
    },
    {
      question: "Quantos parágrafos deve ter uma redação bem estruturada?",
      options: [
        "2 parágrafos",
        "3 parágrafos",
        "4 a 5 parágrafos",
        "Mais de 6 parágrafos"
      ],
      correct: 2,
      explanation: "O ideal é 4 a 5 parágrafos: 1 de introdução, 2 ou 3 de desenvolvimento (cada um com um argumento) e 1 de conclusão."
    },
    {
      question: "O que NÃO deve aparecer em uma redação dissertativa-argumentativa?",
      options: [
        "Argumentos bem fundamentados",
        "Opinião pessoal explícita (eu acho, eu penso)",
        "Dados e estatísticas",
        "Proposta de solução"
      ],
      correct: 1,
      explanation: "Evite usar 1ª pessoa (eu, nós) e expressões como 'eu acho', 'na minha opinião'. Use 3ª pessoa e linguagem impessoal."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // Calcular resultado
      const correctCount = newAnswers.filter((answer, index) => 
        answer === quizQuestions[index].correct
      ).length;
      setScore(correctCount);
      setShowResults(true);
    }
  };

  const handleContinue = async () => {
    // Salvar progresso do quiz no banco
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('users')
        .update({ 
          onboarding_completed: true,
          quiz_score: score 
        })
        .eq('id', user.id);
    }

    router.push("/curso");
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  if (showResults) {
    const percentage = (score / quizQuestions.length) * 100;
    let message = "";
    let color = "";

    if (percentage >= 80) {
      message = "Excelente! Você domina os conceitos básicos de redação!";
      color = "text-green-600";
    } else if (percentage >= 60) {
      message = "Muito bom! Você tem uma boa base, mas ainda pode melhorar!";
      color = "text-blue-600";
    } else if (percentage >= 40) {
      message = "Bom começo! Vamos trabalhar juntos para aprimorar seus conhecimentos!";
      color = "text-orange-600";
    } else {
      message = "Não se preocupe! Estamos aqui para te ajudar a evoluir!";
      color = "text-purple-600";
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Concluído!
            </h2>
            <p className="text-gray-600">
              Parabéns, {userName}! Você completou a avaliação inicial.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {score}/{quizQuestions.length}
                </div>
                <p className="text-sm text-gray-600">Acertos</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  {percentage.toFixed(0)}%
                </div>
                <p className="text-sm text-gray-600">Aproveitamento</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-full h-4 mb-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className={`text-center text-lg font-semibold ${color}`}>
              {message}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-gray-900 mb-3">Suas Respostas:</h3>
            {quizQuestions.map((q, index) => (
              <Card key={index} className={`p-4 ${answers[index] === q.correct ? 'border-2 border-green-500 bg-green-50' : 'border-2 border-red-500 bg-red-50'}`}>
                <div className="flex items-start gap-3">
                  {answers[index] === q.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-red-600 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Sua resposta:</strong> {q.options[answers[index]]}
                    </p>
                    {answers[index] !== q.correct && (
                      <p className="text-sm text-green-700 mb-1">
                        <strong>Resposta correta:</strong> {q.options[q.correct]}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 italic">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button 
            onClick={handleContinue}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
          >
            Continuar para o Curso
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-700">
            <Brain className="w-3 h-3 mr-1" />
            Avaliação Inicial
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {userName}! Vamos conhecer seu nível
          </h1>
          <p className="text-gray-600">
            Responda estas perguntas para personalizarmos sua experiência
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Questão {currentStep + 1} de {quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {progress.toFixed(0)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {quizQuestions[currentStep].question}
            </h2>
          </div>

          <div className="space-y-3">
            {quizQuestions[currentStep].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-blue-50 hover:border-blue-500 transition-all"
                onClick={() => handleAnswer(index)}
              >
                <span className="flex items-center gap-3 w-full">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Tips */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lightbulb className="w-4 h-4" />
          <span>Não se preocupe, não há resposta errada! Queremos apenas conhecer você melhor.</span>
        </div>
      </div>
    </div>
  );
}
