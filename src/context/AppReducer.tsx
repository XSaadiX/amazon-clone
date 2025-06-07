export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
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
export interface State {
  basket: BasketItem[];
  user: string | null;
  products: Product[];
}

export const initialState: State = {
  basket: [],
  user: null,
  products: [],
};

interface SetUserAction {
  type: "SET_USER";
  user: string | null;
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

export type Action = SetUserAction | SetProductAction | AddToBasketAction;

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
    default:
      return state;
  }
}

export default AppReducer;
