//Screen
let SCREEN_X = 1100; 
let SCREEN_Y = 1100;

//Camera 
let FOV = Math.PI/2
let ASPECT_RATIO = SCREEN_X/SCREEN_Y
let FOCAL_LENGTH = 80; 

//Viewport size, or size of the canvas
let VIEWPORT_HEIGHT= Math.round(2 * FOCAL_LENGTH * Math.tan(FOV/2)); 
let VIEWPORT_WIDTH = VIEWPORT_HEIGHT * ASPECT_RATIO; 

//Place camera in middle of canvas 
let CAMERA_POS = [VIEWPORT_WIDTH/2, VIEWPORT_HEIGHT/2, 0]; 

//Colors
let BG_COLOR = [149, 203, 245]; 
let BG_COLOR2 = [255, 243, 242]; 

//Distance limits 
let t_MIN = -1.0001; 
let t_MAX = 11; 

//Recursion limit for rayTracing
let RAY_RECURSION_LIMIT = 3; 
//Shading 
let SHADOW_EPSILON = [0.1, 0.1, 0.1]; 

//Sets canvas size
function setCanvasSize() { 
    ctx.canvas.width  = VIEWPORT_WIDTH;
    ctx.canvas.height = VIEWPORT_HEIGHT;
}
