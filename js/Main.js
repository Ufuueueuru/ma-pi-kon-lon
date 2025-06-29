"use strict";

p5.disableFriendlyErrors = true;

let webVersion = false;
let webgl = false;

if (!window.currentDir) {
	window.currentDir = "";
}
if (!window.electronAPI) {
	webVersion = true;
	window.electronAPI = {
		toggleFullscreen: () => { },
		toggleMenuBar: () => { },
		closeWindow: () => { },
		writeSave: (data) => {
			localStorage.setItem("saveFile", JSON.stringify(data));
		},
		loadSave: async () => {
			try {
				let file = JSON.parse(localStorage.getItem("saveFile"));
				if (localStorage.getItem("saveFile") !== null && file.defaultKeyboardControls1)
					return file;
			} catch { }
			return { "version": "0.0.1" }
		},
		getSavesPath: () => { },
		getAppVersion: async () => { appVersion = "0.0.1"; return appVersion; }
	};
}

let appVersion = "";

let saveFile;
let resetSave;

let assetManager;

let g;

let transG;

let canvas;

let ambientWindPlayed = false;
let shouldPlayWind = true;

let loadingScreen = true;

let currentScene;

let graphicsWidth;
let graphicsHeight;

let choices;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	graphicsWidth = min(windowWidth, windowHeight * 256 / 240);
	graphicsHeight = graphicsWidth * 240 / 256;
	g = createGraphics(256, 240);
	transG = createGraphics(256, 240);

	pixelDensity(1);
	noSmooth();
	g.pixelDensity(1);
	g.noSmooth();

	getAppVersion();

	currentScene = new LoadingScene();

	choices = {
		//Decisions
		pickUpPalisa: false,
		talkToTeti: false,
		talkToLesa: false,

		//Keeping track of actions
		seenDoor: false
	};

	assetManager = new AssetManager();

	assetManager.addFont("resources/nimi/leko majuna.ttf", "lekoMajuna", true);

	assetManager.addImage("resources/sitelen/title.png", "title", true);
	assetManager.addImage("resources/sitelen/nenaLili.png", "nenaLili", true);
	assetManager.addImage("resources/sitelen/lekoToki.png", "lekoToki", true);

	assetManager.addImage("resources/sitelen/tawa1.png", "tawa1", true);
	assetManager.addImage("resources/sitelen/tawa2.png", "tawa2", true);
	assetManager.addImage("resources/sitelen/tawa1L.png", "tawa1L", true);
	assetManager.addImage("resources/sitelen/tawa2L.png", "tawa2L", true);
	assetManager.addImage("resources/sitelen/tawa1U.png", "tawa1U", true);
	assetManager.addImage("resources/sitelen/tawa2U.png", "tawa2U", true);
	assetManager.addImage("resources/sitelen/tawa1R.png", "tawa1R", true);
	assetManager.addImage("resources/sitelen/tawa2R.png", "tawa2R", true);

	assetManager.addImage("resources/sitelen/jan.png", "jan", true);
	assetManager.addImage("resources/sitelen/janPoka.png", "janPoka", true);
	assetManager.addImage("resources/sitelen/janPakala.png", "janPakala", true);
	assetManager.addImage("resources/sitelen/janMoli.png", "janMoli", true);

	assetManager.addImage("resources/sitelen/nasinSinpin.png", "nasinSinpin", true);
	assetManager.addImage("resources/sitelen/kasi00.png", "kasi00", true);
	assetManager.addImage("resources/sitelen/kasi0.png", "kasi0", true);
	assetManager.addImage("resources/sitelen/palisa.png", "palisa", true);

	assetManager.addImage("resources/sitelen/nasin.png", "nasin", true);
	assetManager.addImage("resources/sitelen/teti.png", "teti", true);
	assetManager.addImage("resources/sitelen/tetiLawa.png", "tetiLawa", true);
	assetManager.addImage("resources/sitelen/tetiLawaWile.png", "tetiLawaWile", true);

	assetManager.addImage("resources/sitelen/nasinLesa.png", "nasinLesa", true);
	assetManager.addImage("resources/sitelen/lesan.png", "lesan", true);
	assetManager.addImage("resources/sitelen/lesaLawa.png", "lesaLawa", true);
	assetManager.addImage("resources/sitelen/lesaLawaSuwi.png", "lesaLawaSuwi", true);
	assetManager.addImage("resources/sitelen/lesaLawaPilin.png", "lesaLawaPilin", true);
	assetManager.addImage("resources/sitelen/lesaLawaIke.png", "lesaLawaIke", true);
	assetManager.addImage("resources/sitelen/tomoEsunLili.png", "tomoEsunLili", true);

	assetManager.addImage("resources/sitelen/nasinLupa.png", "nasinLupa", true);
	assetManager.addImage("resources/sitelen/nasinLupaL.png", "nasinLupaL", true);
	assetManager.addImage("resources/sitelen/nasinLupaR.png", "nasinLupaR", true);


	assetManager.addImage("resources/sitelen/kasi1.png", "kasi1", true);
	assetManager.addImage("resources/sitelen/kasi2.png", "kasi2", true);
	
	assetManager.addSpritesheetImp("resources/sitelen/arrow.png", "arrow", "//");
	assetManager.addSpritesheetImp("resources/sitelen/tomoEsunLiliAnim.png", "tomoEsunLiliAnim", "//");

	assetManager.addSound("resources/kalamaLili/jan.wav", "jan", {
		volume: 1
	}, true);
	assetManager.addSound("resources/kalamaLili/janAnpa.wav", "janAnpa", {
		volume: 1
	}, true);
	assetManager.addSound("resources/kalamaLili/janSuli.wav", "janSuli", {
		volume: 1
	}, true);

	assetManager.addSound("resources/kalamaLili/pakalaKipisi.wav", "pakalaKipisi", {
		volume: 1
	}, true);

	assetManager.addSound("resources/kalamaLili/joPalisa.wav", "joPalisa", {
		volume: 1
	}, true);

	assetManager.addSound("resources/kalamaLili/konEsun.wav", "konEsun", {
		volume: 1
	}, true);

	assetManager.addSound("resources/kalamaLili/teti.wav", "teti", {
		volume: 1
	}, true);
	assetManager.addSound("resources/kalamaLili/tetiIke.wav", "tetiIke", {
		volume: 1
	}, true);

	assetManager.addSound("resources/kalamaLili/lesa.wav", "lesa", {
		volume: 1
	}, true);

	assetManager.addSound("resources/kalama/darkWind.mp3", "konPimeja", {
		volume: 1,
		loop: true
	}, true);

	frameRate(60);

	//resetSaveFile();

	assetManager.loadAssets();

	/*loadSaveFile(() => {
		assetManager.loadAssets();

		if (!graphicsSettings.antiAliasing) {
			//These 3 lines should be used only if we want pixel art
			pixelDensity(1);
			g.noSmooth();
			noSmooth();
		}
	});*/
}

