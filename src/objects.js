function switchToPi(angle) {
  return (angle * 2 * Math.PI)/360.0;
}
var coordBox = new VBObox0();
coordBox.vboContents = new Float32Array(makeCoords()[0])
coordBox.vboVerts = new Float32Array(makeCoords()[1]);
var worldBox = new VBObox0();		  // Holds VBO & shaders for 3D 'world' ground-plane grid, etc;
var part1Box = new VBObox2();		  // "  "  for first set of custom-shaded 3D parts
part1Box.setMatl(17);

var part2Box = new VBObox1();     // "  "  for second set of custom-shaded 3D parts
part2Box.setMatl(MATL_BRONZE_SHINY);
part2Box.adjust =  function() {
  //==============================================================================
  // Update the GPU to newer, current values we now store for 'uniform' vars on 
  // the GPU; and (if needed) update each attribute's stride and offset in VBO.
  
    // check: was WebGL context set to use our VBO & shader program?
    if(this.isReady()==false) {
          console.log('ERROR! before' + this.constructor.name + 
                '.adjust() call you needed to call this.switchToMe()!!');
    }
    // Adjust values for our uniforms,
    perspective(this.CameraMatrix);
    // console.log(perspectiveCam.eye_point.elements);
    this.setRotate(g_angleNow1, [0, 0 ,1]);
    this.translate([-20, 0 ,0]);
    this.rotate(g_angleNow1, [1, 0, 0]);	// -spin drawing axes,
    this.scale([2,2,2])

    // this.ModelMatrix.scale(0.25,0.25,0.25);	// -spin drawing axes,
    // this.ModelMatrix.translate(0.35, -0.15, 0);						// then translate them.
    //  Transfer new uniforms' values to the GPU:-------------
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    setNormalMatrix(this.ModelMatrix, this.NormalMatrix);
    gl.uniformMatrix4fv(this.u_ModelMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.ModelMatrix.elements);	// send data from Javascript.
    gl.uniformMatrix4fv(this.u_NormalMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.NormalMatrix.elements);	// send data from Javascript.
    gl.uniformMatrix4fv(this.u_CameraMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.CameraMatrix.elements);	// send data from Javascript.
    this.draw();			  

  };

var part3Box = new VBObox1();     // "  "  for second set of custom-shaded 3D parts
part3Box.setMatl(MATL_TURQUOISE);

part3Box.adjust =  function() {
  //==============================================================================
  // Update the GPU to newer, current values we now store for 'uniform' vars on 
  // the GPU; and (if needed) update each attribute's stride and offset in VBO.
  
    // check: was WebGL context set to use our VBO & shader program?
    if(this.isReady()==false) {
          console.log('ERROR! before' + this.constructor.name + 
                '.adjust() call you needed to call this.switchToMe()!!');
    }
    // Adjust values for our uniforms,
    perspective(this.CameraMatrix);
    // console.log(perspectiveCam.eye_point.elements);
    this.ModelMatrix.setRotate(g_angleNow1, 0, 0 ,1);
    this.ModelMatrix.translate(0, 20 ,0);
    this.ModelMatrix.rotate(g_angleNow1, 1, 0, 0);	// -spin drawing axes,
    this.scale([2,2,2])
    // this.ModelMatrix.scale(0.25,0.25,0.25);	// -spin drawing axes,
    // this.ModelMatrix.translate(0.35, -0.15, 0);						// then translate them.
    //  Transfer new uniforms' values to the GPU:-------------
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    setNormalMatrix(this.ModelMatrix, this.NormalMatrix);
    gl.uniformMatrix4fv(this.u_ModelMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.ModelMatrix.elements);	// send data from Javascript.
    gl.uniformMatrix4fv(this.u_NormalMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.NormalMatrix.elements);	// send data from Javascript.
    gl.uniformMatrix4fv(this.u_CameraMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.CameraMatrix.elements);	// send data from Javascript.
    this.draw();			  

  
  };
  
