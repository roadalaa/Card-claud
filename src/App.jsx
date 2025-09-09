import { useState, useMemo } from "react"; // مكوّنات خفيفة بديلة بدل shadcn/ui لسهولة النشر السريع function Button({ className = "", variant = "default", size = "md", ...props }: any) { const base = "inline-flex items-center justify-center font-medium transition border disabled:opacity-60 disabled:pointer-events-none"; const sizes: any = { sm: "px-3 py-1.5 text-sm rounded-xl", md: "px-4 py-2 rounded-xl", lg: "px-5 py-3 text-base rounded-2xl" }; const variants: any = { default: "bg-sky-600 text-white border-sky-600 hover:opacity-90", secondary: "bg-white text-slate-900 border-slate-300 hover:bg-slate-50", outline: "bg-white text-slate-900 border-slate-300 hover:bg-slate-50" }; return <button className={${base} ${sizes[size]} ${variants[variant]} ${className}} {...props} />; } function Card({ className = "", ...props }: any) { return <div className={bg-white border rounded-2xl ${className}} {...props} />; } function CardContent({ className = "", ...props }: any) { return <div className={p-4 ${className}} {...props} />; } function Input({ className = "", ...props }: any) { return <input className={w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 ${className}} {...props} />; } import { Mail, Phone, Globe, Send, Menu, X, Check, Copy, Wallet } from "lucide-react"; import { motion } from "framer-motion"; import { QRCodeCanvas } from "qrcode.react";

// ===== إعدادات المتجر ===== const BRAND_NAME = "Card claud"; // اسم الموقع const PRODUCTS = [ { amount: 10, sku: "WAR-10" }, { amount: 50, sku: "WAR-50" }, { amount: 100, sku: "WAR-100" }, { amount: 250, sku: "WAR-250" }, { amount: 500, sku: "WAR-500" }, ];

// محفظة USDT ERC20 فقط const USDT_ADDRESS = "0xD8b616C9842AA8208e4C9EdaB0c09D0CAb563378"; // عنوانك على Ethereum Mainnet

