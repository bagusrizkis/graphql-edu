// create products
db.products.insertMany([
    {
        name: "Kaos Polos",
        price: 70000,
        stock: 56,
        description: "Kaos Polos warna putih bersih. Ini deskripsi panjang",
    },
    {
        name: "Keyboard",
        price: 700000,
        stock: 2,
        description: "Keyboard yang keren banget. Ini deskripsi yang panjang",
    },
    {
        name: "Product lain",
        price: 90000,
        stock: 4,
        description: "Ini deskripsi product. Ini deskripsi yang panjang",
    },
]);
