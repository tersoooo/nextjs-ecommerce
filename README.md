## Kullanılan Teknolojiler ve Özellikler
- Frontend (Client-Side)
Next.js 15: Server-side rendering (SSR) ve static site generation (SSG) ile performanslı bir React çerçevesi. App Router yapısı ile dinamik route'lar ve client-side bileşenler kullanıldı.
React: Kullanıcı arayüzü için dinamik ve interaktif bileşenler oluşturuldu.
Tailwind CSS: Hızlı ve özelleştirilebilir stilleme için utility-first CSS framework'ü kullanıldı.
Framer Motion: Animasyonlar ve geçiş efektleri için.
React Icons.
- State Yönetimi
Redux Toolkit: Sepet (cart) yönetimi için state yönetim kütüphanesi. cartSlice ile sepet işlemlerini (ekleme, çıkarma, miktar güncelleme) yönetildi.
- Backend ve Veritabanı
Firebase/Firestore: Ürünlerin saklanması, aranması ve yönetimi için NoSQL veritabanı kullanıldı. Products koleksiyonu ile ürün bilgileri (title, price, desc, imageUri, createdAt) tutuldu.
- Arama ve Filtreleme
Firestore sorguları ile title alanına göre ürün arama özelliği eklendi. where sorguları ve single field indeksler ile performans optimize edildi.
- Sepet Yönetimi
Redux Toolkit ile sepet mantığı oluşturuldu. Kullanıcılar, ürün detay sayfasından ürünleri sepete ekleyebilir, miktarı değiştirebilir, sepetten çıkarabilir veya sepeti temizleyebilir.
Header bileşenininde sepet ikonunda ürün sayısını gösteren bir badge ve CartModal ile sepet içeriği sunuldu.
