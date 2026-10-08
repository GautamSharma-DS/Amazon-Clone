/* =========================================================
   AMAZON CLONE - JAVASCRIPT
========================================================= */


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    {
        id: 1,
        name: "Premium Clothes Collection",
        category: "Clothes",
        price: 1299,
        rating: 4.3,
        image: "box1_image.jpg"
    },

    {
        id: 2,
        name: "Personal Care Essentials",
        category: "Health & Personal Care",
        price: 899,
        rating: 4.2,
        image: "box2_image.jpg"
    },

    {
        id: 3,
        name: "Modern Home Furniture",
        category: "Furniture",
        price: 8999,
        rating: 4.5,
        image: "box3_image.jpg"
    },

    {
        id: 4,
        name: "Latest Electronics",
        category: "Electronics",
        price: 45999,
        rating: 4.6,
        image: "box4_image.jpg"
    },

    {
        id: 5,
        name: "Beauty Essentials",
        category: "Beauty",
        price: 1499,
        rating: 4.4,
        image: "box5_image.jpg"
    },

    {
        id: 6,
        name: "Pet Care Products",
        category: "Pet Care",
        price: 799,
        rating: 4.5,
        image: "box6_image.jpg"
    },

    {
        id: 7,
        name: "Kids Toys Collection",
        category: "Toys",
        price: 1199,
        rating: 4.3,
        image: "box7_image.jpg"
    },

    {
        id: 8,
        name: "Latest Fashion Trends",
        category: "Fashion",
        price: 2499,
        rating: 4.5,
        image: "box8_image.jpg"
    }

];


/* =========================================================
   CART
========================================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent = totalItems;

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            product =>
                product.id === productId
        );

    if (!product) {
        return;
    }

    const existingProduct =
        cart.find(
            item =>
                item.id === productId
        );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(
        `${product.name} added to cart`
    );

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    saveCart();

    updateCartCount();

    renderCartPage();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(
    productId,
    change
) {

    const product =
        cart.find(
            item =>
                item.id === productId
        );

    if (!product) {
        return;
    }

    product.quantity += change;

    if (product.quantity <= 0) {

        removeFromCart(productId);

        return;
    }

    saveCart();

    updateCartCount();

    renderCartPage();

}


/* =========================================================
   SEARCH
========================================================= */

function searchProducts(searchText) {

    const text =
        searchText.toLowerCase();

    return products.filter(product =>

        product.name
            .toLowerCase()
            .includes(text)

        ||

        product.category
            .toLowerCase()
            .includes(text)

    );

}


function displayProducts(productList) {

    const shopSection =
        document.querySelector(
            ".shop-section"
        );

    if (!shopSection) {
        return;
    }

    shopSection.innerHTML = "";

    if (productList.length === 0) {

        shopSection.innerHTML = `
            <div class="no-products">
                <h2>No products found</h2>
                <p>Try searching for another product.</p>
            </div>
        `;

        return;
    }


    productList.forEach(product => {

        const box =
            document.createElement("div");

        box.className = "box";

        box.innerHTML = `

            <div class="box-content">

                <h2>
                    ${product.name}
                </h2>

                <div
                    class="box-img"
                    style="
                        background-image:
                        url('${product.image}');
                    "
                ></div>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <p class="product-rating">
                    ⭐ ${product.rating}
                </p>

                <button
                    class="add-cart-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

        shopSection.appendChild(box);

    });

}


/* =========================================================
   SEARCH EVENTS
========================================================= */

const searchButton =
    document.getElementById(
        "searchButton"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            const searchText =
                searchInput.value.trim();

            if (!searchText) {

                displayProducts(products);

                return;
            }

            const results =
                searchProducts(searchText);

            displayProducts(results);

        }
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                searchButton.click();

            }

        }
    );

}


/* =========================================================
   CART BUTTON
========================================================= */

const cartButton =
    document.getElementById(
        "cartButton"
    );


if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "cart.html";

        }
    );

}


/* =========================================================
   CART PAGE
========================================================= */

function renderCartPage() {

    const cartContainer =
        document.getElementById(
            "cartContainer"
        );

    const cartSummary =
        document.getElementById(
            "cartSummary"
        );

    if (!cartContainer || !cartSummary) {
        return;
    }


    /* Empty Cart */

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>

                <h2>Your Amazon Cart is empty</h2>

                <p>
                    Add products to your cart and they will appear here.
                </p>

                <button
                    class="continue-shopping"
                    onclick="window.location.href='index.html'"
                >
                    Continue Shopping
                </button>

            </div>

        `;

        cartSummary.innerHTML = "";

        return;
    }


    /* Cart Items */

    cartContainer.innerHTML = `

        <div class="cart-items">

            <div class="cart-heading">
                <h2>Shopping Cart</h2>
                <span>Price</span>
            </div>

            ${cart.map(item => `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </div>


                    <div class="cart-item-details">

                        <h3>
                            ${item.name}
                        </h3>

                        <p class="cart-category">
                            ${item.category}
                        </p>

                        <p class="cart-rating">
                            ⭐ ${item.rating}
                        </p>

                        <p class="cart-stock">
                            In Stock
                        </p>


                        <div class="quantity-controls">

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove-cart-button"
                            onclick="removeFromCart(${item.id})"
                        >
                            Delete
                        </button>

                    </div>


                    <div class="cart-item-price">

                        ₹${(
                            item.price *
                            item.quantity
                        ).toLocaleString("en-IN")}

                    </div>

                </div>

            `).join("")}

        </div>

    `;


    /* Cart Summary */

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );


    cartSummary.innerHTML = `

        <div class="cart-summary-box">

            <p class="summary-items">
                Subtotal (${totalItems} items)
            </p>

            <h2>
                ₹${subtotal.toLocaleString("en-IN")}
            </h2>

            <label class="gift-option">

                <input
                    type="checkbox"
                >

                This order contains a gift

            </label>

            <button
                class="checkout-button"
                onclick="checkout()"
            >
                Proceed to Buy
            </button>

        </div>

    `;

}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }

    alert(
        "Checkout functionality is ready for integration."
    );

}


