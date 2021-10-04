import { computed } from 'vue'
import { useStore } from 'vuex'

import WorldWind from '@nasaworldwind/worldwind'
var satellite = require('satellite.js');

import payload_icon from '../assets/icons/satellite.png'
import yellow_dot from '../assets/icons/yellow_dot.png'
//import yellow_dot from '../assets/icons/rocket.png'
import red_dot from '../assets/icons/red_dot.png'


//import TLE_DATA from '../tle_data/basicTLE.json'
//import TLE_DATA from '../tle_data/TLE.json' // Not working
import TLE_DATA from '../tle_data/TLE2.json' // Working fine


export const launchGlobe = async () => { 
  
    const store = useStore()
    const {
      state: { celestial_objects },      
    } = store
    
    const showLeo = computed(() => celestial_objects.showLeo)
    const showMeo = computed(() => celestial_objects.showMeo)
    const showHeo = computed(() => celestial_objects.showHeo)
    const showGeo = computed(() => celestial_objects.showGeo)
    const showUnc = computed(() => celestial_objects.showUnc)
    const showSat = computed(() => celestial_objects.showSat)
    const showDebris = computed(() => celestial_objects.showDebris)
    const showRocket = computed(() => celestial_objects.showRocket)



    // Create a WorldWindow for the canvas.
    var wwd = new WorldWind.WorldWindow("canvasOne");
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());        
    wwd.addLayer(new WorldWind.BMNGLayer());
    
    // Adding star and atmosphere layer:    
    var starFieldLayer = new WorldWind.StarFieldLayer();    
    wwd.addLayer(starFieldLayer);    
    var atmosphereLayer = new WorldWind.AtmosphereLayer();    
    wwd.addLayer(atmosphereLayer);
    var now = new Date();
    starFieldLayer.time = now;
    atmosphereLayer.time = now;
       
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));


    // Adding custom layers
    var orbitsHoverLayer = new WorldWind.RenderableLayer();
    var modelLayer = new WorldWind.RenderableLayer("Model");
    var meshLayer = new WorldWind.RenderableLayer();

    var orbitsLayer = new WorldWind.RenderableLayer("Orbit");
    var leoSatLayer = new WorldWind.RenderableLayer("LEO Payloads");
    var meoSatLayer = new WorldWind.RenderableLayer("MEO Payloads");
    var heoSatLayer = new WorldWind.RenderableLayer("HEO Payloads");
    var geoSatLayer = new WorldWind.RenderableLayer("GEO Payloads");
    var unclassifiedSatLayer = new WorldWind.RenderableLayer("Unclassified Payloads");

    var leoDebrisLayer = new WorldWind.RenderableLayer("LEO Debris");
    var meoDebrisLayer = new WorldWind.RenderableLayer("MEO Debris");
    var heoDebrisLayer = new WorldWind.RenderableLayer("HEO Debris");
    var geoDebrisLayer = new WorldWind.RenderableLayer("GEO Debris");
    var unclassifiedDebrisLayer = new WorldWind.RenderableLayer("UnclassifiedDebris");

    var leoRocketLayer = new WorldWind.RenderableLayer("LEO Rocket Bodies");
    var meoRocketLayer = new WorldWind.RenderableLayer("MEO Rocket Bodies");
    var heoRocketLayer = new WorldWind.RenderableLayer("HEO Rocket Bodies");
    var geoRocketLayer = new WorldWind.RenderableLayer("GEO Rocket Bodies");
    var unclassifiedRocketLayer = new WorldWind.RenderableLayer("Unclassified Rocket Bodies");


    wwd.addLayer(orbitsHoverLayer);
    wwd.addLayer(leoSatLayer);
    wwd.addLayer(meoSatLayer);
    wwd.addLayer(heoSatLayer);
    wwd.addLayer(geoSatLayer);
    wwd.addLayer(unclassifiedSatLayer);
    
    wwd.addLayer(leoDebrisLayer);
    wwd.addLayer(meoDebrisLayer);
    wwd.addLayer(heoDebrisLayer);
    wwd.addLayer(geoDebrisLayer);
    wwd.addLayer(unclassifiedRocketLayer);

    wwd.addLayer(leoRocketLayer);
    wwd.addLayer(meoRocketLayer);
    wwd.addLayer(heoRocketLayer);
    wwd.addLayer(geoRocketLayer);
    wwd.addLayer(unclassifiedRocketLayer);
    
    wwd.addLayer(meshLayer);
    wwd.addLayer(modelLayer);
    wwd.addLayer(orbitsLayer);


    // Get position of every satellite
    function getPosition(satrec, time) {
        var position_and_velocity = satellite.propagate(satrec,
        time.getUTCFullYear(),
        time.getUTCMonth() + 1,
        time.getUTCDate(),
        time.getUTCHours(),
        time.getUTCMinutes(),
        time.getUTCSeconds());
        var position_eci = position_and_velocity["position"];
            
        var gmst = satellite.gstime(time.getUTCFullYear(),
        time.getUTCMonth() + 1,
        time.getUTCDate(),
        time.getUTCHours(),
        time.getUTCMinutes(),
        time.getUTCSeconds());
            
        var position_gd = satellite.eciToGeodetic(position_eci, gmst);
        var latitude = satellite.degreesLat(position_gd["latitude"]);
        var longitude = satellite.degreesLong(position_gd["longitude"]);
        var altitude = position_gd["height"] * 1000;
    
        return new WorldWind.Position(latitude, longitude, altitude);
    }

    function jday(year, mon, day, hr, minute, sec) {
        'use strict';
        return (367.0 * year -
          Math.floor((7 * (year + Math.floor((mon + 9) / 12.0))) * 0.25) +
          Math.floor(275 * mon / 9.0) +
          day + 1721013.5 +
          ((sec / 60.0 + minute) / 60.0 + hr) / 24.0  //  ut in days
          //#  - 0.5*sgn(100.0*year + mon - 190002.5) + 0.5;
        );
    }
    
    var satVelocity = [];
    function getVelocity(satrec, time) {
    
        var j = jday(time.getUTCFullYear(),
        time.getUTCMonth() + 1, // Note, this function requires months in range 1-12.
        time.getUTCDate(),
        time.getUTCHours(),
        time.getUTCMinutes(),
        time.getUTCSeconds());
        j += time.getUTCMilliseconds() * 1.15741e-8;
                
        var m = (j - satrec.jdsatepoch) * 1440.0;
        var pv = satellite.sgp4(satrec, m);
        var vx, vy, vz;
        
        vx = pv.velocity.x;
        vy = pv.velocity.y;
        vz = pv.velocity.z;
        
        var satVelocity = Math.sqrt(
            vx * vx +
            vy * vy +
            vz * vz
        );
        return satVelocity;
    }

    // Purifies non-working satellites
    function sanitizeSatellites(objectArray) {
      var faultySatellites = 0;
      var resultArray = [];
      var maxSats = objectArray.length;
      var updateTime = performance.now();
      console.log(updateTime)
      var now = new Date();
      var time = new Date(now.getTime());
      for (var i = 0; i < maxSats; i += 1) {
          
          try {

              var position = getPosition(satellite.twoline2satrec(objectArray[i].TLE_LINE1, objectArray[i].TLE_LINE2), time);
              var velocity = getVelocity(satellite.twoline2satrec(objectArray[i].TLE_LINE1, objectArray[i].TLE_LINE2), time);                

          } catch (err) {
              // console.log(objectArray[i].OBJECT_NAME +" is a faulty sat it is " + i);
              faultySatellites += 1;                
              continue;
          }        
          
          if(typeof objectArray[i].LAUNCH_DATE === "undefined") continue;            

          resultArray.push(objectArray[i]);
      }
      //console.log('objectArray[i]: ', objectArray[0])                
      console.log('position: ', position)
      /console.log('velocity: ', velocity)
      updateTime = performance.now() - updateTime;
      console.log('faultySatellites: ',faultySatellites);
      console.log(objectArray.length + " from uncleansed");
      console.log(resultArray.length + " from cleansed");        
      return resultArray;
    }

    getSatellites(TLE_DATA)
    
    function getSatellites(satellites) {
        var satPac = sanitizeSatellites(satellites);
        satPac.satDataString = JSON.stringify(satPac);
    

        leoSatLayer.enabled = (showLeo.value && showSat.value);
        meoSatLayer.enabled = (showMeo.value && showSat.value);
        heoSatLayer.enabled = (showHeo.value && showSat.value);
        geoSatLayer.enabled = (showGeo.value && showSat.value);
                           
        leoDebrisLayer.enabled = (showLeo.value && showDebris.value);
        meoDebrisLayer.enabled = (showMeo.value && showDebris.value);
        heoDebrisLayer.enabled = (showHeo.value && showDebris.value);
        geoDebrisLayer.enabled = (showGeo.value && showDebris.value);
        
        leoRocketLayer.enabled = (showLeo.value && showRocket.value);
        meoRocketLayer.enabled = (showMeo.value && showRocket.value);
        heoRocketLayer.enabled = (showHeo.value && showRocket.value);
        geoRocketLayer.enabled = (showGeo.value && showRocket.value);

        unclassifiedSatLayer.enabled = (showUnc.value && showSat.value);
        unclassifiedDebrisLayer.enabled = (showUnc.value && showDebris.value);
        unclassifiedRocketLayer.enabled = (showUnc.value && showRocket.value);
        

        /*
        console.log('showLeo.value from worldwind: ', showLeo.value)
        console.log('showMeo.value from worldwind: ', showMeo.value)
        console.log('showHeo.value from worldwind: ', showHeo.value)
        console.log('showGeo.value from worldwind: ', showGeo.value)
        console.log('showUnc.value from worldwind: ', showUnc.value)
        console.log('showSat.value from worldwind: ', showSat.value)
        console.log('showDebris.value from worldwind: ', showDebris.value)
        console.log('showRocket.value from worldwind: ', showRocket.value)
        */

        var satNum = satPac.length;    

        //Satellite Propagation
        //plots all sats
        renderSats(satPac);


        function renderSats(satData) {
          // trackedPlaceholder.textContent = satData.length;
          console.log('renderSats: ', satNum)
          var satNames = [];
          var satOwner = [];
          var satDate = [];
          var satSite = [];
          var satStatus = [];
          var now = new Date();
          var everyCurrentPosition = [];
                    
          for (var j = 0; j < satNum; j++) {

            var currentPosition = null;
            var time = new Date(now.getTime());
    
            try {
              var velocity = getVelocity(satellite.twoline2satrec(satData[j].TLE_LINE1, satData[j].TLE_LINE2), time);
              var position = getPosition(satellite.twoline2satrec(satData[j].TLE_LINE1, satData[j].TLE_LINE2), time);
            } catch (err) {
              console.log(err + 'Error in renderSats, sat ' + j +  ": " + satPac[j].OBJECT_NAME);
              continue;
            }

            try {                
                satVelocity.push(velocity);
                currentPosition = new WorldWind.Position(position.latitude,
                position.longitude,
                position.altitude);
                everyCurrentPosition.push(currentPosition);
                satSite.push(satData[j].LAUNCH_SITE);
                satNames.push(satData[j].OBJECT_NAME);
                satOwner.push(satData[j].OWNER);
                satStatus.push(satData[j].OPERATIONAL_STATUS);
                satDate[j] = satData[j].LAUNCH_DATE.substring(0, 4);
            } catch (err) {                
                console.log(err + ' in renderSats, sat ' + j);
                console.log(satData[j].OBJECT_NAME);
              continue;
            }


            var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
            var highlightPlacemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightPlacemarkAttributes.imageScale = 0.4;
    
            console.log('Loading assets ...')

            // Add colored image depending on sat type
            switch (satData[j].OBJECT_TYPE) {              
              case "PAYLOAD":
                placemarkAttributes.imageSource = payload_icon;
                placemarkAttributes.imageScale = 0.2;
                break;
              case "ROCKET BODY":
                placemarkAttributes.imageSource = yellow_dot;
                placemarkAttributes.imageScale = 0.2;
                break;
              default:
                placemarkAttributes.imageSource = red_dot;
                placemarkAttributes.imageScale = 0.2;
                highlightPlacemarkAttributes.imageScale = 0.3;
            }
    
            placemarkAttributes.imageOffset = new WorldWind.Offset(
              WorldWind.OFFSET_FRACTION, 0.5,
              WorldWind.OFFSET_FRACTION, 0.5);
            placemarkAttributes.imageColor = WorldWind.Color.WHITE;
            placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
              WorldWind.OFFSET_FRACTION, 0.5,
              WorldWind.OFFSET_FRACTION, 1.0);
            placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;
    
    
            var placemark = new WorldWind.Placemark(everyCurrentPosition[j]);
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
            placemark.attributes = placemarkAttributes;
            placemark.highlightAttributes = highlightPlacemarkAttributes;
    
            //Defines orbit ranges
            if (satData[j].OBJECT_TYPE === "PAYLOAD") {
              if (satData[j].ORBIT_TYPE === "Low Earth Orbit") {
                leoSatLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Middle Earth Orbit") {
                meoSatLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Geosynchronous") {
                geoSatLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Highly Elliptical Orbit") {
                heoSatLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Unclassified") {
                unclassifiedSatLayer.addRenderable(placemark);
              } else {
                console.log(satData[j].ORBIT_TYPE);
              }
            } else if (satData[j].OBJECT_TYPE === "ROCKET BODY") {
              if (satData[j].ORBIT_TYPE === "Low Earth Orbit") {
                leoRocketLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Middle Earth Orbit") {
                meoRocketLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Geosynchronous") {
                geoRocketLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Highly Elliptical Orbit") {
                heoRocketLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Unclassified") {
                unclassifiedRocketLayer.addRenderable(placemark);
              } else {
                console.log(satData[j].ORBIT_TYPE);
              }
            } else if (satData[j].OBJECT_TYPE === "DEBRIS") {
              if (satData[j].ORBIT_TYPE === "Low Earth Orbit") {
                leoDebrisLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Middle Earth Orbit") {
                meoDebrisLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Geosynchronous") {
                geoDebrisLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Highly Elliptical Orbit") {
                heoDebrisLayer.addRenderable(placemark);
              } else if (satData[j].ORBIT_TYPE === "Unclassified") {
                unclassifiedDebrisLayer.addRenderable(placemark);
              } else {
                console.log(satData[j].ORBIT_TYPE);
              }
            }            
          } //End of for   
          

          // /*
          // Interval to Update all Satellite Positions
          var updateTime = 2000
          var updatePermission = true
          //updatePositions()

          console.log('updatePositions: ', updatePositions)
          
          var updatePositions = setInterval(function () {
          
            if (!updatePermission)
              return;

            for (var indx = 0; indx < satNum; indx += 1) {
              var timeSlide = 500 //$('#timeEvent').jqxSlider('value');
              var now = new Date();
              var time = new Date(now.getTime() + timeSlide * 60000);              
              try {
                var position = getPosition(satellite.twoline2satrec(satData[indx].TLE_LINE1, satData[indx].TLE_LINE2), time);
                satVelocity[indx] = getVelocity(satellite.twoline2satrec(satData[indx].TLE_LINE1, satData[indx].TLE_LINE2), time);

              } catch (err) {
                console.log(err + ' in updatePositions interval, sat ' + indx + satPac[indx].OBJECT_NAME);
                continue;
              }
              try {
                everyCurrentPosition[indx].latitude = position.latitude;
                everyCurrentPosition[indx].longitude = position.longitude;
                everyCurrentPosition[indx].altitude = position.altitude;
              } catch (err) {
                //TODO: Handle deorbited sats
              }
            }
            wwd.redraw();
          }, updateTime * 1.5);
          // */

    
          wwd.redraw();
        }
    }
    
    
  
    
    wwd.redraw();

}