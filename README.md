## This project has been temporarily paused, and its roadmap is given below.

 ROADMAP (Dark/Light mode + No User Auth) production-level clear structure.

👉 Ei version ta hobe:

❌ Normal user signup/login nai
✅ Only Admin login
✅ User → browse, chat, buy (simple flow)
🚀 PROJECT TYPE

👉 AI-powered E-commerce (Single Store System)
(Not full SaaS now — later upgrade possible)

🎨 PHASE 0: UI/UX Planning (Dark + Light Mode)
✅ Features:
🌙 Dark mode
☀️ Light mode
🎛 Theme toggle button
⚙️ Tools:
Tailwind CSS
next-themes (theme switching)
🗂 PHASE 1: Project Setup
📁 Structure:
project/
 ├── client/ (Next.js)
 ├── server/ (Express)
⚙️ Client Setup:
Next.js (App Router)
Tailwind CSS
next-themes install
⚙️ Server Setup:
Express.js
MongoDB (Mongoose)
Cloudinary config
🧑‍💻 PHASE 2: Backend (Express Core)
🔐 Admin Auth (ONLY)

👉 User der jonno login nai

Features:
Admin login (email + password)
JWT auth
Protected routes
🛒 Product System
Add product (with image → Cloudinary)
Update product
Delete product
Get all products
Get single product
📦 Order System (No user account)

👉 Guest checkout

Fields:
Name
Phone
Address
Products
Total price
Payment method
💳 Payment (Manual)

👉 bKash
👉 Nagad

Flow:
User payment korbe
Transaction ID input dibe
Admin verify korbe
🧠 AI Chat API
Product-based Q&A
FAQ response
Smart suggestion
💬 Socket System
Live chat (user ↔ admin)
Typing indicator
Chat history
🧠 PHASE 3: Database Design (MongoDB)
📦 Product:
{
  name,
  price,
  description,
  image,
  public_id,
  category,
  stock
}
📦 Order:
{
  customerName,
  phone,
  address,
  items,
  total,
  paymentMethod,
  transactionId,
  status
}
💬 Chat:
{
  userId (random session),
  messages,
  createdAt
}
👤 Admin:
{
  email,
  password
}
🖥 PHASE 4: Frontend (Next.js)
🛍 Customer Side
Pages:
🏠 Home
🛍 Products
📄 Product Details
🛒 Cart
💳 Checkout
🤖 AI Chat UI
Floating chat button
Chat popup
AI response + product suggestion
💬 Live Chat UI
Separate tab / same chat toggle
“Talk to human” button
🎨 Dark/Light Mode Implementation
Flow:
next-themes use
Tailwind dark: class

Example:

<div className="bg-white dark:bg-black text-black dark:text-white">
🧑‍💼 Admin Dashboard
Pages:
Dashboard overview
Product manage
Order manage
Chat system
📸 PHASE 5: Image Handling

👉 Cloudinary

Flow:
Upload → Cloudinary
Save URL + public_id in MongoDB
🧪 PHASE 6: Testing
Product CRUD test
AI response test
Chat test
Order flow test
🚀 PHASE 7: Deployment
🌐 Deploy:
Frontend → Vercel
Backend → Render / VPS
DB → MongoDB Atlas
🧠 PHASE 8: Advanced Upgrade (Optional)
⭐ Review system
🎯 Recommendation system
📊 Analytics dashboard
📦 Order status tracking (real-time)
🔥 FULL USER FLOW

👉 User:
Browse → Ask AI → Add to cart → Checkout → Payment → Done

👉 Admin:
Login → Manage product → Verify payment → Chat reply

⚡ KEY DECISION (VERY IMPORTANT)

👉 Apnar system hobe:

❌ No user account
✅ Guest checkout
✅ Simple UX
✅ Fast build

👉 Eta beginner + portfolio + real client sob jonno PERFECT

🏆 FINAL RESULT

👉 Apnar project hobe:

💥 “AI-powered E-commerce Website with Real-time Chat & Admin Panel”

🎯 NEXT STEP

👉 Amra ekhon start korbo:

🔥 STEP 1:
Project setup (client + server)
Clean folder structure
Git init (step-by-step commit style)



