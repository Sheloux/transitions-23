class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;

    }

    wiggle() {
        let amplitude = 10; // Amplitude de l'oscillation
        let frequency = 0.05; // Fréquence de l'oscillation
        this.x += amplitude * sin(frameCount * frequency);
        this.y += amplitude * sin(frameCount * frequency);

    }

    display() {
        //console.log("DISPLAY");
        fill(0);
        circle(this.x, this.y, this.size);
    }
    detect(mouseX,mouseY) {
        let distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < 30) {
            //goToYourPlace();
            console.log("GO!");

        return true;
        }
    }
    goToYourPlace() {
        for( let i = 0; i >= 25;i++) {

      
        }


    }

}

