"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookOpen,
  Camera,
  FileText,
  LogOut,
  PenTool,
  TrendingUp,
  User,
  Zap,
  Crown,
  Target,
  Clock,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, UserProfile, getPlanLimits } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
    loadThemes();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push("/login");
        return;
      }

      // Buscar dados do usuário
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error("Erro ao buscar usuário:", error);
      } else {
        setUser(userData);
      }
    } catch (error) {
      console.error("Erro:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadThemes = async () => {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .limit(6);

    if (!error && data) {
      setThemes(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const planLimits = getPlanLimits(user.plan);
  const essaysRemaining = user.plan === 'premium' 
    ? 'Ilimitado' 
    : `${user.essays_limit - user.essays_count}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Olá, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Continue praticando para conquistar sua aprovação
          </p>
        </div>

        {/* Plano Atual */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6" />
                <h2 className="text-2xl font-bold">
                  Plano {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                </h2>
              </div>
              <p className="text-blue-100">
                Redações restantes este mês: <strong>{essaysRemaining}</strong>
              </p>
            </div>
            {user.plan === 'free' && (
              <Link href="#plans">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  <Zap className="w-4 h-4 mr-2" />
                  Fazer Upgrade
                </Button>
              </Link>
            )}
          </div>
        </Card>

        {/* Ações Rápidas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <PenTool className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Escrever Redação</h3>
            <p className="text-gray-600 text-sm mb-4">
              Escolha um tema e comece a praticar agora mesmo
            </p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              Começar
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-green-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transcrever Redação</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tire foto da sua redação manuscrita
            </p>
            <Button 
              className="w-full" 
              variant="outline"
              disabled={!planLimits.camera_transcription}
            >
              {planLimits.camera_transcription ? 'Usar Câmera' : 'Upgrade Necessário'}
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-purple-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Minhas Redações</h3>
            <p className="text-gray-600 text-sm mb-4">
              Veja suas redações anteriores e evolução
            </p>
            <Button className="w-full" variant="outline">
              Ver Histórico
            </Button>
          </Card>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.essays_count}</p>
                <p className="text-sm text-gray-600">Redações</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">--</p>
                <p className="text-sm text-gray-600">Média</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">--</p>
                <p className="text-sm text-gray-600">Meta</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">--</p>
                <p className="text-sm text-gray-600">Dias</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Temas Disponíveis */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Temas em Destaque</h2>
            <Button variant="outline">Ver Todos</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <Card key={theme.id} className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-300">
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-blue-100 text-blue-700">
                    {theme.exam_type?.toUpperCase() || 'GERAL'}
                  </Badge>
                  <Badge variant="outline">
                    {theme.difficulty === 'easy' ? 'Fácil' : theme.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold mb-2">{theme.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {theme.description}
                </p>
                <Button className="w-full" variant="outline">
                  <PenTool className="w-4 h-4 mr-2" />
                  Escrever sobre este tema
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Recursos do Plano */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <h2 className="text-2xl font-bold mb-6">Recursos do seu Plano</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              {planLimits.ai_generation ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
              <span className={planLimits.ai_generation ? 'text-gray-900' : 'text-gray-400'}>
                Gerador de redações com IA
              </span>
            </div>
            <div className="flex items-center gap-3">
              {planLimits.camera_transcription ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
              <span className={planLimits.camera_transcription ? 'text-gray-900' : 'text-gray-400'}>
                Transcrição por câmera
              </span>
            </div>
            <div className="flex items-center gap-3">
              {planLimits.video_lessons ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
              <span className={planLimits.video_lessons ? 'text-gray-900' : 'text-gray-400'}>
                Videoaulas completas
              </span>
            </div>
            <div className="flex items-center gap-3">
              {planLimits.repertoire_access ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
              <span className={planLimits.repertoire_access ? 'text-gray-900' : 'text-gray-400'}>
                Banco de repertórios
              </span>
            </div>
            <div className="flex items-center gap-3">
              {planLimits.detailed_feedback ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
              <span className={planLimits.detailed_feedback ? 'text-gray-900' : 'text-gray-400'}>
                Feedback detalhado
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-gray-900">
                {user.plan === 'premium' ? 'Redações ilimitadas' : `${user.essays_limit} redações/mês`}
              </span>
            </div>
          </div>

          {user.plan === 'free' && (
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-blue-300">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Desbloqueie Todos os Recursos</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Faça upgrade para ter acesso ilimitado a todas as funcionalidades da plataforma
                  </p>
                  <Link href="/#plans">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Ver Planos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
