let layer1;
let layer2;
let points = [];
let variableSize = 60;

import { SpringNumber } from "../../shared/spring.js"

const spring = new SpringNumber({
    position: 0, // start position
    frequency: 4.5, // oscillations per second (approximate)
    halfLife: 0.15 // time until amplitude is halved
})

window.setup = function () {

    createCanvas(windowWidth, windowHeight);

    layer1 = createGraphics(windowWidth, windowHeight);
    layer1.background(255);

    layer2 = createGraphics(windowWidth, windowHeight);
    layer2.background(255);
    //layer2.clear();
    //angleMode(DEGREES)
}

window.windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
}

window.mouseDragged = function () {
    points.push({ x: mouseX, y: mouseY });
    // console.log(mouseX)
}

window.draw = function () {


    const sceneSize = min(width, height)
    const centerX = 0
    const centerY = 0
    const objSize = sceneSize / 2
    const halfWidth = objSize / tan(60)
    const strokeW = 20


    // SECOND LAYER (UNDERNEATH)
    layer2.push();
    layer2.rectMode(CENTER);
    layer2.translate(width / 2, height / 2);
    layer2.fill(0, 255, 0);
    layer2.square(0, 0, variableSize);
    layer2.pop();
    // FIRST LAYER
    layer1.push();
    layer1.translate(width / 2, height / 2);
    layer1.fill(0);
    layer1.circle(0, 0, objSize);
    layer1.pop();

    // ERASE 
    let radius = 100;

    layer1.erase();
    points.forEach(point => {
        layer1.ellipse(point.x, point.y, radius, radius);
    });

    layer1.noErase();
    // DRAW IMAGES 

    image(layer2, 0, 0);
    image(layer1, 0, 0);

    // Check if all points in the circular space are covered
    let middleX = width / 2;
    let middleY = height / 2;
    let targetRadius = objSize / 2; // Adjust this to the desired radius for the covered space
    let numPointsToCheck = 10; // Adjust this to control the density of points in the circular space

    for (let i = 0; i < numPointsToCheck; i++) {
        let angle = map(i, 0, numPointsToCheck - 1, 0, TWO_PI);
        // let pointX = middleX + cos(angle) * (targetRadius - radius / 2);
        // let pointY = middleY + sin(angle) * (targetRadius - radius / 2);
        let pointX = middleX + cos(angle) * 60;
        let pointY = middleY + sin(angle) * 60;

        push();
        fill("red")
        circle(pointX, pointY, radius)
        pop();

        let pointCovered = points.some(point => {
            let distance = dist(point.x, point.y, pointX, pointY);
            return distance < (targetRadius - radius / 2);
        });

        if (pointCovered) {
            console.log("all points cover the specified space in the middle!");
            //layer1.erase();
            layer2.push();
            layer2.square(0, 0, objSize / 2);
            layer2.pop();

            variableSize = objSize;


        }
    }


}