import { motion } from 'framer-motion';
import { Shield, Zap, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-dark-50 pt-24 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark-900 via-red-950/30 to-dark-900 py-20 mb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <img src="/logo.png" alt="REV_ORA" className="h-20 mx-auto mb-6" style={{ mixBlendMode: 'screen' }} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">من نحن</h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              REV_ORA — شركة متخصصة في قطع غيار السيارات الأوروبية عالية الجودة
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold text-dark-900 mb-4">قصتنا</h2>
            <p className="text-dark-500 leading-relaxed mb-4">
              انطلقنا بهدف واضح: توفير قطع غيار أوروبية عالية الجودة بأسعار في متناول الجميع.
              نتخصص في سيارات Volkswagen وSEAT وSkoda وAudi — المجموعة الأوروبية الأشهر في مصر.
            </p>
            <p className="text-dark-500 leading-relaxed mb-4">
              نؤمن أن كل سيارة تستحق قطع غيار مضمونة، وأن السلامة على الطريق تبدأ من اختيار القطعة الصحيحة.
              لذلك نحرص على توفير أفضل الماركات من مصادر موثوقة، مع دعم فني متخصص لمساعدتك في اختيار ما يناسب سيارتك.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { num: '188+', label: 'منتج' },
                { num: '4', label: 'ماركات' },
                { num: '100%', label: 'ضمان جودة' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-extrabold text-primary-600">{s.num}</p>
                  <p className="text-dark-400 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-dark-900 to-red-950/30 rounded-3xl p-10 text-white">
            <p className="text-white/60 text-lg leading-relaxed italic">
              "نحن لسنا مجرد متجر لقطع الغيار. نحن شركاء في رحلتك على الطريق. كل قطعة نبيعها تمثل التزامنا بسلامتك وراحتك."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <Zap size={18} className="text-red-400" />
              </div>
              <div>
                <p className="font-bold text-white">فريق REV_ORA</p>
                <p className="text-white/40 text-xs">متخصصو قطع الغيار</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'الجودة أولاً', desc: 'لا نساوم على الجودة في أي منتج', color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Zap, title: 'السرعة والكفاءة', desc: 'استجابة سريعة وتوصيل في أقل وقت', color: 'text-yellow-500', bg: 'bg-yellow-50' },
            { icon: Award, title: 'الخبرة التخصصية', desc: 'متخصصون في السيارات الأوروبية فقط', color: 'text-red-500', bg: 'bg-red-50' },
            { icon: Users, title: 'خدمة العميل', desc: 'نهتم بكل عميل كأولوية قصوى', color: 'text-green-500', bg: 'bg-green-50' },
          ].map((v, i) => (
            <motion.div key={v.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center border border-dark-100 hover:shadow-lg transition-all">
              <div className={`w-12 h-12 ${v.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <v.icon className={v.color} size={22} />
              </div>
              <h3 className="font-bold text-dark-900 mb-2">{v.title}</h3>
              <p className="text-dark-400 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
