import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart } = useCart();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500" size={28} />
          <h1 className="text-3xl font-extrabold text-dark-900">المفضلة</h1>
          <span className="bg-primary-100 text-primary-700 font-bold text-sm px-3 py-1 rounded-full">{favorites.length}</span>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={64} className="text-dark-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark-700 mb-2">قائمة المفضلة فارغة</h3>
            <p className="text-dark-400 mb-6">أضف المنتجات التي تعجبك لتجدها هنا بسهولة</p>
            <Link to="/shop" className="btn-primary">تصفح المتجر</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </motion.div>
  );
}
