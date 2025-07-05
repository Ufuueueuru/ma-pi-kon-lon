class PiniScene extends Scene {
    init() {
        this.background = assetManager.images.nasinPini;

        this.startTime = 0;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));

        if (choices.deadToTeti) {
            this.addAction(new Toki("jan li moli ala", undefined, assetManager.sounds.teti));
            this.addAction(new Toki("taso ona li awen lon ma pi kon lon\nli awen lon tenpo ale", undefined, assetManager.sounds.teti));
        } else if (choices.deadToLesa) {
            this.addAction(new Toki("jan li moli", undefined, assetManager.sounds.lesa));
            this.addAction(new Toki("ale li pona lon ma pi kon lon", undefined, assetManager.sounds.lesa));
        } else {
            this.addAction(new Toki("jan li tawa lon tenpo ale", undefined, assetManager.sounds.janPalisa));
            this.addAction(new Toki("ona li alasa ala e tomo ona", undefined, assetManager.sounds.janPalisa));
        }

        this.addEntity(new Button(assetManager.images.nenaLili, 112, 180, () => {
            currentScene.transitionTo(MenuScene);
            resetChoices();
        }, "sin"));
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }
}