var part4Box = new VBObox1();     // "  "  for second set of custom-shaded 3D parts
part4Box.setMatl(MATL_RUBY);
part4Box.adjust =  function() {
  //==============================================================================
  // Update the GPU to newer, current values we now store for 'uniform' vars on 
  // the GPU; and (if needed) update each attribute's stride and offset in VBO.
  
    // check: was WebGL context set to use our VBO & shader program?
    if(this.isReady()==false) {
          console.log('ERROR! before' + this.constructor.name + 
                '.adjust() call you needed to call this.switchToMe()!!');
    }
    // Adjust values for our uniforms,
    perspective(this.CameraMatrix);
    // console.log(perspectiveCam.eye_point.elements);
    this.ModelMatrix.setRotate(g_angleNow1, 0, 0 ,1);
    this.ModelMatrix.translate(0, -20 ,0);
    this.ModelMatrix.rotate(g_angleNow1, 1, 0, 0);	// -spin drawing axes,
    this.scale([2,2,2])
    // this.ModelMatrix.scale(0.25,0.25,0.25);	// -spin drawing axes,
    // this.ModelMatrix.translate(0.35, -0.15, 0);						// then translate them.
    //  Transfer new uniforms' values to the GPU:-------------
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    setNormalMatrix(this.ModelMatrix, this.NormalMatrix);
    gl.uniformMatrix4fv(this.u_ModelMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.ModelMatrix.elements);	// send data from Javascript.
    gl.uniformMatrix4fv(this.u_NormalMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.NormalMatrix.elements);	// send data from Javascript.
    gl.uniformMatrix4fv(this.u_CameraMatrixLoc,	// GPU location of the uniform
                        false, 										// use matrix transpose instead?
                        this.CameraMatrix.elements);	// send data from Javascript.
    this.draw();			  

};


function changeContent(box, config){

  var contents =   Float32Concat (Float32Concat(new Float32Array(config[0]), new Float32Array(config[1])), new Float32Array(config[2]));

	box.vboContents = contents
	box.vboVerts = config[3];							// # of vertices held in 'vboContents' array;
	box.FSIZE = box.vboContents.BYTES_PER_ELEMENT;  
  box.vboBytes = box.vboContents.length * box.FSIZE;               
	box.vboStride = box.vboBytes / box.vboVerts;     
  box.vboFcount_a_Pos1 =  4;    // # of floats in the VBO needed to store the
                                // attribute named a_Pos1. (4: x,y,z,w values)
  box.vboFcount_a_Colr1 = 4;   // # of floats for box attrib (r,g,b values)
  box.vboFcount_a_Norm1 = 4;   // # of floats for box attrib (r,g,b values)

  // box.vboFcount_a_PtSiz1 = 1;  // # of floats for box attrib (just one!)   
  console.assert((box.vboFcount_a_Pos1 +     // check the size of each and
                  box.vboFcount_a_Colr1
                  + box.vboFcount_a_Norm1) *   // every attribute in our VBO
                  box.FSIZE == box.vboStride, // for agreeement with'stride'
                  "Uh oh! VBObox1.vboStride disagrees with attribute-size values!");
                  
              //----------------------Attribute offsets
	box.vboOffset_a_Pos1 = 0;    //# of bytes from START of vbo to the START
	                              // of 1st a_Pos1 attrib value in vboContents[]
  box.vboOffset_a_Colr1 = (box.vboFcount_a_Pos1) * box.FSIZE * box.vboVerts;  
  // console.log(box.vboOffset_a_Colr1)
  box.vboOffset_a_Norm1 = (box.vboFcount_a_Pos1 + box.vboFcount_a_Colr1) * box.FSIZE * box.vboVerts;  
  // console.log(box.vboOffset_a_Norm1)


}

