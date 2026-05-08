import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/excelService';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const brands = ['AUDI', 'VW', 'SKODA', 'SEAT'];
  const categories = [...new Set(products.map(p => p.category))].sort();

  const getByBrand = (brand) => products.filter(p => p.brand === brand);
  const getByCategory = (cat) => products.filter(p => p.category === cat);
  const getById = (id) => products.find(p => p.id === id || p.sku === id);

  const search = (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.car.toLowerCase().includes(q)
    );
  };

  return (
    <ProductsContext.Provider value={{
      products, loading, error,
      brands, categories,
      getByBrand, getByCategory, getById, search
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
