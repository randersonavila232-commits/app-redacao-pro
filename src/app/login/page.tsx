"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Mensagens de erro mais amigáveis
        if (signInError.message.includes("Invalid login credentials")) {
          throw new Error("E-mail ou senha incorretos. Verifique suas credenciais.");
        } else if (signInError.message.includes("Email not confirmed")) {
          throw new Error("Por favor, confirme seu e-mail antes de fazer login.");
        } else {
          throw signInError;
        }
      }

      if (data.user) {
        // Verificar se o usuário existe na tabela users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError && userError.code === 'PGRST116') {
          // Usuário não existe na tabela, criar registro
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email || email,
              name: data.user.user_metadata?.name || 'Usuário',
              plan: 'free',
              essays_count: 0,
              essays_limit: 1
            });

          if (insertError) {
            console.error("Erro ao criar registro do usuário:", insertError);
          }
        }

        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError(err.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Botão Voltar */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Voltar</span>
      </Link>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Lado Esquerdo - Informações */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RedaçãoPro
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo de volta!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Continue sua jornada rumo à aprovação. Acesse sua conta e pratique suas redações.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Correções Instantâneas</h3>
                <p className="text-gray-600 text-sm">
                  Receba feedback detalhado em até 2 minutos com análise de 50+ critérios
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Acompanhe sua Evolução</h3>
                <p className="text-gray-600 text-sm">
                  Veja seu progresso em gráficos detalhados e relatórios personalizados
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Acesso Total</h3>
                <p className="text-gray-600 text-sm">
                  Temas atualizados, banco de repertórios e redações modelo
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                MC
              </div>
              <div>
                <p className="font-bold text-gray-900">Maria Clara</p>
                <p className="text-sm text-gray-600">Aprovada no ENEM 2023</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "A plataforma me ajudou a evoluir 240 pontos em 2 meses! As correções são muito detalhadas e me mostraram exatamente onde melhorar."
            </p>
          </div>
        </div>

        {/* Lado Direito - Formulário de Login */}
        <Card className="p-8 shadow-2xl border-2 border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Entrar na sua conta</h2>
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Cadastre-se grátis
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-900 font-medium mb-2 block">
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-gray-900 font-medium">
                  Senha
                </Label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-2 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Lembrar-me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="remember" className="text-gray-700 cursor-pointer">
                Lembrar-me neste dispositivo
              </Label>
            </div>

            {/* Botão de Login */}
            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-medium"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          {/* Login Social */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 border-2">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 border-2">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>

          {/* Badge de Segurança */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Conexão segura e criptografada</span>
          </div>
        </Card>

        {/* Mobile - Logo e Título */}
        <div className="lg:hidden text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RedaçãoPro
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-600">
            Continue sua jornada rumo à aprovação
          </p>
        </div>
      </div>
    </div>
  );
}
