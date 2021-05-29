/**
* Title: 
* Author: Seb W
* Date Started: 10/05/2021 (dd/mm/yyyy)
* Version: pre-1
* Last updated: 12/05/2020 (dd/mm/yyyy)
**/

console.log("Game JS Loaded")

// Some constants that will be used in this script
const GAME_WIDTH = 600
const GAME_HEIGHT = 600
const CIRCLE_SPAWN_AREA = 540
const WIDTH = 645
const HEIGHT = 600
const LINE_SIZE = 10
const CIRCLE_RADIUS = 0


// Some variables that will be used in this script
var ctx
var score = 0
var combo = 0
var clicsTopScore = window.localStorage.getItem('clicsTopScore');
var circleXPosition
var circleYPosition
var mouseXPosition
var mouseYPosition
var linesPosition = -4
var linesSpeed = 2
var gameActive = 0
var healthLeft = 3
var misses = 0
var muted = 1
var gameStarted = 0
var pauseAlpha = 0
var circleAlpha

var circleArray = []

// Image variables
var audioImage = new Image()
var healthLeftImage = new Image()
var playPauseButtons = new Image()
var pausedBorder = new Image()
var cursorImage = new Image()

// image sources that will not be changed
pausedBorder.src = "Paused_Border.png" // set the audio icon to
cursorImage.src = "cursor.png" // set the audio icon to

window.onload=startCanvas
function startCanvas(){
	// The startCanvas() function sets up the game. 
	// Everthing that loads on startup is here
	ctx=document.getElementById("myCanvas").getContext("2d")
	
	// Call the loadSideBar funtion to load the icons (for some reason function is broken when called here)
	clearLoad = setInterval(loadSideBar, 16)

}

window.addEventListener('keydown', keyDownFunction) // when a key is pressed call the keyDownFuntion
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key // set what key has been pressed to the keyDown variable
	console.log("A key was pressed, the key was", keyDown) // log the key that was pressed into console
	if (gameActive == 0) { // if the game is not active then start/unpause the game
		gameActive = 1
		// This timer sets the framerate.
		// 10 means 10 milliseconds between frames (100 frames per second)
		if (gameStarted == 0) { // this if function is used as not to allow a bug to pass through
			clearInterval(clearLoad);
			timer = setInterval(updateCanvas, 16)
			timer = setInterval(circleSpawn, 1000)
			gameStarted = 1
		}
	} else if (keyDown == "Escape") {
		console.log("Escape pressed")
		gameActive = 0
		alphaPause = 0
	}
}

function updateCanvas(){
	// The updateCanvas() function contains the main game loop
	// It is run once every frame. Most of the game code will go here

	// Clear the frame
	ctx.fillStyle="#ffffff50"
	ctx.fillRect(0,0,WIDTH,HEIGHT)

	// Set the colour for the lines to black
	ctx.fillStyle="black"
	// Draw the two main lines
	ctx.fillRect(0,linesPosition,GAME_HEIGHT,LINE_SIZE)
	ctx.fillRect(linesPosition, 0, LINE_SIZE, GAME_WIDTH)
	
	if (gameActive == 1) { // Checks if game should be paused or not
		// changes the line location
		linesPosition = linesPosition + linesSpeed
		
		// changes the line speed when the lines hit edge of the canvas
		if (linesPosition > GAME_HEIGHT-5 || linesPosition < -5) {
			linesSpeed = linesSpeed*-1
		}
	} else {
		//Change and set the alpha, this will create a fade in effect
		if (alphaPause < 1) {
			alphaPause = alphaPause + 0.2
		}
		ctx.globalAlpha=alphaPause
		// create a box to hold all of the paused text
		ctx.fillStyle="#ffffffe0"
		ctx.fillRect(35, 35, GAME_HEIGHT-70, GAME_WIDTH-70)
		ctx.drawImage(pausedBorder, 25, 25) // Draw the audio icon that has been set
		// Write all of the text over the paused box
		ctx.fillStyle="#000000a0"
		ctx.font="50px Arial"
		ctx.fillText("GAME PAUSED", 125, 85)

		ctx.fillStyle="#0000ff"
		ctx.font="9px Arial"
		ctx.fillText("If you did not pause the game an error has likely occured, please hit escape once or twice. If the problem persists please", 47, 553)
		ctx.fillText("reload the page, if the problem still happens then please report this to the owner with any errors shown in the console.", 57, 563)
		ctx.globalAlpha = 1
	}

	ctx.fillText(score, 10, 10)
	score = score+1

	// Call the loadSideBar funtion to load the icons
	loadSideBar()

	ctx.drawImage(cursorImage, mouseXPosition, mouseYPosition)
}

function circleSpawn() {
	circleArray.push(new Circle())
}

class Circle{
	constructor(x){
		// set the x and y possitions to 10
		this.circleXPosition = linesPosition + 90
		this.circleYPosition = linesPosition + 90
		// Detect if a number is even or odd then set either the circleXPosition (if it's an even number) 
		// or circleYPosition (if it's an odd number) to a random possition (min and max dependant on line possition)
		// I am aware this is likely not the best or easiest randomisation option but it is the first that came to my head.
		var lineRandomiser = Math.floor(Math.random()*10)
		if(lineRandomiser % 2 == 0) {
			console.log("even")
			this.circleXPosition = Math.floor(Math.random()*CIRCLE_SPAWN_AREA)+30

			ctx.beginPath();
			ctx.arc(this.circleXPosition, this.circleYPosition, 30, 0, 2 * Math.PI);
			ctx.lineWidth = 3;
			ctx.stroke();
		} else {
			console.log("odd")
			this.circleYPosition = Math.floor(Math.random()*CIRCLE_SPAWN_AREA)+30

			ctx.beginPath();
			ctx.arc(this.circleXPosition, this.circleYPosition, 30, 0, 2 * Math.PI);
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}
}

function loadSideBar() {
	// Clear the icon section of the frame
	ctx.fillStyle="#ffffff"
	ctx.fillRect(GAME_WIDTH,0,WIDTH-GAME_WIDTH,HEIGHT)

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

	healthLeft = 3 - misses
	if (misses == 1 || misses == 2 || misses == 3 || misses == 0) {
		healthLeftImage.src = "HealthImages/" + healthLeft + "HealthLeft.png"
	} else {
		misses = 3
	}
	ctx.drawImage(healthLeftImage, WIDTH-34, HEIGHT-35) // Draw the audio icon that has been set
	// Text for all your health info
	ctx.font="10px Arial"
	ctx.fillStyle="green"
	ctx.fillText(misses+"/3", WIDTH-26, HEIGHT-70)
	ctx.fillText("misses", WIDTH-35, HEIGHT-60)
	ctx.fillText("-----------", WIDTH-38, HEIGHT-50)
	ctx.fillText(healthLeft + " health", WIDTH-37, HEIGHT-40)
}
