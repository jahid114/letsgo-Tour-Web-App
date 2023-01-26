/* eslint-disable */

export const displayMap = (locations) => {
  const map = new maplibregl.Map({
    container: 'map',
    style:
      'https://api.jawg.io/styles/jawg-light.json?access-token=ScAlWcI65q8shy3WNVjTp2bZHEpAF68TTCdpOWQZWLmyNdI0fHUSht3RA8O02dmK',
    scrollZoom: false,
  });
  maplibregl.setRTLTextPlugin(
    'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js'
  );
  console.log(locations);

  const bounds = new maplibregl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new maplibregl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new maplibregl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
