// Creating canvas
const canvas = document.createElement("canvas");

// Appending canvas to HTML div
document.querySelector(".myGame").appendChild(canvas);

canvas.width = innerWidth;
canvas.height = innerHeight;

// Creating Canvas Context
const context = canvas.getContext("2d");

let difficulty = 2;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");

document.querySelector("input").addEventListener("click", (e) => {
  e.preventDefault();

  form.style.display = "none";
  scoreBoard.style.display = "block";

  const userValue = document.getElementById("difficulty").value;

  if (userValue === "Easy") {
    setInterval(spawnEnemy, 2000);
    return (difficulty = 5);
  }
  if (userValue === "Mid") {
    setInterval(spawnEnemy, 1400);
    return (difficulty = 8);
  }
  if (userValue === "Hard") {
    setInterval(spawnEnemy, 1000);
    return (difficulty = 10);
  }
  if (userValue === "Insane") {
    setInterval(spawnEnemy, 700);
    return (difficulty = 12);
  }
});

// Defining Player Position in center
playerPosition = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

//--------------------------------------------------------------------
// Creating Player Class
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  // Creating an Arc and drawing it with draw()
  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }
}

//--------------------------------------------------------------------
// Creating Weapon Class
class Weapon {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // Creating an Arc and drawing it with draw()
  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

//--------------------------------------------------------------------
class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  // Creating an Arc and drawing it with draw()
  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

//--------------------------------------------------------------------
// Creating a Player Object
const dani = new Player(
  playerPosition.x,
  playerPosition.y,
  15,
  `rgb(${Math.random() * 250}, ${Math.random() * 250}, ${Math.random() * 250}`
);

// Weapons array
const weapons = [];
// Enemy Array
const enemies = [];

const spawnEnemy = () => {
  const enemySize = Math.random() * (40 - 5) + 5; // enemySize ranges 40 to 45
  const enemyColor = `rgb(${Math.random() * 250}, ${Math.random() * 250}, ${
    Math.random() * 250
  }`;

  let random;
  if (Math.random() < 0.5) {
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    random = {
      x: Math.random() * canvas.width,
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
    };
  }

  // finding angle with A-tan-2 method
  const myAngle = Math.atan2(
    canvas.height / 2 - random.y,
    canvas.width / 2 - random.x
  );
  const velocity = {
    x: Math.cos(myAngle) * difficulty,
    y: Math.sin(myAngle) * difficulty,
  };

  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
};

// Creating a recursive function for animation
function animation() {
  requestAnimationFrame(animation);

  // clearing stroke in rectangle form but imagine it as a new rectangle
  context.clearRect(0, 0, canvas.width, canvas.height);

  dani.draw();

  weapons.forEach((weapon) => {
    weapon.update();
  });

  enemies.forEach((enemy) => {
    enemy.update();
  });
}

canvas.addEventListener("click", (e) => {
  // finding angle with A-tan-2 method
  const myAngle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(myAngle) * 5,
    y: Math.sin(myAngle) * 5,
  };

  weapons.push(
    new Weapon(canvas.width / 2, canvas.height / 2, 6, "white", velocity)
  );
});

animation();
