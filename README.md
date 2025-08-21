# แบบทดสอบ: Shopping Cart Interface

**เวลาที่กำหนด:** 55 นาที  
**คะแนนเต็ม:** 100 คะแนน

## ภาพรวมของโจทย์

สร้างแอพพลิเคชัน Shopping Cart Interface โดยใช้ React, MUI, React Router, Zustand และ React Hook Form

เราได้เตรียมไฟล์ layout และ CSS ให้แล้วในโฟลเดอร์ `/src/components/` และ `/src/routes/`:
- `AppLayout.tsx` - Layout หลักพร้อม Navigation
- `Products.tsx` - หน้า Products List
- `Cart.tsx` - หน้า Shopping Cart

**ห้ามแก้ไข UI/Layout ที่มีอยู่แล้ว** เพียงแค่เพิ่ม functionality ตามที่กำหนด

---

## ส่วนที่ 1: การติดตั้ง (10 คะแนน)

ติดตั้ง packages ที่จำเป็น:
```bash
npm install zustand react-hook-form
```


## ส่วนที่ 2: Zustand Stores (40 คะแนน)

### 2.1 สร้าง Product Store (20 คะแนน)

สร้างไฟล์ `src/store/productStore.ts`:

**State:**
- `products: Product[]` - รายการสินค้าทั้งหมด

**Actions:**
- `loadProducts()` - โหลดข้อมูลจาก mockProducts
- `getProductsByCategory(category: string)` - กรองสินค้าตาม category

### 2.2 สร้าง Cart Store (20 คะแนน)

สร้างไฟล์ `src/store/cartStore.ts`:

**State:**
- `items: CartItem[]` - รายการสินค้าในตะกร้า

**Actions:**
- `addToCart(product: Product)` - เพิ่มสินค้าลงตะกร้า
- `removeFromCart(productId: string)` - ลบสินค้าออกจากตะกร้า
- `updateQuantity(productId: string, quantity: number)` - อัพเดทจำนวน
- `clearCart()` - ล้างตะกร้า
- `getTotalItems()` - นับจำนวนสินค้าทั้งหมด
- `getTotalPrice()` - คำนวณราคารวม

---

## ส่วนที่ 3: React Router (10 คะแนน)


ในไฟล์ `App.tsx`:
- Import `useNavigate`
- ใช้ `navigate(item.path)` ใน menu items
- แสดงจำนวนสินค้าในตะกร้าที่ header และ sidebar
- ใช้ `<Outlet/>` ในจุดที่เหมาะสม

---

## ส่วนที่ 4: Products Component (20 คะแนน)

### 4.1 เชื่อมต่อกับ Stores (10 คะแนน)

แก้ไขไฟล์ `src/components/Products.tsx`:

1. **Import และใช้ stores:**
   ```typescript
   import { useProductStore } from '../store/productStore';
   import { useCartStore } from '../store/cartStore';
   
   const { products, loadProducts, getProductsByCategory, sortProducts } = useProductStore();
   const { items, addToCart, updateQuantity, removeFromCart } = useCartStore();
   ```
2. **โหลดข้อมูล**
   - ใช้ `useEffect` เรียก `loadProducts()` เมื่อ component mount
3. **Implement filtering:**
   - Filter ตาม category

### 4.2 Cart Functionality (10 คะแนน)

1. **ตรวจสอบสินค้าในตะกร้า:**
   - แสดงปุ่ม quantity controls หากสินค้าอยู่ในตะกร้า
   - แสดงปุ่ม "Add to Cart" หากยังไม่ได้เพิ่ม

2. **เชื่อมต่อ actions:**
   - `addToCart(product)` เมื่อคลิก Add to Cart
   - `updateQuantity(productId, newQuantity)` เมื่อเปลี่ยนจำนวน
   - `removeFromCart(productId)` เมื่อคลิก Remove

---

## ส่วนที่ 5: Cart Component (10 คะแนน)

### 5.1 เชื่อมต่อกับ Cart Store (10 คะแนน)

แก้ไขไฟล์ `src/components/Cart.tsx`:

1. **Import และใช้ cart store:**
   ```typescript
   const { items, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCartStore();
   ```

2. **คำนวณราคา:**
   - `subtotal` - ราคารวมก่อนค่าส่ง
   - `shipping` - ค่าส่ง 50 บาท (ถ้ามีสินค้า)
   - `total` - ราคารวมทั้งหมด

3. **เชื่อมต่อ actions:**
   - เปลี่ยนจำนวนสินค้า
   - ลบสินค้าออกจากตะกร้า
   - Navigation กลับไปหน้า Products

---

## ส่วนที่ 6: Checkout Form (10 คะแนน)

### 6.1 React Hook Form ใน Checkout Dialog (10 คะแนน)

ในไฟล์ `Cart.tsx` เพิ่ม React Hook Form:

1. **Setup form:**
   ```typescript
   import { useForm } from 'react-hook-form';
   
   interface CheckoutData {
     fullName: string;
     email: string;
     phone: string;
     address: string;
     city: string;
     postalCode: string;
   }
   
   const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckoutData>();
   ```

2. **Form validation:**
   - `fullName` - required (ข้อความ: "กรุณากรอกชื่อ-นามสกุล")
   - `email` - required + email format (ข้อความ: "กรุณากรอก email ให้ถูกต้อง")
   - `phone` - required (ข้อความ: "กรุณากรอกเบอร์โทรศัพท์")
   - `address` - required (ข้อความ: "กรุณากรอกที่อยู่")
   - `city` - required (ข้อความ: "กรุณากรอกจังหวัด")
   - `postalCode` - required + pattern (ข้อความ: "กรุณากรอกรหัสไปรษณีย์ 5 หลัก")

3. **Form submission:**
   ```typescript
   const onSubmit = (data: CheckoutData) => {
     // แสดง alert ว่าสั่งซื้อสำเร็จ
     alert('สั่งซื้อสำเร็จ! ขอบคุณสำหรับการสั่งซื้อ');
     clearCart();
     reset();
     setOpenCheckout(false);
     // navigate ไปหน้า Products
   };
   ```

---

## เกณฑ์การให้คะแนน

| ส่วน | คะแนน | รายละเอียด |
|------|-------|------------|
| **Setup** | 10 | การติดตั้งและโครงสร้างไฟล์ |
| **Zustand** | 40 | Product Store (20) + Cart Store (20) |
| **Router** | 10 | Navigation ระหว่างหน้าได้ |
| **Products** | 20 | แสดงสินค้า, filter, add to cart |
| **Cart** | 10 | แสดงตะกร้า, จัดการสินค้า, คำนวณราคา |
| **Checkout** | 10 | Form validation และ submission |
| **รวม** | **100** |  |


