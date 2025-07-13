import { useState, useEffect } from "react";
import "./Ordres.css";
import { useAuth } from "../context/GlobalState";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { BasketItem } from "../context/AppReducer";

interface Order {
  id: string;
  basket: BasketItem[];
  amount: number;
  created: string;
  paymentIntent: unknown;
}

interface ProductDetails {
  id: number;
  rating: { rate: number; count: number };
}

function Orders() {
  const { state } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<
    Map<number, ProductDetails>
  >(new Map());

  const fetchProductDetails = async (
    productId: number
  ): Promise<ProductDetails | null> => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (state?.user?.uid) {
        try {
          const ordersRef = collection(db, "users", state.user.uid, "orders");
          const q = query(ordersRef, orderBy("created", "desc"));
          const querySnapshot = await getDocs(q);

          const ordersData: Order[] = [];
          const productIds = new Set<number>();

          querySnapshot.forEach((doc) => {
            const orderData = { id: doc.id, ...doc.data() } as Order;
            ordersData.push(orderData);
            orderData.basket.forEach((item) => productIds.add(item.id));
          });

          // Fetch product details for all unique product IDs
          const productDetailsMap = new Map<number, ProductDetails>();
          await Promise.all(
            Array.from(productIds).map(async (productId) => {
              const details = await fetchProductDetails(productId);
              if (details) {
                productDetailsMap.set(productId, details);
              }
            })
          );

          setOrders(ordersData);
          setProductDetails(productDetailsMap);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, [state?.user?.uid]);

  if (!state?.user) {
    return (
      <div className='orders'>
        <div className='orders-container'>
          <h1>Please log in to view your orders</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='orders'>
        <div className='orders-container'>
          <h1>Loading your orders...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='orders'>
      <div className='orders-container'>
        <h1>Your Orders</h1>

        {orders.length === 0 ? (
          <div className='orders-empty'>
            <h2>You haven't placed any orders yet</h2>
            <p>When you place an order, it will appear here.</p>
          </div>
        ) : (
          <div className='orders-list'>
            {orders.map((order) => (
              <div key={order.id} className='order'>
                <div className='order-header'>
                  <div className='order-info'>
                    <h3>
                      Order placed on{" "}
                      {new Date(order.created).toLocaleDateString()}
                    </h3>
                    <p>Order ID: {order.id}</p>
                    <p>Total: ${order.amount.toFixed(2)}</p>
                  </div>
                </div>

                <div className='order-items'>
                  {order.basket.map((item, index) => (
                    <div key={`${item.id}-${index}`} className='order-item'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='order-item-image'
                      />
                      <div className='order-item-details'>
                        <h4>{item.title}</h4>
                        <p className='order-item-price'>
                          ${item.price.toFixed(2)} x {item.quantity} = $
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className='order-item-rating'>
                          {(() => {
                            const details = productDetails.get(item.id);
                            const rating =
                              details?.rating?.rate || item.rating || 0;
                            const count = details?.rating?.count || 0;
                            return (
                              <div>
                                <div className='stars'>
                                  {Array(Math.floor(rating))
                                    .fill(null)
                                    .map((_, i) => (
                                      <span key={i}>⭐</span>
                                    ))}
                                  {rating % 1 !== 0 && <span>⭐</span>}
                                </div>
                                <span className='rating-text'>
                                  {rating.toFixed(1)} ({count} reviews)
                                </span>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
