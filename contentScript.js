console.log("Content script injected successfully");

const originalGetUserMedia = navigator.mediaDevices.getUserMedia;

navigator.mediaDevices.getUserMedia = function(constraints) {
  console.log("Intercepted getUserMedia call with constraints:", constraints);

  return originalGetUserMedia.call(this, constraints).then(stream => {
    console.log("Successfully accessed camera/microphone.");
    return stream;
  }).catch(error => {
    console.error("Error accessing camera/microphone:", error);
    throw error;
  });
};
