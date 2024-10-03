class Sphere { 
    center; 
    radius; 
    material; 
    constructor(center, radius, material) { 
        this.center = center; 
        this.radius = radius; 
        this.material = material; 
    }
    
    //Returns the point of intersection if a sphere intersects with the given ray 
    //and -1 if there is no intersection
    intersectRay(sourcePos = CAMERA_POS, rayDirection) { 
        let vec0 = Vec3.subtract(sourcePos, this.center); 

        let a = Vec3.dot(rayDirection, rayDirection); 
        let b = Vec3.dot(Vec3.scale(2, vec0), rayDirection); 
        let c = Vec3.dot(vec0, vec0) - (this.radius*this.radius);

        let discriminant = b*b - 4*a*c; 

        if(discriminant > 0){ //return -1 if the ray does not intersect sphere in front of viewplane
            let t1 = (-1*b + Math.sqrt(b*b - 4*a*c))/(2*a); 
            let t2 = (-1*b - Math.sqrt(b*b - 4*a*c))/(2*a); 
            
            let t = t1 < t2 ? t1 : t2; //select smaller positive t-values
            if(t < t_MIN || t > t_MAX){ 
                return -1; //Return if t value is negative 
            } 
            //Calculate values to return wrapped in an object:  
            // pt of intersection, normal at pt, material of object, reflected rays
            let point = Vec3.add(sourcePos, Vec3.scale(t, rayDirection)); 
            let normal = Vec3.scale(1/this.radius, Vec3.subtract(point, this.center)); 
            return { dist: t, 
                     point: point,
                     normal: Vec3.scale(1/this.radius, Vec3.subtract(point, this.center)), 
                     material: this.material,
                     reflectedRay: rayCaster.reflectedRay(rayDirection, normal)
                   }; 
        } else { 
          return -1; 
        }
    }
}