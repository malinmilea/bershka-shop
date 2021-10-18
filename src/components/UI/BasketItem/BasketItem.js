import React from "react";
import classes from './BasketItem.module.css';
import { BsXCircle } from 'react-icons/bs';

const basketItem = (props) => {
    return (<div className={classes.ItemContainer} data-aos="fade-right">
        <div className={classes.ImageBox}>
            <img src={props.image} className={classes.ImageProd} />
        </div>
        <div className={classes.DataInfo}>
            <BsXCircle className={classes.ExitButton} onClick={() => props.delete(props.id)} />
            <p>{props.title}</p>
            <div className={classes.PriceSize}>
                <p>{props.price} $</p>
                <p>{props.size.split('').sort().join(', ')}</p>
            </div>
        </div>
    </div>)
}

export default basketItem;