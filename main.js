console.log("Content main.js injected successfully");

const originalGetUserMedia = MediaDevices.prototype.getUserMedia;

MediaDevices.prototype.getUserMedia = function (constraints) {
  console.log("Intercepted getUserMedia call with constraints:", constraints);

  return originalGetUserMedia
    .call(this, constraints)
    .then((stream) => {
      console.log("Successfully accessed camera/microphone.");
      notifyExtension();
      return stream;
    })
    .catch((error) => {
      console.error("Error accessing camera/microphone:", error);
      throw error;
    });
};

const originalGetUserMedia2 = navigator.mediaDevices.getUserMedia;

navigator.mediaDevices.getUserMedia = function (constraints) {
  console.log("Camera or microphone access detected!");

  return originalGetUserMedia2
    .call(this, constraints)
    .then((stream) => {
      console.log("Successfully accessed camera/microphone.");
      notifyExtension();
      return stream;
    })
    .catch((error) => {
      console.error("Error accessing camera/microphone: ", error);
      throw error;
    });
};


function notifyExtension() {
    // background.js にメッセージを送信
    window.postMessage({ type: 'cameraAccessFromMain', message: { type: 'cameraAccessDetected' } }, '*');
  }