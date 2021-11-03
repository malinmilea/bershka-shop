import React, { useMemo } from "react";
import classes from './BasketItem.module.css';
import { BsXCircle } from 'react-icons/bs';

const BasketItem = (props) => {

    console.log('second or first', props);
    return (<div className={classes.ItemContainer} data-aos="fade-right">
        <div className={classes.ImageBox}>
            <img src={props.image} className={classes.ImageProd} />
        </div>
        <div className={classes.DataInfo}>
            <BsXCircle className={classes.ExitButton} onClick={() => {
                props.delete(props.id);
            }} />
            <p>{props.title}</p>
            <div className={classes.PriceSize}>
                <p>{props.price} $</p>
                <p>{props.size.split('').sort().join(', ')}</p>
            </div>
        </div>
    </div>)
}

const MemoizedBasketItem = props => {
    return useMemo(() => {
        return <BasketItem {...props} />
    }, [props.image, props.delete])
}

export default React.memo(MemoizedBasketItem, (a, b) => {
    console.log(a.delete === b.delete, 'delete method ');
    return a.delete === b.delete;
});