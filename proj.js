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

var muted = 1
var audioImage = new Image()
audioImage.src = "Audio.png"
var audioMutedImage = new Image()
audioMutedImage.src = "Audio_Muted.png"

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
	linesLocation = linesLocation + linesSpeed

	// changes the line speed when the lines hit edge of the canvas
	if (linesLocation > GAME_HEIGHT-5 || linesLocation < -5) {
		linesSpeed = linesSpeed*-1
	}

	// checks if audio should be muted or not
	if (muted == 1) {
		ctx.drawImage(audioMutedImage, WIDTH-33, 5) // Set the audio icon to the muted image when 
	} else {
		ctx.drawImage(audioImage, WIDTH-33, 5)
	}

	ctx.fillStyle="#c00000"
	ctx.fillRect(GAME_WIDTH, 0, 6, GAME_HEIGHT)
}
