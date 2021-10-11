const src = "Sounds/FieldRecordings/";
const fieldRecordings = {
    "Footsteps" : src + "347850__inspectorj__footsteps-dry-leaves-g.mp3",
    "Wind": src + "457318__stek59__autumn-wind-and-dry-leaves.mp3",
    "Rain": src + "531947__straget__the-rain-falls-against-the-parasol.mp3",
    "River": src + "584595__tosha73__mountain-river.mp3",
    "Waves": src + "437204__straget__waves-at-shetland-islands-2.mp3"
}
const fieldLevels = [6,6,9,0,0];
const fieldKeys = Object.keys(fieldRecordings);

const fieldPlayers = new Tone.Players(fieldRecordings).toDestination();
for (var i = 0, key; key = fieldKeys[i]; i++) {
    fieldPlayers.player(key).volume.value = fieldLevels[i];
}

const playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';
const stopSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16"><path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/></svg>';

const fieldPlayerElements = [];

document.addEventListener("DOMContentLoaded", function() {
    var fieldElement = document.getElementById("fieldRecordings");

    for (var i = 0, key; key = fieldKeys[i]; i++) {
        const element = document.createElement("DIV");
        const button = document.createElement("BUTTON");
        button.className = 'play';
        button.addEventListener('click', 
            (function(key, button) {
                return function() {
                    if (!buffersLoaded) {
                        return false;
                    }
                    const player = fieldPlayers.player(key);
                    if (player.state == "started") {
                        player.stop();
                        button.className = 'play';
                    } else {
                        player.start();
                        player.startTime = Tone.Time().toSeconds();
                        button.className = 'stop';
                    };
                }
            })(key, button),
            false);
        element.appendChild(button);

        const label = document.createElement("DIV");
        label.innerHTML = key;
        element.appendChild(label);

        fieldElement.appendChild(element);
        fieldPlayerElements.push(element);
    }
});

const lastProgress = Array(fieldKeys.length).fill(0);

setInterval(() => {
    for (var i = 0, key; key = fieldKeys[i]; i++) {
        const player = fieldPlayers.player(key);
        var progress = 0;
        if (player.state == "started") {
            progress = (Tone.Time().toSeconds() - player.startTime) / player.buffer.duration;
        }
        if (progress != lastProgress[i]) {
            fieldPlayerElements[i].childNodes[0].className = progress > 0 ? 'stop' : 'play';
            const percent = (progress*100).toFixed(2) + '%';
            const fill =  'linear-gradient(to right, #eeb8bd 0%, #eeb8bd ' + percent + ', rgba(255,0,0,0) ' + percent + ')';
            fieldPlayerElements[i].childNodes[1].style.background = fill;
            lastProgress[i] = progress;
        }
    }
}, 16);

