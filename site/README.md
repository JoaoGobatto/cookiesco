# Site — Cookies & Co Floripa

Site institucional + porta de entrada do sistema de pedidos. HTML, CSS e JS puros,
sem build e sem dependência externa (as fontes são auto-hospedadas). É só abrir o
`index.html` no navegador ou subir a pasta inteira em qualquer hospedagem estática
(Netlify, Vercel, GitHub Pages, hospedagem comum via FTP).

```
site/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js          ← CONFIG e CARDÁPIO ficam aqui
│   ├── fonts/              ← Baloo 2, DM Sans e Caveat auto-hospedadas
│   └── img/                ← as fotos entram aqui (hero/ já tem os recortes)
├── briefing-site.md        ← a direção acordada
└── README.md
```

## Estado atual — em construção, seção por seção

A página tem hoje **abertura animada, header, hero, "muito mais que cookies" e
avaliações**, mais rodapé (com o crédito "Site criado por João Felipe Gobatto").
A barra superior de contato e a faixa de quatro ícones abaixo do hero foram removidas
a pedido do dono. As outras seções (anatomia do cookie, cardápio completo, delivery, motivos,
galeria, Instagram, localização) foram removidas de propósito para serem refeitas uma
de cada vez, com mais cuidado.

Elas não se perderam: estão no histórico do git, no commit anterior à remoção. Para
consultar o que existia:

```bash
git log --oneline -- site/index.html
git show <commit>:site/index.html
```

A navegação do topo só aponta para o que existe. Cada seção que voltar ganha o link
de novo. As fotos listadas mais abaixo (galeria, Instagram, mapa) só voltam a ser
usadas quando as seções delas voltarem.

## De onde vem cada decisão

A **estrutura** segue o site de referência da Grill Burger:

| Grill Burger | Aqui |
|---|---|
| header com logo central + CTA | header com logo central + `PEDIR ONLINE` e barra sangrada |
| hero: slider, produto explodido, setas, borda recortada | mesma composição, com o cookie em camadas e fundo por sabor |
| menu com quatro cartões de categoria | "Muito mais que cookies", quatro cartões de produto |
| depoimentos | avaliações do Google com resumo e carrossel |

A **pele** é toda da Cookies & Co, de `identidade/design-guide.md`: peach `#F6B093`,
creme `#FFF3E9`, marrom `#8B5E4B`, Baloo 2 nos títulos, DM Sans no corpo, Caveat nos
detalhes manuscritos. Nada de preto predominante nem dourado.

## Pra colocar no ar — 3 coisas

**1. O link do sistema de pedidos.** Em `assets/js/main.js`, no topo:

```js
const CONFIG = {
  linkPedido: 'https://cardapio.ai/online/cookiescofloripa',
  whatsapp: '5548988340265',
  linkMapa: ''      // ← só depois de confirmar o endereço
};
```

Os botões de pedido da página saem daí. Se o endereço mudar, muda numa linha só.
Enquanto o campo estiver vazio, os botões ficam inertes em vez de quebrar.

**Link direto por sabor.** Os CTAs do hero levam a pessoa já na página do produto, não
na home do cardápio. O endereço de cada um fica em `CONFIG.produtos`, e o botão escolhe
pelo `data-produto` no HTML:

```js
produtos: { 'napolitano': '...?p=7497421571', 'red-ninho': '...?p=7291839806', ... }
```

```html
<a class="btn btn--cta" data-link="pedido" data-produto="napolitano">Pedir agora</a>
```

Sem `data-produto`, o botão cai no `linkPedido` geral — é o caso dos CTAs de seção e do
botão fixo do mobile, que não falam de um sabor específico. Sabor sem link cadastrado
também cai no geral, então nada quebra.

**2. As fotos.** Toda foto que falta aparece como um bloco peach escrito
`FOTO: <nome>`. É só salvar o arquivo com o nome certo em `assets/img/` que ele
entra sozinho — não precisa mexer no HTML. O hero tem regras próprias: veja
**O cookie do hero**, mais abaixo.

