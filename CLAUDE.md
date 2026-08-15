# Cookies & Co Floripa — MazyOS

A operação da Cookies & Co roda em cima desse arquivo. Aqui ficam as regras
do MazyOS — como o Claude lê o contexto, aprende com correções, mantém tudo
atualizado e cria skills novas conforme a operação evolui — e, no final, as
regras específicas do negócio (preenchidas pelo `/instalar`).

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem
e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Ao
sugerir prioridades, formatos ou abordagens, considerar o foco atual
descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, landing page), consultar
`identidade/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas
usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill. Se
não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o
usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o
padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma
instrução que parece permanente (frases como "na verdade é assim", "não
faça mais isso", "prefiro assim", "sempre que...", "evita...", "da
próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (clientes, serviços, mercado) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco** (projetos, metas, prazos) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro.
Confirmar mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato (ex: "na
verdade o arquivo se chama X"). Só perguntar quando a informação tiver
valor duradouro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, processo novo, ferramenta instalada, estrutura
alterada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Se sim, identificar o que atualizar:

- **Cliente, serviço, ferramenta, equipe** → `_memoria/empresa.md`
- **Mudança de prioridade ou foco** → `_memoria/estrategia.md`
- **Tom ou estilo** → `_memoria/preferencias.md`
- **Pasta, regra de organização, skill criada** → `CLAUDE.md`
- **Visual (cores, fontes, logo)** → `identidade/design-guide.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo
inteiro, só adicionar ou editar a linha relevante.

**Quando NÃO perguntar:**
- Tarefas pontuais sem impacto no contexto (escrever um email avulso, criar um post)
- Perguntas simples ou conversas sem ação
- Mudanças já salvas pelo bloco "Aprender com correções"

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`. Se
   existir, usar como base e adaptar pro contexto
2. Perguntar se é específica desse projeto ou útil em qualquer:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
   o conteúdo da skill ao contexto do negócio
4. Se a skill precisar de arquivos de apoio (templates, exemplos),
   criar dentro da pasta da skill
5. Seguir o fluxo da skill-creator nativa do Claude Code

---

# Cookies & Co Floripa — regras do negócio

*(Perfil aplicado: **empresa** — pequeno negócio local, loja física + delivery,
adaptado de `templates/perfis/claude-md-empresa.md`.)*

## O que é esse workspace

Operação da Cookies & Co Floripa. Aqui ficam a memória do negócio, a identidade
da marca, o site e tudo que o sistema gera pra vender cookie.

**Estrutura de pastas:**
- `_memoria/` — quem é a empresa, como falamos, foco atual
- `identidade/` — marca aplicada em tudo que o sistema gera
- `site/` — o site da loja (projeto ativo)
- `marketing/` — conteúdo, Instagram, campanhas
- `saidas/` — documentos pontuais
- `dados/` — arquivos a analisar (avaliações, relatórios, exports)
- `scripts/` — utilitários
- `templates/` — moldes do MazyOS
- `tarefas.md` — o que tá em jogo agora

Setores como `comercial/`, `financeiro/` e `rh/` não existem aqui — a operação é
enxuta. Criar só quando fizer falta de verdade.

## Sobre a empresa

Cookies & Co Floripa é uma loja de cookies artesanais na Trindade, em Florianópolis.
Cookies grandes, recheados e servidos quentinhos, mais fondue de cookie, cookie com
sorvete e cafés. Consumo no local, retirada e delivery. Detalhes em `_memoria/empresa.md`.

O ativo principal é o Instagram [@cookiescofloripa](https://instagram.com/cookiescofloripa)
(~13,7 mil seguidores) e um produto muito fotogênico.

## O que mais fazemos aqui

- Site da loja (institucional + porta de entrada da loja online)
- Conteúdo e carrossel pro Instagram
- Resposta a avaliações

## Tom de voz

Informal, próximo e divertido — "Hey cookie lovers 🧡". Frase curta, emoji na medida,
produto no centro. Assinatura: *"Cookies, 'cause they never disappoint 🧡🍪"*.

Evitar: formalidade de confeitaria gourmet, "caro cliente", jargão de marketing,
texto longo. Detalhe completo em `_memoria/preferencias.md`.

## Regras do sistema

- Antes de qualquer peça visual, ler `identidade/design-guide.md`. A paleta peach/creme
  e o conceito "cute bakery editorial" não são sugestão — são a marca
- CTA padrão em qualquer superfície: **PEDIR AGORA 🍪**, apontando pro sistema de
  pedidos que já existe. Não recriar cardápio do zero
- Não inventar dado de produto, preço, sabor, horário ou endereço. O que está em
  `_memoria/empresa.md` veio de material público — confirmar com a loja antes de publicar
- O endereço está divergente entre plataformas. Não publicar endereço sem confirmação
- Trabalho do site fica em `site/`

## Ferramentas conectadas

- [ ] Instagram / Meta
- [ ] Google Business
- [ ] Notion
- [ ] Gmail
- [ ] Google Ads
- [ ] Meta Ads

*(Marcar conforme for instalando os MCPs)*
