class MenuScene extends Scene {
    init() {
        this.background = assetManager.images.title;

        this.startTime = 180;
        this.endTime = 180;

        this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
            () => {
                currentScene.transitionTo(TuTreesScene);//Should be TuTreesScene
            }, "tawa"));
        this.addEntity(new Button(assetManager.images.nenaLili, 140, 115, 
            () => {
                currentScene.transitionTo(MenuScene);
            }, "ante"));
        this.addEntity(new Button(assetManager.images.nenaLili, 117, 155, 
            () => {
                currentScene.transitionTo(MenuScene);
            }, "tan"));

        if (!assetManager.sounds.konPimeja.playing())
            assetManager.sounds.konPimeja.play();
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }
}