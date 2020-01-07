var groud_phong_vert =   'precision highp float;\n' +				// req'd in OpenGL ES if we use 'float'
//
'uniform mat4 u_ModelMatrix;\n' +
'uniform mat4 u_NormalMatrix;\n' +
'uniform mat4 u_CameraMatrix;\n' +
'uniform vec3 cameraPos;\n' +
'uniform vec4 Ka;\n' +
'uniform vec4 Ks;\n' +
'uniform vec4 Kd;\n' +
'uniform float shiny;\n' +
'uniform vec4 specColor;\n' +
'uniform vec4 difColor;\n' +
'uniform int on;\n' + 
'uniform vec4 ambColor;\n' +
'uniform vec3 cameraPos2;\n' +
'uniform vec4 specColor2;\n' +
'uniform vec4 difColor2;\n' +
'uniform vec4 ambColor2;\n' +
'uniform int on2;\n' + 
'uniform int att_mode;\n' + 
'attribute vec4 a_Pos1;\n' +
'attribute vec4 a_Norm1;\n' +
'attribute vec4 a_Colr1;\n'+
// 'attribute float a_PtSiz1; \n' +
'varying vec4 v_Colr1;\n' +
//
'void main() {\n' +
// '  gl_PointSize = 1s;\n' +
'  gl_Position = (u_CameraMatrix* (u_ModelMatrix))* a_Pos1 + 0.000000001 * a_Colr1;\n' +
'  vec4 pos = u_ModelMatrix * a_Pos1;\n' +
'  vec4 normal = u_NormalMatrix * a_Norm1;\n' +
'  vec3 N = normalize(normal.xyz);\n' +
'  vec3 L = normalize(-pos.xyz + cameraPos);\n' +
'  float lambertian = max(dot(N, L), 0.0);\n' +
'  float specular = 0.0;\n' +
'	 v_Colr1  = vec4(0,0,0,0);\n' + 
'  if (on == 1) {\n' +
'  if (lambertian > 0.0) {\n' +
'   vec3 R = reflect(-L, N);\n' +
'   float specAngle = max(dot(R, L), 0.0);\n' +
'   specular = pow(specAngle, shiny) ;\n' +
'   ;}\n' +
'  if (att_mode == 0) {\n' +
'	 v_Colr1 += ((Ks * specular * specColor) +  Kd * lambertian * difColor ) + Ka * ambColor;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 v_Colr1 += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/distance(pos.xyz, cameraPos) * 40.0 + Ka * ambColor;\n' + 
'   ;}\n' +

'  if (att_mode == 2) {\n' +
'	 v_Colr1 += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/(distance(pos.xyz, cameraPos)* distance(pos.xyz, cameraPos)) * 500.0 + Ka * ambColor;\n' + 
'   ;}\n' +
'  };\n' +
'  if (on2 == 1) {\n' +
'  vec3 L2 = normalize(-pos.xyz + cameraPos2);\n' +
'  float lambertian2 = max(dot(N, L2), 0.0);\n' +
'  float specular2 = 0.0;\n' +
'  if (lambertian2 > 0.0) {\n' +
'   vec3 R2 = reflect(-L2, N);\n' +
'   float specAngle2 = max(dot(R2, L2), 0.0);\n' +
'   specular2 = pow(specAngle2, shiny) ;\n' +
'   ;}\n' +
'  if (att_mode == 0) {\n' +
'	 v_Colr1 += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 ) + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 v_Colr1 += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/distance(pos.xyz, cameraPos2) * 40.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 2) {\n' +
'	 v_Colr1 += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/(distance(pos.xyz, cameraPos2)* distance(pos.xyz, cameraPos2)) * 500.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  };\n' +
'  if (v_Colr1  == vec4(0,0,0,0)){\n' + 
'     v_Colr1  = vec4(0,0,0,1);  ' +
'  };\n' +
' }\n';

var groud_phong_frag =   'precision mediump float;\n' +
'varying vec4 v_Colr1;\n' +
'void main() {\n' +
'  gl_FragColor = v_Colr1 ;\n' +  
'}\n';

