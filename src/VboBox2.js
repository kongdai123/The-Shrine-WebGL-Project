var POINT_LIGHTS_NUM = 2;
var lights = [cLight, customLight];

function VBObox2() {
//=============================================================================
//=============================================================================
// CONSTRUCTOR for one re-usable 'VBObox2' object that holds all data and fcns
// needed to render vertices from one Vertex Buffer Object (VBO) using one 
// separate shader program (a vertex-shader & fragment-shader pair) and one
// set of 'uniform' variables.

// Constructor goal: 
// Create and set member vars that will ELIMINATE ALL LITERALS (numerical values 
// written into code) in all other VBObox functions. Keeping all these (initial)
// values here, in this one coonstrutor function, ensures we can change them 
// easily WITHOUT disrupting any other code, ever!
    
    this.VERT_SRC =	//--------------------- VERTEX SHADER source code
    multi_lights_groud_phong_vert 
 
    // SQUARE dots:
    this.FRAG_SRC = //---------------------- FRAGMENT SHADER source code 
    multi_lights_groud_phong_frag

    var sphereConfig = generateSnowBall([1.0,1.0,1.0]);

    var contents =   Float32Concat (Float32Concat(new Float32Array(sphereConfig[0]), new Float32Array(sphereConfig[1])), new Float32Array(sphereConfig[2]));

    this.vboContents = contents
    this.vboVerts = sphereConfig[3];							// # of vertices held in 'vboContents' array;
    this.FSIZE = this.vboContents.BYTES_PER_ELEMENT;  
    this.vboBytes = this.vboContents.length * this.FSIZE;               
    this.vboStride = this.vboBytes / this.vboVerts;     
    this.vboFcount_a_Pos1 =  4;    // # of floats in the VBO needed to store the
                                // attribute named a_Pos1. (4: x,y,z,w values)
    this.vboFcount_a_Colr1 = 4;   // # of floats for this attrib (r,g,b values)
    this.vboFcount_a_Norm1 = 4;   // # of floats for this attrib (r,g,b values)

    // this.vboFcount_a_PtSiz1 = 1;  // # of floats for this attrib (just one!)   
    console.assert((this.vboFcount_a_Pos1 +     // check the size of each and
                    this.vboFcount_a_Colr1
                    + this.vboFcount_a_Norm1) *   // every attribute in our VBO
                    this.FSIZE == this.vboStride, // for agreeement with'stride'
                    "Uh oh! VBObox2.vboStride disagrees with attribute-size values!");
                    
                //----------------------Attribute offsets
    this.vboOffset_a_Pos1 = 0;    //# of bytes from START of vbo to the START
                                    // of 1st a_Pos1 attrib value in vboContents[]
    this.vboOffset_a_Colr1 = (this.vboFcount_a_Pos1) * this.FSIZE * this.vboVerts;  
    // console.log(this.vboOffset_a_Colr1)
    this.vboOffset_a_Norm1 = (this.vboFcount_a_Pos1 + this.vboFcount_a_Colr1) * this.FSIZE * this.vboVerts;  
    // console.log(this.vboOffset_a_Norm1)

                //-----------------------GPU memory locations:                                
    this.vboLoc;									// GPU Location for Vertex Buffer Object, 
                                    // returned by gl.createBuffer() function call
    this.shaderLoc;								// GPU Location for compiled Shader-program  
                                    // set by compile/link of VERT_SRC and FRAG_SRC.
                                            //------Attribute locations in our shaders:
    this.a_Pos1Loc;							  // GPU location: shader 'a_Pos1' attribute
    this.a_Colr1Loc;							// GPU location: shader 'a_Colr1' attribute
    this.a_Norm1Loc;
    this.ModelMatrix = new Matrix4();	// Transforms CVV axes to model axes.
    this.u_ModelMatrixLoc;						// GPU location for u_ModelMat uniform
    this.NormalMatrix = new Matrix4();	// Transforms CVV axes to model axes.
    this.u_NormalMatrixLoc;						// GPU location for u_ModelMat uniform
    this.CameraMatrix = new Matrix4();
    this.u_CameraMatrixLoc;

    this.material = new Material();
    this.matNum = MATL_GOLD_SHINY
    this.material.setMatl(this.matNum);

    this.lightsLoc = [];
    for (var i = 0; i < POINT_LIGHTS_NUM; i++) {
        this.lightsLoc.push(new LightGPULoc());
        this.lightsLoc[i].light = lights[i];
    }

    console.log(this.lightsLoc)


    this.KsLoc;
    this.KdLoc;
    this.KaLoc;
    this.shinyLoc;

    this.show = 1;

    this.att_mode = 0;
    this.att_modeloc;

};
VBObox2.prototype.uniformLocation = function(varLoc, varName) {
    varLoc = gl.getUniformLocation(this.shaderLoc, varName);
    if (!varLoc) { 
    console.log(
                            '.init() failed to get GPU location for '+  varName +  ' uniform');
    return;
    }
    return varLoc;
}

