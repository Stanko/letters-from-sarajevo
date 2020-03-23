// Math

function getVectorFromTwoPoints(point1, point2) {
  return {
    x: point2.x - point1.x,
    y: point2.y - point1.y,
  };
}

function getDistanceBetweenPoints(point1, point2) {
  const x = point1.x - point2.x;
  const y = point1.y - point2.y;

  return Math.sqrt(x * x + y * y);
}

export default function eraseCanvas(canvasElement) {
  // define the path to plot
  const points = [];

  const w = 500;
  const h = 500;
  const steps = 5;

  const xStep = w / steps;
  const yStep = h / steps;
  const max = w > h ? w : h;
  const offset = max / steps;
  const brushWidth = offset * 0.7;

  for (let i = 0; i < steps; i++) {
    points.push({
      x: i * xStep + offset,
      y: -offset,
    });
    points.push({
      x: -offset,
      y: i * yStep + offset,
    });
  }

  for (let i = 0; i <= steps; i++) {
    points.push({
      x: w + offset,
      y: i * yStep - offset,
    });
    points.push({
      x: i * xStep - offset,
      y: h + offset,
    });
  }

  const ctx = canvasElement.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);

  ctx.lineCap = 'round';
  ctx.lineWidth = brushWidth;
  ctx.globalCompositeOperation = 'destination-out';


  // Animation constants

  const FRAME_DURATION = 1000 / 60; // 60fps frame duration ~16.66ms

  const getTime = typeof performance === 'function' ? performance.now : Date.now;


  // Animation state

  const drawingSpeed = 70; // pixels per one frame tick

  let currentIndex;
  let currentPoint;
  let line;

  let distance;

  let lineStep;
  let vectorStep;

  let isFinished = false;

  function setAnimationData(index) {
    currentIndex = index;
    line = {
      start: points[currentIndex],
      end: points[currentIndex + 1],
    };

    currentPoint = line.start;

    if (!line.end) {
      isFinished = true;
      return;
    }

    const vector = getVectorFromTwoPoints(line.start, line.end);
    distance = getDistanceBetweenPoints(line.start, line.end);

    lineStep = drawingSpeed / distance;
    vectorStep = {
      x: vector.x * lineStep,
      y: vector.y * lineStep,
    };
  }

  setAnimationData(0);

  // Animation loop

  // Time
  let lastUpdate = getTime();

  function animate() {
    if (isFinished) {
      return;
    }

    const now = getTime();
    const delta = (now - lastUpdate) / FRAME_DURATION;

    const deltaVector = {
      x: vectorStep.x * delta,
      y: vectorStep.y * delta,
    };

    let nextPoint = {
      x: currentPoint.x + deltaVector.x,
      y: currentPoint.y + deltaVector.y
    };

    let goNext = false;

    if (getDistanceBetweenPoints(line.start, nextPoint) > distance) {
      nextPoint = line.end;
      goNext = true;
    }

    // Render updated scene
    ctx.beginPath();
    ctx.moveTo(currentPoint.x, currentPoint.y);
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();

    // Updating scene logic
    currentPoint = nextPoint;

    if (goNext) {
      setAnimationData(++currentIndex);
    }

    // Update last updated time
    lastUpdate = now;

    requestAnimationFrame(animate);
  }

  animate();
}
