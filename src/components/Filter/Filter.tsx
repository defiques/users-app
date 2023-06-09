import React, {FC} from 'react';
import FilterItem from "../FilterItem/FilterItem";
import {useAppSelector} from "../../hooks/redux";

const Filter:FC = () => {

    const activeFGender = useAppSelector( s => s.peopleReducer.activeFGender);
    const activeFNation = useAppSelector( s => s.peopleReducer.activeFNation);
    const filterGender = useAppSelector( s => s.peopleReducer.filterGender);
    const filterNation = useAppSelector( s => s.peopleReducer.filterNation);


    return (
        <div className="flex flex-row mb-6">
            <FilterItem
                name="Gender equal"
                activeFilter={activeFGender}
                filters={filterGender}
                type="gender"
            />
            <FilterItem
                name="Nationality"
                activeFilter={activeFNation}
                filters={filterNation}
                type="nationality"
            />
        </div>
    );
};

export default Filter;