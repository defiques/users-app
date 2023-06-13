import React, {FC, useState} from 'react';
import styled from "@emotion/styled";
import {FaAngleLeft, FaAngleRight, FaAngleUp, FaAngleDown} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchPeoples} from "../../features/thunks/PeopleThunk";
import {peopleSlice} from "../../store/reducers/PeopleSlice";
import {css} from "@emotion/react";

const Pages:FC = () => {

    const [visible, setVisible] = useState<boolean>(true);
    const [rows] = useState<number[]>([10, 50, 100])
    const curPage = useAppSelector( s => s.peopleReducer.curPage);
    const [currentPage, setCurrentPage] = useState<number>(curPage);
    const gFilter = useAppSelector( s => s.peopleReducer.activeFGender);
    const nFilter = useAppSelector( s => s.peopleReducer.activeFNation);
    const resultsOnPage = useAppSelector( s => s.peopleReducer.resultsOnPage);
    const { handleSearch, handleResultsNumber } = peopleSlice.actions;
    const maxResults = 100;
    let numberOfPages = Math.floor(maxResults / resultsOnPage) > 10 ? 10 : Math.floor(maxResults / resultsOnPage);
    const dispatch = useAppDispatch();

    const handlePageChangePlus = () => {
        dispatch(fetchPeoples({results: resultsOnPage, page: currentPage + 1, gender: gFilter, nat: nFilter}));
        dispatch(handleSearch(''));
        setCurrentPage(s => s + 1);
    };

    const handlePageChangeMinus = () => {
        dispatch(fetchPeoples({results: resultsOnPage, page: currentPage - 1, gender: gFilter, nat: nFilter}));
        dispatch(handleSearch(''));
        setCurrentPage(s => s - 1);
    };

    return (
        <div className="relative">
            <div className="flex justify-center items-center relative bottom-0 mt-5">
                <PagesArrowWrapper
                    disabled={currentPage === 1}
                    onClick={handlePageChangeMinus}
                >
                    <FaAngleLeft />
                </PagesArrowWrapper>
                <span>{currentPage} of {numberOfPages}</span>
                <PagesArrowWrapper
                    disabled={currentPage === numberOfPages}
                    onClick={handlePageChangePlus}
                >
                    <FaAngleRight />
                </PagesArrowWrapper>
            </div>
            <RowsPerPageWrapper>
                <span>Rows per page:</span>
                <RowsPerPageSelector onClick={() => setVisible(s => !s)}>
                    <span className="mr-2">{resultsOnPage}</span>
                    {!visible && <FaAngleDown />}
                    {visible && <FaAngleUp />}
                    {
                        visible
                        &&
                        <ModalPages>
                            {rows.map((r) => {
                                return (
                                    <ModalPagesBlock
                                        key={r}
                                        active={resultsOnPage === r}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(handleResultsNumber(r));
                                            setVisible(false)
                                        }}
                                    >
                                        {r}
                                    </ModalPagesBlock>
                                )
                            })}
                        </ModalPages>
                    }
                </RowsPerPageSelector>
            </RowsPerPageWrapper>
        </div>
    );
};

const PagesArrowWrapper = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 40px;
  background: #181B22;
  border: 1px solid #303238;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15px;
  cursor: pointer;
`

const RowsPerPageWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 30%;
  display: flex;
  align-items: center;
`

const RowsPerPageSelector = styled.div`
  background: #13161D;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 16px;
  margin-left: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;

const ModalPages = styled.div`
  height: 145px;
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
  bottom: 120%;
  right: -10%;
`;

interface ModalFilterBlockProps {
    active?:boolean
}

const ModalPagesBlock = styled.div<ModalFilterBlockProps>`
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

export default Pages;