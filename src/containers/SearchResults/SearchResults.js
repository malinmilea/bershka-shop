import React, { useEffect, useState } from "react";
import SelectItems from "../../components/UI/SelectItems/SelectItems";
import FormClothes from "../../components/UI/FormClothes/FormClothes";
import Clothes from "../../components/Clothes/Clothes";
import { connect } from "react-redux";
import * as actions from '../../store/actions/clothes';

const SearchResults = (props) => {
    const query = props.match.params.query;
    console.log(props.filters);

    useEffect(() => {
        return () => {
            props.filterResults(null, null);
        }
    }, [props.filterResults]);

    const [visibleFilter, setVisibleFilter] = useState(false);
    const toggleFiltering = () => {
        setVisibleFilter(!visibleFilter);
    }

    return (<div>
        <SelectItems name={query} filter={toggleFiltering} />
        <FormClothes show={visibleFilter} filter={toggleFiltering} />
        <Clothes section={query.toLowerCase()} filtered={true} />
    </div>)
}

const mapStateToProps = state => {
    return {
        filters: state.clothes.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterResults: (price, rating) => dispatch(actions.filterResults(price, rating)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);