'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { StrapiEntity, Product, getImageUrl, getImageUrlArray } from '@/lib/cms';
import { parseCart, serializeCart } from '@/lib/cart';
import { ShoppingCart } from 'lucide-react';

interface ProductDetailClientProps {
  product: StrapiEntity<Product>;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const heroRef = useScrollAnimation<HTMLElement>();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const attrs = product.attributes;
  const images = getImageUrlArray(attrs.images);
  const mainImage = images[0] || null;
  const categoryName = attrs.category?.data?.attributes?.name || '';

  const handleAddToCart = () => {
    if (!attrs.purchasable || !attrs.stripePriceId) {
      return;
    }

    setAddingToCart(true);
    
    // Get current cart
    const cartCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('district_cart='));
    const cartItems = parseCart(cartCookie?.split('=')[1]);

    // Add or update item
    const existingIndex = cartItems.findIndex(item => item.productId === product.id);
    if (existingIndex >= 0) {
      cartItems[existingIndex].qty += quantity;
    } else {
      cartItems.push({
        productId: product.id,
        slug: attrs.slug,
        qty: quantity,
      });
    }

    // Save to cookie
    document.cookie = `district_cart=${serializeCart(cartItems)}; path=/; max-age=${14 * 24 * 60 * 60}; SameSite=Lax`;

    setAddingToCart(false);
    
    // Show success (you can use toast here)
    alert('Added to cart!');
  };

  const formatPrice = () => {
    if (attrs.priceOnRequest || !attrs.price) {
      return "Price on Request";
    }
    return `${attrs.currency} ${attrs.price.toLocaleString()}`;
  };

  return (
    <>
      <section ref={heroRef.ref} className="relative py-32 bg-night-green overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={heroRef.isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {mainImage && (
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={attrs.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={heroRef.isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-sm uppercase tracking-wider text-stone mb-4 block">{categoryName}</span>
              <h1 className="text-ivory mb-6">{attrs.name}</h1>
              {attrs.shortDescription && (
                <p className="text-xl text-stone mb-6">{attrs.shortDescription}</p>
              )}
              <div className="space-y-4 mb-8">
                {attrs.dimensions && (
                  <div>
                    <span className="text-sm uppercase tracking-wider text-stone/60 block mb-1">Dimensions</span>
                    <span className="text-stone">{attrs.dimensions}</span>
                  </div>
                )}
                {attrs.materials && (
                  <div>
                    <span className="text-sm uppercase tracking-wider text-stone/60 block mb-1">Materials</span>
                    <span className="text-stone">{attrs.materials}</span>
                  </div>
                )}
                {attrs.application && (
                  <div>
                    <span className="text-sm uppercase tracking-wider text-stone/60 block mb-1">Application</span>
                    <span className="text-stone">{attrs.application}</span>
                  </div>
                )}
              </div>
              <div className="mb-8">
                <span className="text-3xl font-bold text-ivory">{formatPrice()}</span>
              </div>
              {attrs.purchasable && attrs.stripePriceId ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-stone">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-3 py-2 border border-stone/40 rounded-sm bg-ivory/10 text-ivory"
                    />
                  </div>
                  <Button variant="hero" size="lg" onClick={handleAddToCart} disabled={addingToCart}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </Button>
                </div>
              ) : (
                <Button variant="heroOutline" size="lg">
                  Request Quote
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {attrs.longDescription && (
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <div dangerouslySetInnerHTML={{ __html: attrs.longDescription }} />
            </div>
          </div>
        </section>
      )}

      {images.length > 1 && (
        <section className="section-padding bg-stone/10">
          <div className="container-luxury">
            <h2 className="text-night-green mb-8 text-center">Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.slice(1).map((img, index) => (
                <div key={index} className="relative aspect-square rounded-sm overflow-hidden">
                  <Image
                    src={img}
                    alt={`${attrs.name} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

