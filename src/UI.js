
var Light = function(){

this.Ambient= [ 255, 255, 255]; // RGB array
this.Diffuse = [ 255, 255, 255]; // RGB array
this.Specular = [ 255, 255, 255 ]; // RGB array
this.on_off = 1;
this.x = 0;
this.y = 0;
this.z = 0;


}
var Params = function() {
this.Camera_Light = new Light();
this.Second_Light = new Light();
this.Second_Light.z = 45;
this.Shading = 0;
this.Lighting = 0;
this.att = 0;
this.Material = MATL_BRONZE_SHINY;
};

function colorFormatting(color) {
var res = [];
for (var i = 0; i < 3; i ++) {
    res.push(color[i]/255);
}
res.push(1.0);
return res;
}

function passColors(params, kind) {
var i = 0;
var l = objectList.length; 
for (i = 0; i < l; i ++){

    if (kind == 1) {
    objectList[i].ambColor = colorFormatting(params.Camera_Light.Ambient);
    }
    else if (kind == 3) {
    objectList[i].specColor = colorFormatting(params.Camera_Light.Specular);

    }
    else if (kind == 2) {
    objectList[i].difColor = colorFormatting(params.Camera_Light.Diffuse);
    }
    else if (kind == 4) {
    objectList[i].ambColor2 = colorFormatting(params.Second_Light.Ambient);

    }
    else if (kind == 6) {
    objectList[i].specColor2 = colorFormatting(params.Second_Light.Specular);

    }
    else if (kind == 5) {
    objectList[i].difColor2 = colorFormatting(params.Second_Light.Diffuse);

    }
}
}

function changeShaders(params) {

    if (params.Shading == 1) { //Phong shade
        if(params.Lighting == 1) {
            console.log('p_bp')
            phong_blin_phong();
        } 
        else {
            console.log('p_p')
            phong_phong();
        }
    }
    else {
        console.log(params.Lighting)
        if(params.Lighting == 1) {
            groud_bling_phong();
        } 
        else {
            console.log('g_p')
            groud_phong();
        }
    }
}

function changeATT(params) {
    console.log(params.att);
    if (params.att == 0) {
        att_mode0();
    }
    else if (params.att  == 1){
        att_mode1();
    }
    else{
        att_mode2();
    }
}

var params = new Params();
var gui = new dat.GUI();

var f3 = gui.addFolder('Choice of shaders');

var s1 = f3.add(params, 'Shading', { Gouraud: 0, Phong: 1} );
var s2 = f3.add(params, 'Lighting', { Phong: 0, Blinn_Phong: 1} );
s1.onChange(function(value) { changeShaders(params);});
s2.onChange(function(value) { changeShaders(params);});

var f1 = gui.addFolder('Camera Light');

var on_off = f1.add(params.Camera_Light, 'on_off', { On: 1, Off: 0});
on_off.onChange(function(value){turnOff(value)})
var col1 = f1.addColor(params.Camera_Light, 'Ambient');
col1.onChange(function(value) { passColors(params, 1);});

var col2 = f1.addColor(params.Camera_Light, 'Diffuse');
col2.onChange(function(value) {passColors(params, 2);});

var col3 = f1.addColor(params.Camera_Light, 'Specular');
col3.onChange(function(value) {passColors(params, 3);});


var f2 = gui.addFolder('Second Light');
var on_off2 = f2.add(params.Second_Light, 'on_off', { On: 1, Off: 0});
var loc2 = f2.addFolder('Set Second LightLocation');
var loc_x = loc2.add(params.Second_Light, "x");
loc_x.onFinishChange(function(value) { 
    console.log(value);
    var i = 0;
    var l = objectList.length; 
    for (i = 0; i < l; i ++){
        objectList[i].cameraPos2[0] = value;
    }
})
var loc_y = loc2.add(params.Second_Light, "y");
loc_y.onFinishChange(function(value) { 
    console.log(value);
    var i = 0;
    var l = objectList.length; 
    for (i = 0; i < l; i ++){
        objectList[i].cameraPos2[1] = value;
    }
})
var loc_z = loc2.add(params.Second_Light, "z");
loc_z.onFinishChange(function(value) { 
    console.log(value);
    var i = 0;
    var l = objectList.length; 
    for (i = 0; i < l; i ++){
        objectList[i].cameraPos2[2] = value;
    }
})


on_off2.onChange(function(value){turnOff2(value)})

var col4 = f2.addColor(params.Second_Light, 'Ambient');
col4.onChange(function(value) {passColors(params, 4);});

var col5 = f2.addColor(params.Second_Light, 'Diffuse');
col5.onChange(function(value) {passColors(params, 5);});

var col6 = f2.addColor(params.Second_Light, 'Specular');
col6.onChange(function(value) {passColors(params, 6);});

var f4 = gui.addFolder('Extra Credit');
var att = f4.add(params, 'att', { "Constant": 0, "1/n": 1, "1/n^2": 2} );
att.onChange(function(value) {changeATT(params);});

var mat = f4.add(params, 'Material', 1, 22);
mat.onChange(function(value) {part2Box.setMatl(Math.round(value));});



