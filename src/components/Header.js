import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Order";

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach((el) => (summa += Number.parseFloat(el.price)));

  return (
    <>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className="summa">Сума: {new Intl.NumberFormat().format(summa)}₴</p>
      <button className="order-button" onClick={props.onOrder}>
        Оформити замовлення
      </button>
    </>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>Кошик порожній</h2>
    </div>
  );
};

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false);
  const [aboutUsVisible, setAboutUsVisible] = useState(false);
  const [contactsVisible, setContactsVisible] = useState(false);

  const toggleAboutUs = () => {
    if (contactsVisible) setContactsVisible(false); 
    setAboutUsVisible(!aboutUsVisible); 
  };

  const toggleContacts = () => {
    if (aboutUsVisible) setAboutUsVisible(false); 
    setContactsVisible(!contactsVisible); 
  };

  return (
    <header>
      <div>
        <span className="logo">Tasty Food</span>
        <ul className="nav">
          <li onClick={toggleAboutUs}>Про нас</li>
          <li onClick={toggleContacts}>Контакти</li>
        </ul>

        <FaShoppingCart
          style={{ width: "30px", height: "30px" }}
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen && "active"}`}
        />
        {cartOpen && (
          <div className="shop-cart">
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}

        {aboutUsVisible && (
          <div className="popup">
            <button onClick={toggleAboutUs}>X</button>
            <h2>Про нас</h2>
            <p className="popup-text">
              Ми — команда професіоналів у сфері гастрономії, яка прагне
              доставити вам найкращий досвід смачної їжі, яка готується з любов'ю.
              Наш сайт пропонує широкий асортимент страв, від класичних закусок
              до вишуканих десертів.
            </p>
            <p className="popup-text">
              Ми працюємо з доставкою прямо до ваших дверей, щоб ви могли
              насолоджуватися улюбленими стравами в будь-який час, не виходячи з дому.
            </p>
          </div>
        )}

        {contactsVisible && (
          <div className="popup">
            <button onClick={toggleContacts}>X</button>
            <h2>Контакти</h2>
            <p className="popup-text">Телефон для замовлень: +123 456 789</p>
            <p className="popup-text">
              Адреса: вулиця Гастрономії, 10, Київ, Україна
            </p>
            <p className="popup-text">Email: info@tastyfood.com</p>
          </div>
        )}
        <div className="presentation"></div>
      </div>
    </header>
  );
}
