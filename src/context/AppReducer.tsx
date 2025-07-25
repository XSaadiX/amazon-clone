export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: number;
}

export interface BasketItem {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  quantity: number;
}
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface State {
  basket: BasketItem[];
  user: User | null;
  products: Product[];
}

export const initialState: State = {
  basket: [],
  user: null,
  products: [],
};

interface SetUserAction {
  type: "SET_USER";
  user: User | null;
}

interface SetProductAction {
  type: "SET_PRODUCT";
  products: Product[];
}

interface AddToBasketAction {
  type: "ADD_TO_BASKET";
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: number;
    category: string;
  };
}

interface RemoveFromBasketAction {
  type: "REMOVE_FROM_BASKET";
  id: number;
}
interface EmptyBasketAction {
  type: "EMPTY_BASKET";
}

export type Action =
  | SetUserAction
  | SetProductAction
  | AddToBasketAction
  | RemoveFromBasketAction
  | EmptyBasketAction;

function AppReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PRODUCT":
      return {
        ...state,
        products: action.products,
      };

    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, { ...action.item, quantity: 1 }],
      };

    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
}
export const getBasketTotal = (basket: BasketItem[]): number => {
  return basket.reduce((amount, item) => {
    return item.price * item.quantity + amount;
  }, 0);
};

export default AppReducer;
