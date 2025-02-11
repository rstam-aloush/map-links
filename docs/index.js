function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    
    let p2 = params.get('p2') || '';
    let tree_group_layers_key = '';
    let tree_group_layers_value = '';

  
    [tree_group_layers_key, tree_group_layers_value] = p2.split('=');
    console.log("2 tree_group_layers_key: " + tree_group_layers_key);
    console.log("2 tree_group_layers_value: " + tree_group_layers_value);
    return {
        lat: params.get('lat'),
        lon: params.get('lon'),
        tree_groups: params.get('p1'),
        tree_group_layers_key: tree_group_layers_key,
        tree_group_layers_value: tree_group_layers_value
    };
}

function updateLinks(lat, lon, tree_groups, tree_group_layers_key, tree_group_layers_value) {
    console.log("tree_groups: " + tree_groups);
    document.getElementById('location-info').innerText = `Latitude: ${lat}, Longitude: ${lon}`;

    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    const appleMapsLink = `https://maps.apple.com/?daddr=${lat},${lon}`;
    const wazeLink = `https://www.waze.com/ul?ll=${lat},${lon}&navigate=yes`;
    const bingMapsLink = `https://www.bing.com/maps?q=${lat},${lon}`;
    const osmLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
    const geoUriLink = `geo:${lat},${lon}`;
    const mapBSLink = `https://map.geo.bs.ch/?lang=de&baselayer_ref=Grundkarte%20grau&tree_groups=${tree_groups}&tree_group_layers_${tree_group_layers_key}=${tree_group_layers_value}&map_x=${lat}&map_y=${lon}&map_zoom=12&map_crosshair=true`;
    if (mapBSLink) {  
        console.log(mapBSLink);
    } else {
        console.log('Fehlende Parameter für den mapBS-Link.');
    }

    document.getElementById('google-maps-link').href = googleMapsLink;
    document.getElementById('apple-maps-link').href = appleMapsLink;
    document.getElementById('waze-link').href = wazeLink;
    document.getElementById('bing-maps-link').href = bingMapsLink;
    document.getElementById('osm-link').href = osmLink;
    document.getElementById('geo-uri-link').href = geoUriLink;
    document.getElementById('mapbs-link').href = mapBSLink; 
}

document.addEventListener('DOMContentLoaded', () => {
    const params = getQueryParams();
    if (params.lat && params.lon) {
        updateLinks(params.lat, params.lon, params.tree_groups, params.tree_group_layers_key, params.tree_group_layers_value);
    } else {
        document.getElementById('location-info').innerText = 'No coordinates provided.';
    }
});
