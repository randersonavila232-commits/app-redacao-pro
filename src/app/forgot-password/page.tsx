"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Award, 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  Send
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
    } catch (err: any) {
      console.error("Erro ao enviar e-mail de recuperação:", err);
      setError(err.message || "Erro ao enviar e-mail. Tente novamente.");
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
            Recupere seu acesso
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Não se preocupe! Enviaremos um link de recuperação para seu e-mail cadastrado.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Processo Rápido e Seguro</h3>
                <p className="text-gray-600 text-sm">
                  Receba o link de recuperação em segundos no seu e-mail
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Link Temporário</h3>
                <p className="text-gray-600 text-sm">
                  O link expira em 1 hora por segurança da sua conta
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Suporte Disponível</h3>
                <p className="text-gray-600 text-sm">
                  Problemas? Nossa equipe está pronta para ajudar
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
            <h3 className="font-bold text-gray-900 mb-2">💡 Dica de Segurança</h3>
            <p className="text-gray-700 text-sm">
              Sempre verifique se o e-mail de recuperação foi enviado por <strong>noreply@redacaopro.com</strong>. 
              Nunca compartilhe seu link de recuperação com outras pessoas.
            </p>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <Card className="p-8 shadow-2xl border-2 border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Esqueceu sua senha?</h2>
            <p className="text-gray-600">
              Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.
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
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">E-mail enviado com sucesso!</h3>
                <p className="text-gray-600 mb-4">
                  Enviamos um link de recuperação para <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Não recebeu o e-mail? Verifique sua caixa de spam ou tente novamente em alguns minutos.
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  className="w-full h-12 border-2"
                >
                  Enviar novamente
                </Button>
                <Link href="/login" className="block">
                  <Button 
                    variant="outline"
                    className="w-full h-12 border-2"
                  >
                    Voltar para Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-900 font-medium mb-2 block">
                  E-mail cadastrado
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
                <p className="text-xs text-gray-500 mt-2">
                  Digite o e-mail que você usou para criar sua conta
                </p>
              </div>

              {/* Botão de Enviar */}
              <Button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-medium"
              >
                {loading ? "Enviando..." : "Enviar Link de Recuperação"}
              </Button>

              {/* Link para Login */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Lembrou sua senha?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Fazer login
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* Informações Adicionais */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-bold text-gray-900 text-sm mb-2">Precisa de ajuda?</h4>
            <p className="text-xs text-gray-600 mb-3">
              Se você não conseguir recuperar sua senha, entre em contato com nosso suporte:
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>📧 E-mail: suporte@redacaopro.com</p>
              <p>💬 WhatsApp: (11) 99999-9999</p>
              <p>⏰ Horário: Segunda a Sexta, 9h às 18h</p>
            </div>
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
            Recupere seu acesso
          </h1>
          <p className="text-gray-600">
            Enviaremos um link para seu e-mail
          </p>
        </div>
      </div>
    </div>
  );
}
