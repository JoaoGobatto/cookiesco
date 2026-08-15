/* ============================================================
   Cookies & Co Floripa — comportamento do site
   ------------------------------------------------------------
   PRA CONFIGURAR: só mexer no bloco CONFIG e em CARDAPIO abaixo.
   ============================================================ */

const CONFIG = {
  // URL do sistema de pedidos que já existe (carrinho, checkout, cashback).
  // Enquanto estiver vazio, os botões PEDIR AGORA não levam a lugar nenhum.
  linkPedido: 'https://cardapio.ai/online/cookiescofloripa',

  // WhatsApp da loja, só números, com DDI+DDD.
  whatsapp: '5548988340265',
  whatsappMsg: 'Oi! Vim pelo site 🍪',

  // Link do Google Maps. Preencher só depois de confirmar o endereço com a loja
  // (há divergência entre plataformas — ver _memoria/empresa.md).
  linkMapa: '',

  // Página de avaliações no Google (o "Ver todas no Google").
  linkGoogle: 'https://share.google/syQp1B6EHSXhLBuX3'
};

/* ------------------------------------------------------------
   AVALIAÇÕES
   Números do topo: pegar no perfil do Google da loja. Deixe null
   pra esconder o bloco de resumo enquanto não tiver o dado certo.
   ------------------------------------------------------------ */
const RESUMO = {
  nota: null,      // ex: 4.9
  total: null      // ex: 148
};

/* Avaliações reais do perfil do Google, transcritas dos prints da loja.
   Nada de texto inventado aqui — se não saiu da boca de um cliente, não entra.
   guia: true marca quem é Local Guide, que é sinal de credibilidade. */
const AVALIACOES = [
  {
    nome: 'Maria Noêmia',
    quando: '4 semanas atrás',
    guia: true,
    nota: 5,
    texto: 'Eles têm os melhores cookies de Floripa, vale a pena cada centavo!! Recheios e massas sempre perfeitos, sempre chega quentinhooo, eu amo!'
  },
  {
    nome: 'Tainara Talita',
    quando: '3 anos atrás',
    guia: true,
    nota: 5,
    texto: 'Os melhores Cookies que eu já comi na vida!! São perfeitos e viciantes <3\nFora o atendimento que é excepcional.'
  },
  {
    nome: 'Gabriela Westphal',
    quando: 'um ano atrás',
    guia: true,
    nota: 5,
    texto: 'Atendimento maravilhoso, com as melhores indicações.\n\n'
         + 'Pudim: super doce, bem recheado, sou suspeita porque AMO creme branco, nota 9/10\n\n'
         + 'Nutella com ninho: doce, super gostoso, nota 8/10\n\n'
         + 'Kinder bueno: menos doce, estava bem quentinho e aumentou o sabor dele, ele derretendo na boca fica ótimo! Nota 7,5/10\n\n'
         + 'Ouro branco não achamos nada demais, nota 6/10\n\n'
         + 'R$20 reais/cookie em média'
  },
  {
    nome: 'Andressa Tatiana',
    quando: '8 meses atrás',
    guia: true,
    nota: 5,
    texto: 'Surreal, vale cada centavo! 😍🤩\n\nHoje pedi delivery, mas conheci o local através do Floripa em Dobro.'
  }

  // Avaliação da Lara Dalla Nora (5 estrelas, 2 anos atrás) fica de fora por ora:
  // é elogiosa, mas fala da sacola surpresa do Food To Save e começa com "mesmo não
  // sendo frescos". Numa página que vende cookie quentinho, isso trabalha contra.
  // Pra usar, é só descomentar:
  // {
  //   nome: 'Lara Dalla Nora', quando: '2 anos atrás', guia: true, nota: 5,
  //   texto: 'Comprei a sacola surpresa do food to save, e mesmo não sendo frescos eles '
  //        + 'estavam deliciosos! Foi uma experiência muito boa conhecer os cookies, o de '
  //        + 'limão me surpreendeu, seria um que eu não pediria normalmente, mas achei '
  //        + 'incrível! Parabéns e, parabéns também por participarem do food to save!'
  // }
];

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
  const destinos = { pedido: CONFIG.linkPedido, whatsapp: zap, mapa: CONFIG.linkMapa, google: CONFIG.linkGoogle };

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

