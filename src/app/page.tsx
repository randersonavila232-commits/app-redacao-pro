"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Camera, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles, 
  Target,
  Users,
  School,
  TrendingUp,
  Award,
  FileText,
  Zap,
  Shield,
  Star,
  CreditCard,
  X,
  Briefcase,
  Building2,
  Trophy,
  Quote,
  ClipboardCheck,
  ListChecks,
  Brain,
  Lightbulb,
  BarChart3,
  Clock,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Rocket,
  Lock,
  Smartphone,
  Globe,
  CheckSquare,
  PenTool,
  BookMarked,
  LineChart
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showTranscription, setShowTranscription] = useState(false);
  const [transcriptionUsed, setTranscriptionUsed] = useState(false);

  const quizQuestions = [
    {
      question: "Qual é a estrutura básica de uma redação dissertativa-argumentativa?",
      options: [
        "Introdução, desenvolvimento e conclusão",
        "Título, corpo e referências",
        "Resumo, análise e opinião",
        "Apresentação, discussão e finalização"
      ],
      correct: 0
    },
    {
      question: "Quantas competências são avaliadas na redação do ENEM?",
      options: ["3 competências", "4 competências", "5 competências", "6 competências"],
      correct: 2
    },
    {
      question: "O que é coesão textual?",
      options: [
        "A beleza do texto",
        "A conexão lógica entre as partes do texto",
        "O tamanho do texto",
        "A quantidade de parágrafos"
      ],
      correct: 1
    }
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex.toString()];
    setQuizAnswers(newAnswers);
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Quiz finalizado
      const correctCount = newAnswers.filter((answer, index) => 
        parseInt(answer) === quizQuestions[index].correct
      ).length;
      
      alert(`Quiz finalizado! Você acertou ${correctCount} de ${quizQuestions.length} questões.`);
      setShowQuiz(false);
      setQuizStep(0);
      setQuizAnswers([]);
    }
  };

  const handleTranscription = () => {
    if (transcriptionUsed) {
      alert("Você já usou sua transcrição gratuita! Assine um plano para ter acesso ilimitado.");
      return;
    }
    
    setShowTranscription(true);
    // Simular transcrição
    setTimeout(() => {
      setTranscriptionUsed(true);
      alert("Transcrição realizada com sucesso! Esta foi sua única transcrição gratuita. Assine para ter acesso ilimitado.");
      setShowTranscription(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RedaçãoPro
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Recursos
              </a>
              <a href="#metodologia" className="text-gray-600 hover:text-blue-600 transition-colors">
                Metodologia
              </a>
              <a href="#concursos" className="text-gray-600 hover:text-blue-600 transition-colors">
                Concursos
              </a>
              <a href="#policiais" className="text-gray-600 hover:text-blue-600 transition-colors">
                Polícias
              </a>
              <a href="#criterios" className="text-gray-600 hover:text-blue-600 transition-colors">
                Critérios
              </a>
              <a href="#plans" className="text-gray-600 hover:text-blue-600 transition-colors">
                Planos
              </a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Tecnologia de IA Avançada + Metodologia Comprovada
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Conquiste a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nota Máxima
            </span>
            {" "}em Qualquer Concurso
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plataforma completa para ENEM, Concursos Públicos, Vestibulares e Certificações. 
            Correções inteligentes baseadas em critérios oficiais, transcrição por câmera com OCR avançado e metodologia aprovada por mais de 50 mil estudantes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                <Zap className="w-5 h-5 mr-2" />
                Começar Agora Grátis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8" onClick={() => setShowQuiz(true)}>
              <Brain className="w-5 h-5 mr-2" />
              Testar Conhecimento
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>1 redação grátis por mês</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Parcelamento em até 12x</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Sem fidelidade</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Pagamento Seguro</p>
            <p className="text-xs text-gray-500">SSL Certificado</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">100% Mobile</p>
            <p className="text-xs text-gray-500">App iOS e Android</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Acesso 24/7</p>
            <p className="text-xs text-gray-500">De qualquer lugar</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Certificado</p>
            <p className="text-xs text-gray-500">ISO 9001</p>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Quiz de Conhecimento</h3>
              <Button variant="ghost" size="sm" onClick={() => {
                setShowQuiz(false);
                setQuizStep(0);
                setQuizAnswers([]);
              }}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {quizQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full ${
                      index <= quizStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Questão {quizStep + 1} de {quizQuestions.length}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">
                {quizQuestions[quizStep].question}
              </h4>
              <div className="space-y-3">
                {quizQuestions[quizStep].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4"
                    onClick={() => handleQuizAnswer(index)}
                  >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Transcription Demo Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white text-purple-700">
              <Camera className="w-3 h-3 mr-1" />
              Experimente Grátis
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4">
              Teste a Transcrição por Câmera
            </h2>
            <p className="text-lg text-purple-100 mb-6">
              Tire uma foto da sua redação manuscrita e veja a mágica acontecer! 
              {transcriptionUsed ? " (Você já usou sua transcrição gratuita)" : " (1 transcrição gratuita disponível)"}
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={handleTranscription}
              disabled={showTranscription}
            >
              <Camera className="w-5 h-5 mr-2" />
              {showTranscription ? "Transcrevendo..." : transcriptionUsed ? "Assinar para Mais" : "Experimentar Agora"}
            </Button>
            {transcriptionUsed && (
              <p className="text-sm text-purple-200 mt-4">
                Gostou? Assine um plano para ter transcrições ilimitadas!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">98.7%</div>
              <div className="text-blue-100">Taxa de Aprovação</div>
              <p className="text-xs text-blue-200 mt-1">Alunos que praticam 3x/semana</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">50k+</div>
              <div className="text-blue-100">Alunos Aprovados</div>
              <p className="text-xs text-blue-200 mt-1">Em concursos federais e estaduais</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">200k+</div>
              <div className="text-blue-100">Redações Corrigidas</div>
              <p className="text-xs text-blue-200 mt-1">Com precisão de 99.2%</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Avaliação Média</div>
              <p className="text-xs text-blue-200 mt-1">Baseado em 12.500+ reviews</p>
            </div>
          </div>

          {/* Estatísticas Adicionais */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-white" />
                <span className="text-2xl font-bold text-white">+180 pontos</span>
              </div>
              <p className="text-sm text-blue-100">Média de evolução na nota após 30 dias de uso</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-white" />
                <span className="text-2xl font-bold text-white">2 minutos</span>
              </div>
              <p className="text-sm text-blue-100">Tempo médio de correção com feedback detalhado</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-white" />
                <span className="text-2xl font-bold text-white">1.200+</span>
              </div>
              <p className="text-sm text-blue-100">Escolas e cursinhos parceiros em todo Brasil</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section com Métodos de Pagamento */}
      <section id="plans" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gray-50">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700">
            Planos e Preços
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todos os planos com pagamento via PIX ou Cartão de Crédito (parcelamento em até 12x)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Plano Gratuito */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600 text-sm">Experimente gratuitamente</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>1 redação corrigida/mês</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Quiz de avaliação de conhecimento</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">1 transcrição por câmera (teste)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Análise básica das competências</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm line-through">Gerador de redações IA</span>
              </li>
            </ul>

            <Link href="/register" className="block">
              <Button variant="outline" className="w-full">
                Começar Grátis
              </Button>
            </Link>
          </Card>

          {/* Plano Básico */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-green-300">
            <Badge className="mb-3 bg-green-100 text-green-700">
              Melhor Custo-Benefício
            </Badge>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Básico</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">R$ 29,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-xs text-green-600 font-medium mb-2">ou 3x de R$ 9,97 sem juros</p>
              <p className="text-gray-600 text-sm">Ideal para começar a praticar</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>5 redações corrigidas/mês</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">3 transcrições por câmera/mês</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Guias de redação completos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Relatórios de evolução</span>
              </li>
            </ul>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Cartão de crédito (até 12x)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>PIX (5% desconto)</span>
              </div>
            </div>

            <Link href="/register" className="block">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Assinar Agora
              </Button>
            </Link>
          </Card>

          {/* Plano Aluno Pro */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-blue-600 relative">
            <Badge className="mb-3 bg-blue-600 text-white">
              Mais Popular
            </Badge>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Aluno Pro</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">R$ 49</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-xs text-blue-600 font-medium mb-2">ou 12x de R$ 4,08 sem juros</p>
              <p className="text-gray-600 text-sm">Para estudantes dedicados</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>Correções ilimitadas</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Transcrições ilimitadas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Gerador de redações com IA</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Todos os temas de concursos</span>
              </li>
            </ul>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Cartão de crédito (até 12x)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>PIX (5% desconto)</span>
              </div>
            </div>

            <Link href="/register" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Assinar Agora
              </Button>
            </Link>
          </Card>

          {/* Plano Professor/Escola */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-purple-300">
            <Badge className="mb-3 bg-purple-100 text-purple-700">
              Profissional
            </Badge>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Professor/Escola</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">R$ 199</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-xs text-purple-600 font-medium mb-2">ou 12x de R$ 16,58 sem juros</p>
              <p className="text-gray-600 text-sm">Para educadores e instituições</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Tudo do plano Aluno Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>Até 50 alunos</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Painel de gestão de turmas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Relatórios consolidados</span>
              </li>
            </ul>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CreditCard className="w-4 h-4" />
                <span>Cartão de crédito (até 12x)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>PIX (5% desconto)</span>
              </div>
            </div>

            <Link href="/register" className="block">
              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Falar com Vendas
              </Button>
            </Link>
          </Card>
        </div>

        {/* Informação sobre parcelamento */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-full">
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Aceitamos PIX e Cartão de Crédito em até 12x sem juros</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para conquistar sua aprovação?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Comece grátis com 1 redação por mês, quiz de conhecimento e teste de transcrição
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              <Rocket className="w-5 h-5 mr-2" />
              Começar Agora Grátis
            </Button>
          </Link>
          <p className="text-blue-100 text-sm mt-4">
            Sem cartão de crédito • Acesso imediato • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">RedaçãoPro</span>
              </div>
              <p className="text-sm text-gray-400">
                Sua aprovação começa aqui. Tecnologia e metodologia para conquistar a nota máxima em qualquer concurso.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#plans" className="hover:text-white transition-colors">Planos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 RedaçãoPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
