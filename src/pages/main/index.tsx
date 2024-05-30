import { useState, useEffect } from 'react';
import { AddItem } from './AddItem';
import { Product } from './Product';
import { CartItem } from './CartItem';

export const cartUrl =     'https://apoteket-test.azurewebsites.net/api/cart' 
const productsUrl = 'https://apoteket-test.azurewebsites.net/api/products'

const Main = () => {
  const [products, setProducts] = useState<Array<Product>>([])
  const [cart, setCart] = useState<{Items:Array<CartItem>, Total:number}>({Items:[], Total:0})
  useEffect(() => {
    fetch(productsUrl, {
      method: "GET",
      mode:"cors",
      credentials: "include",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        "X-Key": "qwerty"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("product list", data)
      setProducts(data)
  })
  }, [])

  return (
    <table>
      <tbody>
      {products
      .filter(p => p.Buyable && p.Name.length > 0)
      .map(p => 
      <tr key={p.Id}>
        <td><AddItem text={p.Name} id={p.Id} setCart={setCart} /></td>
        <td>{p.Description}</td>
        <td>{p.Price}</td>
      </tr>)}
      </tbody>
    </table>
  );
};

export default Main;
