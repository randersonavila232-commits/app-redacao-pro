"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  CheckCircle2,
  Crown,
  TrendingUp,
  Users,
  Award,
  Zap,
  Target,
  ArrowRight,
  Star
} from "lucide-react";
import { useState } from "react";

interface SalesFunnelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: "basic" | "pro" | "premium") => void;
}

export default function SalesFunnel({ isOpen, onClose, onSelectPlan }: SalesFunnelProps) {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s === step
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : s < step
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {step === 1 && "Bem-vindo ao RedaçãoPro!"}
                {step === 2 && "Veja o que você está perdendo"}
                {step === 3 && "Escolha seu plano ideal"}
              </h3>
              <p className="text-sm text-gray-600">Passo {step} de 3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Parabéns por dar o primeiro passo! 🎉
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Você acabou de se juntar a mais de 50.000 alunos que conquistaram suas aprovações com o RedaçãoPro
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">+180</div>
                  <p className="text-sm text-gray-700">Pontos de evolução média</p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-1">98.7%</div>
                  <p className="text-sm text-gray-700">Taxa de aprovação</p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">4.9/5</div>
                  <p className="text-sm text-gray-700">Avaliação dos alunos</p>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  🎁 Oferta Especial de Boas-Vindas
                </h3>
                <p className="text-gray-700 mb-4">
                  Como novo usuário, você tem direito a <strong>20% de desconto</strong> em qualquer plano pago no primeiro mês!
                </p>
                <Badge className="bg-yellow-400 text-yellow-900">
                  Cupom: APROVADO20
                </Badge>
              </Card>

              <Button
                onClick={() => setStep(2)}
                size="lg"
                className="w-full max-w-md h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Show Benefits */}
          {step === 2 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Veja o que você está perdendo no plano gratuito
                </h2>
                <p className="text-lg text-gray-600">
                  Compare e veja como um upgrade pode acelerar sua aprovação
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Plano Grátis */}
                <Card className="p-6 bg-gray-50 border-2 border-gray-300">
                  <Badge className="mb-4 bg-gray-200 text-gray-700">Plano Atual</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Plano Gratuito</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">1 redação por mês</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="text-gray-400 line-through">Transcrição por câmera</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="text-gray-400 line-through">Gerador de redações IA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="text-gray-400 line-through">Banco de repertórios</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" />
                      <span className="text-gray-400 line-through">Videoaulas completas</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                    <p className="text-sm text-yellow-800 font-medium">
                      ⚠️ Limitado a apenas 1 redação por mês
                    </p>
                  </div>
                </Card>

                {/* Plano Pro */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-600 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      Recomendado
                    </Badge>
                  </div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">Upgrade</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Pro</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-blue-600">R$ 49</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900 font-medium">Correções ilimitadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900 font-medium">Transcrição ilimitada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900 font-medium">Gerador de redações IA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900 font-medium">500+ repertórios</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900 font-medium">120+ videoaulas</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300">
                    <p className="text-sm text-green-800 font-medium">
                      ✅ Pratique quantas vezes quiser!
                    </p>
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Alunos que praticam 3x por semana evoluem 3x mais rápido
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Com o plano gratuito, você só pode praticar 1 vez por mês. Com o plano Pro, você pode praticar todos os dias e acelerar sua aprovação!
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Plano Gratuito</p>
                        <p className="text-2xl font-bold text-gray-900">1 redação/mês</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Plano Pro</p>
                        <p className="text-2xl font-bold text-green-600">Ilimitado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  size="lg"
                  className="flex-1 h-14 text-lg"
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  size="lg"
                  className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Ver Planos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Choose Plan */}
          {step === 3 && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Escolha o plano ideal para você
                </h2>
                <p className="text-lg text-gray-600">
                  Todos os planos com 20% de desconto no primeiro mês
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Básico */}
                <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-green-300">
                  <Badge className="mb-4 bg-green-100 text-green-700">Melhor Custo-Benefício</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Básico</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-gray-900">R$ 29,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium mb-6">ou 3x de R$ 9,97</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>5 redações/mês</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>3 transcrições/mês</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Guias completos</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onSelectPlan("basic")}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Escolher Básico
                  </Button>
                </Card>

                {/* Pro */}
                <Card className="p-6 border-2 border-blue-600 relative shadow-2xl scale-105">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                  <Badge className="mb-4 bg-blue-100 text-blue-700">Recomendado</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-blue-600">R$ 49</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium mb-6">ou 12x de R$ 4,08</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Ilimitado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Gerador IA</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>500+ repertórios</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>120+ videoaulas</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onSelectPlan("pro")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Escolher Pro
                  </Button>
                </Card>

                {/* Premium */}
                <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-purple-300">
                  <Badge className="mb-4 bg-purple-100 text-purple-700">Profissional</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Professor/Escola</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-gray-900">R$ 199</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                  <p className="text-sm text-purple-600 font-medium mb-6">ou 12x de R$ 16,58</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Tudo do Pro</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Até 50 alunos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Gestão de turmas</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onSelectPlan("premium")}
                    variant="outline"
                    className="w-full"
                  >
                    Escolher Premium
                  </Button>
                </Card>
              </div>

              <div className="text-center">
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="lg"
                  className="text-gray-600"
                >
                  Continuar com plano gratuito
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