| Arquivo | O que é |
|---|---|
| `cookie-pudim.jpg` | o cookie de pudim inteiro (seção "Tá na dúvida?") |
| `cookie-aberto.jpg` | cookie aberto mostrando o recheio |
| `fondue.jpg` | fondue de cookie |
| `cookie-sorvete.jpg` | cookie quente com bola de sorvete |
| `galeria-1.jpg` … `galeria-5.jpg` | galeria |
| `insta-1.jpg` … `insta-6.jpg` | grid do Instagram (quadradas) |
| `mapa.jpg` | print do mapa (ou trocar por um `<iframe>` do Google Maps) |

A logo já está em `assets/img/`: `logo-marrom.webp` (header, fundos claros) e
`logo-claro.webp` (rodapé, fundos escuros). As duas saíram do mesmo arquivo —
o original é branco + peach, feito pra fundo escuro, então a versão marrom foi
gerada recolorindo os traços pra não sumir em cima do peach do hero.

Formato: JPG ou WebP, largura de uns 1200px nas grandes e 800px nas quadradas.

**3. O cardápio.** Também em `assets/js/main.js`, na lista `CARDAPIO`. Cada item:

```js
{ nome: 'Pudim', desc: 'Creme branco...', preco: 22.90, tag: 'Top' }
```

`preco: null` faz o item aparecer sem preço — é como está agora, porque os valores
ainda não foram confirmados. `tag` é opcional (o selinho verde).

## O cookie do hero

A seção 1 copia a composição do slider da referência: fundo chapado, headline em
caixa alta, produto flutuando à direita sobre as formas orgânicas. Duas coisas são
próprias daqui: **o produto é montado em camadas** e **o fundo muda de cor conforme
o cookie que está na tela**.

### Tema por slide

Cada slide carrega as três cores no próprio HTML:

```html
<article class="hero__slide" data-bg="#3A231A" data-blob="#52301F" data-blob2="#6B3F27">
```

- `data-bg` — o fundo chapado da seção
- `data-blob` / `data-blob2` — as formas orgânicas atrás do produto

O JS lê esses valores do slide ativo e joga em variáveis CSS no `.hero`, com
transição de 0,7s. Trocar de slide troca a cor da seção inteira junto.

**Como escolher a cor de um cookie novo:** pega o tom dominante da massa (a mediana
das cores do recorte, ignorando os 15% mais claros, que são recheio e gotas) e
escurece pra ficar entre 15% e 25% de luminosidade. Foi assim que saíram:

| Slide | Massa | Fundo | Blobs |
|---|---|---|---|
| Napolitano (agosto) | `#461C15` | `#442230` | `#5E2C40` / `#7B3753` |
| chocolate | `#2F1C16` | `#3A231A` | `#52301F` / `#6B3F27` |
| Red Ninho | `#74131A` | `#4E1217` | `#6D181E` / `#8C1D25` |

Não usar preto puro — o design-guide proíbe, e cookie escuro sobre fundo escuro
demais some. O chocolate ficou num cacau bem escuro, não em preto.

**A logo não muda de slide.** Enquanto o header flutua sobre o hero ele usa a versão
original (branco + peach), que é a cor padrão da marca e funciona em qualquer um dos
fundos escuros. Quando o header fixa no creme, troca pra versão marrom. Menu, botão
e a barra sangrada seguem a mesma lógica.

### Camadas

Camadas em `assets/img/hero/`, recortadas das fotos em `identidade/fotos/`:

| Arquivo | Camada | Comportamento |
|---|---|---|
| `cookie-partido.webp` / `ninho-partido.webp` | cookie partido, recheio escorrendo | protagonista, cresce no hover |
| `cookie-inteiro.webp` / `ninho-inteiro.webp` | cookie inteiro | fica atrás, recua e inclina no hover |
| `chip-*.webp` / `ninho-chip-*.webp` | gotas de chocolate soltas | flutuam e se espalham no hover |

