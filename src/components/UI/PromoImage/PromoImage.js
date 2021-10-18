import classes from './PromoImage.module.css';
import React from 'react';

const promoImage = (props) => {
    return (<div className={classes.Container}>
        <p className={classes.AddText}>Bershka Creators</p>
        {/* <img src="https://static.bershka.net/4/static/itxwebstandard/images/menu/highlight/bskstyle_creators.jpg?t=20211002034007" style={classes.Image} /> */}
    </div>
    )
}

export default promoImage;