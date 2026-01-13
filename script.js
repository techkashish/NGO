// --- 1. NAVIGATION & ROLE LOGIC ---
function handleLogin() {
    const emailInput = document.getElementById('userEmail');
    
    if (!emailInput || emailInput.value === "") {
        alert("Please enter an email address.");
        return;
    }

    const email = emailInput.value.toLowerCase();

    // Redirect logic: 'ngo' in email goes to NGO Dashboard, else Donor Dashboard
    if (email.includes("ngo")) {
        window.location.href = "ngo-dashboard.html";
    } else {
        window.location.href = "donor-dashboard.html";
    }
}

function navigateTo(page) {
    window.location.href = page;
}

// --- 2. GOOGLE MAPS API INTEGRATION ---
let map;
let service;
let infowindow;

function initMap() {
    console.log("Initializing Google Maps...");
    const mapElement = document.getElementById("map");
    
    if (!mapElement) return;

    // Default Location: Delhi
    const defaultLocation = { lat: 28.6139, lng: 77.2090 };

    map = new google.maps.Map(mapElement, {
        zoom: 13,
        center: defaultLocation,
        styles: [
            { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
            { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }
        ]
    });

    // AUTO-DETECT LOCATION (Per Instruction)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);
                new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    title: "Your Location"
                });
            },
            () => {
                console.log("Error: The Geolocation service failed.");
            }
        );
    }
}

// --- 3. SMART MATCHING & FIREBASE (Placeholder) ---
// This section handles the redistribution logic mentioned in your project statement
const mockDonations = [
    { name: "Cooked Rice", lat: 28.6200, lng: 77.2100, type: "Food" },
    { name: "Winter Clothes", lat: 28.6100, lng: 77.2000, type: "Essentials" }
];

function loadSmartMatches() {
    mockDonations.forEach(donation => {
        new google.maps.Marker({
            position: { lat: donation.lat, lng: donation.lng },
            map: map,
            title: donation.name
        });
    });
}

// --- 4. STATUS UPDATES (For Pickup Coordination) ---
function updatePickupStatus(status) {
    console.log("Pickup Status Updated to: " + status);
    // In a real app, this updates Firebase Firestore
    alert("Status Updated: " + status);
}