/* ============================================================
   Cookies & Co Floripa — abertura
   ------------------------------------------------------------
   1. Cortina: duas cores deslizam pra cima em sequência e revelam o site.
   2. Cascata: menu, logo, texto do hero e o cookie entram em fila, um
      atrás do outro, com fade + subida.

   GSAP é auto-hospedado em assets/js/gsap.min.js — o site inteiro roda sem
   buscar nada de fora, e a abertura não fica refém de um CDN.

   As marcações do tempo são absolutas de propósito. Posição relativa
   ("-=0.5") depende da duração acumulada no momento em que a linha é
   montada, e é fácil ela cair num lugar que não era o pretendido.
   ============================================================ */

const ABERTURA = {
  umaVezPorSessao: false,  // true = a cortina só aparece na primeira visita da aba
  folha: 0.75,             // quanto cada cor leva pra sair
  entreFolhas: 0.16,       // atraso da segunda cor em relação à primeira
  cascata: 0.07            // intervalo entre um elemento e o próximo
};

(function abertura() {
  const raiz = document.documentElement;
  const cortina = document.getElementById('cortina');
  const solta = () => raiz.classList.remove('carregando');
  // atalho pra quando não vai ter abertura nenhuma: some com a cortina e libera
  const dispensa = () => { if (cortina) cortina.remove(); solta(); };

  // Sem GSAP (download falhou, rede bloqueada) o site aparece inteiro, sem
  // animação. Melhor sem efeito do que preso atrás da cortina.
  if (!window.gsap || !cortina) return dispensa();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return dispensa();
  if (ABERTURA.umaVezPorSessao && sessionStorage.getItem('abertura') === 'vista') return dispensa();

  // a partir daqui a cortina é da animação, não do .carregando
  cortina.classList.add('is-ativa');

  const q = s => [...document.querySelectorAll(s)];
  const emCascata = [
    ...q('[data-entra="menu"] a'),
    ...q('.brand[data-entra]'),
    ...q('.hd__acoes[data-entra] > *'),
    ...q('[data-entra-grade]'),
    ...q('[data-entra-hero] .hero__slide.is-active .hero__copy > *')
  ];
  const palco = q('[data-entra-hero] .hero__slide.is-active .stage');
  const camadas = q('[data-entra-hero] .hero__slide.is-active .stage__layer');

  // marcos, em segundos
  const T_LOGO   = 0.30;
  const T_FOLHA  = 0.60;
  const T_FOLHA2 = T_FOLHA + ABERTURA.entreFolhas;
  const FIM_CORTINA = T_FOLHA2 + ABERTURA.folha;      // 1.51
  const T_CASCATA = FIM_CORTINA - 0.45;               // começa antes da cortina terminar
  const T_SOLTA = T_CASCATA + 0.05;                   // o CSS solta junto com a cascata

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete() {
      cortina.remove();
      sessionStorage.setItem('abertura', 'vista');
      // devolve o controle ao CSS: hover, parallax e flutuação voltam ao normal
      gsap.set(emCascata.concat(palco), { clearProps: 'transform,opacity' });
      gsap.set(camadas, { clearProps: 'opacity' });
      solta();
    }
  });

  tl.to('.cortina__logo', { opacity: 0, y: -18, duration: 0.34, ease: 'power2.in' }, T_LOGO)

    // as duas cores saem pra cima, uma logo atrás da outra
    .to('.cortina__folha--a', { yPercent: -100, duration: ABERTURA.folha, ease: 'power3.inOut' }, T_FOLHA)
    .to('.cortina__folha--b', { yPercent: -100, duration: ABERTURA.folha, ease: 'power3.inOut' }, T_FOLHA2)

    // tira a trava do CSS bem quando os elementos começam a entrar
    .call(solta, null, T_SOLTA)

    // com o site à mostra, os elementos entram em fila
    .fromTo(emCascata,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.55, stagger: ABERTURA.cascata },
      T_CASCATA)

    // o palco do cookie sobe inteiro; as camadas acendem em sequência por cima
    .fromTo(palco, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85 }, T_CASCATA + 0.08)
    .fromTo(camadas, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.06 }, T_CASCATA + 0.16);
})();