function draw() {
	background(0);
	cursor(ARROW);

	currentScene.run();

	currentScene.draw(g);

	/*if (loadingScreen) {
		

		
	} else {
		if (!ambientWindPlayed || (!assetManager.sounds.konPimeja.playing() && shouldPlayWind)) {
			assetManager.sounds.konPimeja.play();
			ambientWindPlayed = true;
		}

		if (mouseIsPressed) {
			currentText = "mi         .         .         .         sona ala   .   .   .   \nmi lon ma seme\nale li nasa...\nnimi sina li seme .1. .. .. 2. .. .3 .. 4. .5 . . 6. .7 .. 8. .9 .. 0. ..";
			currentTextImage = assetManager.images.jan;
			currentTextSound = assetManager.sounds.jan;
			textBoxOn = true;
		} else {
			textBoxOn = false;
			currentTextLength = 0;
		}


		g.textFont(assetManager.fonts.lekoMajuna);

		g.image(assetManager.images.nasin, 0, 0);

		if (textBoxOn) {
			drawLekoToki(g);
		}
	}*/

	let offX = (currentScene.randShake > 0 ? random(-currentScene.shakeIntensity, currentScene.shakeIntensity) : 0) + (currentScene.noiseShake > 0 ? noise(frameCount * currentScene.shakeSpeed / 10) * 2 * currentScene.shakeIntensity - currentScene.shakeIntensity : 0);

	let offY = (currentScene.randShake > 0 ? random(-currentScene.shakeIntensity, currentScene.shakeIntensity) : 0) + (currentScene.noiseShake > 0 ? noise(frameCount * currentScene.shakeSpeed / 10 + 1928370938647) * 2 * currentScene.shakeIntensity - currentScene.shakeIntensity : 0);

	image(g, max(0, windowWidth / 2 - graphicsWidth / 2) + offX, max(0, windowHeight / 2 - graphicsHeight / 2) + offY, graphicsWidth, graphicsHeight);
}