VBObox2.prototype.init = function() {
//==============================================================================
// Prepare the GPU to use all vertices, GLSL shaders, attributes, & uniforms 
// kept in this VBObox. (This function usually called only once, within main()).
// Specifically:
// a) Create, compile, link our GLSL vertex- and fragment-shaders to form an 
//  executable 'program' stored and ready to use inside the GPU.  
// b) create a new VBO object in GPU memory and fill it by transferring in all
//  the vertex data held in our Float32array member 'VBOcontents'. 
// c) Find & save the GPU location of all our shaders' attribute-variables and 
//  uniform-variables (needed by switchToMe(), adjust(), draw(), reload(), etc.)
// -------------------
// CAREFUL!  before you can draw pictures using this VBObox contents, 
//  you must call this VBObox object's switchToMe() function too!
//--------------------
// a) Compile,link,upload shaders-----------------------------------------------
    this.shaderLoc = createProgram(gl, this.VERT_SRC, this.FRAG_SRC);
    console.log(this.VERT_SRC);
    console.log(this.FRAG_SRC);
    if (!this.shaderLoc) {
    console.log(this.constructor.name + 
                            '.init() failed to create executable Shaders on the GPU. Bye!');
    return;
    }
// CUTE TRICK: let's print the NAME of this VBObox object: tells us which one!
//  else{console.log('You called: '+ this.constructor.name + '.init() fcn!');}

    gl.program = this.shaderLoc;		// (to match cuon-utils.js -- initShaders())

// b) Create VBO on GPU, fill it------------------------------------------------
    this.vboLoc = gl.createBuffer();	
    if (!this.vboLoc) {
    console.log(this.constructor.name + 
                            '.init() failed to create VBO in GPU. Bye!'); 
    return;
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER,	      // GLenum 'target' for this GPU buffer 
                                    this.vboLoc);				  // the ID# the GPU uses for this buffer.
    gl.bufferData(gl.ARRAY_BUFFER, 			  // GLenum target(same as 'bindBuffer()')
                                        this.vboContents, 		// JavaScript Float32Array
                                    gl.STATIC_DRAW);			// Usage hint.  
    this.a_Pos1Loc = gl.getAttribLocation(this.shaderLoc, 'a_Pos1');
    if(this.a_Pos1Loc < 0) {
    console.log(this.constructor.name + 
                            '.init() Failed to get GPU location of attribute a_Pos1');
    return -1;	// error exit.
    }
        this.a_Colr1Loc = gl.getAttribLocation(this.shaderLoc, 'a_Colr1');
    if(this.a_Colr1Loc < 0) {
    console.log(this.constructor.name + 
                            '.init() failed to get the GPU location of attribute a_Colr1');
    return -1;	// error exit.
    }
    this.a_Norm1Loc = gl.getAttribLocation(this.shaderLoc, 'a_Norm1');
    if(this.a_Norm1Loc < 0) {
    console.log(this.constructor.name + 
                            '.init() failed to get the GPU location of attribute a_Norm1');
    return -1;	// error exit.
    }
    this.u_ModelMatrixLoc = gl.getUniformLocation(this.shaderLoc, 'u_ModelMatrix');
    if (!this.u_ModelMatrixLoc) { 
    console.log(this.constructor.name + 
                            '.init() failed to get GPU location for u_ModelMatrix uniform');
    return;
    }
    this.u_NormalMatrixLoc = gl.getUniformLocation(this.shaderLoc, 'u_NormalMatrix');
    if (!this.u_NormalMatrixLoc) { 
    console.log(this.constructor.name + 
                            '.init() failed to get GPU location for u_NormalMatrix uniform');
    return;
    }
    this.u_CameraMatrixLoc = this.uniformLocation(this.u_CameraMatrixLoc, 'u_CameraMatrix');

    this.KsLoc = this.uniformLocation(this.KsLoc, 'Ks');

    this.shinyLoc = this.uniformLocation(this.shinyLoc, 'shiny');
    this.KdLoc = this.uniformLocation(this.KdLoc, 'Kd');
    this.KaLoc = this.uniformLocation(this.KaLoc, 'Ka');

    this.att_modeloc = this.uniformLocation(this.att_modeloc, 'att_mode');
    this.num_lightsLoc = this.uniformLocation(this.num_lightsLoc, 'num_lights');


    for (var i = 0; i < POINT_LIGHTS_NUM; i++) {
        this.lightsLoc[i].onLoc = this.uniformLocation(this.lightsLoc[i].onLoc, 'lights[' + String(i) + '].on');
        this.lightsLoc[i].specularLoc = this.uniformLocation(this.lightsLoc[i].specularLoc, 'lights[' + String(i) + '].specColor');
        this.lightsLoc[i].ambientLoc = this.uniformLocation(this.lightsLoc[i].ambientLoc, 'lights[' + String(i) + '].ambColor');
        this.lightsLoc[i].diffusiveLoc = this.uniformLocation(this.lightsLoc[i].diffusiveLoc, 'lights[' + String(i) + '].difColor');
        this.lightsLoc[i].positionLoc = this.uniformLocation(this.lightsLoc[i].positionLoc, 'lights[' + String(i) + '].pos');
    }
    console.log(this.lightsLoc)

}

