
function makeCoords() {
    var body = new Float32Array([
        0,0,0,1,
        0,0,100,1,
        0,0,0,1,
        0,100,0,1,
        0,0,0,1,
        100,0,0,1,
    ]);

    var color = new Float32Array([
    1,	0.0, 0.0, 1.0,
    1,	0.0, 0.0, 1,
    1,	1.0, 0.0,1,
    1,	1.0, 0.0,1,
    0,	0.0, 1.0,1,
    0,	0.0, 1.0,1,
    ])



    return [[],[], 6]

}

function pushPosition(body, points) {
    body.push(points[0]);
    body.push(points[1]);
    body.push(points[2]);
    body.push(points[3]);
  
  }

function scalarMultiply(array, c){
    res = []
    for (var i = 0; i < array.length; i ++){
        res.push (array[i] * c);
    }
    return res;
}
function generateGrids() {
    var xlen = 100;
    var ylen = 100;
    var left = -xlen/2;
    var right = -left;
    var top = ylen/2;
    var bottom  = -top;
    var grids = 1000;
    var dis = xlen/grids;
    var body = [];
    var color = [];
    var total = 0;
    for(var i= 0; i < grids/2; i ++) {
      pushPosition(body, [left + dis* i, top, 0.0, 1.0]);
      pushPosition(body, [left + dis* i, bottom, 0.0, 1.0]);
      pushPosition(body, [left, top - i * dis, 0.0, 1.0]);
      pushPosition(body, [right, top - i * dis, 0.0, 1.0]);
      pushPosition(color, [0, 255/256, 127/256, 1.0]);
      pushPosition(color, [0, 255/256, 127/256, 1.0]);
      pushPosition(color, [	179/256, 0, 179/256, 1.0]);
      pushPosition(color, [	179/256, 0, 179/256, 1.0]);
  
      total = total + 4;
    }
  
    for(var i= grids/2 + 1; i < grids + 1; i ++) {
      pushPosition(body, [left + dis* i, top, 0.0, 1.0]);
      pushPosition(body, [left + dis* i, bottom, 0.0, 1.0]);
      pushPosition(body, [left, top - i * dis, 0.0, 1.0]);
      pushPosition(body, [right, top - i * dis, 0.0, 1.0]);
      pushPosition(color, [214/256, 116/256, 24/256, 1.0]);
      pushPosition(color, [214/256, 116/256, 24/256, 1.0]);
      pushPosition(color, [254/256, 242/256, 78/256, 1.0]);
      pushPosition(color, [254/256, 242/256, 78/256, 1.0]);
  
      total = total + 4;
    }
  
    return [body, color, total];
  
  
}

function generateCircle(phi, R, levels) {
    var r = R * Math.cos(phi*(2*Math.PI)/360.0);
    if (phi == 90 || phi == -90) {
      r = 0;
    }
    // console.log(r);
    var z = R * Math.sin(phi*(2*Math.PI)/360.0);
    var res = [];
    var angle = 0;
    for (angle = 360; angle > 0; angle = angle - 180/levels) {
      if (r != 0) {
      res.push([r * Math.cos(angle*(2*Math.PI)/360.0),r * Math.sin(angle*(2*Math.PI)/360.0), z, 1.0])}
      else {
        res.push([0,0,z,1.0]);
      }
    }
    res.push([r, 0,z, 1.0]);
    // console.log(res);
    return res;
}

  
function generateSnowBall(color) {
    var levels = 36;
    var r = 5;
    radius = r;
    var phi = 90;
    var points = [];
    var total = 0;
    var body = [];
    var colors = [];
    var normal = [];
    for (phi; phi >= -90; phi = phi - (180.0/levels)) {
        // console.log(phi);
        points.push(generateCircle(phi, r, levels));
    }

    for (var i = 0; i < points.length - 1; i = i + 1){
        var deg = Math.abs(0.5- 0.5* i/(6*points.length)) * 2
        var newColor = scalarMultiply(color, deg);
        newColor[3] = 1.0;
        for (var j = 0; j < points[i].length - 1; j = j + 1) {
        pushPosition(body, points[i][j + 1]);
        pushPosition(body, points[i][j]);
        pushPosition(body, points[i + 1][j]);

        pushPosition(body, points[i][j + 1]);
        pushPosition(body, points[i + 1][j]);
        pushPosition(body, points[i + 1][j + 1]);


        pushPosition(normal, points[i][j + 1]);
        pushPosition(normal, points[i][j]);
        pushPosition(normal, points[i + 1][j]);

        pushPosition(normal, points[i][j + 1]);
        pushPosition(normal, points[i + 1][j]);
        pushPosition(normal, points[i + 1][j + 1]);

        // for (var k = 0 ; k < 6; k ++) {
        //   var color = [0.0, 0.0,0.0,1.0];
        //   color[Math.floor((Math.random()* 3))] = 1.0;

        //   pushPosition(colors, color);
        // }
        pushPosition(colors, newColor);
        pushPosition(colors, newColor);
        pushPosition(colors, newColor);
        pushPosition(colors, newColor);
        pushPosition(colors, newColor);
        pushPosition(colors, newColor);


        total = total + 6;

        }
    }
    return [body, colors, normal, total];

}


