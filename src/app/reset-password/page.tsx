"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Award, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  Shield
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      setSuccess(true);
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Erro ao redefinir senha:", err);
      setError(err.message || "Erro ao redefinir senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Botão Voltar */}
      <Link 
        href="/login" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Voltar para Login</span>
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
            Crie uma nova senha
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Escolha uma senha forte e segura para proteger sua conta.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Mínimo 8 Caracteres</h3>
                <p className="text-gray-600 text-sm">
                  Use uma combinação de letras, números e símbolos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Senha Única</h3>
                <p className="text-gray-600 text-sm">
                  Não reutilize senhas de outras plataformas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Fácil de Lembrar</h3>
                <p className="text-gray-600 text-sm">
                  Mas difícil de adivinhar para outras pessoas
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Dicas para uma senha forte:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use letras maiúsculas e minúsculas</li>
                  <li>• Inclua números e caracteres especiais (@, #, $, etc.)</li>
                  <li>• Evite informações pessoais (nome, data de nascimento)</li>
                  <li>• Não use sequências óbvias (123456, abcdef)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <Card className="p-8 shadow-2xl border-2 border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Redefinir senha</h2>
            <p className="text-gray-600">
              Digite sua nova senha abaixo para recuperar o acesso à sua conta.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success ? (
            <div className="space-y-6">
              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Senha redefinida com sucesso!</h3>
                <p className="text-gray-600 mb-4">
                  Sua senha foi atualizada. Você será redirecionado para a página de login em instantes.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecionando automaticamente...
                </p>
              </div>

              <Link href="/login" className="block">
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Ir para Login Agora
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nova Senha */}
              <div>
                <Label htmlFor="password" className="text-gray-900 font-medium mb-2 block">
                  Nova Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 focus:border-blue-500"
                    required
                    minLength={8}
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
                <p className="text-xs text-gray-500 mt-1">
                  Use pelo menos 8 caracteres com letras e números
                </p>
              </div>

              {/* Confirmar Nova Senha */}
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-900 font-medium mb-2 block">
                  Confirmar Nova Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Indicador de Força da Senha */}
              {password.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Força da senha:</span>
                    <span className={`font-medium ${
                      password.length < 8 ? "text-red-600" :
                      password.length < 12 ? "text-yellow-600" :
                      "text-green-600"
                    }`}>
                      {password.length < 8 ? "Fraca" :
                       password.length < 12 ? "Média" :
                       "Forte"}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        password.length < 8 ? "w-1/3 bg-red-500" :
                        password.length < 12 ? "w-2/3 bg-yellow-500" :
                        "w-full bg-green-500"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Botão de Redefinir */}
              <Button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-medium"
              >
                {loading ? "Redefinindo..." : "Redefinir Senha"}
              </Button>
            </form>
          )}

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
            Crie uma nova senha
          </h1>
          <p className="text-gray-600">
            Escolha uma senha forte e segura
          </p>
        </div>
      </div>
    </div>
  );
}