------------------------------------
# সার্ভার-ফার্স্ট ইমপ্লিমেন্টেশন প্ল্যান

**সারাংশ**
- আগে শুধু `server/` complete করা হবে; `client/` এখন scope-এর বাইরে থাকবে।
- Backend architecture হবে feature-based modules: `Route -> Controller -> Service -> Model`।
- Admin auth হবে seeded admin account + JWT `httpOnly` cookie দিয়ে।
- Guest flow track হবে server-issued `guest_session_id` cookie দিয়ে, যাতে chat আর order একই session-এ link থাকে।
- Server complete ধরা হবে যখন API, socket flow, tests, Postman collection, আর README API guide ready থাকবে।

**মূল ইমপ্লিমেন্টেশন**
- Base stack: Express, Mongoose, `cookie-parser`, `cors`, `bcryptjs`, `jsonwebtoken`, `multer`, Cloudinary SDK, Socket.IO, OpenAI SDK, Joi, Jest, Supertest।
- Root structure: `server/src/app.js`, `server/src/server.js`, `server/src/config`, `server/src/middlewares`, `server/src/utils`, `server/src/lib`, `server/src/routes/index.js`, `server/src/modules`, `server/src/sockets`, `server/tests`, `server/docs`, `server/scripts`।
- Modules থাকবে `admin`, `product`, `order`, `chat`; প্রতিটায় `*.route.js`, `*.controller.js`, `*.service.js`, `*.validation.js`, `*.model.js` থাকবে।
- Shared middleware থাকবে error handler, 404 handler, admin auth guard, request validator, async wrapper।
- `.env.example` এ Mongo URI, JWT secret, admin seed email/password, Cloudinary keys, OpenAI key, client origin define থাকবে।

**Module Design**
- `admin` module: seed script দিয়ে প্রথম admin create, `login`, `logout`, `me` endpoints, bcrypt password compare, JWT cookie issue/clear।
- `product` module: create/update/delete/get APIs, slug generate, single primary image upload to Cloudinary, search/filter/sort/pagination, stock validation।
- `order` module: guest checkout create, item snapshot save, `bKash`/`Nagad` payment method, `transactionId` required, admin payment verify/reject, order status update।
- `chat` module: conversation + message persistence, AI reply endpoint, human-support mode switch, socket room-per-session, typing indicator, chat history, admin unread/open conversation list।
- AI reply simple retrieval-style হবে: product catalog summary + store FAQ + payment instructions prompt-এ যাবে; v1-এ embeddings/vector DB থাকবে না।
- Payment proof v1-এ শুধু `transactionId`; screenshot upload থাকবে না।
- Cookie names fixed থাকবে: `admin_access_token` এবং `guest_session_id`।

**Public APIs / Contracts**
- Base prefix হবে `/api/v1`।
- Public routes: `GET /products`, `GET /products/:slug`, `POST /orders`, `POST /chat/ai`, `GET /chat/history`।
- Admin auth routes: `POST /admin/auth/login`, `POST /admin/auth/logout`, `GET /admin/auth/me`।
- Admin product routes: `POST /admin/products`, `PATCH /admin/products/:id`, `DELETE /admin/products/:id`, `GET /admin/products`।
- Admin order routes: `GET /admin/orders`, `GET /admin/orders/:id`, `PATCH /admin/orders/:id/payment`, `PATCH /admin/orders/:id/status`।
- Admin chat routes: `GET /admin/chats`, `GET /admin/chats/:sessionId`, `POST /admin/chats/:sessionId/message`।
- Order payload fields fixed থাকবে: `customerName`, `phone`, `address`, `items`, `subtotal`, `deliveryFee`, `total`, `paymentMethod`, `transactionId`।
- Product fields fixed থাকবে: `name`, `slug`, `price`, `description`, `imageUrl`, `imagePublicId`, `category`, `stock`, `isFeatured`।
- Conversation message shape fixed থাকবে: `sender`, `mode`, `content`, `createdAt`।

