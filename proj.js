/**
* Title:
* Author: Seb W
* Date:
* Version: 1
* Purpose:
**/

console.log("Game")

// Some constants that will be used in this script
const GAME_WIDTH = 600
const GAME_HEIGHT = 600
const WIDTH = 645
const HEIGHT = 600
const LINE_SIZE = 10

// Some variables that will be used in this script
var ctx
var linesLocation = -4
var linesSpeed = 2
var gameActive = 0
var healthLeft = 3
var misses = 0
var muted = 1
var gameStarted = 0
// Image variables
var audioImage = new Image()
var healthLeftImage = new Image()
var playPauseButtons = new Image()

window.onload=startCanvas
function startCanvas(){
	// The startCanvas() function sets up the game. 
	// This is where all of the once off startup stuff should go
	
	ctx=document.getElementById("myCanvas").getContext("2d")
	
	loadIcons()
}

window.addEventListener('keydown', keyDownFunction)
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	console.log("A key was pressed, the key was", keyDown)
	if (gameActive == 0) {
		gameActive = 1
		// This timer sets the framerate.
		// 10 means 10 milliseconds between frames (100 frames per second)
		if (gameStarted == 0) {
			timer = setInterval(updateCanvas, 16)
			gameStarted = 1
		}
	} else if (keyDown == "Escape") {
		console.log("Escape pressed")
		gameActive = 0
	}
	
}

function updateCanvas(){
	// The updateCanvas() function contains the main game loop
	// It is run once every frame. Most of the game code will go here

	// Clear the frame
	ctx.fillStyle="#ffffff"
	ctx.fillRect(0,0,WIDTH,HEIGHT)

	// Set the colour for the lines to black
	ctx.fillStyle="black"
	// Draw the two main lines
	ctx.fillRect(0,linesLocation,GAME_HEIGHT,LINE_SIZE)
	ctx.fillRect(linesLocation, 0, LINE_SIZE, GAME_WIDTH)
	
	if (gameActive == 1) {
		linesLocation = linesLocation + linesSpeed
		
		// changes the line speed when the lines hit edge of the canvas
		if (linesLocation > GAME_HEIGHT-5 || linesLocation < -5) {
			linesSpeed = linesSpeed*-1
		}
	} else {

	}
	loadIcons()
}

function loadIcons() {
	// Draws the border between the main game and 
	ctx.fillStyle="#c00000"
	ctx.fillRect(GAME_WIDTH, 0, 6, GAME_HEIGHT)

	// checks if audio should be muted or not
	if (muted == 1) {
		audioImage.src = "AudioImages/Audio_Muted.png" // set the audio icon to
	} else {
		audioImage.src = "AudioImages/Audio.png"
	}
	ctx.drawImage(audioImage, WIDTH-33, 5) // Draw the audio icon that has been set

	playPauseButtons.src = "PlayButtonImages/" + gameActive + ".png"
	ctx.drawImage(playPauseButtons, WIDTH-33, 38) // Draw the audio icon that has been set

	healthLeftImage.src = "HealthImages/" + healthLeft + "HealthLeft.png"
	ctx.drawImage(healthLeftImage, WIDTH-33, HEIGHT-35) // Draw the audio icon that has been set
	ctx.fillStyle="green"
	ctx.fillText(misses+"/3", WIDTH-26, HEIGHT-70)
	ctx.fillText("misses", WIDTH-35, HEIGHT-60)
	ctx.fillText("-----------", WIDTH-38, HEIGHT-50)
	healthLeft = 3 - misses
	ctx.fillText(healthLeft + " health", WIDTH-37, HEIGHT-40)
}
