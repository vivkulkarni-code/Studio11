import photo1  from '@assets/Picsart_24-07-12_14-12-25-736_1782162273208.png';
import photo2  from '@assets/Picsart_24-07-12_14-16-03-557_1782162273275.png';
import photo3  from '@assets/Picsart_24-07-12_14-25-05-857_1782162273309.png';
import photo4  from '@assets/Picsart_24-07-12_14-27-12-630_1782162273360.png';
import photo5  from '@assets/Picsart_24-07-12_15-37-48-757_1782162273399.png';
import photo6  from '@assets/Picsart_24-07-12_15-39-24-333_1782162454554.png';
import photo7  from '@assets/Picsart_24-07-12_15-41-11-546_1782162454572.png';
import photo8  from '@assets/Picsart_24-07-12_15-43-57-430_1782162454589.png';
import photo9  from '@assets/Picsart_24-07-12_15-45-15-535_1782162454606.png';
import photo10 from '@assets/Picsart_24-07-17_16-38-37-385_1782162454618.png';
import photo11 from '@assets/Picsart_24-07-17_16-41-18-767_1782162454635.png';
import photo12 from '@assets/Picsart_24-07-17_16-55-21-616_1782162454653.png';
import photo13 from '@assets/Picsart_24-07-17_16-55-56-013_1782162454670.jpg';
import photo14 from '@assets/Picsart_24-07-17_16-57-55-352_1782162454690.png';
import photo15 from '@assets/Picsart_24-07-17_16-58-33-578_1782162454712.png';
import photo16 from '@assets/Picsart_24-07-17_17-00-49-416_1782162700204.png';
import photo17 from '@assets/Picsart_24-07-17_17-01-47-916_1782162700226.png';
import photo18 from '@assets/Picsart_24-07-17_17-02-43-059_1782162700242.png';
import photo19 from '@assets/Picsart_24-07-17_17-30-07-557_1782162700265.jpg';
import photo20 from '@assets/Picsart_24-07-17_17-32-44-687_1782162700295.png';
import photo21 from '@assets/Picsart_24-07-17_17-34-06-735_1782162700317.png';
import photo22 from '@assets/Picsart_24-07-17_17-42-24-520_1782162700342.jpg';
import photo23 from '@assets/Picsart_24-07-17_17-44-44-695_1782162700368.png';
import photo24 from '@assets/Picsart_24-07-17_17-49-05-181_1782162700398.png';

export interface GalleryPhoto {
  id: string;
  src: string;
  category: string;
  caption?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 'g1',  src: photo1,  category: 'Hair Color',   caption: 'Multi-tone Highlights' },
  { id: 'g2',  src: photo2,  category: 'Hair Styling', caption: 'Layered Blowout' },
  { id: 'g3',  src: photo3,  category: 'Hair Color',   caption: 'Balayage & Curls' },
  { id: 'g4',  src: photo4,  category: 'Hair Styling', caption: 'Voluminous Layers' },
  { id: 'g5',  src: photo5,  category: 'Hair Styling', caption: 'Highlights & Styling' },
  { id: 'g6',  src: photo6,  category: 'Hair Color',   caption: 'Burgundy Gloss' },
  { id: 'g7',  src: photo7,  category: 'Hair Styling', caption: 'Soft Waves' },
  { id: 'g8',  src: photo8,  category: 'Hair Color',   caption: 'Teal Dip Dye' },
  { id: 'g9',  src: photo9,  category: 'Hair Color',   caption: 'Copper Ombre' },
  { id: 'g10', src: photo10, category: 'Hair Styling', caption: 'Sleek Finish' },
  { id: 'g11', src: photo11, category: 'Hair Cut',     caption: 'Family Haircut' },
  { id: 'g12', src: photo12, category: 'Hair Styling', caption: 'Classic Blowout' },
  { id: 'g13', src: photo13, category: 'Hair Color',   caption: 'Peekaboo Highlights' },
  { id: 'g14', src: photo14, category: 'Hair Styling', caption: 'Bridal Updo in Progress' },
  { id: 'g15', src: photo15, category: 'Hair Styling', caption: 'Salon Glam' },
  { id: 'g16', src: photo16, category: 'Hair Color',   caption: 'Pink Peekaboo' },
  { id: 'g17', src: photo17, category: 'Hair Color',   caption: 'Golden Layers' },
  { id: 'g18', src: photo18, category: 'Hair Color',   caption: 'Caramelized' },
  { id: 'g19', src: photo19, category: 'Hair Cut',     caption: 'Kids Cut' },
  { id: 'g20', src: photo20, category: 'Hair Color',   caption: 'Red Streaks' },
  { id: 'g21', src: photo21, category: 'Hair Color',   caption: 'Full Purple' },
  { id: 'g22', src: photo22, category: 'Hair Color',   caption: 'Golden Highlights' },
  { id: 'g23', src: photo23, category: 'Hair Color',   caption: 'Ash Blonde Highlights' },
  { id: 'g24', src: photo24, category: 'Hair Color',   caption: 'Blue Dip Dye' },
];
