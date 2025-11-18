"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
  Target,
  TrendingUp,
  Lightbulb,
  PenTool,
  Brain,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  Crown,
  Zap,
  Camera,
  BarChart3,
  Trophy,
  LogOut,
  Settings,
  User,
  ChevronRight,
  Download,
  MessageSquare,
  BookMarked,
  GraduationCap,
  Rocket,
  Shield,
  Users,
  Video,
  FileCheck,
  ListChecks,
  Flame,
  ArrowLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, getPlanLimits, UserPlan } from "@/lib/supabase";

interface Module {
  id: number;
  title: string;
  description: string;
  icon: any;
  lessons: Lesson[];
  requiredPlan: UserPlan;
  duration: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "exercise" | "reading";
  completed: boolean;
  locked: boolean;
}

export default function CursoPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      router.push("/login");
      return;
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const getPlanBadge = (plan: string) => {
    const badges = {
      free: { label: "Grátis", color: "bg-gray-100 text-gray-700", icon: Star },
      basic: { label: "Básico", color: "bg-blue-100 text-blue-700", icon: Zap },
      pro: { label: "Pro", color: "bg-purple-100 text-purple-700", icon: Crown },
      premium: { label: "Premium", color: "bg-yellow-100 text-yellow-700", icon: Trophy }
    };
    return badges[plan as keyof typeof badges] || badges.free;
  };

  const canAccessModule = (requiredPlan: UserPlan): boolean => {
    if (!user) return false;
    
    const planHierarchy: Record<UserPlan, number> = {
      free: 0,
      basic: 1,
      pro: 2,
      premium: 3
    };

    return planHierarchy[user.plan as UserPlan] >= planHierarchy[requiredPlan];
  };

  const modules: Module[] = [
    {
      id: 1,
      title: "Fundamentos da Redação",
      description: "Aprenda os conceitos básicos e estrutura de uma redação dissertativa-argumentativa",
      icon: BookOpen,
      duration: "2h 30min",
      difficulty: "Iniciante",
      requiredPlan: "free",
      lessons: [
        { id: 1, title: "O que é uma redação dissertativa-argumentativa?", duration: "15min", type: "video", completed: false, locked: false },
        { id: 2, title: "Estrutura: Introdução, Desenvolvimento e Conclusão", duration: "20min", type: "video", completed: false, locked: false },
        { id: 3, title: "Exercício: Identificando partes da redação", duration: "10min", type: "exercise", completed: false, locked: false },
        { id: 4, title: "Norma culta da língua portuguesa", duration: "25min", type: "video", completed: false, locked: false },
        { id: 5, title: "Leitura: Guia completo de estrutura textual", duration: "15min", type: "reading", completed: false, locked: false },
        { id: 6, title: "Exercício prático: Escreva sua primeira introdução", duration: "30min", type: "exercise", completed: false, locked: false }
      ]
    },
    {
      id: 2,
      title: "Técnicas de Argumentação",
      description: "Domine a arte de construir argumentos sólidos e convincentes",
      icon: Brain,
      duration: "3h 15min",
      difficulty: "Intermediário",
      requiredPlan: "basic",
      lessons: [
        { id: 7, title: "O que é um argumento?", duration: "18min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 8, title: "Tipos de argumentos: autoridade, exemplificação, causa e consequência", duration: "25min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 9, title: "Repertório sociocultural: como usar citações e dados", duration: "22min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 10, title: "Exercício: Construindo argumentos fortes", duration: "20min", type: "exercise", completed: false, locked: !canAccessModule("basic") },
        { id: 11, title: "Falácias argumentativas: o que evitar", duration: "20min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 12, title: "Leitura: Banco de repertório sociocultural", duration: "30min", type: "reading", completed: false, locked: !canAccessModule("basic") },
        { id: 13, title: "Exercício prático: Desenvolva 2 parágrafos argumentativos", duration: "40min", type: "exercise", completed: false, locked: !canAccessModule("basic") }
      ]
    },
    {
      id: 3,
      title: "Coesão e Coerência Textual",
      description: "Aprenda a conectar ideias e construir textos fluidos e lógicos",
      icon: Sparkles,
      duration: "2h 45min",
      difficulty: "Intermediário",
      requiredPlan: "basic",
      lessons: [
        { id: 14, title: "O que é coesão textual?", duration: "15min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 15, title: "Conectivos: tipos e usos corretos", duration: "25min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 16, title: "Coerência: mantendo a lógica do texto", duration: "20min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 17, title: "Exercício: Identificando problemas de coesão", duration: "15min", type: "exercise", completed: false, locked: !canAccessModule("basic") },
        { id: 18, title: "Referenciação e substituição lexical", duration: "22min", type: "video", completed: false, locked: !canAccessModule("basic") },
        { id: 19, title: "Leitura: Lista completa de conectivos", duration: "18min", type: "reading", completed: false, locked: !canAccessModule("basic") },
        { id: 20, title: "Exercício prático: Reescreva um texto melhorando a coesão", duration: "30min", type: "exercise", completed: false, locked: !canAccessModule("basic") }
      ]
    },
    {
      id: 4,
      title: "Proposta de Intervenção",
      description: "Construa propostas completas e detalhadas que resolvam problemas sociais",
      icon: Target,
      duration: "2h 20min",
      difficulty: "Avançado",
      requiredPlan: "pro",
      lessons: [
        { id: 21, title: "O que é uma proposta de intervenção?", duration: "15min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 22, title: "Os 5 elementos: agente, ação, meio, finalidade e detalhamento", duration: "25min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 23, title: "Exercício: Identificando elementos em propostas", duration: "15min", type: "exercise", completed: false, locked: !canAccessModule("pro") },
        { id: 24, title: "Como detalhar sua proposta", duration: "20min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 25, title: "Propostas viáveis vs. propostas genéricas", duration: "18min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 26, title: "Leitura: Exemplos de propostas nota 1000", duration: "22min", type: "reading", completed: false, locked: !canAccessModule("pro") },
        { id: 27, title: "Exercício prático: Escreva uma conclusão completa", duration: "25min", type: "exercise", completed: false, locked: !canAccessModule("pro") }
      ]
    },
    {
      id: 5,
      title: "Temas Atuais e Repertório",
      description: "Mantenha-se atualizado com os temas mais relevantes e construa seu repertório",
      icon: Flame,
      duration: "4h 00min",
      difficulty: "Intermediário",
      requiredPlan: "pro",
      lessons: [
        { id: 28, title: "Como se manter atualizado para a redação", duration: "20min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 29, title: "Temas sociais: desigualdade, educação, saúde", duration: "30min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 30, title: "Temas ambientais e sustentabilidade", duration: "25min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 31, title: "Tecnologia e sociedade digital", duration: "25min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 32, title: "Direitos humanos e cidadania", duration: "28min", type: "video", completed: false, locked: !canAccessModule("pro") },
        { id: 33, title: "Leitura: Banco de dados e estatísticas atualizadas", duration: "40min", type: "reading", completed: false, locked: !canAccessModule("pro") },
        { id: 34, title: "Exercício: Pratique com 5 temas atuais", duration: "52min", type: "exercise", completed: false, locked: !canAccessModule("pro") }
      ]
    },
    {
      id: 6,
      title: "Redação para Concursos Públicos",
      description: "Especificidades e estratégias para concursos federais, estaduais e municipais",
      icon: GraduationCap,
      duration: "3h 30min",
      difficulty: "Avançado",
      requiredPlan: "premium",
      lessons: [
        { id: 35, title: "Diferenças entre ENEM e concursos públicos", duration: "20min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 36, title: "Redação para concursos federais (TRF, TRT, STF)", duration: "30min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 37, title: "Redação para carreiras policiais (PF, PRF, PC)", duration: "28min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 38, title: "Redação para concursos fiscais (Receita, SEFAZ)", duration: "25min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 39, title: "Exercício: Analise redações de concursos anteriores", duration: "30min", type: "exercise", completed: false, locked: !canAccessModule("premium") },
        { id: 40, title: "Leitura: Critérios de avaliação por banca", duration: "35min", type: "reading", completed: false, locked: !canAccessModule("premium") },
        { id: 41, title: "Exercício prático: Redação estilo concurso público", duration: "42min", type: "exercise", completed: false, locked: !canAccessModule("premium") }
      ]
    },
    {
      id: 7,
      title: "Correção e Revisão",
      description: "Aprenda a revisar e corrigir suas próprias redações como um profissional",
      icon: FileCheck,
      duration: "2h 15min",
      difficulty: "Avançado",
      requiredPlan: "premium",
      lessons: [
        { id: 42, title: "Como revisar sua própria redação", duration: "18min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 43, title: "Checklist de revisão completo", duration: "20min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 44, title: "Erros mais comuns e como evitá-los", duration: "25min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 45, title: "Exercício: Corrija redações com erros propositais", duration: "25min", type: "exercise", completed: false, locked: !canAccessModule("premium") },
        { id: 46, title: "Técnicas de reescrita e melhoria", duration: "22min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 47, title: "Leitura: Guia de revisão passo a passo", duration: "15min", type: "reading", completed: false, locked: !canAccessModule("premium") },
        { id: 48, title: "Exercício prático: Reescreva uma redação completa", duration: "30min", type: "exercise", completed: false, locked: !canAccessModule("premium") }
      ]
    },
    {
      id: 8,
      title: "Simulados e Prática Intensiva",
      description: "Pratique com temas reais e cronômetro para simular a prova",
      icon: Trophy,
      duration: "5h 00min",
      difficulty: "Avançado",
      requiredPlan: "premium",
      lessons: [
        { id: 49, title: "Como fazer um simulado eficiente", duration: "15min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 50, title: "Simulado 1: Tema social (30 linhas em 60min)", duration: "60min", type: "exercise", completed: false, locked: !canAccessModule("premium") },
        { id: 51, title: "Simulado 2: Tema ambiental (30 linhas em 60min)", duration: "60min", type: "exercise", completed: false, locked: !canAccessModule("premium") },
        { id: 52, title: "Simulado 3: Tema tecnológico (30 linhas em 60min)", duration: "60min", type: "exercise", completed: false, locked: !canAccessModule("premium") },
        { id: 53, title: "Simulado 4: Tema político (30 linhas em 60min)", duration: "60min", type: "exercise", completed: false, locked: !canAccessModule("premium") },
        { id: 54, title: "Análise dos seus simulados", duration: "20min", type: "video", completed: false, locked: !canAccessModule("premium") },
        { id: 55, title: "Leitura: Redações nota 1000 comentadas", duration: "25min", type: "reading", completed: false, locked: !canAccessModule("premium") }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando curso...</p>
        </div>
      </div>
    );
  }

  const planBadge = getPlanBadge(user?.plan);
  const PlanIcon = planBadge.icon;

  // Se uma aula foi selecionada
  if (selectedLesson !== null && selectedModule !== null) {
    const module = modules.find(m => m.id === selectedModule);
    const lesson = module?.lessons.find(l => l.id === selectedLesson);

    if (!lesson || !module) return null;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RedaçãoPro
                </span>
              </Link>

              <div className="flex items-center gap-4">
                <Badge className={`${planBadge.color} flex items-center gap-1`}>
                  <PlanIcon className="w-3 h-3" />
                  Plano {planBadge.label}
                </Badge>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setSelectedLesson(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o módulo
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player / Content Area */}
            <div className="lg:col-span-2">
              <Card className="p-0 overflow-hidden">
                {lesson.type === "video" && (
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Player de vídeo</p>
                      <p className="text-sm text-gray-400 mt-2">Duração: {lesson.duration}</p>
                    </div>
                  </div>
                )}

                {lesson.type === "reading" && (
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookMarked className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">Tempo de leitura: {lesson.duration}</p>
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Este é o conteúdo de leitura da aula. Aqui você encontrará materiais complementares,
                        guias detalhados, exemplos práticos e referências importantes para aprofundar seu conhecimento.
                      </p>
                      <h4 className="text-lg font-bold text-gray-900 mt-6 mb-3">Principais Tópicos:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Conceitos fundamentais explicados em detalhes</li>
                        <li>• Exemplos práticos e casos reais</li>
                        <li>• Dicas e estratégias comprovadas</li>
                        <li>• Exercícios de fixação</li>
                        <li>• Referências e materiais complementares</li>
                      </ul>
                    </div>
                  </div>
                )}

                {lesson.type === "exercise" && (
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <PenTool className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">Tempo estimado: {lesson.duration}</p>
                      </div>
                    </div>
                    <Card className="p-6 bg-purple-50 border-2 border-purple-200 mb-6">
                      <h4 className="font-bold text-gray-900 mb-2">📝 Instruções do Exercício:</h4>
                      <p className="text-gray-700">
                        Neste exercício, você praticará os conceitos aprendidos nas aulas anteriores.
                        Leia atentamente o enunciado, desenvolva sua resposta e envie para correção.
                      </p>
                    </Card>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sua resposta:
                        </label>
                        <textarea
                          className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Digite sua resposta aqui..."
                        />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Enviar para Correção
                      </Button>
                    </div>
                  </div>
                )}

                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Aula Anterior
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Próxima Aula
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Module Content */}
            <div>
              <Card className="p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    {module.difficulty}
                  </Badge>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Conteúdo do Módulo</h4>
                <div className="space-y-2">
                  {module.lessons.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => !l.locked && setSelectedLesson(l.id)}
                      disabled={l.locked}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        l.id === selectedLesson
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : l.locked
                          ? 'bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {l.locked ? (
                          <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        ) : l.type === "video" ? (
                          <PlayCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        ) : l.type === "exercise" ? (
                          <PenTool className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        ) : (
                          <BookMarked className="w-4 h-4 text-green-600 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${l.locked ? 'text-gray-400' : 'text-gray-900'}`}>
                            {l.title}
                          </p>
                          <p className="text-xs text-gray-500">{l.duration}</p>
                        </div>
                        {l.completed && (
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View principal do curso
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RedaçãoPro
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Badge className={`${planBadge.color} flex items-center gap-1`}>
                <PlanIcon className="w-3 h-3" />
                Plano {planBadge.label}
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Curso Completo de Redação
          </h1>
          <p className="text-lg text-gray-600">
            Do básico ao avançado: tudo que você precisa para conquistar a nota máxima
          </p>
        </div>

        {/* Upgrade Banner para planos inferiores */}
        {user?.plan !== 'premium' && (
          <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Crown className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  🚀 Desbloqueie Todos os Módulos
                </h3>
                <p className="text-gray-700 mb-4">
                  Você está no plano <strong>{planBadge.label}</strong>. 
                  Faça upgrade para acessar módulos avançados, simulados completos e conteúdo exclusivo para concursos públicos!
                </p>
                <Link href="/#plans">
                  <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                    <Crown className="w-4 h-4 mr-2" />
                    Ver Planos e Fazer Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* Progress Overview */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Seu Progresso Geral</h2>
            <Badge className="bg-blue-100 text-blue-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              5% Concluído
            </Badge>
          </div>
          <Progress value={5} className="h-3 mb-4" />
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-600">Aulas Concluídas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">55</p>
              <p className="text-sm text-gray-600">Aulas Totais</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">2h 15min</p>
              <p className="text-sm text-gray-600">Tempo de Estudo</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">8</p>
              <p className="text-sm text-gray-600">Módulos Disponíveis</p>
            </div>
          </div>
        </Card>

        {/* Modules Grid */}
        <div className="space-y-6">
          {modules.map((module) => {
            const ModuleIcon = module.icon;
            const hasAccess = canAccessModule(module.requiredPlan);
            const completedLessons = module.lessons.filter(l => l.completed).length;
            const progressPercent = (completedLessons / module.lessons.length) * 100;

            return (
              <Card 
                key={module.id} 
                className={`p-6 transition-all ${
                  hasAccess 
                    ? 'hover:shadow-xl cursor-pointer border-2 hover:border-blue-500' 
                    : 'opacity-75 border-2 border-gray-300'
                }`}
                onClick={() => hasAccess && setSelectedModule(module.id)}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    hasAccess ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gray-300'
                  }`}>
                    {hasAccess ? (
                      <ModuleIcon className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {module.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{module.description}</p>
                      </div>
                      {!hasAccess && (
                        <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Requer {module.requiredPlan === 'basic' ? 'Básico' : module.requiredPlan === 'pro' ? 'Pro' : 'Premium'}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Video className="w-4 h-4" />
                        {module.lessons.length} aulas
                      </div>
                      <Badge className={
                        module.difficulty === "Iniciante" ? "bg-green-100 text-green-700" :
                        module.difficulty === "Intermediário" ? "bg-blue-100 text-blue-700" :
                        "bg-purple-100 text-purple-700"
                      }>
                        {module.difficulty}
                      </Badge>
                    </div>

                    {hasAccess && (
                      <>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              Progresso: {completedLessons}/{module.lessons.length} aulas
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              {progressPercent.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                        </div>

                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          {completedLessons > 0 ? 'Continuar Módulo' : 'Começar Módulo'}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    )}

                    {!hasAccess && (
                      <Link href="/#plans">
                        <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50">
                          <Crown className="w-4 h-4 mr-2" />
                          Fazer Upgrade para Desbloquear
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Lessons Preview (collapsed) */}
                {selectedModule === module.id && hasAccess && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Conteúdo do Módulo:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!lesson.locked) setSelectedLesson(lesson.id);
                          }}
                          disabled={lesson.locked}
                          className={`text-left p-4 rounded-lg border-2 transition-all ${
                            lesson.locked
                              ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                              : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {lesson.locked ? (
                              <Lock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            ) : lesson.type === "video" ? (
                              <PlayCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            ) : lesson.type === "exercise" ? (
                              <PenTool className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <BookMarked className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium mb-1 ${lesson.locked ? 'text-gray-400' : 'text-gray-900'}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{lesson.duration}</span>
                                {lesson.completed && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">
                                    Concluída
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Materiais Extras</h3>
            </div>
            <p className="text-gray-700 mb-4">
              PDFs, guias, checklists e materiais complementares para download
            </p>
            <Button variant="outline" className="w-full">
              Acessar Materiais
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Comunidade</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Conecte-se com outros alunos e tire dúvidas com professores
            </p>
            <Button variant="outline" className="w-full">
              Entrar na Comunidade
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Suporte</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Precisa de ajuda? Nossa equipe está pronta para te atender
            </p>
            <Button variant="outline" className="w-full">
              Falar com Suporte
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
