/**
* Title: 
* Author: Seb W
* Date Started: 10/05/2021 (dd/mm/yyyy)
* Version: pre
* Last updated: 19/06/2020 (dd/mm/yyyy)
**/

console.log("Game JS Loaded")

// Some constants that will be used in this script
const GAME_WIDTH = 600
const GAME_HEIGHT = 600
const WIDTH = 645
const HEIGHT = 600
const LINE_SIZE = 10
const CIRCLE_RADIUS = 30
const CURSOR_RADIUS = 7
const FRAMERATE = 60

// Most of the variables that will be used
var ctx
var canvasUpdateSpeed
var score = 0
var combo = 0
var clicsTopScore = window.localStorage.getItem('clicsTopScore');
var framesToCircleSpawn = 62
var circleXPosition
var circleYPosition
var linesPositions = -4
var lineXPosition
var lineYPosition
var linesSpeed = 2
var lineMovement = "down"
var gameActive = 0
var gameStarted = 0
var healthLeft = 3
var misses = 0
var muted = 1
var pauseAlpha = 0
var mouseXPosition
var mouseYPosition
var showDistances
var died = false
var mainMenuText = "WELCOME"

var circleArray = []

// Image variables
var audioImage = new Image()
var healthLeftImage = new Image()
var playPauseButtons = new Image()
var pausedBorder = new Image()
var cursorImage = new Image()
var circleImage = new Image()

// image sources that will not be changed
pausedBorder.src = "Paused_Border.png" // set the paused border image
cursorImage.src = "cursor.png" // set the cursor image
circleImage.src = "circle.png" // set the circle image

window.onload=startCanvas
function startCanvas(){
	// The startCanvas() function sets up the game. 
	// Everthing that loads on startup is here
	ctx=document.getElementById("myCanvas").getContext("2d")
	
	// Change speeds and scores based on framerate
	canvasUpdateSpeed = 1000/FRAMERATE

	// Call the loadSideBar funtion to load the icons repeatedly (for some reason function is broken when called here)
	menuLoad = setInterval(mainMenu, 16)
}

function mainMenu(){
	// Clear the frame
	ctx.fillStyle="#ff0000"
	ctx.fillRect(0,0,WIDTH,HEIGHT)	

	// create a box to hold all of the paused text
	ctx.fillStyle="#ffffffe0"
	ctx.fillRect(35, 35, GAME_HEIGHT-70, GAME_WIDTH-70)
	ctx.drawImage(pausedBorder, 25, 25) // Draw the audio icon that has been set
	// Write all of the text over the paused box
	ctx.fillStyle="#000000a0"
	ctx.font="50px Arial"
	ctx.fillText(mainMenuText, 125, 85)
	
	ctx.fillStyle="#0000ff"
	ctx.font="9px Arial"
	
	// Draw the cursor
	ctx.drawImage(cursorImage, mouseXPosition, mouseYPosition)

	// Call the function that loads (or updates) the sidebar
	loadSideBar()
}

