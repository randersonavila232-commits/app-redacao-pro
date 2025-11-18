"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Users,
  FileText,
  BookOpen,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  LogOut,
  Settings,
  BarChart3,
  DollarSign,
  UserCheck,
  AlertCircle,
  Download,
  Camera,
  PenTool,
  Sparkles,
  Target,
  Shield,
  Crown,
  Zap,
  Home,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Stats {
  totalUsers: number;
  totalEssays: number;
  totalThemes: number;
  activeUsers: number;
  freeUsers: number;
  basicUsers: number;
  proUsers: number;
  premiumUsers: number;
}

interface Theme {
  id: string;
  title: string;
  description: string;
  exam_type: string;
  difficulty: string;
  tags: string[];
  created_at: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
  essays_count: number;
  essays_limit: number;
  created_at: string;
}

interface Essay {
  id: string;
  user_id: string;
  title: string;
  content: string;
  score: number;
  feedback: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'themes' | 'users' | 'essays' | 'data' | 'access'>('dashboard');
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalEssays: 0,
    totalThemes: 0,
    activeUsers: 0,
    freeUsers: 0,
    basicUsers: 0,
    proUsers: 0,
    premiumUsers: 0
  });
  const [themes, setThemes] = useState<Theme[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [essays, setEssays] = useState<Essay[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeForm, setThemeForm] = useState({
    title: "",
    description: "",
    exam_type: "enem",
    difficulty: "medium",
    tags: ""
  });

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push("/login");
        return;
      }

      // Verificar se é admin na tabela user_roles
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('is_admin')
        .eq('user_id', authUser.id)
        .single();

      if (roleData?.is_admin !== true) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      loadStats();
      loadThemes();
      loadUsers();
      loadEssays();
    } catch (error) {
      console.error("Erro:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Total de usuários
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Total de redações
      const { count: totalEssays } = await supabase
        .from('essays')
        .select('*', { count: 'exact', head: true });

      // Total de temas
      const { count: totalThemes } = await supabase
        .from('themes')
        .select('*', { count: 'exact', head: true });

      // Usuários por plano
      const { data: planData } = await supabase
        .from('users')
        .select('plan');

      const planCounts = {
        free: 0,
        basic: 0,
        pro: 0,
        premium: 0
      };

      planData?.forEach(user => {
        if (user.plan in planCounts) {
          planCounts[user.plan as keyof typeof planCounts]++;
        }
      });

      setStats({
        totalUsers: totalUsers || 0,
        totalEssays: totalEssays || 0,
        totalThemes: totalThemes || 0,
        activeUsers: totalUsers || 0,
        freeUsers: planCounts.free,
        basicUsers: planCounts.basic,
        proUsers: planCounts.pro,
        premiumUsers: planCounts.premium
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  const loadThemes = async () => {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setThemes(data);
      }
    } catch (error) {
      console.error("Erro ao carregar temas:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, plan, essays_count, essays_limit, created_at')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  const loadEssays = async () => {
    try {
      const { data, error } = await supabase
        .from('essays')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setEssays(data);
      }
    } catch (error) {
      console.error("Erro ao carregar redações:", error);
    }
  };

  const handleCreateTheme = async () => {
    try {
      const tagsArray = themeForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error } = await supabase
        .from('themes')
        .insert([{
          title: themeForm.title,
          description: themeForm.description,
          exam_type: themeForm.exam_type,
          difficulty: themeForm.difficulty,
          tags: tagsArray
        }]);

      if (error) throw error;

      alert("Tema criado com sucesso!");
      setShowThemeModal(false);
      setThemeForm({
        title: "",
        description: "",
        exam_type: "enem",
        difficulty: "medium",
        tags: ""
      });
      loadThemes();
      loadStats();
    } catch (error) {
      console.error("Erro ao criar tema:", error);
      alert("Erro ao criar tema. Tente novamente.");
    }
  };

  const handleUpdateTheme = async () => {
    if (!editingTheme) return;

    try {
      const tagsArray = themeForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error } = await supabase
        .from('themes')
        .update({
          title: themeForm.title,
          description: themeForm.description,
          exam_type: themeForm.exam_type,
          difficulty: themeForm.difficulty,
          tags: tagsArray
        })
        .eq('id', editingTheme.id);

      if (error) throw error;

      alert("Tema atualizado com sucesso!");
      setShowThemeModal(false);
      setEditingTheme(null);
      setThemeForm({
        title: "",
        description: "",
        exam_type: "enem",
        difficulty: "medium",
        tags: ""
      });
      loadThemes();
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
      alert("Erro ao atualizar tema. Tente novamente.");
    }
  };

  const handleDeleteTheme = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este tema?")) return;

    try {
      const { error } = await supabase
        .from('themes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert("Tema excluído com sucesso!");
      loadThemes();
      loadStats();
    } catch (error) {
      console.error("Erro ao excluir tema:", error);
      alert("Erro ao excluir tema. Tente novamente.");
    }
  };

  const handleEditTheme = (theme: Theme) => {
    setEditingTheme(theme);
    setThemeForm({
      title: theme.title,
      description: theme.description || "",
      exam_type: theme.exam_type || "enem",
      difficulty: theme.difficulty || "medium",
      tags: theme.tags?.join(', ') || ""
    });
    setShowThemeModal(true);
  };

  const handleUpdateUserPlan = async (userId: string, newPlan: string) => {
    try {
      const planLimits: { [key: string]: number } = {
        free: 1,
        basic: 10,
        pro: 50,
        premium: 999999
      };

      const { error } = await supabase
        .from('users')
        .update({
          plan: newPlan,
          essays_limit: planLimits[newPlan]
        })
        .eq('id', userId);

      if (error) throw error;

      alert("Plano atualizado com sucesso!");
      loadUsers();
      loadStats();
    } catch (error) {
      console.error("Erro ao atualizar plano:", error);
      alert("Erro ao atualizar plano. Tente novamente.");
    }
  };

  const handleExportData = async (table: string) => {
    try {
      let data;
      
      switch(table) {
        case 'users':
          const { data: usersData } = await supabase.from('users').select('*');
          data = usersData;
          break;
        case 'essays':
          const { data: essaysData } = await supabase.from('essays').select('*');
          data = essaysData;
          break;
        case 'themes':
          const { data: themesData } = await supabase.from('themes').select('*');
          data = themesData;
          break;
        default:
          return;
      }

      if (!data) return;

      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${table}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
      alert("Erro ao exportar dados. Tente novamente.");
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
          <p className="text-gray-600">Carregando painel admin...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Acesso Negado</h2>
            <p className="text-gray-600 mb-6">Você não tem permissão para acessar esta página.</p>
            <Link href="/dashboard">
              <Button>Voltar ao Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const filteredThemes = themes.filter(theme =>
    theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEssays = essays.filter(essay =>
    essay.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    essay.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </span>
              <Badge className="ml-2 bg-red-600 text-white">
                Acesso Total
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost">
                  <Home className="w-4 h-4 mr-2" />
                  Página Inicial
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">
                  <Award className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'outline'}
            onClick={() => setActiveTab('dashboard')}
            className={activeTab === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'access' ? 'default' : 'outline'}
            onClick={() => setActiveTab('access')}
            className={activeTab === 'access' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
          >
            <Eye className="w-4 h-4 mr-2" />
            Acesso Total
          </Button>
          <Button
            variant={activeTab === 'themes' ? 'default' : 'outline'}
            onClick={() => setActiveTab('themes')}
            className={activeTab === 'themes' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Temas
          </Button>
          <Button
            variant={activeTab === 'users' ? 'default' : 'outline'}
            onClick={() => setActiveTab('users')}
            className={activeTab === 'users' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
          >
            <Users className="w-4 h-4 mr-2" />
            Usuários
          </Button>
          <Button
            variant={activeTab === 'essays' ? 'default' : 'outline'}
            onClick={() => setActiveTab('essays')}
            className={activeTab === 'essays' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
          >
            <FileText className="w-4 h-4 mr-2" />
            Redações
          </Button>
          <Button
            variant={activeTab === 'data' ? 'default' : 'outline'}
            onClick={() => setActiveTab('data')}
            className={activeTab === 'data' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Dados
          </Button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Estatísticas Gerais</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    <p className="text-sm text-gray-600">Total de Usuários</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalEssays}</p>
                    <p className="text-sm text-gray-600">Total de Redações</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalThemes}</p>
                    <p className="text-sm text-gray-600">Total de Temas</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                    <p className="text-sm text-gray-600">Usuários Ativos</p>
                  </div>
                </div>
              </Card>
            </div>

            <h3 className="text-2xl font-bold mb-4">Distribuição de Planos</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6">
                <Badge className="mb-3 bg-gray-100 text-gray-700">Gratuito</Badge>
                <p className="text-3xl font-bold text-gray-900">{stats.freeUsers}</p>
                <p className="text-sm text-gray-600">usuários</p>
              </Card>

              <Card className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-700">Básico</Badge>
                <p className="text-3xl font-bold text-gray-900">{stats.basicUsers}</p>
                <p className="text-sm text-gray-600">usuários</p>
              </Card>

              <Card className="p-6">
                <Badge className="mb-3 bg-blue-100 text-blue-700">Pro</Badge>
                <p className="text-3xl font-bold text-gray-900">{stats.proUsers}</p>
                <p className="text-sm text-gray-600">usuários</p>
              </Card>

              <Card className="p-6">
                <Badge className="mb-3 bg-purple-100 text-purple-700">Premium</Badge>
                <p className="text-3xl font-bold text-gray-900">{stats.premiumUsers}</p>
                <p className="text-sm text-gray-600">usuários</p>
              </Card>
            </div>
          </div>
        )}

        {/* Acesso Total Tab */}
        {activeTab === 'access' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Acesso Total às Funcionalidades</h2>
            <p className="text-gray-600 mb-8">Como administrador, você tem acesso completo a todas as funcionalidades do site.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Página Inicial */}
              <Link href="/">
                <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Página Inicial</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Acesse a landing page com todas as informações sobre planos e recursos
                  </p>
                  <Badge className="bg-green-100 text-green-700">Acesso Total</Badge>
                </Card>
              </Link>

              {/* Dashboard do Usuário */}
              <Link href="/dashboard">
                <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-purple-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Dashboard</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Visualize o dashboard como um usuário comum veria
                  </p>
                  <Badge className="bg-green-100 text-green-700">Acesso Total</Badge>
                </Card>
              </Link>

              {/* Escrever Redação */}
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-green-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <PenTool className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Escrever Redação</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Acesso ilimitado para escrever e corrigir redações
                </p>
                <Badge className="bg-green-100 text-green-700">Ilimitado</Badge>
              </Card>

              {/* Transcrição por Câmera */}
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-orange-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transcrição por Câmera</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Use OCR avançado para transcrever redações manuscritas
                </p>
                <Badge className="bg-green-100 text-green-700">Ilimitado</Badge>
              </Card>

              {/* Gerador de Redações IA */}
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-pink-300">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gerador de Redações IA</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Gere redações completas com inteligência artificial
                </p>
                <Badge className="bg-green-100 text-green-700">Ilimitado</Badge>
              </Card>

              {/* Todos os Temas */}
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-indigo-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Todos os Temas</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Acesso completo ao banco de temas de ENEM, concursos e vestibulares
                </p>
                <Badge className="bg-green-100 text-green-700">Acesso Total</Badge>
              </Card>

              {/* Relatórios e Estatísticas */}
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-cyan-300">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Relatórios Completos</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Visualize estatísticas detalhadas de todos os usuários
                </p>
                <Badge className="bg-green-100 text-green-700">Acesso Total</Badge>
              </Card>

              {/* Gerenciar Usuários */}
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-red-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gerenciar Usuários</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Edite planos, visualize dados e gerencie todos os usuários
                </p>
                <Badge className="bg-green-100 text-green-700">Acesso Total</Badge>
              </Card>

              {/* Exportar Dados */}
              <Card className="p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-yellow-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Exportar Dados</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Exporte todos os dados do sistema em formato JSON
                </p>
                <Badge className="bg-green-100 text-green-700">Acesso Total</Badge>
              </Card>
            </div>

            <Card className="p-8 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-start gap-4">
                <Shield className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Privilégios de Administrador</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      <span>Acesso ilimitado a todas as funcionalidades premium</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span>Sem restrições de uso ou limites de redações</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      <span>Visualização e edição de todos os dados do sistema</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      <span>Exportação completa de dados em qualquer formato</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Themes Tab */}
        {activeTab === 'themes' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Gerenciar Temas</h2>
              <Button
                onClick={() => {
                  setEditingTheme(null);
                  setThemeForm({
                    title: "",
                    description: "",
                    exam_type: "enem",
                    difficulty: "medium",
                    tags: ""
                  });
                  setShowThemeModal(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Tema
              </Button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar temas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredThemes.map((theme) => (
                <Card key={theme.id} className="p-6">
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
                  {theme.tags && theme.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {theme.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditTheme(theme)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteTheme(theme.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Gerenciar Usuários</h2>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{user.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>ID: {user.id}</span>
                        <span>•</span>
                        <span>Redações: {user.essays_count}/{user.essays_limit === 999999 ? '∞' : user.essays_limit}</span>
                        <span>•</span>
                        <span>Cadastro: {new Date(user.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        value={user.plan}
                        onChange={(e) => handleUpdateUserPlan(user.id, e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="free">Gratuito</option>
                        <option value="basic">Básico</option>
                        <option value="pro">Pro</option>
                        <option value="premium">Premium</option>
                      </select>
                      <Badge className={
                        user.plan === 'free' ? 'bg-gray-100 text-gray-700' :
                        user.plan === 'basic' ? 'bg-green-100 text-green-700' :
                        user.plan === 'pro' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }>
                        {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Essays Tab */}
        {activeTab === 'essays' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Todas as Redações</h2>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar redações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredEssays.map((essay) => (
                <Card key={essay.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{essay.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{essay.content}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>Usuário: {essay.user_id}</span>
                        <span>•</span>
                        <span>Data: {new Date(essay.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={
                        essay.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        essay.status === 'corrected' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }>
                        {essay.status === 'pending' ? 'Pendente' : 'Corrigida'}
                      </Badge>
                      {essay.score && (
                        <div className="text-2xl font-bold text-blue-600">
                          {essay.score}/1000
                        </div>
                      )}
                    </div>
                  </div>
                  {essay.feedback && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">Feedback:</p>
                      <p className="text-sm text-gray-600">{essay.feedback}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Data Export Tab */}
        {activeTab === 'data' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Exportar Dados</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Usuários</h3>
                    <p className="text-sm text-gray-600">{stats.totalUsers} registros</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleExportData('users')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar JSON
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Redações</h3>
                    <p className="text-sm text-gray-600">{stats.totalEssays} registros</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleExportData('essays')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar JSON
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Temas</h3>
                    <p className="text-sm text-gray-600">{stats.totalThemes} registros</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleExportData('themes')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar JSON
                </Button>
              </Card>
            </div>

            <Card className="p-6 mt-6">
              <h3 className="text-xl font-bold mb-4">Informações sobre Exportação</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Os dados são exportados no formato JSON</li>
                <li>• Todos os campos das tabelas são incluídos</li>
                <li>• O arquivo é baixado automaticamente no seu navegador</li>
                <li>• Nome do arquivo: [tabela]_[data].json</li>
                <li>• Você tem acesso total a todos os dados do sistema</li>
              </ul>
            </Card>
          </div>
        )}
      </div>

      {/* Theme Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">
              {editingTheme ? 'Editar Tema' : 'Novo Tema'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  type="text"
                  value={themeForm.title}
                  onChange={(e) => setThemeForm({ ...themeForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Ex: Desafios da mobilidade urbana no Brasil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  value={themeForm.description}
                  onChange={(e) => setThemeForm({ ...themeForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Descreva o tema e forneça contexto..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Exame</label>
                  <select
                    value={themeForm.exam_type}
                    onChange={(e) => setThemeForm({ ...themeForm, exam_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="enem">ENEM</option>
                    <option value="vestibular">Vestibular</option>
                    <option value="concurso">Concurso</option>
                    <option value="policia">Polícia</option>
                    <option value="geral">Geral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dificuldade</label>
                  <select
                    value={themeForm.difficulty}
                    onChange={(e) => setThemeForm({ ...themeForm, difficulty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={themeForm.tags}
                  onChange={(e) => setThemeForm({ ...themeForm, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Ex: mobilidade, transporte, urbanização"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => {
                  setShowThemeModal(false);
                  setEditingTheme(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={editingTheme ? handleUpdateTheme : handleCreateTheme}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {editingTheme ? 'Atualizar' : 'Criar'} Tema
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
