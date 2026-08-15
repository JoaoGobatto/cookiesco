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

## De onde vem cada decisão

A **estrutura** segue o site de referência da Grill Burger, seção por seção:

| Grill Burger | Aqui |
|---|---|
| topbar com contato | topbar com horário, bairro e WhatsApp |
| header com logo central + CTA vermelho | header com logo central + `PEDIR AGORA 🍪` |
| hero: slider, produto explodido, setas, borda recortada | mesma composição, com o cookie em camadas |
| "Tá na dúvida? Pede logo o BLACK!!!" | "Tá na dúvida? Pede logo o de Pudim." |
| ingredientes ao redor do burger | anatomia ao redor do cookie |
| menu com abas e preços | cardápio com abas por categoria |
| delivery com desconto | delivery com os 6% de cashback |
| "Estamos no Ifood" | "Quente ou gelado? Os dois." (fondue e sorvete) |
| depoimentos em banda escura | avaliações em banda marrom |
| galeria "Fotos reais" | galeria "Fotos reais" |
| blog | "Feito pra ser recheado" (4 motivos) |
| feed do Instagram | feed do Instagram |
| footer com unidade e horário | footer com bairro, horário e assinatura |

A **pele** é toda da Cookies & Co, de `identidade/design-guide.md`: peach `#F6B093`,
creme `#FFF3E9`, marrom `#8B5E4B`, Baloo 2 nos títulos, DM Sans no corpo, Caveat nos
detalhes manuscritos. Nada de preto predominante nem dourado.

## Pra colocar no ar — 3 coisas

**1. O link do sistema de pedidos.** Em `assets/js/main.js`, no topo:

```js
const CONFIG = {
  linkPedido: '',   // ← cola aqui a URL do cardápio online
  whatsapp: '5548988340265',
  linkMapa: ''      // ← só depois de confirmar o endereço
};
```

Enquanto `linkPedido` estiver vazio, todos os botões `PEDIR AGORA` ficam inertes
(não levam a lugar nenhum e não quebram). Assim que preencher, os 7 botões da
página passam a apontar pro sistema de uma vez.

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
| chocolate | `#2F1C16` | `#3A231A` | `#52301F` / `#6B3F27` |
| red velvet | `#6A0E15` | `#4A121C` | `#661923` / `#86222E` |

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
| `cookie-partido.webp` / `rv-partido.webp` | cookie partido, recheio escorrendo | protagonista, cresce no hover |
| `cookie-inteiro.webp` / `rv-inteiro.webp` | cookie inteiro | fica atrás, recua e inclina no hover |
| `chip-*.webp` / `rv-chip-*.webp` | gotas de chocolate soltas | flutuam e se espalham no hover |

**Como reposicionar sem mexer em CSS.** Cada camada carrega a própria posição no
`style`, em porcentagem do palco:

```html
<div class="stage__layer camada--partido" style="--l:24%;--t:-4%;--w:76%;--f:1.15">
```

- `--l` esquerda · `--t` topo · `--w` largura
- `--f` é a profundidade: quanto maior, mais a camada corre com o mouse.
  Cookie de trás `.45`, o da frente `1.15`, as gotas `2.2` a `3.1`.

### Como os recortes foram feitos

As fotos vêm com fundo terracota e uma bancada escura embaixo. O recorte sai por
detecção de borda — o fundo é um degradê liso e o cookie tem contorno duro — e
depois três limpezas:

1. **A borda da bancada** entra como um risco fino e comprido colado no cookie.
   Sai por uma regra geométrica: apagar o que é fino na vertical e longo na
   horizontal. Os fios de doce também são finos, mas verticais, então ficam.
2. **O pé do cookie** mergulha na sombra da bancada e o contorno se perde. A máscara
   cresce ali pra dentro do escuro, limitada à faixa horizontal que o cookie já ocupa.
3. **Bolsões de fundo presos entre os fios** — invisíveis quando o fundo era peach,
   evidentes agora que é escuro. Saem por crescimento a partir de sementes que batem
   com o fundo estimado localmente, limitado pelas mesmas bordas do recorte, o que
   impede de vazar pra dentro da massa.
4. **O recheio do red velvet** precisou de tratamento próprio: naquela foto o creme e
   o fundo terracota têm quase a mesma cor (215,160,129 contra 223,147,121), então a
   detecção de borda não enxerga a divisa e o preenchimento entra no recheio, deixando
   só um contorno fino. O que separa os dois ali é o brilho — o creme é ~30 mais claro
   que o fundo, e a massa ~25 mais escura. Então: estima o fundo por interpolação,
   devolve pro recorte o que estiver acima de `fundo + 18` dentro do vão entre as
   metades, e abre como transparente o que ficar colado no brilho do fundo (os furos
   de verdade do recheio, aqueles que na foto deixam ver o fundo através).

Cor sozinha não resolve: no red velvet o fundo terracota e a massa média têm quase
a mesma razão verde/vermelho, e o creme e o fundo têm quase o mesmo RGB.

Pra refazer à mão com outra foto, o caminho mais simples é o Gemini, uma por vez:

> Remova o fundo desta foto e devolva um PNG com fundo transparente. Preserve as
> bordas do cookie e os fios de recheio, sem halo branco em volta. Não altere cor,
> textura nem enquadramento.

**Especificação:** fundo transparente, lado maior de 1500px, **sem sombra embutida**
(o CSS aplica a sombra). WebP fica ~8x menor que PNG com a mesma qualidade.

**Sobre vídeo (Flow):** não vale pro hero. Vídeo com fundo transparente depende de
WebM/alpha, que o Safari não toca — o cookie apareceria numa caixa preta no iPhone.
O Flow rende melhor num loop na seção do fondue ou direto no Instagram, em MP4.

### Pra somar um slide novo

1. Manda a foto do cookie (mesmo enquadramento das outras: fundo liso, cookie inteiro
   à esquerda e partido à direita).
2. Duplica um `<article class="hero__slide">` no `index.html`, troca texto, imagens
   e as três cores do tema.
3. Só isso — o slider conta os slides sozinho e some com as setas se sobrar um só.

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

O `.vercelignore` deixa de fora `Ref/`, `templates/`, `_memoria/` e companhia —
só a pasta do site sobe. Sem isso cada deploy carregaria os 19 MB da pasta de
referência à toa.

Não tem build: é HTML estático. Cada push no branch dispara um deploy novo.

## Detalhes técnicos

- Sem framework, sem build, sem CDN. Uma requisição de CSS, uma de JS, seis de fonte.
- Acessibilidade: `aria-selected` nas abas, `aria-expanded` no menu, `alt` em todas as
  imagens, foco visível, e `prefers-reduced-motion` desliga todas as animações.
- Responsivo em 1440 / 1024 / 390. Botão fixo `🛒 PEDIR AGORA` no rodapé do mobile.
- As animações de entrada usam `IntersectionObserver` — se o JS falhar, o conteúdo
  aparece normalmente.
