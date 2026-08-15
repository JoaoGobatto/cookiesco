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
│   └── img/                ← as fotos entram aqui (ainda vazia)
├── briefing-site.md        ← a direção acordada
└── README.md
```

## De onde vem cada decisão

A **estrutura** segue o site de referência da Grill Burger, seção por seção:

| Grill Burger | Aqui |
|---|---|
| topbar com contato | topbar com horário, bairro e WhatsApp |
| header com logo central + CTA vermelho | header com logo central + `PEDIR AGORA 🍪` |
| hero com foto do burger | hero com foto do cookie + selo giratório |
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
entra sozinho — não precisa mexer no HTML.

| Arquivo | O que é |
|---|---|
| `hero-cookie.jpg` | cookie partido ao meio, recheio escorrendo (a foto mais importante do site) |
| `cookie-pudim.jpg` | o cookie de pudim inteiro |
| `cookie-aberto.jpg` | cookie aberto mostrando o recheio |
| `fondue.jpg` | fondue de cookie |
| `cookie-sorvete.jpg` | cookie quente com bola de sorvete |
| `galeria-1.jpg` … `galeria-5.jpg` | galeria |
| `insta-1.jpg` … `insta-6.jpg` | grid do Instagram (quadradas) |
| `mapa.jpg` | print do mapa (ou trocar por um `<iframe>` do Google Maps) |

Formato: JPG ou WebP, largura de uns 1200px nas grandes e 800px nas quadradas.

**3. O cardápio.** Também em `assets/js/main.js`, na lista `CARDAPIO`. Cada item:

```js
{ nome: 'Pudim', desc: 'Creme branco...', preco: 22.90, tag: 'Top' }
```

`preco: null` faz o item aparecer sem preço — é como está agora, porque os valores
ainda não foram confirmados. `tag` é opcional (o selinho verde).

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
- **Logo.** Hoje o header usa a marca em texto (Baloo 2). Quando o arquivo estiver em
  `identidade/logo.svg`, dá pra trocar em 2 linhas.
- **Horário.** "Terça a domingo, 12:30 às 18:30" veio do cardápio online.

## Detalhes técnicos

- Sem framework, sem build, sem CDN. Uma requisição de CSS, uma de JS, seis de fonte.
- Acessibilidade: `aria-selected` nas abas, `aria-expanded` no menu, `alt` em todas as
  imagens, foco visível, e `prefers-reduced-motion` desliga todas as animações.
- Responsivo em 1440 / 1024 / 390. Botão fixo `🛒 PEDIR AGORA` no rodapé do mobile.
- As animações de entrada usam `IntersectionObserver` — se o JS falhar, o conteúdo
  aparece normalmente.
