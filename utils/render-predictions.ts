import { throttle } from "lodash";

const playPersonDetected = throttle(() => {
  try {
    const audio = new Audio("/pols-aagyi-pols.mp3");
    audio.volume = 0.8;
    audio.play().catch(() => {
      // Ignore browser autoplay policy errors
    });
  } catch (error) {
    console.error("Audio playback error:", error);
  }
}, 2500, { leading: true, trailing: false });

export const renderPredictions = (predictions: any[], ctx: CanvasRenderingContext2D) => {
  // Clear previous drawings
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = "bold 17px Arial";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    const isPerson = prediction.class === "person";
    const confidence = (prediction.score * 100).toFixed(0);
    const label = `${prediction.class} ${confidence}%`;

    // Bounding Box
    ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // Semi-transparent red fill for person only
    if (isPerson) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.18)";
      ctx.fillRect(x, y, width, height);
    }

    // Label Background (above the box)
    ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    const textWidth = ctx.measureText(label).width;
    const padding = 8;
    const labelHeight = 26;

    ctx.fillRect(x - 2, y - labelHeight - 6, textWidth + padding * 2, labelHeight);

    // Label Text
    ctx.fillStyle = "#000000";
    ctx.fillText(label, x + padding - 2, y - labelHeight - 2);

    // Play alert sound when person is detected
    if (isPerson) {
      playPersonDetected();
    }
  });
};