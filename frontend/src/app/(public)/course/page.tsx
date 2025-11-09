"use client";

import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";

type StorePrice = {
  store: string;
  price: number;
  url?: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  prices: StorePrice[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Fortune Refined Sunflower Oil - 1L",
    description: "Healthy cooking oil for everyday use",
    image: "data:image/jpeg;base64,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",
    prices: [
      { store: "Blinkit", price: 149, url: "https://blinkit.com" },
      { store: "BigBasket", price: 152, url: "https://bigbasket.com" },
      { store: "JioMart", price: 145, url: "https://www.jiomart.com" },
      { store: "Amazon Fresh", price: 148, url: "https://www.amazon.in" },
      { store: "Our Shop", price: 140, url: "/our-shop" },
    ],
  },
  {
    id: 2,
    name: "Aashirvaad Atta - 5Kg",
    description: "Whole wheat flour for soft rotis",
    image: "https://res.cloudinary.com/dkjkyvqg2/image/upload/v1754843383/shopping_uphvov.webp",
    prices: [
      { store: "Blinkit", price: 285 },
      { store: "BigBasket", price: 290 },
      { store: "JioMart", price: 279 },
      { store: "Amazon Fresh", price: 282 },
      { store: "Our Shop", price: 270 },
    ],
  },
  {
    id: 3,
    name: "Tata Salt - 1Kg",
    description: "Vacuum evaporated iodised salt",
    image: "https://res.cloudinary.com/dkjkyvqg2/image/upload/v1754844843/shopping_iu1ewb.webp",
    prices: [
      { store: "Blinkit", price: 25 },
      { store: "BigBasket", price: 26 },
      { store: "JioMart", price: 24 },
      { store: "Amazon Fresh", price: 25 },
      { store: "Our Shop", price: 22 },
    ],
  },
   {
    id: 4,
    name: "Amul Taaza Toned Milk - 1L",
    description: "Pasteurized toned milk, rich in calcium and protein",
    image: "https://res.cloudinary.com/dkjkyvqg2/image/upload/v1755455344/iun4tbhqxwq6zfihj3c5.jpg",
    prices: [
      { store: "Blinkit", price: 66, url: "https://blinkit.com" },
      { store: "BigBasket", price: 68, url: "https://bigbasket.com" },
      { store: "JioMart", price: 65, url: "https://www.jiomart.com" },
      { store: "Amazon Fresh", price: 66, url: "https://www.amazon.in" },
      { store: "Our Shop", price: 64, url: "/our-shop" },
    ],
  },
  {
    id: 5,
    name: "Maggie Instant Noodles - 420g (Pack of 6)",
    description: "Quick and tasty 2-minute noodles",
    image: "https://res.cloudinary.com/dkjkyvqg2/image/upload/v1755455143/shopping_mrhtwx.webp",
    prices: [
      { store: "Blinkit", price: 78 },
      { store: "BigBasket", price: 80 },
      { store: "JioMart", price: 75 },
      { store: "Amazon Fresh", price: 76 },
      { store: "Our Shop", price: 72 },
    ],
  },
  {
    id: 6,
    name: "Nestlé Everyday Dairy Whitener - 400g",
    description: "Instant milk powder for tea and coffee",
    image: "https://res.cloudinary.com/dkjkyvqg2/image/upload/v1755455418/nozszpnbm1nox7zagw1l.jpg",
    prices: [
      { store: "Blinkit", price: 220 },
      { store: "BigBasket", price: 225 },
      { store: "JioMart", price: 215 },
      { store: "Amazon Fresh", price: 218 },
      { store: "Our Shop", price: 210 },
    ],
  },
  {
    id: 7,
    name: "Parachute Coconut Oil - 500ml",
    description: "Pure coconut oil for hair and cooking",
    image: "https://res.cloudinary.com/dkjkyvqg2/image/upload/v1755455487/mhyteynbaifz2ttlttic.jpg",
    prices: [
      { store: "Blinkit", price: 110 },
      { store: "BigBasket", price: 112 },
      { store: "JioMart", price: 105 },
      { store: "Amazon Fresh", price: 108 },
      { store: "Our Shop", price: 100 },
    ],
  },
  {
  id:8 ,
  name: "Surf Excel Matic Front Load - 2Kg",
  description: "Premium laundry detergent for front-load machines",
  image: "https://res.cloudinary.com/dkjkyvqg2/image/upload/v1755455640/40130610_9-surf-excel-detergent-liquid-matic-front-load_v1ew0t.png",
  prices: [
    { store: "Blinkit", price: 540, url: "https://blinkit.com" },
    { store: "BigBasket", price: 545, url: "https://bigbasket.com" },
    { store: "JioMart", price: 525, url: "https://www.jiomart.com" },
    { store: "Amazon Fresh", price: 530, url: "https://www.amazon.in" },
    { store: "Our Shop", price: 510, url: "/our-shop" },
  ],
},
];

export default function ProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" bg-background text-foreground">
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text text-center">
        Grocery Price Comparison
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="flex w-full max-w-xl items-center bg-[var(--card)] shadow-lg rounded-full px-5 py-3 border border-[var(--border)]">
          <Search className="text-[var(--muted-foreground)]" size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 ml-3 bg-transparent border-none outline-none text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const minPrice = Math.min(...product.prices.map((p) => p.price));

          return (
            <div
              key={product.id}
              onClick={() => setShowModal(true)}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative h-52 w-full bg-[var(--muted)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">
                  {product.name}
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  {product.description}
                </p>

                {/* Prices Table */}
                <div className="space-y-2 text-sm">
                  {product.prices.map((p, i) => {
                    const isLowest = p.price === minPrice;
                    const isOurShop = p.store === "Our Shop";

                    return (
                      <div
                        key={i}
                        className="flex justify-between border-b border-[var(--border)] pb-1"
                      >
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {p.store}
                          </a>
                        ) : (
                          <span>{p.store}</span>
                        )}
                        <span
                          className={`font-semibold ${
                            isOurShop
                              ? "text-[var(--primary)]"
                              : isLowest
                              ? "text-green-600"
                              : "text-[var(--foreground)]"
                          }`}
                        >
                          ₹{p.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-[var(--foreground)]">
              Want to Compare More Products?
            </h3>
            <p className="mt-2 text-[var(--muted-foreground)]">
              Register now and get access to unlimited comparisons.
            </p>
            <div className="mt-5 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted-foreground)]/20 transition-colors"
              >
                Cancel
              </button>
              <a
                href="/register"
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div></div>
  );
}
