// Array para armazenar todas as formas geométricas
let shapes = [];

// Paleta de cores inspirada na obra original
const colors = {
  background: '#F0EAD6',
  red: '#C7372F',
  grey: '#B2B2B2',
  black: '#1A1A1A',
  darkRed: '#A12D26' // Cor para o círculo dividido
};

// Fator de redução de tamanho ao passar o mouse
const hoverFactor = 0.9;

/**
 * Função de configuração inicial do p5.js.
 * Executada uma única vez no início.
 */
function setup() {
  createCanvas(400, 400); // Define o tamanho da tela
  noStroke(); // Remove as bordas de todas as formas

  // --- Definição e posicionamento das formas ---
  // A estrutura de dados de cada forma é: { x, y, raio, cor1, [cor2], tipo }

  // 1ª Fila (superior)
  shapes.push({ x: 80,  y: 80, r: 60, c1: colors.red, type: 'circle' });
  shapes.push({ x: 210, y: 80, r: 60, c1: colors.red, type: 'circle' });
  shapes.push({ x: 300, y: 80, r: 60, c1: colors.grey, type: 'semi-right' });

  // 2ª Fila (meio)
  const y2 = 200;
  const r2 = 40;
  shapes.push({ x: 35,  y: y2, r: r2, c1: colors.grey, type: 'semi-right' });
  shapes.push({ x: 120, y: y2, r: r2, c1: colors.grey, type: 'circle' });
  shapes.push({ x: 180, y: y2, r: r2, c1: colors.grey, type: 'semi-right' });
  shapes.push({ x: 265, y: y2, r: r2, c1: colors.grey, type: 'circle' });
  shapes.push({ x: 350, y: y2, r: r2, c1: colors.darkRed, c2: colors.red, type: 'split-v' });

  // 3ª Fila (inferior)
  const y3 = 330;
  const r3 = 25;
  const x_coords3 = [45, 105, 165, 230, 300, 365];
  shapes.push({ x: x_coords3[0], y: y3, r: r3, c1: colors.red, type: 'circle' });
  shapes.push({ x: x_coords3[1], y: y3, r: r3, c1: colors.red, type: 'circle' });
  shapes.push({ x: x_coords3[2], y: y3, r: r3, c1: colors.black, type: 'circle' });
  shapes.push({ x: x_coords3[3], y: y3, r: r3, c1: colors.black, type: 'circle' });
  shapes.push({ x: x_coords3[4], y: y3, r: r3, c1: colors.black, type: 'circle' });
  shapes.push({ x: x_coords3[5], y: y3, r: r3, c1: colors.black, type: 'semi-left'});
}

/**
 * Função de desenho do p5.js.
 * É executada continuamente em loop para criar a animação.
 */
function draw() {
  background(colors.background); // Pinta o fundo a cada quadro

  // Itera sobre todas as formas para desenhá-las
  for (const shape of shapes) {
    let currentRadius = shape.r;
    
    // Calcula a distância entre o mouse e o centro da forma
    const distance = dist(mouseX, mouseY, shape.x, shape.y);

    // Se o mouse estiver sobre a forma, reduz seu raio
    if (distance < shape.r) {
      currentRadius = shape.r * hoverFactor;
    }

    // Desenha a forma com o raio (normal ou reduzido)
    drawShape(shape, currentRadius);
  }
}

/**
 * Função auxiliar para desenhar uma forma específica.
 * @param {object} shape - O objeto da forma a ser desenhada.
 * @param {number} radius - O raio atual da forma.
 */
function drawShape(shape, radius) {
  const diameter = radius * 2;

  // Usa um switch para determinar o tipo de forma a ser desenhada
  switch (shape.type) {
    case 'circle':
      fill(shape.c1);
      circle(shape.x, shape.y, diameter);
      break;
      
    case 'semi-right': // Semi-círculo do lado direito
      fill(shape.c1);
      arc(shape.x, shape.y, diameter, diameter, -HALF_PI, HALF_PI);
      break;
      
    case 'semi-left': // Semi-círculo do lado esquerdo
      fill(shape.c1);
      arc(shape.x, shape.y, diameter, diameter, HALF_PI, -HALF_PI);
      break;
      
    case 'split-v': // Círculo dividido verticalmente com duas cores
      // Parte direita
      fill(shape.c1);
      arc(shape.x, shape.y, diameter, diameter, -HALF_PI, HALF_PI);
      // Parte esquerda
      fill(shape.c2);
      arc(shape.x, shape.y, diameter, diameter, HALF_PI, -HALF_PI);
      break;
  }
}