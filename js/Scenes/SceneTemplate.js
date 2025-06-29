class EsunScene extends Scene {
    init() {
        this.background = assetManager.images.nasinLesa;

        //this.startTime = 30;
        //this.endTime = 30;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));
        
        //this.addEntity(new Decoration(assetManager.images.kasi1, 64, 27));
        //this.addEntity(new Decoration(assetManager.images.kasi2, 133, 40));

        //this.addAction(new WaitInt(90));
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }
}