function concatConfigs(a, b, table) {
  var body = a[0].concat(b[0]);
  var color = a[1].concat(b[1]);
  var normal = a[2].concat(b[2]);
  var total = a[3] + b[3];
  var l = table.length;
  if (l ==0) {
    table.push([0, a[3]]);
    table.push([a[3], b[3]]);
  }
  else {
    table.push([a[3], b[3]]);
  }

  return  [body, color, normal, total];


}


var part5Box = new VBObox1();     // "  "  for second set of custom-shaded 3D parts
var colorfulCube = generateColorfulSquare([[-0.5,0.5], [0.5,0.5], [0.5,-0.5], [-0.5,-0.5]], 0.6)
part5Box.setMatl(MATL_PEARL);
part5Box.setTriangle();
changeContent(part5Box, colorfulCube);
part5Box.adjust =  function() {
  //==============================================================================
  // Update the GPU to newer, current values we now store for 'uniform' vars on 
  // the GPU; and (if needed) update each attribute's stride and offset in VBO.
  
    // check: was WebGL context set to use our VBO & shader program?
    if(this.isReady()==false) {
          console.log('ERROR! before' + this.constructor.name + 
                '.adjust() call you needed to call this.switchToMe()!!');
    }
    // Adjust values for our uniforms,
    perspective(this.CameraMatrix);
    // console.log(perspectiveCam.eye_point.elements);
    this.ModelMatrix.setTranslate(0, 0, 2.5);
    this.ModelMatrix.scale(10.0,10.0,10.0);
    pushMatrix(this.ModelMatrix);
    var t = 20;
    var r = 4.5;
    for (i = 0; i < t + 1; i ++) {
      this.PopAndPush();
      var angle = 180* i / t;
      this.ModelMatrix.rotate(angle,0,-1,0);
      this.ModelMatrix.translate(r,0, 0);
      this.updateMatricies();  
      this.draw();
    }
    for (i = 0; i < t + 1; i ++) {
      this.PopAndPush();
      var angle = 180* i / t;
      this.ModelMatrix.rotate(angle,1,0,0);
      this.ModelMatrix.translate(0,r, 0);
      this.updateMatricies();  
      this.draw();
    }; 
    popMatrix();
    this.draw();			  

    // this.ModelMatrix.scale(0.25,0.25,0.25);	// -spin drawing axes,
    // this.ModelMatrix.translate(0.35, -0.15, 0);						// then translate them.
    //  Transfer new uniforms' values to the GPU:-------------
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
  };



