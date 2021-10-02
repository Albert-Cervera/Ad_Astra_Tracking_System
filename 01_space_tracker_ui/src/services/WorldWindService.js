import WorldWind from '@nasaworldwind/worldwind'

export const launchGlobe = async () => {
    //console.log('launchGlobe')    

    // Create a WorldWindow for the canvas.
    var wwd = new WorldWind.WorldWindow("canvasOne");

    wwd.addLayer(new WorldWind.BMNGOneImageLayer());        
    wwd.addLayer(new WorldWind.BMNGLayer());
    
    // Adding star layer:
    //var starFieldLayer = new WorldWind.StarFieldLayer('https://raw.githubusercontent.com/NASAWorldWind/WebWorldWind/develop/images/stars.json');
    var starFieldLayer = new WorldWind.StarFieldLayer();    
    wwd.addLayer(starFieldLayer);
    

    var atmosphereLayer = new WorldWind.AtmosphereLayer();    
    wwd.addLayer(atmosphereLayer);

    var now = new Date();
    starFieldLayer.time = now;
    atmosphereLayer.time = now;
    //console.log(starFieldLayer)
    //console.log(atmosphereLayer)
    
    //wwd.redraw();

    var compassLayer = new WorldWind.CompassLayer();
    wwd.addLayer(compassLayer);
    
    //var viewControlsLayer = new WorldWind.ViewControlsLayer(wwd);
    //wwd.addLayer(viewControlsLayer);
    
    

    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    

    //console.log(viewControlsLayer)

    

}