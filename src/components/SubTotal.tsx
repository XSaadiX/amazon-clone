import React from "react";
import { NumericFormat } from "react-number-format";
import { useAuth } from "../context/GlobalState";
import { getBasketTotal } from "../context/AppReducer";
import { useNavigate } from "react-router-dom";
import "./SubTotal.css";

function SubTotal() {
  const { basket } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='subtotal'>
      <NumericFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default SubTotal;
