import { sendSequenceNextSignal } from "../../shared/sequenceRunner.js"
let finished = false
let shapeId = 0
let numBoxes = 5;
let numBalls = 25; //places.length

let ball = 0;
let balls = [];
let pos = [];

const font = 0;
let ballX = 0;
let ballY = 0;

window.setup = function () {

    createCanvas(windowWidth, windowHeight);

    angleMode(DEGREES)

    // textFont('Courier New');

    window.addEventListener('keydown', handleKeyPress);




}
// function preload() {
//     font =  loadFont("transitions-23/sketches/V1/font/HedvigLettersSans-Regular.ttf");
//      }

window.windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
}

// window.mouseClicked = function () {
//     console.log("stop");
// shapeId++
// shapeId %= 4
// }

function handleKeyPress(event) {
    // Check if the pressed key is the 'W' key (key code 87)

    if (event.keyCode === 87) {
        console.log('STOP_MISSED');


        for (let h = 0; h <= numBalls; h++) {
            let ballX = random(-width, width);
            let ballY = random(-height, height);
            let ball = new Ball(ballX, ballY);
            balls.push(ball);
            // ball.display();
        }

        // Add your desired functionality here
    } else {
        boolRotation = true;

    }
}

window.draw = function () {


    background(255);
    const sceneSize = min(width, height);
    const centerX = width / 2
    const centerY = height / 2
    const objSize = sceneSize / 2
    const halfWidth = objSize / tan(60)
    const strokeW = 20

    // BAAAALLLLSSS
    balls.forEach(function (ball) {
        ball.display();
        ball.detect(mouseX, mouseY);
        //wwball.wiggle();
    })

    switch (shapeId) {
        case 0:
            let w = 0;
            let h = 0;
            push();


            fill(0)
            stroke(230);
            let places = [];



            // TURNING BOX
            for (let i = 0; i <= numBoxes; i += 1) {
                for (let j = 0; j <= numBoxes; j += 1) {

                    w = objSize / 5;
                    h = objSize / 5;
                    let x = i * w - (objSize / 5);
                    let y = j * h - (objSize / 5);
                    drawBox(x, y, w, h);

                    places.push(x, y);

                    //    goToYourPlace()
                }
            }
            pop();


            break;


            function drawBox(x, y, w, h) {
                push();
                //translate(x, y);
                rect(x, y, objSize, objSize);
                pop();

            }
    }
}
