
var multi_lights_groud_phong_vert =   'precision highp float;\n' +

'struct LightT {\n' + 
'   vec4 specColor;\n' + 
'   vec4 difColor;\n' +
'   vec4 ambColor;\n' +
'   vec3 pos;\n' +
'   int on;\n' + 
'   };\n' +


'uniform mat4 u_ModelMatrix;\n' +
'uniform mat4 u_NormalMatrix;\n' +
'uniform mat4 u_CameraMatrix;\n' +

'uniform vec4 Ka;\n' +
'uniform vec4 Ks;\n' +
'uniform vec4 Kd;\n' +
'uniform float shiny;\n' +

'uniform int att_mode;\n' + 
'uniform int num_lights;\n' + 

'uniform LightT lights[2];\n' + 


'attribute vec4 a_Pos1;\n' +
'attribute vec4 a_Norm1;\n' +
'attribute vec4 a_Colr1;\n'+
'varying vec4 v_Colr1;\n' +


'void main() {\n' +
// '  gl_PointSize = 1s;\n' +
'  gl_Position = (u_CameraMatrix* (u_ModelMatrix))* a_Pos1 + 0.000000001 * a_Colr1;\n' +
'  vec4 pos = u_ModelMatrix * a_Pos1;\n' +
'  vec4 normal = u_NormalMatrix * a_Norm1;\n' +
'  vec3 N = normalize(normal.xyz);\n' +
'  v_Colr1  = vec4(0,0,0,0);\n' + 
'  for(int i = 0; i < 2; i ++) {\n' +

    '  if (lights[i].on == 1) {\n' +
        '  vec3 L = normalize(-pos.xyz + lights[i].pos);\n' +
        '  float lambertian = max(dot(N, L), 0.0);\n' +
        '  float specular = 0.0;\n' +
        '  if (lambertian > 0.0) {\n' +
            '   vec3 R = reflect(-L, N);\n' +
            '   float specAngle = max(dot(R, L), 0.0);\n' +
            '   specular = pow(specAngle, shiny) ;\n' +
            '   ;}\n' +
        '	v_Colr1 +=  ((Ks * specular * lights[i].specColor) +  Kd * lambertian * lights[i].difColor ) + Ka * lights[i].ambColor;\n' + 

    '  };\n' +
'  };\n' +
'  if (v_Colr1  == vec4(0,0,0,0)){\n' + 
'     v_Colr1  = vec4(0,0,0,1);  ' +
'  };\n' +
' }\n';

var multi_lights_groud_phong_frag =   'precision mediump float;\n' +
'varying vec4 v_Colr1;\n' +
'void main() {\n' +
'  gl_FragColor = v_Colr1 ;\n' +  
'}\n';