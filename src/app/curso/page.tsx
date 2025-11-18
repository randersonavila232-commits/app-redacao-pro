"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
  Target,
  TrendingUp,
  Lightbulb,
  PenTool,
  Brain,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  ChevronRight,
  Download,
  MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function CursoPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      router.push("/login");
      return;
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (userData) {
      setUser(userData);
      // Carregar progresso do usuário
      if (userData.completed_lessons) {
        setCompletedLessons(userData.completed_lessons);
      }
    }
    setLoading(false);
  };

  const modules = [
    {
      id: 1,
      title: "Fundamentos da Redação",
      description: "Aprenda os conceitos básicos e estrutura de uma redação nota 1000",
      icon: BookOpen,
      color: "blue",
      lessons: [
        {
          id: 1,
          title: "Estrutura da Redação Dissertativa-Argumentativa",
          duration: "15 min",
          type: "video",
          content: `
# Estrutura da Redação Dissertativa-Argumentativa

## O que é uma Redação Dissertativa-Argumentativa?

É um texto em que você apresenta um ponto de vista sobre um tema e o defende com argumentos consistentes. No ENEM e em concursos, essa é a estrutura mais cobrada.

## Estrutura Básica (4 partes essenciais)

### 1. Introdução (1 parágrafo - 4 a 5 linhas)
- **Contextualização**: Apresente o tema de forma ampla
- **Delimitação**: Especifique o recorte que será abordado
- **Tese**: Sua opinião/posicionamento sobre o tema
- **Projeto de texto**: Indique brevemente os argumentos que serão desenvolvidos

**Exemplo de introdução:**
"No contexto da sociedade contemporânea, a saúde mental tem se tornado uma preocupação crescente, especialmente entre os jovens. Fatores como a pressão acadêmica, o uso excessivo de redes sociais e a falta de apoio psicológico adequado contribuem para o agravamento desse cenário. Diante disso, torna-se fundamental analisar as causas desse problema e propor medidas eficazes para sua mitigação."

### 2. Desenvolvimento (2 parágrafos - 7 a 8 linhas cada)

**Parágrafo 1 - Primeiro Argumento:**
- Tópico frasal (ideia principal do parágrafo)
- Fundamentação (dados, exemplos, citações)
- Análise crítica
- Fechamento do argumento

**Parágrafo 2 - Segundo Argumento:**
- Tópico frasal diferente do primeiro
- Fundamentação com repertório sociocultural
- Análise aprofundada
- Conexão com o próximo parágrafo

**Dica importante:** Cada parágrafo deve desenvolver UMA ideia central. Não misture argumentos diferentes no mesmo parágrafo.

### 3. Conclusão (1 parágrafo - 5 a 6 linhas)

A conclusão deve conter uma **proposta de intervenção completa** com 5 elementos:

1. **Agente**: Quem vai executar a ação (governo, escola, mídia, família, etc.)
2. **Ação**: O que será feito
3. **Modo/Meio**: Como será feito
4. **Finalidade**: Para que será feito
5. **Detalhamento**: Especificação de algum dos elementos acima

**Exemplo de conclusão completa:**
"Portanto, é imprescindível que o Ministério da Educação (AGENTE), em parceria com as escolas, implemente programas de apoio psicológico (AÇÃO), por meio da contratação de psicólogos e da realização de palestras sobre saúde mental (MODO/MEIO), a fim de promover o bem-estar dos estudantes e prevenir transtornos psicológicos (FINALIDADE). Além disso, tais ações devem ser acompanhadas de campanhas de conscientização nas redes sociais, alcançando um público mais amplo (DETALHAMENTO)."

## Dicas Essenciais

✅ **Faça:**
- Use conectivos para ligar ideias
- Mantenha linguagem formal e impessoal (3ª pessoa)
- Cite dados, estudos, autores, filósofos, acontecimentos históricos
- Seja claro e objetivo
- Respeite os direitos humanos

❌ **Evite:**
- Usar 1ª pessoa (eu, nós)
- Gírias e expressões coloquiais
- Copiar trechos dos textos motivadores
- Tangenciar o tema (fugir do assunto)
- Propostas vagas ou genéricas

## Tamanho Ideal

- **Mínimo**: 7 linhas (menos que isso = nota zero)
- **Ideal**: 20 a 30 linhas
- **Máximo**: 30 linhas (não há penalização, mas evite ser prolixo)

## Checklist Final

Antes de entregar sua redação, verifique:
- [ ] Tem introdução, desenvolvimento (2 parágrafos) e conclusão?
- [ ] A tese está clara na introdução?
- [ ] Cada parágrafo de desenvolvimento tem um argumento diferente?
- [ ] Usei repertório sociocultural (dados, citações, exemplos)?
- [ ] A proposta de intervenção tem os 5 elementos?
- [ ] Respeitei os direitos humanos?
- [ ] Usei linguagem formal e impessoal?
- [ ] Revisei ortografia e gramática?
          `
        },
        {
          id: 2,
          title: "As 5 Competências do ENEM",
          duration: "20 min",
          type: "video",
          content: `
# As 5 Competências do ENEM

Sua redação vale 1000 pontos, divididos em 5 competências de 200 pontos cada. Entenda cada uma:

## Competência 1: Domínio da Norma Culta (200 pontos)

**O que é avaliado:**
- Ortografia (acentuação, hífen, etc.)
- Concordância verbal e nominal
- Regência verbal e nominal
- Pontuação
- Uso adequado de pronomes

**Níveis de avaliação:**
- 200 pontos: Excelente domínio (até 2 desvios)
- 160 pontos: Bom domínio (3 a 4 desvios)
- 120 pontos: Domínio mediano (5 a 7 desvios)
- 80 pontos: Domínio insuficiente (8 a 10 desvios)
- 40 pontos: Domínio precário (mais de 10 desvios)

**Dicas para pontuar bem:**
- Revise sua redação pelo menos 2 vezes
- Cuidado com vírgulas (não separe sujeito do verbo!)
- Atenção à crase (a + a = à)
- Use dicionário mental: se tiver dúvida, troque a palavra

**Erros mais comuns:**
- "Mas" (adversativo) vs "Mais" (quantidade)
- "Há" (tempo passado) vs "A" (futuro/distância)
- "Mau" (adjetivo) vs "Mal" (advérbio)
- Vírgula antes de "que" (geralmente está errada!)

## Competência 2: Compreensão do Tema (200 pontos)

**O que é avaliado:**
- Você entendeu o tema proposto?
- Desenvolveu o tema de forma completa?
- Usou repertório sociocultural produtivo?

**Repertório Sociocultural:**
É o uso de referências externas para fundamentar seus argumentos:
- Dados estatísticos
- Citações de filósofos, sociólogos, autores
- Fatos históricos
- Filmes, livros, séries (de forma contextualizada)
- Estudos científicos

**Exemplo de repertório bem usado:**
"Segundo o filósofo Zygmunt Bauman, vivemos em uma 'modernidade líquida', caracterizada por relações efêmeras e superficiais. Esse conceito se aplica perfeitamente ao contexto das redes sociais, onde..."

**Repertório PRODUTIVO vs IMPRODUTIVO:**
✅ Produtivo: Contextualizado, explicado, relacionado ao tema
❌ Improdutivo: Jogado no texto sem explicação, forçado, sem relação clara

**Tangenciamento (CUIDADO!):**
É quando você fala "em volta" do tema, mas não aborda o tema central. Isso pode zerar sua nota!

**Exemplo:**
- Tema: "Desafios da mobilidade urbana no Brasil"
- Tangenciamento: Falar só sobre poluição ambiental (sem conectar com mobilidade)
- Correto: Falar sobre transporte público, trânsito, infraestrutura urbana

## Competência 3: Seleção e Organização de Argumentos (200 pontos)

**O que é avaliado:**
- Seus argumentos são consistentes?
- Há progressão de ideias?
- Os argumentos se relacionam com a tese?

**Tipos de Argumentos:**

1. **Argumento de Autoridade:** Citação de especialistas
   - "Segundo o sociólogo Émile Durkheim..."

2. **Argumento por Exemplificação:** Casos concretos
   - "Um exemplo disso é o caso da Finlândia, que..."

3. **Argumento por Dados:** Estatísticas e números
   - "De acordo com o IBGE, 70% da população..."

4. **Argumento por Comparação:** Contrastar realidades
   - "Enquanto países europeus investem 6% do PIB em educação, o Brasil..."

5. **Argumento de Causa e Consequência:** Relação lógica
   - "A falta de investimento em educação resulta em..."

**Estrutura de um bom argumento:**
1. Apresente a ideia (tópico frasal)
2. Fundamente com dados/exemplos/citações
3. Analise criticamente
4. Conclua o raciocínio

## Competência 4: Coesão Textual (200 pontos)

**O que é avaliado:**
- Uso adequado de conectivos
- Referenciação (retomada de termos)
- Progressão textual sem repetições

**Conectivos Essenciais:**

**Adição/Continuação:**
- Além disso, ademais, outrossim, ainda, também

**Oposição/Contraste:**
- Porém, contudo, todavia, entretanto, no entanto

**Causa:**
- Porque, pois, visto que, uma vez que, já que

**Consequência:**
- Portanto, logo, assim, consequentemente, por conseguinte

**Finalidade:**
- Para que, a fim de que, com o objetivo de

**Conclusão:**
- Portanto, logo, assim sendo, em suma, por fim

**Exemplificação:**
- Por exemplo, como, tal como, a saber

**Dica de ouro:** Não comece parágrafos sempre com o mesmo conectivo! Varie.

**Referenciação:**
Use sinônimos e pronomes para evitar repetição:
- "O Brasil" → "o país", "a nação", "o território brasileiro"
- "A educação" → "o ensino", "a formação acadêmica", "esse direito fundamental"

## Competência 5: Proposta de Intervenção (200 pontos)

**O que é avaliado:**
- Sua proposta respeita os direitos humanos?
- Tem os 5 elementos completos?
- É detalhada e viável?

**Os 5 Elementos Obrigatórios:**

1. **AGENTE:** Quem vai fazer?
   - Governo Federal, Ministério da Educação, escolas, mídia, ONGs, família

2. **AÇÃO:** O que vai ser feito?
   - Implementar, criar, desenvolver, promover, realizar

3. **MODO/MEIO:** Como vai ser feito?
   - Por meio de, através de, mediante, via

4. **FINALIDADE:** Para quê?
   - A fim de, com o objetivo de, para que, visando

5. **DETALHAMENTO:** Especificação de um dos elementos
   - Detalhe o agente, a ação, o modo ou a finalidade

**Exemplo COMPLETO:**

"Urge que o Ministério da Educação (AGENTE), em parceria com as secretarias estaduais, implemente programas de capacitação docente (AÇÃO), por meio de cursos online e presenciais sobre metodologias ativas de ensino (MODO/MEIO), a fim de melhorar a qualidade da educação básica no país (FINALIDADE). Tais cursos devem ter carga horária mínima de 40 horas e certificação reconhecida pelo MEC (DETALHAMENTO)."

**Erros que ZERAM a Competência 5:**
❌ Desrespeitar direitos humanos
❌ Propor ações violentas ou autoritárias
❌ Sugerir censura ou restrição de liberdades

**Propostas GENÉRICAS (pontuação baixa):**
❌ "O governo deve investir em educação"
❌ "A sociedade precisa conscientizar-se"
❌ "É necessário criar leis mais rígidas"

**Propostas ESPECÍFICAS (pontuação alta):**
✅ Indica agente específico (qual ministério, qual órgão)
✅ Detalha a ação (qual programa, qual projeto)
✅ Explica como será feito (workshops, campanhas, etc.)

## Resumo das 5 Competências

| Competência | O que avaliar | Dica principal |
|-------------|---------------|----------------|
| C1 | Gramática | Revise 2x, cuidado com vírgulas |
| C2 | Tema + Repertório | Use dados, citações, exemplos |
| C3 | Argumentação | 2 argumentos diferentes e bem desenvolvidos |
| C4 | Coesão | Varie conectivos, evite repetições |
| C5 | Proposta | 5 elementos completos e detalhados |

## Exercício Prático

Analise esta conclusão e identifique os 5 elementos:

"Portanto, cabe ao Ministério da Saúde, em conjunto com as secretarias municipais, promover campanhas de vacinação em escolas e postos de saúde, por meio de mutirões e divulgação nas redes sociais, com o objetivo de aumentar a cobertura vacinal e prevenir surtos de doenças. Tais campanhas devem incluir materiais educativos em linguagem acessível e ações de busca ativa em comunidades vulneráveis."

**Resposta:**
- Agente: Ministério da Saúde + secretarias municipais
- Ação: Promover campanhas de vacinação
- Modo: Mutirões + divulgação nas redes sociais
- Finalidade: Aumentar cobertura vacinal e prevenir surtos
- Detalhamento: Materiais educativos + busca ativa em comunidades vulneráveis
          `
        },
        {
          id: 3,
          title: "Repertório Sociocultural: Como Usar",
          duration: "18 min",
          type: "reading"
        }
      ]
    },
    {
      id: 2,
      title: "Técnicas de Argumentação",
      description: "Domine as estratégias para construir argumentos sólidos e convincentes",
      icon: Brain,
      color: "purple",
      lessons: [
        {
          id: 4,
          title: "Tipos de Argumentos",
          duration: "25 min",
          type: "video"
        },
        {
          id: 5,
          title: "Conectivos e Coesão",
          duration: "20 min",
          type: "video"
        },
        {
          id: 6,
          title: "Evitando Falácias",
          duration: "15 min",
          type: "reading"
        }
      ]
    },
    {
      id: 3,
      title: "Proposta de Intervenção",
      description: "Aprenda a criar propostas completas e detalhadas",
      icon: Target,
      color: "green",
      lessons: [
        {
          id: 7,
          title: "Os 5 Elementos da Proposta",
          duration: "22 min",
          type: "video"
        },
        {
          id: 8,
          title: "Exemplos de Propostas Nota 1000",
          duration: "18 min",
          type: "reading"
        },
        {
          id: 9,
          title: "Erros Comuns na Conclusão",
          duration: "12 min",
          type: "video"
        }
      ]
    },
    {
      id: 4,
      title: "Prática e Correção",
      description: "Coloque em prática tudo que aprendeu",
      icon: PenTool,
      color: "orange",
      lessons: [
        {
          id: 10,
          title: "Exercício: Redação Completa",
          duration: "60 min",
          type: "practice"
        },
        {
          id: 11,
          title: "Análise de Redações Nota 1000",
          duration: "30 min",
          type: "reading"
        },
        {
          id: 12,
          title: "Simulado Final",
          duration: "90 min",
          type: "practice"
        }
      ]
    }
  ];

  const handleCompleteLesson = async (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);

      // Salvar no banco
      if (user) {
        await supabase
          .from('users')
          .update({ completed_lessons: newCompleted })
          .eq('id', user.id);
      }
    }
  };

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando curso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RedaçãoPro
              </span>
            </Link>

            <Link href="/dashboard">
              <Button variant="outline">
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Badge className="mb-4 bg-purple-100 text-purple-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Curso Completo
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Redação Nota 1000
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Domine todas as técnicas para conquistar a nota máxima
          </p>

          {/* Progress Card */}
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Seu Progresso</h3>
                <p className="text-blue-100">
                  {completedCount} de {totalLessons} aulas concluídas
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{progressPercentage.toFixed(0)}%</div>
                <p className="text-sm text-blue-100">Completo</p>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Modules List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Módulos</h2>
            {modules.map((module) => {
              const ModuleIcon = module.icon;
              const completedInModule = module.lessons.filter(lesson => 
                completedLessons.includes(lesson.id)
              ).length;
              const moduleProgress = (completedInModule / module.lessons.length) * 100;

              return (
                <Card
                  key={module.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedModule === module.id ? 'border-2 border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 bg-${module.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <ModuleIcon className={`w-5 h-5 text-${module.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {completedInModule}/{module.lessons.length} aulas
                      </span>
                      <span className="font-medium text-blue-600">
                        {moduleProgress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={moduleProgress} className="h-2" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Lessons Content */}
          <div className="lg:col-span-2">
            {selectedModule ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {modules.find(m => m.id === selectedModule)?.title}
                </h2>
                <div className="space-y-4">
                  {modules.find(m => m.id === selectedModule)?.lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isLocked = index > 0 && !completedLessons.includes(
                      modules.find(m => m.id === selectedModule)!.lessons[index - 1].id
                    );

                    return (
                      <Card
                        key={lesson.id}
                        className={`p-6 ${isLocked ? 'opacity-50' : 'hover:shadow-lg cursor-pointer'} transition-all`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isCompleted ? 'bg-green-100' : isLocked ? 'bg-gray-100' : 'bg-blue-100'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : isLocked ? (
                              <Lock className="w-6 h-6 text-gray-400" />
                            ) : lesson.type === 'video' ? (
                              <PlayCircle className="w-6 h-6 text-blue-600" />
                            ) : lesson.type === 'reading' ? (
                              <BookOpen className="w-6 h-6 text-blue-600" />
                            ) : (
                              <PenTool className="w-6 h-6 text-blue-600" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                  {lesson.title}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {lesson.duration}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {lesson.type === 'video' ? 'Vídeo' : lesson.type === 'reading' ? 'Leitura' : 'Prática'}
                                  </Badge>
                                </div>
                              </div>
                              {isCompleted && (
                                <Badge className="bg-green-100 text-green-700">
                                  Concluída
                                </Badge>
                              )}
                            </div>

                            {!isLocked && (
                              <div className="flex gap-2 mt-4">
                                {lesson.content ? (
                                  <Link href={`/curso/aula/${lesson.id}`}>
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                                      {isCompleted ? 'Revisar' : 'Começar'} Aula
                                      <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                  </Link>
                                ) : (
                                  <Button
                                    variant="outline"
                                    onClick={() => handleCompleteLesson(lesson.id)}
                                  >
                                    {isCompleted ? 'Revisar' : 'Começar'} Aula
                                  </Button>
                                )}
                              </div>
                            )}

                            {isLocked && (
                              <p className="text-sm text-gray-500 mt-2">
                                Complete a aula anterior para desbloquear
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Selecione um módulo
                </h3>
                <p className="text-gray-600">
                  Escolha um módulo ao lado para ver as aulas disponíveis
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                <p className="text-sm text-gray-600">Aulas Concluídas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
                <p className="text-sm text-gray-600">Módulos Disponíveis</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalLessons - completedCount}</p>
                <p className="text-sm text-gray-600">Aulas Restantes</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