VBObox2.prototype.switchToMe = function () {
//==============================================================================
// Set GPU to use this VBObox's contents (VBO, shader, attributes, uniforms...)
//
// We only do this AFTER we called the init() function, which does the one-time-
// only setup tasks to put our VBObox contents into GPU memory.  !SURPRISE!
// even then, you are STILL not ready to draw our VBObox's contents onscreen!
// We must also first complete these steps:
//  a) tell the GPU to use our VBObox's shader program (already in GPU memory),
//  b) tell the GPU to use our VBObox's VBO  (already in GPU memory),
//  c) tell the GPU to connect the shader program's attributes to that VBO.

// a) select our shader program:
    gl.useProgram(this.shaderLoc);	
//		Each call to useProgram() selects a shader program from the GPU memory,
// but that's all -- it does nothing else!  Any previously used shader program's 
// connections to attributes and uniforms are now invalid, and thus we must now
// establish new connections between our shader program's attributes and the VBO
// we wish to use.  
    
// b) call bindBuffer to disconnect the GPU from its currently-bound VBO and
//  instead connect to our own already-created-&-filled VBO.  This new VBO can 
//    supply values to use as attributes in our newly-selected shader program:
    gl.bindBuffer(gl.ARRAY_BUFFER,	    // GLenum 'target' for this GPU buffer 
                                        this.vboLoc);			// the ID# the GPU uses for our VBO.

// c) connect our newly-bound VBO to supply attribute variable values for each
// vertex to our SIMD shader program, using 'vertexAttribPointer()' function.
// this sets up data paths from VBO to our shader units:
    // 	Here's how to use the almost-identical OpenGL version of this function:
    //		http://www.opengl.org/sdk/docs/man/xhtml/glVertexAttribPointer.xml )
    //The data is arranged this way :
    // || Vertex Location 1, Vertex Location 2 ...... || Vertex Color 1, Vertex 
    // Color 2 .... || Vertex Normal 1, Vertex Normal 2....|| 
    gl.vertexAttribPointer(
        this.a_Pos1Loc,//index == ID# for the attribute var in GLSL shader pgm;
        this.vboFcount_a_Pos1, // # of floats used by this attribute: 1,2,3 or 4?
        gl.FLOAT,		  // type == what data type did we use for those numbers?
        false,				// isNormalized == are these fixed-point values that we need
                                    //									normalize before use? true or false
    this.vboFcount_a_Pos1* this.FSIZE ,// Stride == #bytes we must skip in the VBO to move from the
                        // stored attrib for this vertex to the same stored attrib
                        //  for the next vertex in our VBO.  This is usually the 
                                    // number of bytes used to store one complete vertex.  If set 
                                    // to zero, the GPU gets attribute values sequentially from 
                                    // VBO, starting at 'Offset'.	
                                    // (Our vertex size in bytes: 4 floats for pos + 3 for color)
        this.vboOffset_a_Pos1);						
                        // Offset == how many bytes from START of buffer to the first
                                    // value we will actually use?  (we start with position).
    gl.vertexAttribPointer(this.a_Colr1Loc, this.vboFcount_a_Colr1,
                            gl.FLOAT, false, 
                            this.vboFcount_a_Colr1* this.FSIZE ,  this.vboOffset_a_Colr1);
    gl.vertexAttribPointer(this.a_Norm1Loc, this.vboFcount_a_Norm1,
                            gl.FLOAT, false, 
                            this.vboFcount_a_Norm1* this.FSIZE ,  this.vboOffset_a_Norm1);


    gl.uniform4f(this.KsLoc, 
                    this.material.K_spec[0],
                    this.material.K_spec[1],
                    this.material.K_spec[2],
                    this.material.K_spec[3]
                    );
    gl.uniform4f(this.KdLoc, 
                    this.material.K_diff[0],
                    this.material.K_diff[1],
                    this.material.K_diff[2],
                    this.material.K_diff[3]
                    );
    gl.uniform4f(this.KaLoc, 
                    this.material.K_ambi[0],
                    this.material.K_ambi[1],
                    this.material.K_ambi[2],
                    this.material.K_ambi[3]
                    );


    gl.uniform1f(this.shinyLoc, this.material.K_shiny);
    gl.uniform1i(this.att_modeloc, this.att_mode);
    

    gl.uniform1i(this.num_lightsLoc, POINT_LIGHTS_NUM);
    
    for (var i = 0; i < POINT_LIGHTS_NUM; i ++) {
        var single_light = lights[i];
        if (single_light.camera) {
            
            gl.uniform3f(this.lightsLoc[i].positionLoc, 
                single_light.camera.eye_point.elements[0],
                single_light.camera.eye_point.elements[1],
                single_light.camera.eye_point.elements[2],
            );
        }

        else {
            gl.uniform3f(this.lightsLoc[i].positionLoc, 
                single_light.position[0],
                single_light.position[1],
                single_light.position[2],
            );
        }
        gl.uniform4f(this.lightsLoc[i].ambientLoc, 
            single_light.ambColor[0],
            single_light.ambColor[1],
            single_light.ambColor[2],
            single_light.ambColor[3]
        );
        gl.uniform4f(this.lightsLoc[i].specularLoc, 
            single_light.specColor[0],
            single_light.specColor[1],
            single_light.specColor[2],
            single_light.specColor[3]
        );

        gl.uniform4f(this.lightsLoc[i].diffusiveLoc, 
            single_light.difColor[0],
            single_light.difColor[1],
            single_light.difColor[2],
            single_light.difColor[3]
        );
        gl.uniform1i(this.lightsLoc[i].onLoc, single_light.on);
    }


    // gl.vertexAttribPointer(this.a_PtSiz1Loc,this.vboFcount_a_PtSiz1, 
    //                        gl.FLOAT, false, 
    // 						           this.vboStride,	this.vboOffset_a_PtSiz1);	
    //-- Enable this assignment of the attribute to its' VBO source:
    gl.enableVertexAttribArray(this.a_Pos1Loc);
    gl.enableVertexAttribArray(this.a_Colr1Loc);
    gl.enableVertexAttribArray(this.a_Norm1Loc);
    // gl.enableVertexAttribArray(this.a_PtSiz1Loc);
}