var table6 = [];
var b = generateBody();
var cube = generateCube();
var sphere = generateSnowBall([0,0,0,1]);
var config = concatConfigs(b, cube, table6);
config = concatConfigs(config, sphere, table6);
var part6Box = new VBObox1();     // "  "  for second set of custom-shaded 3D parts
part6Box.table = table6;
changeContent(part6Box, config);
part6Box.draw = function(num, type) {
  if(this.isReady()==false) {
    console.log('ERROR! before' + this.constructor.name + 
          '.draw() call you needed to call this.switchToMe()!!');
  }

  // ----------------------------Draw the contents of the currently-bound VBO:
  gl.drawArrays(type,		    // select the drawing primitive to draw:
                // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
                //          gl.TRIANGLES, gl.TRIANGLE_STRIP,
              this.table[num][0], 								// location of 1st vertex to draw;
              this.table[num][1]);		// number of vertices to draw on-screen.
}
part6Box.adjust =  function() {
  //==============================================================================
  // Update the GPU to newer, current values we now store for 'uniform' vars on 
  // the GPU; and (if needed) update each attribute's stride and offset in VBO.
  
    // check: was WebGL context set to use our VBO & shader program?
    if(this.isReady()==false) {
          console.log('ERROR! before' + this.constructor.name + 
                '.adjust() call you needed to call this.switchToMe()!!');
    }
    // Adjust values for our uniforms,
    perspective(this.CameraMatrix);
    // console.log(perspectiveCam.eye_point.elements);
    // this.ModelMatrix.setRotate(g_angleNow1, 0, 0 ,1);
    this.setRotate(g_angleNow1/2, [0, 0 ,1]);
    this.translate([75, 0, 0])
    this.rotate(g_angleNow1/2, [0, 0 ,1]);

    this.scale([10.0,10.0,10.0]);
    this.updateMatricies();  
    this.setMatl(MATL_GOLD_SHINY);
    this.passMat();
    this.draw(0, gl.TRIANGLES);
    pushMatrix(this.ModelMatrix);
    this.translate([0, 0,0.25]);
    this.updateMatricies();  
    this.draw(1, gl.TRIANGLES);
    this.translate([0, 0, 0.5]);
    this.rotate(90, [0.0, 1.0, 0.0]);
    this.rotate(g_angleNow1/2 + 180, [1.0, 0, 0.0]);
    this.updateMatricies();  
    this.draw(1, gl.TRIANGLES);
    this.PopAndPush();
    this.translate([0, 0, 0.75]);
    this.rotate(90, [0.0, 1.0, 0.0]);
    this.rotate(g_angleNow1/2 + 180, [1.0, 0, 0.0]);

    this.translate([0, 0, 0.5]);
    this.scale([0.05,0.05,0.05]);
    this.updateMatricies();  
    this.setMatl(MATL_CHROME);
    this.passMat();
    this.draw(2, gl.TRIANGLE_STRIP);
    addBalls(this, 6, 0.5)
    popMatrix();
};

var turn = 0;
function addBalls(box, num, radius) {
  var r = (0.375 + radius);
  for (var angle = 0; angle < 360.0; angle = angle + 360/num) {
      var r = (0.5 + radius); 
      if (angle == 0 || angle == 180) r =  (0.375 + radius);
      var a = (angle * 2 * Math.PI)/360.0;
      box.PopAndPush();
      box.translate([r * Math.cos(a), r * Math.sin(a), 0]);
      box.scale([0.05,0.05,0.05]);
      box.updateMatricies();  
      box.setMatl(MATL_OBSIDIAN);
      box.passMat();
      box.draw(2, gl.TRIANGLE_STRIP);
      for(var i = 0; i < 5; i ++) {
        var newR = r + radius*(i + 1)/2; 
        box.PopAndPush();
        var zCoord = ((i + 1)*(i - 4) * radius) * 0.125
        box.translate([newR * Math.cos(a), newR * Math.sin(a), zCoord* Math.sin(switchToPi(turn +angle))]);
        box.scale([0.05,0.05,0.05]);
        box.updateMatricies(); 
        box.draw(2, gl.TRIANGLE_STRIP);
 
      }

  }

  turn = turn + 5;

}

var qNew = new Quaternion(0,0,0,1); // most-recent mouse drag's rotation
var qTot = new Quaternion(0,0,0,1);	// 'current' orientation (made from qNew)
qTot.setFromAxisAngle(1,0,0,90);
var quatMatrix = new Matrix4();  

var part7Box = new VBObox1();     // "  "  for second set of custom-shaded 3D parts
var config = generateCylinder();
var table7 = [];
var sqaureConfig = generateColorfulSquare([[-0.5, 0.5], [1.5, 0.5], [1.5, -0.5], [-0.5, -0.5]], 0.2);
config = concatConfigs(config,sqaureConfig, table7);
for (var i = 0; i < 10; i ++) {
  var h1 = i * 1/ 20;
  var h2 = (i + 1) * 1/20;
  var sqaureConfig = generateColorfulSquare([[-0.5, 0.5- h1/2], [0.5, 0.5 - h2/2], [0.5, -0.5 + h2/2], [-0.5, -0.5 + h1/2]], 0.2);
  config = concatConfigs(config,sqaureConfig, table7);
}

