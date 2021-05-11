/**
* Title:
* Author: Seb White
* Date:
* Version: 1
* Purpose:
**/

console.log("Game")

// Some constants that will be used in this script
const WIDTH = 600
const HEIGHT = 600
const LINE_SIZE = 10


// Some variables that will be used in this script
var ctx
var linesLocation = -4
var linesSpeed = 2

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
	ctx.fillStyle="white"
	ctx.fillRect(0,0,WIDTH, HEIGHT)
	
	// Draw the two main lines
	ctx.fillStyle="black"
	ctx.fillRect(0,linesLocation,HEIGHT,LINE_SIZE)
	ctx.fillRect(linesLocation, 0, LINE_SIZE, WIDTH)
	linesLocation = linesLocation + linesSpeed

	// changes the line speed when the lines hit edge of the canvas
	if (linesLocation > HEIGHT-5 || linesLocation < -5) {
		linesSpeed = linesSpeed*-1
	}
	// if (lineLocation < -5) {
	// 	lineSpeed = 2
	// }
}