function makeGroundGrid() {
    //==============================================================================
    // Create a list of vertices that create a large grid of lines in the x,y plane
    // centered at the origin.  Draw this shape using the GL_LINES primitive.
    
        var xcount = 100;			// # of lines to draw in x,y to make the grid.
        var ycount = 100;		
        var xymax	= 50.0;			// grid size; extends to cover +/-xymax in x and y.
         var xColr = new Float32Array([1.0, 1.0, 0.3]);	// bright yellow
         var yColr = new Float32Array([0.5, 1.0, 0.5]);	// bright green.
         
        // Create an (global) array to hold this ground-plane's vertices:
        var total = 2*(xcount+ycount)
        var g_floatsPerVertex = 7;
        var g_gndVertAry = new Float32Array(g_floatsPerVertex*2*(xcount+ycount));
                            // draw a grid made of xcount+ycount lines; 2 vertices per line.
                            
        var xgap = xymax/(xcount-1);		// HALF-spacing between lines in x,y;
        var ygap = xymax/(ycount-1);		// (why half? because v==(0line number/2))
        
        // First, step thru x values as we make vertical lines of constant-x:
        for(v=0, j=0; v<2*xcount; v++, j+= g_floatsPerVertex) {
            if(v%2==0) {	// put even-numbered vertices at (xnow, -xymax, 0)
                g_gndVertAry[j  ] = -xymax + (v  )*xgap;	// x
                g_gndVertAry[j+1] = -xymax;								// y
                g_gndVertAry[j+2] = 0.0;									// z
                g_gndVertAry[j+3] = 1.0;									// w.
            }
            else {				// put odd-numbered vertices at (xnow, +xymax, 0).
                g_gndVertAry[j  ] = -xymax + (v-1)*xgap;	// x
                g_gndVertAry[j+1] = xymax;								// y
                g_gndVertAry[j+2] = 0.0;									// z
                g_gndVertAry[j+3] = 1.0;									// w.
            }
            g_gndVertAry[j+4] = xColr[0];			// red
            g_gndVertAry[j+5] = xColr[1];			// grn
            g_gndVertAry[j+6] = xColr[2];			// blu
        }
        // Second, step thru y values as wqe make horizontal lines of constant-y:
        // (don't re-initialize j--we're adding more vertices to the array)
        for(v=0; v<2*ycount; v++, j+= g_floatsPerVertex) {
            if(v%2==0) {		// put even-numbered vertices at (-xymax, ynow, 0)
                g_gndVertAry[j  ] = -xymax;								// x
                g_gndVertAry[j+1] = -xymax + (v  )*ygap;	// y
                g_gndVertAry[j+2] = 0.0;									// z
                g_gndVertAry[j+3] = 1.0;									// w.
            }
            else {					// put odd-numbered vertices at (+xymax, ynow, 0).
                g_gndVertAry[j  ] = xymax;								// x
                g_gndVertAry[j+1] = -xymax + (v-1)*ygap;	// y
                g_gndVertAry[j+2] = 0.0;									// z
                g_gndVertAry[j+3] = 1.0;									// w.
            }
            g_gndVertAry[j+4] = yColr[0];			// red
            g_gndVertAry[j+5] = yColr[1];			// grn
            g_gndVertAry[j+6] = yColr[2];			// blu
        }

        return [g_gndVertAry, total]
    }

