import { motion } from 'framer-motion';
import { Shield, Zap, Truck, HeadphonesIcon, Award } from 'lucide-react';

const FEATURES = [
  { icon: Shield, title: 'جودة مضمونة', desc: 'جميع قطع الغيار من مصادر موثوقة ومعتمدة', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Zap, title: 'خدمة سريعة', desc: 'استجابة فورية وتوصيل سريع لجميع المحافظات', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Truck, title: 'توصيل لكل مصر', desc: 'نوصل لجميع أنحاء الجمهورية', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: HeadphonesIcon, title: 'دعم فني متخصص', desc: 'فريق متخصص لمساعدتك في اختيار القطعة المناسبة', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Award, title: 'خبرة متخصصة', desc: 'خبرة طويلة في قطع غيار السيارات الأوروبية', color: 'text-red-500', bg: 'bg-red-50' },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-50 rounded-full opacity-50 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-50 rounded-full opacity-50 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-red-500 text-sm tracking-[0.3em] uppercase font-medium mb-3">لماذا REV_ORA</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark-900 mb-4">
            الثقة والجودة <span className="text-primary-600">في كل قطعة</span>
          </h2>
          <p className="text-dark-400 max-w-lg mx-auto">
            نحن نؤمن أن قطعة الغيار الصحيحة تُحدث فرقاً حقيقياً. لهذا نحرص على أعلى معايير الجودة.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-2xl border border-dark-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={f.color} size={22} />
              </div>
              <h3 className="text-dark-900 font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
