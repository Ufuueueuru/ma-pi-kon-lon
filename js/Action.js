class Action {
    constructor() {
        this.finished = false;

        this.interrupt = false;
    }

    addField(name, value) {
        this[name] = value;
        return this;
    }

    setDraw(func) {
        this.draw = func.bind(this);
        return this;
    }

    mouseClicked() {}

    run() {}

    draw(g) {}
}

class Wait extends Action {
    constructor(time) {
        super();

        this.maxTime = time;
        this.time = 0;
    }

    run() {
        if (this.time < this.maxTime) {
            this.time++;
        } else {
            this.finished = true;
        }
    }
}
class WaitInt extends Wait {
    constructor(time) {
        super(time);

        this.interrupt = true;
    }
}

class Run extends Action {
    constructor(action=function(){}) {
        super();

        this.run = action.bind(this);
    }
}

class RunInt extends Run {
    constructor(action=function(){}) {
        super(action);

        this.interrupt = true;
    }
}

class PlaySound extends Run {
    constructor(sound) {
        super(function() {
            this.sound.play();
            this.finished = true;
        });
        this.sound = sound;
    }
}

class PlaySoundInt extends RunInt {
    constructor(sound) {
        super(function() {
            this.sound.play();
            this.finished = true;
        });
        this.sound = sound;
    }
}

class Blink extends Action {
    constructor (duration, speed=2) {
        super();

        this.initialized = false;

        this.duration = duration;
        this.speed = speed;
    }

    run() {
        if (!this.initialized) {
            this.initialized = true;
            currentScene.blink = true;
            currentScene.blinkDir = this.speed;
            currentScene.blinkDuration = this.duration;
            currentScene.blinkCount = 0;
        }

        if (!currentScene.blink) {
            this.finished = true;
        }
    }
}

class BlinkInt extends Blink {
    constructor (duration, speed) {
        super(duration, speed);

        this.interrupt = true;
    }
}

class ShakeRand extends Action {
    constructor (duration, intensity) {
        super();

        this.duration = duration;
        this.intensity = intensity;
    }

    run() {
        currentScene.randShake = this.duration;
        currentScene.shakeIntensity = this.intensity;

        this.finished = true;
    }
}

class ShakeNoise extends Action {
    constructor (duration, intensity, speed) {
        super();

        this.duration = duration;
        this.intensity = intensity;
        this.speed = speed;
    }

    run() {
        currentScene.noiseShake = this.duration;
        currentScene.shakeIntensity = this.intensity;
        currentScene.shakeSpeed = this.speed;

        this.finished = true;
    }
}

class Toki extends Action {
    constructor(currentText, currentTextImage, currentTextSound) {
        super();
        this.currentText = currentText;
        this.currentTextLength = 0;
        this.currentTextImage = currentTextImage;
        this.currentTextSound = currentTextSound;

        this.arrow = Spritesheet.copy(assetManager.spritesheets.arrow);

        this.interrupt = true;
    }

    mouseClicked() {
        if (this.currentTextLength >= this.currentText.length) {
            this.finished = true;
        }
    }

    run() {
        if (this.currentTextLength >= this.currentText.length) {
            this.arrow.run();
            cursor(HAND);
        }
    }

    draw(g) {
	    g.image(assetManager.images.lekoToki, 0, 176);

	    if (this.currentTextImage !== undefined)
		    g.image(this.currentTextImage, 0, 176);

	    g.fill(210, 0, 0);
	    g.noStroke();
	    g.textSize(9);
	    let texty = this.currentText.substring(0, this.currentTextLength);
	    g.text(texty, 60, 187, 192, 64);
	    g.text(texty, 60, 187, 192, 64);
	    g.text(texty, 60, 187, 192, 64);
	    g.text(texty, 60, 187, 192, 64);

	    if (this.currentTextLength < this.currentText.length && frameCount % 2 === 0) {
		    this.currentTextLength++;
		    if (this.currentTextSound !== undefined && this.currentText[this.currentTextLength] !== " ") {
			    this.currentTextSound.play();
		    }
	    }

        if (this.currentTextLength >= this.currentText.length) {
            this.arrow.draw(g, 120, 160);
        }
    }
}

class TokiLili extends Toki {
    constructor(currentText, currentTextImage, currentTextSound) {
        super(currentText, currentTextImage, currentTextSound);
    }

    mouseClicked() {

    }

    run() {
        if (this.currentTextLength >= this.currentText.length) {
            this.finished = true;
        }
    }
}