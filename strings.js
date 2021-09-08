const strings = {
    "Loading": "Téléchargement",
    "Bass Drum": "Grosse caisse", 
    "Snare Drum": "Caisse claire",
    "Rim Shot": "Rim shot",
    "Hi-hat": "Hi-hat",
    "Open Hi-hat": "Hi-hat ouvert",
    "Ride Cymbal": "Cymbale ride",
    "Chords": "Accord",
    "Asus": "La sus", 
    "Bm": "Si mineur",
    "D": "Ré",
    "Em": "Mi mineur",
    "G": "Sol",
    "Save Pattern": "Sauvegarder le motif / Enregistrer le motif",
    "Note Entry": "Entrée de note",
    "Tempo": "tempo / rythme",
    "Volume": "Volume",
    "Reset": "Réinitialiser",
    "Bass / Snare": "Grosse caisse / Caisse claire",
    "Melody": "Mélodie",
    "Bass / Snare +90": "Grosse caisse / Caisse claire +90",
    "Hi-hat +90": "Hi-hat +90",
    "Melody +90": "Mélodie +90",
    "Playlist": "Liste de lecture",
    "Save Set": "Enregistrer / Sauvegarder l’Ensemble",
    "Load Set": "Charger l’Ensemble",
    "Start": "Commencer / Jouer",
    "Clear": "Effacer",
    "Sequencing": "Séquence / Créer une séquence / Mettre en Séquence",
    "Rhythm Polygon": "Polygone rythmique",
    "Mirror Vertical": "Miroir vertical",
    "Mirror Horizontal": "Miroir horizontal",
    "Modifying Patterns": "Modifier les motifs / modification de motifs"
}

var urlParams = new URLSearchParams(window.location.search);
var lang = urlParams.get("lang") ?? 'en'; // 'fr'

function localizedString(key) {
  key = key.trim();
  if (lang == 'en') {
    return key;
  }

  const string = strings[key] ?? '';
  if (string.length == 0) {
    console.log("missing:" + key);
    return (key + '*');
  }
  return string
}

const elements = document.querySelectorAll("[lang]:not(html)")
for (var i = 0, element; element = elements[i]; i++) {
    element.innerHTML = localizedString(element.innerHTML);
}
