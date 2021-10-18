import React, { useState, useEffect } from "react";
import SelectItems from "../../components/UI/SelectItems/SelectItems";
import FormClothes from "../../components/UI/FormClothes/FormClothes";
import Clothes from "../../components/Clothes/Clothes";
import { connect } from "react-redux";
import * as actions from '../../store/actions/clothes';

const WomenSection = (props) => {
    const [visibleFilter, setVisibleFilter] = useState(false);

    const toggleFiltering = () => {
        setVisibleFilter(!visibleFilter);
    }

    useEffect(() => {
        return () => {
            props.filterResults(null, null);
        }
    }, [props.filterResults]);

    return (<div>
        <SelectItems name="women's clothes" filter={toggleFiltering} />
        <FormClothes show={visibleFilter} filter={toggleFiltering} />
        <Clothes section={"women's%20clothing"} />
    </div>)
}

const mapDispatchToProps = dispatch => {
    return {
        filterResults: (price, rating) => dispatch(actions.filterResults(price, rating)),
    }
}

export default connect(null, mapDispatchToProps)(WomenSection);