**Como reposicionar sem mexer em CSS.** Cada camada carrega a própria posição no
`style`, em porcentagem do palco:

```html
<div class="stage__layer camada--partido" style="--l:24%;--t:-4%;--w:76%;--f:1.15">
```

- `--l` esquerda · `--t` topo · `--w` largura
- `--f` é a profundidade: quanto maior, mais a camada corre com o mouse.
  Cookie de trás `.45`, o da frente `1.15`, as gotas `2.2` a `3.1`.

### Como os recortes foram feitos

**O fundo da foto decide o trabalho todo.** Vale a pena ler isso antes da próxima
sessão de fotos.

*Fundo frio (azul-acinzentado) — o caminho fácil.* O Red Ninho foi refotografado
assim, e o recorte virou uma linha de código: cookie, creme e gotas são quentes
(vermelho menos azul entre +40 e +73), fundo e bancada são frios (entre −33 e −12).
Um corte em `R − B > 12` separa tudo de uma vez, sem tocar em borda, sombra ou
textura. Só um cuidado: o preenchimento de buracos fecha junto os furos do recheio,
aqueles que na foto deixam ver o fundo através — reabre o que for francamente frio
e eles voltam a ser transparentes.

*Fundo quente (terracota) — o caminho difícil.* Foi o caso do cookie de chocolate e
da primeira foto do Red Ninho. Aí o fundo tem cor parecida com o produto e o
recorte precisa de detecção de borda (o fundo é liso, o cookie tem contorno duro),
mais três remendos:

1. **A borda da bancada** entra como um risco fino e comprido colado no cookie. Sai
   por regra geométrica: apagar o que é fino na vertical e longo na horizontal. Os
   fios de doce também são finos, mas verticais, então ficam.
2. **O pé do cookie** mergulha na sombra da bancada e perde o contorno. A máscara
   cresce ali pra dentro do escuro, limitada à faixa horizontal que o cookie ocupa.
3. **Bolsões de fundo presos entre os fios** — invisíveis quando o fundo do site era
   peach, evidentes agora que é escuro. Saem por crescimento a partir de sementes que
   batem com o fundo estimado localmente.

E na primeira foto do Red Ninho ainda teve um quarto problema: creme (215,160,129)
e fundo (223,147,121) com praticamente o mesmo RGB. A borda entre os dois some e o
preenchimento come o recheio. Deu pra resolver pelo brilho — o creme é ~30 mais
claro que o fundo naquele ponto — mas o resultado nunca ficou tão limpo quanto o da
foto de fundo azul.

**Conclusão pra fotografar:** fundo liso e **frio** (azul, cinza-azulado, verde
acinzentado), produto quente. Assim o recorte é exato e sai em segundos.

Pra refazer à mão, o caminho mais simples é o Gemini, uma foto por vez:

> Remova o fundo desta foto e devolva um PNG com fundo transparente. Preserve as
> bordas do cookie e os fios de recheio, sem halo branco em volta. Não altere cor,
> textura nem enquadramento.

**Especificação:** fundo transparente, lado maior de 1500px, **sem sombra embutida**
(o CSS aplica a sombra). WebP fica ~8x menor que PNG com a mesma qualidade.

**Sobre vídeo (Flow):** não vale pro hero. Vídeo com fundo transparente depende de
WebM/alpha, que o Safari não toca — o cookie apareceria numa caixa preta no iPhone.
O Flow rende melhor num loop na seção do fondue ou direto no Instagram, em MP4.

### Pra somar um slide novo

1. Manda a foto do cookie: mesmo enquadramento das outras (cookie inteiro à esquerda,
   partido à direita) e **fundo liso e frio**, azul ou cinza-azulado — é o que faz o
   recorte sair exato.
2. Duplica um `<article class="hero__slide">` no `index.html`, troca texto, imagens
   e as três cores do tema.
3. Só isso — o slider conta os slides sozinho e some com as setas se sobrar um só.

## Muito mais que cookies

