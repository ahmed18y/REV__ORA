import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const fav = isFavorite(product.id);

  const brandColor = {
    AUDI: 'from-red-100 to-red-50',
    VW: 'from-blue-100 to-blue-50',
    SKODA: 'from-green-100 to-green-50',
    SEAT: 'from-orange-100 to-orange-50',
    عام: 'from-gray-100 to-gray-50',
  }[product.brand] || 'from-gray-100 to-gray-50';

  return (
    <motion.div
      className="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-dark-100/50 group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
    >
      {/* Image Area */}
      <div className={`relative h-48 bg-gradient-to-br ${brandColor} overflow-hidden`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
          />
        ) : null}

        {/* Placeholder */}
        <div className={`absolute inset-0 flex-col items-center justify-center gap-2 ${product.imageUrl ? 'hidden' : 'flex'}`}>
          <img src="/logo.png" alt="REV_ORA" className="h-10 w-auto opacity-30" />
          <Package size={32} className="text-dark-300" />
          <span className="text-dark-300 text-xs">{product.category}</span>
        </div>

        {/* Brand Badge */}
        {product.brand !== 'عام' && (
          <div className="absolute top-2 right-2 bg-dark-900/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg">
            {product.brand}
          </div>
        )}

        {/* Availability */}
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-dark-800 text-white text-sm font-bold px-4 py-2 rounded-full">غير متوفر حالياً</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => toggleFavorite(product)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all ${fav ? 'bg-red-500 text-white' : 'bg-white text-dark-500 hover:text-red-500'}`}
          >
            <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
          </button>
          <Link to={`/product/${product.id}`}
            className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg text-dark-500 hover:text-primary-600 transition-colors">
            <Eye size={16} />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-dark-400 mb-1 font-medium">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-dark-900 font-bold text-sm leading-snug line-clamp-2 hover:text-primary-600 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {product.car && (
          <p className="text-xs text-dark-400 mt-1 truncate">{product.car}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-primary-600 font-extrabold text-lg">{product.price.toLocaleString()}</span>
            <span className="text-dark-400 text-xs mr-1">ج.م</span>
          </div>
          <button
            onClick={() => product.available && addToCart(product)}
            disabled={!product.available}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              product.available
                ? 'bg-primary-600 hover:bg-primary-700 text-white transform hover:scale-105 active:scale-95'
                : 'bg-dark-100 text-dark-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={14} />
            {product.available ? 'أضف للسلة' : 'غير متوفر'}
          </button>
        </div>

        {/* SKU */}
        <p className="text-dark-300 text-xs mt-2 font-mono">{product.sku}</p>
      </div>
    </motion.div>
  );
}
