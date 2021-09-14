const strings = {
    "Loading": "Téléchargement",
    "Bass Drum": "Grosse C.", 
    "Snare Drum": "C. Claire",
    "Rim Shot": "Rim shot",
    "Hi-hat": "Hi-hat",
    "Open Hi-hat": "Hi-hat ouvert",
    "Ride Cymbal": "Cymbale ride",
    "Chords": "Accord",
    "None": "Aucun",
    "Asus": "La sus", 
    "Bm": "Si mineur",
    "D": "Ré",
    "Em": "Mi mineur",
    "G": "Sol",
    "Save Pattern": "Sauvegarder le motif",
    "Pattern": "Motif",
    "Tempo": "Tempo",
    "Volume": "Volume",
    "Reset": "Réinitialiser",
    "Bass / Snare": "Grosse C. / C. Claire",
    "Melody": "Mélodie",
    "Bass / Snare +90": "Grosse C. / C. Claire +90",
    "Hi-hat +90": "Hi-hat +90",
    "Melody +90": "Mélodie +90",
    "Synth" : "Synthé",
    "Rock" : "Rock",
    "RnB" : "RnB",
    "Playlist": "Liste de lecture",
    "Save Set": "Sauvegarder l’Ensemble",
    "Load Set": "Charger l’Ensemble",
    "Set 1": "Ensemble 1",
    "Set 2": "Ensemble 2",
    "Set 3": "Ensemble 3",
    "Set 4": "Ensemble 4",
    "Set 5": "Ensemble 5",
    "Set 6": "Ensemble 6",
    "Set 7": "Ensemble 7",
    "Set 8": "Ensemble 8",
    "Start": "Commencer",
    "Stop": "Commencer",
    "Clear": "Effacer",
    "Note Entry": "Entrée de note",
    "Sequencing": "Séquence",
    "Special Tools": "Outils",
    "Rhythm Polygon": "Polygone rythmique",
    "Mirror Vertical": "Miroir vertical",
    "Mirror Horizontal": "Miroir horizontal",
    "Warning: All sets are full. Save will overwrite sets." : "Attention; mémoire pleine"
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
