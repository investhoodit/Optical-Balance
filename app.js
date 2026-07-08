const WHATSAPP_NUMBER = '27695326338';

const services = [
  {category:'Massages', name:'Swedish Massage', detail:'1 hour relaxation massage', price:300, image:'assets/massage-treatment.jpg'},
  {category:'Massages', name:'Swedish Massage', detail:'1 hour 30 minutes relaxation massage', price:450, image:'assets/massage-treatment.jpg'},
  {category:'Massages', name:'Hotstone Massage', detail:'1 hour heated stone therapy', price:400, image:'assets/treatment-table.jpg'},
  {category:'Massages', name:'Hotstone Massage', detail:'1 hour 30 minutes heated stone therapy', price:550, image:'assets/treatment-table.jpg'},
  {category:'Massages', name:'Back, Neck & Shoulder', detail:'30 minute focused massage', price:200, image:'assets/treatment-table.jpg'},
  {category:'Massages', name:'Back, Neck & Shoulder', detail:'45 minute focused massage', price:300, image:'assets/treatment-table.jpg'},
  {category:'Massages', name:'Aroma Therapy', detail:'1 hour aromatherapy massage', price:350, image:'assets/prod-spray.jpg'},
  {category:'Massages', name:'Reflexology', detail:'45 minute pressure-point therapy', price:280, image:'assets/foot-soak-kit.jpg'},
  {category:'Massages', name:'Cupping Therapy', detail:'Therapeutic cupping session', price:450, image:'assets/prep-products.jpg'},
  {category:'Feet & Hands', name:'Luxurious Feet Retreat', detail:'Premium foot care experience', price:300, image:'assets/foot-soak-kit.jpg'},
  {category:'Feet & Hands', name:'Foot Soak, Scrub & Massage', detail:'Relaxing soak, exfoliation and massage', price:250, image:'assets/foot-soak-muscle-gel.jpg'},
  {category:'Feet & Hands', name:'Pedicure Gel Overlay', detail:'Gel overlay for pedicure', price:280, image:'assets/room-setup.jpg'},
  {category:'Feet & Hands', name:'Manicure Gel Overlay', detail:'Gel overlay for manicure', price:280, image:'assets/room-setup.jpg'},
  {category:'Feet & Hands', name:'Gel Overlay Toes or Nails', detail:'Gel overlay for toes or nails', price:180, image:'assets/room-setup.jpg'},
  {category:'Body Treatments', name:'Body Cavitation', detail:'45 minutes - stomach, arms or thighs', price:250, image:'assets/prep-products.jpg'},
  {category:'Facials', name:'Deep Cleansing Facial Treatment', detail:'Deep cleansing and refreshing facial', price:350, image:'assets/client-facial.jpg'},
  {category:'Facials', name:'Hydrating Facial Treatment', detail:'Hydrating and nourishing facial', price:380, image:'assets/sponge-facial.jpg'},
  {category:'Facials', name:'Anti Aging / Wrinkle Facial', detail:'Targeted anti-aging facial care', price:400, image:'assets/client-facial.jpg'},
  {category:'Facials', name:'Radiant Facial Treatment', detail:'Glow-boosting advanced facial treatment', price:350, image:'assets/promo-radiant-facial.jpg'}
];

const products = [
  {name:'Unrefined Shea Butter', detail:'Pure, raw body and face butter, 250ml', price:300, image:'assets/shea-product.jpg'},
  {name:'Castor Oil', detail:'Hexane-free castor oil, 100ml', price:300, image:'assets/castor-scrub-product.jpg'},
  {name:'Hydrating Facial Scrub', detail:'Deep exfoliation and moisturisation, 250ml', price:300, image:'assets/castor-scrub-product.jpg'},
  {name:'Lavender Relaxation Oil', detail:'Calming and soothing body oil, 100ml', price:0, image:'assets/oils-product.jpg'},
  {name:'Lemongrass Body Oil', detail:'Energizing and uplifting body oil, 100ml', price:0, image:'assets/oils-product.jpg'},
  {name:'Foot Soak', detail:'Soothes sore, tired feet, 250ml', price:0, image:'assets/foot-soak-muscle-gel.jpg'},
  {name:'Muscle Relief Gel', detail:'With arnica oil, 250ml', price:0, image:'assets/foot-soak-muscle-gel.jpg'},
  {name:'Gift Wellness Bag', detail:'Curated Optimal Balance gift set', price:280, image:'assets/gift-bag.jpg'},
  {name:'Body Lotion', detail:'Vitamin E, Shea Butter and Jojoba', price:0, image:'assets/lotion-perfume.jpg'},
  {name:'Eau de Parfum', detail:'Optimal Balance fragrance, 50ml', price:0, image:'assets/lotion-perfume.jpg'}
];

