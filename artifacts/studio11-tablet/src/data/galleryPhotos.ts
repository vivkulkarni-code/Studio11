export interface GalleryPhoto {
  id: string;
  source: ReturnType<typeof require>;
  category: string;
  label: string;
}

export const bundledGalleryPhotos: GalleryPhoto[] = [
  { id: 'g1', source: require('../../../../attached_assets/Picsart_24-07-12_14-12-25-736_1782162273208.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g2', source: require('../../../../attached_assets/Picsart_24-07-12_14-16-03-557_1782162273275.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g3', source: require('../../../../attached_assets/Picsart_24-07-12_14-25-05-857_1782162273309.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g4', source: require('../../../../attached_assets/Picsart_24-07-12_14-27-12-630_1782162273360.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g5', source: require('../../../../attached_assets/Picsart_24-07-12_15-37-48-757_1782162273399.png'), category: 'Colour', label: 'Colour Work' },
  { id: 'g6', source: require('../../../../attached_assets/Picsart_24-07-12_15-39-24-333_1782162454554.png'), category: 'Colour', label: 'Colour Work' },
  { id: 'g7', source: require('../../../../attached_assets/Picsart_24-07-12_15-41-11-546_1782162454572.png'), category: 'Colour', label: 'Colour Work' },
  { id: 'g8', source: require('../../../../attached_assets/Picsart_24-07-12_15-43-57-430_1782162454589.png'), category: 'Colour', label: 'Colour Work' },
  { id: 'g9', source: require('../../../../attached_assets/Picsart_24-07-12_15-45-15-535_1782162454606.png'), category: 'Bridal', label: 'Bridal Look' },
  { id: 'g10', source: require('../../../../attached_assets/Picsart_24-07-17_16-38-37-385_1782162454618.png'), category: 'Bridal', label: 'Bridal Look' },
  { id: 'g11', source: require('../../../../attached_assets/Picsart_24-07-17_16-41-18-767_1782162454635.png'), category: 'Bridal', label: 'Bridal Look' },
  { id: 'g12', source: require('../../../../attached_assets/Picsart_24-07-17_16-55-21-616_1782162454653.png'), category: 'Make Up', label: 'Make Up' },
  { id: 'g13', source: require('../../../../attached_assets/Picsart_24-07-17_16-55-56-013_1782162454670.jpg'), category: 'Make Up', label: 'Make Up' },
  { id: 'g14', source: require('../../../../attached_assets/Picsart_24-07-17_16-57-55-352_1782162454690.png'), category: 'Make Up', label: 'Make Up' },
  { id: 'g15', source: require('../../../../attached_assets/Picsart_24-07-17_16-58-33-578_1782162454712.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g16', source: require('../../../../attached_assets/Picsart_24-07-17_17-00-49-416_1782162700204.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g17', source: require('../../../../attached_assets/Picsart_24-07-17_17-01-47-916_1782162700226.png'), category: 'Colour', label: 'Colour Work' },
  { id: 'g18', source: require('../../../../attached_assets/Picsart_24-07-17_17-02-43-059_1782162700242.png'), category: 'Colour', label: 'Colour Work' },
  { id: 'g19', source: require('../../../../attached_assets/Picsart_24-07-17_17-30-07-557_1782162700265.jpg'), category: 'Bridal', label: 'Bridal Look' },
  { id: 'g20', source: require('../../../../attached_assets/Picsart_24-07-17_17-32-44-687_1782162700295.png'), category: 'Bridal', label: 'Bridal Look' },
  { id: 'g21', source: require('../../../../attached_assets/Picsart_24-07-17_17-34-06-735_1782162700317.png'), category: 'Make Up', label: 'Make Up' },
  { id: 'g22', source: require('../../../../attached_assets/Picsart_24-07-17_17-42-24-520_1782162700342.jpg'), category: 'Make Up', label: 'Make Up' },
  { id: 'g23', source: require('../../../../attached_assets/Picsart_24-07-17_17-44-44-695_1782162700368.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g24', source: require('../../../../attached_assets/Picsart_24-07-17_17-49-05-181_1782162700398.png'), category: 'Hair Styling', label: 'Studio Work' },
  { id: 'g25', source: require('../../../../attached_assets/Picsart_26-06-17_00-35-04-441_1781636721338.jpg'), category: 'Bridal', label: 'Bridal Look' },
];

export const galleryCategories = ['All', 'Hair Styling', 'Colour', 'Bridal', 'Make Up'];
