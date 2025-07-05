class LupaRScene extends Scene {
    init() {
        this.background = assetManager.images.nasinLupaR;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));

        /*let tawaR = new Entity(assetManager.images.tawa1R, 224, 104,
            () => {
                //currentScene.addAction(new Toki("mi        .        .        .        \nawen tawa", assetManager.images.janPakala, assetManager.sounds.janPakala));
                currentScene.addAction(new RunInt(function() {
                    currentScene.transitionTo(MenuScene);
                    this.finished = true;
                }));
            }).setHoverImage(assetManager.images.tawa2R);//.setHidden();
        this.addEntity(tawaR);*/
        let key = new Entity(assetManager.images.iloOpen, 110, 180, () => {
            this.addAction(new RunInt(function() {
                key.setHidden();
                choices.getKey = true;
                this.finished = true;
            }));
            this.addAction(new Toki("mi kama jo e ilo open...", assetManager.images.jan, assetManager.sounds.jan));
        }).setHidden();
        if (choices.talkToPal && choices.talkToTeti && !choices.getKey) {
            key.setHidden(false);
        }
        this.addEntity(key);
        let keyTrade = new Entity(assetManager.images.iloOpen, 110, 180, () => {
            this.addAction(new RunInt(function() {
                keyTrade.setHidden();
                choices.getKey = true;
                choices.tradePalisa = true;
                this.finished = true;
            }));
            this.addAction(new Toki("mi kama jo e ilo open...", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("mi kama jo e palisa sina a a a", assetManager.images.janPalisaLawaIke, assetManager.sounds.janPalisa));
        }).setHidden();
        if (choices.talkToPal && choices.pickUpPalisa && !choices.getKey) {
            keyTrade.setHidden(false);
        }
        this.addEntity(keyTrade);
        let janPalisa = new Entity(assetManager.images.janPalisa, 45, 170, () => {
            this.addAction(new Toki("...", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
            this.addAction(new Toki("toki     \ntomo ni li seme", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("ni li tomo pi kulupu[sikeetan:]", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
            if (choices.talkToTeti) {
                this.addAction(new Toki("ona li wile toki tawa sina", assetManager.images.janPalisaLawaIke, assetManager.sounds.janPalisa));
                this.addAction(new Run(function() {
                    key.setHidden(false);
                    this.finished = true;
                }));
                this.addAction(new Toki("mi pana e ilo open tomo tawa sina\no tawa insa tomo", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
            } else if (choices.pickUpPalisa) {
                this.addAction(new Toki("ona li wile ala toki tawa sina     .     .     .     \ntaso mi wile e palisa sina", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
                this.addAction(new Toki("sina pana e palisa la mi pana e ilo open", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
                this.addAction(new Run(function() {
                    keyTrade.setHidden(false);
                    this.finished = true;
                }));
            } else {
                this.addAction(new Toki("ona li wile ala toki tawa sina     \no weka", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
            }
            this.addAction(new RunInt(function() {
                janPalisa.clickedFunc = () => {
                    currentScene.addAction(new Toki("...", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
                }
                choices.talkToPal = true;
                this.finished = true;
            }));
        });
        this.addEntity(janPalisa);

        let tawaL = new Entity(assetManager.images.tawa1L, 0, 104, () => {
            //currentScene.addAction(new Toki("mi        .        .        .        \nawen tawa", assetManager.images.janPakala, assetManager.sounds.janPakala));
            currentScene.addAction(new RunInt(function() {
                currentScene.transitionTo(LupaScene);
                this.finished = true;
            }));
        }).setHoverImage(assetManager.images.tawa2L);//.setHidden();
        this.addEntity(tawaL);
        //this.addEntity(new Decoration(assetManager.images.kasi1, 64, 27));
        //this.addEntity(new Decoration(assetManager.images.kasi2, 133, 40));

        if (choices.talkToPal) {
            this.addAction(new RunInt(function() {
                janPalisa.clickedFunc = () => {
                    currentScene.addAction(new Toki("...", assetManager.images.janPalisaLawa, assetManager.sounds.janPalisa));
                }
                this.finished = true;
            }));
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