function makeSphere2() {
    //==============================================================================
    // Make a sphere from one TRIANGLE_STRIP drawing primitive,  using the
    // 'stepped spiral' design (Method 2) described in the class lecture notes.   
    // Sphere radius==1.0, centered at the origin, with 'south' pole at 
    // (x,y,z) = (0,0,-1) and 'north' pole at (0,0,+1).  The tri-strip starts at the
    // south-pole end-cap spiraling upwards (in +z direction) in CCW direction as  
    // viewed from the origin looking down (from inside the sphere). 
    // Between the south end-cap and the north, it creates ring-like 'slices' that 
    // defined by parallel planes of constant z.  Each slice of the tri-strip 
    // makes up an equal-lattitude portion of the sphere, and the stepped-spiral
    // slices follow the same design used to the makeCylinder2() function.
    //
    // (NOTE: you'll get better-looking results if you create a 'makeSphere3() 
    // function that uses the 'degenerate stepped spiral' design (Method 3 in 
    // lecture notes).
    //
      var g_floatsPerVertex = 7;
      var slices =12;		// # of slices of the sphere along the z axis, including 
                                          // the south-pole and north pole end caps. ( >=2 req'd)
      var sliceVerts	= 21;	// # of vertices around the top edge of the slice
                                            // (same number of vertices on bottom of slice, too)
                                            // (HINT: odd# or prime#s help avoid accidental symmetry)
      var topColr = new Float32Array([0.3, 0.3, 0.3]);	// South Pole: dark-gray
      var botColr = new Float32Array([0.8, 0.8, 0.8]);	// North Pole: light-gray.
      var errColr = new Float32Array([1.0, 0.2, 0.2]);	// Bright-red trouble colr
      var sliceAngle = Math.PI/slices;	// One slice spans this fraction of the 
      // 180 degree (Pi radian) lattitude angle between south pole and north pole.
    var total =  ((slices*2*sliceVerts) -2) 
        // Create a (global) array to hold this sphere's vertices:
      var g_sphVertAry = new Float32Array(  ((slices*2*sliceVerts) -2) * g_floatsPerVertex);
                                            // # of vertices * # of elements needed to store them. 
                                            // Each end-cap slice requires (2*sliceVerts -1) vertices 
                                            // and each slice between them requires (2*sliceVerts).
        // Create the entire sphere as one single tri-strip array. This first for() 
        //loop steps through each 'slice', and the for() loop it contains steps 
        //through each vertex in the current slice.
        // INITIALIZE:
        var cosBot = 0.0;					// cosine and sine of the lattitude angle for
        var sinBot = 0.0;					// 	the current slice's BOTTOM (southward) edge. 
        // (NOTE: Lattitude = 0 @equator; -90deg @south pole; +90deg at north pole)
        var cosTop = 0.0;					// "	" " for current slice's TOP (northward) edge
        var sinTop = 0.0;
        // for() loop's s var counts slices; 
        // 				  its v var counts vertices; 
        // 					its j var counts Float32Array elements 
        //					(vertices * elements per vertex)	
        var j = 0;							// initialize our array index
        var isFirstSlice = 1;		// ==1 ONLY while making south-pole slice; 0 otherwise
        var isLastSlice = 0;		// ==1 ONLY while making north-pole slice; 0 otherwise
        for(s=0; s<slices; s++) {	// for each slice of the sphere,---------------------
            // For current slice's top & bottom edges, find lattitude angle sin,cos:
            if(s==0) {
                isFirstSlice = 1;		// true ONLY when we're creating the south-pole slice
                cosBot =  0.0; 			// initialize: first slice's lower edge is south pole.
                sinBot = -1.0;			// (cos(lat) sets slice diameter; sin(lat) sets z )
            }
            else {					// otherwise, set new bottom edge == old top edge
                isFirstSlice = 0;	
                cosBot = cosTop;
                sinBot = sinTop;
            }								// then compute sine,cosine of lattitude of new top edge.
            cosTop = Math.cos((-Math.PI/2) +(s+1)*sliceAngle); 
            sinTop = Math.sin((-Math.PI/2) +(s+1)*sliceAngle);
            // (NOTE: Lattitude = 0 @equator; -90deg @south pole; +90deg at north pole)
            // (       use cos(lat) to set slice radius, sin(lat) to set slice z coord)
            // Go around entire slice; start at x axis, proceed in CCW direction 
            // (as seen from origin inside the sphere), generating TRIANGLE_STRIP verts.
            // The vertex-counter 'v' starts at 0 at the start of each slice, but:
            // --the first slice (the South-pole end-cap) begins with v=1, because
            // 		its first vertex is on the TOP (northwards) side of the tri-strip
            // 		to ensure correct winding order (tri-strip's first triangle is CCW
            //		when seen from the outside of the sphere).
            // --the last slice (the North-pole end-cap) ends early (by one vertex)
            //		because its last vertex is on the BOTTOM (southwards) side of slice.
            //
            if(s==slices-1) isLastSlice=1;// (flag: skip last vertex of the last slice).
            for(v=isFirstSlice;    v< 2*sliceVerts-isLastSlice;   v++,j+=g_floatsPerVertex)
            {						// for each vertex of this slice,
                if(v%2 ==0) { // put vertices with even-numbered v at slice's bottom edge;
                                            // by circling CCW along longitude (east-west) angle 'theta':
                                            // (0 <= theta < 360deg, increases 'eastward' on sphere).
                                            // x,y,z,w == cos(theta),sin(theta), 1.0, 1.0
                                            // where			theta = 2*PI*(v/2)/capVerts = PI*v/capVerts
                    g_sphVertAry[j  ] = cosBot * Math.cos(Math.PI * v/sliceVerts);	// x
                    g_sphVertAry[j+1] = cosBot * Math.sin(Math.PI * v/sliceVerts);	// y
                    g_sphVertAry[j+2] = sinBot;																			// z
                    g_sphVertAry[j+3] = 1.0;																				// w.				
                }
                else {	// put vertices with odd-numbered v at the the slice's top edge
                                // (why PI and not 2*PI? because 0 <= v < 2*sliceVerts
                                // and thus we can simplify cos(2*PI* ((v-1)/2)*sliceVerts)
                                // (why (v-1)? because we want longitude angle 0 for vertex 1).  
                    g_sphVertAry[j  ] = cosTop * Math.cos(Math.PI * (v-1)/sliceVerts); 	// x
                    g_sphVertAry[j+1] = cosTop * Math.sin(Math.PI * (v-1)/sliceVerts);	// y
                    g_sphVertAry[j+2] = sinTop;		// z
                    g_sphVertAry[j+3] = 1.0;	
                }
                // finally, set some interesting colors for vertices:
                if(v==0) { 	// Troublesome vertex: this vertex gets shared between 3 
                // important triangles; the last triangle of the previous slice, the 
                // anti-diagonal 'step' triangle that connects previous slice and next 
                // slice, and the first triangle of that next slice.  Smooth (Gouraud) 
                // shading of this vertex prevents us from choosing separate colors for 
                // each slice.  For a better solution, use the 'Degenerate Stepped Spiral' 
                // (Method 3) described in the Lecture Notes.
                    g_sphVertAry[j+4]=errColr[0]; 
                    g_sphVertAry[j+5]=errColr[1]; 
                    g_sphVertAry[j+6]=errColr[2];				
                    }
                else if(isFirstSlice==1) {	
                    g_sphVertAry[j+4]=botColr[0]; 
                    g_sphVertAry[j+5]=botColr[1]; 
                    g_sphVertAry[j+6]=botColr[2];	
                    }
                else if(isLastSlice==1) {
                    g_sphVertAry[j+4]=topColr[0]; 
                    g_sphVertAry[j+5]=topColr[1]; 
                    g_sphVertAry[j+6]=topColr[2];	
                }
                else {	// for all non-top, not-bottom slices, set vertex colors randomly
                        g_sphVertAry[j+4]= Math.random()/2;  	// 0.0 <= red <= 0.5
                        g_sphVertAry[j+5]= Math.random()/2;		// 0.0 <= grn <= 0.5 
                        g_sphVertAry[j+6]= Math.random()/2;		// 0.0 <= blu <= 0.5					
                }
            }
        }

        return [g_sphVertAry,total]
    }