var groud_bling_phong_vert =   'precision highp float;\n' +				// req'd in OpenGL ES if we use 'float'
//
'uniform mat4 u_ModelMatrix;\n' +
'uniform mat4 u_NormalMatrix;\n' +
'uniform mat4 u_CameraMatrix;\n' +
'uniform vec3 cameraPos;\n' +
'uniform vec4 Ka;\n' +
'uniform vec4 Ks;\n' +
'uniform vec4 Kd;\n' +
'uniform float shiny;\n' +
'uniform vec4 specColor;\n' +
'uniform vec4 difColor;\n' +
'uniform vec4 ambColor;\n' +
'uniform int on;\n' + 
'uniform vec3 cameraPos2;\n' +
'uniform vec4 specColor2;\n' +
'uniform vec4 difColor2;\n' +
'uniform vec4 ambColor2;\n' +
'uniform int on2;\n' + 
'uniform int att_mode;\n' + 
'attribute vec4 a_Pos1;\n' +
'attribute vec4 a_Norm1;\n' +
'attribute vec4 a_Colr1;\n'+
// 'attribute float a_PtSiz1; \n' +
'varying vec4 v_Colr1;\n' +
//
'void main() {\n' +
// '  gl_PointSize = 1s;\n' +
'  gl_Position = (u_CameraMatrix* (u_ModelMatrix))* a_Pos1 + 0.000000001 * a_Colr1;\n' +
'  vec4 pos = u_ModelMatrix * a_Pos1;\n' +
'  vec4 normal = u_NormalMatrix * a_Norm1;\n' +
'  vec3 N = normalize(normal.xyz);\n' +
'  vec3 L = normalize(-pos.xyz + cameraPos);\n' +
'  if (on == 1) {\n' +
'  float lambertian = max(dot(N, L), 0.0);\n' +
'  float specular = 0.0;\n' +
'  if (lambertian > 0.0) {\n' +
'   vec3 H = normalize(L + N);\n' +
'   float specAngle = max(dot(N, H), 0.0);\n' +
'   specular = pow(specAngle, shiny) ;\n' +
'   ;}\n' +
'  if (att_mode == 0) {\n' +
'	 v_Colr1 += ((Ks * specular * specColor) +  Kd * lambertian * difColor ) + Ka * ambColor;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 v_Colr1 += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/distance(pos.xyz, cameraPos) * 40.0 + Ka * ambColor;\n' + 
'   ;}\n' +

'  if (att_mode == 2) {\n' +
'	 v_Colr1 += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/(distance(pos.xyz, cameraPos)* distance(pos.xyz, cameraPos)) * 500.0 + Ka * ambColor;\n' + 
'   ;}\n' +
'  };\n' +
'  if (on2 == 1) {\n' +
'  vec3 L2 = normalize(-pos.xyz + cameraPos2);\n' +
'  float lambertian2 = max(dot(N, L2), 0.0);\n' +
'  float specular2 = 0.0;\n' +
'  if (lambertian2 > 0.0) {\n' +
'   vec3 H2 = normalize(L2 + N);\n' +
'   float specAngle2 = max(dot(N, H2), 0.0);\n' +
'   specular2 = pow(specAngle2, shiny) ;\n' +
'   ;}\n' +
'  if (att_mode == 0) {\n' +
'	 v_Colr1 += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 ) + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 v_Colr1 += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/distance(pos.xyz, cameraPos2) * 40.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 2) {\n' +
'	 v_Colr1 += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/(distance(pos.xyz, cameraPos2)* distance(pos.xyz, cameraPos2)) * 500.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  };\n' +
'  if (v_Colr1  == vec4(0,0,0,0)){\n' + 
'     v_Colr1  = vec4(0,0,0,1);  ' +
'  };\n' +
' }\n';


var phong_phong_vert = 
'precision highp float;\n' +				// req'd in OpenGL ES if we use 'float'
//
'uniform mat4 u_ModelMatrix;\n' +
'uniform mat4 u_NormalMatrix;\n' +
'uniform mat4 u_CameraMatrix;\n' +
'attribute vec4 a_Pos1;\n' +
'attribute vec4 a_Norm1;\n' +
'attribute vec4 a_Colr1;\n'+
'varying vec4 pos;\n'+
'varying vec4 normal;\n'+
//
'void main() {\n' +
'  gl_Position = (u_CameraMatrix* (u_ModelMatrix))* a_Pos1 + 0.000000001 * a_Colr1;\n' +
'  pos = u_ModelMatrix * a_Pos1;\n' +
'  normal = u_NormalMatrix * a_Norm1;\n' +
' }\n';

var phong_phong_frag = 
'precision highp float;\n' +				// req'd in OpenGL ES if we use 'float'
//
'uniform vec3 cameraPos;\n' +
'uniform vec4 Ka;\n' +
'uniform vec4 Ks;\n' +
'uniform vec4 Kd;\n' +
'uniform float shiny;\n' +
'uniform vec4 specColor;\n' +
'uniform vec4 difColor;\n' +
'uniform vec4 ambColor;\n' +
'uniform int on;\n' + 
'uniform int att_mode;\n' + 
'uniform vec3 cameraPos2;\n' +
'uniform vec4 specColor2;\n' +
'uniform vec4 difColor2;\n' +
'uniform vec4 ambColor2;\n' +
'uniform int on2;\n' + 
'varying vec4 pos;\n'+
'varying vec4 normal;\n'+
// 'attribute float a_PtSiz1; \n' +
//
'void main() {\n' +
'  vec3 N = normalize(normal.xyz);\n' +
'  if (on == 1) {\n' +
'  vec3 L = normalize(-pos.xyz + cameraPos);\n' +
'  float lambertian = max(dot(N, L), 0.0);\n' +
'  float specular = 0.0;\n' +
'  if (lambertian > 0.0) {\n' +
'   vec3 R = reflect(-L, N);\n' +
'   float specAngle = max(dot(R, L), 0.0);\n' +
'   specular = pow(specAngle, shiny) ;\n' +
'   ;}\n' +
'  if (att_mode == 0) {\n' +
'	 gl_FragColor += ((Ks * specular * specColor) +  Kd * lambertian * difColor ) + Ka * ambColor;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 gl_FragColor += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/distance(pos.xyz, cameraPos) * 40.0 + Ka * ambColor;\n' + 
'   ;}\n' +

