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

// Some variables that will be used in this script
var ctx

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
	
}
