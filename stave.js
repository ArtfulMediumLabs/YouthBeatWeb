const { Factory, EasyScore, System } = Vex.Flow;

const elementId = 'output';



export function drawStave(pattern) {
    console.log(pattern);

    var notes = [];
    for (var i = 0; i < pattern.value.length; i++) {
      var note = pattern.value[i];
      if (note == '-' && i % 2 == 0) {
        notes.push('B4/16/r');
      } else if (note != '-')  {
        // let duration = pattern.duration[i] || 1;
        // var noteLength = 16 / Math.pow(2, duration-1);
        // notes.push(note + '/' + noteLength);
        notes.push(note + '/16');
      }
    }
    if (notes.length == 0) {
      notes = ['B4/w/r']
    }
    console.log(notes.join(', '));

    document.getElementById(elementId).innerHTML = '';

    const vf = new Factory({
      renderer: { elementId: elementId, width: 800, height: 200 },
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