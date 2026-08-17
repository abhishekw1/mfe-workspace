import { Injectable, signal, computed } from '@angular/core';

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  quantity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Keep the writable signals private so components can't mutate them directly
  private _productData = signal<Products>({
    products: [
      {
        id: 124,
        title: 'iPhone X',
        price: 899.99,
        description:
          'The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.',
        thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp',
      },
      {
        id: 125,
        title: 'Oppo A57',
        price: 249.99,
        description:
          'The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.',
        thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/thumbnail.webp',
      },
      {
        id: 126,
        title: 'Oppo F19 Pro Plus',
        price: 399.99,
        description:
          'The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.',
        thumbnail:
          'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp',
      },
      {
        id: 127,
        title: 'Oppo K1',
        price: 299.99,
        description:
          'The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.',
        thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/thumbnail.webp',
      },
      {
        id: 128,
        title: 'Realme C35',
        price: 149.99,
        description:
          'The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.',
        thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/thumbnail.webp',
      },
      {
        id: 129,
        title: 'Realme X',
        price: 299.99,
        description:
          'The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.',
        thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/realme-x/thumbnail.webp',
      },
      {
        id: 130,
        title: 'Realme XT',
        price: 349.99,
        description:
          'The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.',
        thumbnail: 'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/thumbnail.webp',
      },
      {
        id: 131,
        title: 'Samsung Galaxy S7',
        price: 299.99,
        description:
          'The Samsung Galaxy S7 is a flagship smartphone known for its sleek design and advanced features. It features a high-resolution display, powerful camera, and robust performance.',
        thumbnail:
          'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/thumbnail.webp',
      },
      {
        id: 132,
        title: 'Samsung Galaxy S8',
        price: 499.99,
        description:
          'The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.',
        thumbnail:
          'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp',
      },
      {
        id: 133,
        title: 'Samsung Galaxy S10',
        price: 699.99,
        description:
          'The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.',
        thumbnail:
          'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp',
      },
    ],
    total: 23,
    skip: 10,
    limit: 10,
  });

  private _cart = signal<Product[]>([]);

  // Expose as readonly signals for components to consume
  public readonly productData = this._productData.asReadonly();
  public readonly cart = this._cart.asReadonly();
  public readonly cartItems = computed(() =>
    this.cart().reduce((total, np) => {
      total += np?.quantity || 1;
      return total;
    }, 0),
  );

  // Optional: You can create computed signals for derived state
  public readonly cartTotal = computed(() =>
    this._cart().reduce((sum, item) => sum + item.price, 0),
  );

  // Methods just need to return the signal, or components can use the public properties above
  getProducts() {
    return this.productData;
  }

  getCart() {
    return this.cart;
  }

  addToCart(product: Product) {
    this._cart.update((currentCart) => {
      if (currentCart.find((prod) => prod.id == product.id)) {
        return [
          ...currentCart.map((prod) => {
            product.quantity = product.quantity || 1;
            if (product.id == prod.id) {
              product.quantity += 1;
            }
            return prod;
          }),
        ];
      }
      product.quantity = 1;
      return [...currentCart, product];
    });
  }
}
