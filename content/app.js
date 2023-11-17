// Your Firebase configuration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var playersRef = database.ref('players');

function toggleAvailability(playerIndex) {
    var playerRef = playersRef.child('player' + playerIndex);
    playerRef.once('value', function(snapshot) {
        var currentAvailability = snapshot.val() || 'Not Available';
        var newAvailability = currentAvailability === 'Available' ? 'Not Available' : 'Available';
        playerRef.set(newAvailability);
    });
}

function renderPlayers(data) {
    var appDiv = document.getElementById('app');
    appDiv.innerHTML = '';

    Object.keys(data).forEach(function(playerKey) {
        var playerIndex = playerKey.replace('player', '');
        var availability = data[playerKey];
        var playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.innerHTML = `
            <p>Player ${playerIndex}</p>
            <p>Availability: ${availability}</p>
            <button onclick="toggleAvailability(${playerIndex})">Toggle Availability</button>
        `;
        appDiv.appendChild(playerDiv);
    });
}

playersRef.on('value', function(snapshot) {
    var data = snapshot.val() || {};
    renderPlayers(data);
});
