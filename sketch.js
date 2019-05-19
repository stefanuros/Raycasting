
var player = {
	// The position of the player
	x: 100,
	y: 100,
	// The orientation of the player in degrees
	dir: 90, // 0 is up, 90 is right ...
	// How far the player can see
	sight: 1000,
	// How fast the player moves
	speed: 1,
	// The field of view of the player in degrees
	fov: 90
};

// An object of all of the form features (buttons, sliders, etc)
var form = {
	resetPlayerButton: null,
	speedSlider: null
};

// Min and Max of both top and bottom
var specs = {
	total: {
		width: 400,
		height: 800
	},
	top: {
		x: {
			min: 0,
			max: 400
		},
		y: {
			min: 0,
			max: 400
		}
	},
	bot: {
		x: {
			min: 0,
			max: 400
		},
		y: {
			min: 400,
			max: 800
		}
	}
};

// Variable to keep track of which keys are pressed. Starts with up and moves cw
var kp = [false, false, false, false];
var mp = false;

// The list of lines that will be checked against raycasting
var terrain = [];

// Runs one time on start
function setup()
{
	angleMode(DEGREES);

	// Create the canvas
	createCanvas(specs.total.width, specs.total.height);

	// Create the reset player button
	form.resetPlayerButton = createButton("Reset Player");
	form.resetPlayerButton.mousePressed(resetPlayer);

	// Creating a slider for speed
	form.speedSlider = createSlider(1, 3, 1, 1);
}

// Loop
function draw()
{
	// Clear screen
	background(15);

	// Move player
	getPlayerRotation();
	getPlayerMovement();
	drawPlayer();

	// Drawing the first person view
	drawFirstPerson();

	// Draw dividing line
	stroke(255);
	line(0, specs.total.height/2, specs.total.width, specs.total.height/2);

	// Get the player speed from the slider
	player.speed = form.speedSlider.value();
}

// Function to get player direction
function getPlayerRotation()
{
	push();
	// Move to the player
	translate(Math.floor(player.x), Math.floor(player.y));
	// Get the direction the player is facing
	player.dir = atan2(mouseY - Math.floor(player.y), mouseX - Math.floor(player.x)) + 90;
	pop();
}

// Functions to figure out which direction to move the player
function keyPressed()
{
	if(keyCode === UP_ARROW || keyCode === 87)
	{
		kp[0] = true;
	}
	if(keyCode === RIGHT_ARROW || keyCode === 68)
	{
		kp[1] = true;
	}
	if(keyCode === DOWN_ARROW || keyCode === 83)
	{
		kp[2] = true;
	}
	if(keyCode === LEFT_ARROW || keyCode === 65)
	{
		kp[3] = true;
	}
}

// Does the same as pressing forward
function mousePressed()
{
	mp = true;
}

// Same as releasing forward
function mouseReleased()
{
	mp = false;
}

function keyReleased()
{
	if(keyCode === UP_ARROW || keyCode === 87)
	{
		kp[0] = false;
	}
	if(keyCode === RIGHT_ARROW || keyCode === 68)
	{
		kp[1] = false;
	}
	if(keyCode === DOWN_ARROW || keyCode === 83)
	{
		kp[2] = false;
	}
	if(keyCode === LEFT_ARROW || keyCode === 65)
	{
		kp[3] = false;
	}
}

function getPlayerMovement()
{
	// Convert degrees to radians
	var rad = (player.dir) * PI / 180;

	var newX = player.x;
	var newY = player.y;

	// UP
	if(kp[0] || mp)
	{
		newX += player.speed * Math.sin(rad);
		newY -= player.speed * Math.cos(rad);
	}

	// RIGHT
	if(kp[1])
	{
		newX += player.speed * Math.sin(rad + (90 * PI / 180));
		newY -= player.speed * Math.cos(rad + (90 * PI / 180));
	}

	// DOWN
	if(kp[2])
	{
		newX += player.speed * Math.sin(rad + (180 * PI / 180));
		newY -= player.speed * Math.cos(rad + (180 * PI / 180));
	}

	// LEFT
	if(kp[3])
	{
		newX += player.speed * Math.sin(rad + (270 * PI / 180));
		newY -= player.speed * Math.cos(rad + (270 * PI / 180));
	}

	// Dont change position if player is near mouse to prevent jittering
	if(abs(player.x-mouseX) > 10)
	{
		player.x = newX;
	}
	if(abs(player.y-mouseY) > 10)
	{
		player.y = newY;
	}
}

// Function that brings the player back to the canvas
function resetPlayer()
{
	player.x = 100;
	player.y = 100;
}

// Function to draw the player
function drawPlayer()
{
	push();

	// Move to the player
	translate(Math.floor(player.x), Math.floor(player.y));
	// Rotate the player
	rotate(player.dir);

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

// Function that draws the first person view
function drawFirstPerson()
{
	push();

	fill(0);
	stroke(0);
	rect(specs.bot.x.min, specs.bot.y.min, specs.bot.x.max, specs.bot.y.max);
	
	pop()
}
