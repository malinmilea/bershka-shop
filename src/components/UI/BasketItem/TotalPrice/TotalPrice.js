import React from "react";
import { connect } from "react-redux";
import classes from './TotalPrice.module.css';
import * as actions from '../../../../store/actions/basket';
import { useHistory } from "react-router";
import { toast } from 'react-toastify';

const TotalPrice = (props) => {
    let finalPrice = 0;
    let history = useHistory();
    props.articles.forEach(article => {
        console.log(article.size.length);
        finalPrice += (article.price * article.size.length);
    })

    const processOrder = () => {
        props.sendOrder(props.articles, finalPrice, props.token);
        history.push('/');
        if (props.error) {
            toast.success('You sent the order successfully')
        } else {
            toast.error("Something went wrong!")
        }
    }

    return (
        <div>
            <div className={classes.Box}>
                <p className={classes.Text}>Total <span className={classes.VAT}>(VAT included)</span></p>
                <p className={classes.Text}>{finalPrice.toFixed(2)} $</p>
            </div>
            <div className={classes.OrderButtonBox}>
                <button className={classes.OrderButton}
                    onClick={processOrder}
                >PROCESS ORDER</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        articles: state.basket.articles,
        token: state.auth.token,
        error: state.basket.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendOrder: (articles, totalPrice, token) => dispatch(actions.postOrder(articles, totalPrice, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalPrice);