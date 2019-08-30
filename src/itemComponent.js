import React from 'react';


function ItemComponent (props) {
 
        
        return(
                <div className="item">
                    <h2>{props.item.title }</h2>
                     <img src={props.item.imgUrl} alt="Product"/>
                    <p>{props.item.description } </p>
                    <p>{props.item.price }</p>
                    <button onClick={()=>{props.handleClick(props.item)}}>Add to cart</button>
                    
                </div>
        )
    
 
}

export default ItemComponent;
