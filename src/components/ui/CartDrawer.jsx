import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-white shadow-2xl flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-primary-600" size={22} />
                  <h2 className="font-bold text-dark-900 text-lg">السلة</h2>
                  {cart.length > 0 && (
                    <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                      {cart.length}
                    </span>
                  )}
                </div>
                <button onClick={() => setCartOpen(false)} className="text-dark-400 hover:text-dark-800 transition-colors p-1">
                  <X size={22} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-48 text-center">
                      <ShoppingBag size={48} className="text-dark-200 mb-3" />
                      <p className="text-dark-400 font-medium">السلة فارغة</p>
                      <p className="text-dark-300 text-sm mt-1">أضف منتجات من المتجر</p>
                    </motion.div>
                  ) : (
                    cart.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="flex gap-3 bg-dark-50 rounded-xl p-3"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                              <span className="text-primary-600 font-bold text-xs">REV</span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-dark-800 font-medium text-sm leading-tight line-clamp-2">{item.name}</p>
                          <p className="text-primary-600 font-bold text-sm mt-1">{(item.price * item.qty).toLocaleString()} ج.م</p>
                          {/* Qty */}
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-6 h-6 bg-white rounded-lg border flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-6 h-6 bg-white rounded-lg border flex items-center justify-center hover:bg-green-50 hover:border-green-200 transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button onClick={() => removeFromCart(item.id)}
                          className="text-dark-300 hover:text-red-500 transition-colors self-start p-1">
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t space-y-3 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-dark-500 font-medium">الإجمالي</span>
                    <span className="text-primary-600 font-bold text-xl">{cartTotal.toLocaleString()} ج.م</span>
                  </div>
                  <button
                    onClick={() => { setCartOpen(false); setShowCheckout(true); }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                  >
                    <MessageCircle size={18} />
                    إكمال الطلب عبر واتساب
                  </button>
                  <button onClick={() => setCartOpen(false)}
                    className="w-full text-dark-400 hover:text-dark-700 text-sm transition-colors flex items-center justify-center gap-1">
                    <ChevronLeft size={14} />
                    متابعة التسوق
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  );
}
