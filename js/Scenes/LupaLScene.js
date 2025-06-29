class LupaLScene extends Scene {
    init() {
        this.background = assetManager.images.nasinLupaL;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));

        let tawaR = new Entity(assetManager.images.tawa1R, 224, 104,
            () => {
                //currentScene.addAction(new Toki("mi        .        .        .        \nawen tawa", assetManager.images.janPakala, assetManager.sounds.janPakala));
                currentScene.addAction(new RunInt(function() {
                    currentScene.transitionTo(LupaScene);
                    this.finished = true;
                }));
            }).setHoverImage(assetManager.images.tawa2R);//.setHidden();
        this.addEntity(tawaR);
        /*let tawaL = new Entity(assetManager.images.tawa1L, 0, 104,
            () => {
                //currentScene.addAction(new Toki("mi        .        .        .        \nawen tawa", assetManager.images.janPakala, assetManager.sounds.janPakala));
                currentScene.addAction(new RunInt(function() {
                    currentScene.transitionTo(LupaScene);
                    this.finished = true;
                }));
            }).setHoverImage(assetManager.images.tawa2L);//.setHidden();
        this.addEntity(tawaL);*/
        //this.addEntity(new Decoration(assetManager.images.kasi1, 64, 27));
        //this.addEntity(new Decoration(assetManager.images.kasi2, 133, 40));


        if (!choices.seenDoor) {
            choices.seenDoor = true;
            this.addAction(new Toki("tomo ni li seme\nmi ken ala open e lupa", assetManager.images.jan, assetManager.sounds.jan));
        }
    }

    run() {
        super.run();
    }

    draw(g) {
        super.draw(g);

        super.drawEnd(g);
    }
}