class EsunScene extends Scene {
    init() {
        this.background = assetManager.images.nasinLesa;

        //this.addEntity(new Button(assetManager.images.nenaLili, 163, 75, 
        //    () => {
        //        currentScene.transitionTo(TeddyScene);
        //    }, "tawa"));
        let lesa = new Entity(assetManager.images.lesan, 150, 105, () => {
            this.addAction(new Toki("toki     \nsina jo ala jo e misikeke", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new TokiLili(".   .   .   li   kama   lon   nasin          ", assetManager.images.lesaLawaIke, assetManager.sounds.lesa));
            this.addAction(new Toki("jan o     toki  a  a  a  ", assetManager.images.lesaLawaSuwi, assetManager.sounds.lesa));
            this.addAction(new Toki("sina toki tawa jan ante anu seme", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("ala a       ala a          \nmi wile esun!", assetManager.images.lesaLawa, assetManager.sounds.lesa));
            this.addAction(new Toki("     .     .     .", assetManager.images.jan, assetManager.sounds.jan));
            this.addAction(new Toki("mi      jo ala e mani", assetManager.images.janPoka, assetManager.sounds.janPakala));
            this.addAction(new Toki("mani li     .     .     .     seme               \nsina toki e 　tema nito　 anu seme", assetManager.images.lesaLawaPilin, assetManager.sounds.lesa));
            this.addAction(new Toki("mani ala...     \nsina wile esun kepeken seme", assetManager.images.jan, assetManager.sounds.jan));
            if (choices.talkToTeti) {
                this.addAction(new Toki("kepeken telo loje", assetManager.images.lesaLawaSuwi, assetManager.sounds.lesa));
                this.addAction(new TokiLili("                    ", assetManager.images.jan, assetManager.sounds.jan));
                this.addAction(new Toki("mi ken ala pana e ni!", assetManager.images.janPakala, assetManager.sounds.jan));
                this.addAction(new Toki("mi wile e telo loje sina", assetManager.images.lesaLawaPilin, assetManager.sounds.lesa));
                this.addAction(new TokiLili("                    ", assetManager.images.janPakala, assetManager.sounds.janPakala));
                this.addAction(new Toki("mi wile a e telo loje sina", assetManager.images.lesaLawaPilin, assetManager.sounds.lesa));
                this.addAction(new TokiLili("                    ", assetManager.images.janPakala, assetManager.sounds.janPakala));
                this.addAction(new ShakeNoise(25, 5, 4));
                this.addAction(new PlaySound(assetManager.sounds.pakalaKipisi));
                this.addAction(new Toki("               .               .               .", assetManager.images.janMoli, assetManager.sounds.janPakala));
                this.addAction(new ShakeNoise(25, 5, 4));
                this.addAction(new PlaySound(assetManager.sounds.pakalaKipisi));
                this.addAction(new WaitInt(10));
                this.addAction(new Toki("", assetManager.images.janMoli, assetManager.sounds.janPakala));
                this.addAction(new Toki("soweli [tenpoentawainsa] li lukin e tenpo kama sina la mi ken ala lanpan e kon sina"), assetManager.images.lesaLawaIke, assetManager.sounds.lesa);
                this.addAction(new Toki("taso telo loje sina li awen pona tawa mi"), assetManager.images.lesaLawaSuwi, assetManager.sounds.lesa);
            } else {
                this.addAction(new Toki("kepeken pali", assetManager.images.lesaLawaSuwi, assetManager.sounds.lesa));
                this.addAction(new RunInt(function() {
                    if (this.count === 63) {
                        currentScene.addEntity(new Decoration(assetManager.images.tomoEsunLili, 150, 105));
                    }
                    if (this.count === 94) {
                        this.finished = true;
                    }
                    if (this.count === 0) {
                        assetManager.sounds.konEsun.play();
                    }
                    if (this.count < 64) {
                        this.tomoEsunLili.run();
                    }
                    this.count++;
                }).addField("count", 0).addField("tomoEsunLili", Spritesheet.copy(assetManager.spritesheets.tomoEsunLiliAnim)).setDraw(function(g) {
                    if (this.count < 64) {
                        this.tomoEsunLili.draw(g, 150, 105);
                    }
                }));
                this.addAction(new Toki("mi awen e sina tan pakala la     .     .     .          \nsina pali e wile mi\n\ntoki lili la          mi            kama          jo            e             kon           sina", assetManager.images.lesaLawaIke, assetManager.sounds.lesa));
                this.addAction(new Toki("mi wile ala e ni!", assetManager.images.jan, assetManager.sounds.jan));
                this.addAction(new Toki("wile sina li suli ala\nmi open e nasin", assetManager.images.lesaLawaSuwi, assetManager.sounds.lesa));
            }
            this.addAction(new RunInt(function() {
                lesa.clickedFunc = () => {
                    currentScene.addAction(new Toki("...", assetManager.images.lesaLawaSuwi, assetManager.sounds.lesa));
                }
                tawa.clickedFunc = () => {
                    currentScene.addAction(new Toki("mi awen tawa", assetManager.images.jan, assetManager.sounds.jan));
                    currentScene.addAction(new RunInt(function() {
                        currentScene.transitionTo(MenuScene);
                        this.finished = true;
                    }));
                }
                this.finished = true;
            }));
        });
        this.addEntity(lesa);

        let tawa = new Entity(assetManager.images.tawa1, 120, 30,
            () => {
                currentScene.addAction(new Toki("mi tawa     .     .     .     \njan li lon, taso mi tawa", assetManager.images.janPakala, assetManager.sounds.janPakala));
                currentScene.addAction(new RunInt(function() {
                    currentScene.transitionTo(MenuScene);
                    this.finished = true;
                }));
            }).setHoverImage(assetManager.images.tawa2).setHidden();
        this.addEntity(tawa);
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