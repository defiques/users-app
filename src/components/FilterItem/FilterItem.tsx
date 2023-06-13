import React, {FC, useState} from 'react';
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {peopleSlice} from "../../store/reducers/PeopleSlice";
import {useAppDispatch} from "../../hooks/redux";
import { FaRegTimesCircle } from "react-icons/fa";
import {IconContext} from "react-icons";

interface FilterProps {
    name: string,
    activeFilter: string,
    filters: string[],
    type: "nationality" | "gender",
}

const FilterItem:FC<FilterProps> = ({ name, activeFilter, filters, type }) => {

    const [visible, setVisible] = useState<boolean>(false);
    const { handleFilter } = peopleSlice.actions;
    const dispatch = useAppDispatch();

    return (
        <div className="relative">
            <FilterMain onClick={() => setVisible(s => !s)}>
                <span>{name} </span>
                {activeFilter !== 'all'
                    ?
                    <>
                        <span className="text-white font-bold ml-2">{activeFilter}</span>
                        <FilterButton
                            onClick={
                            (e) => {
                                e.stopPropagation();
                                dispatch(handleFilter({value: 'all', type: type}));
                            }
                        }>
                            <IconContext.Provider value={{color: "#FFF"}}>
                                <FaRegTimesCircle />
                            </IconContext.Provider>
                        </FilterButton>
                    </>
                    :
                    null
                }

            </FilterMain>
            {visible
                &&
                <ModalFilter>
                    {activeFilter !== 'all'
                        ?
                        <>
                            <ModalFilterBlock key={activeFilter}
                                              onClick={() => {
                                                  dispatch(handleFilter({value: activeFilter, type: type}))
                                                  setVisible(false);
                                              }}>
                                {activeFilter}
                            </ModalFilterBlock>
                            {filters.map((f) => {
                                if (f !== activeFilter) {
                                    return (
                                        <ModalFilterBlock
                                            key={f}
                                            onClick={() => {
                                                dispatch(handleFilter({value: f, type: type}))
                                                setVisible(false);
                                            }}>
                                            {f}
                                        </ModalFilterBlock>
                                    )
                                }
                                return null
                            })}
                        </>
                        :
                        filters.map((f) => {
                                return (
                                    <ModalFilterBlock
                                        key={f}
                                        onClick={() => {
                                                    dispatch(handleFilter({value: f, type: type}))
                                                    setVisible(false);
                                        }}>
                                        {f}
                                    </ModalFilterBlock>
                                )
                            })
                    }
                </ModalFilter>
            }

        </div>
    );
};

const FilterMain = styled.div`
    background: #13161D;
    padding: 7px 16px;
    border-radius: 40px;
    color: #8C8988;
    margin-right: 24px;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 13px;
    display: flex;
    align-items: center;
`;

const ModalFilter = styled.div`
  height: 100px;
  overflow-y: auto;
  position: absolute;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #c7c3c3;
    border-radius: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 16px;
  }

  border: 1px solid #CF7B5A1A;
  padding: 8px;
  border-radius: 16px;
  background: rgba(32, 33, 40, 1);
  width: 94px;
`;

interface ModalFilterBlockProps {
    active?: boolean
}

const ModalFilterBlock = styled.div<ModalFilterBlockProps>`
    font-size: 14px;
    padding: 10px 16px;
    cursor: pointer;
    &:hover {
      background: #13161D;
      border-radius: 16px;
      color: #CF7B5A80;
    }
    ${({active}) =>
          active &&
          css`
            color: #CF7B5A;
            border-bottom: 1px solid #797675;
          `
          
  }
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  width: 17px;
  height: 17px;
  cursor: pointer;
  margin-left: 5px;
`

export default FilterItem;