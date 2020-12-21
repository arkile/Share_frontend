import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

 export class GeoLocationService {

  myLat: number;
  myLong: number;
  permissionGranted: boolean;
  defaultLocation =  [50.3413014, 30.5962901];   /// KMA
  locationDefined = false;



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

  // tslint:disable-next-line:typedef
  findMe() {
    const promise = new Promise((resolve, reject) => {
      navigator.permissions.query(
        {name: 'geolocation'}
      ).then(permissionStatus => {
        if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
          if (navigator.geolocation) {
            this.permissionGranted = true;
            navigator.geolocation.getCurrentPosition((position) => {
              this.myLat = position.coords.latitude;
              this.myLong = position.coords.longitude;
              console.log(this.myLat + ', ' + this.myLong);
              resolve(true);
            });
            this.locationDefined = true;
          } else {
            alert('Geolocation is not supported by this browser.');
            this.locationDefined = true;
            resolve(true);
          }
        } else {
          this.permissionGranted = false;
          this.myLat = this.defaultLocation[0];
          this.myLong = this.defaultLocation[1];
          this.locationDefined = true;
          reject(false);
        }
      });
    });
    return promise;
    // return [this.myLat, this.myLong];
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

