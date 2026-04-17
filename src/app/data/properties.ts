export interface Property {
  id: string;
  name: string;
  location: string;
  area: string;
  country: 'Spain' | 'Morocco';
  price: number;
  beds: number;
  baths: number;
  sqm: number;
  tag: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  type: 'villa' | 'penthouse' | 'apartment' | 'riad' | 'estate';
  status: 'for-sale' | 'sold' | 'reserved';
  yearBuilt?: number;
  garage?: number;
}

export const properties: Property[] = [
  {
    id: 'villa-palomeras',
    name: 'Villa Palomeras — Las Lomas de Río Verde',
    location: 'Golden Mile',
    area: 'Marbella',
    country: 'Spain',
    price: 1650000,
    beds: 4,
    baths: 4,
    sqm: 380,
    tag: 'Exclusive',
    type: 'villa',
    status: 'for-sale',
    yearBuilt: 2019,
    garage: 2,
    image: 'https://images.unsplash.com/photo-1757439402214-2311405d70bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1757439402214-2311405d70bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1772411650649-f88111bcb8a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1757439401991-2c6c3df38349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1628744448839-a475cc0e90c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'Exceptional villa nestled in the prestigious Las Lomas de Río Verde on Marbella\'s Golden Mile. This elegant property seamlessly blends contemporary design with Mediterranean warmth — offering panoramic sea views, absolute privacy, and effortless indoor-outdoor living. Every detail has been thoughtfully curated for the most discerning buyer.',
    features: [
      'Private infinity pool with Mediterranean views',
      'South-facing terraces with all-day sun',
      'Gourmet kitchen with Bulthaup cabinetry',
      'Master suite with walk-in dressing room and spa bathroom',
      'Private garage for 2 vehicles',
      'Landscaped gardens with automatic irrigation',
      'Crestron home automation system',
      'Walking distance to beach clubs and restaurants',
    ],
  },
  {
    id: 'sky-penthouse',
    name: 'Sky Penthouse — Marina Front',
    location: 'Puerto Banús',
    area: 'Marbella',
    country: 'Spain',
    price: 2100000,
    beds: 3,
    baths: 3,
    sqm: 240,
    tag: 'Sea Views',
    type: 'penthouse',
    status: 'for-sale',
    yearBuilt: 2021,
    garage: 2,
    image: 'https://images.unsplash.com/photo-1767555027401-6829988ca9df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1767555027401-6829988ca9df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1585942246090-2a212dce0501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1640109229792-a26a0ee366ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'Spectacular penthouse residence in the heart of Puerto Banús with unobstructed marina and sea views. Bathed in light through floor-to-ceiling glazing, this ultra-modern apartment offers a wraparound terrace with an outdoor kitchen — the perfect stage for Marbella living at its finest.',
    features: [
      'Panoramic sea and marina views from every room',
      'Expansive wraparound terrace with outdoor kitchen',
      'Floor-to-ceiling glazing throughout',
      'Private rooftop pool',
      'Access to resident spa, gym and concierge',
      'Underground parking for 2 vehicles',
      'Walking distance to designer boutiques and yacht berths',
      'Smart home technology — Lutron lighting and climate',
    ],
  },
  {
    id: 'casa-serena',
    name: 'Casa Serena — Contemporary Estate',
    location: 'Sierra Blanca',
    area: 'Marbella',
    country: 'Spain',
    price: 3850000,
    beds: 5,
    baths: 5,
    sqm: 620,
    tag: 'New Build',
    type: 'estate',
    status: 'for-sale',
    yearBuilt: 2024,
    garage: 3,
    image: 'https://images.unsplash.com/photo-1757264119066-2f627c6a6f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1757264119066-2f627c6a6f03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1656379231057-0e55a36183d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1628744876525-f2678d8af47f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'A brand new architectural masterpiece in Sierra Blanca — one of Marbella\'s most coveted gated communities. This contemporary estate redefines the art of luxury living with breathtaking sea and mountain views, museum-quality finishes, and a seamless dialogue between interior spaces and landscape.',
    features: [
      'Infinity pool with panoramic sea and mountain views',
      'State-of-the-art home cinema and wine cellar',
      'Spa suite with heated pool, sauna and steam room',
      'Gym with dedicated wellness studio',
      'Guest apartment with separate private entrance',
      'Award-winning landscaped gardens',
      '24-hour security in gated community',
      'Elevator connecting all four levels',
    ],
  },
  {
    id: 'riad-nejma',
    name: 'Riad Nejma — Medina Palace',
    location: 'Medina',
    area: 'Marrakech',
    country: 'Morocco',
    price: 2850000,
    beds: 7,
    baths: 6,
    sqm: 580,
    tag: 'Heritage',
    type: 'riad',
    status: 'for-sale',
    yearBuilt: 1890,
    image: 'https://images.unsplash.com/photo-1565020244281-fe53df7df170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1565020244281-fe53df7df170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1692089265184-f0941cbe333c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1540541338537-1d4d9bfc7b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1551887373-6edba6dacbb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    description: 'One of the Marrakech Medina\'s most extraordinary palaces — Riad Nejma is a UNESCO-registered architectural gem spanning three interconnected houses behind an unmarked facade. Exquisitely restored by a renowned Moroccan master craftsman, every zellige tile, carved cedar ceiling, and courtyard fountain tells a story centuries in the making.',
    features: [
      'UNESCO-listed architectural heritage property',
      'Three interconnected private courtyards with water features',
      'Hand-carved cedar ceilings and plasterwork throughout',
      'Rooftop terrace with panoramic medina and Atlas Mountain views',
      'Original zellige tilework restored by master artisans',
      'Private hammam and spa suite',
      'Chef\'s kitchen with traditional Moroccan bread oven',
      'Staff accommodation and discreet private entrance',
    ],
  },
];
