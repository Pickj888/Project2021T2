/**
* Title:
* Author: Seb W
* Date:
* Version: 1
* Purpose:
**/

console.log("Game")

// Some constants that will be used in this script
const WIDTH = 500
const HEIGHT = 500
const LINE_SIZE = 10

// Some variables that will be used in this script
var ctx
var linesLocation = -4
var linesSpeed = 2
var gameActive = 0

window.onload=startCanvas
function startCanvas(){
	// The startCanvas() function sets up the game. 
	// This is where all of the once off startup stuff should go
	
	ctx=document.getElementById("myCanvas").getContext("2d")
}

window.addEventListener('keydown', keyDownFunction)
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	console.log("A key was pressed, the key was", keyDown)
	if (gameActive == 0) {
		gameActive = 1
		// This timer sets the framerate.
		// 10 means 10 milliseconds between frames (100 frames per second)
		timer = setInterval(updateCanvas, 16)
	} else if (keyDown == "Escape") {
		console.log("Pause/Unpause button pressed")
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
	ctx.fillRect(0,linesLocation,HEIGHT,LINE_SIZE)
	ctx.fillRect(linesLocation, 0, LINE_SIZE, WIDTH)
	
	if (gameActive == 1) {
		linesLocation = linesLocation + linesSpeed
		
		// changes the line speed when the lines hit edge of the canvas
		if (linesLocation > HEIGHT-5 || linesLocation < -5) {
			linesSpeed = linesSpeed*-1
		}
	} else {

	}
}
