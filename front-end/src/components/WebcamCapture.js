import React, { useState, useRef, useEffect } from 'react';

const WebcamCapture = ({ onCapture }) => {
  const [isWebcamActive, setIsWebcamActive] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);  // To capture image on canvas
  const streamRef = useRef(null);  // Create a ref for the webcam stream

  // Start webcam stream
  const startWebcam = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          webcamRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    }
  };

  // Capture image
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = webcamRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the captured image as a base64 string
    const imageSrc = canvas.toDataURL('image/png');
    setCapturedImage(imageSrc);
    setIsWebcamActive(false); // Stop webcam after capturing
    onCapture(imageSrc); // Send captured image back to parent component
  };

  // Retake image (reset the webcam state)
  const retakeImage = () => {
    setCapturedImage(null);
    setIsWebcamActive(true); // Reactivate webcam
    startWebcam();
  };

  // Initialize webcam when component mounts
  useEffect(() => {
    startWebcam();

    // Cleanup function to stop webcam stream when component unmounts
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop()); // Stop the webcam stream
      }
    };
  }, []);

  return (
    <div className="webcam-container">
      {isWebcamActive ? (
        <div>
          <video
            ref={webcamRef}
            autoPlay
            width="100%"
            height="auto"
            style={{ borderRadius: '10px' }}
          ></video>
            <button type="button" onClick={captureImage} className="capture-btn">
              Capture
            </button>
        </div>
      ) : (
        <div>
          <img src={capturedImage} alt="Captured" style={{ width: '100%', borderRadius: '10px' }} />
          <button type="button" onClick={retakeImage} className="retake-btn">
            Retake
          </button>
        </div>
      )}

      {/* Hidden canvas to draw the captured image */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default WebcamCapture;
