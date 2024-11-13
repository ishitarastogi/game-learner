// Get elements
const gameSections = document.querySelectorAll(".game-section");
const ethereumGame = document.getElementById("ethereum-game");
const bscGame = document.getElementById("bsc-game");
const solanaGame = document.getElementById("solana-game");
const avalancheGame = document.getElementById("avalanche-game");
const polygonGame = document.getElementById("polygon-game");

const popup = document.getElementById("popup");
const cardTitle = document.getElementById("card-title");
const cardDescription = document.getElementById("card-description");
const popupButton = document.getElementById("popup-button");
const scoreDisplay = document.getElementById("score");

let score = 0;
let currentGameIndex = 0;

const games = ["ethereum", "bsc", "solana", "avalanche", "polygon"];

const messages = [
  {
    title: "About Orderly Network",
    description:
      "Orderly Network is a Layer 2 solution built on the OP stack, delivering a permissionless liquidity layer for Web3 trading with a shared order book across multiple blockchains.",
  },
  {
    title: "Advanced Technology",
    description:
      "Orderly Network utilizes a low-latency, shared liquidity central limit order book accessible from major EVM chains, powered by Orderly Chain and LayerZero.",
  },
  {
    title: "Real-World Applications",
    description:
      "Orderly Network enables the creation of decentralized exchanges, supports spot and perpetual futures trading, and offers tools for developers.",
  },
  {
    title: "Key Events",
    description:
      "Orderly Network has launched its platform, introduced the ORDER token, and formed strategic partnerships, expanding its ecosystem and influence in the DeFi space.",
  },
  {
    title: "Mission and Vision",
    description:
      "Orderly Network aims to empower trading on any chain, any asset, and any interface, revolutionizing DeFi by providing seamless cross-chain trading experiences.",
  },
];

const instructions = {
  ethereum: {
    title: "Ethereum Maze Instructions",
    description:
      "Use the arrow keys to navigate through the maze and reach the red square. Find your way to collect the liquidity token!",
  },
  bsc: {
    title: "BSC Block Builder Instructions",
    description:
      "Click to drop the moving blocks and stack them as high as you can. Build a stable tower to reach the liquidity token at the top!",
  },
  solana: {
    title: "Solana Obstacle Run Instructions",
    description:
      "Use the up and down arrow keys to move the spaceship. Dodge the incoming obstacles to survive and collect the liquidity token!",
  },
  avalanche: {
    title: "Avalanche Memory Match Instructions",
    description:
      "Click on the cards to flip them and find matching pairs. Match all pairs to collect the liquidity token!",
  },
  polygon: {
    title: "Polygon Quiz Instructions",
    description:
      "Answer the quiz questions correctly to proceed. Test your knowledge and collect the liquidity token!",
  },
};

// Start the game with an introductory popup
function startGame() {
  showPopup(messages[0], () => {
    showGame(games[currentGameIndex]);
  });
}

// Show the specified game
function showGame(gameName) {
  gameSections.forEach((section) => section.classList.remove("active"));
  showPopup(instructions[gameName], () => {
    switch (gameName) {
      case "ethereum":
        ethereumGame.classList.add("active");
        startEthereumGame();
        break;
      case "bsc":
        bscGame.classList.add("active");
        startBscGame();
        break;
      case "solana":
        solanaGame.classList.add("active");
        startSolanaGame();
        break;
      case "avalanche":
        avalancheGame.classList.add("active");
        startAvalancheGame();
        break;
      case "polygon":
        polygonGame.classList.add("active");
        startPolygonGame();
        break;
      default:
        break;
    }
  });
}