VBObox2.prototype.passMat = function() {
    gl.uniform4f(this.KsLoc, 
    this.material.K_spec[0],
    this.material.K_spec[1],
    this.material.K_spec[2],
    this.material.K_spec[3]
    );
gl.uniform4f(this.KdLoc, 
        this.material.K_diff[0],
        this.material.K_diff[1],
        this.material.K_diff[2],
        this.material.K_diff[3]
    );
gl.uniform4f(this.KaLoc, 
        this.material.K_ambi[0],
        this.material.K_ambi[1],
        this.material.K_ambi[2],
        this.material.K_ambi[3]
    );
    gl.uniform1f(this.shinyLoc, this.material.K_shiny);

} 



VBObox2.prototype.isReady = function() {
//==============================================================================
// Returns 'true' if our WebGL rendering context ('gl') is ready to render using
// this objects VBO and shader program; else return false.
// see: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter

var isOK = true;

    if(gl.getParameter(gl.CURRENT_PROGRAM) != this.shaderLoc)  {
    console.log(this.constructor.name + 
                            '.isReady() false: shader program at this.shaderLoc not in use!');
    isOK = false;
    }
    if(gl.getParameter(gl.ARRAY_BUFFER_BINDING) != this.vboLoc) {
        console.log(this.constructor.name + 
                            '.isReady() false: vbo at this.vboLoc not in use!');
    isOK = false;
    }
    return isOK;
}



