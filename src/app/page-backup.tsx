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
import { useRouter } from "next/navigation";
import PricingModal from "@/components/custom/PricingModal";
import SalesFunnel from "@/components/custom/SalesFunnel";
import { useRouter } from "next/navigation";
import PricingModal from "@/components/custom/PricingModal";
import SalesFunnel from "@/components/custom/SalesFunnel";

export default function Home() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSalesFunnel, setShowSalesFunnel] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "basic" | "pro" | "premium">("free");

  const handleStartFree = () => {
    setShowSalesFunnel(true);
  };

  const handleSelectPlan = (plan: "basic" | "pro" | "premium") => {
    setSelectedPlan(plan);
    setShowSalesFunnel(false);
    setShowPricingModal(true);
  };

  const handleUpgrade = (plan: string, paymentMethod: "credit" | "pix") => {
    console.log(`Upgrade para ${plan} via ${paymentMethod}`);
    router.push('/dashboard');
  };

  const handleViewPlanDetails = (plan: "free" | "basic" | "pro" | "premium") => {
    setSelectedPlan(plan);
    setShowPricingModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Modals */}
      <SalesFunnel
        isOpen={showSalesFunnel}
        onClose={() => setShowSalesFunnel(false)}
        onSelectPlan={handleSelectPlan}
      />

      <PricingModal
        plan={selectedPlan}
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        onUpgrade={handleUpgrade}
      />

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
              <Button 
                onClick={handleStartFree}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Começar Grátis
              </Button>
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
            <Button 
              onClick={handleStartFree}
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              Começar Agora Grátis
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
              <Camera className="w-5 h-5 mr-2" />
              Ver Demonstração
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para conquistar sua aprovação?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Comece grátis com 1 redação por mês e veja a diferença na sua escrita
          </p>
          <Button 
            onClick={handleStartFree}
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Começar Agora Grátis
          </Button>
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
                <li><a href="#metodologia" className="hover:text-white transition-colors">Metodologia</a></li>
                <li><a href="#concursos" className="hover:text-white transition-colors">Concursos</a></li>
                <li><a href="#policiais" className="hover:text-white transition-colors">Polícias</a></li>
                <li><a href="#criterios" className="hover:text-white transition-colors">Critérios</a></li>
                <li><a href="#plans" className="hover:text-white transition-colors">Planos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
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
