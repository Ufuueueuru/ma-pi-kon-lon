class CreditsScene extends Scene {
    init() {
        this.background = assetManager.images.credits;

        //this.startTime = 180;
        //this.endTime = 180;

        this.addEntity(new Button(undefined, 0, 0, 
            () => {
                currentScene.transitionTo(MenuScene);
            }, "").setSize(256, 240));
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }
}