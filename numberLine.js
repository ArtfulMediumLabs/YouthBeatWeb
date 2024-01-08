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
  