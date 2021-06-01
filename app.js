const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let cnt = 0;
let flag = 0;

function onResults(results) {
  canvasCtx.save();
  if (flag == 0) {
    flag = 1;
    canvasCtx.beginPath();
    canvasCtx.lineWidth = "4";
    canvasCtx.strokeStyle = "black";
    canvasCtx.rect(18, 12, 150, 700);
    canvasCtx.stroke();
    canvasCtx.fillStyle = "red";  
    canvasCtx.fillRect(18, 12, 150, 700);
  }
  if (cnt == 100) {
    alert('SMASH IT ONCE MORE!!!');
    canvasCtx.clearRect(18, 12, 150, 700);
    canvasCtx.beginPath();
    canvasCtx.lineWidth = "4";
    canvasCtx.strokeStyle = "black";
    canvasCtx.rect(18, 12, 150, 700);
    canvasCtx.stroke();
    canvasCtx.fillStyle = "red";  
    canvasCtx.fillRect(18, 12, 150, 700);
    cnt = 0;
    flag = 0;
  }

  if ((results.poseLandmarks[20]['x'] > 0.8 &&
     results.poseLandmarks[20]['visibility'] > 0.85) || (results.poseLandmarks[19]['x'] > 0.8 &&
     results.poseLandmarks[19]['visibility'] > 0.85) || (results.poseLandmarks[19]['x'] > 0.8 &&
     results.poseLandmarks[19]['visibility'] > 0.85) || (results.poseLandmarks[17]['x'] > 0.8 &&
     results.poseLandmarks[17]['visibility'] > 0.85) || (results.poseLandmarks[18]['x'] > 0.8 &&
     results.poseLandmarks[18]['visibility'] > 0.85)) {
    cnt++;
    if (cnt <= 100) {
      canvasCtx.clearRect(18, 12, 150, 7*cnt);
    }
  }
}

const pose = new Pose({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
}});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
pose.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();