'  if (att_mode == 2) {\n' +
'	 gl_FragColor += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/(distance(pos.xyz, cameraPos)* distance(pos.xyz, cameraPos)) * 500.0 + Ka * ambColor;\n' + 
'   ;}\n' +
'  };\n' +
'  if (on2 == 1) {\n' +
'  vec3 L2 = normalize(-pos.xyz + cameraPos2);\n' +
'  float lambertian2 = max(dot(N, L2), 0.0);\n' +
'  float specular2 = 0.0;\n' +
'  if (lambertian2 > 0.0) {\n' +
'   vec3 R2 = reflect(-L2, N);\n' +
'   float specAngle2 = max(dot(R2, L2), 0.0);\n' +
'   specular2 = pow(specAngle2, shiny) ;\n' +
'   ;}\n' +
'  if (att_mode == 0) {\n' +
'	 gl_FragColor += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 ) + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 gl_FragColor += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/distance(pos.xyz, cameraPos2) * 40.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 2) {\n' +
'	 gl_FragColor += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/(distance(pos.xyz, cameraPos2)* distance(pos.xyz, cameraPos2)) * 500.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  };\n' +
'  if (gl_FragColor == vec4(0,0,0,0)){\n' + 
'     gl_FragColor  = vec4(0,0,0,1);  ' +
'  };\n' +
' }\n';

var phong_blin_phong_frag = 
'precision highp float;\n' +				// req'd in OpenGL ES if we use 'float'
//
'uniform vec3 cameraPos;\n' +
'uniform vec4 Ka;\n' +
'uniform vec4 Ks;\n' +
'uniform vec4 Kd;\n' +
'uniform float shiny;\n' +
'uniform vec4 specColor;\n' +
'uniform vec4 difColor;\n' +
'uniform vec4 ambColor;\n' +
'uniform int on;\n' + 
'uniform int att_mode;\n' + 
'uniform vec3 cameraPos2;\n' +
'uniform vec4 specColor2;\n' +
'uniform vec4 difColor2;\n' +
'uniform vec4 ambColor2;\n' +
'uniform int on2;\n' + 
'varying vec4 pos;\n'+
'varying vec4 normal;\n'+
// 'attribute float a_PtSiz1; \n' +
//
'void main() {\n' +
'  vec3 N = normalize(normal.xyz);\n' +
'  vec3 L = normalize(-pos.xyz + cameraPos);\n' +
'  if (on == 1) {\n' +
'  float lambertian = max(dot(N, L), 0.0);\n' +
'  float specular = 0.0;\n' +
'  if (lambertian > 0.0) {\n' +
'   vec3 H = normalize(L + N);\n' +
'   float specAngle = max(dot(N, H), 0.0);\n' +
'   specular = pow(specAngle, shiny) ;\n' +
'   ;}\n' +
'  if (att_mode == 0) {\n' +
'	 gl_FragColor += ((Ks * specular * specColor) +  Kd * lambertian * difColor ) + Ka * ambColor;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 gl_FragColor += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/distance(pos.xyz, cameraPos) * 40.0 + Ka * ambColor;\n' + 
'   ;}\n' +

'  if (att_mode == 2) {\n' +
'	 gl_FragColor += ((Ks * specular * specColor) +  Kd * lambertian * difColor )/(distance(pos.xyz, cameraPos)* distance(pos.xyz, cameraPos)) * 500.0 + Ka * ambColor;\n' + 
'   ;}\n' +
'  };\n' +

'  if (on2 == 1) {\n' +
'  vec3 L2 = normalize(-pos.xyz + cameraPos2);\n' +
'  float lambertian2 = max(dot(N, L2), 0.0);\n' +
'  float specular2 = 0.0;\n' +
'  if (lambertian2 > 0.0) {\n' +
'   vec3 H2 = normalize(L2 + N);\n' +
'   float specAngle2 = max(dot(N, H2), 0.0);\n' +
'   specular2 = pow(specAngle2, shiny) ;\n' +
'   };\n' +
'  if (att_mode == 0) {\n' +
'	 gl_FragColor += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 ) + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 1) {\n' +
'	 gl_FragColor += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/distance(pos.xyz, cameraPos2) * 40.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  if (att_mode == 2) {\n' +
'	 gl_FragColor += ((Ks * specular2 * specColor2) +  Kd * lambertian2 * difColor2 )/(distance(pos.xyz, cameraPos2)* distance(pos.xyz, cameraPos2)) * 500.0 + Ka * ambColor2;\n' + 
'   ;}\n' +
'  };\n' +
'  if (gl_FragColor == vec4(0,0,0,0)){\n' + 
'     gl_FragColor  = vec4(0,0,0,1);  ' +
'  };\n' +
' }\n';