function updateMainGame(){
	// The updateMainGame() function contains the main game loop
	// It is run once every frame. Most of the game code will go here

	// Clear the frame
	ctx.fillStyle="#ffffff50"
	ctx.fillRect(0,0,WIDTH,HEIGHT)	

	// (Temporary) load the scoring system
	ctx.fillStyle="#000000"
	ctx.fillText(Math.floor(score), 10, 10)

	// load all the current circles into the frame
	var circleNumber = 0 // Start at drop 0
	while (circleNumber < circleArray.length){ // Keep going until you get to the last circle
		ctx.drawImage(circleImage, circleArray[circleNumber].circleXPosition-25, circleArray[circleNumber].circleYPosition-25) // draw the image of the circle
		circleNumber++
	}

	// Set the colour for the lines to black
	ctx.fillStyle="black"
	// Set the line X and Y positions to match the linesPositions vari`able
	lineXPosition=linesPositions
	lineYPosition=linesPositions
	// Draw the two main lines
	ctx.fillRect(0,lineYPosition,GAME_HEIGHT,LINE_SIZE)
	ctx.fillRect(lineXPosition, 0, LINE_SIZE, GAME_WIDTH)
	
	if (gameActive == 1) { // Checks if game should be paused or not
		// checks if the lines are ouside their set border
		if(linesPositions > GAME_HEIGHT-7){
			linesPositions = GAME_HEIGHT-5 // 
		} else if( linesPositions < -7) {
			linesPositions = -5
		}
		// changes the line location
		linesPositions = linesPositions + linesSpeed
		
		// changes the line speed when the lines hit edge of the canvas
		if (linesPositions > GAME_HEIGHT-5 || linesPositions < -5) {
			linesSpeed = linesSpeed*-1
			// some circles will be connected to the lineMovement variable when set to up and others when it's set to down
			if (lineMovement == "down") {
				lineMovement = "up"
			} else {
				lineMovement = "down"
			}
		}
		
		// Counts time to circles spawn every frame and then spawn circles.
		if(framesToCircleSpawn > 0){ // checks if the frames left to the next circle being spawned is more than 0 .
			framesToCircleSpawn = framesToCircleSpawn-1 // remove one frame until the next circle is spawned.
		} else { // If the frames left to the next circle being spawned is not more than 0 
			framesToCircleSpawn=FRAMERATE // reset the framesToCircleSpawn variable
			circleArray.push(new Circle()) // spawn a circle
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

	// Call the loadSideBar funtion to load the icons
	loadSideBar()

	circleNumber = 0 // Start at drop 0
	while (circleNumber < circleArray.length){ // Keep going until you get to the last drop
		if (circlePassed(circleArray[circleNumber].circleXPosition, circleArray[circleNumber].circleYPosition)){ // Check the drop's xPosition and yPosition
			circleArray.shift(); // remove the last circle
			combo = 0 // reset the combo
			misses++ // add to the misses
		}
		circleNumber ++ // Do the next circle
	}

	ctx.drawImage(cursorImage, mouseXPosition-((cursorImage.width+1)/2), mouseYPosition-((cursorImage.height+1)/2)) // draw the cursor image where the mouse clicks

	if(showDistances=="true") {
		var circleNumber = 0 // Start at drop 0
		while (circleNumber < circleArray.length){ // Keep going until you get to the last circle
			// set the distances from the centers
			var mouseXDistance = mouseXPosition - circleArray[circleNumber].circleXPosition
			var mouseYDistance = mouseYPosition - circleArray[circleNumber].circleYPosition
			// set the distance from the edges (I said full distance)
			var mouseFullDistance = Math.sqrt(mouseXDistance*mouseXDistance + mouseYDistance*mouseYDistance)
			// fill text showing the distances
			ctx.fillText("Mouse X distance (from centers): " + mouseXDistance,30,110)		
			ctx.fillText("Mouse Y distance (from centers): " + mouseYDistance,30,130)		
			ctx.fillText("Mouse Full distance (From edges): " + Math.ceil(mouseFullDistance - CIRCLE_RADIUS - CURSOR_RADIUS),30,150)
			circleNumber++	// move on to the next circle
		}
	}

	if(healthLeft == 0) {
		mainMenuText = "YOU LOST"
		clearInterval(timer);			
		menuLoad = setInterval(mainMenu, 16)
		gameActive = 0
		gameStarted = 0
	} else if(score > 1000) {
		mainMenuText = "YOU WIN"
		clearInterval(timer);			
		menuLoad = setInterval(mainMenu, 16)
		gameActive = 0
		gameStarted = 0
	}
}

// what to do everytime a circle is spawned
class Circle{
	constructor(x){
		// set the x and y possitions to 10
		this.circleXPosition = linesPositions + 95
		this.circleYPosition = linesPositions + 95
		// Detect if a number is even or odd then set either the circleXPosition (if it's an even number) 
		// or circleYPosition (if it's an odd number) to a random possition (min and max dependant on line possition)
		// I am aware this is likely not the best or easiest randomisation option but it is the first that came to my head.
		var lineRandomiser = Math.floor(Math.random()*10)

		if(lineRandomiser % 2 == 0) {
			console.log("even") // close to horizontal line, random distance from vertical line
			if (lineMovement == "up") {
				this.circleXPosition = Math.floor(Math.random()*(linesPositions-75))
				this.circleYPosition = linesPositions - 75
			}	else {
				this.circleXPosition = GAME_WIDTH - Math.floor(Math.random()*(GAME_WIDTH-linesPositions))
				this.circleYPosition = linesPositions + 75
			}

			// Draw a circle (this will be drawn over in the update canvas funtion so it will create a popping effect rather than staying)
			ctx.beginPath();
			ctx.arc(this.circleXPosition, this.circleYPosition, 30, 0, 2 * Math.PI);
			ctx.lineWidth = 3;
			ctx.stroke();
		} else {
			console.log("odd")
			if (lineMovement == "up") {
				this.circleYPosition = Math.floor(Math.random()*(linesPositions-75))
				this.circleXPosition = linesPositions - 75
			}	else {
				this.circleYPosition = GAME_HEIGHT - Math.floor(Math.random()*(GAME_HEIGHT-linesPositions))
				this.circleXPosition = linesPositions + 75
			}

			// Draw a circle (this will be drawn over in the update canvas funtion so it will create a popping effect rather than staying)
			ctx.beginPath();
			ctx.arc(this.circleXPosition, this.circleYPosition, 30, 0, 2 * Math.PI);
			ctx.lineWidth = 3;
			ctx.stroke();
		}
	}
}

function circlePassed(circleXPosition, circleYPosition) {
	if(linesPositions+5 > circleXPosition+30 && 
		lineMovement == "down" || 
		linesPositions+5 > circleYPosition+30 &&
		lineMovement == "down" ||
		linesPositions+5 < circleXPosition-30 && 
		lineMovement == "up" || 
		linesPositions+5 < circleYPosition-30 &&
		lineMovement == "up"
		){
		// The raindrop has hit the umbrella, return true
		return(true)
	}else{
		// The raindrop has not hit the umbrella, return false
		return(false)
	}
}

window.addEventListener('keydown', keyDownFunction) // when a key is pressed call the keyDownFuntion
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key // set what key has been pressed to the keyDown variable
	console.log("A key was pressed, the key was", keyDown) // log the key that was pressed into console
	if (gameActive == 0) { // if the game is not active then start/unpause the game
		gameActive = 1
		score = 0
		misses = 0
		linesPositions = -4
		// This timer sets the framerate.
		// 10 means 10 milliseconds between frames (100 frames per second)
		if (gameStarted == 0) { // this if function is used as not to allow a bug to pass through
			clearInterval(menuLoad);			
			timer = setInterval(updateMainGame, canvasUpdateSpeed)
			gameStarted = 1
		}
	} else if (keyDown == "Escape" || keyDown == "1") { // Checks if escape is pressed and the game is going.
		gameActive = 0 // Set the game to it's paused state.
		alphaPause = 0 // Set the pause menu to be fully opaque.
	} else if(keyDown == "9") {
		if(showDistances == "false") {
			showDistances = "true"
		} else {
			showDistances = "false"
		}
	}else if(/^[a-zA-Z]/.test(keyDown)){
		var circleNumber = 0 // Start at drop 0
		while (circleNumber < circleArray.length){ // Keep going until you get to the last circle
			// set the distances from the centers
			var mouseXDistance = mouseXPosition - circleArray[circleNumber].circleXPosition
			var mouseYDistance = mouseYPosition - circleArray[circleNumber].circleYPosition
			// set the distance from the edges (I said full distance)
			var mouseFullDistance = Math.sqrt(mouseXDistance*mouseXDistance + mouseYDistance*mouseYDistance)
			if(Math.ceil(mouseFullDistance - CIRCLE_RADIUS - CURSOR_RADIUS)<1){
				console.log("HIT!")
				combo++
				score = score + 100 + combo
				circleArray.splice(circleNumber, 1); 

			}
			circleNumber++	// move on to the next circle
		}
	}
}

// everytime the mouse moves
window.addEventListener('mousemove', mouseMovedFunction)
// draw the cursor to a different position
function mouseMovedFunction(mouseEvent){
	mouseXPosition = mouseEvent.offsetX; // the offsetX property is the x position on the canvas
    mouseYPosition = mouseEvent.offsetY; // the offsetY property is the y position on the canvas
}

function loadSideBar() {
	// Clear the icon section of the frame
	ctx.fillStyle="#ffffff"
	ctx.fillRect(GAME_WIDTH,0,WIDTH-GAME_WIDTH,HEIGHT)

	// Draws the border between the main game and 
	ctx.fillStyle="#c00000"
	ctx.fillRect(GAME_WIDTH, 0, 6, GAME_HEIGHT)

	// Set the size, font and colour for future text written
	ctx.font="10px Arial"
	ctx.fillStyle="green"

	// checks if audio should be muted or not
	if (muted == 1) {
		audioImage.src = "AudioImages/Audio_Muted.png" // set the audio icon to
	} else {
		audioImage.src = "AudioImages/Audio.png"
	}
	ctx.drawImage(audioImage, WIDTH-33, 5) // Draw the audio icon that has been set
	ctx.fillText("Audio", WIDTH-34, 42)
	ctx.fillText("not", WIDTH-28, 52)
	ctx.fillText("usable", WIDTH-34, 62)

	playPauseButtons.src = "PlayButtonImages/" + gameActive + ".png" // Set the play button image
	ctx.drawImage(playPauseButtons, WIDTH-34, 68) // Draw the audio icon that has been set
	ctx.fillText("Press 1", WIDTH-36, 107)

	ctx.font="40px Arial" // Set the font size for the score
	var scoreDigit = 0
	for (var scoreDigit = 0, len = score.toString().length; scoreDigit < len; scoreDigit++) {
		ctx.fillText((score.toString()[scoreDigit]), WIDTH-30, 150+(45*scoreDigit));
	}	  

	healthLeft = 3 - misses // set how much health is left
	if (misses == 1 || misses == 2 || misses == 3 || misses == 0) { // If the misses are a number that is possible
		healthLeftImage.src = "HealthImages/" + healthLeft + "HealthLeft.png" // show the health image
	} else { // If the misses are a number that is not supposed to be possible
		misses = 3 // Instantly fail you (because you probably cheated the number)
	}
	ctx.drawImage(healthLeftImage, WIDTH-34, HEIGHT-35) // Draw the audio icon that has been set
	// Text for all your health info
	ctx.font="10px Arial" // Reset the font size
	ctx.fillText(misses+"/3", WIDTH-26, HEIGHT-70)
	ctx.fillText("misses", WIDTH-35, HEIGHT-60)
	ctx.fillText("-----------", WIDTH-38, HEIGHT-50)
	ctx.fillText(healthLeft + " health", WIDTH-37, HEIGHT-40)
}
