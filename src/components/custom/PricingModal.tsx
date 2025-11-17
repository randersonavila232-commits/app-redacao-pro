"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  CheckCircle2,
  Crown,
  CreditCard,
  QrCode,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";

interface PricingModalProps {
  plan: "free" | "basic" | "pro" | "premium";
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: string, paymentMethod: "credit" | "pix") => void;
}

const planDetails = {
  free: {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Experimente gratuitamente",
    features: [
      { text: "1 redação corrigida por mês", included: true },
      { text: "Análise básica das competências", included: true },
      { text: "Banco de temas limitado", included: true },
      { text: "Transcrição por câmera", included: false },
      { text: "Gerador de redações IA", included: false },
      { text: "Temas de concursos específicos", included: false },
      { text: "Videoaulas completas", included: false },
      { text: "Banco de repertórios", included: false },
      { text: "Suporte prioritário", included: false }
    ],
    color: "gray"
  },
  basic: {
    name: "Básico",
    price: "R$ 29,90",
    period: "/mês",
    installments: "ou 3x de R$ 9,97 sem juros",
    description: "Ideal para começar a praticar",
    features: [
      { text: "5 redações corrigidas por mês", included: true },
      { text: "Análise completa das competências", included: true },
      { text: "3 transcrições por câmera/mês", included: true },
      { text: "Guias de redação completos", included: true },
      { text: "Relatórios de evolução", included: true },
      { text: "Acesso a temas ENEM e Vestibulares", included: true },
      { text: "Gerador de redações IA", included: false },
      { text: "Banco de repertórios completo", included: false },
      { text: "Suporte prioritário", included: false }
    ],
    color: "green"
  },
  pro: {
    name: "Aluno Pro",
    price: "R$ 49",
    period: "/mês",
    installments: "ou 12x de R$ 4,08 sem juros",
    description: "Para estudantes dedicados",
    features: [
      { text: "Correções ilimitadas", included: true },
      { text: "Transcrições ilimitadas", included: true },
      { text: "Gerador de redações com IA", included: true },
      { text: "Todos os temas: ENEM, Concursos, Vestibulares", included: true },
      { text: "Redações modelo de todos os concursos", included: true },
      { text: "Banco de repertórios completo (500+)", included: true },
      { text: "Videoaulas completas (120+)", included: true },
      { text: "Relatórios avançados de evolução", included: true },
      { text: "Suporte prioritário", included: true }
    ],
    color: "blue"
  },
  premium: {
    name: "Professor/Escola",
    price: "R$ 199",
    period: "/mês",
    installments: "ou 12x de R$ 16,58 sem juros",
    description: "Para educadores e instituições",
    features: [
      { text: "Tudo do plano Aluno Pro", included: true },
      { text: "Até 50 alunos inclusos", included: true },
      { text: "Painel de gestão de turmas", included: true },
      { text: "Relatórios consolidados por aluno", included: true },
      { text: "Banco de redações modelo exclusivo", included: true },
      { text: "Criação de temas personalizados", included: true },
      { text: "Estatísticas da turma em tempo real", included: true },
      { text: "Suporte dedicado via WhatsApp", included: true },
      { text: "Treinamento para professores", included: true }
    ],
    color: "purple"
  }
};

export default function PricingModal({ plan, isOpen, onClose, onUpgrade }: PricingModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix">("credit");
  const [pixCopied, setPixCopied] = useState(false);
  const details = planDetails[plan];

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540599.005802BR5925RedacaoPro Educacao LTDA6009SAO PAULO62070503***63041D3A");
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  const handleUpgrade = () => {
    onUpgrade(plan, paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <Badge className={`mb-2 bg-${details.color}-100 text-${details.color}-700`}>
              {plan === "premium" && <Crown className="w-3 h-3 mr-1" />}
              {details.name}
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900">{details.description}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Pricing */}
          <div className="mb-8 text-center">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">{details.price}</span>
              <span className="text-xl text-gray-600">{details.period}</span>
            </div>
            {details.installments && (
              <p className="text-sm text-green-600 font-medium">{details.installments}</p>
            )}
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">O que está incluído:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {details.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  {feature.included ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? "text-gray-900" : "text-gray-400 line-through"}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          {plan !== "free" && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Escolha a forma de pagamento:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      paymentMethod === "credit"
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setPaymentMethod("credit")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === "credit" ? "bg-blue-600" : "bg-gray-200"
                      }`}>
                        <CreditCard className={`w-6 h-6 ${
                          paymentMethod === "credit" ? "text-white" : "text-gray-600"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Cartão de Crédito</h4>
                        <p className="text-sm text-gray-600">Parcelamento em até 12x sem juros</p>
                      </div>
                    </div>
                  </Card>

                  <Card
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      paymentMethod === "pix"
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => setPaymentMethod("pix")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === "pix" ? "bg-green-600" : "bg-gray-200"
                      }`}>
                        <QrCode className={`w-6 h-6 ${
                          paymentMethod === "pix" ? "text-white" : "text-gray-600"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">PIX</h4>
                        <p className="text-sm text-green-600 font-medium">5% de desconto à vista</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* PIX Details */}
              {paymentMethod === "pix" && (
                <Card className="p-6 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <h4 className="font-bold text-lg mb-4 text-center">Pagamento via PIX</h4>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center border-2 border-green-300">
                      <QrCode className="w-32 h-32 text-green-600" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-gray-700 mb-2 text-center">Ou copie o código PIX:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value="00020126580014br.gov.bcb.pix...63041D3A"
                          readOnly
                          className="flex-1 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm"
                        />
                        <Button
                          onClick={handleCopyPix}
                          variant="outline"
                          className="border-2 border-green-600 text-green-600 hover:bg-green-50"
                        >
                          {pixCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </Button>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">
                        {plan === "basic" && "R$ 28,41"}
                        {plan === "pro" && "R$ 46,55"}
                        {plan === "premium" && "R$ 189,05"}
                      </p>
                      <p className="text-xs text-gray-600">Valor com 5% de desconto</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Button */}
              <Button
                onClick={handleUpgrade}
                size="lg"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {paymentMethod === "credit" ? (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pagar com Cartão
                  </>
                ) : (
                  <>
                    <QrCode className="w-5 h-5 mr-2" />
                    Confirmar Pagamento PIX
                  </>
                )}
              </Button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Pagamento 100% seguro e criptografado</span>
              </div>
            </>
          )}

          {plan === "free" && (
            <Button
              onClick={onClose}
              size="lg"
              variant="outline"
              className="w-full h-14 text-lg font-bold"
            >
              Fechar
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