// Ethereum Maze Game
function startEthereumGame() {
  const canvas = document.getElementById("ethereumCanvas");
  const ctx = canvas.getContext("2d");

  const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  ];

  const cellSize = 50;
  let player = { x: 1, y: 1 };

  document.addEventListener("keydown", movePlayer);

  function movePlayer(e) {
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;

    if (maze[newY][newX] === 0) {
      player.x = newX;
      player.y = newY;
    }

    if (player.x === 14 && player.y === 9) {
      // Reached the end
      document.removeEventListener("keydown", movePlayer);
      showPopup(messages[1]);
      score++;
      scoreDisplay.textContent = score;
    }

    drawMaze();
  }

  function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === 1) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    // Draw player
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);

    // Draw end point
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(14 * cellSize, 9 * cellSize, cellSize, cellSize);
  }

  drawMaze();
}

// BSC Block Builder Game
function startBscGame() {
  const canvas = document.getElementById("bscCanvas");
  const ctx = canvas.getContext("2d");

  let block = {
    x: 0,
    y: 400,
    width: 100,
    height: 20,
    speed: 2,
    direction: 1,
  };
  let stack = [];
  let gameOver = false;

  canvas.addEventListener("click", dropBlock);

  function dropBlock() {
    if (gameOver) return;
    // Add the block to the stack
    stack.push({ ...block });
    // Reset block position
    block.y -= block.height;
    if (block.y < 0) {
      // Reached the top
      canvas.removeEventListener("click", dropBlock);
      showPopup(messages[2]);
      score++;
      scoreDisplay.textContent = score;
    }
  }

  function update() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move block
    block.x += block.speed * block.direction;
    if (block.x + block.width > canvas.width || block.x < 0) {
      block.direction *= -1;
    }

    // Draw moving block
    ctx.fillStyle = "#ffcc00";
    ctx.fillRect(block.x, block.y, block.width, block.height);

    // Draw stack
    for (let i = 0; i < stack.length; i++) {
      ctx.fillStyle = "#ffcc00";
      ctx.fillRect(stack[i].x, stack[i].y, stack[i].width, stack[i].height);
    }

    // Check for game over (if blocks are misaligned)
    if (stack.length > 1) {
      const lastBlock = stack[stack.length - 1];
      const secondLastBlock = stack[stack.length - 2];
      if (
        lastBlock.x + lastBlock.width < secondLastBlock.x ||
        lastBlock.x > secondLastBlock.x + secondLastBlock.width
      ) {
        gameOver = true;
        canvas.removeEventListener("click", dropBlock);
        alert("Game Over! Your tower collapsed.");
        showPopup(messages[2]);
        score++;
        scoreDisplay.textContent = score;
      }
    }

    requestAnimationFrame(update);
  }

  update();
}

// Solana Obstacle Game
function startSolanaGame() {
  const canvas = document.getElementById("solanaCanvas");
  const ctx = canvas.getContext("2d");

  let spaceship = { x: 50, y: canvas.height / 2, width: 50, height: 30 };
  let obstacles = [];
  let gameInterval;
  let obstacleInterval;
  let distance = 0;

  document.addEventListener("keydown", moveShip);

  function moveShip(e) {
    if (e.key === "ArrowUp") spaceship.y -= 20;
    if (e.key === "ArrowDown") spaceship.y += 20;
    if (spaceship.y < 0) spaceship.y = 0;
    if (spaceship.y + spaceship.height > canvas.height)
      spaceship.y = canvas.height - spaceship.height;
  }

  function startGame() {
    gameInterval = setInterval(updateGame, 20);
    obstacleInterval = setInterval(createObstacle, 1500);
  }

  function createObstacle() {
    const height = Math.random() * (canvas.height - 100) + 50;
    obstacles.push({ x: canvas.width, y: 0, width: 30, height: height });
    obstacles.push({
      x: canvas.width,
      y: height + 100,
      width: 30,
      height: canvas.height - height - 100,
    });
  }

  function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw spaceship
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);

    // Move and draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].x -= 5;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(
        obstacles[i].x,
        obstacles[i].y,
        obstacles[i].width,
        obstacles[i].height
      );

      // Check collision
      if (
        spaceship.x < obstacles[i].x + obstacles[i].width &&
        spaceship.x + spaceship.width > obstacles[i].x &&
        spaceship.y < obstacles[i].y + obstacles[i].height &&
        spaceship.y + spaceship.height > obstacles[i].y
      ) {
        endGame();
        return;
      }

      // Remove off-screen obstacles
      if (obstacles[i].x + obstacles[i].width < 0) {
        obstacles.splice(i, 1);
        i--;
      }
    }

    // Increase distance
    distance += 5;
    if (distance >= 3000) {
      // Win condition after traveling a certain distance
      endGame(true);
    }
  }

  function endGame(win = false) {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    document.removeEventListener("keydown", moveShip);
    if (win) {
      showPopup(messages[3]);
      score++;
      scoreDisplay.textContent = score;
    } else {
      alert("Game Over!");
      // Optionally, allow retry or proceed
      showPopup(messages[3]);
      score++;
      scoreDisplay.textContent = score;
    }
  }

  startGame();
}