const SITE_CONTACT = { email: "cardclaud.temp@mailinator.com", // بريد مؤقت—بدّله لاحقًا phone: "+970 000 000 000", };

// ===== مكوّنات مساعدة ===== function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) { return ( <div> <h2 className="text-2xl md:text-3xl font-bold">{title}</h2> {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>} </div> ); }

function copy(text: string) { navigator.clipboard.writeText(text); }

// ===== الواجهة العلوية ===== function Navbar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) { return ( <div className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b"> <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"> <a href="#" className="font-extrabold text-xl">{BRAND_NAME}</a> <div className="hidden md:flex items-center gap-6"> <a href="#about" className="hover:opacity-70 text-sm">عن المتجر</a> <a href="#products" className="hover:opacity-70 text-sm">المنتجات</a> <a href="#contact"><Button className="rounded-2xl">تواصل</Button></a> </div> <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="toggle menu"> {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />} </button> </div> {open && ( <div className="md:hidden border-t"> <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3"> <a href="#about" className="py-2" onClick={() => setOpen(false)}>عن المتجر</a> <a href="#products" className="py-2" onClick={() => setOpen(false)}>المنتجات</a> <a href="#contact" onClick={() => setOpen(false)}> <Button className="w-full rounded-2xl">تواصل</Button> </a> </div> </div> )} </div> ); }

function Hero() { return ( <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-sky-100 text-slate-900 p-8 md:p-12 border"> <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}> <div className="flex items-center gap-2 mb-3"> <Globe className="w-5 h-5" /> <span className="text-sm/6 opacity-80">بطاقات شحن — USDT ERC20 فقط</span> </div> <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3"> {BRAND_NAME}: متجر أكواد شحن "نداء الحرب" </h1> <p className="text-base md:text-lg opacity-90 max-w-2xl mb-5"> اختَر الفئة المناسبة (10/50/100/250/500$) وادفع عبر USDT ERC20 فقط. بعد التحويل نرسل لك الكود فور التحقق من الحوالة. </p> <div className="flex flex-col sm:flex-row gap-3"> <a href="#products"> <Button size="lg" className="rounded-2xl">تسوّق الآن</Button> </a> <a href="#how"> <Button size="lg" variant="secondary" className="rounded-2xl">طريقة الدفع</Button> </a> </div> </motion.div> <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-sky-400/10 blur-2xl" /> <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-sky-300/20 blur-3xl" /> </div> ); }

function About() { return ( <section id="about" className="grid md:grid-cols-2 gap-6 items-center"> <div> <SectionTitle title="عن المتجر" subtitle="بيع أكواد شحن لعبة "نداء الحرب" بفئات متعددة" /> <ul className="mt-4 space-y-2 text-slate-700"> <li className="flex items-center gap-2"><Check className="w-5 h-5" /> تسليم سريع بعد تأكيد الحوالة</li> <li className="flex items-center gap-2"><Check className="w-5 h-5" /> دعم عبر البريد/الهاتف</li> <li className="flex items-center gap-2"><Check className="w-5 h-5" /> دفع USDT ERC20 فقط</li> </ul> </div> <Card className="shadow-xl"> <CardContent className="p-6 space-y-2"> <h3 className="font-semibold">ملاحظة مهمّة</h3> <p className="text-slate-600 text-sm leading-6"> هذا قالب جاهز. قبل الإطلاق الفعلي، استبدِل العنوان بعنوانك الحقيقي (تم إدخاله الآن). </p> </CardContent> </Card> </section> ); }

function ProductCard({ p, onBuy }: { p: { amount: number; sku: string }; onBuy: (p: any) => void }) { return ( <Card className="rounded-2xl border-sky-100"> <CardContent className="p-6 space-y-2"> <h3 className="font-bold text-lg">{p.amount}$ — كود شحن</h3> <p className="text-slate-600 text-sm">المنتج: {p.sku}</p> <Button className="rounded-2xl" onClick={() => onBuy(p)}>شراء</Button> </CardContent> </Card> ); }

function CheckoutModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: { amount: number; sku: string } | null }) { const [buyerEmail, setBuyerEmail] = useState(""); const [buyerPhone, setBuyerPhone] = useState(""); const [txid, setTxid] = useState(""); const orderId = useMemo(() => (item ? ${item.sku}-${Date.now()} : ""), [item]);

if (!open || !item) return null;

const formAction = https://formsubmit.co/${SITE_CONTACT.email}; // يرسل رسالة للمدير + يرسل رد تلقائي للمشتري

return ( <div className="fixed inset-0 z-50 bg-black/30 flex items-end md:items-center justify-center p-2 md:p-4"> <div className="bg-white w-full md:max-w-xl rounded-2xl p-6 space-y-4 border"> <div className="flex items-center justify-between"> <h3 className="font-bold text-xl">إتمام الشراء</h3> <button onClick={onClose} aria-label="close" className="p-2"><X className="w-5 h-5" /></button> </div>

<div className="grid gap-2 text-sm">
      <div className="flex items-center justify-between"><span>رقم الطلب:</span><code className="bg-slate-100 rounded px-2 py-1">{orderId}</code></div>
      <div className="flex items-center justify-between"><span>المنتج:</span><span>{item.amount}$ كود شحن — {item.sku}</span></div>
      <div className="flex items-center justify-between"><span>طريقة الدفع:</span><span className="flex items-center gap-1"><Wallet className="w-4 h-4" /> USDT ERC20</span></div>
    </div>

    <div className="space-y-3">
      <div className="text-sm">
        <div className="mb-1">أرسل المبلغ: <b>{item.amount} USDT</b></div>
        <div className="flex items-center gap-2">
          <span className="truncate max-w-[70%]" title={USDT_ADDRESS}>العنوان: {USDT_ADDRESS}</span>
          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => copy(USDT_ADDRESS)}><Copy className="w-4 h-4" /> نسخ</Button>
        </div>
        <div className="mt-3">
          <div className="p-2 border rounded-lg inline-block bg-white">
            <QRCodeCanvas value={USDT_ADDRESS} size={160} includeMargin={true} />
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
        <input type="hidden" name="_autoresponse" value={`استلمنا طلبك رقم ${orderId}. سنراجع التحويل على شبكة Ethereum ونرسل كود الشحن إلى بريدك وهاتفك بعد التأكيد.`} />

        {/* بيانات الطلب */}
        <input type="hidden" name="order_id" value={orderId} />
        <input type="hidden" name="sku" value={item.sku} />
        <input type="hidden" name="amount_usdt" value={item.amount.toString()} />
        <input type="hidden" name="network" value="ERC20" />
        <input type="hidden" name="store_wallet" value={USDT_ADDRESS} />

        <div className="grid md:grid-cols-2 gap-3">
          <Input required type="email" placeholder="بريدك الإلكتروني" value={buyerEmail} onChange={(e)=>setBuyerEmail(e.target.value)} name="buyer_email" />
          <Input required placeholder="رقم الهاتف مع مفتاح الدولة" value={buyerPhone} onChange={(e)=>setBuyerPhone(e.target.value)} name="buyer_phone" />
        </div>
        <Input required placeholder="TxID / Hash التحويل" value={txid} onChange={(e)=>setTxid(e.target.value)} name="txid" />

        <div className="text-xs text-slate-600">بعد الإرسال سيصلك إشعار تلقائي بالاستلام. <b>سيتم إرسال كود الشحن بعد التأكد من التحويل يدويًا.</b></div>
        <Button type="submit" className="rounded-2xl w-full"><Send className="w-4 h-4 ml-1" /> تأكيد الإرسال</Button>
      </form>
    </div>

    <div className="border-t pt-3 text-sm text-slate-600">
      <p>التسليم يتم يدويًا بعد تأكيد الحوالة على البلوكتشين. عادةً خلال دقائق إلى ساعة حسب الازدحام.</p>
    </div>
  </div>
</div>

); }

