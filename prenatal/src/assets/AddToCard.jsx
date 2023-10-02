export default function addToCart(product){
  const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = currentCart.find((item)=>item.id === product.id);
  if(existingProduct){
    console.log('exists')
    existingProduct.quantity +=1;
    // console.log(existingProduct.quantity)
  }else{
    console.log('pushed')
    currentCart.push({...product, quantity:1})
  }

  localStorage.setItem('cart', JSON.stringify(currentCart));
}