VBObox2.prototype.adjust = function() {
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
    this.ModelMatrix.translate(20, 0 ,0);
    this.ModelMatrix.rotate(g_angleNow1, 1, 0, 0);	// -spin drawing axes,
    this.scale([2,2,2])
    // this.ModelMatrix.scale(0.25,0.25,0.25);	// -spin drawing axes,
    // this.ModelMatrix.translate(0.35, -0.15, 0);						// then translate them.
    //  Transfer new uniforms' values to the GPU:-------------
    // Send  new 'ModelMat' values to the GPU's 'u_ModelMat1' uniform: 
    this.updateMatricies();
    this.draw();			  

}

VBObox2.prototype.draw = function() {
//=============================================================================
// Send commands to GPU to select and render current VBObox contents.

    // check: was WebGL context set to use our VBO & shader program?
    if(this.isReady()==false) {
        console.log('ERROR! before' + this.constructor.name + 
                            '.draw() call you needed to call this.switchToMe()!!');
    }

    // ----------------------------Draw the contents of the currently-bound VBO:
    gl.drawArrays(gl.TRIANGLE_STRIP,		    // select the drawing primitive to draw:
                    // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
                    //          gl.TRIANGLES, gl.TRIANGLE_STRIP,
                                0, 								// location of 1st vertex to draw;
                                this.vboVerts);		// number of vertices to draw on-screen.
}


VBObox2.prototype.reload = function() {
//=============================================================================
// Over-write current values in the GPU for our already-created VBO: use 
// gl.bufferSubData() call to re-transfer some or all of our Float32Array 
// contents to our VBO without changing any GPU memory allocations.

    gl.bufferSubData(gl.ARRAY_BUFFER, 	// GLenum target(same as 'bindBuffer()')
                    0,                  // byte offset to where data replacement
                                        // begins in the VBO.
                                        this.vboContents);   // the JS source-data array used to fill VBO
}
VBObox2.prototype.toggle = function() {
    //=============================================================================
    // Over-write current values in the GPU for our already-created VBO: use 
    // gl.bufferSubData() call to re-transfer some or all of our Float32Array 
    // contents to our VBO without changing any GPU memory allocations.
    this.show = !this.show;
}

VBObox2.prototype.setMatl = function(mat) {
    this.matNum = mat;
    this.material.setMatl(this.matNum);
    

}

