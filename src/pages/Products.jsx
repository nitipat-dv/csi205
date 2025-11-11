import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl border">
      <div className="h-48 w-full flex items-center justify-center p-4 bg-white">
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/eeeeee/cccccc?text=Image+Not+Found'; }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={product.title}>
          {product.title}
        </h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price ? product.price.toFixed(2) : '0.00'}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Products({ products, onAddToCart, cartItemsCount }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-semibold">Loading products...</h2>
        <p className="text-gray-600">Please wait a moment.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        {cartItemsCount > 0 && (
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            <span className="font-semibold">Items in Cart: {cartItemsCount}</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Products;