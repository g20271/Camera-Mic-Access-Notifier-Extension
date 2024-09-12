// Service worker sent us the stream ID, use it to get the stream
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received tab media stream ID", request.streamId);
    // navigator.mediaDevices.getUserMedia({
    //     video: false,
    //     audio: true,
    //     audio: {
    //         mandatory: {
    //             chromeMediaSource: 'tab',
    //             chromeMediaSourceId: request.streamId
    //         }
    //     }
    // })
    // .then((stream) => {
    //     console.log("Successfully accessed audio stream from tab.");
    //     console.log(stream);
    //     // Once we're here, the audio in the tab is muted
    //     // However, recording the audio works!
    //     // const recorder = new MediaRecorder(stream);
    //     // const chunks = [];
    //     // recorder.ondataavailable = (e) => {
    //     //     chunks.push(e.data);
    //     // };
    //     // recorder.onstop = (e) => saveToFile(new Blob(chunks), "test.wav");
    //     // recorder.start();
    //     // setTimeout(() => recorder.stop(), 5000);
    // });
});
