/**
 * Excel Service - Reads and parses products from Excel file
 * Any update to products.xlsx is automatically reflected on the site
 */
import * as XLSX from 'xlsx';

// Brand detection based on product name and car field
export function detectBrand(name, car, category) {
  const text = `${name} ${car} ${category}`.toLowerCase();

  // Audi models
  if (/\ba4\b|\ba5\b|\ba7\b|\ba8\b|\bq7\b|\baudي\b|\baudi\b/i.test(text)) return 'AUDI';

  // Skoda models
  if (/\brapid\b|\brابيد\b|\bfabia\b|\bفابيا\b|\boctavia\b|\baوكتافيا\b|\bvrs\b|\bkodiaq\b|\bكودياك\b|\bskoda\b|\bسكودا\b/i.test(text)) return 'SKODA';

  // SEAT models
  if (/\bleon\b|\bليون\b|\bibiza\b|\bابيزا\b|\bإبيزا\b|\b\bfr\b|\bseat\b|\bسيات\b/i.test(text)) return 'SEAT';

  // VW models
  if (/\bgolf\b|\bجولف\b|\bjetta\b|\bجيتا\b|\bpassat\b|\bبسات\b|\btiguan\b|\bتيجوان\b|\bvw\b|\bvolkswagen\b/i.test(text)) return 'VW';

  // Check for B6 (Passat B6) → VW/Audi shared
  if (/\bb6\b/i.test(text)) return 'VW';

  return 'عام';
}

// Category detection based on product name
export function detectCategory(name) {
  const n = name.toLowerCase();

  if (/فلتر زيت|oil filter/i.test(n)) return 'فلاتر زيت';
  if (/فلتر هوا|air filter/i.test(n)) return 'فلاتر هواء';
  if (/فلتر بنزين|fuel filter/i.test(n)) return 'فلاتر بنزين';
  if (/فلتر تكييف|cabin filter/i.test(n)) return 'فلاتر تكييف';
  if (/فلتر فتيس/i.test(n)) return 'فلاتر فتيس';
  if (/تيل|icer|tomix|فرامل/i.test(n)) return 'فرامل';
  if (/مساعد|مساعدين/i.test(n)) return 'مساعدين';
  if (/كاتينة|سير كاتينة/i.test(n)) return 'كاتينة';
  if (/طرمبة مياه|water pump/i.test(n)) return 'تبريد';
  if (/طرمبة بنزين|fuel pump/i.test(n)) return 'تغذية وقود';
  if (/حساس|sensor/i.test(n)) return 'حساسات';
  if (/بوجيهات|spark plug/i.test(n)) return 'إشعال';
  if (/سلك بوجيهات/i.test(n)) return 'إشعال';
  if (/كوبلن|cv joint/i.test(n)) return 'ناقل الحركة';
  if (/فتيس|gearbox|dsg/i.test(n)) return 'فتيس';
  if (/دينامو|alternator/i.test(n)) return 'كهرباء';
  if (/بلاور|مروحة|radiator fan/i.test(n)) return 'تكييف';
  if (/جراب|cover/i.test(n)) return 'داخلي';
  if (/درج|كونسولة/i.test(n)) return 'داخلي';
  if (/بارات/i.test(n)) return 'داخلي';
  if (/طقم مساعد|spring/i.test(n)) return 'تعليق';
  if (/ميزان|stabilizer/i.test(n)) return 'تعليق';
  if (/بيض مقص|ball joint/i.test(n)) return 'تعليق';
  if (/بطاحة|bushing/i.test(n)) return 'تعليق';
  if (/صره|hub/i.test(n)) return 'تعليق';
  if (/شداد/i.test(n)) return 'تعليق';
  if (/مبخر|موبينة|piston/i.test(n)) return 'محرك';
  if (/كرتيرة|engine block/i.test(n)) return 'محرك';
  if (/شجرة مياه|coolant pipe/i.test(n)) return 'تبريد';
  if (/كولر|cooler/i.test(n)) return 'تبريد';
  if (/خرطوم|hose/i.test(n)) return 'خراطيم';
  if (/سير دينامو|belt/i.test(n)) return 'سيور';
  if (/ريش مسحات|wiper/i.test(n)) return 'خارجي';
  if (/اريال/i.test(n)) return 'خارجي';
  if (/عاكس|reflector/i.test(n)) return 'إضاءة';
  if (/فانوس|lamp/i.test(n)) return 'إضاءة';
  if (/كلاكس/i.test(n)) return 'كهرباء';
  if (/logo|شعار/i.test(n)) return 'إكسسوارات';

  return 'قطع متنوعة';
}

