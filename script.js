document.addEventListener("DOMContentLoaded", function () {
    // Check if browser supports geolocation
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    // Initialize Map
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];

            const map = L.map("map").setView(userLocation, 15);

            // Load OpenStreetMap tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Add marker for user location
            L.marker(userLocation).addTo(map)
                .bindPopup("You are here")
                .openPopup();
        },
        (error) => {
            console.error("Geolocation error:", error);
            alert("Unable to retrieve your location. Please enable location services.");
        }
    );

    // Emergency Alert Button
    document.getElementById("alert-button").addEventListener("click", function () {
        const alertMessage = document.getElementById("alert-message");
        alertMessage.innerHTML = "🚨 Emergency Alert Sent!";
        alertMessage.style.color = "red";

        setTimeout(() => {
            alertMessage.innerHTML = "";
        }, 5000);
    });
});
