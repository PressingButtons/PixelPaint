
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
