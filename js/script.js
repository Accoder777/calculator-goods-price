const products = [];

        function addProduct() {
            const name = document.getElementById('productName').value;
            const quantity = parseInt(document.getElementById('productQuantity').value);
            const price = parseFloat(document.getElementById('productPrice').value);

            if (name && quantity > 0 && price >= 0) {
                products.push({ name, quantity, price });
                updateProductList();
                document.getElementById('productForm').reset();
            } else {
                alert("Barcha maydonlarni to'g'ri to'ldiring!");
            }
        }

        function updateProductList() {
            const list = document.getElementById('productList');
            list.innerHTML = '';
            products.forEach((product, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${index + 1}. ${product.name} - ${product.quantity} dona - ${product.price} so'm`; 
                list.appendChild(listItem);
            });
        }

        function goToPage2() {
            if (products.length === 0) {
                alert('Avval mahsulot kiriting!');
                return;
            }
            document.getElementById('page1').classList.add('hidden');
            document.getElementById('page2').classList.remove('hidden');
        }

        function calculateTotal() {
            const method = document.getElementById('method').value;
            const neededProduct = document.getElementById('neededProduct').value;
            const neededQuantity = parseInt(document.getElementById('neededQuantity').value);

            const product = products.find(p => p.name === neededProduct);

            if (!product) {
                alert('Bunday mahsulot topilmadi!');
                return;
            }

            if (neededQuantity > product.quantity) {
                alert('Kerakli miqdor omborda mavjud emas!');
                return;
            }

            let total = 0;

            if (method === 'FIFO') {
                total = neededQuantity * product.price;
            } else if (method === 'AVECO') {
                const totalCost = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
                const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
                const averagePrice = totalCost / totalQuantity;
                total = neededQuantity * averagePrice;
            }

            product.quantity -= neededQuantity;
            updateProductList();

            document.getElementById('result').textContent = `Jami summa: ${total.toFixed(2)} so'm`;
        }
        