part7Box.table = table7;
part7Box.setMatl(MATL_PEARL);
part7Box.setTriangle();
changeContent(part7Box, config);
part7Box.draw = function(num) {
  if(this.isReady()==false) {
    console.log('ERROR! before' + this.constructor.name + 
          '.draw() call you needed to call this.switchToMe()!!');
  }
  // console.log( this.table[num][0], 	this.table[num][1])
  // ----------------------------Draw the contents of the currently-bound VBO:
  gl.drawArrays(gl.TRIANGLES,		    // select the drawing primitive to draw:
                // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
                //          gl.TRIANGLES, gl.TRIANGLE_STRIP,
              this.table[num][0], 								// location of 1st vertex to draw;
              this.table[num][1]);		// number of vertices to draw on-screen.
}
part7Box.adjust =  function() {
  //==============================================================================
  // Update the GPU to newer, current values we now store for 'uniform' vars on 
  // the GPU; and (if needed) update each attribute's stride and offset in VBO.
  
    // check: was WebGL context set to use our VBO & shader program?
    if(this.isReady()==false) {
          console.log('ERROR! before' + this.constructor.name + 
                '.adjust() call you needed to call this.switchToMe()!!');
    }
    // Adjust values for our uniforms,
    perspective(this.CameraMatrix);
    var dir = new Vector3();
    qTot.multiplyVector3(movementVec, dir);
    displacement[0] += dir.elements[0]; 
    displacement[1] += dir.elements[1]; 
    displacement[2] += dir.elements[2]; 
    this.setTranslate(displacement);
    this.scale([3, 3, 3]); 
    quatMatrix.setFromQuat(qTot.x, qTot.y, qTot.z, qTot.w);
    this.ModelMatrix.concat(quatMatrix);
    this.updateMatricies();
    this.setMatl(MATL_CHROME);
    this.passMat();  
    this.draw(0);
    this.setMatl(MATL_GOLD_SHINY);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    this.PopAndPush()
    this.scale([5/3,5/3,5/3]);
    this.rotate(90, [1,0,0]);
    this.rotate(g_angleNow2, [0,1,0]);
    this.scale([0.1,0.1,0.1]);
    this.updateMatricies();  
    this.draw(1);
    this.scale([5,5,5]);
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 8; i ++) {
      this.ModelMatrix = popMatrix();
      this.translate([0.99,0,0]);
      this.rotate(Math.sin(switchToPi(3.1* g_angleNow2))* 4, [0,1,0]);
      this.updateMatricies(); 
      this.draw(1 + i);
      pushMatrix(this.ModelMatrix);

    }
    popMatrix();
    this.PopAndPush();
    this.scale([5/3,5/3,5/3]);
    this.rotate(90, [1,0,0]);
    this.rotate(-g_angleNow2, [0,1,0]);
    this.scale([0.1,0.1,0.1]);
    this.updateMatricies();  
    this.draw(1);
    this.scale([5,5,5]);
    pushMatrix(this.ModelMatrix);

    for (var i = 1; i < 8; i ++) {
      this.ModelMatrix = popMatrix();
      this.translate([-0.99,0,0]);
      this.rotate(Math.sin(switchToPi(3.1* g_angleNow2))* 4, [0,-1,0]);
      this.updateMatricies(); 
      this.draw(1 + i);
      pushMatrix(this.ModelMatrix);

    }

    popMatrix();
};


var part8Box = new VBObox1();     // "  "  for second set of custom-shaded 3D parts
var table8 = [];
var config = generateColorfulSquare([[-0.5, 0.5], [1.5, 0.5], [1.5, -0.5], [-0.5, -0.5]], 0.2);
for (var i = 0; i < 40; i ++) {
  var h1 = i * 1/ 40;
  var h2 = (i + 1) * 1/40;
  var sqaureConfig = generateColorfulSquare([[-0.5, 0.5- h1/2], [0.5, 0.5 - h2/2], [0.5, -0.5 + h2/2], [-0.5, -0.5 + h1/2]], 0.2);
  config = concatConfigs(config,sqaureConfig, table8);
}

