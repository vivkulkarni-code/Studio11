export interface GalleryPhoto {
  id: string;
  src: string;
  category: string;
  caption?: string;
}

// Add imported photo URLs here, then add entries to GALLERY_PHOTOS below.
// Example:
// import haircut1 from '@assets/your-photo.jpg';
// { id: 'g1', src: haircut1, category: 'Hair', caption: 'Precision Cut' }

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Photos will be added here as you upload them
];
