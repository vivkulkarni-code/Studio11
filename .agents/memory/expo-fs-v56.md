---
name: expo-file-system v56 API
description: Breaking API change in expo-file-system v56 - uses class-based API not legacy functions
---

In expo-file-system v56, the API changed to class-based:
```ts
import { Paths, Directory, File as FSFile } from 'expo-file-system';
const dir = new Directory(Paths.document, 'Studio11', 'Bookings');
await dir.create();
const file = new FSFile(dir, 'booking.json');
await file.write(JSON.stringify(data));
const items = await dir.list();
```

**Why:** Replit env has expo-file-system@56 installed (newer than expo 54 expects), and the legacy `FileSystem.documentDirectory` API is gone in v56.

**How to apply:** Never use `FileSystem.documentDirectory`, `FileSystem.makeDirectoryAsync`, or `FileSystem.writeAsStringAsync`. Always use the class-based API above.
