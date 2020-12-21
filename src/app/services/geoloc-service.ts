import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

 export class GeoLocationService {


     haversineDistance(loc1, loc2): number {
     const R = 6371.0710; // Radius of the Earth in kilometers
     const rlat1 = loc1[0] * (Math.PI / 180); // Convert degrees to radians
     const rlat2 = loc2[0] * (Math.PI / 180); // Convert degrees to radians
     const difflat = rlat2 - rlat1; // Radian difference (latitudes)
     const difflon = (loc2[1] - loc1[1]) * (Math.PI / 180); // Radian difference (longitudes)

     const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2)
       + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
     return d;
   }
 }
/*
   // tslint:disable-next-line:typedef
   getLocation() {
     if(navigator.geolocation){

     }
   }

   showPosition(position): void {
     this.lat = position.coordinates.latitude;
     this.lon = position.coordinates.longitude;
     const location = new google.maps.LatLng(this.lat, this.lon);

     if(!this.)

   }
 }
*/

