export const menuItems = [
  {
    id: 1,
    name: "Crown Burger",
    tagline: "The Signature",
    description: "Wagyu beef patty, aged cheddar, caramelized onions, house sauce, brioche bun",
    price: 18.99,
    calories: 850,
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop&q=80",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Royal Smash",
    tagline: "Double Trouble",
    description: "Double smash patties, American cheese, pickles, special sauce, potato bun",
    price: 21.99,
    calories: 1100,
    rating: 4.8,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=400&fit=crop&q=80",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Truffle Royale",
    tagline: "Premium Edition",
    description: "Black truffle aioli, gruyère, wild mushrooms, arugula, truffle brioche",
    price: 26.99,
    calories: 920,
    rating: 4.9,
    reviews: 1256,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=400&fit=crop&q=80",
    badge: "Premium",
  }
];

export const burgerLayers = [
  { id:'top-bun', name:'Sesame Seed Bun', detail:'Golden brioche, toasted to perfection, topped with black & white sesame seeds', color:'#D4A056', emoji:'🍞', cal:'180 cal' },
  { id:'lettuce', name:'Fresh Lettuce', detail:'Crisp butter lettuce, hand-selected for freshness, adds the perfect crunch', color:'#4CAF50', emoji:'🥬', cal:'10 cal' },
  { id:'tomato', name:'Heirloom Tomato', detail:'Vine-ripened heirloom tomato, sliced thick for maximum juiciness', color:'#E53935', emoji:'🍅', cal:'25 cal' },
  { id:'cheese', name:'Aged Cheddar', detail:'18-month aged sharp cheddar, melted to golden perfection', color:'#FFB300', emoji:'🧀', cal:'110 cal' },
  { id:'patty', name:'Wagyu Beef Patty', detail:'8oz USDA Prime wagyu blend, seasoned with salt, pepper & secret spice', color:'#8D6E63', emoji:'🥩', cal:'450 cal' },
  { id:'sauce', name:'Signature Sauce', detail:'House-made smoky aioli with chipotle, garlic & hints of truffle', color:'#FF7043', emoji:'🫗', cal:'80 cal' },
  { id:'bottom-bun', name:'Bottom Bun', detail:'Dense brioche base, sturdy enough to hold all the goodness together', color:'#C8923C', emoji:'🍞', cal:'150 cal' },
];

export const floatingIngredients = [
  { top:'12%', left:'5%', size:70, delay:0, cls:'float-1', bg:'from-red-500/40 to-red-700/20', border:'border-red-500/30' },
  { top:'18%', right:'8%', size:55, delay:0.5, cls:'float-2', bg:'from-green-500/40 to-green-700/20', border:'border-green-500/30' },
  { bottom:'20%', left:'8%', size:60, delay:1, cls:'float-3', bg:'from-yellow-400/40 to-amber-600/20', border:'border-yellow-500/30' },
  { top:'25%', right:'15%', size:45, delay:1.5, cls:'float-4', bg:'from-red-400/30 to-orange-500/20', border:'border-orange-400/30' },
  { bottom:'30%', right:'5%', size:65, delay:0.8, cls:'float-5', bg:'from-green-400/40 to-emerald-600/20', border:'border-emerald-500/30' },
  { top:'35%', left:'12%', size:50, delay:2, cls:'float-6', bg:'from-amber-400/40 to-orange-500/20', border:'border-amber-400/30' },
];