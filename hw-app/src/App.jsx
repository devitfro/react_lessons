import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import './App.css';

const API_URL = 'http://sunmeat.atwebpages.com/react/api.php';
const queryClient = new QueryClient();

const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

function ProductList({ addToCart }) {
    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const loadMoreRef = useRef(null);

    const fetchProducts = async ({ queryKey }) => {
        const [, page] = queryKey;
        const response = await fetch(`https://fakestoreapi.com/products?limit=12&offset=${(page - 1) * 12}`);
        if (!response.ok) throw new Error('Ошибка загрузки продуктов');
        return response.json();
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['products', page],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (data) {
            setAllProducts((prev) => [...prev, ...data]);
        }
    }, [data]);

    useEffect(() => {
        // IntersectionObserver отслеживает видимость элемента
        // когда элемент становится видимым на 10% (threshold: 0.1) и данные не загружаются (!isLoading),
        // увеличивает номер страницы (setPage), инициируя подгрузку новых данных для бесконечной прокрутки
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [isLoading]);

    if (error) return <div className="error">Ошибка: {error.message}</div>;

    return (
        <div className="product-list">
            <h2>Наши товары:</h2>
            <div className="products">
                {allProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h3>{truncateText(product.title, 30)}</h3>
                        <p className="price">${product.price}</p>
                        <button onClick={() => addToCart(product)} className="add-to-cart">
                            Добавить в корзину
                        </button>
                    </div>
                ))}
            </div>
            {isLoading && <div className="loading">Загрузка...</div>}
            <div ref={loadMoreRef} style={{ height: '20px' }} />
        </div>
    );
}

function Cart({ cart, removeFromCart }) {
    const total = cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2);

    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <span>{truncateText(item.title, 30)}</span>
                            <span>${item.price}</span>
                            <button onClick={() => removeFromCart(item.id)} className="remove-from-cart">
                                Удалить
                            </button>
                        </div>
                    ))}
                    <p className="total">Итого: ${total}</p>
                </div>
            )}
        </div>
    );
}

function App() {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Ошибка загрузки корзины');
                const data = await response.json();
                if (data.error) throw new Error(data.error);
                setCart(data);
            } catch (err) {
                setError(err.message);
            }
        };
        loadCart();
    }, []);

    const addToCart = async (product) => {
        try {
            const newItem = {
                id: product.id,
                title: product.title,
                price: Number(product.price),
                image: product.image,
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) throw new Error('Ошибка добавления в корзину');
            const result = await response.json();
            if (result.error) throw new Error(result.error);

            setCart((prevCart) => [
                ...prevCart,
                {
                    ...newItem,
                    product_id: newItem.id,
                    id: result.id,
                },
            ]);
        } catch (err) {
            setError(err.message);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: cartItemId }),
            });

            if (!response.ok) throw new Error('Ошибка удаления из корзины');
            const result = await response.json();
            if (result.error) throw new Error(result.error);

            setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                <h1>Интернет-магазин ReactExpress</h1>
                {error && <div className="error">Ошибка: {error}</div>}
                <ProductList addToCart={addToCart} />
                <Cart cart={cart} removeFromCart={removeFromCart} />
            </div>
        </QueryClientProvider>
    );
}

export default App;