function generateColorfulSquare(square, height) {

    var body = [];
    var normal = [];
    var color = [];
    var total = 0;
    // console.log(square);
    
    function concatHeight(idx, side) {
        if (side == 1) {
        return square[idx].concat([height/2, 1.0]);
        }
        else {
        return square[idx].concat([-height/2, 1.0]);
        }
    }
    
    //upper base
    pushPosition(body, concatHeight(0, 1));
    pushPosition(body, concatHeight(2, 1));
    pushPosition(body, concatHeight(1, 1));
    pushPosition(body, concatHeight(0, 1));
    pushPosition(body, concatHeight(3, 1));
    pushPosition(body, concatHeight(2, 1));


    pushPosition(normal, [0,0,1,1]);
    pushPosition(normal, [0,0,1,1]);
    pushPosition(normal, [0,0,1,1]);
    pushPosition(normal, [0,0,1,1]);
    pushPosition(normal, [0,0,1,1]);
    pushPosition(normal, [0,0,1,1]);




    //sides
    
    for (var i = 0; i < 4; i ++) {
        pushPosition(body, concatHeight((2 + i) % 4, -1));
        pushPosition(body, concatHeight((2 + i + 1) % 4, 1));
        pushPosition(body, concatHeight((2 + i + 1) % 4, -1));
        pushPosition(body, concatHeight((2 + i) % 4, 1));
        pushPosition(body, concatHeight((2 + i + 1) % 4, 1));
        pushPosition(body, concatHeight((2 + i) % 4, -1));


        var prev = square[(2 + i) % 4];
        var now = square[(3 + i) % 4];

        pushPosition(normal, [prev[1] - now[1], now[0] - prev[0],0,1]);
        pushPosition(normal, [prev[1] - now[1], now[0] - prev[0],0,1]);
        pushPosition(normal, [prev[1] - now[1], now[0] - prev[0],0,1]);
        pushPosition(normal, [prev[1] - now[1], now[0] - prev[0],0,1]);
        pushPosition(normal, [prev[1] - now[1], now[0] - prev[0],0,1]);
        pushPosition(normal, [prev[1] - now[1], now[0] - prev[0],0,1]);




    }
     //lower base
    pushPosition(body, concatHeight(1, -1))
    pushPosition(body, concatHeight(2, -1));
    pushPosition(body, concatHeight(0, -1));
    pushPosition(body, concatHeight(0, -1));
    pushPosition(body, concatHeight(2, -1));
    pushPosition(body, concatHeight(3, -1));



    pushPosition(normal, [0,0,-1,1]);
    pushPosition(normal, [0,0,-1,1]);
    pushPosition(normal, [0,0,-1,1]);
    pushPosition(normal, [0,0,-1,1]);
    pushPosition(normal, [0,0,-1,1]);
    pushPosition(normal, [0,0,-1,1]);

    total = 36;

    for (var i = 0;  i < total/6; i ++) {
        randcolor = [Math.random(),Math.random(),Math.random(), 1.0]
        // console.log(randcolor)
        pushPosition(color, [117/256, 26/256, 51/256, 1.0]);
        pushPosition(color, [179/256, 66/256, 51/256, 1.0]);
        pushPosition(color, [210/256, 143/256, 51/256, 1.0]);
        pushPosition(color, [212/256, 185/256, 51/256, 1.0]);
        pushPosition(color, [78/256, 162/256, 162/256, 1.0]);
        pushPosition(color, [26/256, 134/256, 147/256, 1.0]);
    
    }
     
    return [body, color, normal, total];
    
}

