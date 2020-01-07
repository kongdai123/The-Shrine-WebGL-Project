//3456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_
// (JT: why the numbers? counts columns, helps me keep 80-char-wide listings)
//
// TABS set to 2.
//
// ORIGINAL SOURCE:
// RotatingTranslatedTriangle.js (c) 2012 matsuda
// HIGHLY MODIFIED to make:




/* Show how to use 3 separate VBOs with different verts, attributes & uniforms. 
-------------------------------------------------------------------------------
	Create a 'VBObox' object/class/prototype & library to collect, hold & use all 
	data and functions we need to render a set of vertices kept in one Vertex 
	Buffer Object (VBO) on-screen, including:
	--All source code for all Vertex Shader(s) and Fragment shader(s) we may use 
		to render the vertices stored in this VBO;
	--all variables needed to select and access this object's VBO, shaders, 
		uniforms, attributes, samplers, texture buffers, and any misc. items. 
	--all variables that hold values (uniforms, vertex arrays, element arrays) we 
	  will transfer to the GPU to enable it to render the vertices in our VBO.
	--all user functions: init(), draw(), adjust(), reload(), empty(), restore().
	Put all of it into 'JT_VBObox-Lib.js', a separate library file.

USAGE:
------
1) If your program needs another shader program, make another VBObox object:
 (e.g. an easy vertex & fragment shader program for drawing a ground-plane grid; 
 a fancier shader program for drawing Gouraud-shaded, Phong-lit surfaces, 
 another shader program for drawing Phong-shaded, Phong-lit surfaces, and
 a shader program for multi-textured bump-mapped Phong-shaded & lit surfaces...)
 
 HOW:
 a) COPY CODE: create a new VBObox object by renaming a copy of an existing 
 VBObox object already given to you in the VBObox-Lib.js file. 
 (e.g. copy VBObox1 code to make a VBObox3 object).

 b) CREATE YOUR NEW, GLOBAL VBObox object.  
 For simplicity, make it a global variable. As you only have ONE of these 
 objects, its global scope is unlikely to cause confusions/errors, and you can
 avoid its too-frequent use as a function argument.
 (e.g. above main(), write:    var phongBox = new VBObox3();  )

 c) INITIALIZE: in your JS progam's main() function, initialize your new VBObox;
 (e.g. inside main(), write:  phongBox.init(); )

 d) DRAW: in the JS function that performs all your webGL-drawing tasks, draw
 your new VBObox's contents on-screen. 
 (NOTE: as it's a COPY of an earlier VBObox, your new VBObox's on-screen results
  should duplicate the initial drawing made by the VBObox you copied.  
  If that earlier drawing begins with the exact same initial position and makes 
  the exact same animated moves, then it will hide your new VBObox's drawings!
  --THUS-- be sure to comment out the earlier VBObox's draw() function call  
  to see the draw() result of your new VBObox on-screen).
  (e.g. inside drawAll(), add this:  
      phongBox.switchToMe();
      phongBox.draw();            )

 e) ADJUST: Inside the JS function that animates your webGL drawing by adjusting
 uniforms (updates to ModelMatrix, etc) call the 'adjust' function for each of your
VBOboxes.  Move all the uniform-adjusting operations from that JS function into the
'adjust()' functions for each VBObox. 

2) Customize the VBObox contents; add vertices, add attributes, add uniforms.
 ==============================================================================*/


// Global Variables  
//   (These are almost always a BAD IDEA, but here they eliminate lots of
//    tedious function arguments. 
//    Later, collect them into just a few global, well-organized objects!)
// ============================================================================
// for WebGL usage:--------------------
var gl;													// WebGL rendering context -- the 'webGL' object
																// in JavaScript with all its member fcns & data
var g_canvasID;									// HTML-5 'canvas' element ID#


// For animation:---------------------
var g_lastMS = Date.now();			// Timestamp (in milliseconds) for our 
                                // most-recently-drawn WebGL screen contents.  
                                // Set & used by moveAll() fcn to update all
                                // time-varying params for our webGL drawings.
  // All time-dependent params (you can add more!)
var g_angleNow0  =  0.0; 			  // Current rotation angle, in degrees.
var g_angleRate0 = 45.0;				// Rotation angle rate, in degrees/second.
                                //---------------
var g_angleNow1  = 100.0;       // current angle, in degrees
var g_angleRate1 =  20.0;        // rotation angle rate, degrees/sec
var g_angleMax2  = 60.0;       // max, min allowed angle, in degrees
var g_angleMin2  =  -60.0;
                                //---------------
