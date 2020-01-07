var eye_point = new Vector3([130,130,30]);
var look_at_point = new Vector3([0,0,30]);
// var eye_point = new Vector3([35,35,10]);
// var look_at_point = new Vector3([0,0,10]);

var head_vec_y = new Vector3([0,0,1]);
var zoom = 30;
var zoomed = false;
var zoomRate = 0;
var moveInRate = 0;
var moveIned = false;
var verticalMoved = false;
var verticalRate = 0;
var strafeRate = 0;
var strafed = false;
var hoverRate = 0;
var hovered = false;
var rotateY = 0;
var rotateYed = false;
var rotateZ = 0;
var rotateZed = false;
var movement = false;
var movementVec = new Vector3([0,0,0]);
var displacement = [0,0,67];


var perspectiveCam = new Camera([eye_point, look_at_point, head_vec_y]);
var displacementCam = new Camera([new Vector3(displacement),new Vector3([0,0,68]) ,new Vector3([0,0,1])])
// console.log(displacementCam)
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);




function updateScreen() {
    var ep = perspectiveCam.eye_point.elements.slice();
    var epl = [];
    var lap = perspectiveCam.look_at_point.elements.slice();
    var lapl = [];
    var hv = perspectiveCam.head_vec_y.elements.slice();
    var hvl = [];
    for (var i = 0; i <3; i ++) {
      epl.push(ep[i].toFixed(2).toString());
      lapl.push(lap[i].toFixed(2).toString());
      hvl.push(hv[i].toFixed(2).toString());

    }
    document.getElementById('camera').innerHTML = 'eye_point: ' + epl
                                                  + "  look_at_point: "  + lapl
                                                  + "  head_vector: " + hvl
                                                  + "  zoom angle: " + zoom.toFixed(2).toString();
  };
function cameraDraw(camera, vp) {
    modelMatrix.setIdentity();    
    perspective(camera);
    updateModelMatrix(modelMatrix);
    pushMatrix(modelMatrix);
    PopAndPush();
    scale([1000,1000,1000]);
    updateModelMatrix(modelMatrix);
    PopAndPush();
    updateModelMatrix(modelMatrix);
}

function perspective(modelMatrix) {
  
    // zoomAnimation();
    // moveInLookDirection(perspectiveCam);
    // strafe(perspectiveCam);
    // hover(perspectiveCam);
    // rotateYaxis(perspectiveCam);
    // rotateZaxis(perspectiveCam);
    // verticalMov(perspectiveCam);
    modelMatrix.setPerspective(zoom, 				// fovy: y-axis field-of-view in degrees 	
    // (top <-> bottom in view frustum)
    gl.drawingBufferWidth/gl.drawingBufferHeight, // aspect ratio: width/height
                1, 500);	// near, far (always >0).

      var e = perspectiveCam.eye_point.elements;
      var l = perspectiveCam.look_at_point.elements;
      var h = perspectiveCam.head_vec_y.elements;
      modelMatrix.lookAt(e[0],e[1],e[2], 					// 'Center' or 'Eye Point',
              l[0],l[1],l[2],					// look-At point,
              h[0],h[1],h[2]);
  
}
function zoomAnimation(){
    if (zoomed) {
      zoom = (zoom + zoomRate + 360 + 0.00001) % 360;
    }
  }
  
  function moveInLookDirection(camera) {
    if(moveIned) {
      camera.eye_point = camera.eye_point.add(camera.look_vec.scalarMultiply(moveInRate));
      camera.look_vec_un = camera.look_at_point.substract(camera.eye_point);
      // console.log(camera.eye_point.elements)
    }
  
  }
  
  function strafe(camera) {
    if (strafed) {
      camera.eye_point = camera.eye_point.add(camera.head_vec_x.scalarMultiply(strafeRate));
      camera.look_at_point = camera.eye_point.add(camera.look_vec_un);
    }
  }
  
  function verticalMov(camera) {
    if (verticalMoved) {
      camera.eye_point = camera.eye_point.add(camera.head_vec_y.scalarMultiply(verticalRate));
      camera.look_at_point = camera.eye_point.add(camera.look_vec_un);
    }
  }
  
  function rotateZaxis(camera) {
    if (rotateZed){
      var qT = new Quaternion(0,0,0,1);
      var y = camera.look_vec.elements;
      qT.setFromAxisAngle(y[0], y[1], y[2], rotateZ);
      var vTmp = new Vector3();
      // console.log(camera.look_vec_un.elements);
      qT.multiplyVector3(camera.head_vec_y, vTmp);
      camera.head_vec_y = vTmp;
      var vTmp2 = new Vector3();
      // console.log(camera.head_vec_y.elements);
      qT.multiplyVector3(camera.head_vec_x, vTmp2);
      camera.head_vec_x = vTmp2
    
  
    }
  
  }
  
  function rotateYaxis(camera) {
    if (rotateY) {
  
      var qT = new Quaternion(0,0,0,1);
      var y = camera.head_vec_y.normalize().elements;
      qT.setFromAxisAngle(y[0], y[1], y[2], rotateY);
      var vTmp = new Vector3();
      // console.log(camera.look_vec_un.elements);
      qT.multiplyVector3(camera.look_vec_un, vTmp);
      camera.look_vec_un = vTmp;
      camera.look_at_point = camera.eye_point.add(camera.look_vec_un);
      camera.look_vec = camera.look_at_point.substract(camera.eye_point).normalize();
      camera.head_vec_x = camera.look_vec.cross(camera.head_vec_y);
    }
  
  
  
  
  }
  
  function hover(camera) {
  
    if (hovered) {
  
      var qT = new Quaternion(0,0,0,1);
      var x = camera.head_vec_x.normalize().elements;
      // console.log(hoverRate);
      qT.setFromAxisAngle(x[0], x[1], x[2], hoverRate);
      var q = new Quaternion(0,0,0,1);
      // q.multiply(qT, qCamera);
      // qCamera.copy(q);
  
      var vTmp = new Vector3();
      // console.log(camera.look_vec_un.elements);
      qT.multiplyVector3(camera.look_vec_un, vTmp);
      camera.look_vec_un = vTmp;
      // console.log(camera.look_vec_un.elements);
      camera.look_at_point = camera.eye_point.add(camera.look_vec_un);
      camera.look_vec = camera.look_at_point.substract(camera.eye_point).normalize();
      camera.head_vec_y = camera.head_vec_x.cross(camera.look_vec);
  
    }
  }



