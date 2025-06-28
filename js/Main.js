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

let textBoxOn = false;
let currentText = "";
let currentTextLength = 0;
let currentTextImage = undefined;

let g;

let canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	g = createGraphics(256, 240);

	pixelDensity(1);
	noSmooth();
	g.pixelDensity(1);
	g.noSmooth();

	getAppVersion();

	assetManager = new AssetManager();

	assetManager.addFont("resources/nimi/leko majuna.ttf", "lekoMajuna", true);

	assetManager.addImage("resources/sitelen/lekoToki.png", "lekoToki", true);
	assetManager.addImage("resources/sitelen/jan.png", "jan", true);
	assetManager.addImage("resources/sitelen/nasin.png", "nasin", true);
	
	//assetManager.addSpritesheetImp("resources/sitelen/name.png", "name", "//");

	/*assetManager.addSound("resources/name.wav", "name", {
		volume: 1
	}, true);*/

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
	cursor(ARROW);

	if (assetManager.getRealDisplayPercent() >= 100) {
		if (mouseIsPressed) {
			currentText = "mi...sona ala...\nmi lon ma seme\nale li nasa...\nnimi sina li seme .1. .. .. 2. .. .3 .. 4. .5 .. 6. .7 .. 8. .9 .. 0. ..";
			currentTextImage = assetManager.images.jan;
			textBoxOn = true;
		} else {
			textBoxOn = false;
		}


		g.textFont(assetManager.fonts.lekoMajuna);

		g.image(assetManager.images.nasin, 0, 0);

		if (textBoxOn) {
			drawLekoToki(g);
		}
	}

	image(g, 0, 0, windowWidth, windowHeight);
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
	}
}

async function getAppVersion() {
	appVersion = await window.electronAPI.getAppVersion();
	return appVersion;
}


function mousePressed(e) {
	
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
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