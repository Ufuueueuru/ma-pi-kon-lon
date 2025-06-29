class TeddyScene extends Scene {
    init() {
        this.background = assetManager.images.nasin;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));
        let teti = new Entity(assetManager.images.teti, 50, 140, () => {
            this.addAction(new TokiLili("mi luka e soweli             .             .             .     ", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("o luka ala e mi!", assetManager.images.tetiLawa, assetManager.sounds.tetiIke));
            this.addAction(new Toki("aa          \nsina monsuta anu seme", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("mi monsuta ala     \nmi soweli\nsina ike ala ike tawa jan, anu tawa mi taso", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new Toki(".          .          .           \nmi wile ala ike tawa ijo ante", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("tenpo ni li nasa\n mi pilin nasa\nmi sona e ala lon ma ni", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("ma...               ni          ...?", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new Toki("ma ante li lon ala", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new Toki("taso tomo mi li lon ma ante!", assetManager.images.jan, assetManager.sounds.janSuli));
            this.addAction(new Toki("a a a          \nsina musi a", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new Toki("taso, mi wile lape lon tenpo poka", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new Toki("kulupu[sikeetan:] li kama lon tenpo lili la mi o awen e wawa mi", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new Toki(".          .          .          \nmi sona e ni        \ntenpo kama la sina lon kulupu ni", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new Toki("mi wile lukin e kama sina lon kulupu[sikeetan:]", assetManager.images.tetiLawaWile, assetManager.sounds.teti));
            this.addAction(new Toki("taso tenpo ni la mi lape\no tawa", assetManager.images.tetiLawa, assetManager.sounds.teti));
            this.addAction(new RunInt(function() {
                choices.talkToTeti = true;
                teti.clickedFunc = () => {
                    currentScene.addAction(new Toki("...", assetManager.images.tetiLawa, assetManager.sounds.teti));
                }
                tawa.clickedFunc = () => {
                    currentScene.addAction(new Toki("mi awen tawa", assetManager.images.jan, assetManager.sounds.jan));
                    currentScene.addAction(new RunInt(function() {
                        currentScene.transitionTo(EsunScene);
                        this.finished = true;
                    }));
                }
                this.finished = true;
            }));
        });
        this.addEntity(teti);

        let tawa = new Entity(assetManager.images.tawa1, 120, 30,
            () => {
                currentScene.addAction(new Toki("mi wile ala luka e soweli len\nmi o alasa e jan", assetManager.images.jan, assetManager.sounds.jan));
                currentScene.addAction(new RunInt(function() {
                    currentScene.transitionTo(MenuScene);
                    this.finished = true;
                }));
            }).setHoverImage(assetManager.images.tawa2).setHidden();
        this.addEntity(tawa);
        //this.addEntity(new Decoration(assetManager.images.kasi1, 64, 27));
        //this.addEntity(new Decoration(assetManager.images.kasi2, 133, 40));

        this.addAction(new WaitInt(90));
        this.addAction(new Toki("soweli len󱦕          ?", assetManager.images.jan, assetManager.sounds.jan));
        this.addAction(new Toki("mi o toki tawa ona", assetManager.images.jan, assetManager.sounds.jan));
        this.addAction(new Toki("pakala          \nsoweli len li ken ala toki\nlawa mi li nasa...", assetManager.images.janPakala, assetManager.sounds.janAnpa));
        //this.addAction(new Toki("lawa mi li pilin pakala a                    \nmi wile e misikeke", assetManager.images.janPakala, assetManager.sounds.janAnpa));
        this.addAction(new WaitInt(15));
        this.addAction(new RunInt(function() {
            tawa.setHidden(false);
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

    /*drawInto(g) {
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
    }*/
}