import React, {FC, useState} from 'react';
import styled from "@emotion/styled";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchPeoples} from "../../features/thunks/PeopleThunk";

const Pages:FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const resultsOnPage = useAppSelector( s => s.peopleReducer.resultsOnPage);
    const maxResults = 65;
    let numberOfPages = Math.floor(maxResults / resultsOnPage) > 10 ? 10 : Math.floor(maxResults / resultsOnPage);
    const dispatch = useAppDispatch();

    const handlePageChangePlus = () => {
        dispatch(fetchPeoples({results: resultsOnPage, page: currentPage + 1}));
        setCurrentPage(s => s + 1);
    };

    const handlePageChangeMinus = () => {
        dispatch(fetchPeoples({results: resultsOnPage, page: currentPage - 1}));
        setCurrentPage(s => s - 1);
    };

    return (
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

export default Pages;