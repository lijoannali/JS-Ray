1. Navigate to this folder: js/input/
2. Create a .txt file called setup.txt (See more below)
3. Run the Javascript program, and see the ray traced image on the canvas 

Setup: 
You must add all the Phong materials you need before you add Spheres which use the materials!
- Each new addition should be separated by a new line,
-Each line should have the name of the type of element you are adding (Phong for a phong material,     Sphere for a sphere, etc.), followed by the parameters shown below:
- Currently, the camera and scene size settings and background colors are not set through the file, so there are recommended ranges for all the locations and sizes which aren't enforced... for now you can adjust the premade example to generate new images where spheres are in frame and drawn at reasonable sizes 


Template: 
Phong ka kd ks kr alpha r g b 
Phong ka kd ks kr alpha r g b 
Phong ka kd ks kr alpha r g b 
Phong ka kd ks kr alpha r g b 
Sphere x y z r materialIndex
Sphere x y z r materialIndex
Sphere x y z r materialIndex
Sphere x y z r materialIndex
PointLight x y z r1 g1 b1 intensity 
PointLight x y z r1 g1 b1 intensity 

Parameters and Recommended Values Explained: 
Phong 
- (0 to 1) ka, kd, ks, and kr are the constants for ambient lighting, diffuse lighting, specular lighting, and reflectivity constants 
- (0 to 255) r g and b set the rgb color for a material 
-alpha controls how spread out a material's specular highlight is 

Sphere
- xyz represents the location of a sphere 
- r is the radius of a Sphere
- materialIndex is the index of the Phong material used by the Sphere, it is based on the list of added Phong materials, so add the materials before adding Spheres 

PointLight 
- xyz = location 
- (0 to 1) r1, b1, and g1 control the color of the light 
- (0 to 1+) intensity controls the intensity of the light, under 0 dims the light, and over 1 makes it excessively bright 
