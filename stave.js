const { Factory, EasyScore, System } = Vex.Flow;

const elementId = 'output';



export function drawStave(pattern) {
    // var notes = directReplacement(pattern);
    var notes = processNotes(pattern);

    document.getElementById(elementId).innerHTML = '';

    const vf = new Factory({
      renderer: { elementId: elementId, width: 750, height: 150 },
    });

    const score = vf.EasyScore();
    const system = vf.System();

    system.addStave({
      voices: [
        score.voice(score.notes(notes.join(', ')))
      ],
    })
    .addClef('treble')
    .addTimeSignature('4/4');

    vf.draw();
}

function directReplacement(pattern) {
  var notes = [];
  for (var i = 0; i < pattern.value.length; i++) {
    var note = pattern.value[i];
    if (note == '-' && i % 2 == 0) {
      notes.push('B4/16/r');
    } else if (note != '-')  {
      notes.push(note + '/16');
    }
  }
  if (notes.length == 0) {
    notes = ['B4/w/r']
  }
  return notes;
}

function processNotes(pattern) {
  let notes = mapPattern(pattern)
  notes = notes.filter(isNote);
  // let notes = pattern.filter(isSixteenth).map(addPositionAndDuration).filter(isNote);
  
  let dummyNote = {position: 16}
  notes.push(dummyNote);

  monophonicTruncate(notes);
  insertRests(notes);

  notes.pop();

  let noteString = [];
  notes.forEach( (el, i) => {
    let newNotes;
    if (isNote(el)) {
      let durations = noteDuration(el);
      newNotes = durations.map(d => el.value + "/" + d);
    } else {
      let durations = restDuration(el);
      newNotes = durations.map(d => 'B4' + "/" + d + '/r');
    }
    noteString.push.apply(noteString, newNotes);
  })

  return noteString;
}

function mapPattern(pattern) {
  let notes = [];
  for (let i=0; i < pattern.value.length; i = i + 2) {
    let duration = pattern.duration[i] == 0 ? 0 : Math.pow(2, pattern.duration[i] - 1);
    notes.push({
      position: i / 2,
      value: pattern.value[i],
      duration: duration 
    });
  }
  return notes;
}

function isSixteenth(el, i) {
  return i % 2 == 0;
}

function addPositionAndDuration(el, i) {
  return {
    position: i,
    value: pattern[i].value,
    duration: 16 / Math.pow(2, pattern[i].duration-1)
  }
}

function isNote(el) {
  return el.value != '-';
}

function monophonicTruncate(notes) {
  for (let i = 1; i < notes.length; i++) {
    let noteDuration = notes[i-1].duration;
    // let sequenceDuration = notes.length - notes[i-1].position;
    let nextNotePosition = notes[i].position - notes[i-1].position;
    notes[i-1].duration = Math.min( noteDuration, nextNotePosition);
  }
}

function insertRests(notes) {
  if (notes.length == 1) {
    notes.unshift({
      position: 0,
      value: '-',
      duration: 16
    });
    return
  }
  if (notes[0].position > 0) {
    let initialDuration = notes[0].position;
    let rest = {
      position: 0,
      value: '-',
      duration: initialDuration
    };
    notes.unshift(rest);
  }
  for (let i = 1; i < notes.length; i++) {
    if (!isNote(notes[i])) {
      continue;
    }
    let nextNote = notes[i].position - notes[i-1].position;
    let duration = notes[i-1].duration;
    if (nextNote > duration) {
      let newPosition = notes[i-1].position + duration;
      let newDuration = nextNote - duration;
      let rest = {
        position: newPosition,
        value: '-',
        duration: newDuration
      };
      notes.splice(i, 0, rest);
    }
  }
}

function noteDuration(el) {
  let durations = [
    '',
    '16',
    '8',
    '8.',
    '4',
    ['4', '16'],
    '4.',
    ['4.', '16'],
    '2',
    ['2', '16'],
    ['2', '8'],
    ['2', '8.'],
    '2.',
    ['2.', '16'],
    ['2.', '8'],
    ['2.', '8.'],
    '1'
  ].map( el =>  Array.isArray(el) ? el : [el] );
  return durations[el.duration];
}

function restDuration(el) {
  let durations = [
    '',
    '16',
    '8',
    ['8', '16'],
    '4',
    ['4', '16'],
    ['4', '8'],
    ['4', '8', '16'],
    '2',
    ['2', '16'],
    ['2', '8'],
    ['2', '8', '16'],
    ['2', '4'],
    ['2', '4', '16'],
    ['2', '4', '8'],
    ['2', '4', '8', '16'],
    '1'
  ].map( el =>  Array.isArray(el) ? el : [el] );
  return durations[el.duration];
}