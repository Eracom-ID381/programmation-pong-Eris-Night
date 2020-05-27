let scoreLeft = 0;
let scoreRight = 0;

let balle;
let paddleLeft;
let paddleRight

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);
    noStroke();

    balle = new Balle(width / 2, height / 2);
    paddleLeft = new PaddleLeft();
    paddleRight = new PaddleRight(width - 30);
}

function draw() {
    background(0);
    fill(255);
    drawElements();
    balle.afficher();
    paddleLeft.afficher();
    paddleRight.afficher();
    balle.moveBall();
    balle.bounceBall();
}

function drawElements() {
    paddleRight.y = mouseY;
    paddleLeft.y = mouseX;
    textSize(100);
    textAlign(RIGHT)
    text(scoreLeft, width / 2 - 40, 100);
    textAlign(LEFT)

    text(scoreRight, width / 2 + 40, 100);

    for (let y = 0; y < height; y = y + 30) {
        rect(width / 2, y, 20, 20);
    }
}

class Balle {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.speedX = 10;
        this.speedY = 0;
        this.radius = 40;
    }
    afficher() {
        ellipse(this.x, this.y, this.radius);
    }
    moveBall() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    bounceBall() {
        // Detection de collision Paddle Right
        if (this.x >= paddleRight.x - paddleRight.width * 2 &&
            this.y >= paddleRight.y - paddleRight.height / 2 &&
            this.y <= paddleRight.y + paddleRight.height / 2) {
            this.speedX = -this.speedX;
            this.speedY = random(-5, 5);
        }

        // Detection de collision Paddle Left
        if (this.x <= paddleLeft.x + paddleLeft.width * 2 &&
            this.y >= paddleLeft.y - paddleLeft.height / 2 &&
            this.y <= paddleLeft.y + paddleLeft.height / 2) {
            this.speedX = -this.speedX;
            this.speedY = random(-5, 5);
        }

        // Detection collision "murs" haut et bas
        if (this.y <= this.radius || this.y >= height - this.radius) {
            this.speedY = -this.speedY;
        }

        if (this.x > width) {
            resetBall('left');
            scoreLeft += 1;
        } else if (this.x < 0) {
            resetBall('right');
            scoreRight += 1;
        }
    }
}

class PaddleLeft {
    constructor(_x2) {
        this.x = 30;
        this.y = mouseX;
        this.width = 20;
        this.height = 150;
    }
    afficher() {
        rect(this.x, this.y, this.width, this.height);

    }
}

class PaddleRight {
    constructor(_x) {
        this.x = _x;
        this.y = mouseY;
        this.width = 20;
        this.height = 150;
    }
    afficher() {
        rect(this.x, this.y, this.width, this.height);
    }
}

function resetBall() {
    balle.x = width / 2;
    balle.y = height / 2;
    balle.speedX = -balle.speedX;
    balle.speedY = random(-2, 2);

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}







// let scoreLeft = 0;
// let scoreRight = 0;
//
// let ball = {
//     x: 0,
//     y: 0,
//     speedX: 10,
//     speedY: 0,
//     radius: 40
// }
//
// let paddleLeft = {
//     x: 30,
//     y: 0,
//     width: 20,
//     height: 150
// }
//
// let paddleRight = {
//     x: 0,
//     y: 0,
//     width: 20,
//     height: 150
// }
//
//
// function setup() {
//     createCanvas(window.innerWidth, window.innerHeight);
//     rectMode(CENTER);
//     noStroke();
//
//     ball.x = width / 2;
//     ball.y = height / 2;
//
//     paddleRight.x = width - 30;
// }
//
// function draw() {
//     background(0);
//     fill(255);
//     moveBall();
//     bounceBall();
//     drawElements();
// }
//
// function drawElements() {
//     paddleRight.y = mouseY;
//     paddleLeft.y = mouseX;
//     rect(paddleLeft.x, paddleLeft.y, paddleLeft.width, paddleLeft.height);
//     rect(paddleRight.x, paddleRight.y, paddleRight.width, paddleRight.height);
//     ellipse(ball.x, ball.y, ball.radius);
//     textSize(100);
//     textAlign(RIGHT)
//     text(scoreLeft, width / 2 - 40, 100);
//     textAlign(LEFT)
//
//     text(scoreRight, width / 2 + 40, 100);
//
//     for (let y = 0; y < height; y = y + 30) {
//         rect(width / 2, y, 20, 20);
//     }
// }
//
// function bounceBall() {
//     // Detection de collision Paddle Right
//     if (ball.x >= paddleRight.x - paddleRight.width * 2 &&
//         ball.y >= paddleRight.y - paddleRight.height / 2 &&
//         ball.y <= paddleRight.y + paddleRight.height / 2) {
//         ball.speedX = -ball.speedX;
//         ball.speedY = random(-5, 5);
//     }
//
//     // Detection de collision Paddle Left
//     if (ball.x <= paddleLeft.x + paddleLeft.width * 2 &&
//         ball.y >= paddleLeft.y - paddleLeft.height / 2 &&
//         ball.y <= paddleLeft.y + paddleLeft.height / 2) {
//         ball.speedX = -ball.speedX;
//         ball.speedY = random(-5, 5);
//     }
//
//     // Detection collision "murs" haut et bas
//     if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
//         ball.speedY = -ball.speedY;
//     }
//
//     if (ball.x > width) {
//         resetBall('left');
//         scoreLeft += 1;
//     } else if (ball.x < 0) {
//         resetBall('right');
//         scoreRight += 1;
//     }
// }
//
// function movePaddle() {
//     paddleRight.y = mouseY;
//     paddleLeft.y = mouseX;
// }
//
// function moveBall() {
//     ball.x += ball.speedX;
//     ball.y += ball.speedY;
// }
//
// function resetBall() {
//     ball.x = width / 2;
//     ball.y = height / 2;
//     ball.speedX = -ball.speedX;
//     ball.speedY = random(-2, 2);
//
// }
//
// function windowResized() {
//     resizeCanvas(window.innerWidth, window.innerHeight);
//     setup();
// }