/* --- avaliações: resumo + carrossel --- */
function montarAvaliacoes() {
  const trilho = $('#avals-trilho');
  if (!trilho) return;
  const sec = trilho.closest('.avals');

  const escapa = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const estrelas = n => {
    let h = '';
    for (let i = 1; i <= 5; i++) h += `<i class="${n >= i ? 'cheia' : n >= i - .5 ? 'meia' : ''}"></i>`;
    return h;
  };

  const palavra = n => (n >= 4.8 ? 'Excelente' : n >= 4 ? 'Muito bom' : n >= 3 ? 'Bom' : '');

  // ----- resumo: placar do Google, ou título de seção enquanto não houver nota -----
  const temNota = RESUMO.nota != null && RESUMO.total != null;
  $('[data-titulo]', sec).hidden = temNota;
  $('[data-placar]', sec).hidden = !temNota;
  if (temNota) {
    $('[data-selo]', sec).textContent = palavra(RESUMO.nota);
    $('[data-nota]', sec).textContent = RESUMO.nota.toFixed(1).replace('.', ',');
    $('[data-estrelas]', sec).innerHTML = estrelas(RESUMO.nota);
    $('[data-total]', sec).textContent = RESUMO.total.toLocaleString('pt-BR');
  }

  // ----- cards -----
  const cores = ['#8B5E4B', '#A8B89D', '#E8946F', '#5E3B2C', '#C98B6B'];
  const inicial = nome => (nome ? nome.trim()[0].toUpperCase() : '★');

  trilho.innerHTML = AVALIACOES.map((a, i) => `
    <article class="aval" role="listitem">
      <div class="aval__topo">
        <span class="aval__avatar" style="background:${cores[i % cores.length]}" aria-hidden="true">${inicial(a.nome)}</span>
        <span class="aval__quem">
          <span class="aval__nome">${a.nome ? escapa(a.nome) : 'Cliente no Google'}</span>
          <span class="aval__quando">${a.guia ? '<b>Local Guide</b> · ' : ''}${a.quando ? escapa(a.quando) : ''}</span>
        </span>
        <svg class="aval__g" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.8 2.6 13.6l7.8 6.1C12.3 13.9 17.6 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.4z"/>
          <path fill="#FBBC05" d="M10.4 28.3c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.8-6.1C.9 15.9 0 19.8 0 23.5s.9 7.6 2.6 10.9l7.8-6.1z"/>
          <path fill="#34A853" d="M24 47.5c6.2 0 11.5-2.1 15.3-5.6l-7.6-5.9c-2.1 1.4-4.8 2.3-7.7 2.3-6.4 0-11.7-4.4-13.6-10.2l-7.8 6.1C6.5 42.2 14.6 47.5 24 47.5z"/>
        </svg>
      </div>
      <div class="aval__linha">
        <span class="estrelas" aria-label="${a.nota} de 5 estrelas">${estrelas(a.nota)}</span>
        <svg class="aval__ok" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l2.4 1.8 3-.3 1 2.8 2.6 1.5-1 2.9 1 2.9-2.6 1.5-1 2.8-3-.3L12 22l-2.4-1.8-3 .3-1-2.8L3 16.2l1-2.9-1-2.9 2.6-1.5 1-2.8 3 .3L12 2zm-1.2 13.5l5.3-5.3-1.4-1.4-3.9 3.9-1.8-1.8L7.6 12l3.2 3.5z"/>
        </svg>
      </div>
      <p class="aval__txt">${escapa(a.texto).replace(/\n/g, '<br>')}</p>
    </article>`).join('');

  // "ler mais" só onde o texto realmente foi cortado
  $$('.aval', trilho).forEach(card => {
    const txt = $('.aval__txt', card);
    if (txt.scrollHeight - txt.clientHeight < 4) return;
    const b = document.createElement('button');
    b.className = 'aval__mais';
    b.type = 'button';
    b.textContent = 'Ler mais';
    b.addEventListener('click', () => {
      const aberta = card.classList.toggle('is-aberta');
      b.textContent = aberta ? 'Ler menos' : 'Ler mais';
    });
    card.appendChild(b);
  });

  // ----- setas -----
  const setas = $$('.avals__seta', sec);
  const passo = () => {
    const card = $('.aval', trilho);
    return card ? card.getBoundingClientRect().width + 18 : 300;
  };
  setas.forEach(b => b.addEventListener('click', () => {
    trilho.scrollBy({ left: passo() * Number(b.dataset.avals), behavior: 'smooth' });
  }));

  const atualizarSetas = () => {
    const fim = trilho.scrollWidth - trilho.clientWidth;
    setas[0].disabled = trilho.scrollLeft < 8;
    setas[1].disabled = trilho.scrollLeft > fim - 8;
  };
  trilho.addEventListener('scroll', atualizarSetas, { passive: true });
  window.addEventListener('resize', atualizarSetas);
  atualizarSetas();
}

