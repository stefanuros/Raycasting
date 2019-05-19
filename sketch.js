
// function to check if its a desktop or mobile
// Variable that determines if the mouse is active for controlling
var mouseActive = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}();

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
	fov: 90,
	// How fast it turns
	turnSpeed: 3
};


// An object of all of the form features (buttons, sliders, etc)
var form = {
	resetPlayerButton: null,
	speedSlider: null,
	mouseActive: null
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
var terrain = [
	[0, 0, 400, 0],
	[400, 0, 400, 400],
	[400, 400, 0, 400],
	[0, 400, 0, 0],
	[30, 100, 100, 60],
	[60, 250, 170, 300],
	[260, 150, 370, 200],
	[300, 120, 330, 300],
	[100, 200, 200, 100],
	[370, 200, 330, 300],
	[270, 50, 350, 70],
	[200, 200, 250, 350],
	[160, 30, 230, 150],
	[50, 370, 100, 320]
];

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

	// Configuring mouse movement
	form.mouseActive = createCheckbox("Use mouse", mouseActive);
	form.mouseActive.changed(checkIfMouseActive);
}

// Loop
function draw()
{
	// Clear screen
	background(15);

	// Drawing the rays
	drawRays();

	// Draw terrain
	drawTerrain();

	// Move player
	if(mouseActive)
	{
		getPlayerRotation();
	}
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

function checkIfMouseActive()
{
	if (this.checked())
	{
		mouseActive = true;
	}
	else
	{
		mouseActive = false;
	}
}

// Function for drawing the terrain
function drawTerrain()
{
	for(var i = 0; i < terrain.length; i++)
	{
		push();
		
		stroke(255);
		line(terrain[i][0], terrain[i][1], terrain[i][2], terrain[i][3])
	}
}

function drawRays()
{
	// Draw the starting point for the rays
	push();
	stroke(255, 0, 0);
	point(player.x, player.y);
	pop();
	push();
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
	if(mouseActive)
	{
		mp = true;
	}
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
		// newX += player.speed * Math.sin(rad + (90 * PI / 180));
		// newY -= player.speed * Math.cos(rad + (90 * PI / 180));
		player.dir += player.turnSpeed * 1;

		// Bring it back in a circle
		player.dir = ( player.dir == 271 ? -90 : player.dir );
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
		// newX += player.speed * Math.sin(rad + (270 * PI / 180));
		// newY -= player.speed * Math.cos(rad + (270 * PI / 180));
		player.dir -= player.turnSpeed * 1;

		// Bring it back in a circle
		player.dir = ( player.dir == -91 ? 270 : player.dir );
	}

	// Dont change position if player is near mouse to prevent jittering
	if(abs(player.x-mouseX) > 10 || !mouseActive)
	{
		player.x = newX;
	}
	if(abs(player.y-mouseY) > 10 || !mouseActive)
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
	// Move to the player
	translate(Math.floor(player.x), Math.floor(player.y));
	
	// Rotate the player
	rotate(player.dir);
	
	// Draw the player
	stroke(255);
	noFill();
	// beginShape();
	// vertex(0, -10);
	// vertex(-5, 10);
	// vertex(0, 5);
	// vertex(5, 10);
	// endShape(CLOSE);

	// Starting at a weird number to keep the starting point for rays inside 
	// the player but also to make them start near the front of the player
	beginShape();
	vertex(0, -3);
	vertex(-5, 17);
	vertex(0, 12);
	vertex(5, 17);
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
