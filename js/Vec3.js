//Represents operations on 3D vectors represented as arrays with length 3
class Vec3 { 
    //Returns difference of two vectors, a-b; If b is a scalar, it will return the difference as a vector, 
    //calculated elementwise 
    static subtract(a, b){ 
        if(Number.isInteger(b)) { 
            return [a[0]-b, a[1]-b, a[2]-b]; 
        } else { 
            return[a[0] - b[0], a[1] - b[1], a[2] - b[2]]; 
        }
    }
    //Returns sum of two vectors a + b
    static add(a,b){ 
        return([a[0] + b[0], a[1] + b[1],a[2] + b[2]])
    }

    //Returns linear interpolation of two vectors, a + t*b
    static lerp(a, b, t){ 
        let x = a[0] + t * (b[0] - a[0]);  
        let y = a[1] + t * (b[1] - a[1]);  
        let z = a[2] + t * (b[2] - a[2]);  
        return[x, y, z]; 
    }
    
    //Returns the dot product of 2 3D vectors 
    static dot(a,b) { 
        let x = a[0] * b[0]; 
        let y = a[1] * b[1]; 
        let z = a[2] * b[2]; 
        return x + y + z; 
    }
    
    //Returns vector a times scalar c 
    static scale(c, a) { 
        return [c* a[0], c * a[1], c * a[2]]; 
    }

    //Returns the pointwise product of 2 vectors 
    // Given [a,b,c] and [x,y,z], returns [ax, by, cz]
    static ptWiseProduct(a, b){ 
        return [a[0]*b[0], a[1]*b[1], a[2]*b[2]]; 
    }

    //Returns the length of a vector 
    static length(a){ 
        return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]); 
    }

    //Returns the normalized unit vector of a given vector
    static normalize(a){ 
        return this.scale(1/this.length(a), a); 
    }
}