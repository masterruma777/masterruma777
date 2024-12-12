let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let btnthanhtoan=document.querySelector('.btnthanhtoan');
let products = [
    {
        id: 1,
        name: 'Khổ Qua Đèo 250G',
        image: 'img/Raucu/khoqua.png',
        price: 24975
    },
    {
        id: 2,
        name: 'Rau Dền Tía Hữu Cơ 250G',
        image: 'img/Raucu/rauden.webp',
        price: 28900
    },
    {
        id: 3,
        name: 'Cải Ngọt Hữu Cơ 250G',
        image: 'img/Raucu/caingot.jpg',
        price: 28900
    },
    {
        id: 4,
        name: 'Rau Muống Yuuki 250G',
        image: 'img/Raucu/raumuong.webp',
        price: 28900
    },
    {
        id: 5,
        name: 'Bơ Tươi Mã Dưỡng 500G',
        image: 'img/traicay/bơ.webp',
        price: 61450
    },
    {
        id: 6,
        name: 'Bưởi Da Xanh Ruột Hồng 1Kg',
        image: 'img/traicay/buoi.webp',
        price: 98900
    },
    {
        id: 7,
        name: 'Cam Navel Mỹ 500G',
        image: 'img/traicay/cam.webp',
        price: 64950
    },
    {
        id: 8,
        name: 'Chuối Lobang Nhánh 4-5 Trái 700G+',
        image: 'img/traicay/chuoi.webp',
        price: 45900
    },
    {
        id: 9,
        name: 'Xoài Sấy Dẻo La Petite Epicerie 100G',
        image: 'img/tpcb/xoai-say.webp',
        price: 58900
    },
    {
        id: 10,
        name: 'Dứa Sấy Dẻo La Petite Epicerie 40G',
        image: 'img/tpcb/thomsay.webp',
        price: 24900
    },
    {
        id: 11,
        name: "Chuối Sấy Dẻo We'Natur 330G",
        image: 'img/tpcb/chuoisay.jpg',
        price: 54900
    },
    {
        id: 12,
        name: 'Cam Lát Sấy Dẻo La Petite Epicerie 40G',
        image: 'img/tpcb/camsay.webp',
        price: 22900
    },
    {
        id: 13,
        name: 'Chanh Dây Sấy Dẻo La Petite Epicerie 100G',
        image: 'img/tpcb/chanhsay.jpg',
        price: 58900
    },

];
let listCards = [];
function bouncer(arr) {
    return arr.filter(Boolean);
  }
function loadin(){
    if(window.localStorage.getItem("listcards") != null){
        listCards=bouncer(JSON.parse(window.localStorage.getItem("listcards")));
        reloadCard();
    }
}
function loadinthanhtoan(){
    if(window.localStorage.getItem("listcards") != null){
        listCards=bouncer(JSON.parse(window.localStorage.getItem("listcards")));
        reloadCardthanhtoan();
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice = totalPrice + value.price;
            count = count + value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} VNĐ</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
                <br>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = "Tổng giá: "+totalPrice.toLocaleString()+" VNĐ";
    window.localStorage.setItem("listcards", JSON.stringify(listCards));
    checkvo();
}
function reloadCardthanhtoan() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice = totalPrice + value.price;
            count = count + value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} VNĐ</div>
                <div>
                    <button onclick="changeQuantitythanhtoan(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantitythanhtoan(${key}, ${value.quantity + 1})">+</button>
                </div>
                <br>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    document.getElementById('sanpham').value = setds();
    console.log(setds());
    document.getElementById('gia').value = totalPrice;
    window.localStorage.setItem("listcards", JSON.stringify(listCards));
    if (isEmpty(listCards)) {
        window.location.replace("index.html");
    }
}
function setds(){
    let ds='';
    listCards.forEach((value, key) => {
        if (value != null) {
          let tem= value.name+"\n  Số lượng: "+value.quantity+"\n   Giá: "+value.quantity*value.price+" VNĐ  \n\n";
          ds=ds+tem;
        }
    })
    return ds;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
function changeQuantitythanhtoan(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCardthanhtoan();
}
function checkvo() {
    if (isEmpty(listCards)) {
        quantity.classList.add("d-none");
        btnthanhtoan.classList.add("disabled");
    }
    else {
        quantity.classList.remove("d-none");
        btnthanhtoan.classList.remove("disabled")
    }
}