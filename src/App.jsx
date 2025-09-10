// src/App.jsx
import { useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Copy, Send } from "lucide-react";

// ===== إعدادات المتجر =====
const BRAND_NAME = "Card claud";

// محفظة USDT ERC20 فقط
const USDT_ADDRESS = "0xD8b616C9842AA8208e000000000000000000000"; // عدّلها لمعرفك الحقيقي

const SITE_CONTACT = {
  email: "cardclaud.temp@mailinator.com",
};

// ===== أدوات مساعدة =====
function SectionTitle({ title, subtitle }) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle ? <p className="text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

function copy(text) {
  navigator.clipboard.writeText(text);
}

// ===== الواجهة العلوية =====
function Navbar({ open, setOpen }) {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <b>{BRAND_NAME}</b>
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 rounded-xl border"
        >
          السلة
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden py-16 text-center bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          متجر بطاقات رقمي
        </h1>
        <p className="text-slate-600">
          ادفع USDT على شبكة ERC20 واستلم طلبك عبر البريد.
        </p>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      <SectionTitle title="من نحن" subtitle="متجر بسيط وسريع للبطاقات الرقمية" />
      <p className="text-slate-700">
        هذا المتجر تجريبي لغرض التعلم. الدفع عبر USDT–ERC20 فقط.
      </p>
    </section>
  );
}

function ProductCard({ p, onBuy }) {
  return (
    <div className="p-4 border rounded-2xl bg-white flex flex-col justify-between">
      <div>
        <h3 className="font-semibold">{p.sku}</h3>
        <p className="text-slate-600 text-sm mt-1">{p.desc}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <b>{p.amount} USDT</b>
        <button
          onClick={() => onBuy(p)}
          className="px-3 py-1 rounded-xl bg-black text-white"
        >
          اشتري الآن
        </button>
      </div>
    </div>
  );
}

function CheckoutModal({ open, onClose, item }) {
  if (!open || !item) return null;

  const orderId = useMemo(
    () => Math.random().toString(36).slice(2, 8).toUpperCase(),
    [item]
  );

  const formAction = `https://formsubmit.co/${SITE_CONTACT.email}`;
  const [txid, setTxid] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">إتمام الطلب #{orderId}</h3>
          <button onClick={onClose} className="text-slate-600">إغلاق</button>
        </div>

        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>رقم الطلب</span><span className="font-mono">{orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>المنتج</span><span>{item.sku}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>طريقة الدفع</span><span>USDT (ERC20)</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm">
            <div className="mb-1">
              أرسل المبلغ: <b>{item.amount} USDT</b>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="truncate max-w-[70%] font-mono"
                title={USDT_ADDRESS}
              >
                {USDT_ADDRESS}
              </span>
              <button
                onClick={() => copy(USDT_ADDRESS)}
                className="px-2 py-1 rounded-lg border inline-flex items-center gap-1"
              >
                <Copy size={16} /> نسخ
              </button>
            </div>
            <div className="mt-3">
              <div className="p-2 border rounded-lg inline-block bg-white">
                <QRCodeCanvas value={USDT_ADDRESS} size={160} includeMargin />
              </div>
            </div>
          </div>

          {/* نموذج تأكيد الدفع وإرسال البيانات */}
          <form action={formAction} method="POST" className="space-y-3">
            {/* إعدادات FormSubmit */}
            <input type="hidden" name="_subject" value={`طلب جديد ${orderId}`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="/" />
            {/* رسالة تلقائية للزبون */}
            <input
              type="hidden"
              name="_autoresponse"
              value={`استلمنا طلبك ${orderId}. سنراجع التحويل ونتواصل معك قريبًا.`}
            />

            {/* بيانات الطلب */}
            <input type="hidden" name="order_id" value={orderId} />
            <input type="hidden" name="sku" value={item.sku} />
            <input type="hidden" name="amount_usdt" value={item.amount} />
            <input type="hidden" name="network" value="ERC20" />
            <input type="hidden" name="store_wallet" value={USDT_ADDRESS} />

            <div className="grid md:grid-cols-2 gap-3">
              <input
                required
                type="email"
                placeholder="بريدك الإلكتروني"
                className="border rounded-xl px-3 h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <input
                required
                placeholder="رقم الهاتف مع مفتاح الدولة"
                className="border rounded-xl px-3 h-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
              />
            </div>

            <input
              required
              placeholder="TxID / Hash التحويل"
              className="border rounded-xl px-3 h-10 w-full"
              value={txid}
              onChange={(e) => setTxid(e.target.value)}
              name="txid"
            />

            <div className="text-xs text-slate-600">
              بعد الإرسال سيصلك بريد تأكيد تلقائي.
            </div>

            <button
              type="submit"
              className="rounded-2xl w-full h-10 bg-black text-white inline-flex items-center justify-center gap-2"
            >
              <Send size={16} /> إرسال الطلب
            </button>
          </form>
        </div>

        <div className="border-t pt-3 text-sm text-slate-600">
          <p>
            التسليم يتم يدويًا بعد تأكيد الحوالة على البلوكتشين. عادةً خلال
            30–120 دقيقة.
          </p>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const items = useMemo(
    () => [
      { sku: "Apple Gift 10", amount: 10, desc: "بطاقة آبل 10$" },
      { sku: "PlayStation 20", amount: 20, desc: "بطاقة بلايستيشن 20$" },
      { sku: "Netflix 25", amount: 25, desc: "بطاقة نتفلكس 25$" },
    ],
    []
  );

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const onBuy = (p) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <section id="products" className="container mx-auto px-4 py-10 space-y-5">
      <SectionTitle title="المنتجات" subtitle="اختر المنتج ثم ادفع بالـ USDT" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((p) => (
          <ProductCard key={p.sku} p={p} onBuy={onBuy} />
        ))}
      </div>

      <CheckoutModal open={open} onClose={() => setOpen(false)} item={selected} />
    </section>
  );
}

function HowToPay() {
  return (
    <section id="how" className="container mx-auto px-4 py-10 space-y-3">
      <SectionTitle title="طريقة الدفع" />
      <ol className="list-decimal ps-6 space-y-2 text-slate-700">
        <li>اختر المنتج واضغط “اشتري الآن”.</li>
        <li>حوّل المبلغ إلى عنوان USDT الظاهر أو عبر QR.</li>
        <li>أرسل رقم التحويل (TxID/Hash) مع بريدك في النموذج.</li>
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="container mx-auto px-4 py-10">
      <SectionTitle title="تواصل معنا" />
      <p className="text-slate-700">
        البريد: <a className="underline" href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
      </p>
    </section>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const dir = "rtl";

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar open={open} setOpen={setOpen} />
      <main>
        <Hero />
        <About />
        <Products />
        <HowToPay />
        <Contact />
      </main>
      <footer className="py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} {BRAND_NAME}
      </footer>
    </div>
  );
}