Quatro cartões com foto em retrato (4:5), nome e uma linha de texto. É HTML direto,
sem lista em JS — são poucos itens e cada um tem foto própria.

Ordem: nossos cookies, fondue, chocolate quente, fatias de torta. As fotos ficam em
`assets/img/produtos/`, cortadas para 4:5 a partir dos originais guardados em
`identidade/fotos/`.

Trocar qualquer uma é substituir o arquivo na pasta, mantendo o nome. Se a foto sumir,
o cartão vira placeholder identificado em vez de ícone quebrado.

O fondue é servido em copo da marca *Vanilla cookies&co*; o dono confirmou que é produto
da casa, por isso entra aqui.

> A foto da pilha de cookies veio em 409px de largura, contra 900px das outras. Serve no
> tamanho em que aparece, mas fica mais macia em tela retina — vale pedir o original.

## Avaliações

A seção tem duas partes: o resumo à esquerda e o carrossel de cards à direita. Tudo
sai de `assets/js/main.js`.

**O resumo** troca de cara sozinho. Enquanto `RESUMO` estiver com `null`, ele mostra
o título de marca ("Quem já provou / Amou"). Assim que a nota e o total forem
preenchidos, vira o placar com estrelas, igual aos widgets de avaliação:

```js
const RESUMO = { nota: 4.9, total: 148 };
```

A palavra do topo (Excelente / Muito bom / Bom) é calculada da nota, não escrita à mão.

**Os cards** vêm da lista `AVALIACOES`:

```js
{ nome: 'André Cisne', quando: '2 anos atrás', nota: 5, texto: 'Delicioso o lanche...' }
```

`guia: true` mostra o selo Local Guide, que pesa na credibilidade. `nome` e `quando` com
`null` viram "Cliente no Google" e escondem a data. O avatar é a inicial do nome num
círculo colorido, o mesmo recurso que o Google usa para quem não tem foto. Quebra de
linha no texto (`\n`) vira parágrafo no card.

As quatro que estão lá foram transcritas dos prints do perfil da loja: Maria Noêmia,
Tainara Talita, Gabriela Westphal e Andressa Tatiana, todas 5 estrelas e Local Guide.

Existe uma quinta, da Lara Dalla Nora, comentada no arquivo. É elogiosa e 5 estrelas,
mas fala da sacola surpresa do Food To Save e abre com "mesmo não sendo frescos" —
numa página que vende cookie quentinho isso trabalha contra. Para usar, descomentar.

Texto comprido é cortado em 4 linhas com um "Ler mais" — que só aparece quando o texto
realmente foi cortado, não em todo card.

**Nada de avaliação inventada.** Se um texto não veio de um cliente de verdade, não
entra. É propaganda enganosa e, além disso, some com a credibilidade da seção inteira,
que é justamente o que ela existe pra construir.

### Como manter atualizado

Três caminhos, do mais simples ao mais automático:

1. **Manual (o de agora).** Você copia as avaliações do perfil do Google e cola na
   lista. Controle total do visual, zero dependência externa, mas não atualiza sozinho.
2. **Widget pronto** (Trustindex, Elfsight, EmbedSocial). É de onde veio o layout que
   serviu de referência. Atualiza sozinho e mostra a nota real, mas entra como script
   de terceiro: pesa no carregamento, traz o visual deles e o plano gratuito costuma
   ter marca d'água.
3. **Google Places API.** Oficial, devolve as 5 avaliações mais recentes. Precisa de
   chave, e a chave não pode ficar exposta no HTML — pede uma função serverless
   (a Vercel faz isso numa pasta `api/`). Atualiza sozinho e sem script de terceiro.

## Botões de pedido

Todo botão que leva ao sistema de pedidos usa a classe `btn--cta`, então mudar o
tratamento de um muda o de todos — são dez na página. O visual é degradê peach com
brilho quente em volta e um brilho que atravessa no hover; o do hero ganha `btn--pulsa`,
um respiro lento de sombra, por ser o ponto de conversão principal.