/**
 * Fetches and parses the Excel file from public folder
 */
export async function fetchProducts() {
  try {
    const response = await fetch('/products.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

    const products = [];
    let skuCounter = 1;

    // Find the header row (row with رقم, المجموعة, اسم الصنف, etc.)
    let headerRowIndex = -1;
    for (let i = 0; i < rawData.length; i++) {
      const row = rawData[i];
      if (row.some(cell => String(cell).includes('اسم الصنف') || String(cell).includes('المجموعة'))) {
        headerRowIndex = i;
        break;
      }
    }

    if (headerRowIndex === -1) headerRowIndex = 2; // fallback

    // Map columns: رقم, المجموعة, اسم الصنف, السيارة, الوحدة, الكمية, تكلفة الوحدة, إجمالي, تاريخ, رابط الصورة
    // Based on extract: cols are [id, group, name, car, unit, qty, price, total, date, imageUrl]

    for (let i = headerRowIndex + 1; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || row.length === 0) continue;

      const id = row[0];
      const group = String(row[1] || '').trim();
      const name = String(row[2] || '').trim();
      const car = String(row[3] || '').trim();
      const unit = String(row[4] || '').trim();
      const quantity = parseInt(row[5]) || 0;
      const price = parseFloat(row[6]) || 0;
      const imageUrl = String(row[9] || '').trim();

      // Skip empty rows, totals, and header-like rows
      if (!name || name.length < 2) continue;
      if (name.includes('إجمالي') || name.includes('الإجمالي')) continue;
      if (price === 0 && !imageUrl) continue;

      const brand = detectBrand(name, car, group);
      const category = detectCategory(name);

      products.push({
        id: id ? String(id) : `SKU-${skuCounter}`,
        sku: id ? `REV-${String(id).padStart(4, '0')}` : `REV-${String(skuCounter).padStart(4, '0')}`,
        name,
        group,
        car,
        unit,
        quantity,
        price,
        imageUrl: imageUrl || '',
        brand,
        category,
        available: quantity > 0,
      });
      skuCounter++;
    }

    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    return getFallbackProducts();
  }
}

// Fallback products in case Excel fails to load
function getFallbackProducts() {
  return [
    {
      id: '1', sku: 'REV-0001', name: 'طرمبة ماية 2000 تربو avortex',
      group: 'عام', car: '', unit: 'عام', quantity: 1, price: 3000,
      imageUrl: 'https://res.cloudinary.com/dngruuyec/image/upload/v1777555306/%D8%B7%D8%B1%D9%85%D8%A8%D8%A9_%D9%85%D8%A7%D9%8A%D8%A9_2000_%D8%AA%D8%B1%D8%A8%D9%88_avortex-Photoroom_sp6p4h.png',
      brand: 'عام', category: 'تبريد', available: true
    },
    {
      id: '24', sku: 'REV-0024', name: 'فلتر هوا A5',
      group: 'عام', car: 'A5', unit: 'عام', quantity: 10, price: 300,
      imageUrl: 'https://res.cloudinary.com/dngruuyec/image/upload/v1777555292/%D9%81%D9%84%D8%AA%D8%B1_%D9%87%D9%88%D8%A7_%D8%B3%D9%83%D9%88%D8%AF%D8%A7_%D8%A7%D9%88%D9%83%D8%AA%D8%A7%D9%81%D9%8A%D8%A7_a5_1600_%D9%81%D8%A7%D9%86%D8%AA%D8%A7%D8%B2%D9%8A%D8%A7_1600_%D8%AC%D9%8A%D8%AA%D8%A7_1600-Photoroom_ccfszd.png',
      brand: 'AUDI', category: 'فلاتر هواء', available: true
    },
  ];
}
