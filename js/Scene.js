class Scene {
    constructor() {
        this.entities = [];

        this.background = undefined;

        this.sceneTransition = {
            scene: undefined,
            params: []
        }

        this.endTime = 30;
        this.startTime = 30;

        this.currentActions = [];

        this.init();

        this.transitioning = this.startTime;

        this.randShake = 0;
        this.noiseShake = 0;
        this.shakeIntensity = 1;
        this.shakeSpeed = 1;

        this.blink = false;
        this.blinkDir = 2;
        this.blinkDuration = 30;
        this.blinkCount = 0;
    }

    init() {}

    run() {
        if (this.randShake > 0) {
            this.randShake--;
        }
        if (this.noiseShake > 0) {
            this.noiseShake--;
        }
        if (this.blink) {
            if (this.blinkCount >= this.blinkDuration) {
                this.blinkDir = -this.blinkDir;
            }
            this.blinkCount += this.blinkDir;

            if (this.blinkCount <= 0) {
                this.blink = false;
            }
        }

        if (this.transitioning === 0) {
            if (this.currentActions.length > 0) {
                let foundInterrupt = false;
                let u = 0;
                do {
                    if (this.currentActions[u].interrupt)
                        foundInterrupt = true;
                    this.currentActions[u].run();
                    u++;
                } while (u < this.currentActions.length && !foundInterrupt);

                if (!foundInterrupt) {
                    for (let i in this.entities) {
                        this.entities[i].setCanAction();
                    }
                    for (let i in this.entities) {
                        this.entities[i].run(g);
                    }
                } else {
                    for (let i in this.entities) {
                        this.entities[i].setNoAction();
                    }
                }
                
                for (let i = this.currentActions.length - 1; i >= 0; i--) { 
                    if (this.currentActions.length > 0 && this.currentActions[i].finished) {
                        this.currentActions.splice(i, 1);
                    }
                }
            } else {
                for (let i in this.entities) {
                    this.entities[i].setCanAction();
                }
                for (let i in this.entities) {
                    this.entities[i].run(g);
                }
            }
        }

        if (Math.abs(this.transitioning) === 1)
            this.transitioning = 0;
        if (this.transitioning > 0) {
            this.transitioning -= 2;
            if (this.transitioning === 0 && (this.currentActions.length <= 0 || !this.currentActions[0].interrupt)) {
                for (let i in this.entities) {
                    this.entities[i].setCanAction();
                }
            }
        }
        if (this.transitioning < 0) {
            this.transitioning -= 2;
        }

        if ((this.transitioning === -this.endTime || this.transition === -this.endTime - 1) && this.sceneTransition.scene !== undefined) {
            currentScene = new this.sceneTransition.scene(...this.sceneTransition.params);
        }
    }

    drawInto(g) {
        g.background(0, this.transitioning * 256 / this.startTime);
    }
    drawOut(g) {
        g.background(0, Math.abs(this.transitioning) * 256 / this.endTime);
    }

    draw(g) {
        if (this.background !== undefined) {
            g.image(this.background, 0, 0);
        } else {
            g.background(0);
        }

        for (let i in this.entities) {
            if (!this.entities[i].hidden)
                this.entities[i].draw(g);
        }

        for (let i = 0; i < this.currentActions.length; i++) {
            this.currentActions[i].draw(g);

            if (this.currentActions[i].interrupt) {
                break;
            }
        }

        if (this.blink) {
            this.drawBlink(g);
        }
    }

    drawEnd(g) {
        if (this.transitioning > 0)
            this.drawInto(g);
        if (this.transitioning < 0)
            this.drawOut(g);
    }

    drawBlink(g) {
        transG.blendMode(BLEND);
	    transG.background(0);
	    transG.blendMode(REMOVE);
	    //g.background(0);
	    //noStroke();
	    transG.fill(0);
	    transG.stroke(0);
	    let max = this.blinkDuration - 15;
        let currentTrans = Math.max(0, max - this.blinkCount);
	    transG.ellipse(128, 260 + floor(currentTrans / 3 * 200 / max), 170 + floor(currentTrans * 2 * 200 / max), 40 + floor(currentTrans * 2 * 210 / max));
  
	    g.image(transG, 0, -120);
        g.push();
        g.rotate(PI);
        g.image(transG, -256, -360);
        g.pop();
    }

    transitionTo(scene, ...params) {
        if (this.transitioning === 0) {
            for (let i in this.entities) {
                this.entities[i].setNoAction();
            }
            this.transitioning = -2;
            this.sceneTransition = {
                scene: scene,
                params: params
            }
        }
    }

    addEntity(...entity) {
        this.entities.push(...entity);
    }

    addAction(...action) {
        this.currentActions.push(...action);
    }

    mouseClicked() {
        if (this.currentActions.length <= 0 || !this.currentActions[0].interrupt) {
            for (let i in this.entities) {
                if (!this.entities[i].hidden) {
                    this.entities[i].mouseClicked();
                }
            }
        }
        for (let i = 0; i < this.currentActions.length; i++) {
            this.currentActions[i].mouseClicked();

            if (this.currentActions[i].interrupt) {
                break;
            }
        }
    }
}