function appendSameColor(r, g, b, a, num, position) {
    var i = 0;
    for (i; i < num; i ++) {
      pushPosition(position, [r,g,b, a]);
    }
  }
function appendSameColorArray(array, position) {
    // console.log(array.length);
    var i = 0;
    for (i; i < array.length; i = i + 5) {
        appendSameColor(array[i], array[i + 1], array[i + 2], array[i + 3], array[i + 4], position);
    }
}
function generateBody() {
    var s3 = Math.sqrt(3);
    var body = [ 
      // upper side
      0.25, -s3/4, 0.25, 1.0,
      0.375, 0, 0.25 , 1.0,
      0.25, s3/4, 0.25, 1.0,
  
      0.25, s3/4, 0.25, 1.0,
      -0.25, -s3/4, 0.25, 1.0,
      0.25, -s3/4, 0.25, 1.0,
  
      -0.25, -s3/4, 0.25, 1.0,
      0.25, s3/4, 0.25, 1.0,
      -0.25, s3/4, 0.25, 1.0,
  
      -0.25, s3/4, 0.25, 1.0,
      -0.375, 0, 0.25, 1.0,
      -0.25, -s3/4, 0.25, 1.0,   
  
      //lower side
      0.25, -s3/4, -0.25, 1.0,
      0.25, s3/4, -0.25, 1.0,
      0.375, 0, -0.25 , 1.0,
  
      0.25, s3/4, -0.25, 1.0,
      0.25, -s3/4, -0.25, 1.0,
      -0.25, -s3/4, -0.25, 1.0,
  
      -0.25, -s3/4, -0.25, 1.0,
      -0.25, s3/4, -0.25, 1.0,
      0.25, s3/4, -0.25, 1.0,
  
      -0.25, s3/4, -0.25, 1.0,
      -0.25, -s3/4, -0.25, 1.0,
      -0.375, 0, -0.25, 1.0,   
      // down side +
      0.25, -s3/4, 0.25, 1.0,
      -0.25, -s3/4, 0.25, 1.0,
      -0.5, -s3/2, 0, 1.0,
  
      0.25, -s3/4, 0.25, 1.0,
      -0.5, -s3/2, 0, 1.0,
      0.5, -s3/2, 0, 1.0,
  
      //down side - 
      0.5, -s3/2, 0, 1.0,
      -0.5, -s3/2, 0, 1.0,
      -0.25, -s3/4, -0.25, 1.0,
  
      -0.25, -s3/4, -0.25, 1.0,
      0.25, -s3/4, -0.25, 1.0,
      0.5, -s3/2, 0, 1.0,
  
      // 4 oclock +
      0.375, 0, 0.25 , 1.0,
      0.25, -s3/4, 0.25, 1.0,
      0.5, -s3/2, 0, 1.0,
  
      0.375, 0, 0.25 , 1.0,
      0.5, -s3/2, 0, 1.0,
      0.75, 0, 0, 1.0,
  
      // 4 oclock -
      0.75, 0, 0, 1.0,
      0.5, -s3/2, 0, 1.0,
      0.25, -s3/4, -0.25, 1.0,
  
      0.75, 0, 0, 1.0,
      0.25, -s3/4, -0.25, 1.0,
      0.375, 0.0, -0.25, 1.0,
  
      // 2 oclock +
      0.25, s3/4, 0.25, 1.0,
      0.375, 0.0, 0.25, 1.0,
      0.75, 0, 0, 1.0,
  
      0.25, s3/4, 0.25, 1.0,
      0.75, 0, 0, 1.0,
      0.5, s3/2, 0, 1.0,
  
      //2 oclock -
      0.5, s3/2, 0, 1.0,
      0.75, 0, 0, 1.0,
      0.375, 0, -0.25, 1.0,
  
      0.5, s3/2, 0, 1.0,
      0.375, 0, -0.25, 1.0,
      0.25, s3/4, -0.25, 1.0,
  
      //up + 
      -0.25, s3/4, 0.25, 1.0,
      0.25, s3/4, 0.25, 1.0,
      -0.5, s3/2, 0, 1.0,
  
      0.25, s3/4, 0.25, 1.0,
      0.5, s3/2, 0, 1.0,
      -0.5, s3/2, 0, 1.0,
      //up -
      -0.5, s3/2, 0, 1.0,
      0.5, s3/2, 0, 1.0,
      0.25, s3/4, -0.25, 1.0,
  
      -0.5, s3/2, 0, 1.0,
      0.25, s3/4, -0.25, 1.0,
      -0.25, s3/4, -0.25, 1.0,
  
      //10 oclock + 
      -0.375, 0, 0.25, 1.0,
      -0.25, s3/4, 0.25, 1.0,
      -0.5, s3/2, 0, 1.0,
  
      -0.5, s3/2, 0, 1.0,
      -0.75, 0, 0, 1.0,
      -0.375, 0, 0.25, 1.0,
  
      //10 oclock -
      -0.75, 0, 0, 1.0,
      -0.5, s3/2, 0, 1.0,
      -0.25, s3/4, -0.25, 1.0,
  
      -0.75, 0, 0, 1.0,
      -0.25, s3/4, -0.25, 1.0,
      -0.375, 0, -0.25, 1.0,
  
      //8 oclock + 
      -0.25, -s3/4, 0.25, 1.0,
      -0.375, 0, 0.25, 1.0,
      -0.75, 0, 0, 1.0,
  
      -0.25, -s3/4, 0.25, 1.0,
      -0.75, 0, 0, 1.0,
      -0.5, -s3/2, 0, 1.0,
  
      // 8 oclock -
      -0.5, -s3/2, 0, 1.0,
      -0.75, 0, 0, 1.0,
      -0.375, 0, -0.25, 1.0,
  
      -0.5, -s3/2, 0, 1.0,
      -0.375, 0, -0.25, 1.0,
      -0.25, -s3/4, -0.25, 1.0,
    ];  
  
  
    var color = [
      1.0, 0.0, 0.0,1.0, 12,
      0.0, 1.0, 0.0,1.0, 12,
      1.0, 0.0, 1.0, 1.0, 12,
      1.0, 0.5, 0.5, 1.0, 12,
      1.0, 1.0, 0.0, 1.0, 12,
      0.5, 0.5, 1.0, 1.0, 12,
      0.0, 1.0, 1.0, 1.0, 12,
      0.0, 0.5, 0.5, 1.0, 12, 
    ];

    var normal = generate_normals(body);

    var colors = [];
    appendSameColorArray(color, colors)
    return [body, colors, normal, 96];
  }

