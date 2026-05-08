import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-dark-900">
      {/* Animated bg */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #1a0505 50%, #0a0a14 100%)' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-60" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            متاحون الآن للرد على استفساراتك
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            هل تبحث عن قطعة <span className="text-red-500">معينة؟</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            تواصل معنا الآن عبر واتساب وسيساعدك فريقنا في إيجاد القطعة المناسبة بأفضل سعر.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="https://wa.me/201020571846?text=مرحباً، أحتاج مساعدة في إيجاد قطعة غيار"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-green-900/30"
            >
              <MessageCircle size={20} />
              تواصل عبر واتساب
            </motion.a>
            <motion.a
              href="tel:+201020571846"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              <Phone size={20} />
              اتصل بنا
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