/* --- placeholder quando a foto ainda não existe --- */
function tratarFotos() {
  $$('.shot img, .stage__layer img').forEach(img => {
    const alvo = img.closest('.shot, .stage__layer');
    const marcar = () => alvo.classList.add('is-missing');
    if (img.complete && img.naturalWidth === 0) marcar();
    img.addEventListener('error', marcar);
  });
}

/* --- se o palco já tem alguma imagem real, esconde os fantasmas das que faltam --- */
function limparFantasmas() {
  $$('.stage').forEach(stage => {
    const camadas = $$('.stage__layer', stage);
    const temReal = camadas.some(l => !l.classList.contains('is-missing'));
    if (temReal) camadas.filter(l => l.classList.contains('is-missing')).forEach(l => l.remove());
  });
}

/* --- hero: slider + cookie que reage ao mouse --- */
function heroSlider() {
  const hero = $('#hero');
  if (!hero) return;

  const slides = $$('.hero__slide', hero);
  let atual = 0;
  let timer;

  // cada slide traz o próprio tema de cor; o fundo da seção acompanha o cookie
  const pintar = slide => {
    const t = slide.dataset;
    if (t.bg) hero.style.setProperty('--tema-bg', t.bg);
    if (t.blob) hero.style.setProperty('--tema-blob', t.blob);
    if (t.blob2) hero.style.setProperty('--tema-blob2', t.blob2);
  };

  const ir = n => {
    atual = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      const ativo = i === atual;
      s.classList.toggle('is-active', ativo);
      s.setAttribute('aria-hidden', String(!ativo));
    });
    pintar(slides[atual]);
  };

  pintar(slides[0]);

  const rodar = () => {
    clearInterval(timer);
    if (slides.length > 1) timer = setInterval(() => ir(atual + 1), 7000);
  };

  if (slides.length < 2) $('.hero__arrows', hero)?.remove();

  $$('.hero__arrow', hero).forEach(b => b.addEventListener('click', () => {
    ir(atual + Number(b.dataset.slide));
    rodar();
  }));

  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', rodar);
  hero.addEventListener('focusin', () => clearInterval(timer));
  rodar();

  // parallax: cada camada do cookie acompanha o mouse num ritmo diferente
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width - .5) * 26;
    const py = ((e.clientY - r.top) / r.height - .5) * 20;
    $$('.hero__slide.is-active .stage__layer', hero).forEach(l => {
      l.style.setProperty('--px', `${px}px`);
      l.style.setProperty('--py', `${py}px`);
    });
  });

  hero.addEventListener('pointerleave', () => {
    $$('.stage__layer', hero).forEach(l => {
      l.style.removeProperty('--px');
      l.style.removeProperty('--py');
    });
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
  montarAvaliacoes();
  tratarFotos();
  header();
  heroSlider();
  revelarNoScroll();
  const ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();
});

// os erros de imagem só chegam depois do load
window.addEventListener('load', limparFantasmas);
