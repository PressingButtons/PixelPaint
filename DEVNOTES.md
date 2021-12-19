
# 9/15/2021

##First entry

Creating this log to document my thoughts as this project progresses.
This update features enhancements to the user interface as well as interactivity with the graphic panel via mouse.

The user is able to swap colors and opacity of said color. However, I need to learn more about WebGL
so the opacity is taken into account if the cursor retraces previously filled section.

I'm also trying to figure out a method to allow undo's/tracking of actions performed on the canvas.
Unlike context2D, there doesn't seem to be a function that would gather bitmapdata.
Possible alternatives can include logging every action and refilling the buffer with those values to recreate the image.
Still investigating.

###Noted hurdle

Trying to create consistent brush strokes leads to an interesting dilemma via webGL.
Currently users can create a 1 pixel wide brush stroke, from what I gather there are two routes to take.

1. Construct line segements as triangles, possibly round out the end points based on the angle between.
2. Create a brush "texture" and draw that texture in between two points enough times that there is continuous overlap.

There's a bit of a draw to option 2 as if the system work, custom brushes could be implemented.

#9/18/2021

##Brush updates

Attempted to create a contiguous line using triangles to lackluster result. Refining required in both knowledge of trigonometry and implementation.
Shifted design focus away for purely generating the brush shape via math/triangles and instead using textures.
Future plans for creating brushes of various shapes and possibly for custom brushe shapes for import.

#12/16/2021

##The Return

It's been quite some time since the last update. In that hiatus I've worked on other projects and learned some new technologies.
For the purpose of this application, I'm simplifying it. Drawing will be handled by cavnas2d instead of webgl.
I've also removed express and have instead opted for a simple server for hosting responsibilities.
