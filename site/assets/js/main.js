/* ============================================================
   Cookies & Co Floripa — comportamento do site
   ------------------------------------------------------------
   PRA CONFIGURAR: só mexer no bloco CONFIG e em CARDAPIO abaixo.
   ============================================================ */

const CONFIG = {
  // URL do sistema de pedidos que já existe (carrinho, checkout, cashback).
  // Enquanto estiver vazio, os botões PEDIR AGORA não levam a lugar nenhum.
  linkPedido: '',

  // WhatsApp da loja, só números, com DDI+DDD.
  whatsapp: '5548988340265',
  whatsappMsg: 'Oi! Vim pelo site 🍪',

  // Link do Google Maps. Preencher só depois de confirmar o endereço com a loja
  // (há divergência entre plataformas — ver _memoria/empresa.md).
  linkMapa: ''
};

/* ------------------------------------------------------------
   CARDÁPIO
   Só entram itens confirmados. Preço null = o item aparece sem preço.
   Preencher com número (ex: preco: 22.9) conforme o sistema de pedidos.
   ------------------------------------------------------------ */
const CARDAPIO = [
  {
    categoria: 'Cookies recheados',
    itens: [
      { nome: 'Pudim', desc: 'Creme branco, bem recheado e doce na medida. O mais elogiado da casa.', preco: null, tag: 'Top' },
      { nome: 'Nutella com Ninho', desc: 'A dupla que não erra. Bem doce, bem recheado.', preco: null },
      { nome: 'Kinder Bueno', desc: 'Chega quentinho — e é isso que faz a diferença.', preco: null },
      { nome: 'Red Velvet', desc: 'O vermelho de assinatura. Também existe em versão fondue.', preco: null },
      { nome: 'Ouro Branco', desc: 'Pra quem gosta do doce mais clássico.', preco: null }
    ]
  },
  {
    categoria: 'Fondue de cookie',
    itens: [
      { nome: 'Fondue de cookie', desc: 'Cookie quentinho, chocolate derretido e recheio no mesmo pote.', preco: null, tag: 'Top' },
      { nome: 'Fondue Red Velvet', desc: 'A versão vermelha do fondue, pra quem quer chamar atenção.', preco: null }
    ]
  },
  {
    categoria: 'Cookie + sorvete',
    itens: [
      { nome: 'Cookie com sorvete', desc: 'Cookie quente, bola de sorvete em cima e calda escorrendo.', preco: null }
    ]
  },
  {
    categoria: 'Cafés',
    itens: [
      { nome: 'Cafés', desc: 'Pra acompanhar o cookie aqui na loja.', preco: null }
    ]
  }
];

/* ============================================================ */

const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

/* --- links configuráveis --- */
function aplicarLinks() {
  const zap = CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMsg)}`
    : '';
  const destinos = { pedido: CONFIG.linkPedido, whatsapp: zap, mapa: CONFIG.linkMapa };

  $$('[data-link]').forEach(a => {
    const url = destinos[a.dataset.link];
    if (!url) {
      a.setAttribute('aria-disabled', 'true');
      a.title = 'Link ainda não configurado (ver CONFIG em assets/js/main.js)';
      a.addEventListener('click', e => e.preventDefault());
      return;
    }
    a.href = url;
    if (a.dataset.link !== 'pedido' || /^https?:/.test(url)) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });
}

/* --- cardápio com abas --- */
function montarCardapio() {
  const tabs = $('.menu__tabs');
  const lista = $('#menu-list');
  if (!tabs || !lista) return;

  const preco = p => (p == null ? '' : `<span class="item__price">R$ ${p.toFixed(2).replace('.', ',')}</span>`);

  const render = i => {
    lista.innerHTML = CARDAPIO[i].itens.map(it => `
      <article class="item">
        <h3 class="item__name">${it.nome}${it.tag ? `<span class="tag">${it.tag}</span>` : ''}</h3>
        ${preco(it.preco)}
        ${it.desc ? `<p class="item__desc">${it.desc}</p>` : ''}
      </article>`).join('');
  };

  CARDAPIO.forEach((cat, i) => {
    const b = document.createElement('button');
    b.className = 'tab';
    b.type = 'button';
    b.role = 'tab';
    b.textContent = cat.categoria;
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.addEventListener('click', () => {
      $$('.tab', tabs).forEach(t => t.setAttribute('aria-selected', 'false'));
      b.setAttribute('aria-selected', 'true');
      render(i);
    });
    tabs.appendChild(b);
  });

  render(0);
}

/* --- placeholder quando a foto ainda não existe --- */
function tratarFotos() {
  $$('.shot img').forEach(img => {
    const marcar = () => img.closest('.shot').classList.add('is-missing');
    if (img.complete && img.naturalWidth === 0) marcar();
    img.addEventListener('error', marcar);
  });
}

/* --- header sticky + menu mobile --- */
function header() {
  const hd = $('#hd');
  const burger = $('.hd__burger');
  const menu = $('#menu-mob');

  const onScroll = () => hd.classList.toggle('is-stuck', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  burger.addEventListener('click', () => {
    const aberto = hd.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(aberto));
    menu.hidden = !aberto;
  });

  $$('a', menu).forEach(a => a.addEventListener('click', () => {
    hd.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }));
}

/* --- entrada das seções no scroll --- */
function revelarNoScroll() {
  const alvos = $$('.sec__hd, .destaque__copy, .destaque__shot, .card4, .aval, .steps li, .fondue__shots, .onde__copy, .onde__map, .galeria__grid, .insta__grid, .menu__tabs');
  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      obs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  alvos.forEach((el, i) => {
    el.classList.add('on-scroll');
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarLinks();
  montarCardapio();
  tratarFotos();
  header();
  revelarNoScroll();
  const ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();
});