function generateCube() {
var h = 0.5;
var w = 0.125;
body = [
    -w/2, w/2, h, 1.0,
    -w/2, -w/2, h, 1.0,
    w/2, w/2, h, 1.0,

    w/2, w/2, h,1.0,
    -w/2, -w/2, h, 1.0,
    w/2, -w/2, h, 1.0,

    -w/2, -w/2, h, 1.0,
    -w/2, -w/2, 0, 1.0,
    w/2, -w/2, h, 1.0,

    w/2, -w/2, h, 1.0,
    -w/2, -w/2, 0, 1.0,
    w/2, -w/2, 0, 1.0,

    w/2, -w/2, h, 1.0,
    w/2, -w/2, 0, 1.0,
    w/2, w/2, h, 1.0,

    w/2, w/2, h, 1.0,
    w/2, -w/2, 0, 1.0,
    w/2, w/2, 0, 1.0,

    w/2, w/2, h, 1.0,
    w/2, w/2, 0, 1.0,
    -w/2, w/2, h, 1.0,

    -w/2, w/2, h, 1.0,
    w/2, w/2, 0, 1.0,
    -w/2, w/2, 0, 1.0,

    -w/2, w/2, h, 1.0,
    -w/2, w/2, 0, 1.0,
    -w/2, -w/2, h, 1.0,

    -w/2, -w/2, h, 1.0,
    -w/2, w/2, 0, 1.0,
    -w/2, -w/2, 0, 1.0,

    -w/2, -w/2, 0, 1.0,
    -w/2, w/2, 0, 1.0,
    w/2, -w/2, 0, 1.0,

    w/2, -w/2, 0,1.0,
    -w/2, w/2, 0, 1.0,
    w/2, w/2, 0, 1.0,




];

total = 6 * 6;

color = [
    0.5,0.5,0.5, 1.0, total
];

var normal = generate_normals(body);
var colors = [];
appendSameColorArray(color, colors)

return [body, colors, normal, total]
}
function generate_normals(body) {
    var l = body.length;
    var res = []
    for (var i = 0; i < l; i += 24) {
        var v1 = new Vector3([body[i + 4] - body[i], body[i + 5]- body[i + 1], body[i + 6] - body[i + 2]]);
        var v2 = new Vector3([body[i + 8] - body[4+ i], body[i + 9]- body[i + 4], body[i + 10] - body[i + 6]]);
        var v3 = v1.cross(v2);

        v3 = v3.elements
        for (var j = 0; j < 6; j ++) {
            res.push(v3[0]);
            res.push(v3[1]);
            res.push(v3[2]);
            res.push(1.0);
        }
    }
    return res
}