/* =========================================================
   LOCATION
========================================================= */

function getUserLocation() {

    if (!navigator.geolocation) {

        alert(
            "Location is not supported by your browser."
        );

        return;
    }


    const locationText =
        document.getElementById(
            "locationText"
        );


    if (locationText) {

        locationText.textContent =
            "Detecting your location...";

    }


    navigator.geolocation.getCurrentPosition(

        async function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            try {

                const response =
                    await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
                    );


                if (!response.ok) {

                    throw new Error(
                        "Location lookup failed"
                    );

                }


                const data =
                    await response.json();


                const address =
                    data.address || {};


                const city =
                    address.city ||
                    address.town ||
                    address.village ||
                    address.county ||
                    "Your location";


                const postcode =
                    address.postcode || "";


                let locationDisplay =
                    `Delivering to ${city}`;


                if (postcode) {

                    locationDisplay +=
                        ` ${postcode}`;

                }


                if (locationText) {

                    locationText.textContent =
                        locationDisplay;

                }


                localStorage.setItem(
                    "userLocation",
                    locationDisplay
                );


            } catch (error) {

                console.error(error);


                if (locationText) {

                    locationText.textContent =
                        "Location unavailable";

                }


                alert(
                    "Unable to find your location."
                );

            }

        },


        function(error) {

            if (locationText) {

                locationText.textContent =
                    "Delivering to your location";

            }


            if (error.code === 1) {

                alert(
                    "Please allow location access in your browser."
                );

            } else if (error.code === 2) {

                alert(
                    "Your location could not be detected."
                );

            } else {

                alert(
                    "Location request timed out."
                );

            }

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


const locationButton =
    document.getElementById(
        "locationButton"
    );


if (locationButton) {

    locationButton.addEventListener(
        "click",
        getUserLocation
    );

}


/* =========================================================
   LOAD SAVED LOCATION
========================================================= */

const savedLocation =
    localStorage.getItem(
        "userLocation"
    );


if (savedLocation) {

    const locationText =
        document.getElementById(
            "locationText"
        );


    if (locationText) {

        locationText.textContent =
            savedLocation;

    }

}


/* =========================================================
   COUNTRY DATA
========================================================= */

const countries = {

    India: {
        flag: "🇮🇳",
        domain: "Amazon.in",

        languages: [
            {
                name: "English",
                code: "EN",
                native: "English"
            },
            {
                name: "Hindi",
                code: "HI",
                native: "हिन्दी"
            },
            {
                name: "Tamil",
                code: "TA",
                native: "தமிழ்"
            },
            {
                name: "Telugu",
                code: "TE",
                native: "తెలుగు"
            },
            {
                name: "Kannada",
                code: "KN",
                native: "ಕನ್ನಡ"
            },
            {
                name: "Malayalam",
                code: "ML",
                native: "മലയാളം"
            },
            {
                name: "Bengali",
                code: "BN",
                native: "বাংলা"
            },
            {
                name: "Marathi",
                code: "MR",
                native: "मराठी"
            }
        ]
    },


    UnitedStates: {
        flag: "🇺🇸",
        domain: "Amazon.com",

        languages: [
            {
                name: "English",
                code: "EN",
                native: "English"
            },
            {
                name: "Spanish",
                code: "ES",
                native: "Español"
            }
        ]
    },


    UnitedKingdom: {
        flag: "🇬🇧",
        domain: "Amazon.co.uk",

        languages: [
            {
                name: "English",
                code: "EN",
                native: "English"
            },
            {
                name: "Welsh",
                code: "CY",
                native: "Cymraeg"
            }
        ]
    },


    Germany: {
        flag: "🇩🇪",
        domain: "Amazon.de",

        languages: [
            {
                name: "German",
                code: "DE",
                native: "Deutsch"
            },
            {
                name: "English",
                code: "EN",
                native: "English"
            }
        ]
    },


    France: {
        flag: "🇫🇷",
        domain: "Amazon.fr",

        languages: [
            {
                name: "French",
                code: "FR",
                native: "Français"
            },
            {
                name: "English",
                code: "EN",
                native: "English"
            }
        ]
    },


    Spain: {
        flag: "🇪🇸",
        domain: "Amazon.es",

        languages: [
            {
                name: "Spanish",
                code: "ES",
                native: "Español"
            },
            {
                name: "Catalan",
                code: "CA",
                native: "Català"
            },
            {
                name: "English",
                code: "EN",
                native: "English"
            }
        ]
    },


    Italy: {
        flag: "🇮🇹",
        domain: "Amazon.it",

        languages: [
            {
                name: "Italian",
                code: "IT",
                native: "Italiano"
            },
            {
                name: "English",
                code: "EN",
                native: "English"
            }
        ]
    },


    Japan: {
        flag: "🇯🇵",
        domain: "Amazon.co.jp",

        languages: [
            {
                name: "Japanese",
                code: "JA",
                native: "日本語"
            },
            {
                name: "English",
                code: "EN",
                native: "English"
            }
        ]
    },


    China: {
        flag: "🇨🇳",
        domain: "Amazon.cn",

        languages: [
            {
                name: "Chinese",
                code: "ZH",
                native: "中文"
            },
            {
                name: "English",
                code: "EN",
                native: "English"
            }
        ]
    },


    UAE: {
        flag: "🇦🇪",
        domain: "Amazon.ae",

        languages: [
            {
                name: "Arabic",
                code: "AR",
                native: "العربية"
            },
            {
                name: "English",
                code: "EN",
                native: "English"
            }
        ]
    }

};


/* =========================================================
   LANGUAGE TRANSLATIONS
========================================================= */

const translations = {

    EN: {
        hello: "Hello, sign in",
        account: "Account & Lists",
        returns: "Returns",
        orders: "& Orders",
        search: "Search Amazon",
        location: "Delivering to your location",
        update: "Update location",
        recommendations: "See personalized recommendations",
        signIn: "Sign in",
        newCustomer: "New customer?",
        startHere: "Start here.",
        backTop: "Back to top",
        changeLanguage: "Change Language",
        learnMore: "Learn more",
        shoppingOn: "You are shopping on",
        changeCountry: "Change country/region",
        all: "All",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "Mobiles",
        deals: "Today's Deals",
        coupons: "Coupons",
        flights: "Flights",
        electronics: "Electronics",
        computers: "Computers",
        newReleases: "New Releases",
        seeMore: "See more"
    },


    HI: {
        hello: "नमस्ते, साइन इन करें",
        account: "अकाउंट और लिस्ट",
        returns: "रिटर्न",
        orders: "और ऑर्डर",
        search: "Amazon पर खोजें",
        location: "आपके स्थान पर डिलीवरी",
        update: "स्थान अपडेट करें",
        recommendations: "व्यक्तिगत सुझाव देखें",
        signIn: "साइन इन करें",
        newCustomer: "नए ग्राहक हैं?",
        startHere: "यहाँ से शुरू करें।",
        backTop: "ऊपर जाएँ",
        changeLanguage: "भाषा बदलें",
        learnMore: "और जानें",
        shoppingOn: "आप यहाँ खरीदारी कर रहे हैं",
        changeCountry: "देश/क्षेत्र बदलें",
        all: "सभी",
        fresh: "फ्रेश",
        amazonPay: "Amazon Pay",
        mobiles: "मोबाइल",
        deals: "आज के ऑफर",
        coupons: "कूपन",
        flights: "फ्लाइट्स",
        electronics: "इलेक्ट्रॉनिक्स",
        computers: "कंप्यूटर",
        newReleases: "नई रिलीज़",
        seeMore: "और देखें"
    },


    TA: {
        hello: "வணக்கம், உள்நுழைக",
        account: "கணக்கு மற்றும் பட்டியல்கள்",
        returns: "திருப்பங்கள்",
        orders: "ஆர்டர்கள்",
        search: "Amazon-ல் தேடுங்கள்",
        location: "உங்கள் இருப்பிடத்திற்கு டெலிவரி",
        update: "இருப்பிடத்தை புதுப்பிக்கவும்",
        recommendations: "தனிப்பயனாக்கப்பட்ட பரிந்துரைகள்",
        signIn: "உள்நுழைக",
        newCustomer: "புதிய வாடிக்கையாளரா?",
        startHere: "இங்கே தொடங்குங்கள்.",
        backTop: "மேலே செல்லவும்",
        changeLanguage: "மொழியை மாற்றவும்",
        learnMore: "மேலும் அறிக",
        shoppingOn: "நீங்கள் இங்கு வாங்குகிறீர்கள்",
        changeCountry: "நாடு/பகுதியை மாற்றவும்",
        all: "அனைத்தும்",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "மொபைல்கள்",
        deals: "இன்றைய சலுகைகள்",
        coupons: "கூப்பன்கள்",
        flights: "விமானங்கள்",
        electronics: "எலக்ட்ரானிக்ஸ்",
        computers: "கணினிகள்",
        newReleases: "புதிய வெளியீடுகள்",
        seeMore: "மேலும் பார்க்க"
    },


    DE: {
        hello: "Hallo, anmelden",
        account: "Konto & Listen",
        returns: "Rücksendungen",
        orders: "& Bestellungen",
        search: "Amazon durchsuchen",
        location: "Lieferung an Ihren Standort",
        update: "Standort aktualisieren",
        recommendations: "Personalisierte Empfehlungen",
        signIn: "Anmelden",
        newCustomer: "Neuer Kunde?",
        startHere: "Hier starten.",
        backTop: "Nach oben",
        changeLanguage: "Sprache ändern",
        learnMore: "Mehr erfahren",
        shoppingOn: "Sie kaufen bei",
        changeCountry: "Land/Region ändern",
        all: "Alle",
        fresh: "Frische",
        amazonPay: "Amazon Pay",
        mobiles: "Handys",
        deals: "Angebote des Tages",
        coupons: "Gutscheine",
        flights: "Flüge",
        electronics: "Elektronik",
        computers: "Computer",
        newReleases: "Neuerscheinungen",
        seeMore: "Mehr anzeigen"
    },


    FR: {
        hello: "Bonjour, identifiez-vous",
        account: "Compte et listes",
        returns: "Retours",
        orders: "Commandes",
        search: "Rechercher sur Amazon",
        location: "Livraison à votre emplacement",
        update: "Mettre à jour l'emplacement",
        recommendations: "Recommandations personnalisées",
        signIn: "S'identifier",
        newCustomer: "Nouveau client ?",
        startHere: "Commencez ici.",
        backTop: "Retour en haut",
        changeLanguage: "Changer de langue",
        learnMore: "En savoir plus",
        shoppingOn: "Vous achetez sur",
        changeCountry: "Changer de pays/région",
        all: "Tous",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "Mobiles",
        deals: "Offres du jour",
        coupons: "Coupons",
        flights: "Vols",
        electronics: "Électronique",
        computers: "Ordinateurs",
        newReleases: "Nouveautés",
        seeMore: "Voir plus"
    },


    ES: {
        hello: "Hola, identifícate",
        account: "Cuenta y listas",
        returns: "Devoluciones",
        orders: "Pedidos",
        search: "Buscar en Amazon",
        location: "Entrega en tu ubicación",
        update: "Actualizar ubicación",
        recommendations: "Recomendaciones personalizadas",
        signIn: "Iniciar sesión",
        newCustomer: "¿Nuevo cliente?",
        startHere: "Empieza aquí.",
        backTop: "Volver arriba",
        changeLanguage: "Cambiar idioma",
        learnMore: "Más información",
        shoppingOn: "Estás comprando en",
        changeCountry: "Cambiar país/región",
        all: "Todos",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "Móviles",
        deals: "Ofertas del día",
        coupons: "Cupones",
        flights: "Vuelos",
        electronics: "Electrónica",
        computers: "Ordenadores",
        newReleases: "Novedades",
        seeMore: "Ver más"
    },


    IT: {
        hello: "Ciao, accedi",
        account: "Account e liste",
        returns: "Resi",
        orders: "Ordini",
        search: "Cerca su Amazon",
        location: "Consegna alla tua posizione",
        update: "Aggiorna posizione",
        recommendations: "Consigli personalizzati",
        signIn: "Accedi",
        newCustomer: "Nuovo cliente?",
        startHere: "Inizia da qui.",
        backTop: "Torna su",
        changeLanguage: "Cambia lingua",
        learnMore: "Scopri di più",
        shoppingOn: "Stai acquistando su",
        changeCountry: "Cambia paese/regione",
        all: "Tutti",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "Cellulari",
        deals: "Offerte del giorno",
        coupons: "Coupon",
        flights: "Voli",
        electronics: "Elettronica",
        computers: "Computer",
        newReleases: "Nuove uscite",
        seeMore: "Scopri di più"
    },


    JA: {
        hello: "こんにちは、サインイン",
        account: "アカウント＆リスト",
        returns: "返品",
        orders: "注文履歴",
        search: "Amazonを検索",
        location: "お届け先",
        update: "場所を更新",
        recommendations: "おすすめ商品を見る",
        signIn: "サインイン",
        newCustomer: "新規のお客様ですか？",
        startHere: "こちらから。",
        backTop: "トップへ戻る",
        changeLanguage: "言語を変更",
        learnMore: "詳しくはこちら",
        shoppingOn: "Amazonでお買い物中",
        changeCountry: "国/地域を変更",
        all: "すべて",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "モバイル",
        deals: "本日のセール",
        coupons: "クーポン",
        flights: "フライト",
        electronics: "家電",
        computers: "パソコン",
        newReleases: "新着商品",
        seeMore: "もっと見る"
    },


    ZH: {
        hello: "您好，请登录",
        account: "账户和列表",
        returns: "退货",
        orders: "订单",
        search: "搜索 Amazon",
        location: "配送至您的位置",
        update: "更新位置",
        recommendations: "查看个性化推荐",
        signIn: "登录",
        newCustomer: "新客户？",
        startHere: "从这里开始。",
        backTop: "返回顶部",
        changeLanguage: "更改语言",
        learnMore: "了解更多",
        shoppingOn: "您正在购物",
        changeCountry: "更改国家/地区",
        all: "全部",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "手机",
        deals: "今日优惠",
        coupons: "优惠券",
        flights: "航班",
        electronics: "电子产品",
        computers: "电脑",
        newReleases: "新品",
        seeMore: "查看更多"
    },


    AR: {
        hello: "مرحباً، تسجيل الدخول",
        account: "الحساب والقوائم",
        returns: "المرتجعات",
        orders: "والطلبات",
        search: "البحث في Amazon",
        location: "التوصيل إلى موقعك",
        update: "تحديث الموقع",
        recommendations: "مشاهدة التوصيات الشخصية",
        signIn: "تسجيل الدخول",
        newCustomer: "عميل جديد؟",
        startHere: "ابدأ من هنا.",
        backTop: "العودة إلى الأعلى",
        changeLanguage: "تغيير اللغة",
        learnMore: "اعرف المزيد",
        shoppingOn: "أنت تتسوق على",
        changeCountry: "تغيير الدولة/المنطقة",
        all: "الكل",
        fresh: "Fresh",
        amazonPay: "Amazon Pay",
        mobiles: "الهواتف المحمولة",
        deals: "عروض اليوم",
        coupons: "قسائم",
        flights: "رحلات",
        electronics: "إلكترونيات",
        computers: "أجهزة الكمبيوتر",
        newReleases: "إصدارات جديدة",
        seeMore: "مشاهدة المزيد"
    }

};


/* =========================================================
   CURRENT COUNTRY & LANGUAGE
========================================================= */

let currentCountry =
    localStorage.getItem("amazonCountry") ||
    "India";


let currentLanguage =
    localStorage.getItem("amazonLanguage") ||
    "EN";


/* =========================================================
   LANGUAGE LIST
========================================================= */

function renderLanguageList() {

    const countryData =
        countries[currentCountry];

    if (!countryData) {
        return;
    }


    const languageList =
        document.getElementById(
            "languageList"
        );


    const footerLanguageList =
        document.getElementById(
            "footerLanguageList"
        );


    const createLanguages =
        container => {

            if (!container) {
                return;
            }

            container.innerHTML = "";


            countryData.languages.forEach(
                language => {

                    const item =
                        document.createElement(
                            "label"
                        );


                    item.className =
                        "language-item";


                    item.innerHTML = `

                        <input
                            type="radio"
                            name="amazonLanguage"
                            value="${language.code}"
                            ${currentLanguage === language.code
                                ? "checked"
                                : ""}
                        >

                        <span>
                            ${language.native}
                            -
                            ${language.code}
                        </span>

                    `;


                    item
                        .querySelector("input")
                        .addEventListener(
                            "change",
                            () => {

                                selectLanguage(
                                    language.code
                                );

                            }
                        );


                    container.appendChild(
                        item
                    );

                }
            );

        };


    createLanguages(
        languageList
    );


    createLanguages(
        footerLanguageList
    );

}


/* =========================================================
   SELECT LANGUAGE
========================================================= */

function selectLanguage(
    languageCode
) {

    currentLanguage =
        languageCode;


    localStorage.setItem(
        "amazonLanguage",
        languageCode
    );


    updateLanguageUI();

}


/* =========================================================
   UPDATE LANGUAGE UI
========================================================= */

function updateLanguageUI() {

    const countryData =
        countries[currentCountry];

    if (!countryData) {
        return;
    }


    const language =
        countryData.languages.find(
            item =>
                item.code === currentLanguage
        );

    if (!language) {
        return;
    }


    const text =
        translations[currentLanguage] ||
        translations.EN;


    const topFlag =
        document.getElementById(
            "topCountryFlag"
        );


    const topCode =
        document.getElementById(
            "topLanguageCode"
        );


    if (topFlag) {

        topFlag.textContent =
            countryData.flag;

    }


    if (topCode) {

        topCode.textContent =
            language.code;

    }


    const footerLanguageName =
        document.getElementById(
            "footerLanguageName"
        );


    const footerCountryFlag =
        document.getElementById(
            "footerCountryFlag"
        );


    const footerCountryName =
        document.getElementById(
            "footerCountryName"
        );


    if (footerLanguageName) {

        footerLanguageName.textContent =
            language.name;

    }


    if (footerCountryFlag) {

        footerCountryFlag.textContent =
            countryData.flag;

    }


    if (footerCountryName) {

        footerCountryName.textContent =
            currentCountry === "UnitedStates"
                ? "United States"
                : currentCountry === "UnitedKingdom"
                    ? "United Kingdom"
                    : currentCountry === "UAE"
                        ? "United Arab Emirates"
                        : currentCountry;

    }


    const hello =
        document.querySelector(
            ".nav-signin span"
        );


    const account =
        document.querySelector(
            ".nav-signin strong"
        );


    const returns =
        document.querySelector(
            ".nav-returns span"
        );


    const orders =
        document.querySelector(
            ".nav-returns strong"
        );


    const location =
        document.getElementById(
            "locationText"
        );


    const updateLocation =
        document.querySelector(
            ".add-second"
        );


    if (hello) {
        hello.textContent =
            text.hello;
    }


    if (account) {
        account.textContent =
            text.account;
    }


    if (returns) {
        returns.textContent =
            text.returns;
    }


    if (orders) {
        orders.textContent =
            text.orders;
    }


    if (
        location &&
        !localStorage.getItem(
            "userLocation"
        )
    ) {

        location.textContent =
            text.location;

    }


    if (updateLocation) {

        updateLocation.textContent =
            text.update;

    }


    const search =
        document.getElementById(
            "searchInput"
        );


    if (search) {

        search.placeholder =
            text.search;

    }


    const panelLinks =
        document.querySelectorAll(
            ".panel-link"
        );


    if (panelLinks.length >= 9) {

        panelLinks[0].textContent =
            text.fresh;

        panelLinks[1].textContent =
            text.amazonPay;

        panelLinks[2].textContent =
            text.mobiles;

        panelLinks[3].textContent =
            text.deals;

        panelLinks[4].textContent =
            text.coupons;

        panelLinks[5].textContent =
            text.flights;

        panelLinks[6].textContent =
            text.electronics;

        panelLinks[7].textContent =
            text.computers;

        panelLinks[8].textContent =
            text.newReleases;

    }


    const recommendationTitle =
        document.querySelector(
            ".recommendation-section h2"
        );


    const signIn =
        document.querySelector(
            ".signin-button"
        );


    const recommendationText =
        document.querySelector(
            ".recommendation-section p"
        );


    if (recommendationTitle) {

        recommendationTitle.textContent =
            text.recommendations;

    }


    if (signIn) {

        signIn.textContent =
            text.signIn;

    }


    if (recommendationText) {

        recommendationText.innerHTML = `

            ${text.newCustomer}

            <a
                href="https://www.amazon.in/ap/register"
                target="_blank"
            >
                ${text.startHere}
            </a>

        `;

    }


    const backTop =
        document.querySelector(
            ".back-to-top a"
        );


    if (backTop) {

        backTop.textContent =
            text.backTop;

    }


    document.querySelectorAll(
        ".popup-title strong"
    ).forEach(element => {

        element.textContent =
            text.changeLanguage;

    });


    document.querySelectorAll(
        ".popup-title a"
    ).forEach(element => {

        element.textContent =
            text.learnMore;

    });


    const changeCountryButton =
        document.getElementById(
            "changeCountryButton"
        );


    if (changeCountryButton) {

        changeCountryButton.textContent =
            text.changeCountry;

    }


    const popupCountryName =
        document.getElementById(
            "popupCountryName"
        );


    const footerPopupCountryName =
        document.getElementById(
            "footerPopupCountryName"
        );


    if (popupCountryName) {

        popupCountryName.textContent =
            countryData.domain;

    }


    if (footerPopupCountryName) {

        footerPopupCountryName.textContent =
            countryData.domain;

    }


    const popupCountryFlag =
        document.getElementById(
            "popupCountryFlag"
        );


    const footerPopupCountryFlag =
        document.getElementById(
            "footerPopupCountryFlag"
        );


    if (popupCountryFlag) {

        popupCountryFlag.textContent =
            countryData.flag;

    }


    if (footerPopupCountryFlag) {

        footerPopupCountryFlag.textContent =
            countryData.flag;

    }


    renderLanguageList();

}


/* =========================================================
   COUNTRY LIST
========================================================= */

function renderCountryList() {

    const countryList =
        document.getElementById(
            "countryList"
        );

    if (!countryList) {
        return;
    }


    countryList.innerHTML = "";


    Object.keys(countries).forEach(
        countryKey => {

            const country =
                countries[countryKey];


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "country-item";


            let countryName =
                countryKey;


            if (
                countryKey ===
                "UnitedStates"
            ) {

                countryName =
                    "United States";

            }


            if (
                countryKey ===
                "UnitedKingdom"
            ) {

                countryName =
                    "United Kingdom";

            }


            if (
                countryKey ===
                "UAE"
            ) {

                countryName =
                    "United Arab Emirates";

            }


            item.innerHTML = `

                <span class="country-flag">
                    ${country.flag}
                </span>

                <span>
                    ${countryName}
                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    selectCountry(
                        countryKey
                    );

                }
            );


            countryList.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   SELECT COUNTRY
========================================================= */

function selectCountry(
    countryKey
) {

    currentCountry =
        countryKey;


    const country =
        countries[countryKey];

    if (!country) {
        return;
    }


    currentLanguage =
        country.languages[0].code;


    localStorage.setItem(
        "amazonCountry",
        currentCountry
    );


    localStorage.setItem(
        "amazonLanguage",
        currentLanguage
    );


    updateLanguageUI();

    closeAllPopups();

}


/* =========================================================
   POPUP CONTROLS
========================================================= */

const topLanguageButton =
    document.getElementById("topLanguageButton");

const languagePopup =
    document.getElementById("languagePopup");

const accountButton =
    document.querySelector(".nav-signin");

const accountPopup =
    document.getElementById("accountPopup");

const panelAll =
    document.querySelector(".panel-all");

const amazonSideMenu =
    document.getElementById("amazonSideMenu");

const sideMenuOverlay =
    document.getElementById("sideMenuOverlay");

const sideMenuClose =
    document.getElementById("sideMenuClose");

const footerLanguageButton =
    document.getElementById("footerLanguageButton");

const footerLanguagePopup =
    document.getElementById("footerLanguagePopup");

const footerCountryButton =
    document.getElementById("footerCountryButton");

const countryPopup =
    document.getElementById("countryPopup");

const changeCountryButton =
    document.getElementById("changeCountryButton");


/* =========================================================
   POPUP POSITION
========================================================= */

function positionPopupBelow(button, popup) {

    if (!button || !popup) return;

    const rect =
        button.getBoundingClientRect();

    const popupWidth =
        popup.offsetWidth;

    let left = rect.left;

    if (
        left + popupWidth >
        window.innerWidth - 10
    ) {

        left =
            window.innerWidth -
            popupWidth -
            10;

    }

    if (left < 10) {
        left = 10;
    }

    popup.style.left =
        `${left}px`;

    popup.style.top =
        `${rect.bottom + 8}px`;
}


function positionPopupAbove(button, popup) {

    if (!button || !popup) return;

    const rect =
        button.getBoundingClientRect();

    const popupWidth =
        popup.offsetWidth;

    const popupHeight =
        popup.offsetHeight;

    let left = rect.left;

    if (
        left + popupWidth >
        window.innerWidth - 10
    ) {

        left =
            window.innerWidth -
            popupWidth -
            10;

    }

    if (left < 10) {
        left = 10;
    }

    let top =
        rect.top -
        popupHeight -
        8;

    if (top < 10) {

        top =
            rect.bottom + 8;

    }

    popup.style.left =
        `${left}px`;

    popup.style.top =
        `${top}px`;
}


/* =========================================================
   CLOSE FUNCTIONS
========================================================= */

function closeTopPopups() {

    languagePopup?.classList.remove("show");

    accountPopup?.classList.remove("show");

}


function closeFooterPopups() {

    footerLanguagePopup?.classList.remove("show");

    countryPopup?.classList.remove("show");

}


function closeAllPopups() {

    closeTopPopups();

    closeFooterPopups();

}


/* =========================================================
   TOP LANGUAGE
========================================================= */

if (topLanguageButton) {

    topLanguageButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeFooterPopups();

            accountPopup?.classList.remove(
                "show"
            );

            if (languagePopup) {

                languagePopup.classList.toggle(
                    "show"
                );

                if (
                    languagePopup.classList.contains(
                        "show"
                    )
                ) {

                    positionPopupBelow(
                        topLanguageButton,
                        languagePopup
                    );

                }

            }

        }
    );

}


/* =========================================================
   ACCOUNT & LISTS
========================================================= */

if (accountButton) {

    accountButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeFooterPopups();

            languagePopup?.classList.remove(
                "show"
            );

            if (accountPopup) {

                accountPopup.classList.toggle(
                    "show"
                );

                if (
                    accountPopup.classList.contains(
                        "show"
                    )
                ) {

                    positionPopupBelow(
                        accountButton,
                        accountPopup
                    );

                }

            }

        }
    );

}


/* =========================================================
   ALL SIDEBAR
========================================================= */

if (panelAll) {

    panelAll.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeAllPopups();

            amazonSideMenu?.classList.add(
                "show"
            );

            sideMenuOverlay?.classList.add(
                "show"
            );

            document.body.classList.add(
                "side-menu-open"
            );

        }
    );

}


function closeSideMenu() {

    amazonSideMenu?.classList.remove(
        "show"
    );

    sideMenuOverlay?.classList.remove(
        "show"
    );

    document.body.classList.remove(
        "side-menu-open"
    );

}


if (sideMenuClose) {

    sideMenuClose.addEventListener(
        "click",
        closeSideMenu
    );

}


if (sideMenuOverlay) {

    sideMenuOverlay.addEventListener(
        "click",
        closeSideMenu
    );

}


/* =========================================================
   CHANGE COUNTRY
========================================================= */

if (changeCountryButton) {

    changeCountryButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            languagePopup?.classList.remove(
                "show"
            );

            if (countryPopup) {

                countryPopup.classList.toggle(
                    "show"
                );

                if (
                    countryPopup.classList.contains(
                        "show"
                    )
                ) {

                    positionPopupBelow(
                        changeCountryButton,
                        countryPopup
                    );

                }

            }

        }
    );

}


/* =========================================================
   FOOTER LANGUAGE
========================================================= */

if (footerLanguageButton) {

    footerLanguageButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeTopPopups();

            countryPopup?.classList.remove(
                "show"
            );

            if (footerLanguagePopup) {

                footerLanguagePopup.classList.toggle(
                    "show"
                );

                if (
                    footerLanguagePopup.classList.contains(
                        "show"
                    )
                ) {

                    positionPopupAbove(
                        footerLanguageButton,
                        footerLanguagePopup
                    );

                }

            }

        }
    );

}


/* =========================================================
   FOOTER COUNTRY
========================================================= */

if (footerCountryButton) {

    footerCountryButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeTopPopups();

            footerLanguagePopup?.classList.remove(
                "show"
            );

            if (countryPopup) {

                countryPopup.classList.toggle(
                    "show"
                );

                if (
                    countryPopup.classList.contains(
                        "show"
                    )
                ) {

                    positionPopupAbove(
                        footerCountryButton,
                        countryPopup
                    );

                }

            }

        }
    );

}


/* =========================================================
   OUTSIDE CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".nav-language"
            ) &&
            !event.target.closest(
                ".language-popup"
            )
        ) {

            languagePopup?.classList.remove(
                "show"
            );

        }


        if (
            !event.target.closest(
                ".nav-signin"
            ) &&
            !event.target.closest(
                ".account-popup"
            )
        ) {

            accountPopup?.classList.remove(
                "show"
            );

        }


        if (
            !event.target.closest(
                ".footer-selector"
            ) &&
            !event.target.closest(
                ".footer-language-popup"
            ) &&
            !event.target.closest(
                ".country-popup"
            )
        ) {

            closeFooterPopups();

        }

    }
);


/* =========================================================
   REPOSITION ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            languagePopup?.classList.contains(
                "show"
            )
        ) {

            positionPopupBelow(
                topLanguageButton,
                languagePopup
            );

        }


        if (
            accountPopup?.classList.contains(
                "show"
            )
        ) {

            positionPopupBelow(
                accountButton,
                accountPopup
            );

        }


        if (
            footerLanguagePopup?.classList.contains(
                "show"
            )
        ) {

            positionPopupAbove(
                footerLanguageButton,
                footerLanguagePopup
            );

        }


        if (
            countryPopup?.classList.contains(
                "show"
            )
        ) {

            if (footerCountryButton) {

                positionPopupAbove(
                    footerCountryButton,
                    countryPopup
                );

            }

        }

    }
);

/* =========================================================
   GREAT INDIAN FESTIVAL CAROUSEL
========================================================= */

const dealCarousel =
    document.getElementById(
        "dealCarousel"
    );


const dealPrev =
    document.getElementById(
        "dealPrev"
    );


const dealNext =
    document.getElementById(
        "dealNext"
    );


const dealCards =
    document.querySelectorAll(
        ".deal-card"
    );


let currentDealPage = 0;

const cardsPerPage = 4;


const totalDealPages =
    Math.ceil(
        dealCards.length /
        cardsPerPage
    );


function updateDealButtons() {

    if (!dealPrev || !dealNext) {
        return;
    }

    dealPrev.disabled =
        currentDealPage === 0;


    dealNext.disabled =
        currentDealPage >=
        totalDealPages - 1;

}


function moveDealCarousel(
    direction
) {

    if (!dealCarousel) {
        return;
    }


    currentDealPage += direction;


    if (currentDealPage < 0) {

        currentDealPage = 0;

    }


    if (
        currentDealPage >
        totalDealPages - 1
    ) {

        currentDealPage =
            totalDealPages - 1;

    }


    const targetCard =
        dealCards[
            currentDealPage *
            cardsPerPage
        ];


    if (targetCard) {

        dealCarousel.scrollTo({

            left:
                targetCard.offsetLeft -
                dealCarousel.offsetLeft,

            behavior: "smooth"

        });

    }


    updateDealButtons();

}


if (dealPrev) {

    dealPrev.addEventListener(
        "click",
        () => {

            moveDealCarousel(-1);

        }
    );

}


if (dealNext) {

    dealNext.addEventListener(
        "click",
        () => {

            moveDealCarousel(1);

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();

displayProducts(products);

renderCartPage();

renderCountryList();

updateLanguageUI();

updateDealButtons();