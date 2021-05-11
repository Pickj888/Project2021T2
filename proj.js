/**
* Title:
* Author: Seb White
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
var gamePaused = false
var healthLeft = 3
var misses = 0

var muted = 1
var audioImage = new Image()
var healthLeftImage = new Image()

window.onload=startCanvas

function startCanvas(){
	// The startCanvas() function sets up the game. 
	// This is where all of the once off startup stuff should go
	
	ctx=document.getElementById("myCanvas").getContext("2d")
	// This timer sets the framerate.
	// 10 means 10 milliseconds between frames (100 frames per second)
	timer = setInterval(updateCanvas, 16)

}

function updateCanvas(){
	// The updateCanvas() function contains the main game loop
	// It is run once every frame. Most of the game code will go here
	
	// Clear the frame
	ctx.fillStyle="#ffffff"
	ctx.fillRect(0,0,WIDTH,HEIGHT)

	// Draw the two main lines
	ctx.fillStyle="black"
	ctx.fillRect(0,linesLocation,GAME_HEIGHT,LINE_SIZE)
	ctx.fillRect(linesLocation, 0, LINE_SIZE, GAME_WIDTH)

	if (gamePaused == true) {

	} else if (gamePaused == false) {
		linesLocation = linesLocation + linesSpeed
		
		// changes the line speed when the lines hit edge of the canvas
		if (linesLocation > GAME_HEIGHT-5 || linesLocation < -5) {
			linesSpeed = linesSpeed*-1
		}
	} else {
		console.log("An error seems to have occured, please pause and unpause the game to continue")
	}

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

	healthLeftImage.src = "HealthImages/" + healthLeft + "HealthLeft.png"
	ctx.drawImage(healthLeftImage, WIDTH-33, HEIGHT-35) // Draw the audio icon that has been set
	ctx.fillStyle="green"
	ctx.fillText(misses+"/3", WIDTH-26, HEIGHT-50)
	ctx.fillText("misses", WIDTH-35, HEIGHT-40)
}