VBObox2.prototype.incMat = function() {
    //=============================================================================
    // Over-write current values in the GPU for our already-created VBO: use 
    // gl.bufferSubData() call to re-transfer some or all of our Float32Array 
    // contents to our VBO without changing any GPU memory allocations.
    this.matNum = (this.matNum + 1) % 22;
    this.material.setMatl(this.matNum + 1);
    this.passMat();
}
VBObox2.prototype.updateMatricies = function() {
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

}
VBObox2.prototype.PopAndPush = function() {
    this.ModelMatrix = popMatrix();
    pushMatrix(this.ModelMatrix);
}

VBObox2.prototype.rotate = function (angle, axis) {
    this.ModelMatrix.rotate(angle, axis[0], axis[1], axis[2]);
}

VBObox2.prototype.setRotate = function(angle, axis) {
    this.ModelMatrix.setRotate(angle, axis[0], axis[1], axis[2]);
}

VBObox2.prototype.translate = function(axis) {
    this.ModelMatrix.translate(axis[0], axis[1], axis[2]);
}

VBObox2.prototype.setTranslate = function(axis) {
    this.ModelMatrix.setTranslate(axis[0], axis[1], axis[2]);
}

VBObox2.prototype.scale = function(axis) {
    this.ModelMatrix.scale(axis[0], axis[1], axis[2]);
}

VBObox2.prototype.setScale = function(axis) {
    this.ModelMatrix.setScale(axis[0], axis[1], axis[2]);
}

VBObox2.prototype.setTriangle = function() {
    this.draw = function() {
    if(this.isReady()==false) {
        console.log('ERROR! before' + this.constructor.name + 
                            '.draw() call you needed to call this.switchToMe()!!');
    }

    // ----------------------------Draw the contents of the currently-bound VBO:
    gl.drawArrays(gl.TRIANGLES,		    // select the drawing primitive to draw:
                    // choices: gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, 
                    //          gl.TRIANGLES, gl.TRIANGLE_STRIP,
                                0, 								// location of 1st vertex to draw;
                                this.vboVerts);		// number of vertices to draw on-screen.
}
}

VBObox2.prototype.changeContent = function (config) {

    var contents =   Float32Concat (Float32Concat(new Float32Array(config[0]), new Float32Array(config[1])), new Float32Array(config[2]));

    this.vboContents = contents
    this.vboVerts = config[3];							// # of vertices held in 'vboContents' array;
    this.FSIZE = this.vboContents.BYTES_PER_ELEMENT;  
    this.vboBytes = this.vboContents.length * this.FSIZE;               
    this.vboStride = this.vboBytes / this.vboVerts;     
    this.vboFcount_a_Pos1 =  4;    // # of floats in the VBO needed to store the
                                // attribute named a_Pos1. (4: x,y,z,w values)
    this.vboFcount_a_Colr1 = 4;   // # of floats for this attrib (r,g,b values)
    this.vboFcount_a_Norm1 = 4;   // # of floats for this attrib (r,g,b values)

    // this.vboFcount_a_PtSiz1 = 1;  // # of floats for this attrib (just one!)   
    console.assert((this.vboFcount_a_Pos1 +     // check the size of each and
                    this.vboFcount_a_Colr1
                    + this.vboFcount_a_Norm1) *   // every attribute in our VBO
                    this.FSIZE == this.vboStride, // for agreeement with'stride'
                    "Uh oh! VBOthis1.vboStride disagrees with attribute-size values!");
                    
                //----------------------Attribute offsets
    this.vboOffset_a_Pos1 = 0;    //# of bytes from START of vbo to the START
                                    // of 1st a_Pos1 attrib value in vboContents[]
    this.vboOffset_a_Colr1 = (this.vboFcount_a_Pos1) * this.FSIZE * this.vboVerts;  
    // console.log(this.vboOffset_a_Colr1)
    this.vboOffset_a_Norm1 = (this.vboFcount_a_Pos1 + this.vboFcount_a_Colr1) * this.FSIZE * this.vboVerts;  
    // console.log(this.vboOffset_a_Norm1)
}