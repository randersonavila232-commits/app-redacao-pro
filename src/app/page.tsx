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
  ListChecks
} from "lucide-react";
import Link from "next/link";

export default function Home() {
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
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Recursos
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
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                Depoimentos
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Tecnologia de IA para Redação Perfeita
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
            Correções inteligentes, transcrição por câmera e metodologia comprovada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                <Zap className="w-5 h-5 mr-2" />
                Começar Agora Grátis
              </Button>
            </Link>
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
              <span>Parcelamento facilitado</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Acesso imediato</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Taxa de Aprovação</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">50k+</div>
              <div className="text-blue-100">Alunos Aprovados</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">200k+</div>
              <div className="text-blue-100">Redações Corrigidas</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Concursos Section */}
      <section id="concursos" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-700">
            Para Todos os Concursos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Prepare-se para Qualquer Desafio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma é especializada em diversos tipos de concursos e provas que exigem redação
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-blue-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">ENEM</h3>
            <p className="text-gray-600 text-sm mb-4">
              Metodologia específica para as 5 competências do ENEM. Temas atualizados e correção detalhada.
            </p>
            <Badge className="bg-blue-100 text-blue-700">Mais Popular</Badge>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-green-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Concursos Públicos</h3>
            <p className="text-gray-600 text-sm mb-4">
              Prepare-se para concursos federais, estaduais e municipais com temas específicos.
            </p>
            <Badge className="bg-green-100 text-green-700">Alta Demanda</Badge>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-purple-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center mb-4">
              <School className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vestibulares</h3>
            <p className="text-gray-600 text-sm mb-4">
              Fuvest, Unicamp, UERJ e outros. Correção adaptada ao estilo de cada instituição.
            </p>
            <Badge className="bg-purple-100 text-purple-700">Especializado</Badge>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-orange-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-400 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Certificações</h3>
            <p className="text-gray-600 text-sm mb-4">
              OAB, Residências Médicas, Mestrado e outros processos seletivos com redação.
            </p>
            <Badge className="bg-orange-100 text-orange-700">Profissional</Badge>
          </Card>
        </div>

        {/* Benefícios por Concurso */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-center mb-8">Recursos Específicos por Tipo de Concurso</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Banco de Temas Atualizado</h4>
                <p className="text-sm text-gray-600">Mais de 500 temas específicos para cada tipo de prova</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Correção Personalizada</h4>
                <p className="text-sm text-gray-600">Critérios adaptados ao estilo de cada banca examinadora</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Redações Modelo</h4>
                <p className="text-sm text-gray-600">Exemplos reais de redações nota máxima em cada concurso</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Concursos Policiais Section - NOVO */}
      <section id="policiais" className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500 text-white">
              <Shield className="w-3 h-3 mr-1" />
              Concursos Policiais
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Concursos Policiais com Redação
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Prepare-se especificamente para os concursos policiais que exigem redação ou prova discursiva no edital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Polícia Federal - Delegado */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 hover:border-blue-400 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Polícia Federal</h3>
                  <Badge className="bg-blue-500 text-white text-xs">Delegado</Badge>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Prova discursiva obrigatória</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Temas de Direito e Atualidades</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Correção técnica e argumentativa</p>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-400/30">
                <p className="text-xs text-blue-200">
                  <strong>Banca:</strong> CESPE/CEBRASPE | <strong>Peso:</strong> Eliminatório e classificatório
                </p>
              </div>
            </Card>

            {/* Polícia Civil - Delegado */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-2 border-emerald-400/30 hover:border-emerald-400 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Polícia Civil</h3>
                  <Badge className="bg-emerald-500 text-white text-xs">Delegado</Badge>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Redação dissertativa obrigatória</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Temas jurídicos e sociais</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Avaliação de conhecimento técnico</p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-400/30">
                <p className="text-xs text-blue-200">
                  <strong>Bancas:</strong> Variadas (FCC, VUNESP, CESPE) | <strong>Estados:</strong> SP, RJ, MG, RS e outros
                </p>
              </div>
            </Card>

            {/* Polícia Militar - Oficial */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-2 border-amber-400/30 hover:border-amber-400 hover:shadow-2xl transition-all hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Polícia Militar</h3>
                  <Badge className="bg-amber-500 text-white text-xs">Oficial</Badge>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Redação em alguns estados</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Temas de segurança pública</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-100">Foco em liderança e ética</p>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-400/30">
                <p className="text-xs text-blue-200">
                  <strong>Bancas:</strong> Variadas por estado | <strong>Observação:</strong> Consulte edital específico
                </p>
              </div>
            </Card>
          </div>

          {/* Informações Adicionais */}
          <Card className="mt-12 p-8 bg-white/10 backdrop-blur-sm border-2 border-blue-400/30 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Preparação Específica para Concursos Policiais</h3>
                <p className="text-blue-100">
                  Nossa plataforma oferece preparação direcionada para as provas discursivas e redações dos principais concursos policiais do Brasil.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border border-blue-400/20">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  Temas Específicos
                </h4>
                <p className="text-sm text-blue-100">
                  Banco de temas focados em segurança pública, direito penal, direitos humanos e atualidades policiais.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-blue-400/20">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-blue-400" />
                  Critérios das Bancas
                </h4>
                <p className="text-sm text-blue-100">
                  Correção baseada nos critérios específicos de cada banca examinadora (CESPE, FCC, VUNESP, etc.).
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-blue-400/20">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Redações Modelo
                </h4>
                <p className="text-sm text-blue-100">
                  Exemplos de redações nota máxima de candidatos aprovados em concursos policiais anteriores.
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-blue-400/20">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  Acompanhamento
                </h4>
                <p className="text-sm text-blue-100">
                  Relatórios detalhados mostrando sua evolução nos critérios específicos de concursos policiais.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-500/20 rounded-lg border border-amber-400/30">
              <div className="flex items-start gap-2">
                <ListChecks className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white">
                  <strong>Importante:</strong> Sempre consulte o edital específico do concurso para confirmar se há prova de redação ou discursiva. Os requisitos podem variar entre estados e anos.
                </p>
              </div>
            </div>
          </Card>

          {/* CTA Policiais */}
          <div className="mt-12 text-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white text-lg px-8">
                <Shield className="w-5 h-5 mr-2" />
                Começar Preparação Policial
              </Button>
            </Link>
            <p className="text-blue-200 text-sm mt-4">
              Junte-se a centenas de aprovados em concursos policiais
            </p>
          </div>
        </div>
      </section>

      {/* Critérios de Avaliação Section */}
      <section id="criterios" className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700">
              <ClipboardCheck className="w-3 h-3 mr-1" />
              Critérios Oficiais
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Critérios de Avaliação Detalhados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Entenda exatamente o que cada banca examinadora espera da sua redação
            </p>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {/* ENEM */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">ENEM - Exame Nacional do Ensino Médio</h3>
                  <p className="text-gray-600">Redação dissertativo-argumentativa com 5 competências</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-600 text-white mt-1">C1</Badge>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Domínio da Norma Culta</h4>
                      <p className="text-sm text-gray-700">Demonstrar domínio da modalidade escrita formal da língua portuguesa. Avalia ortografia, acentuação, pontuação, concordância, regência e uso adequado de vocabulário.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-600 text-white mt-1">C2</Badge>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Compreensão do Tema</h4>
                      <p className="text-sm text-gray-700">Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro dos limites estruturais do texto dissertativo-argumentativo em prosa.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-600 text-white mt-1">C3</Badge>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Seleção e Organização de Argumentos</h4>
                      <p className="text-sm text-gray-700">Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista. Exige repertório sociocultural produtivo e coerência argumentativa.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-600 text-white mt-1">C4</Badge>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Coesão Textual</h4>
                      <p className="text-sm text-gray-700">Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação. Uso adequado de conectivos, pronomes, sinônimos e outros recursos coesivos.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-600 text-white mt-1">C5</Badge>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Proposta de Intervenção</h4>
                      <p className="text-sm text-gray-700">Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos. Deve conter: agente, ação, modo/meio, efeito e detalhamento.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <ListChecks className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700"><strong>Pontuação:</strong> Cada competência vale 200 pontos, totalizando 1000 pontos. Mínimo de 560 pontos para não zerar.</p>
                </div>
              </div>
            </Card>

            {/* Concursos Públicos */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-green-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-400 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Concursos Públicos</h3>
                  <p className="text-gray-600">Critérios gerais para provas discursivas (Polícia, TRF, TRT, etc.)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Adequação ao Tema e Tipo Textual</h4>
                      <p className="text-sm text-gray-700">Capacidade de abordar o tema proposto de forma direta, relevante e dentro do tipo textual solicitado (dissertativo, narrativo, descritivo ou técnico).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Clareza e Objetividade</h4>
                      <p className="text-sm text-gray-700">Exposição clara das ideias, sem ambiguidades. Linguagem objetiva e direta, especialmente importante para cargos técnicos e administrativos.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Estrutura e Organização</h4>
                      <p className="text-sm text-gray-700">Uso correto de introdução, desenvolvimento e conclusão. Parágrafos bem estruturados com progressão lógica de ideias.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Correção Gramatical</h4>
                      <p className="text-sm text-gray-700">Domínio da norma culta: ortografia, acentuação, pontuação, concordância nominal e verbal, regência e colocação pronominal.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Coerência e Coesão</h4>
                      <p className="text-sm text-gray-700">Articulação lógica entre as ideias e uso adequado de conectivos. Texto deve formar um todo harmônico e compreensível.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Capacidade Argumentativa</h4>
                      <p className="text-sm text-gray-700">Construção de argumentos sólidos, fundamentados e convincentes. Uso de dados, exemplos e raciocínio lógico para defender posicionamento.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <ListChecks className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700"><strong>Observação:</strong> Cada banca (CESPE, FCC, FGV, VUNESP) possui critérios específicos. Nossa plataforma adapta a correção conforme o edital do concurso.</p>
                </div>
              </div>
            </Card>

            {/* Vestibulares */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-purple-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center">
                  <School className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Vestibulares</h3>
                  <p className="text-gray-600">Critérios para FUVEST, UNICAMP, UERJ, UFRGS e outros</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Interpretação e Desenvolvimento do Tema</h4>
                      <p className="text-sm text-gray-700">Compreensão profunda do tema proposto e capacidade de desenvolvê-lo de forma original e criativa, indo além do senso comum.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Qualidade Argumentativa</h4>
                      <p className="text-sm text-gray-700">Construção de argumentos sólidos, bem fundamentados e originais. Uso de repertório cultural diversificado (literatura, filosofia, história, atualidades).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Coesão e Coerência</h4>
                      <p className="text-sm text-gray-700">Articulação eficiente entre parágrafos e períodos. Uso variado e adequado de conectivos. Progressão lógica e harmoniosa das ideias.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Domínio da Língua Portuguesa</h4>
                      <p className="text-sm text-gray-700">Correção gramatical impecável e riqueza vocabular. Uso adequado de figuras de linguagem e recursos estilísticos quando apropriado.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Estrutura Textual</h4>
                      <p className="text-sm text-gray-700">Organização clara em introdução, desenvolvimento e conclusão. Parágrafos bem desenvolvidos com tópico frasal e desenvolvimento adequado.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Conclusão e Síntese</h4>
                      <p className="text-sm text-gray-700">Capacidade de sintetizar as ideias apresentadas e propor reflexões finais ou soluções coerentes com o desenvolvimento do texto.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <ListChecks className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700"><strong>Diferencial:</strong> Vestibulares valorizam muito a originalidade, repertório cultural e maturidade intelectual. UNICAMP, por exemplo, exige textos mais autorais e criativos.</p>
                </div>
              </div>
            </Card>

            {/* Certificações Profissionais */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-orange-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-400 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Certificações Profissionais</h3>
                  <p className="text-gray-600">OAB, Residências Médicas, Mestrado e outros</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Domínio Técnico da Área</h4>
                      <p className="text-sm text-gray-700">Demonstração de conhecimento específico da área profissional. Uso correto de terminologia técnica e conceitos especializados.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Adequação ao Formato Exigido</h4>
                      <p className="text-sm text-gray-700">Respeito às normas específicas: peças processuais (OAB), artigos científicos (Mestrado), casos clínicos (Residência Médica).</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Clareza e Precisão</h4>
                      <p className="text-sm text-gray-700">Linguagem técnica clara, precisa e objetiva. Capacidade de comunicar ideias complexas de forma compreensível.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Fundamentação e Referências</h4>
                      <p className="text-sm text-gray-700">Uso adequado de legislação (Direito), literatura científica (Medicina), normas ABNT e citações quando necessário.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Raciocínio Lógico Profissional</h4>
                      <p className="text-sm text-gray-700">Capacidade de análise crítica, diagnóstico de problemas e proposição de soluções dentro dos padrões da profissão.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Correção Formal</h4>
                      <p className="text-sm text-gray-700">Domínio impecável da norma culta, especialmente importante em contextos profissionais onde erros podem comprometer credibilidade.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <ListChecks className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700"><strong>Importante:</strong> Cada certificação possui formato e critérios muito específicos. Nossa plataforma oferece modelos e correções personalizadas para cada tipo de prova profissional.</p>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Critérios */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Correções Baseadas em Critérios Oficiais</h3>
              <p className="text-gray-700 mb-6">
                Nossa IA é treinada com os editais e critérios oficiais de cada concurso, garantindo que sua redação seja avaliada exatamente como será na prova real.
              </p>
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                  <Target className="w-5 h-5 mr-2" />
                  Começar a Praticar Agora
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700">
            Recursos Poderosos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tudo que você precisa para a nota máxima
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ferramentas profissionais e metodologia comprovada em uma única plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transcrição por Câmera</h3>
            <p className="text-gray-600">
              Tire foto da sua redação manuscrita e receba a transcrição digital instantaneamente com OCR avançado.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Correção Inteligente</h3>
            <p className="text-gray-600">
              Análise completa baseada nos critérios específicos de cada concurso com sugestões detalhadas.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Guia Passo a Passo</h3>
            <p className="text-gray-600">
              Aprenda a estruturar redações perfeitas com tutoriais interativos desde o básico até o avançado.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-orange-200">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Gerador de Redações</h3>
            <p className="text-gray-600">
              Crie redações únicas sobre qualquer tema com IA, seguindo normas ABNT e padrões específicos.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-pink-200">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">3 Perfis de Acesso</h3>
            <p className="text-gray-600">
              Aluno, Professor e Escola - cada um com ferramentas específicas para melhor aproveitamento.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-indigo-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Acompanhamento de Evolução</h3>
            <p className="text-gray-600">
              Gráficos e relatórios detalhados mostrando seu progresso em cada competência ao longo do tempo.
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700">
              <Trophy className="w-3 h-3 mr-1" />
              Histórias de Sucesso
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Aprovados em Diversos Concursos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como nossos alunos conquistaram suas aprovações
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <h4 className="font-bold">Maria Clara</h4>
                  <p className="text-sm text-gray-600">ENEM 2023</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-gray-700 italic">
                "Consegui nota 980 na redação do ENEM! As correções detalhadas me ajudaram a identificar meus erros e evoluir rapidamente. Recomendo muito!"
              </p>
              <Badge className="mt-4 bg-blue-100 text-blue-700">Nota 980 - ENEM</Badge>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  RS
                </div>
                <div>
                  <h4 className="font-bold">Roberto Silva</h4>
                  <p className="text-sm text-gray-600">TRF - Concurso Público</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-gray-700 italic">
                "Passei em 1º lugar no TRF! O banco de temas específicos para concursos públicos foi essencial. A plataforma é completa e muito eficiente."
              </p>
              <Badge className="mt-4 bg-green-100 text-green-700">1º Lugar - TRF</Badge>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  AF
                </div>
                <div>
                  <h4 className="font-bold">Ana Ferreira</h4>
                  <p className="text-sm text-gray-600">FUVEST 2024</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-gray-700 italic">
                "Aprovada em Medicina na USP! As redações modelo da FUVEST me mostraram exatamente o que a banca esperava. Valeu cada centavo!"
              </p>
              <Badge className="mt-4 bg-purple-100 text-purple-700">Aprovada - USP</Badge>
            </Card>
          </div>

          {/* Mais Depoimentos */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  LC
                </div>
                <div>
                  <h4 className="font-bold">Lucas Costa</h4>
                  <p className="text-sm text-gray-600">OAB - 1ª Fase</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic text-sm">
                "A correção específica para peças processuais da OAB foi fundamental. Passei na 1ª fase com tranquilidade!"
              </p>
              <Badge className="mt-3 bg-orange-100 text-orange-700">Aprovado - OAB</Badge>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  JM
                </div>
                <div>
                  <h4 className="font-bold">Juliana Martins</h4>
                  <p className="text-sm text-gray-600">Residência Médica</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic text-sm">
                "Aprovada na residência dos meus sonhos! Os temas de saúde pública e a correção técnica foram perfeitos."
              </p>
              <Badge className="mt-3 bg-indigo-100 text-indigo-700">Aprovada - Residência</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="plans" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700">
            Planos e Preços
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todos os planos com parcelamento facilitado no cartão de crédito
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Plano Gratuito */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Gratuito</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600 text-sm">Experimente gratuitamente</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>1 redação corrigida/mês</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Análise básica das competências</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Banco de temas limitado</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm line-through">Transcrição por câmera</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm line-through">Gerador de redações IA</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm line-through">Temas de concursos específicos</span>
              </li>
            </ul>

            <Link href="/register" className="block">
              <Button variant="outline" className="w-full">
                Começar Grátis
              </Button>
            </Link>
          </Card>

          {/* Plano Básico */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-green-300">
            <Badge className="mb-3 bg-green-100 text-green-700">
              Melhor Custo-Benefício
            </Badge>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Básico</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">R$ 29,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-xs text-green-600 font-medium mb-2">ou 3x de R$ 9,97 sem juros</p>
              <p className="text-gray-600 text-sm">Ideal para começar a praticar</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>5 redações corrigidas/mês</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Análise completa das competências</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">3 transcrições por câmera/mês</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Guias de redação completos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Relatórios de evolução</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Acesso a temas ENEM e Vestibulares</span>
              </li>
            </ul>

            <Link href="/register" className="block">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Assinar Agora
              </Button>
            </Link>
          </Card>

          {/* Plano Aluno Pro */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-blue-600 relative">
            <Badge className="mb-3 bg-blue-600 text-white">
              Mais Popular
            </Badge>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Aluno Pro</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">R$ 49</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-xs text-blue-600 font-medium mb-2">ou 12x de R$ 4,08 sem juros</p>
              <p className="text-gray-600 text-sm">Para estudantes dedicados</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>Correções ilimitadas</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Transcrições ilimitadas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Gerador de redações com IA</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Todos os temas: ENEM, Concursos, Vestibulares</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Redações modelo de todos os concursos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Relatórios avançados de evolução</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Suporte prioritário</span>
              </li>
            </ul>

            <Link href="/register" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Assinar Agora
              </Button>
            </Link>
          </Card>

          {/* Plano Professor/Escola */}
          <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-purple-300">
            <Badge className="mb-3 bg-purple-100 text-purple-700">
              Profissional
            </Badge>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Professor/Escola</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold">R$ 199</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-xs text-purple-600 font-medium mb-2">ou 12x de R$ 16,58 sem juros</p>
              <p className="text-gray-600 text-sm">Para educadores e instituições</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Tudo do plano Aluno Pro</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm"><strong>Até 50 alunos</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Painel de gestão de turmas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Relatórios consolidados</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Banco de redações modelo</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">Suporte dedicado</span>
              </li>
            </ul>

            <Link href="/register" className="block">
              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Falar com Vendas
              </Button>
            </Link>
          </Card>
        </div>

        {/* Informação sobre parcelamento */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-full">
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Todos os planos com parcelamento facilitado em até 12x sem juros no cartão</span>
          </div>
        </div>

        {/* Promoção Especial */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center">
          <Badge className="mb-4 bg-white text-orange-600">
            🎉 Promoção Limitada
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Ganhe 20% OFF na Primeira Mensalidade
          </h3>
          <p className="text-lg mb-6 text-orange-50">
            Use o cupom <strong className="bg-white/20 px-3 py-1 rounded">APROVADO20</strong> no checkout
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Aproveitar Oferta
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Indicar um Amigo e Ganhar Desconto
            </Button>
          </div>
          <p className="text-sm mt-4 text-orange-100">
            Válido apenas para novos usuários. Oferta por tempo limitado.
          </p>
        </Card>
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
          <Link href="/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
              <GraduationCap className="w-5 h-5 mr-2" />
              Começar Agora Grátis
            </Button>
          </Link>
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
                <li><a href="#concursos" className="hover:text-white transition-colors">Concursos</a></li>
                <li><a href="#policiais" className="hover:text-white transition-colors">Polícias</a></li>
                <li><a href="#criterios" className="hover:text-white transition-colors">Critérios</a></li>
                <li><a href="#plans" className="hover:text-white transition-colors">Planos</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
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
