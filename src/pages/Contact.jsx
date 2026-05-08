import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleWhatsApp = () => {
    if (!form.name || !form.message) return;
    const msg = `مرحباً، اسمي ${form.name}${form.phone ? `\nرقم هاتفي: ${form.phone}` : ''}\n\nرسالتي: ${form.message}`;
    window.open(`https://wa.me/201020571846?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-red-500 text-sm tracking-[0.3em] uppercase font-medium mb-3">تواصل معنا</p>
          <h1 className="text-4xl font-extrabold text-dark-900 mb-3">نحن هنا لمساعدتك</h1>
          <p className="text-dark-400">أي استفسار عن قطعة غيار أو طلب خاص، نحن جاهزون</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {[
              { icon: MessageCircle, title: 'واتساب', value: '+20 10 2057 1846', desc: 'أسرع طريقة للتواصل', color: 'bg-green-50 text-green-500', href: 'https://wa.me/201020571846' },
              { icon: Phone, title: 'هاتف', value: '+20 10 2057 1846', desc: 'متاح خلال ساعات العمل', color: 'bg-blue-50 text-blue-500', href: 'tel:+201020571846' },
              { icon: MapPin, title: 'الموقع', value: 'مصر', desc: 'توصيل لجميع المحافظات', color: 'bg-red-50 text-red-500', href: null },
              { icon: Clock, title: 'ساعات العمل', value: 'السبت - الخميس', desc: '9 صباحاً - 9 مساءً', color: 'bg-purple-50 text-purple-500', href: null },
            ].map(c => (
              <motion.div key={c.title} whileHover={{ x: 5 }}
                className={`flex items-center gap-4 p-5 bg-white rounded-2xl border border-dark-100 hover:shadow-md transition-all ${c.href ? 'cursor-pointer' : ''}`}
                onClick={() => c.href && window.open(c.href, '_blank')}
              >
                <div className={`w-12 h-12 ${c.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <c.icon size={22} />
                </div>
                <div>
                  <p className="text-xs text-dark-400 mb-0.5">{c.title}</p>
                  <p className="font-bold text-dark-900">{c.value}</p>
                  <p className="text-dark-400 text-xs">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Message Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-7 border border-dark-100 shadow-xl">
            <h2 className="text-xl font-extrabold text-dark-900 mb-6">أرسل رسالة</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-dark-700 mb-1 block">الاسم *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="اسمك"
                  className="w-full border border-dark-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-sm font-semibold text-dark-700 mb-1 block">رقم الهاتف</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="01xxxxxxxxx" type="tel"
                  className="w-full border border-dark-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
              </div>
              <div>
                <label className="text-sm font-semibold text-dark-700 mb-1 block">رسالتك *</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="اكتب استفسارك هنا..." rows={4}
                  className="w-full border border-dark-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" />
              </div>
              <button onClick={handleWhatsApp}
                disabled={!form.name || !form.message}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-dark-200 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all">
                <MessageCircle size={18} />
                إرسال عبر واتساب
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
