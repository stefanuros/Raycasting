#Raycasting Experiment

This little project was created so that I could learn about how 3D graphics were
generated before 3D graphics were able to be generated. My muse was 
"Wolfenstein 3D". I attempted to recreate a little arena using the same concept
that would have been used to create the graphics for that game. 

If you would like to play around with it yourself, go to [this website](http://sturos.net/Raycasting/).

## How it works
I built this using javascript and the p5.js graphics library.

The play shoots out a number of "rays" that check if they have collided with something.
If they have collided, a vertical bar is drawn on the bottom screen. The height
of the bar is dependant on the distance the "ray" travelled without hitting the
obstacle. The closer the obstacle is, the taller the bar is drawn. The distance 
also affects the opacity of the bar to give the effect of fog. This simulates
the existance of walls in first person using these "rays". This is repeated once
for each ray that is being shot out.

## Screenshots
This is a regular show of the experiment. In the top left is the top down view of
the area. 

Below that is the first person view. 

To the right are the settings.
There you can control how the player is controlled, the speed, turn speed, how far
the rays travel, the field of view of the rays, and the density of the rays. Not
shown is the fisheye setting that attemps to remove some of the fisheye effect that 
exists in the first person view.

![Regular Shot](/assets/regularShot.png)


Shown below is an example of what happens when the field of view slider is moved.
The field of view is wider but that creates squashed first person views.

![Field Of View Example](/assets/fieldOfView.png)

Shown below is an example of how changing the density can affect how detailed the
obstacles appear in the first person view. Each vertical bar corresponds with one
red ray.

![Ray Density Example](/assets/rayDensity.png)

Shown below is a gif of the movement and how the top and bottom views correspond.
![Moving Example](/assets/example.gif)

A longer example exists in the assets folder