function drawLekoToki(g) {
	g.image(assetManager.images.lekoToki, 0, 176);

	if (currentTextImage !== undefined)
		g.image(currentTextImage, 0, 176);

	g.fill(210, 0, 0);
	g.noStroke();
	g.textSize(9);
	let texty = currentText.substring(0, currentTextLength);
	g.text(texty, 58, 187, 192, 64);
	g.text(texty, 58, 187, 192, 64);
	g.text(texty, 58, 187, 192, 64);
	g.text(texty, 58, 187, 192, 64);

	if (currentTextLength < currentText.length && frameCount % 2 === 0) {
		currentTextLength++;
		if (currentTextSound !== undefined && currentText[currentTextLength] !== " ") {
			currentTextSound.play();
		}
	}
}

async function getAppVersion() {
	appVersion = await window.electronAPI.getAppVersion();
	return appVersion;
}

function mouseClicked(e) {
	currentScene.mouseClicked();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	graphicsWidth = min(windowWidth, windowHeight * 256 / 240);
	graphicsHeight = graphicsWidth * 240 / 256;
}

function drawLoadingScreen(g) {
	g.background(0);

	if (assetManager.getFontLoadedFraction() >= 1 && !forceDynamicLoadingDisplay) {
		/*let text = [];
		g.textFont(assetManager.fonts.asuki);
		text = ["󱤴", "󱤬", "󱤉", "󱤰"];
		g.fill(255);
		g.textSize(30);
		g.textAlign(CENTER, CENTER);
		let displayText = text;*/
		if (loadingImages) {
			for (let i in loadingImages) {
				let offset = 0;
				if ((floor(frameCount / 10) - i + 4) % 4 < 1)
					offset = 7;
				g.image(loadingImages[i], width / 2 - 45 + 20 * i, height / 2 - offset - 50);
				//g.text(displayText[i], width / 2 - 30 + 20 * i, height / 2 - offset - 35);
			}
			g.textFont(assetManager.fonts.asuki);
			g.fill(255);
			g.noStroke();
			g.textSize(30);
			g.textAlign(CENTER, CENTER);
			g.text(floor(max(assetManager.getRealDisplayPercentNonsmall(), 0)) + "%", windowWidth / 2, windowHeight / 2);
		} else {
			loadingImages = [];
			let g = createGraphics(30, 30);
			let displayText = ["󱤴", "󱤬", "󱤉", "󱤰"];
			for (let i = 0; i < displayText.length; i++) {
				g.textFont(assetManager.fonts.asuki);
				g.fill(255);
				g.noStroke();
				g.textSize(30);
				g.textAlign(CENTER, CENTER);
				g.text(displayText[i], 15, 15);
				loadingImages.push(g.get());
				g.clear();
			}
			g.remove();
		}
	}
}

function reloadGame() {
	if (webVersion) {
		location.reload();
	} else {
		window.electronAPI.reloadWindow();
	}
}

let totalAlerts = "";
let timesAlerted = 0;

window.onerror = function (msg, url, linenumber, colno, error) {
	totalAlerts += '\n' + 'Error message ' + timesAlerted + ': ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber + '\n' + colno;
	if (timesAlerted < 3)
		alert('Error message ' + timesAlerted + ': ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber + '\n' + colno);
	if (timesAlerted === 3)
		alert('Too many errors - please send this error message to Ufuueueuru:' + totalAlerts);
	timesAlerted++;
	//console.log('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
	return false;
}