**টেস্ট ও ডান-করা শর্ত**
- Automated tests হবে Jest + Supertest দিয়ে: admin login/session guard, product CRUD, upload failure, order creation, payment status transition, AI fallback response, chat history।
- Socket test scenarios থাকবে: room join, typing emit, user/admin message persistence, reconnect history fetch।
- Manual verification থাকবে Postman collection দিয়ে, এবং README-তে env setup, seed command, run command, API flow example লেখা থাকবে।
- Server complete ধরা হবে যখন Postman দিয়ে full flow run করা যাবে: admin login -> product add -> public product fetch -> order create -> payment verify -> AI chat -> human chat reply।

**কমিট-মাইলস্টোন**
1. Server bootstrap, config, DB, middleware, route registry।
2. Admin module + seed script + auth guard।
3. Product module + Cloudinary upload।
4. Order module + payment verification flow।
5. Chat module + OpenAI integration + Socket.IO।
6. Tests, Postman collection, README API guide cleanup।

**Assumptions**
- একটিই seeded admin থাকবে; UI থেকে নতুন admin create v1-এ থাকবে না।
- Refresh token flow v1-এ থাকবে না; single JWT cookie যথেষ্ট ধরা হয়েছে।
- Client integration এখন করা হবে না; API-first backend handoff-ready অবস্থায় থামব।
- Currency BDT ধরা হয়েছে।



----------------------
শুধু guest_session_id cookie/uuid-এর ওপর depend করলে problem আছে।

যদি user:

browser cache clear করে
cookie delete করে
অন্য device use করে
incognito use করে
তাহলে old identity হারিয়ে যাবে, আর:

নতুন chat history শুরু হবে
পুরনো order/chat track করা কঠিন হবে
তাই তোমার updated idea বেশি practical:

user freely browse করবে
কিন্তু chat start বা order place করার আগে
very simpleভাবে name + email নেওয়া হবে
এতে লাভ:

user account লাগছে না
UX simple থাকছে
কিন্তু identity completely anonymous থাকছে না
একই email দিয়ে later chat/order খুঁজে পাওয়া যাবে
admin side থেকেও manage করা সহজ হবে
আমি strongly recommend করব আমরা এখন flow-টা এভাবে update করি:

Updated public flow

browse করতে login/info লাগবে না
cart-এ add করতেও info লাগবে না
কিন্তু chat শুরু করতে name + email
checkout/order দিতে name + email + phone + address
Chat identity
chat model-এ থাকবে:

name
email
optional phone
messages
Order identity
order-এ থাকবে:

customerName
email
phone
address
Session tracking
cookie/uuid পুরো বাদ না দিলেও পারি, কিন্তু এটা primary identity হবে না
বরং:

email হবে main identity
guest_session_id optional support key হতে পারে
আমার recommendation:
email-কে primary guest identity ধরো, আর guest_session_id-কে optional temporary session helper রাখো।

মানে:

same email হলে same conversation continue করা যাবে
আর cookie থাকলে UX আরও smooth হবে
সবচেয়ে clean decision:

browse free
chat-এর আগে name + email
order-এর আগে name + email + phone + address
user auth এখনো থাকবে না
chat history email based fetch/upsert করা যাবে
এটা তোমার project-কে আরও real-world বানাবে।

এখন আমাদের plan-এ small change আসবে:

guestSession.js file আর mandatory নাও হতে পারে
attachGuestSession middleware optional হয়ে যাবে
chat এবং order validation-এ email add হবে
chat model-এ guestEmail/customerEmail field লাগবে
আমি বলব এখন থেকে আমরা updated architecture follow করি।

তাহলে next থেকে structure এভাবে ধরব:

guestSession.js আপাতত skip
আগে middleware/core files continue করি
পরে chat/order module-এ name + email based flow বসাব
চাইলে আমি এখন তোমাকে revised direction অনুযায়ী next file list বলে দিই, যেন ভুল জিনিস আর না লেখো।




---------------------------------------
algorithm style:

# FILE: `server/src/server.js`

```text
IMPORT http
IMPORT app
IMPORT connectDB
IMPORT env
IMPORT initializeSocketServer

CREATE async startServer function

INSIDE startServer
  CALL connectDB
  CREATE http server using app
  CALL initializeSocketServer with http server
  START server on env.port
  PRINT success message

IF startup error happens
  PRINT error message
  STOP process using exit code 1

CALL startServer

DO NOT USE app.listen
USE http.createServer(app)
```

