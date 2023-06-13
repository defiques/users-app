import React, {ChangeEvent, FC, useState} from 'react';
import {SearchInput} from "../../ui/SearchInput";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";
import {IconContext} from "react-icons";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {peopleSlice} from "../../store/reducers/PeopleSlice";

const SearchBar:FC = () => {

    const search = useAppSelector( s => s.peopleReducer.search);

    const dispatch = useAppDispatch();
    const { handleSearch } = peopleSlice.actions;

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(handleSearch(e.target.value));
    }

    return (
        <SearchBarWrapper>
            <SearchInput
                placeholder="Search"
                value={search}
                onChange={onChangeHandler}
            />
            <IconContext.Provider value={{color: "#797675"}}>
                <SearchBarButton>
                    <FaSearch style={{width: 18, height: 18}}/>
                </SearchBarButton>
            </IconContext.Provider>
        </SearchBarWrapper>
    );
};

const SearchBarWrapper = styled.div`
  position: relative;
  width: 305px;
  height: 60px;
  margin-bottom: 24px;
`

const SearchBarButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  top: 14px;
  right: 14px;
`

export default SearchBar;