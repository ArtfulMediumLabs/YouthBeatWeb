const langElement = document.querySelector("#lang");
var english, french;
if (lang == 'en') {
  english = document.createElement('span');
  english.innerText = "English";

  french = document.createElement('a')
  french.href = "";
  french.innerText = "Français";
  french.onclick = updateLanguage.bind(null, 'fr');
} else {
  english = document.createElement('a');
  english.href = "";
  english.onclick = updateLanguage.bind(null, 'en');
  english.innerText = "English";

  french = document.createElement('span')
  french.innerText = "Français";
}
langElement.append(english)
langElement.append(" : ")
langElement.append(french)

function updateLanguage(code, event) {
  event.preventDefault();
  lang = code;
  var url = new URL(window.location);
  (url.searchParams.has('lang') ? url.searchParams.set('lang', code) : url.searchParams.append('lang', code));
  window.location.assign(url);
}
