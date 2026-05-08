import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User, MapPin, Phone } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const GOVERNORATES = [
  'القاهرة','الجيزة','الإسكندرية','الدقهلية','البحيرة','الفيوم','الغربية',
  'الإسماعيلية','المنوفية','المنيا','القليوبية','الوادي الجديد','السويس',
  'أسوان','أسيوط','بني سويف','بورسعيد','دمياط','جنوب سيناء','شمال سيناء',
  'الشرقية','سوهاج','قنا','كفر الشيخ','مطروح','الأقصر','البحر الأحمر'
];

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '', governorate: '', address: '', phone1: '', phone2: '',
    building: '', landmark: '', apartment: '', floor: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'الاسم مطلوب';
    if (!form.governorate) e.governorate = 'اختر المحافظة';
    if (!form.address.trim()) e.address = 'العنوان مطلوب';
    if (!form.phone1.trim()) e.phone1 = 'رقم الهاتف مطلوب';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const orderLines = cart.map(i =>
      `• ${i.name}\n  الكمية: ${i.qty} | السعر: ${i.price.toLocaleString()} ج.م | الإجمالي: ${(i.price * i.qty).toLocaleString()} ج.م`
    ).join('\n\n');

    const message = `
🧾 *طلب جديد من REV_ORA*
━━━━━━━━━━━━━━━━━━
📦 *تفاصيل الطلب:*

${orderLines}

💰 *الإجمالي الكلي: ${cartTotal.toLocaleString()} ج.م*

━━━━━━━━━━━━━━━━━━
📍 *بيانات العميل:*

👤 الاسم: ${form.name}

🏙️ المحافظة: ${form.governorate}

🏠 العنوان بالتفصيل: ${form.address}

📱 هاتف 1: ${form.phone1}
${form.phone2 ? `\n📱 هاتف 2: ${form.phone2}\n` : ''}${form.building ? `\n🏢 رقم البرج: ${form.building}\n` : ''}${form.landmark ? `\n📌 علامة مميزة: ${form.landmark}\n` : ''}${form.apartment ? `\n🚪 الشقة: ${form.apartment}\n` : ''}${form.floor ? `\n⬆️ الدور: ${form.floor}\n` : ''}
━━━━━━━━━━━━━━━━━━
    `.trim();

    const url = `https://wa.me/201020571846?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    clearCart();
    onClose();
  };

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const Field = ({ label, field, placeholder, type = 'text', required }) => (
    <div>
      <label className="text-sm font-semibold text-dark-700 mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        dir={type === 'tel' ? 'ltr' : 'rtl'}
        value={form[field]}
        onChange={e => set(field, e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-right ${errors[field] ? 'border-red-400 bg-red-50' : 'border-dark-200 bg-white hover:border-dark-300'}`}
      />
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} />

          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl">
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle size={22} />
                  <h2 className="font-bold text-lg">إكمال الطلب عبر واتساب</h2>
                </div>
                <button onClick={onClose} className="text-white/80 hover:text-white p-1">
                  <X size={22} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Order Summary */}
                <div className="bg-dark-50 rounded-xl p-4 space-y-2">
                  <h3 className="font-bold text-dark-800 text-sm flex items-center gap-2">
                    <span>🧾</span> ملخص الطلب
                  </h3>
                  {cart.map(i => (
                    <div key={i.id} className="flex justify-between text-sm">
                      <span className="text-dark-600 truncate flex-1 ml-3">{i.name} × {i.qty}</span>
                      <span className="text-dark-800 font-medium flex-shrink-0">{(i.price * i.qty).toLocaleString()} ج.م</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-primary-600 border-t pt-2 mt-2">
                    <span>الإجمالي</span>
                    <span>{cartTotal.toLocaleString()} ج.م</span>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-3">
                  <h3 className="font-bold text-dark-800 text-sm flex items-center gap-2">
                    <User size={16} className="text-primary-600" /> بيانات التوصيل
                  </h3>
                  <Field label="الاسم" field="name" placeholder="الاسم بالكامل" required />
                  <div>
                    <label className="text-sm font-semibold text-dark-700 mb-1 block">
                      المحافظة <span className="text-red-500">*</span>
                    </label>
                    <select
                      dir="rtl"
                      value={form.governorate}
                      onChange={e => set('governorate', e.target.value)}
                      className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-right ${errors.governorate ? 'border-red-400 bg-red-50' : 'border-dark-200 bg-white'}`}
                    >
                      <option value="">اختر المحافظة</option>
                      {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
                  </div>
                  <Field label="العنوان بالتفصيل" field="address" placeholder="الشارع والحي والمنطقة" required />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="هاتف 1" field="phone1" placeholder="01xxxxxxxxx" type="tel" required />
                    <Field label="هاتف 2" field="phone2" placeholder="01xxxxxxxxx (اختياري)" type="tel" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="رقم البرج" field="building" placeholder="رقم" />
                    <Field label="الشقة" field="apartment" placeholder="رقم" />
                    <Field label="الدور" field="floor" placeholder="رقم" />
                  </div>
                  <Field label="علامة مميزة" field="landmark" placeholder="قريب من ..." />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 text-base"
                >
                  <MessageCircle size={20} />
                  إرسال الطلب عبر واتساب
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
