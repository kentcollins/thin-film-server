// Test Pedrotti, Section 19-2, Reflectance at Normal Incidence
var source = new Source("Sodium", .5893, 0);
var layer1 = new Layer("Air", 1.0, 0);
var layer2 = new Layer("ZrO2", 2.10, .04);
var layer3 = new Layer("Glass", 1.52, 0);
var stack = [];
stack.push(layer1);
stack.push(layer2);
stack.push(layer3);
var sys = new System(source, stack);
console.log(sys);

// Test Pedrotti, Question 19-4a
var source = new Source("Visible 800nm", .800, 0);
var layer1 = new Layer("Air", 1.0, 0);
var layer2 = new Layer("SiO2", 1.46, .137);
var layer3 = new Layer("Glass", 1.52, 0);
stack = [];
stack.push(layer1);
stack.push(layer2);
stack.push(layer3);
var sys = new System(source, stack);
console.log(sys);

// Test Pedrotti, Question 19-4b
var source = new Source("Visible 600nm", .600, 0);
var sys = new System(source, stack);
console.log(sys);

// Test Pedrotti, Question 19-4c
var source = new Source("Visible 400nm", .400, 0);
var sys = new System(source, stack);
console.log(sys);

// Test Pedrotti, Question 19-5
var source = new Source("Visible 560nm", .560, 0);
var layer2 = new Layer("ZnS", 2.35, .0596);
stack = [];
stack.push(layer1);
stack.push(layer2);
stack.push(layer3);
var sys = new System(source, stack);
console.log(sys);

// Test Pedrotti, Section 19-3 Two-Layer Antireflecting Films
var source = new Source("Visible 550nm", .550, 0);
var layer1 = new Layer("Air", 1.0, 0);
var layer2 = new Layer("CeF3", 1.65, getQuarterThickness(.550, 1.65));
var layer3 = new Layer("ZrO2", 2.1, getQuarterThickness(.550, 2.1));
var layer4 = new Layer("Glass", 1.52, 0);
var stack = [];
stack.push(layer1);
stack.push(layer2);
stack.push(layer3);
stack.push(layer4);
var sys = new System(source, stack);
console.log("Testing Pedrotti, Section 19-3");
console.log("Reflectance at 550nm: "+sys.reflectance);
source.wavelength = .500;
var sys = new System(source, stack);
console.log("Reflectance at 500nm: "+sys.reflectance);
source.wavelength = .750;
var sys = new System(source, stack);
console.log("Reflectance at 750nm: "+sys.reflectance);

// Exploring Pedrotti Fig. 19-4
source.wavelength = .550;
layer2.index = 1.38;
layer3.index = 1.6;
layer3.thickness = getHalfThickness(.550, 1.6);
var sys = new System(source, stack);
console.log("Reflectance with Half Thickness ZrO2: "+sys.reflectance);
layer2.index = 1.38;
layer3.index = 1.85;
layer2.thickness = getQuarterThickness(.550, 1.38);
layer3.thickness = getHalfThickness(.550, 1.85);
source.wavelength = .450;
var sys = new System(source, stack);
console.log("Reflectance with Half Thickness ZrO2 at 450nm: "+sys.reflectance);
source.wavelength = .400;
var sys = new System(source, stack);
console.log("Reflectance with Half Thickness ZrO2 at 400nm: "+sys.reflectance);

// Test Pedrotti, Section 19-4, Three Layer Reflecting Films
source.wavelength = .550;
layer2.index = 1.38;
layer2.thickness = getQuarterThickness(.550, 1.38);
layer3.index = 2.2;
layer3.thickness = getHalfThickness(.550, 2.2);
layer4.index = 1.7;
layer4.thickness = getQuarterThickness(.550, 1.7);
var layer5 = new Layer("Substrate", 1.52, 0);
stack.push(layer5);
sys = new System(source, stack);
console.log("Reflectance for Figure 19-7 at 550nm is: "+sys.reflectance);
source.wavelength = .400;
sys = new System(source, stack);
console.log("Reflectance for Figure 19-7 at 400nm is: "+sys.reflectance);

// Test Pedrotti, Section 19-5, High Reflectance Layers
source = new Source("Visible 550nm", .550, 0);
var layer0 = new Layer("Air", 1.0, 0);
layer2 = new Layer("SiO2", 1.46, getQuarterThickness(.550, 1.46));
layer1 = new Layer("ZnS", 2.35, getQuarterThickness(.550, 2.35));
var substrate = new Layer("Glass", 1.48, 0);
stack = [];
stack.push(layer0);
stack.push(layer1);
stack.push(layer2);
stack.push(layer1);
stack.push(layer2);
stack.push(substrate);
sys = new System(source, stack);
console.log("Reflectance for two double layers is: "+sys.reflectance);

stack = [];
stack.push(layer0);
stack.push(layer1);
stack.push(layer2);
stack.push(layer1);
stack.push(layer2);
stack.push(layer1);
stack.push(layer2);
stack.push(layer1);
stack.push(layer2);
stack.push(layer1);
stack.push(layer2);
stack.push(layer1);
stack.push(layer2);
stack.push(substrate);
sys = new System(source, stack);
console.log("Reflectance for six double layers is: "+sys.reflectance);



console.log("TEST BATTERY COMPLETE");
