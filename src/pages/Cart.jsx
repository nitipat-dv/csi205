import React from 'react';

function Cart({ cart, setCart }) {

  const removeFromCart = (productId) => {
    setCart((c) => c.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((c) =>
      c.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 border-b pb-4">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-20 h-20 object-contain rounded-md border p-1"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/eeeeee/cccccc?text=...'; }}
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">${item.price ? item.price.toFixed(2) : '0.00'}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-bold">-</button>
              <span className="font-semibold w-8 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-bold">+</button>
            </div>
            <span className="font-semibold text-gray-800 w-24 text-center md:text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-2xl font-bold ml-2">&times;</button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <h3 className="text-2xl font-bold text-gray-800">
          Subtotal: ${subtotal.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default Cart;