var g_angleNow2  =  0.0; 			  // Current rotation angle, in degrees.
var g_angleRate2 = 60.0;				// Rotation angle rate, in degrees/second.

                                //---------------
var g_posNow0 =  0.0;           // current position
var g_posRate0 = 0.6;           // position change rate, in distance/second.
var g_posMax0 =  0.5;           // max, min allowed for g_posNow;
var g_posMin0 = -0.5;           
                                // ------------------
var g_posNow1 =  0.0;           // current position
var g_posRate1 = 0.5;           // position change rate, in distance/second.
var g_posMax1 =  1.0;           // max, min allowed positions
var g_posMin1 = -1.0;
                                //---------------

// For mouse/keyboard:------------------------
var g_show0 = 1;								// 0==Show, 1==Hide VBO0 contents on-screen.
var g_show1 = 1;								// 	"					"			VBO1		"				"				" 
var g_show2 = 1;                //  "         "     VBO2    "       "       "


function main() {
//=============================================================================
  // Retrieve the HTML-5 <canvas> element where webGL will draw our pictures:
  g_canvasID = document.getElementById('webgl');	
  // Create the the WebGL rendering context: one giant JavaScript object that
  // contains the WebGL state machine adjusted by large sets of WebGL functions,
  // built-in variables & parameters, and member data. Every WebGL function call
  // will follow this format:  gl.WebGLfunctionName(args);

  // Create the the WebGL rendering context: one giant JavaScript object that
  // contains the WebGL state machine, adjusted by big sets of WebGL functions,
  // built-in variables & parameters, and member data. Every WebGL func. call
  // will follow this format:  gl.WebGLfunctionName(args);
  //SIMPLE VERSION:  gl = getWebGLContext(g_canvasID); 
  // Here's a BETTER version:
  gl = g_canvasID.getContext("webgl", { preserveDrawingBuffer: true});
	// This fancier-looking version disables HTML-5's default screen-clearing, so 
	// that our drawMain() 
	// function will over-write previous on-screen results until we call the 
	// gl.clear(COLOR_BUFFER_BIT); function. )
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize each of our 'vboBox' objects: 
  worldBox.init(gl);		// VBO + shaders + uniforms + attribs for our 3D world,
                        // including ground-plane,     
  for (var i = 0; i < objectList.length; i ++){
    objectList[i].init(gl);
  }            
  gl.clearColor(0.2, 0.2, 0.2, 1);	  // RGBA color for clearing <canvas>

  
  // ==============ANIMATION=============
  // Quick tutorials on synchronous, real-time animation in JavaScript/HTML-5: 
  //    https://webglfundamentals.org/webgl/lessons/webgl-animation.html
  //  or
  //  	http://creativejs.com/resources/requestanimationframe/
  //		--------------------------------------------------------
  // Why use 'requestAnimationFrame()' instead of the simpler-to-use
  //	fixed-time setInterval() or setTimeout() functions?  Because:
  //		1) it draws the next animation frame 'at the next opportunity' instead 
  //			of a fixed time interval. It allows your browser and operating system
  //			to manage its own processes, power, & computing loads, and to respond 
  //			to on-screen window placement (to skip battery-draining animation in 
  //			any window that was hidden behind others, or was scrolled off-screen)
  //		2) it helps your program avoid 'stuttering' or 'jittery' animation
  //			due to delayed or 'missed' frames.  Your program can read and respond 
  //			to the ACTUAL time interval between displayed frames instead of fixed
  //		 	fixed-time 'setInterval()' calls that may take longer than expected.
  //------------------------------------

  var tick = function() {		    // locally (within main() only), define our 
                                // self-calling animation function. 
    requestAnimationFrame(tick, g_canvasID); // browser callback request; wait
                                // til browser is ready to re-draw canvas, then
    timerAll();  // Update all time-varying params, and
    drawAll();                // Draw all the VBObox contents
    };
  //------------------------------------
  tick();                       // do it again!
}