function keyDownHandler(ev) {
    // console.log(ev.keyCode);
    var kc = ev.keyCode;
    switch(kc) {
      case 81: changeMoveInLook(1); break; // Q
      case 65: changeStrafe(-1); break; // A
      case 69: changeMoveInLook(-1); break; // E
      case 68: changeStrafe(1); break; // D
      case 78: changeZoom(-1); break; // N
      case 77: changeZoom(0.5); break; // M
      case 73: changeHover(-2); break; // I
      case 75: changeHover(2); break; // K
      case 74: changeRotateY(-2); break; // J
      case 76: changeRotateY(2); break; // L
      case 85: changeRotateZ(-2); break; // U
      case 79: changeRotateZ(2); break; // O
      case 87: changeVertical(1); break; //W
      case 83: changeVertical(-1); break; //S
      case 32: changeMovement(); break; //Space
  
    }
    // }
  }
  
  
  function keyUpHandler(ev) {
    restoreZoom();
    restoreMoveInLook();
    restoreStrafe();
    restoreHover();
    restoreVertical();
    restoreRotateY();
    restoreRotateZ();
    // console.log(perspectiveCam)
    return;
  }
  function changeRotateZ(change) {
    rotateZ = -change/2;
    rotateZed = true;
  
  }
  function restoreRotateZ() {
    rotateZ = 0;
    rotateZed = false;
  
  }
  
  function changeRotateY(change) {
    rotateY = -change/2;
    rotateYed = true;
  
  }
  function restoreRotateY() {
    rotateY = 0;
    rotateYed = false;
  
  }
  function changeVertical(change) {
    verticalRate = change;
    verticalMoved = true;
  
  }
  
  function restoreVertical() {
    verticalRate = 0;
    verticalMoved = true;
  }
  function changeMovement() {
    if (!movement){
      movementVec = new Vector3([0, 0, -0.1]);
  
    }
    else {
      movementVec = new Vector3();
    }
    movement = !movement;
  
  }
  
  
  function changeHover(change){
    hoverRate = -change/2;
    hovered = true;
  }
  
  function restoreHover() {
    hoverRate = 0;
    hovered = false;
  }
  function changeStrafe(change) {
    strafeRate = change;
    strafed = true;
  }
  
  function restoreStrafe() {
    strafeRate = 0;
    strafed = false;
  }
  
  function changeMoveInLook(change){
    moveInRate = change;
    moveIned = true;
  }
  function restoreMoveInLook() {
    moveInRate = 0;
    moveIned = false;
  }
  
  function changeZoom(change){
    zoomRate = change;
    zoomed = true;
  }
  function restoreZoom(){
    zoomRate = 0;
    zoomed = false;
  }
  