let cart = JSON.parse(localStorage.getItem('ob_cart') || '[]');
const format = v => v ? `R${v}` : 'Quote';
const safeJSON = obj => JSON.stringify(obj).replace(/'/g,'&#39;');

function addToCart(item){
  cart.push(item);
  localStorage.setItem('ob_cart', JSON.stringify(cart));
  renderCart();
  openCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem('ob_cart', JSON.stringify(cart));
  renderCart();
}

function renderServices(category='All'){
  const grid=document.getElementById('serviceGrid');
  grid.innerHTML='';
  services.filter(s=>category==='All'||s.category===category).forEach(s=>{
    grid.insertAdjacentHTML('beforeend', `
      <article class="card">
        <img src="${s.image}" alt="${s.name}">
        <div class="card-body">
          <span class="muted">${s.category}</span>
          <h3>${s.name}</h3>
          <p>${s.detail}</p>
          <div class="price">${format(s.price)}</div>
          <button class="btn small" data-add='${safeJSON({type:'Service',...s})}'>Add booking</button>
        </div>
      </article>`);
  });
}

function renderProducts(){
  const grid=document.getElementById('productGrid');
  grid.innerHTML='';
  products.forEach(p=>{
    grid.insertAdjacentHTML('beforeend', `
      <article class="card">
        <img src="${p.image}" alt="${p.name}">
        <div class="card-body">
          <span class="muted">Product</span>
          <h3>${p.name}</h3>
          <p>${p.detail}</p>
          <div class="price">${format(p.price)}</div>
          <button class="btn small" data-add='${safeJSON({type:'Product',...p})}'>Add to cart</button>
        </div>
      </article>`);
  });
}

function renderTabs(){
  const tabs=['All',...new Set(services.map(s=>s.category))];
  const wrap=document.getElementById('categoryTabs');
  wrap.innerHTML='';
  tabs.forEach((t,i)=>wrap.insertAdjacentHTML('beforeend', `<button class="tab ${i===0?'active':''}" data-tab="${t}">${t}</button>`));
  wrap.addEventListener('click',e=>{
    if(!e.target.dataset.tab) return;
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    renderServices(e.target.dataset.tab);
  });
}

function renderCart(){
  document.getElementById('cartCount').textContent=cart.length;
  const items=document.getElementById('cartItems');
  items.innerHTML = cart.length ? '' : '<p>Your cart is empty. Add a treatment or product to continue.</p>';
  cart.forEach((item,i)=>items.insertAdjacentHTML('beforeend',`<div class="cart-item"><div><strong>${item.name}</strong><br><span class="muted">${item.type} · ${item.detail || ''}</span></div><div><strong>${format(item.price)}</strong><br><button onclick="removeFromCart(${i})">Remove</button></div></div>`));
  document.getElementById('cartTotal').textContent = `R${cart.reduce((sum,item)=>sum+(item.price||0),0)}`;
}

function openCart(){
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}

function closeCart(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

document.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add) addToCart(JSON.parse(add.dataset.add));
  const pkg=e.target.closest('[data-package]');
  if(pkg) addToCart({type:'Package', name:pkg.dataset.package, detail:'Package enquiry', price:0});
});

document.getElementById('openCart').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
document.getElementById('overlay').onclick=closeCart;

document.getElementById('checkoutBtn').onclick=()=>{
  const list=cart.map((item,index)=>`${index+1}. ${item.type}: ${item.name} - ${item.detail || ''} - ${format(item.price)}`).join('%0A');
  const total=cart.reduce((sum,item)=>sum+(item.price||0),0);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Optimal%20Balance%20Spa,%20I%20would%20like%20to%20book/order:%0A${list}%0AEstimated%20total:%20R${total}`,'_blank');
};

document.getElementById('bookingForm').addEventListener('submit',e=>{
  e.preventDefault();
  const d=Object.fromEntries(new FormData(e.target).entries());
  const msg=`Hi Optimal Balance Spa, I would like to make a booking.%0AName: ${d.name}%0APhone: ${d.phone}%0ADate: ${d.date}%0ATime: ${d.time}%0ALocation: ${d.location}%0AMessage: ${d.message}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURI(msg)}`,'_blank');
});

document.getElementById('menuBtn').onclick=()=>document.getElementById('mainNav').classList.toggle('open');

renderTabs();
renderServices();
renderProducts();
renderCart();

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
