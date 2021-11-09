import React from 'react';
import Marquee from 'react-fast-marquee';


const PromoText = (props) => {
    const promoTitleStyle = {
        color: '#00ca8d'
    }
    return (<div style={{
        position: 'fixed',
        bottom: 0,
        zIndex: 2435
    }}>
        <Marquee style={{
            position: 'fixed',
            bottom: 0,
            backgroundColor: 'black',
            color: 'white',
            height: '35px',
            fontSize: '0.8rem'
        }}
            gradient={false}
        ><p>
                • <span style={promoTitleStyle}>FREE HOME DELIVERY</span> On all your orders from 200,00 RON  • <span style={promoTitleStyle}>FREE HOME DELIVERY</span>  On all your orders from 200,00 RON  • <span style={promoTitleStyle}>FREE HOME DELIVERY</span>   On all your orders from 200,00 RON • <span style={promoTitleStyle}>FREE HOME DELIVERY</span> On all your orders from 200,00 RON  • <span style={promoTitleStyle}>FREE HOME DELIVERY</span> On all your orders from 200,00 RON  • <span style={promoTitleStyle}>FREE HOME DELIVERY</span> On all your orders from 200,00 RON
            </p>
        </Marquee>
    </div>)
}

export default React.memo(PromoText, () => true);