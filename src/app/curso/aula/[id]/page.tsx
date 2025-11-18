"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight,
  Download
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from 'react-markdown';

export default function AulaPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = parseInt(params.id as string);
  const [completed, setCompleted] = useState(false);
  const [user, setUser] = useState<any>(null);

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
      if (userData.completed_lessons?.includes(lessonId)) {
        setCompleted(true);
      }
    }
  };

  const lessons: any = {
    1: {
      title: "Estrutura da Redação Dissertativa-Argumentativa",
      duration: "15 min",
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

## Exercício Prático

**Tema:** "Os desafios da educação digital no Brasil"

Tente escrever uma introdução seguindo a estrutura:
1. Contextualização (fale sobre tecnologia na educação)
2. Delimitação (especifique os desafios no Brasil)
3. Tese (seu posicionamento sobre o tema)
4. Projeto de texto (indique os argumentos que desenvolveria)

**Dica:** Use dados como "Segundo pesquisa do IBGE, apenas 60% dos estudantes brasileiros têm acesso à internet de qualidade..."
      `
    },
    2: {
      title: "As 5 Competências do ENEM",
      duration: "20 min",
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
    }
  };

  const lesson = lessons[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aula não encontrada</h2>
          <Link href="/curso">
            <Button>Voltar ao Curso</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleComplete = async () => {
    if (user) {
      const completedLessons = user.completed_lessons || [];
      if (!completedLessons.includes(lessonId)) {
        const newCompleted = [...completedLessons, lessonId];
        await supabase
          .from('users')
          .update({ completed_lessons: newCompleted })
          .eq('id', user.id);
        setCompleted(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/curso" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar ao Curso</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RedaçãoPro
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-blue-100 text-blue-700">
                <BookOpen className="w-3 h-3 mr-1" />
                Aula {lessonId}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lesson.duration}
              </Badge>
              {completed && (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Concluída
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {lesson.title}
            </h1>
          </div>

          {/* Content */}
          <Card className="p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mb-4 mt-8" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4" {...props} />,
                  p: ({node, ...props}) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4" {...props} />
                  ),
                  code: ({node, ...props}) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />
                  ),
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-gray-300" {...props} />
                    </div>
                  ),
                  th: ({node, ...props}) => (
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold text-left" {...props} />
                  ),
                  td: ({node, ...props}) => (
                    <td className="border border-gray-300 px-4 py-2" {...props} />
                  ),
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Link href="/curso">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Curso
              </Button>
            </Link>

            {!completed && (
              <Button 
                onClick={handleComplete}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Marcar como Concluída
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            )}

            {completed && (
              <Link href="/curso">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Próxima Aula
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
