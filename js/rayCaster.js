class RayCaster{
    //Calculates ray from camera to pixel center at x, y
    rayTo(point){ 
        return Vec3.subtract(point, CAMERA_POS); 
    }
    
    //Returns the closest object, or the one first intersected by the ray
    closestObject(sourcePos, rayDirection){ 
        let closestObject = -1; 
        let minIntersectDist = Infinity; 
        for(let i = 0; i < objects.length; i++) { 
            let currentIntersection = objects[i].intersectRay(sourcePos, rayDirection); 
            if(currentIntersection != -1 ) {
                if(currentIntersection.dist < minIntersectDist){
                    closestObject = objects[i]; 
                }
                minIntersectDist = currentIntersection.dist;
            } 
        }
        return closestObject; 
    }

    //Returns reflected ray off a surface, given the incident ray and the normal 
    reflectedRay(incidentRay, normal) { 
        return Vec3.subtract(Vec3.scale(2 * Vec3.dot(normal, incidentRay), normal), incidentRay); 
    }
}