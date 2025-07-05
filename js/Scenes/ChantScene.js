class ChantScene extends Scene {
    init() {
        this.background = assetManager.images.nasinKulupu;

        this.startTime = 45;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));

        let teti = new Entity(assetManager.images.teti, 112, 104, () => {
            if (choices.talkToTeti) {
                this.addAction(new Toki("o kama pona", assetManager.images.tetiLawa, assetManager.sounds.teti));
                this.addAction(new Toki("sina lon la mi ken open e nasin nasa", assetManager.images.tetiLawaWile, assetManager.sounds.teti));
                this.addAction(new ShakeNoise(30, 8, 5));
                this.addAction(new Toki("a                    ", assetManager.images.janPakala, assetManager.sounds.janAnpa));
                this.addAction(new Toki("mi ken ala... tawa e noka mi", assetManager.images.janPakala, assetManager.sounds.janAnpa));
                this.addAction(new ShakeNoise(20, 3, 8));
                this.addAction(new Toki("o... o weka tan poka mi a\no pakala ala e mi", assetManager.images.janPoka, assetManager.sounds.jan));
                this.addAction(new Run(function() {
                    currentScene.background = undefined;
                    currentScene.addEntity(new Decoration(assetManager.images.tetiSuli, 64, 56));
                    teti.setHidden();
                    Howler.stop();
                    this.finished = true;
                }));
                this.addAction(new Toki("          kon sina li kama kon mi", assetManager.images.tetiLawa, assetManager.sounds.tetiIke));
                this.addAction(new Toki("          sijelo sina li kama sijelo mi", assetManager.images.tetiLawa, assetManager.sounds.tetiIke));
                this.addAction(new RunInt(function() {
                    choices.deadToTeti = true;
                    currentScene = new PiniScene();
                }));
            } else if (choices.talkToLesa) {
                this.addAction(new Toki("jan o     .     .     .     ", assetManager.images.tetiLawa, assetManager.sounds.teti));
                this.addAction(new Toki("monsuta li lanpan e kon sina", assetManager.images.tetiLawa, assetManager.sounds.tetiIke));
                this.addAction(new TokiLili("mi alasa e kon ni a a                              ", assetManager.images.jan, assetManager.sounds.jan));
                this.addAction(new RunInt(function() {//Animation
                    if (this.count === 142) {
                        currentScene.background = assetManager.images.nasinPini;
                        assetManager.sounds.noise.play();
                        teti.setHidden();
                    }
                    if (this.count === 176) {
                        choices.deadToLesa = true;
                        currentScene = new PiniScene();
                        this.finished = true;
                    }
                    if (this.count === 0) {
                        Howler.stop();
                    }
                    if (this.count < 176) {
                        this.moli.run();
                    }
                    this.count++;
                }).addField("count", 0).addField("moli", Spritesheet.copy(assetManager.spritesheets.moli)).setDraw(function(g) {
                    if (this.count < 176) {
                        this.moli.draw(g, 0, 0);
                    }
                }));
            } else {
                this.addAction(new Toki("jan o     .     .     .     ", assetManager.images.tetiLawa, assetManager.sounds.teti));
                this.addAction(new Toki("mi awen lon tenpo\nsina lon nasin pi wile mi", assetManager.images.tetiLawaWile, assetManager.sounds.teti));
                this.addAction(new ShakeNoise(30, 8, 5));
                this.addAction(new Toki("a                    ", assetManager.images.janPakala, assetManager.sounds.janAnpa));
                this.addAction(new Toki("mi ken ala... tawa e noka mi", assetManager.images.janPakala, assetManager.sounds.janAnpa));
                this.addAction(new ShakeNoise(20, 3, 8));
                this.addAction(new Toki("o... o weka tan poka mi a\no pakala ala e mi", assetManager.images.janPoka, assetManager.sounds.jan));
                this.addAction(new Run(function() {
                    currentScene.background = undefined;
                    currentScene.addEntity(new Decoration(assetManager.images.tetiSuli, 64, 56));
                    teti.setHidden();
                    Howler.stop();
                    this.finished = true;
                }));
                this.addAction(new Toki("          kon sina li kama kon mi", assetManager.images.tetiLawa, assetManager.sounds.tetiIke));
                this.addAction(new Toki("          sijelo sina li kama sijelo mi", assetManager.images.tetiLawa, assetManager.sounds.tetiIke));
                this.addAction(new RunInt(function() {
                    choices.deadToTeti = true;
                    currentScene = new PiniScene();
                }));
            }
            
        });
        this.addEntity(teti);

        this.addAction(new PlaySound(assetManager.sounds.chant));
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }
}