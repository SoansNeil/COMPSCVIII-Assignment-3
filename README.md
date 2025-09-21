# Content Displayer & Basic Player

This is a minimal static page that demonstrates a content displayer (textarea) and a basic media player (audio/video). It supports:

- Loading local media files (audio or video)
- Play / Pause, Stop
- Seek bar and time display
- Volume and loop controls
- Drag-and-drop file onto the "Load media" label
- Simple content displayer with sample text

How to open

1. Open `index.html` in a modern browser (double-click or use "Open File...").
2. Or serve the folder with a simple static server (recommended for some browsers):

```sh
# Python 3
python3 -m http.server 8000

# then open http://localhost:8000 in your browser
```

Notes
- This is intentionally minimal and dependency-free. It uses the browser's native media playback.
- If you want captions/transcripts integrated with the media, that can be added as a follow-up.

Quick verification

1. Start the server: `python3 -m http.server 8000` (or open `index.html` directly).
2. Visit http://localhost:8000 in your browser and load an audio/video file via the "Load media" control.

# COMPSCVIII-Assignment-3