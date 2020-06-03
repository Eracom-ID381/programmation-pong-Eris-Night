let scoreLeft = 0;
let scoreRight = 0;

let balle;
let paddleLeft;
let paddleRight;
var tamère = true;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);
    noStroke();

    balle = new Balle(width / 2, height / 2);
    paddleLeft = new Paddle(30, 0, 20, 150);
    paddleRight = new Paddle(width - 30, 0, 20, 150);
}

function draw() {
    background(color(random(0, 255), random(0, 255), random(0, 255)));
    fill(255);
    drawElements();
    balle.afficher();

    paddleLeft.afficher();
    paddleLeft.bouger(mouseX);
    paddleRight.afficher();
    paddleRight.bouger(mouseY);

    balle.moveBall();
    balle.bounceBall();


}

function drawElements() {
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
        this.speedX = 70;
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
            scoreRight += 1;
        }

        // Detection de collision Paddle Left
        if (this.x <= paddleLeft.x + paddleLeft.width * 2 &&
            this.y >= paddleLeft.y - paddleLeft.height / 2 &&
            this.y <= paddleLeft.y + paddleLeft.height / 2) {
            this.speedX = -this.speedX;
            this.speedY = random(-5, 5);
            scoreLeft += 1;
        }

        // Detection collision "murs" haut et bas
        if (this.y <= this.radius || this.y >= height - this.radius) {
            this.speedY = -this.speedY;
        }

        if (this.x > width) {
            resetBall('left');
            scoreLeft -= 1;
        } else if (this.x < 0) {
            resetBall('right');
            scoreRight -= 1;
        }
    }
}

class Paddle {
    constructor(_x, _y, _width, _height) {
        this.x = _x;
        this.y = _y;
        this.width = _width;
        this.height = _height;
    }
    afficher() {
        rect(this.x, this.y, this.width, this.height);
    }
    bouger(axies) {
        this.y = axies;
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