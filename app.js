const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  canvasCtx.save();
  const c = canvasElement.getContext('2d');
  c.fillStyle = "red";
  c.fillRect(10, 10, 125, 700);
  if (results.multiHandLandmarks[0][0].x < 0.13) {
    console.log("Completed");
    const c = canvasElement.getContext('2d');
    c.fillStyle = "blue";
    c.fillRect(10, 10, 125, 700);
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();