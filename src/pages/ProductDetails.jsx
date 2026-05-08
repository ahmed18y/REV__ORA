import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ArrowRight, Package, Tag, Hash, Layers, CheckCircle, XCircle } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, getById } = useProducts();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const product = getById(id);
  const fav = isFavorite(product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <Package size={64} className="text-dark-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark-700 mb-2">المنتج غير موجود</h2>
          <Link to="/shop" className="btn-primary mt-4 inline-block">العودة للمتجر</Link>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-dark-400 mb-8">
          <Link to="/" className="hover:text-primary-600 transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary-600 transition-colors">المتجر</Link>
          <span>/</span>
          <span className="text-dark-700 truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl aspect-square flex items-center justify-center p-8"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                onError={e => { e.target.style.display='none'; }}
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-dark-200">
                <img src="/logo.png" alt="REV_ORA" className="h-20 w-auto opacity-20" />
                <Package size={64} />
                <p className="text-sm">{product.category}</p>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Badge */}
            {product.brand !== 'عام' && (
              <span className="inline-block bg-dark-900 text-white text-sm font-bold px-3 py-1 rounded-full">
                {product.brand}
              </span>
            )}

            <h1 className="text-3xl font-extrabold text-dark-900 leading-snug">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-primary-600">{product.price.toLocaleString()}</span>
              <span className="text-dark-400 text-lg">ج.م</span>
            </div>

            {/* Availability */}
            <div className={`flex items-center gap-2 ${product.available ? 'text-green-600' : 'text-red-500'}`}>
              {product.available ? <CheckCircle size={18} /> : <XCircle size={18} />}
              <span className="font-semibold text-sm">{product.available ? 'متوفر في المخزون' : 'غير متوفر حالياً'}</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Hash, label: 'كود المنتج', value: product.sku },
                { icon: Tag, label: 'التصنيف', value: product.category },
                { icon: Layers, label: 'الماركة', value: product.brand },
                ...(product.car ? [{ icon: Package, label: 'السيارة', value: product.car }] : []),
              ].map(d => (
                <div key={d.label} className="bg-dark-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-dark-400 text-xs mb-1">
                    <d.icon size={12} />
                    {d.label}
                  </div>
                  <p className="text-dark-800 font-semibold text-sm">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => product.available && addToCart(product)}
                disabled={!product.available}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                  product.available
                    ? 'bg-primary-600 hover:bg-primary-700 text-white transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-200'
                    : 'bg-dark-100 text-dark-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                {product.available ? 'أضف للسلة' : 'غير متوفر'}
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  fav ? 'bg-red-50 border-red-400 text-red-500' : 'border-dark-200 text-dark-400 hover:border-red-300 hover:text-red-400'
                }`}
              >
                <Heart size={22} fill={fav ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* WhatsApp inquiry */}
            <a
              href={`https://wa.me/201020571846?text=مرحباً، أريد الاستفسار عن: ${product.name} (${product.sku})`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 font-semibold rounded-xl transition-colors text-sm"
            >
              استفسار عبر واتساب
            </a>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-extrabold text-dark-900 mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`} onClick={() => window.scrollTo(0,0)}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="h-36 bg-dark-50 flex items-center justify-center p-3">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
                      ) : <Package size={32} className="text-dark-200" />}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-dark-400 line-clamp-2 mb-1">{p.name}</p>
                      <p className="text-primary-600 font-bold text-sm">{p.price.toLocaleString()} ج.م</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