Os secundários (`btn--outline-light`, `btn--ghost`) são de propósito mais apagados:
contorno fino e texto translúcido. É o contraste entre os dois que faz o CTA saltar,
não só a cor dele.

Sem emoji nos rótulos.

## Abertura da página

Quem entra no site vê, nessa ordem: a tela coberta de marrom com o logo claro no
meio → o logo some → o marrom desliza pra cima → logo atrás dele o peach desliza
também → o site aparece e os elementos entram em fila (menu, logo, botões, título,
descrição, CTAs e por último o cookie).

Três arquivos participam:

- **`index.html`** — a cortina (`.cortina`, duas folhas + logo) logo depois do
  `<body>`, e um script de três linhas no `<head>` que marca `<html class="carregando">`.
  Esse script é inline de propósito: se ele esperasse o CSS ou o JS do rodapé,
  a página piscaria o conteúdo antes da cortina cobrir. Ele também tem um
  `setTimeout` de 3s que solta tudo caso a animação nunca rode.
- **`assets/css/styles.css`** — desenha a cortina e, enquanto `.carregando` estiver
  na raiz, deixa em `opacity:0` tudo que tem `data-entra`, `data-entra-grade` ou
  está dentro de `[data-entra-hero]`.
- **`assets/js/intro.js`** — a linha do tempo em GSAP.

Os ajustes ficam todos no objeto `ABERTURA`, no topo do `intro.js`:

| Chave | O que faz |
| --- | --- |
| `umaVezPorSessao` | `true` mostra a cortina só na primeira visita da aba (usa `sessionStorage`) |
| `folha` | quanto cada cor leva pra sair (0.75s) |
| `entreFolhas` | atraso da segunda cor em relação à primeira (0.16s) |
| `cascata` | intervalo entre um elemento e o próximo (0.07s) |

Pra escolher quais elementos entram em cascata, basta marcar no HTML: `data-entra`
num elemento (ou no pai, que aí entram os filhos), `data-entra-grade` num bloco
inteiro, `data-entra-hero` na área do hero. Nada de listar seletor no JS.

Duas decisões que valem lembrar:

- **Os tempos são absolutos** (`T_FOLHA`, `T_CASCATA`…), não relativos (`'-=0.5'`).
  Posição relativa depende da duração acumulada no momento em que a linha é montada
  — na primeira versão o `-=0.5` caiu em 200ms e a cascata rodou atrás da cortina.
- **A cortina ganha `.is-ativa` quando o JS assume.** Antes ela dependia só de
  `.carregando`; como a classe é removida no meio do deslize (pra deixar os elementos
  aparecerem), a cortina sumia no meio do caminho.

Se o GSAP não carregar, se o navegador pedir `prefers-reduced-motion: reduce`, ou se
o JS estiver desligado, a cortina é removida na hora e o site aparece inteiro, sem
animação. Nunca fica preso atrás dela.

O GSAP é auto-hospedado em `assets/js/gsap.min.js` (3.13.0, 72 KB). Nenhum CDN —
o site continua sem depender de nada externo.

## O que está pendente de confirmação com a loja

- **Endereço.** O site mostra só "Trindade — Florianópolis/SC", de propósito. As
  plataformas divergem entre José Dutra 50, José Dutra 55 e Lauro Linhares 796.
  A rua só entra depois de confirmar — está marcado com comentário no `index.html`
  (procure por `ENDEREÇO PENDENTE`).
- **Preços e cardápio completo.**
- **Textos.** As descrições dos cookies e as frases das seções são rascunho meu,
  escritas a partir do que existe em material público (Instagram e avaliações).
  Vale a loja ler e aprovar antes de publicar.
- **Avaliações.** As três citadas vieram de avaliações públicas. Confirmar se pode
  usar e, idealmente, trocar "Avaliação no Google" pelo primeiro nome de quem escreveu.
- **Logo em vetor.** O PNG de 336px que temos serve bem no header (52-68px de altura)
  e no rodapé (190px). Pra qualquer peça maior, pedir o SVG/AI pra quem desenhou.