part8Box.table = table8;
part8Box.setMatl(MATL_PEWTER);
changeContent(part8Box, config);
part8Box.draw = function(num) {
  if(this.isReady()==false) {
    console.log('ERROR! before' + this.constructor.name + 
          '.draw() call you needed to call this.switchToMe()!!');
  }
  // console.log( this.table[num][0], 	this.table[num][1])
  // ----------------------------Draw the contents of the currently-bound VBO:
  gl.drawArrays(gl.TRIANGLES,		    // select the drawing primitive to draw:
                // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
                //          gl.TRIANGLES, gl.TRIANGLE_STRIP,
              this.table[num][0], 								// location of 1st vertex to draw;
              this.table[num][1]);		// number of vertices to draw on-screen.
}
var t = 0;
part8Box.adjust = function() {
  var mats = [MATL_SILVER_SHINY, MATL_CHROME, MATL_EMERALD, MATL_GOLD_SHINY, MATL_PEWTER, MATL_TURQUOISE]
  if(this.isReady()==false) {
    console.log('ERROR! before' + this.constructor.name + 
          '.adjust() call you needed to call this.switchToMe()!!');
  }
  // Adjust values for our uniforms,
  perspective(this.CameraMatrix);
  this.setTranslate([0,0,0]);
  this.updateMatricies();
  this.rotate(g_angleNow1,[0,0,1])

  pushMatrix(this.ModelMatrix);
  var s = 2* Math.min((g_angleNow2 + 60)/60, 1)
  this.scale([s,s,s]);
  var sides = 10

  if (t == 0) 
  {
  this.rotate(2* g_angleNow1,[0,0,1])
  pushMatrix(this.ModelMatrix);
  for (var j = 0; j < sides; j ++ ){
    this.PopAndPush();
    this.rotate(j * 360/sides , [0,0,1]);
    this.setMatl(mats[j% mats.length]);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 40; i ++) {
      
      this.ModelMatrix = popMatrix();
      this.translate([0.5,0,0]);
      this.rotate((g_angleNow2 + 60)* 2*  (4.5/120) , [0,-1,0]);
      this.updateMatricies(); 
      this.draw(i);
      pushMatrix(this.ModelMatrix);
    }
    popMatrix();
  }
  popMatrix();
  // }
  // else {
  this.PopAndPush();
  this.translate([0,0,26])
  this.rotate(180,[0,1,0])
  this.scale([s,s,s]);
  this.rotate(2* g_angleNow1,[0,0,1])
  pushMatrix(this.ModelMatrix);
  for (var j = 0; j < sides; j ++ ){
    this.PopAndPush();
    this.rotate(j * 360/sides  , [0,0,1]);
    this.setMatl(mats[j% mats.length]);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 40; i ++) {
      
      this.ModelMatrix = popMatrix();
      this.translate([0.5,0,0]);
      this.rotate((g_angleNow2 + 60)* 2*  (4.5/120) , [0,-1,0]);
      this.updateMatricies(); 
      this.draw(i);
      pushMatrix(this.ModelMatrix);
    }
    popMatrix();
  }

  popMatrix();
}

