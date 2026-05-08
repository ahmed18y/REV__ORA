import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ui/ProductCard';

const SORT_OPTIONS = [
  { value: 'default', label: 'الافتراضي' },
  { value: 'price-asc', label: 'السعر: الأقل' },
  { value: 'price-desc', label: 'السعر: الأعلى' },
  { value: 'name-asc', label: 'الاسم: أ-ي' },
];

export default function Shop() {
  const { products, brands, categories, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const filtered = useMemo(() => {
    let list = [...products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.car.toLowerCase().includes(q)
      );
    }
    if (selectedBrand) list = list.filter(p => p.brand === selectedBrand);
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name, 'ar'));

    return list;
  }, [products, query, selectedBrand, selectedCategory, sort]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const clearFilters = () => { setQuery(''); setSelectedBrand(''); setSelectedCategory(''); setSort('default'); };
  const activeFiltersCount = [selectedBrand, selectedCategory, query].filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark-900 mb-2">المتجر</h1>
          <p className="text-dark-400">
            {loading ? 'جاري التحميل...' : `${filtered.length} منتج متوفر`}
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400" size={18} />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="ابحث بالاسم أو SKU أو الماركة أو التصنيف..."
              className="w-full bg-white border border-dark-200 rounded-xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-700">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-white border border-dark-200 rounded-xl px-4 py-3 text-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-primary-400 min-w-[160px]"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" size={16} />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all ${showFilters ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-dark-700 border-dark-200 hover:border-primary-400'}`}
          >
            <SlidersHorizontal size={16} />
            فلترة
            {activeFiltersCount > 0 && <span className="bg-white text-primary-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{activeFiltersCount}</span>}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-dark-100 p-5 mb-6 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Brand */}
              <div className="flex-1">
                <p className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3">الماركة</p>
                <div className="flex flex-wrap gap-2">
                  {['', ...brands].map(b => (
                    <button key={b || 'all'}
                      onClick={() => { setSelectedBrand(b); setPage(1); }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedBrand === b ? 'bg-primary-600 text-white' : 'bg-dark-50 text-dark-600 hover:bg-dark-100'}`}
                    >
                      {b || 'الكل'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="flex-1">
                <p className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-3">التصنيف</p>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  <button onClick={() => { setSelectedCategory(''); setPage(1); }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${!selectedCategory ? 'bg-primary-600 text-white' : 'bg-dark-50 text-dark-600 hover:bg-dark-100'}`}>
                    الكل
                  </button>
                  {categories.map(c => (
                    <button key={c}
                      onClick={() => { setSelectedCategory(c); setPage(1); }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === c ? 'bg-primary-600 text-white' : 'bg-dark-50 text-dark-600 hover:bg-dark-100'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {activeFiltersCount > 0 && (
                <button onClick={clearFilters}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-semibold self-start">
                  <X size={14} /> مسح الفلاتر
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="h-44 shimmer" />
                <div className="p-4 space-y-2">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-4 shimmer rounded w-1/2" />
                  <div className="h-8 shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Search size={48} className="text-dark-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark-700 mb-2">لم يُعثر على نتائج</h3>
            <p className="text-dark-400 mb-4">جرب تغيير كلمات البحث أو الفلاتر</p>
            <button onClick={clearFilters} className="btn-primary">مسح الفلاتر</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {paginated.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-10">
                <button onClick={() => setPage(p => p + 1)}
                  className="btn-primary px-10">
                  عرض المزيد ({filtered.length - paginated.length} متبقي)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
