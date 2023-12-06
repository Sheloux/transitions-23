
let shapeId = 3
let x = 0;
let speed = 0;
let started = false;
let angle = 0;
let angleWhenClicked = 0;
let growing = 0;

window.setup = function () {

    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    frameRate(120);


}

window.windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
}

window.mouseClicked = function () {
    started = true;
    // shapeId++
    // shapeId %= 4
}
window.mousePressed = function () {
    angleWhenClicked = angle;
    speed = 0;
    // shapeId++
    // shapeId %= 4
}
window.draw = function () {


    background(255);


    const sceneSize = min(width, height)

    const centerX = width / 2
    const centerY = height / 2
    const objSize = sceneSize / 2
    const halfWidth = objSize / tan(60)
    const strokeW = 20

    translate(width / 2, height / 2);

    switch (started) {

        case true:
            let force = 0;
            if (mouseIsPressed) {
                force = -1000;
            } else {

                force = max(-(angle - angleWhenClicked) * 10, 0);
            }

            speed += force * deltaTime / 1000;
            speed = max(speed,-200);
            angle += speed * deltaTime / 1000;


            break;
        case false:
            function wiggle(){
                angle = random(-3, 2);
            }
            setTimeout(wiggle,5000);


            break;
    }
    fill(0)
    noStroke()
    rectMode(CENTER)
    strokeWeight(strokeW)
    stroke(0)
    rotate(angle);
    let maxAngle = asin(strokeW/(objSize/2));
    let distanceLines = min(speed * 0.01,maxAngle);
    let lineCount = 18
    let totalAngleLines = distanceLines*lineCount;
    for (let i = 0; i <= lineCount; i++) {

        line(0 - objSize / 2, 0, 0 + objSize / 2, 0)
        line(0, 0 - objSize / 2, 0, 0 + objSize / 2)
        rotate(-distanceLines);
    }
    //console.log(totalAngleLines);

    if (totalAngleLines > 93) {
        fill(0)
        noStroke()
        growing ++
        circle(0, 0, constrain(growing,0,objSize+20));
        console.log(growing);
    }
    if (growing === objSize+20)
    {
        noLoop();
    }
}
