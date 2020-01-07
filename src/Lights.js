var PointLight = function() {
    this.on = 1;
    this.camera;
    this.specColor = [];
    this.difColor = [];
    this.ambColor = [];
    this.position = [];
}

var LightGPULoc = function() {
    this.light = new PointLight();
    this.specularLoc;
    this.ambientLoc;
    this.diffusiveLoc;
    this.positionLoc;
    this.onLoc;
}
 
var cLight = new PointLight();
cLight.specColor = [1.0,1.0,1.0,1.0];
cLight.difColor = [1.0,1.0,1.0,1.0];
cLight.ambColor = [1.0,1.0,1.0,1.0];
cLight.camera = perspectiveCam;

var customLight = new PointLight();
customLight.position = [0.0, 0.0, 45.0];
customLight.specColor = [1.0,1.0,1.0,1.0];
customLight.difColor = [1.0,1.0,1.0,1.0];
customLight.ambColor = [1.0,1.0,1.0,1.0];

var customLight2 = new PointLight();
customLight.position = [0.0, 0.0, -45.0];
customLight.specColor = [1.0,1.0,1.0,1.0];
customLight.difColor = [1.0,1.0,1.0,1.0];
customLight.ambColor = [1.0,1.0,1.0,1.0];
