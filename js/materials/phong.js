class phongMaterial { 
    ka; //ambient intensity 
    kd; //diffuse intensity
    ks; //specular light intensity
    kr; // controls reflectivity 
    alpha; //controls "spread" of specular highlight
    color; //color of material
    constructor(intensities, color, alpha) { 
        this.ka = intensities[0]; 
        this.kd = intensities[1]; 
        this.ks = intensities[2]; 
        this.kr = intensities[3]; 
        this.color = color; 
        this.alpha = alpha; 
    }
}