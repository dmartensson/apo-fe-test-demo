import React from 'react';
import { cartUrl } from '.';
import { CartItem } from './CartItem';

export const AddItem = (props: { id: number; text: string; setCart: any; }) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const payload = { 'Id': props.id, 'Quantity': 1 };
    console.log("add", payload);
    e.preventDefault();
    fetch(cartUrl,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "X-Key": "qwerty"
        },
        body: JSON.stringify(payload)
      }).then(() => {
        console.log("fetching cart");
        fetch(cartUrl, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-Key": "qwerty"
          }
        }).then(res => res.json() as Promise<{ Items: Array<CartItem>; Total: number; }>)
          .then(data => {
            console.log("cart", data);
            props.setCart(data);
          });
      });
  };

  return <a onClick={onClick}>{props.text}</a>;
};
