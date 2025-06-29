class LoadingScene extends Scene {
    init() {
        this.startTime = 0;

        this.addEntity(new Button(undefined, 112, 140, 
            () => {
                currentScene.transitionTo(MenuScene);
            }, "open").setHidden());
    }

    run() {
        super.run();

        if (assetManager.getRealDisplayPercent() >= 100) {
            this.entities[0].setHidden(false);
            this.entities[0].setImage(assetManager.images.nenaLili);
		}
    }

    draw(g) {
        super.draw(g);

        if (assetManager.getFontLoadedFraction() >= 1) {
			g.textFont(assetManager.fonts.lekoMajuna);

			g.fill(210, 0, 0);
			g.noStroke();

			g.textSize(9);
			g.text("mi lon e ma", 112, 120);
			g.text("mi lon e ma", 112, 120);
			g.text("mi lon e ma", 112, 120);
			g.text("mi lon e ma", 112, 120);
            if (assetManager.getRealDisplayPercent() < 100)
    			g.text("...".substring(0, floor(frameCount / 8) % 4), 144, 120);
		}

        super.drawEnd(g);
    }
}