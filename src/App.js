import React from 'react';
import Data from './itemData.js';
import ItemComponent from './itemComponent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom'

import Cart from './cart.js'
class App extends React.Component {
    state={
    todoData:Data,
    cart:[],
    totalPrice:0,
    
    
    }

    handleClick=(e)=>{
        
     
   let repeated=false
       const {cart}=this.state
       
       cart.forEach(item=>{
           if(item.key===e.key){
               item.quantity+=1;
               repeated=!repeated;
           }
          
       })
       
       if(!repeated) {
           cart.push(e)
       
         this.setState({cart:cart})
     }
            this.total()
    }
    
     handleChange=(event,cartItem)=> {
         const {cart}=this.state
       console.log(event.target)
         cart.forEach(item=>{
             if(item.key===cartItem.key){
                 console.log("hiii")
              item.quantity=event.target.value
              console.log(item.quantity)
             }
         })
       this.setState({cart:cart});
         this.total()
  }
    
    total=()=>{
        const {cart}=this.state
        let total=0
        let i=0;
        
        cart.forEach((item)=>{
       
       
           total +=item.price*item.quantity
            i++;
          
        }
        )
     
       return this.setState({totalPrice:total})
        
    }
    
    delete=(e)=>{
        const {cart}=this.state
        let c=0;
        console.log(e.title)
        for(let i=0;i<cart.length;i++){
            if(cart[i].title===e.title){
                 c=i;
                break
            }
           
        }
//        cart.forEach((item)=>{
//            console.log(item.title)
//            if(item.title===e.title){
//                    console.log(i)
//                    
//            }
//            console.log(i)
//            i++;
//        
//        })
        cart[c].quantity=0;
        cart.splice(c,1)
        this.total()
        return this.setState({cart:cart})
        
    }
    render(){
        
        return(
            <Router>
            
            
                <div className="App">
                <header>
           
               <Link to='/' ><h2>Mobile Store</h2></Link>
           
                 <Link to='/cart'><FontAwesomeIcon style={{color:'white',fontSize:'4em'}} icon={faShoppingCart} /> </Link>
           
            </header>
            
            <Route path='/' exact
            render={()=>{
            return(
                <div className="menu-items">
                   {Data.map(item => <ItemComponent item={item} key={item.key} handleClick={this.handleClick}/>)}
           
            
            </div> )}
                }/>
            
           
             <Route path='/cart' exact
            render={()=>{
            return(
                <div className="cart-items">
                <h2 className="shoppingTxt">Shopping Cart</h2>
                <div className="cart-head">
                    <h3>Items</h3>
                    <h3>price</h3>
                
                </div>
                   {this.state.cart.map(item => <Cart item={item} key={item.key} handleChange={this.handleChange} delete={this.delete}/>)}
                <h2 className="total">Subtotal: ${this.state.totalPrice}</h2>
            
            </div> )}
                }/>
           
                </div>
            
            </Router>
        )
    }
 
}

export default App;
