class TuTreesScene extends Scene {
    init() {
        this.background = assetManager.images.nasinSinpin;

        this.startTime = 45;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));
        this.addEntity(new Decoration(assetManager.images.kasi00, -10, -5));
        this.addEntity(new Decoration(assetManager.images.kasi0, 200, 0));

        let palisa = new Entity(assetManager.images.palisa, 0, 200, () => {
            this.addAction(new Toki("mi...\nwile ala wile e palisa ni", assetManager.images.jan, assetManager.sounds.jan));
        });

        //this.addEntity(new Decoration(assetManager.images.kasi1, 64, 27));
        //this.addEntity(new Decoration(assetManager.images.kasi2, 133, 40));

        this.addAction(new ShakeNoise(60, 4, 2));
        this.addAction(new WaitInt(60));
        this.addAction(new ShakeNoise(30, 2, 1));
        this.addAction(new WaitInt(30));
        this.addAction(new Toki("n   n   n          seme", assetManager.images.jan, assetManager.sounds.jan));
        this.addAction(new Toki("mi sona ala          .          .          .          \nmi lon seme", assetManager.images.jan, assetManager.sounds.jan));
        this.addAction(new Toki("lawa mi li pilin pakala a                    \nmi wile e misikeke", assetManager.images.janPakala, assetManager.sounds.janAnpa));
        this.addAction(new Toki("ale li pimeja tawa lukin mi\nmi ken lukin e nasin taso e kasi tu taso          .          .          .", assetManager.images.jan, assetManager.sounds.jan));
        this.addAction(new Toki("mi tawa lon nasin la mi ken toki tawa jan ante\npona la ona li pana e pona tawa mi", assetManager.images.jan, assetManager.sounds.jan));
        this.addAction(new WaitInt(15));
        this.addAction(new RunInt(function() {
            currentScene.addEntity(new Entity(assetManager.images.tawa1, 125, 73,
                () => {
                    currentScene.transitionTo(TeddyScene);
                }).setHoverImage(assetManager.images.tawa2));
            this.finished = true;
        }));
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }

    drawInto(g) {
        transG.blendMode(BLEND);
	    transG.background(0);
	    transG.blendMode(REMOVE);
	    //g.background(0);
	    //noStroke();
	    transG.fill(0);
	    transG.stroke(0);
	    let max = this.startTime;
        let currentTrans = max - this.transitioning;
	    transG.ellipse(128, 260 + floor(currentTrans / 3 * 200 / max), 170 + floor(currentTrans * 2 * 200 / max), 40 + floor(currentTrans * 2 * 210 / max));
  
	    g.image(transG, 0, -120);
        g.push();
        g.rotate(PI);
        g.image(transG, -256, -360);
        g.pop();
    }
}