'use client';

/**
 * Products Section Component
 * Now integrated with CMS for editable content
 */

import { useState } from 'react';
import Toast from '@/components/toast';
import ProductCard from './product-card';
import { useProductsData, useAdminMode, Product } from '@/lib/cms';
import { EditButton, ProductEditorModal } from '@/components/admin';
import { Plus, Settings } from 'lucide-react';

export default function Products() {
  const { categories, updateProduct, addProduct, deleteProduct } = useProductsData();
  const { isAdmin, isAuthenticated } = useAdminMode();

  const [toastData, setToastData] = useState<{ name: string; price: number; image: string } | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'edit' | 'add'>('edit');

  const handleAddToCart = (product: Product) => {
    setToastData({
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setTimeout(() => {
      setToastData(null);
    }, 3000);
  };

  const handleEditProduct = (categoryId: string, product: Product) => {
    setEditingCategoryId(categoryId);
    setEditingProduct(product);
    setEditorMode('edit');
    setIsEditorOpen(true);
  };

  const handleAddProduct = (categoryId: string) => {
    setEditingCategoryId(categoryId);
    setEditingProduct(null);
    setEditorMode('add');
    setIsEditorOpen(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (!editingCategoryId) return;

    if (editorMode === 'edit' && editingProduct) {
      updateProduct(editingCategoryId, editingProduct.id, productData);
    } else if (editorMode === 'add') {
      addProduct(editingCategoryId, {
        name: productData.name || 'New Product',
        price: productData.price || 0,
        discount: productData.discount || 0,
        image: productData.image || '/placeholder.svg',
        categoryId: editingCategoryId,
      });
    }
  };

  const handleDeleteProduct = (categoryId: string, productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(categoryId, productId);
    }
  };

  return (
    <>
      <section className="relative bg-gradient-to-b from-cream to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
              Our Premium <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Collection</span>
            </h2>
            <p className="text-lg text-blue-800/70 max-w-2xl mx-auto">
              Handcrafted blue pottery pieces that bring elegance and tradition to your home
            </p>
          </div>

          {/* Category Rows */}
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.id} className="relative space-y-4">

                {/* Admin Add Product Button */}
                {isAdmin && isAuthenticated && (
                  <button
                    onClick={() => handleAddProduct(category.id)}
                    className="absolute -top-2 right-0 z-20 flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors shadow-lg"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                )}

                {/* Category Header */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-blue">
                      {category.title}
                    </h3>
                    <p className="text-sm text-blue/60 mt-1">{category.subtitle}</p>
                  </div>
                  <button className="text-sm text-caramel hover:text-amber-600 font-medium transition-colors duration-200">
                    View All →
                  </button>
                </div>

                {/* Horizontal Scrolling Products */}
                <div className="relative overflow-hidden py-4">
                  <div className="flex gap-6 animate-scroll-seamless">
                    {/* Duplicate products 4 times for seamless scrolling (25% shift) */}
                    {[...Array(4)].map((_, setIndex) => (
                      <div key={setIndex} className="flex gap-6 shrink-0">
                        {category.products.map((product) => (
                          <div
                            key={`${setIndex}-${product.id}`}
                            className="relative w-72 flex-shrink-0 group"
                          >
                            {/* Admin Edit Overlay - Only on first set */}
                            {setIndex === 0 && isAdmin && isAuthenticated && (
                              <div className="absolute top-2 right-2 z-30 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditProduct(category.id, product);
                                  }}
                                  className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                                  title="Edit Product"
                                >
                                  <Settings size={14} />
                                </button>
                              </div>
                            )}

                            <ProductCard
                              product={product}
                              onAddToCart={() => handleAddToCart(product)}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Scroll Gradient Indicators */}
                  <div className="absolute top-0 left-0 bottom-4 w-20 bg-gradient-to-r from-cream to-transparent pointer-events-none z-10"></div>
                  <div className="absolute top-0 right-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {toastData && <Toast product={toastData} />}

      {/* Product Editor Modal */}
      <ProductEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingProduct(null);
          setEditingCategoryId(null);
        }}
        product={editingProduct}
        onSave={handleSaveProduct}
        mode={editorMode}
        categoryTitle={categories.find(c => c.id === editingCategoryId)?.title}
      />

      <style jsx>{`
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 4));
          }
        }
        
        .animate-scroll-seamless {
          animation: scroll-seamless 80s linear infinite;
          width: max-content;
        }
        
        .animate-scroll-seamless:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
