// Efeitos interativos românticos

let efeitosIniciados = false;

document.addEventListener('DOMContentLoaded', function() {
  // Lógica da tela inicial
  const telaInicial = document.getElementById('tela-inicial');
  const conteudoRomantico = document.getElementById('conteudo-romantico');
  const btnSurpresa = document.getElementById('btn-surpresa');

  btnSurpresa.addEventListener('click', function() {
    if (efeitosIniciados) return;
    efeitosIniciados = true;
    btnSurpresa.disabled = true;
    btnSurpresa.textContent = 'Carregando...';
    telaInicial.classList.add('fade-out');
    setTimeout(function() {
      telaInicial.style.display = 'none';
      conteudoRomantico.style.display = '';
      iniciarEfeitosRomanticos();
    }, 800); // tempo igual ao da animação
  });
});

function iniciarEfeitosRomanticos() {
  // 1. Animação de corações subindo ao clicar na caixa
  const box = document.querySelector('#conteudo-romantico .box');
  box.addEventListener('click', function(e) {
    for (let i = 0; i < 5; i++) {
      criarCoracao(e.clientX, e.clientY);
    }
  });

  // 2. Mensagem surpresa ao passar o mouse no título
  const h1 = box.querySelector('h1');
  let mensagemVisivel = false;

  function acionarMensagemTitulo() {
    if (mensagemVisivel) return;
    mensagemVisivel = true;
    mostrarMensagem('Você iluminou minha vida!');
    setTimeout(() => {
      removerMensagem();
      mensagemVisivel = false;
    }, 2200);
  }

  h1.addEventListener('click', acionarMensagemTitulo);
  h1.addEventListener('mouseenter', () => mostrarMensagem('Você iluminou minha vida!'));
  h1.addEventListener('mouseleave', removerMensagem);

  // 3. Botão de surpresa com mensagem aleatória
  const mensagens = [
    'Você é meu sonho realizado!',
    'Cada dia ao seu lado é especial.',
    'Te amo mais do que ontem e menos do que amanhã.',
    'Seu sorriso ilumina tudo!',
    'Com você, tudo faz sentido.'
  ];

  function mostrarSurpresa() {
    const idx = Math.floor(Math.random() * mensagens.length);
    const msg = mensagens[idx];
    mostrarMensagem(msg);
    setTimeout(removerMensagem, 2200);
  }

  // Remover botão antigo se já existir
  const btnExistente = box.querySelector('button.surpresa');
  if (btnExistente) btnExistente.remove();

  // Cria botão surpresa
  const btn = document.createElement('button');
  btn.textContent = 'Clique para uma surpresa';
  btn.className = 'surpresa';
  btn.style.marginTop = '24px';
  btn.style.background = '#ffb6c1';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '18px';
  btn.style.padding = '10px 22px';
  btn.style.fontFamily = 'Dancing Script, cursive, sans-serif';
  btn.style.fontSize = '1.1rem';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 2px 8px #ffd6f5';
  btn.addEventListener('click', mostrarSurpresa);
  box.appendChild(btn);

  // 4. Efeito de brilho suave ao passar o mouse ou tocar nos parágrafos
  const paragrafos = box.querySelectorAll('p');
  paragrafos.forEach(p => {
    // Para Desktop
    p.addEventListener('mouseenter', () => p.classList.add('glow-effect'));
    p.addEventListener('mouseleave', () => p.classList.remove('glow-effect'));

    // Para Celular (toque)
    p.addEventListener('click', function() {
      // Remove o brilho de todos os outros
      paragrafos.forEach(outroP => {
        if (outroP !== p) outroP.classList.remove('glow-effect');
      });
      // Adiciona ou remove o brilho do parágrafo clicado
      p.classList.toggle('glow-effect');
    });
  });

  // 5. Música romântica com botão play/pause
  const audio = document.createElement('audio');
  audio.src = 'https://cdn.pixabay.com/audio/2023/02/14/audio_12c6b6b6b6.mp3'; // Música livre de direitos
  //audio.loop = true;
  audio.volume = 0.4;

  const btnMusica = document.createElement('button');
  btnMusica.textContent = '🎵 Música';
  btnMusica.style.position = 'absolute';
  btnMusica.style.bottom = '18px';
  btnMusica.style.right = '18px';
  btnMusica.style.background = '#fff0f6';
  btnMusica.style.color = '#d72660';
  btnMusica.style.border = 'none';
  btnMusica.style.borderRadius = '50%';
  btnMusica.style.width = '44px';
  btnMusica.style.height = '44px';
  btnMusica.style.fontSize = '1.3rem';
  btnMusica.style.cursor = 'pointer';
  btnMusica.style.boxShadow = '0 2px 8px #ffd6f5';
  btnMusica.style.zIndex = '20';

  let tocando = false;
  btnMusica.addEventListener('click', function() {
    if (!tocando) {
      audio.load();
      audio.play().then(() => {
        btnMusica.style.background = '#ffb6c1';
        btnMusica.style.color = '#fff';
        tocando = true;
      }).catch((e) => {
        alert('O navegador bloqueou a reprodução automática. Tente clicar novamente ou interagir com a página.');
      });
    } else {
      audio.pause();
      btnMusica.style.background = '#fff0f6';
      btnMusica.style.color = '#d72660';
      tocando = false;
    }
  });
  box.appendChild(btnMusica);
  document.body.appendChild(audio);
}

function criarCoracao(x, y) {
  const coracao = document.createElement('div');
  coracao.textContent = '💖';
  coracao.style.position = 'fixed';
  coracao.style.left = (x - 10 + Math.random() * 40 - 20) + 'px';
  coracao.style.top = (y - 10 + Math.random() * 20 - 10) + 'px';
  coracao.style.fontSize = (24 + Math.random() * 16) + 'px';
  coracao.style.opacity = '1';
  coracao.style.transition = 'all 1.2s ease';
  coracao.style.pointerEvents = 'none';
  document.body.appendChild(coracao);
  setTimeout(() => {
    coracao.style.top = (y - 120 - Math.random() * 40) + 'px';
    coracao.style.opacity = '0';
  }, 10);
  setTimeout(() => {
    coracao.remove();
  }, 1300);
}

function mostrarMensagem(texto) {
  let msg = document.createElement('div');
  msg.id = 'msg-romantica';
  msg.textContent = texto;
  msg.style.position = 'absolute';
  msg.style.top = '-40px';
  msg.style.left = '50%';
  msg.style.transform = 'translateX(-50%)';
  msg.style.background = '#fff0f6';
  msg.style.color = '#d72660';
  msg.style.padding = '8px 18px';
  msg.style.borderRadius = '16px';
  msg.style.boxShadow = '0 2px 8px #ffd6f5';
  msg.style.fontFamily = 'Dancing Script, cursive, sans-serif';
  msg.style.fontSize = '1.1rem';
  msg.style.zIndex = '10';
  document.querySelector('#conteudo-romantico .box').appendChild(msg);
}

function removerMensagem() {
  let msg = document.getElementById('msg-romantica');
  if (msg) msg.remove();
} 