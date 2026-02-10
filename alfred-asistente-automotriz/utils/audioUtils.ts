export const startRecording = async (): Promise<MediaRecorder> => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  return mediaRecorder;
};

export const stopRecording = (mediaRecorder: MediaRecorder): Promise<Blob> => {
  return new Promise((resolve) => {
    const audioChunks: BlobPart[] = [];
    
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      // Stop all tracks to release microphone
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      resolve(audioBlob);
    });

    mediaRecorder.stop();
  });
};