// Avalanche Memory Game
function startAvalancheGame() {
  const memoryGame = document.getElementById("memory-game");
  memoryGame.innerHTML = "";

  const images = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍"];
  const cards = images.concat(images);
  cards.sort(() => Math.random() - 0.5);

  let firstCard = null;
  let secondCard = null;
  let matchedPairs = 0;

  cards.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("memory-card");

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = item;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => {
      if (card.classList.contains("flip")) return;
      card.classList.add("flip");

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        checkMatch();
      }
    });

    memoryGame.appendChild(card);
  });

  function checkMatch() {
    if (
      firstCard.querySelector(".back").textContent ===
      secondCard.querySelector(".back").textContent
    ) {
      matchedPairs++;
      resetCards();
      if (matchedPairs === images.length) {
        // Game completed
        showPopup(messages[4]);
        score++;
        scoreDisplay.textContent = score;
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetCards();
      }, 1000);
    }
  }

  function resetCards() {
    firstCard = null;
    secondCard = null;
  }
}

// Polygon Quiz Game
function startPolygonGame() {
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");
  let currentQuestionIndex = 0;

  const questions = [
    {
      question: "What is Orderly Network's primary mission?",
      options: [
        "To build a new blockchain",
        "To empower trading on any chain, any asset, any interface",
        "To create a cryptocurrency wallet",
        "To develop gaming applications",
      ],
      answer: 1,
    },
    {
      question: "Orderly Network is built on which stack?",
      options: ["OP stack", "Orbit", "Polygon CDK", "ZkSync zk stack"],
      answer: 0,
    },
    {
      question: "Which feature is NOT associated with Orderly Network?",
      options: [
        "Shared liquidity order book",
        "High-latency trading",
        "Supports spot and futures trading",
        "Advanced SDKs for developers",
      ],
      answer: 1,
    },
  ];

  function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
      // Quiz completed
      showPopup(messages[5]);
      score++;
      scoreDisplay.textContent = score;
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    quizQuestion.textContent = currentQuestion.question;
    quizOptions.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => checkAnswer(index));
      quizOptions.appendChild(btn);
    });
  }

  function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].answer) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      alert("Incorrect! Try again.");
    }
  }

  loadQuestion();
}

// Show popup with detailed explanation or instructions
function showPopup(message, callback) {
  cardTitle.textContent = message.title;
  cardDescription.textContent = message.description;
  popup.classList.remove("hidden");
  popupButton.onclick = () => {
    popup.classList.add("hidden");
    if (callback) callback();
    else proceedToNextGame();
  };
}

// Proceed to the next game
function proceedToNextGame() {
  currentGameIndex++;
  if (currentGameIndex < games.length) {
    showGame(games[currentGameIndex]);
  } else {
    // All games completed
    alert(
      "Congratulations! You have unified liquidity across all blockchains!"
    );
  }
}

// Start the game on page load
window.onload = () => {
  startGame();
};