function generateCylinder() {
    var sides = 8;
    var height = 1;
    var body = [];
    var color = [];
    var radius = 0.5;
    var ceiling = 0.5;
    var upperCenter = [0,0,ceiling,1];
    var total = 0;
    var levels = 1;
    var floor = ceiling - levels* height;
    var lowerCenter = [0,0, ceiling - levels* height, 1];
    var normal = [];
    //upper base

    for (var i = 0; i < sides + 1; i ++) {
      var angle = switchToPi(360* (i - 0.5)/sides);
      var angle2 = switchToPi(360* (i + 0.5)/sides);
      pushPosition(body, [radius* Math.cos(angle2),radius* Math.sin(angle2), 0.5, 1.0]);
      pushPosition(body, upperCenter);
      pushPosition(body, [radius* Math.cos(angle),radius* Math.sin(angle), 0.5, 1.0]);

      total = total + 3;
      pushPosition(color, [0,0,0,1]);
      pushPosition(color, [0,0,0,1]);
      pushPosition(color, [0,0,0,1]);
      pushPosition(normal, [0,0,1,1]);
      pushPosition(normal, [0,0,1,1]);
      pushPosition(normal, [0,0,1,1]);


    }
    // sides
    for (var j = 0; j < levels; j ++){
      for (var i = 0; i < sides ; i ++) {
        var angle = switchToPi(360* (i - 0.5)/sides);
        var angle2 = switchToPi(360* (i + 0.5)/sides);
        var cos1 = Math.cos(angle);
        var cos2 = Math.cos(angle2);
        var sin1 = Math.sin(angle);
        var sin2 = Math.sin(angle2);
        var cos3 = Math.cos((angle + angle2) * 0.5)
        var sin3 = Math.sin((angle + angle2) * 0.5)

  

        pushPosition(body, [radius* cos1,radius* sin1, 0.5- height * j, 1.0]);
        pushPosition(body, [radius* cos1,radius* sin1, 0.5 - height * (j+ 1), 1.0]);
        pushPosition(body, [radius* cos2,radius* sin2, 0.5 - height * (j), 1.0]);
        
        pushPosition(body, [radius* cos2,radius* sin2, 0.5 - height * (j), 1.0]);
        pushPosition(body, [radius* cos1,radius* sin1, 0.5 - height * (j+ 1), 1.0]);
        pushPosition(body, [radius* cos2,radius* sin2, 0.5 - height * (j + 1), 1.0]);

        total = total + 6;
        pushPosition(color, [0,0,0,1]);
        pushPosition(color, [0,0,0,1]);
        pushPosition(color, [0,0,0,1]);      
        pushPosition(color, [0,0,0,1]);
        pushPosition(color, [0,0,0,1]);
        pushPosition(color, [0,0,0,1]);

        pushPosition(normal, [cos3,sin3, 0,1]);
        pushPosition(normal, [cos3,sin3, 0,1]);
        pushPosition(normal, [cos3,sin3, 0,1]);
        pushPosition(normal, [cos3,sin3, 0,1]);
        pushPosition(normal, [cos3,sin3, 0,1]);
        pushPosition(normal, [cos3,sin3, 0,1]);

      }
    }
    //bottom 
    for (var i = 0; i < sides; i ++) {
      var angle = switchToPi(360* (i - 0.5)/sides);
      var angle2 = switchToPi(360* (i + 0.5)/sides);
      pushPosition(body, [radius* Math.cos(angle),radius* Math.sin(angle), floor, 1.0]);
      pushPosition(body, lowerCenter);
      pushPosition(body, [radius* Math.cos(angle2),radius* Math.sin(angle2), floor, 1.0]);

      total = total + 3;
      pushPosition(color, [0,0,0,1]);
      pushPosition(color, [0,0,0,1]);
      pushPosition(color, [0,0,0,1]);

      pushPosition(normal, [0,0,-1,1]);
      pushPosition(normal, [0,0,-1,1]);
      pushPosition(normal, [0,0,-1,1]);


    }
    return [body, color, normal, total];
  }
  
  