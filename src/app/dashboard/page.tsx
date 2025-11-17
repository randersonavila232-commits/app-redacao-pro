"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Camera, 
  Target,
  TrendingUp,
  Award,
  FileText,
  Zap,
  Clock,
  BarChart3,
  CheckCircle2,
  Play,
  Lock,
  Star,
  Trophy,
  Lightbulb,
  PenTool,
  BookMarked,
  GraduationCap,
  Rocket,
  Brain,
  MessageSquare,
  Calendar,
  ChevronRight,
  Eye,
  Edit3,
  Plus,
  Crown
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile, getPlanLimits, UserPlan } from "@/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [planLimits, setPlanLimits] = useState<ReturnType<typeof getPlanLimits> | null>(null);

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData) as UserProfile;
    setUser(parsedUser);
    setPlanLimits(getPlanLimits(parsedUser.plan as UserPlan));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user || !planLimits) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  const getPlanBadge = (plan: string) => {
    const badges = {
      free: { label: "Plano Grátis", color: "bg-gray-100 text-gray-700" },
      basic: { label: "Plano Básico", color: "bg-blue-100 text-blue-700" },
      pro: { label: "Plano Pro", color: "bg-purple-100 text-purple-700" },
      premium: { label: "Plano Premium", color: "bg-yellow-100 text-yellow-700" }
    };
    return badges[plan as keyof typeof badges] || badges.free;
  };

  const canAccessFeature = (feature: keyof typeof planLimits) => {
    return planLimits[feature];
  };

  const essaysRemaining = user.essays_limit === -1 
    ? "Ilimitado" 
    : `${user.essays_limit - user.essays_count} de ${user.essays_limit}`;

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
            
            <div className="flex items-center gap-4">
              <Badge className={getPlanBadge(user.plan).color}>
                {user.plan === 'premium' && <Crown className="w-3 h-3 mr-1" />}
                {getPlanBadge(user.plan).label}
              </Badge>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Suporte
              </Button>
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Dashboard */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Olá, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600">Continue sua jornada rumo à aprovação</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {user.plan === 'free' && (
              <Button variant="outline" className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50">
                <Crown className="w-4 h-4 mr-2" />
                Fazer Upgrade
              </Button>
            )}
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={user.essays_count >= user.essays_limit && user.essays_limit !== -1}
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Redação
            </Button>
          </div>
        </div>

        {/* Plan Limit Warning */}
        {user.plan === 'free' && user.essays_count >= user.essays_limit && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Você atingiu o limite do plano gratuito</h3>
                <p className="text-gray-700 mb-4">
                  Faça upgrade para continuar praticando e ter acesso a recursos exclusivos como correções ilimitadas, 
                  transcrição por câmera, geração com IA e muito mais!
                </p>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Crown className="w-4 h-4 mr-2" />
                  Ver Planos
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-700">{essaysRemaining}</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{user.essays_count}</div>
            <p className="text-sm text-gray-600">Redações Escritas</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">+180</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">820</div>
            <p className="text-sm text-gray-600">Nota Média Atual</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-700">Meta: 950</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">86%</div>
            <p className="text-sm text-gray-600">Progresso</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-yellow-100 text-yellow-700">Top 15%</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">12</div>
            <p className="text-sm text-gray-600">Conquistas</p>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button 
            variant={selectedTab === "overview" ? "default" : "outline"}
            onClick={() => setSelectedTab("overview")}
            className={selectedTab === "overview" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            Visão Geral
          </Button>
          <Button 
            variant={selectedTab === "lessons" ? "default" : "outline"}
            onClick={() => setSelectedTab("lessons")}
            className={selectedTab === "lessons" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Aulas
            {!canAccessFeature('video_lessons') && <Lock className="w-3 h-3 ml-2" />}
          </Button>
          <Button 
            variant={selectedTab === "practice" ? "default" : "outline"}
            onClick={() => setSelectedTab("practice")}
            className={selectedTab === "practice" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            <PenTool className="w-4 h-4 mr-2" />
            Praticar
          </Button>
          <Button 
            variant={selectedTab === "repertoire" ? "default" : "outline"}
            onClick={() => setSelectedTab("repertoire")}
            className={selectedTab === "repertoire" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            <Brain className="w-4 h-4 mr-2" />
            Repertório
            {!canAccessFeature('repertoire_access') && <Lock className="w-3 h-3 ml-2" />}
          </Button>
          <Button 
            variant={selectedTab === "progress" ? "default" : "outline"}
            onClick={() => setSelectedTab("progress")}
            className={selectedTab === "progress" ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Evolução
          </Button>
        </div>

        {/* Content Based on Selected Tab */}
        {selectedTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Continue Learning */}
              {canAccessFeature('video_lessons') ? (
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Continue Aprendendo</h2>
                    <Button variant="ghost" size="sm">Ver Todos</Button>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-4 hover:shadow-lg transition-all border-2 hover:border-blue-300 cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <Badge className="mb-2 bg-blue-100 text-blue-700">Em Progresso</Badge>
                          <h3 className="font-bold text-lg mb-1">Estrutura da Redação ENEM</h3>
                          <p className="text-sm text-gray-600 mb-3">Aprenda a estruturar introdução, desenvolvimento e conclusão perfeitos</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              45 min
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              Módulo 2 de 8
                            </span>
                          </div>
                          <div className="mt-3 bg-gray-200 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: "35%"}}></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
                  <div className="text-center py-8">
                    <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Videoaulas Bloqueadas</h3>
                    <p className="text-gray-600 mb-4">Faça upgrade para ter acesso a todas as videoaulas</p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Crown className="w-4 h-4 mr-2" />
                      Fazer Upgrade
                    </Button>
                  </div>
                </Card>
              )}

              {/* Recent Essays */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Suas Redações Recentes</h2>
                  <Button variant="ghost" size="sm">Ver Todas</Button>
                </div>

                {user.essays_count === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Você ainda não escreveu nenhuma redação</p>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Escrever Primeira Redação
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { title: "Desafios da mobilidade urbana no Brasil", score: 880, date: "Há 2 dias", status: "Corrigida" },
                      { title: "Impactos da tecnologia na educação", score: 820, date: "Há 5 dias", status: "Corrigida" }
                    ].map((essay, index) => (
                      <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{essay.title}</h4>
                              <Badge className="bg-green-100 text-green-700 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                {essay.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="font-bold text-blue-600">Nota: {essay.score}</span>
                              <span>{essay.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start"
                    variant="outline"
                    disabled={!canAccessFeature('camera_transcription')}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Transcrever Redação
                    {!canAccessFeature('camera_transcription') && <Lock className="w-3 h-3 ml-auto" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={!canAccessFeature('ai_generation')}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Gerar com IA
                    {!canAccessFeature('ai_generation') && <Lock className="w-3 h-3 ml-auto" />}
                  </Button>
                </div>
              </Card>

              {/* Study Plan */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Plano de Estudos</h3>
                    <p className="text-sm text-gray-600">Personalizado para você</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Meta diária</span>
                    <span className="font-bold text-purple-600">2/3 ✓</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{width: "66%"}}></div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  Ver Plano Completo
                </Button>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === "lessons" && (
          !canAccessFeature('video_lessons') ? (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
              <Lock className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Videoaulas Bloqueadas</h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Faça upgrade para o plano Básico ou superior e tenha acesso a mais de 50 videoaulas 
                com professores especialistas, organizadas em módulos progressivos.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Crown className="w-5 h-5 mr-2" />
                Ver Planos e Fazer Upgrade
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Módulos de aula aqui */}
              <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-blue-300">
                <div className="w-full h-40 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-16 h-16 text-white" />
                </div>
                <Badge className="mb-3 bg-green-100 text-green-700">Concluído</Badge>
                <h3 className="text-xl font-bold mb-2">Introdução à Redação</h3>
                <p className="text-gray-600 text-sm mb-4">Fundamentos essenciais para começar a escrever redações de qualidade</p>
                <Button className="w-full" variant="outline">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Revisar Conteúdo
                </Button>
              </Card>
            </div>
          )
        )}

        {selectedTab === "practice" && (
          <div className="space-y-6">
            {/* Practice Options */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-blue-300 cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Escrever Nova Redação</h3>
                <p className="text-gray-600 text-sm mb-4">Escolha um tema e comece a praticar agora mesmo</p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={user.essays_count >= user.essays_limit && user.essays_limit !== -1}
                >
                  Começar
                </Button>
              </Card>

              <Card className={`p-6 transition-all border-2 ${canAccessFeature('camera_transcription') ? 'hover:shadow-xl hover:border-purple-300 cursor-pointer' : 'bg-gray-50 border-gray-300'}`}>
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${canAccessFeature('camera_transcription') ? 'bg-gradient-to-br from-purple-600 to-purple-400' : 'bg-gray-300'}`}>
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transcrever por Câmera</h3>
                <p className="text-gray-600 text-sm mb-4">Tire foto da sua redação manuscrita para correção</p>
                <Button 
                  className="w-full" 
                  variant="outline"
                  disabled={!canAccessFeature('camera_transcription')}
                >
                  {canAccessFeature('camera_transcription') ? 'Usar Câmera' : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Bloqueado
                    </>
                  )}
                </Button>
              </Card>

              <Card className={`p-6 transition-all border-2 ${canAccessFeature('ai_generation') ? 'hover:shadow-xl hover:border-green-300 cursor-pointer' : 'bg-gray-50 border-gray-300'}`}>
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${canAccessFeature('ai_generation') ? 'bg-gradient-to-br from-green-600 to-green-400' : 'bg-gray-300'}`}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gerar com IA</h3>
                <p className="text-gray-600 text-sm mb-4">Crie uma redação modelo sobre qualquer tema</p>
                <Button 
                  className="w-full" 
                  variant="outline"
                  disabled={!canAccessFeature('ai_generation')}
                >
                  {canAccessFeature('ai_generation') ? 'Gerar Agora' : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Bloqueado
                    </>
                  )}
                </Button>
              </Card>
            </div>

            {/* Suggested Themes */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Temas Recomendados para Você</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Desafios da mobilidade urbana sustentável no Brasil", category: "ENEM", difficulty: "Médio" },
                  { title: "Impactos da inteligência artificial no mercado de trabalho", category: "Concursos", difficulty: "Difícil" },
                  { title: "A importância da educação financeira nas escolas", category: "ENEM", difficulty: "Fácil" },
                  { title: "Combate à desinformação na era digital", category: "Vestibular", difficulty: "Médio" }
                ].map((theme, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-blue-300">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-blue-100 text-blue-700">{theme.category}</Badge>
                      <Badge variant="outline">{theme.difficulty}</Badge>
                    </div>
                    <h4 className="font-semibold mb-3">{theme.title}</h4>
                    <Button 
                      size="sm" 
                      className="w-full"
                      disabled={user.essays_count >= user.essays_limit && user.essays_limit !== -1}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Escrever Agora
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {selectedTab === "repertoire" && (
          !canAccessFeature('repertoire_access') ? (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300">
              <Lock className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Banco de Repertórios Bloqueado</h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Faça upgrade para o plano Pro ou Premium e tenha acesso a mais de 500 repertórios 
                organizados por tema, incluindo citações, dados estatísticos e exemplos históricos.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Crown className="w-5 h-5 mr-2" />
                Ver Planos e Fazer Upgrade
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Banco de Repertórios</h2>
                <p className="text-gray-600 mb-6">Acesse citações, dados e exemplos organizados por tema</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { title: "Educação", count: 87, icon: GraduationCap, color: "blue" },
                    { title: "Tecnologia", count: 124, icon: Zap, color: "purple" },
                    { title: "Meio Ambiente", count: 95, icon: Target, color: "green" }
                  ].map((category, index) => (
                    <Card key={index} className="p-6 hover:shadow-xl transition-all border-2 cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <category.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{category.count} repertórios</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Explorar
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )
        )}

        {selectedTab === "progress" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Evolução da Nota</h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Gráfico de evolução</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Competências ENEM</h3>
                <div className="space-y-4">
                  {[
                    { name: "C1 - Norma Culta", score: 180, max: 200 },
                    { name: "C2 - Compreensão do Tema", score: 160, max: 200 },
                    { name: "C3 - Argumentação", score: 140, max: 200 },
                    { name: "C4 - Coesão", score: 170, max: 200 },
                    { name: "C5 - Proposta", score: 150, max: 200 }
                  ].map((comp, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{comp.name}</span>
                        <span className="text-sm font-bold text-blue-600">{comp.score}/{comp.max}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" 
                          style={{width: `${(comp.score/comp.max)*100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
