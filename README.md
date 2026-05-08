# REV_ORA — قطع غيار السيارات الأوروبية

موقع E-Commerce احترافي لشركة REV_ORA المتخصصة في قطع غيار سيارات Volkswagen · SEAT · Škoda · Audi

---

## 🚀 تشغيل المشروع

### المتطلبات
- Node.js 18+
- npm أو yarn

### خطوات التشغيل

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل بيئة التطوير
npm run dev

# 3. فتح المتصفح على
http://localhost:5173
```

### بناء النسخة النهائية

```bash
npm run build
npm run preview
```

---

## 📦 هيكلة المشروع

```
revora/
├── public/
│   ├── logo.png              ← شعار الشركة
│   └── products.xlsx         ← ملف المنتجات (يُحدَّث تلقائياً)
│
├── src/
│   ├── animations/           ← إعدادات الأنيميشن
│   ├── assets/               ← الأصول الثابتة
│   ├── components/
│   │   ├── 3d/               ← مكونات Three.js
│   │   ├── layout/           ← Navbar · Footer
│   │   ├── sections/         ← Hero · Brands · Featured · WhyUs · CTA
│   │   └── ui/               ← Loader · ProductCard · CartDrawer · CheckoutModal
│   ├── context/
│   │   ├── CartContext.jsx   ← إدارة السلة والمفضلة (LocalStorage)
│   │   └── ProductsContext.jsx ← تحميل وإدارة المنتجات
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx          ← بحث + فلاتر + تصنيف
│   │   ├── ProductDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── Brands.jsx
│   │   ├── Categories.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── excelService.js   ← قراءة ملف Excel تلقائياً
│   ├── utils/                ← أدوات مساعدة
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## ⚙️ المنتجات (Excel)

ضع ملف Excel باسم `products.xlsx` داخل مجلد `public/`.

**الأعمدة المتوقعة:**
| العمود | الوصف |
|--------|--------|
| 0 | رقم تسلسلي |
| 1 | المجموعة |
| 2 | اسم الصنف |
| 3 | السيارة |
| 4 | الوحدة |
| 5 | الكمية |
| 6 | السعر |
| 9 | رابط الصورة |

أي تحديث في الملف ينعكس فوراً على الموقع بعد إعادة تحميل الصفحة.

---

## 🏷️ الماركات والموديلات

| الماركة | الموديلات |
|---------|-----------|
| **Audi** | A4 · A5 · A7 · A8 · Q7 |
| **Volkswagen** | Golf · Jetta · Passat · Tiguan |
| **Škoda** | Rapid · Fabia · Octavia · VRS · Kodiaq |
| **SEAT** | Leon · Ibiza · FR |

---

## 🛒 المميزات

- ✅ قراءة المنتجات تلقائياً من Excel
- ✅ بحث وفلترة وترتيب المنتجات
- ✅ سلة تسوق محفوظة في LocalStorage
- ✅ قائمة مفضلة محفوظة في LocalStorage
- ✅ إكمال الطلب عبر واتساب برسالة منظمة
- ✅ صور Placeholder احترافية للمنتجات بدون صور
- ✅ تصميم Responsive كامل
- ✅ أنيميشنز Three.js + Framer Motion
- ✅ Loader احترافي عند فتح الموقع

---

## 📱 رقم واتساب

```
+20 10 2057 1846
```

---

## 🛠️ التقنيات

- **React 18** + **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Three.js**
- **React Router v6**
- **XLSX** — قراءة ملفات Excel
- **Lucide Icons**

---

*REV_ORA © 2025 — جميع الحقوق محفوظة*
