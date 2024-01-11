export function numberLine(width) {
    let lineGroup = new Konva.Group();

    let strokeWidth = 2.0;
    let strokeColor = 'black';

    var baseLine = new Konva.Line({
        points: [0, 0, width, 0],
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        opacity: 1.0,
        listening: false
      });

    lineGroup.add(baseLine);

    for (let i = 0; i <= 16; i++) {
        strokeColor = 'black';
        let x = i * width/16;
        let height = 10.0;
        if (i % 4 == 0) {
            height *= 4;
            strokeColor = 'green';
        } else if (i % 2 == 0) {
            height *= 2;
        }
        let hatchLine = new Konva.Line({
            points: [x, 0-height/2, x, 0+height/2],
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            opacity: 1.0,
            listening: false
          });
        lineGroup.add(hatchLine);

        let valueMarks = ["0", "1/16", "1/8", "3/16", "1/4"]
        valueMarks[8] = "1/2";
        valueMarks[12] = "3/4";
        valueMarks[16] = "1";

        
        let fontSizes = [16, 12, 14, 12];
        let fontSize = i < 4 ? fontSizes[i] : fontSizes[0];

        let size = 38;
        let y = 0 + height/2 + 8;
        if (i % 4 == 0 || i < 4)  {
            let valueText = new Konva.Text({
                x: x - size/2,
                y: y,
                text: valueMarks[i],
                fontSize: fontSize,
                fill: 'black',
                width: size,
                height: size,
                align: 'center',
                verticalAlign: 'middle'
              });
            lineGroup.add(valueText);
        }
    }

    return lineGroup;
}

export function drawLinePattern(targetGroup, pattern, width, noteColors) {
    targetGroup.destroyChildren()
  
    for (var i = 0; i < pattern.value.length; i++) {
  
      var note = pattern.value[i];
      var amplitude = pattern.amplitude[i] || 0;
      if (note == '-' && i % 2 == 0) {

      } else if (noteColors.hasOwnProperty(note)) {
        var noteColor = noteColors.getColor(note, amplitude);
        if (note.length > 1) {
          var duration = pattern.duration[i] || 1;
          // var noteNode = createHarmonicNote(i, duration, noteColor, note, patternOriginX, patternOriginY, radius)
        } else {
          var noteNode = createNote(i, noteColor, width, amplitude)
        }
        targetGroup.add(noteNode)
      }
    }

}

function createHarmonicNote(step, duration, color, label, originX, originY, radius) {
    var group = new Konva.Group()
  
    var scaleDegree = scale.indexOf(label);
    // var percent = (scaleDegree + 1) / scale.length;
    var innerRadius = radius - samplerWidth/2;
    // var outerRadius = innerRadius + samplerWidth * percent;
    var outerRadius = innerRadius + sizeFor(scaleDegree);
  
    var segmentDegree = 360/32;
    var rotation = -90 + step * segmentDegree;
    var angle = step % 2 == 0 ? 360/16 : 360/32;
    angle *= Math.pow(2, duration-1)
    var note = new Konva.Arc({
      x: originX,
      y: originY,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      angle: angle,
      fill: color,
      stroke: 'rgba(255,255,255,0.5)',
      strokeWidth: 1,
      rotation: rotation,
      listening: false
    });
  
    var segment = Math.PI * 2 / 32 
    var offset = step % 2 == 0 ? segment : segment / 2;
    var dAlpha = - Math.PI / 2 + step * segment + offset;
    var dx = Math.cos(dAlpha) * radius;
    var dy = Math.sin(dAlpha) * radius;
  
    var size = 48;
  
    var noteLabel = new Konva.Text({
      x: patternOriginX + dx,
      y: patternOriginY + dy,
      text: label,
      fontSize: 18,
      fontStyle: 'bold',
      fill: 'white',
      width: size,
      height: size,
      align: "center",
      verticalAlign: "middle",
      offsetX: size / 2,
      offsetY: size / 2,
      shadowColor: 'black',
      shadowBlur: 8,
      shadowOffset: { x: 2, y: 2 },
      shadowOpacity: 0.8,
    });
  
    group.add(note);
    group.add(noteLabel);
  
  
    for (var i = 0; i <= scaleDegree; i++) {
      var innerLineRadius = i == 0 ? innerRadius : innerRadius + sizeFor(i-1);
      var outerLineRadius = innerLineRadius + incrementalSizeFor(i);
      var line = new Konva.Arc({
        x: originX,
        y: originY,
        innerRadius: innerLineRadius,
        outerRadius: outerLineRadius,
        angle: angle,
        stroke: 'rgba(255,255,255,0.5)',
        strokeWidth: 2,
        rotation: rotation,
        listening: false
      });    
      group.add(line)
    }
    
    return group
}

function createNote(step, color, width, amplitude) {
// function createNote(step, color, originX, originY, radius, amplitude) {
    let steptWidth = width/32;
    let x = step * steptWidth;
    let noteWidth = step % 2 == 0 ? width/16 : width/32;
    let noteHeight = 20.0;

    var note = new Konva.Rect({
        x: x,
        y: 0 - noteHeight,
        width: noteWidth,
        height: noteHeight,
        fill: color,
        stroke: 'rgba(255,255,255,0.5)',
        strokeWidth: 1,
        listening: false
    });

    return note
}