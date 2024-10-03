class Renderer {   
    // Colors a pixel at x,y with the specified color 
    colorPixel(x,y, color) {
        ctx.beginPath(); 
        ctx.fillStyle = color; 
        ctx.fillRect(x,y,1,1);
        ctx.closePath(); 
    }
    
    // Returns the background color of a pixel given its y-value
    // Shaded with according to vertical gradient
    getBGColor(y) {
        let bgColor = [0,0,0]; 
        bgColor = Vec3.lerp([BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]], [BG_COLOR2[0], BG_COLOR2[1], BG_COLOR2[2]], y/VIEWPORT_HEIGHT); 
        return bgColor; 
    }

    //Returns shaded color given ray and intersection (Recursive)
    colorAtPoint(point, rayDirection, recDepth) { 
        let shadowed = false; 
        let color; 
        let closestObject = rayCaster.closestObject(point, rayDirection); //closest object intersected by ray cast from point 
        if(closestObject == -1){ 
            //color with BG gradient 
            return this.getBGColor(point[1]);
        } else { 
            let intersection = closestObject.intersectRay(point, rayDirection); 
            if(intersection == -1){ 
                //color with BG gradient 
                return this.getBGColor(point[1]);
            } 
            let intersectionPoint = intersection.point; 
            let material = intersection.material; 
            let normal = Vec3.normalize(intersection.normal); 
            let colorMultiplier = material.ka; //add ambient component
            //Check for shadowed points
            for(let light of lights){ 
                let closestObj = rayCaster.closestObject(Vec3.add(intersectionPoint, SHADOW_EPSILON), light.position); 
                if((closestObj instanceof Sphere)){ //If ray is hit by a sphere before reaching light source, pt is in shadow
                    shadowed = true; 
                }
                //If the intersectionPoint is not in shadow, add contributions of current light
                if(!shadowed){ 
                    colorMultiplier += material.kd * (Vec3.dot(normal, light.position)); //add diffuse component 
                        let R = rayCaster.reflectedRay(light.position, normal); 
                        let RNorm = Vec3.normalize(R); 
                        let VNorm = Vec3.normalize(Vec3.subtract(CAMERA_POS, point)); 
                        let RdotV = Vec3.dot(RNorm, VNorm); 
                        if(RdotV < 0){ 
                            colorMultiplier += material.ks * Math.pow(0, material.alpha);  // If RdoV is negative, set it to zero 
                        } else{ 
                            colorMultiplier += material.ks * Math.pow(RdotV, material.alpha); // add specular component
                        }
                    }
                color = Vec3.scale(light.intensity, Vec3.ptWiseProduct(Vec3.scale(colorMultiplier, material.color), light.color)); 
            }   
            //Compute Final color as product of material color with the sum of lighting component
            if(recDepth <= 0){ 
                return color; //return if recursion depth is reached 
            } else { 
                let recursiveReflectionColor = this.colorAtPoint(intersectionPoint, intersection.reflectedRay, recDepth - 1); //recurse and return color of reflected ray's intersection with next object
                //return Vec3.add(Vec3.scale(material.kr, recursiveReflectionColor), color); 
                return Vec3.lerp(color,recursiveReflectionColor, material.kr); 
            }
            }
        }

    //Color the viewport
    colorViewPort() {
        let scanlineCount = 0
        for(let y = 0; y < VIEWPORT_HEIGHT; y++) { 
            for(let x = 0; x < VIEWPORT_WIDTH; x++) { 
                let currentPt = [x,y,-1* FOCAL_LENGTH]; 
                let rayDirection = rayCaster.rayTo(currentPt); 
                    let recDepth = 8; 
                    let color = this.colorAtPoint(currentPt, rayDirection, recDepth); //Calls recursive color method
                    this.colorPixel(x,y,arrayToRGB(color)); 
                }
                scanlineCount += 1; 
            }
            document.querySelector("#scanlinesLeft").innerHTML = VIEWPORT_HEIGHT - scanlineCount; 
    } 

    //Render the view
    render() { 
    setCanvasSize(); 
    this.colorViewPort(); 
    }
}