function timerAll() {
//=============================================================================
// Find new values for all time-varying parameters used for on-screen drawing
  // use local variables to find the elapsed time.
  var nowMS = Date.now();             // current time (in milliseconds)
  var elapsedMS = nowMS - g_lastMS;   // 
  g_lastMS = nowMS;                   // update for next webGL drawing.
  if(elapsedMS > 1000.0) {            
    // Browsers won't re-draw 'canvas' element that isn't visible on-screen 
    // (user chose a different browser tab, etc.); when users make the browser
    // window visible again our resulting 'elapsedMS' value has gotten HUGE.
    // Instead of allowing a HUGE change in all our time-dependent parameters,
    // let's pretend that only a nominal 1/30th second passed:
    elapsedMS = 1000.0/30.0;
    }
  // Find new time-dependent parameters using the current or elapsed time:
  // Continuous rotation:
  g_angleNow0 = g_angleNow0 + (g_angleRate0 * elapsedMS) / 1000.0;
  g_angleNow1 = g_angleNow1 + (g_angleRate1 * elapsedMS) / 1000.0;
  g_angleNow2 = g_angleNow2 + (g_angleRate2 * elapsedMS) / 1000.0;
  g_angleNow0 %= 360.0;   // keep angle >=0.0 and <360.0 degrees  
  // g_angleNow1 %= 360.0;   
  g_angleNow2 %= 360.0;
  if(g_angleNow2 > g_angleMax2) { // above the max?
    g_angleNow2 = g_angleMax2;    // move back down to the max, and
    g_angleRate2 = -g_angleRate2; // reverse direction of change.
    }
  else if(g_angleNow2 < g_angleMin2) {  // below the min?
    g_angleNow2 = g_angleMin2;    // move back up to the min, and
    g_angleRate2 = -g_angleRate2;
    }
  // Continuous movement:
  g_posNow0 += g_posRate0 * elapsedMS / 1000.0;
  g_posNow1 += g_posRate1 * elapsedMS / 1000.0;
  // apply position limits
  if(g_posNow0 > g_posMax0) {   // above the max?
    g_posNow0 = g_posMax0;      // move back down to the max, and
    g_posRate0 = -g_posRate0;   // reverse direction of change
    }
  else if(g_posNow0 < g_posMin0) {  // or below the min? 
    g_posNow0 = g_posMin0;      // move back up to the min, and
    g_posRate0 = -g_posRate0;   // reverse direction of change.
    }
  if(g_posNow1 > g_posMax1) {   // above the max?
    g_posNow1 = g_posMax1;      // move back down to the max, and
    g_posRate1 = -g_posRate1;   // reverse direction of change
    }
  else if(g_posNow1 < g_posMin1) {  // or below the min? 
    g_posNow1 = g_posMin1;      // move back up to the min, and
    g_posRate1 = -g_posRate1;   // reverse direction of change.
    }

}

function draw(box) {
  if(box.show != 0) {
    box.switchToMe();  // Set WebGL to render from this VBObox.
    box.adjust();		  // Send new values for uniforms to the GPU, and
  }
}

function drawAll() {
//=============================================================================
  // Clear on-screen HTML-5 <canvas> object:
  g_canvasID.width = window.innerWidth;
  g_canvasID.height = window.innerHeight* 0.8;
  gl = g_canvasID.getContext("webgl", { preserveDrawingBuffer: true});
  gl.viewport(0,0,	gl.drawingBufferWidth, gl.drawingBufferHeight);	
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);   // draw the back side of triangles
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

var b4Draw = Date.now();
var b4Wait = b4Draw - g_lastMS;

  zoomAnimation();
  moveInLookDirection(perspectiveCam);
  strafe(perspectiveCam);
  hover(perspectiveCam);
  rotateYaxis(perspectiveCam);
  rotateZaxis(perspectiveCam);
  verticalMov(perspectiveCam);
  updateScreen();


  if(g_show0 == 1) {	// IF user didn't press HTML button to 'hide' VBO0:
    draw(worldBox);
  }
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
    draw(objectList[i]);
  }

/* // ?How slow is our own code?  	
var aftrDraw = Date.now();
var drawWait = aftrDraw - b4Draw;
console.log("wait b4 draw: ", b4Wait, "drawWait: ", drawWait, "mSec");
*/
}

function VBO0toggle() {
//=============================================================================
// Called when user presses HTML-5 button 'Show/Hide VBO0'.
  if(g_show0 != 1) g_show0 = 1;				// show,
  else g_show0 = 0;										// hide.
  console.log('g_show0: '+g_show0);
}

function VBO1toggle() {
//=============================================================================
// Called when user presses HTML-5 button 'Show/Hide VBO1'.
  part1Box.toggle();
}

function VBO2toggle() {
  //=============================================================================
  // Called when user presses HTML-5 button 'Show/Hide VBO1'.
  part2Box.toggle();
}

function VBO1changeMat() {
  part1Box.incMat();
  console.log(part1Box.matNum)
}
function VBO2changeMat() {
  part2Box.incMat();
}
function VBO3changeMat() {
  part3Box.incMat();
}
function VBO4changeMat() {
  part4Box.incMat();
}
  