if (t == 1) 
{
  this.PopAndPush();
  this.translate([0,-13,13])
  this.rotate(90,[-1,0,0])
  this.scale([s,s,s]);
  this.rotate(2* g_angleNow1,[0,0,1])
  pushMatrix(this.ModelMatrix);
  for (var j = 0; j < sides; j ++ ){
    this.PopAndPush();
    this.rotate(j * 360/sides  , [0,0,1]);
    this.setMatl(mats[j% mats.length]);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 40; i ++) {
      
      this.ModelMatrix = popMatrix();
      this.translate([0.5,0,0]);
      this.rotate((g_angleNow2 + 60)* 2*  (4.5/120) , [0,-1,0]);
      this.updateMatricies(); 
      this.draw(i);
      pushMatrix(this.ModelMatrix);
    }
    popMatrix();
  }
  popMatrix();

  this.PopAndPush();
  this.translate([0,13,13])
  this.rotate(90,[1,0,0])
  this.scale([s,s,s]);
  this.rotate(2* g_angleNow1,[0,0,1])
  pushMatrix(this.ModelMatrix);
  for (var j = 0; j < sides; j ++ ){
    this.PopAndPush();
    this.rotate(j * 360/sides  , [0,0,1]);
    this.setMatl(mats[j% mats.length]);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 40; i ++) {
      
      this.ModelMatrix = popMatrix();
      this.translate([0.5,0,0]);
      this.rotate((g_angleNow2 + 60)* 2*  (4.5/120) , [0,-1,0]);
      this.updateMatricies(); 
      this.draw(i);
      pushMatrix(this.ModelMatrix);
    }
    popMatrix();
  }
  popMatrix();
}
if (t == 2) 
{
  this.PopAndPush();
  this.translate([13,0,13])
  this.rotate(90,[0,-1,0])
  this.scale([s,s,s]);
  this.rotate(2* g_angleNow1,[0,0,1])
  pushMatrix(this.ModelMatrix);
  for (var j = 0; j < sides; j ++ ){
    this.PopAndPush();
    this.rotate(j * 360/sides  , [0,0,1]);
    this.setMatl(mats[j% mats.length]);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 40; i ++) {
      
      this.ModelMatrix = popMatrix();
      this.translate([0.5,0,0]);
      this.rotate((g_angleNow2 + 60)* 2*  (4.5/120) , [0,-1,0]);
      this.updateMatricies(); 
      this.draw(i);
      pushMatrix(this.ModelMatrix);
    }
    popMatrix();
  }
  popMatrix();


  this.PopAndPush();
  this.translate([-13,0,13])
  this.rotate(90,[0,1,0])
  this.scale([s,s,s]);
  this.rotate(2* g_angleNow1,[0,0,1])
  pushMatrix(this.ModelMatrix);
  for (var j = 0; j < sides; j ++ ){
    this.PopAndPush();
    this.rotate(j * 360/sides  , [0,0,1]);
    this.setMatl(mats[j% mats.length]);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 40; i ++) {
      
      this.ModelMatrix = popMatrix();
      this.translate([0.5,0,0]);
      this.rotate((g_angleNow2 + 60)* 2*  (4.5/120) , [0,-1,0]);
      this.updateMatricies(); 
      this.draw(i);
      pushMatrix(this.ModelMatrix);
    }
    popMatrix();
  }
  popMatrix();
}
popMatrix();


  this.PopAndPush();
  this.translate([0,-13,13])
  this.rotate(90,[1,,0])
  this.scale([s,s,s]);
  this.rotate(2* g_angleNow1,[0,0,1])
  pushMatrix(this.ModelMatrix);
  for (var j = 0; j < sides; j ++ ){
    this.PopAndPush();
    this.rotate(j * 360/sides  , [0,0,1]);
    this.setMatl(mats[j% mats.length]);
    this.passMat();
    pushMatrix(this.ModelMatrix);
    for (var i = 1; i < 40; i ++) {
      
      this.ModelMatrix = popMatrix();
      this.translate([0.5,0,0]);
      this.rotate((g_angleNow2 + 60)* 2*  (4.5/120) , [0,-1,0]);
      this.updateMatricies(); 
      this.draw(i);
      pushMatrix(this.ModelMatrix);
    }
    popMatrix();
  }
  popMatrix();
  if( g_angleNow2 == -60) {
    t = !t;
  }

}

var objectList = [part1Box, part2Box, part3Box, part4Box,part5Box, part6Box, part7Box, part8Box];
