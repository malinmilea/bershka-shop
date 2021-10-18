import React, { useEffect, useState } from "react";
import SelectItems from "../../components/UI/SelectItems/SelectItems";
import FormClothes from "../../components/UI/FormClothes/FormClothes";
import Clothes from "../../components/Clothes/Clothes";
import { connect } from "react-redux";
import * as actions from '../../store/actions/clothes';

const MenSection = (props) => {
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
        <SelectItems name="men's clothes" filter={toggleFiltering} />
        <FormClothes show={visibleFilter} filter={toggleFiltering} />
        <Clothes section={"men's%20clothing"} />
    </div>)
}


const mapDispatchToProps = dispatch => {
    return {
        filterResults: (price, rating) => dispatch(actions.filterResults(price, rating)),
    }
}

export default connect(null, mapDispatchToProps)(MenSection);