function groud_phong() {
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
    objectList[i].VERT_SRC = groud_phong_vert;
    objectList[i].FRAG_SRC = groud_phong_frag;
    objectList[i].init(gl);
  }
}

function groud_bling_phong() {
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
    objectList[i].VERT_SRC = groud_bling_phong_vert;
    objectList[i].FRAG_SRC = groud_phong_frag;
    objectList[i].init(gl);

  }
}

function phong_phong() {
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
    objectList[i].VERT_SRC = phong_phong_vert;
    objectList[i].FRAG_SRC = phong_phong_frag;
    objectList[i].init(gl);

  }
}
function phong_blin_phong() {
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
    objectList[i].VERT_SRC = phong_phong_vert;
    objectList[i].FRAG_SRC = phong_blin_phong_frag;
    objectList[i].init(gl);

  }
}

function turnOff(value) {
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
      objectList[i].on = value;
  }
}
function turnOff2(value) {
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
      objectList[i].on2 = value;
  }
}

function setLoc(x,y,z) {
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
      objectList[i].cameraPos2 = [parseFloat(x),parseFloat(y),parseFloat(z)];
  }
}

function att_mode0(){
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
      objectList[i].att_mode = 0
  }
}

function att_mode1(){
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
      objectList[i].att_mode = 1
  }
}
function att_mode2(){
  var i = 0;
  var l = objectList.length; 
  for (i = 0; i < l; i ++){
      objectList[i].att_mode = 2
  }
}

window.addEventListener("mousedown", myMouseDown); 
// (After each 'mousedown' event, browser calls the myMouseDown() fcn.)
window.addEventListener("mousemove", myMouseMove); 
window.addEventListener("mouseup", myMouseUp);
var isDrag = false;
var xMclik;
var yMclik;
var xMdragTot;
var yMdragTot;
function convertCVV(ev) {
  var rect = ev.target.getBoundingClientRect();	// get canvas corners in pixels
  var xp = ev.clientX - rect.left;									// x==0 at canvas left edge
  var yp = g_canvasID.height - (ev.clientY - rect.top);	// y==0 at g_canvasID bottom edge
  var x = (xp - g_canvasID.width/2)  / 		// move origin to center of g_canvasID and
          (g_canvasID.width/2);			// normalize g_canvasID to -1 <= x < +1,
  var y = (yp - g_canvasID.height/2) /		//										 -1 <= y < +1.
          (g_canvasID.height/2);
  return [x,y];
}

function myMouseDown(ev){  
  var loc = convertCVV(ev);
  isDrag = true;											// set our mouse-dragging flag
  xMclik = loc[0];													// record where mouse-dragging began
  yMclik = loc[1];
}

function myMouseMove(ev){
  if(isDrag==false) return;				
  var loc = convertCVV(ev);
  var x = loc[0];
  var y = loc[1];
  xMdragTot += (x - xMclik);					// Accumulate change-in-mouse-position,&
  yMdragTot += (y - yMclik);
  dragQuat(x - xMclik, y - yMclik, perspectiveCam);
	xMclik = x;													// Make NEXT drag-measurement from here.
	yMclik = y;
}

function myMouseUp(ev){
  var loc = convertCVV(ev);
  var x = loc[0];
  var y = loc[1];
  xMdragTot += (x - xMclik);					// Accumulate change-in-mouse-position,&
  yMdragTot += (y - yMclik);
  dragQuat(x - xMclik, y - yMclik, perspectiveCam);
  xMclik = x;													// Make NEXT drag-measurement from here.
  yMclik = y;
  isDrag = false;
}

function dragQuat(xdrag, ydrag, camera) {
  var qTmp = new Quaternion(0,0,0,1);
  var dist = Math.sqrt(xdrag*xdrag + ydrag*ydrag);
  var yd = camera.head_vec_y.scalarMultiply(ydrag);
  var xd = camera.head_vec_x.scalarMultiply(xdrag);
  var vec = xd.add(yd);
  var axis = vec.cross(camera.look_vec).toArray();
  qNew.setFromAxisAngle(axis[0] + 0.0001, axis[1] + 0.0001, axis[2]+ 0.0001, dist* 150.0);
  // qNew.setFromAxisAngle(-ydrag + 0.0001, xdrag + 0.0001, axis + , dist* 150.0);
  
  qTmp.multiply(qNew,qTot);
  qTot.copy(qTmp);
}


