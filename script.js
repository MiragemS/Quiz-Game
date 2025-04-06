const direcoes = [
  {
    direcao: "Para frente!",
    lados: [
      { opcao: "Frente", correto: true },
      { opcao: "Direita", correto: false },
      { opcao: "Esquerda", correto: false },
      { opcao: "Trás", correto: false }
    ]
  },
  {
    direcao: "Para direita!",
    lados: [
      { opcao: "Frente", correto: false },
      { opcao: "Direita", correto: true },
      { opcao: "Esquerda", correto: false },
      { opcao: "Trás", correto: false }
    ]
  },
  {
    direcao: "Para esquerda!",
    lados: [
      { opcao: "Frente", correto: false },
      { opcao: "Direita", correto: false },
      { opcao: "Esquerda", correto: true },
      { opcao: "Trás", correto: false }
    ]
  },
  {
    direcao: "Para trás!",
    lados: [
      { opcao: "Frente", correto: false },
      { opcao: "Direita", correto: false },
      { opcao: "Esquerda", correto: false },
      { opcao: "Trás", correto: true }
    ]
  },

  // Negar uma vez

  {
    direcao: "Não para frente!",
    lados: [
      { opcao: "Frente", correto: false },
      { opcao: "Direita", correto: true },
      { opcao: "Esquerda", correto: true },
      { opcao: "Trás", correto: true }
    ]
  },
  {
    direcao: "Não para direita!",
    lados: [
      { opcao: "Frente", correto: true },
      { opcao: "Direita", correto: false },
      { opcao: "Esquerda", correto: true },
      { opcao: "Trás", correto: true }
    ]
  },
  {
    direcao: "Não para esquerda!",
    lados: [
      { opcao: "Frente", correto: true },
      { opcao: "Direita", correto: true },
      { opcao: "Esquerda", correto: false },
      { opcao: "Trás", correto: true }
    ]
  },
  {
    direcao: "Não para trás!",
    lados: [
      { opcao: "Frente", correto: true },
      { opcao: "Direita", correto: true },
      { opcao: "Esquerda", correto: true },
      { opcao: "Trás", correto: false }
    ]
  },

  // Dupla negação, logo, sim >:)

  {
    direcao: "Não não para frente!",
    lados: [
      { opcao: "Frente", correto: true },
      { opcao: "Direita", correto: false },
      { opcao: "Esquerda", correto: false },
      { opcao: "Trás", correto: false }
    ]
  },
  {
    direcao: "Não não para direita!",
    lados: [
      { opcao: "Frente", correto: false },
      { opcao: "Direita", correto: true },
      { opcao: "Esquerda", correto: false },
      { opcao: "Trás", correto: false }
    ]
  },
  {
    direcao: "Não não para esquerda!",
    lados: [
      { opcao: "Frente", correto: false },
      { opcao: "Direita", correto: false },
      { opcao: "Esquerda", correto: true },
      { opcao: "Trás", correto: false }
    ]
  },
  {
    direcao: "Não não para trás!",
    lados: [
      { opcao: "Frente", correto: false },
      { opcao: "Direita", correto: false },
      { opcao: "Esquerda", correto: false },
      { opcao: "Trás", correto: true }
    ]
  }
];

// perguntas -> direcoes
// pergunta -> direcao
// respostas -> lados
// opcao -> opcao

const perguntaElemento = document.querySelector(".pergunta");
const respostasElemento = document.querySelector(".respostas");
const progressoElemento = document.querySelector(".progresso");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");
const botaoIniciar = document.getElementById("btnIniciar");
const menu = document.querySelector(".menu");

// PARTE 3: Variáveis para controle do jogo
let acertos = 0; // Contador de acertos
let indiceAtual = direcaoAleatoria(acertos); // Índice da pergunta atual
let tempoLimite = 1.6;
let timer;

function direcaoAleatoria(acertos){
  if(acertos < 5) return Math.floor(Math.random()*4);
  else if(acertos < 10) return Math.floor(Math.random()*8);
  else return Math.floor(Math.random()*12);  
}



botaoIniciar.onclick = () => {
  menu.style.display = "none";    
  conteudo.style.display = "block"; 
  carregarPergunta();               
  iniciarTimer();                   
};

// PARTE 4: Função para carregar uma nova pergunta
function carregarPergunta() {
  progressoElemento.innerHTML = `Score: ${acertos}`; // Atualiza o progresso
  const perguntaAtual = direcoes[indiceAtual]; // Pega a pergunta atual
  perguntaElemento.innerHTML = perguntaAtual.direcao; // Exibe a pergunta

  respostasElemento.innerHTML = ""; // Limpa as respostas anteriores

  // Percorre todas as respostas da pergunta atual
  for (let i = 0; i < perguntaAtual.lados.length; i++) {
    // Pega a resposta atual com base no índice 'i'
    const resposta = perguntaAtual.lados[i];
    // Cria um novo elemento 'button' (botão)
    const botao = document.createElement("button");
    // Adiciona a classe CSS 'botao-resposta' ao botão para estilizar
    botao.classList.add("botao-resposta");
    // Define o texto do botão com a opção de resposta (resposta.opcao)
    botao.innerText = resposta.opcao;
    // Adiciona um evento de clique no botão
    botao.onclick = function () {
      // Se a resposta for correta (resposta.correto === true), incrementa o número de acertos
      if (resposta.correto) {
        acertos++; // Incrementa o contador de acertos
        carregarPergunta();
        iniciarTimer();
      } else {
        finalizarJogo();
      }

      // Avança para a próxima pergunta
      indiceAtual = direcaoAleatoria(acertos);
    };

    // Adiciona o botão de resposta à tela, dentro do elemento 'respostasElemento'
    respostasElemento.appendChild(botao);
  }

  //  iniciarTimer();
}

// PARTE 5: Função para mostrar a tela final
function finalizarJogo() {
  textoFinal.innerHTML = `Você fugiu por ${acertos} corredores`; // Exibe o resultado
  conteudo.style.display = "none"; // Esconde as perguntas
  conteudoFinal.style.display = "flex"; // Mostra a tela final
}

function iniciarTimer() {
  const barra = document.querySelector(".progresso-tempo");
  const duracao = tempoLimite * 1000; // duração total em ms
  const inicio = Date.now();

  clearInterval(timer); // cancela anterior

  timer = setInterval(() => {
    const agora = Date.now();
    const decorrido = agora - inicio;
    const restante = Math.max(0, duracao - decorrido);
    const porcentagem = (restante / duracao) * 100;
    const segundos = (restante / 1000).toFixed(1); // 1 casa decimal

    // Atualiza texto e barra
    progressoElemento.innerHTML = `Score: ${acertos} | Tempo: ${segundos}s`;
    barra.style.width = `${porcentagem}%`;

    if (restante <= 0) {
      clearInterval(timer);
      finalizarJogo();
    }
  }, 100);
}

function reiniciar() {
  acertos = 0;
  indiceAtual = direcaoAleatoria(acertos);
  document.querySelector(".progresso-tempo").style.width = "100%";
  conteudo.style.display = "block";      
  conteudoFinal.style.display = "none";  
  iniciarTimer();                        
  carregarPergunta();                    
}