- **Horário.** "Terça a domingo, 12:30 às 18:30" veio do cardápio online.

## Publicação (Vercel)

O site mora em `site/`, não na raiz do repositório. Quem resolve isso é o
`vercel.json` da raiz:

```json
{ "framework": null, "outputDirectory": "site", "cleanUrls": true }
```

Com isso o Vercel serve `site/index.html` como página inicial do domínio. Se
por algum motivo o deploy continuar dando 404, dá pra forçar pelo painel:
**Project → Settings → Build & Deployment → Root Directory → `site`** e
redeploy. Uma coisa OU a outra, não as duas (com Root Directory em `site` o
`vercel.json` da raiz deixa de ser lido).

Tem uma cópia do mesmo arquivo em `site/vercel.json`, sem o `outputDirectory`.
Isso cobre os dois jeitos de configurar: se o Root Directory do projeto for a raiz,
vale o da raiz; se for `site`, vale o de dentro. Assim os cabeçalhos se aplicam de
qualquer forma.

O `.vercelignore` deixa de fora `Ref/`, `templates/`, `_memoria/` e companhia —
só a pasta do site sobe. Sem isso cada deploy carregaria os 19 MB da pasta de
referência à toa.

Não tem build: é HTML estático. Cada push no branch dispara um deploy novo.

### Cache — por que está curto de propósito

Os arquivos do site reaproveitam o mesmo nome a cada alteração: `styles.css`,
`cookie-partido.webp` e companhia mudam de conteúdo mas não de endereço. Com cache
longo, quem já visitou continua vendo a versão velha por dias, mesmo depois do
deploy — foi exatamente o que aconteceu na primeira configuração, que tinha 7 dias
para imagens e 1 hora para CSS.

Agora tudo vai com `max-age=0, must-revalidate`: o navegador guarda a cópia, mas
pergunta ao servidor a cada visita e só rebaixa se mudou (responde 304, alguns bytes).
Para um site desse tamanho o custo é irrelevante e nunca mais serve página velha.

A exceção são as fontes, cujos nomes já carregam hash do conteúdo — essas ficam com
cache de um ano.

Quando o site estabilizar, dá pra voltar ao cache longo em imagens, mas aí colocando
hash no nome dos arquivos (`cookie-partido.a1b2c3.webp`), que é o jeito certo de ter
cache eterno sem ficar preso na versão velha.

### `?v=` nos endereços

O cabeçalho novo só vale pra quem ainda não baixou o arquivo. Quem visitou o site na
configuração antiga tem gravado no navegador "essa imagem vale por 7 dias" — e ele
não vai perguntar nada ao servidor até lá. Não dá pra apagar cache de máquina alheia;
o que dá é **mudar o endereço**.

Por isso o `index.html` chama os arquivos assim:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=3">
<img src="assets/img/hero/ninho-partido.webp?v=3" ...>
```

Endereço diferente, entrada nova no cache, download novo — mesmo em navegador
envenenado. **Sempre que trocar CSS, JS ou uma imagem do hero mantendo o mesmo nome
de arquivo, sobe o número do `?v=`** em todas as referências de uma vez:

```bash
cd site && sed -i 's/?v=3/?v=4/g' index.html
```

Isso não vale pras fotos que você joga em `assets/img/` (galeria, Instagram, mapa):
essas entram pela primeira vez, não têm versão velha presa em lugar nenhum.

## Detalhes técnicos

- Sem framework, sem build, sem CDN. Uma requisição de CSS, três de JS (GSAP, comportamento
  e abertura), seis de fonte.
- Acessibilidade: `aria-selected` nas abas, `aria-expanded` no menu, `alt` em todas as
  imagens, foco visível, e `prefers-reduced-motion` desliga todas as animações.
- Responsivo em 1440 / 1024 / 390. Botão fixo `🛒 PEDIR AGORA` no rodapé do mobile.
- As animações de entrada usam `IntersectionObserver` — se o JS falhar, o conteúdo
  aparece normalmente.
