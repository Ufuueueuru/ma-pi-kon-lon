class SettingsScene extends Scene {
    init() {
        this.background = assetManager.images.settings;

        //this.startTime = 180;
        //this.endTime = 180;

        this.addEntity(new Button(assetManager.images.nenaLili, 5, 5,
            () => {
                currentScene.transitionTo(MenuScene);
            }, "lipu pini"));

        this.addEntity(new Button(assetManager.images.nenaLili, 8, 170,
            () => {
                Howler.volume(0);
            }, "ala"));
        this.addEntity(new Button(assetManager.images.nenaLili, 64, 170,
            () => {
                Howler.volume(0.25);
            }, "25"));
        this.addEntity(new Button(assetManager.images.nenaLili, 112, 170,
            () => {
                Howler.volume(0.5);
            }, "50"));
        this.addEntity(new Button(assetManager.images.nenaLili, 160, 170,
            () => {
                Howler.volume(0.75);
            }, "75"));
        this.addEntity(new Button(assetManager.images.nenaLili, 208, 170,
            () => {
                Howler.volume(1);
            }, "100"));
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }
}