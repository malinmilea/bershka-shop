import React, { useCallback } from "react";
import classes from './FormClothes.module.css';
import { HiStar } from 'react-icons/hi';
import { CSSTransition } from "react-transition-group";
import './CssEffects.css';
import { useForm } from "react-hook-form";
import * as actions from '../../../store/actions/clothes';
import { connect } from "react-redux";

const FormClothes = (props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const { price, ratings } = data;
        props.filterClothes(price, ratings);
        props.filter();
    };

    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={400}
            classNames="fadeSlide">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.Form}>
                    <div>
                        <h4>Price</h4>
                        <fieldset id='price' className={classes.Field}>
                            <div className={classes.Selection}>
                                <input type="radio" id="price" name="price" value="20" {...register("price")} />
                                <label htmlFor="price">More than 20 &#36;</label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="price" name="price" value="30" {...register("price")} />
                                <label htmlFor="price">More than 30 &#36;</label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="price" name="price" value="50" {...register("price")} />
                                <label htmlFor="price">More than 50 &#36;</label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="price" name="price" value="80" {...register("price")} />
                                <label htmlFor="price">More than 80 &#36;</label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="price" name="price" value="100" {...register("price")} />
                                <label htmlFor="price">More than 100 &#36;</label>
                            </div>
                        </fieldset >
                    </div>
                    <div>
                        <h4>Rating</h4>
                        <fieldset id='ratings' className={classes.Field}>
                            <div className={classes.Selection}>
                                <input type="radio" id="1" name="ratings" value="1" {...register("ratings")} />
                                <label htmlFor="ratings">Under 1<HiStar className={classes.Icon} /></label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="2" name="ratings" value="2" {...register("ratings")} />
                                <label htmlFor="ratings">Under 2<HiStar className={classes.Icon} /></label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="3" name="ratings" value="3" {...register("ratings")} />
                                <label htmlFor="ratings">Under 3<HiStar className={classes.Icon} /></label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="4" name="ratings" value="4" {...register("ratings")} />
                                <label htmlFor="ratings">Under 4<HiStar className={classes.Icon} /></label>
                            </div>
                            <div className={classes.Selection}>
                                <input type="radio" id="5" name="ratings" value="5" {...register("ratings")} />
                                <label htmlFor="ratings">Under 5<HiStar className={classes.Icon} /></label>
                            </div>
                        </fieldset >
                    </div>
                </div>
                <input type='submit' value='See results' className={classes.SubmitButton} />
            </form>
        </CSSTransition>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        filterClothes: (price, rating) => dispatch(actions.filterResults(price, rating))
    };
};

export default connect(null, mapDispatchToProps)(FormClothes);