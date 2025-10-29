import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>([
    {
      id: 1,
      name: "Futuristic iPad Stand",
      description: "Elegant iPad stand with modern geometric design",
      price: "1,500",
      image: "https://i.pinimg.com/originals/28/b6/b2/28b6b208ceae84a1d9809d802abe19b7.jpg"
    },
    {
      id: 2,
      name: "Modern Phone Stand",
      description: "Sleek phone stand with wave-like design",
      price: "850",
      image: "https://i.pinimg.com/originals/b7/a9/01/b7a901cf0e5b29a1c11287a77b678003.jpg"
    },
    {
      id: 3,
      name: "Custom Phone Case",
      description: "3D printed phone case with unique pattern",
      price: "700",
      image: "https://i.pinimg.com/originals/f1/97/40/f19740acf9308fc8d2089dfb458fb56e.jpg"
    },
    {
      id: 4,
      name: "iPad Holder Statue",
      description: "Artistic statue designed to hold iPad",
      price: "2,200",
      image: "https://i.pinimg.com/originals/49/46/f9/4946f97812d9415dabd91248260fcada.jpg"
    },
    {
      id: 5,
      name: "3D Printed Bookshelf",
      description: "Compact shelf for books and decor items",
      price: "1,800",
      image: "https://i.pinimg.com/originals/b7/a4/86/b7a48639ffe10a414036142fabd1972f.jpg"
    },
    {
      id: 6,
      name: "Geometric Sculpture",
      description: "Abstract geometric art piece",
      price: "1,200",
      image: "https://i.pinimg.com/originals/9d/08/63/9d0863bb037a90bed4d77b0a5f189f28.jpg"
    },
    {
      id: 7,
      name: "Abstract Sculpture",
      description: "Modern art sculpture with unique texture",
      price: "1,600",
      image: "https://i.pinimg.com/originals/4f/72/d6/4f72d64ca408c8192a727b98924fe0da.jpg"
    },
    {
      id: 8,
      name: "Black & White Art",
      description: "Contrasting sculpture with intricate details",
      price: "1,900",
      image: "https://i.pinimg.com/originals/f6/b2/ec/f6b2eca0d27282ba30f45899e7a27481.jpg"
    },
    {
      id: 9,
      name: "Controller Stand",
      description: "Gaming controller holder with modern design",
      price: "950",
      image: "https://i.pinimg.com/originals/14/bc/ea/14bceacf7db9661e3405fe9c40d06a95.jpg"
    },
    {
      id: 10,
      name: "Modern Stool",
      description: "Functional 3D printed stool",
      price: "3,200",
      image: "https://i.pinimg.com/originals/3f/dd/0d/3fdd0dfc8f6d7d0e9d2b433159b8527b.jpg"
    },
    {
      id: 11,
      name: "City Building Models",
      description: "Set of architectural building models",
      price: "2,800",
      image: "https://i.pinimg.com/originals/11/64/fb/1164fb6d6395681b95200f178f0507c1.jpg"
    },
    {
      id: 12,
      name: "Keyboard Stand",
      description: "Ergonomic stand for computer keyboards",
      price: "1,100",
      image: "https://i.pinimg.com/originals/73/0d/ff/730dff30d205ff9844cb312da9c7523b.jpg"
    },
    {
      id: 13,
      name: "Neural Network Art",
      description: "Wall art inspired by neural networks",
      price: "1,400",
      image: "https://i.pinimg.com/originals/e7/6c/c7/e76cc7d2bd9c7cfb8abe2c5d1076295f.jpg"
    },
    {
      id: 14,
      name: "Mechanical Phone Stand",
      description: "Quick grab/release mechanism stand",
      price: "1,300",
      image: "https://i.pinimg.com/originals/85/07/30/85073025f21458476183a5d3001740e0.jpg"
    },
    {
      id: 15,
      name: "High Heel Model",
      description: "Fashion model shoe design",
      price: "900",
      image: "https://i.pinimg.com/originals/8c/a7/c9/8ca7c96c703bf31e20bd83141a44f7cf.jpg"
    },
    {
      id: 16,
      name: "Metal Gear Piece",
      description: "Detailed mechanical gear component",
      price: "1,100",
      image: "https://i.pinimg.com/originals/79/41/62/794162aa8bbcf622a2a5992c858bfc04.jpg"
    },
    {
      id: 17,
      name: "Floral Vase",
      description: "Vase with modern floral design",
      price: "1,200",
      image: "https://i.pinimg.com/originals/15/b7/af/15b7afad8b0dab21f8134ebf19743d0d.jpg"
    },
    {
      id: 18,
      name: "Skeleton Car Model",
      description: "Futuristic skeleton car design",
      price: "3,500",
      image: "https://i.pinimg.com/originals/23/a3/61/23a3616433ee5a81caccf97352f849e0.jpg"
    },
    {
      id: 19,
      name: "Exoskeleton Watch",
      description: "Unique wearable watch design",
      price: "4,200",
      image: "https://i.pinimg.com/originals/e1/f8/e9/e1f8e97056781ded22110ec63027cc73.png"
    },
    {
      id: 20,
      name: "Minimalist Sculpture",
      description: "Clean white sculpture piece",
      price: "1,700",
      image: "https://i.pinimg.com/originals/27/33/c1/2733c1ed06f03a6781b842946ddffe5e.jpg"
    }
  ]);
}