function Products() { const [selected, setSelected] = useState<{ amount: number; sku: string } | null>(null); const [open, setOpen] = useState(false);

const onBuy = (p: any) => { setSelected(p); setOpen(true); };

return ( <section id="products" className="space-y-4"> <SectionTitle title="المنتجات" subtitle="أكواد شحن "نداء الحرب" — ادفع USDT ERC20 فقط" /> <div className="grid md:grid-cols-3 gap-4"> {PRODUCTS.map((p) => ( <ProductCard key={p.sku} p={p} onBuy={onBuy} /> ))} </div> <CheckoutModal open={open} onClose={() => setOpen(false)} item={selected} /> </section> ); }

function HowToPay() { return ( <section id="how" className="space-y-4"> <SectionTitle title="طريقة الدفع" subtitle="أرسل USDT ERC20 إلى العنوان الظاهر في صفحة الدفع" /> <ol className="list-decimal pr-5 space-y-2 text-slate-700"> <li>اختر الفئة المطلوبة واضغط شراء.</li> <li>انسخ العنوان أو امسح QR وأرسل <b>المبلغ بالدولار</b> بالضبط.</li> <li>أرسل <b>TxID</b> ورقم الطلب إلى بريدنا لتأكيد التسليم.</li> </ol> <Card className="rounded-2xl"> <CardContent className="p-4 text-sm text-slate-600"> ملاحظة: لا نقبل أي شبكة أخرى غير ERC20. التحويل لشبكة خاطئة يؤدي لضياع الأموال. </CardContent> </Card> </section> ); }

function Contact() { return ( <section id="contact" className="space-y-4"> <SectionTitle title="تواصل معنا" /> <div className="grid md:grid-cols-3 gap-4"> <Card className="md:col-span-2 rounded-2xl"> <CardContent className="p-6 space-y-3"> <div className="grid md:grid-cols-2 gap-3"> <Input placeholder="اسمك" /> <Input type="email" placeholder="بريدك الإلكتروني" /> </div> <Input placeholder="رسالتك" /> <Button className="rounded-2xl"><Send className="w-4 h-4 ml-1" /> أرسل</Button> </CardContent> </Card> <Card className="rounded-2xl"> <CardContent className="p-6 space-y-3 text-slate-700"> <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {SITE_CONTACT.email}</div> <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {SITE_CONTACT.phone}</div> </CardContent> </Card> </div> </section> ); }

export default function App() { const [open, setOpen] = useState(false); const [rtl, setRtl] = useState(true); const dir = useMemo(() => (rtl ? "rtl" : "ltr"), [rtl]);

return ( <div dir={dir} className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-slate-900"> <Navbar open={open} setOpen={setOpen} /> <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-10"> <div className="flex justify-between items-center"> <span className="text-sm opacity-70">اتجاه الصفحة: {rtl ? "يمين ← يسار" : "Left → Right"}</span> <Button variant="outline" size="sm" onClick={() => setRtl(!rtl)} className="rounded-xl">تبديل الاتجاه</Button> </div> <Hero /> <About /> <Products /> <HowToPay /> <Contact /> <footer className="py-8 text-center text-slate-500 text-sm">© {new Date().getFullYear()} — {BRAND_NAME}</footer> </main> </div> ); }


