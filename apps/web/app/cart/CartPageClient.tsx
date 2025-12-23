'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { parseCart, serializeCart, CartItem } from '@/lib/cart';
import type { StrapiEntity, Product, ShippingOption } from '@/lib/cms-types';
import { getImageUrl } from '@/lib/media-utils';

interface CartPageClientProps {
  allProducts: StrapiEntity<Product>[];
  shippingOptions: StrapiEntity<ShippingOption>[];
}

export function CartPageClient({ allProducts, shippingOptions }: CartPageClientProps) {
  const heroRef = useScrollAnimation<HTMLElement>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Map<number, StrapiEntity<Product>>>(new Map());
  const [discountCode, setDiscountCode] = useState('');
  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from cookie
    const cartCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('district_cart='));
    const items = parseCart(cartCookie?.split('=')[1]);
    setCartItems(items);

    // Map products
    const productMap = new Map();
    allProducts.forEach(product => {
      productMap.set(product.id, product);
    });
    setProducts(productMap);
    setLoading(false);
  }, [allProducts]);

  const updateQuantity = (productId: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(productId);
      return;
    }

    const updated = cartItems.map(item =>
      item.productId === productId ? { ...item, qty: newQty } : item
    );
    setCartItems(updated);
    document.cookie = `district_cart=${serializeCart(updated)}; path=/; max-age=${14 * 24 * 60 * 60}; SameSite=Lax`;
  };

  const removeItem = (productId: number) => {
    const updated = cartItems.filter(item => item.productId !== productId);
    setCartItems(updated);
    document.cookie = `district_cart=${serializeCart(updated)}; path=/; max-age=${14 * 24 * 60 * 60}; SameSite=Lax`;
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discountCode: discountCode || undefined,
          shippingOptionId: selectedShipping || undefined,
          email: '', // Will be collected in Stripe Checkout
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout failed');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals (for display only - server validates)
  const cartProducts = cartItems
    .map(item => {
      const product = products.get(item.productId);
      return product ? { product, qty: item.qty } : null;
    })
    .filter(Boolean) as Array<{ product: StrapiEntity<Product>; qty: number }>;

  const subtotal = cartProducts.reduce((sum, { product, qty }) => {
    const price = product.attributes.price || 0;
    return sum + (price * qty);
  }, 0);

  const shippingAmount = selectedShipping
    ? shippingOptions.find(opt => opt.id === selectedShipping)?.attributes.price || 0
    : 0;

  const total = subtotal + shippingAmount; // Discount calculated server-side

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <section ref={heroRef.ref} className="relative py-32 bg-night-green overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-20" />
        <div className="container-luxury relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ivory mb-6"
          >
            Shopping Cart
          </motion.h1>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-luxury">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="w-24 h-24 mx-auto text-stone/40 mb-6" />
              <h2 className="text-night-green mb-4">Your cart is empty</h2>
              <p className="text-slate-moss mb-8">Start adding products to your cart</p>
              <Link href="/collection">
                <Button variant="default" size="lg">
                  Browse Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {cartProducts.map(({ product, qty }) => {
                  const attrs = product.attributes;
                  const firstImage = attrs.images?.data?.[0];
                  // firstImage is already in Strapi format { attributes: { url } }, pass it directly
                  const imageUrl = firstImage ? getImageUrl(firstImage) : null;

                  return (
                    <div key={product.id} className="bg-stone/10 p-6 rounded-sm flex gap-6">
                      {imageUrl && (
                        <div className="relative w-24 h-24 rounded-sm overflow-hidden flex-shrink-0">
                          <Image src={imageUrl} alt={attrs.name} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-night-green mb-2">{attrs.name}</h3>
                        <p className="text-slate-moss/80 text-sm mb-4">
                          {attrs.priceOnRequest || !attrs.price
                            ? 'Price on Request'
                            : `${attrs.currency} ${attrs.price.toLocaleString()}`}
                        </p>
                        <div className="flex items-center gap-4">
                          <Label>Quantity:</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(product.id, qty - 1)}
                            >
                              -
                            </Button>
                            <span className="w-12 text-center">{qty}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(product.id, qty + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(product.id)}
                            className="ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-stone/10 p-6 rounded-sm sticky top-24">
                  <h3 className="text-night-green mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-moss">Subtotal</span>
                      <span className="text-night-green font-semibold">
                        SAR {subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <Label className="mb-2 block">Discount Code</Label>
                      <div className="flex gap-2">
                        <Input
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Enter code"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Shipping</Label>
                      <Select
                        value={selectedShipping?.toString() || ''}
                        onValueChange={(value) => setSelectedShipping(value ? parseInt(value) : null)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shipping" />
                        </SelectTrigger>
                        <SelectContent>
                          {shippingOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id.toString()}>
                              {option.attributes.name} - {option.attributes.currency} {option.attributes.price.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {shippingAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-moss">Shipping</span>
                        <span className="text-night-green">
                          SAR {shippingAmount.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-stone/30">
                      <div className="flex justify-between">
                        <span className="text-night-green font-semibold">Total</span>
                        <span className="text-night-green font-bold text-xl">
                          SAR {total.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-moss/60 mt-2">
                        Final amount calculated at checkout
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Link href="/collection" className="block mt-4 text-center text-sm text-slate-moss hover:text-night-green">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

