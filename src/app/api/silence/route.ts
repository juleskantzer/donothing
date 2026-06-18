import { NextResponse } from "next/server";

export async function GET() {
  // Minimal valid MP3: ID3v2 header + one silent MPEG frame
  // This is a real, parseable MP3 file — just silent.
  const id3Header = Buffer.from([
    0x49, 0x44, 0x33, // "ID3"
    0x03, 0x00,       // version 2.3.0
    0x00,             // flags
    0x00, 0x00, 0x00, 0x0a, // size: 10 bytes
    // TIT2 frame: title = "nothing"
    0x54, 0x49, 0x54, 0x32, // "TIT2"
    0x00, 0x00, 0x00, 0x08, // frame size: 8 bytes
    0x00, 0x00,             // flags
    0x00,                   // encoding: ISO-8859-1
    0x6e, 0x6f, 0x74, 0x68, 0x69, 0x6e, 0x67, // "nothing"
  ]);

  // Generate 30 min of silence: 128kbps MP3 silent frames.
  // Players estimate duration as bytes * 8 / bitrate, so we size the stream to
  // exactly 1800s worth of bytes: 1800 * 128000 / 8 = 28,800,000 bytes.
  // 28,800,000 / 417 ≈ 69065 frames → reported duration lands on 30:00.
  const frameCount = 69065;
  const frameSize = 417;
  const silentFrames = Buffer.alloc(frameCount * frameSize, 0x00);
  // Write sync word + header for each frame
  for (let i = 0; i < frameCount; i++) {
    const offset = i * frameSize;
    silentFrames[offset] = 0xff;     // sync
    silentFrames[offset + 1] = 0xfb; // MPEG1, Layer3, no CRC
    silentFrames[offset + 2] = 0x90; // 128kbps, 44100Hz, no padding
    silentFrames[offset + 3] = 0x00; // stereo, no extension
  }

  const mp3 = Buffer.concat([id3Header, silentFrames]);

  return new NextResponse(mp3, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": 'attachment; filename="nothing_meditation.mp3"',
      "Content-Length": String(mp3.length),
    },
  });
}
