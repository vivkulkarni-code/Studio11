---
name: expo-video v56 API
description: expo-video hook and VideoView usage; asset source must be typed as number
---

In expo-video v56:
```ts
import { useVideoPlayer, VideoView, VideoPlayer } from 'expo-video';
const player = useVideoPlayer(source, (p: VideoPlayer) => {
  p.loop = true; p.muted = true; p.play();
});
// <VideoView player={player} style={...} contentFit="cover" nativeControls={false} />
```

VideoSource type accepts `number | string | { uri: string } | null`.
`require('../path/to/video.mp4')` returns `number` (RN asset ID).
Type video source props as `number` (not `ReturnType<typeof require>` which becomes unknown).

**Why:** TypeScript strict mode rejects `unknown` as VideoSource. Explicit `number` type resolves it.

**How to apply:** All video/image asset map types should be `Record<string, number>` or `number`.
