// The position of the player
var x = 100;
var y = 100;
// The orientation of the player
var dir = 90; // 0 is up, 90 is right ...
// How far the player can see
var sight = 1000;

// Runs one time on start
function setup()
{
	angleMode(DEGREES);

	// Create the canvas
	createCanvas(400, 800);
}

// Loop
function draw()
{
	// Clear screen
	background(15);

	// Move player
	getPlayerMovement();
	drawPlayer();

	// Draw dividing line
	stroke(255);
	line(0, 400, 400, 400)
}

function getPlayerMovement()
{
	push();
	// Move to the player
	translate(x,y);
	// Get the direction the player is facing
	dir = atan2(mouseY - y, mouseX - x) + 90;
	pop();
}

// Function to draw the player
function drawPlayer()
{
	push();

	// Move to the player
	translate(x, y);
	// Rotate the player
	rotate(dir);

	// Draw the player
	stroke(255);
	noFill();
	beginShape();
	vertex(0, -10);
	vertex(-5, 10);
	vertex(0, 5);
	vertex(5, 10);
	endShape(CLOSE);
	
	pop();
}
