import { sendSequenceNextSignal } from "../../shared/sequenceRunner.js"
let finished = false
const gridObjects = []
const gridCount = 5
let soundEffect;
let soundPlayed = false;
let mousePressed = false;
import { SpringNumber } from "../../shared/spring.js"


const spring = new SpringNumber({
    position: 100, // start position
    frequency: 2, // oscillations per second (approximate)
    halfLife: 0.15 // time until amplitude is halved
})

window.preload = function () {
    soundEffect = loadSound('../assets/BOUB.mp3');
    console.log(soundEffect);


}
window.mouseClicked = function () {
    mousePressed = true;
}

window.setup = function () {


    createCanvas(windowWidth, windowHeight);
    for (let x = 0; x < gridCount; x++) {
        for (let y = 0; y < gridCount; y++) {
            const obj = {
                gridX: x,
                gridY: y,
                circleActive: false,
                circleProgress: 0
            }
            gridObjects.push(obj)

        }
    }

    angleMode(DEGREES)
}

window.windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
}


window.draw = function () {


    background(255);
    const sceneSize = min(width, height)
    const centerX = width / 2
    const centerY = height / 2
    const objSize = sceneSize / 2
    const strokeW = 20


    fill(0)
    noStroke()
    const pointSize = strokeW

    rectMode(CENTER)

    const allSquaresActivated = gridObjects.every(obj => obj.circleActive);
    let rectSize = objSize / (gridCount - 1)

    spring.target = rectSize;

    if (allSquaresActivated) {
        // console.log("YEY", spring.position);
        // spring.position = realRectSize;
        spring.target = pointSize;

        spring.step(deltaTime / 1000);
    }

    for (const obj of gridObjects) {

        const x = obj.gridX;
        const y = obj.gridY;
        const xPos = map(x, 0, gridCount - 1, centerX - objSize / 2, centerX + objSize / 2)
        const yPos = map(y, 0, gridCount - 1, centerY - objSize / 2, centerY + objSize / 2)


        if (mousePressed &&
            mouseX > xPos - rectSize / 2 && mouseX < xPos + rectSize / 2 &&
            mouseY > yPos - rectSize / 2 && mouseY < yPos + rectSize / 2) {
            obj.circleActive = true
            soundEffect.play();
            mousePressed = false
        }

        const transitionTime = 0.1; // seconds
        if (obj.circleActive) {
            obj.circleProgress += deltaTime / 1000 / transitionTime;
            obj.circleProgress = constrain(obj.circleProgress, 0, 1)
        }

        fill(0)
        const rectRadius = map(obj.circleProgress, 0, 1, 0, rectSize / 2)
        const realRectSize = rectSize; // map(obj.circleProgress, 0, 1, rectSize, pointSize);

        if (allSquaresActivated) {

            rect(xPos, yPos, spring.position, spring.position, spring.position)

        } else {
            rect(xPos, yPos, realRectSize + 1, realRectSize + 1, rectRadius)
        }
    }
    if (spring.position == spring.target) {
        sendSequenceNextSignal(); // finish sketch
        noLoop();
    }

}