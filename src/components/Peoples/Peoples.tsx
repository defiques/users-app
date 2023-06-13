import React, {FC, useEffect, useState} from 'react';
import styled from "@emotion/styled";
import PeoplesItem from "../PeoplesItem/PeoplesItem";
import {fetchPeoples} from "../../features/thunks/PeopleThunk";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Loader from "../../ui/Loader/Loader";
import {IPeople} from "../../models/IPeople";

const Peoples:FC = () => {

    const dispatch = useAppDispatch();

    const [fPeople, setFPeople] = useState<IPeople[]>([]);
    const currentPage = useAppSelector( s => s.peopleReducer.curPage);
    const resultsOnPage = useAppSelector( s => s.peopleReducer.resultsOnPage);
    const peoples = useAppSelector( s => s.peopleReducer.people);
    const loading = useAppSelector( s => s.peopleReducer.loading);
    const gFilter = useAppSelector( s => s.peopleReducer.activeFGender);
    const nFilter = useAppSelector( s => s.peopleReducer.activeFNation);
    const search = useAppSelector( s => s.peopleReducer.search);


    const dataSearchFilter = (arr: IPeople[], search: string) => {
        if (!search) {
            return arr;
        }
        return arr.filter( (i) => {
            // @ts-ignore
            return Object.keys(i).some(key => i[key].toLowerCase().search(search.toLowerCase()) !== -1);
        })
    }

    useEffect( () => {
        setFPeople(peoples);
    }, [ peoples ])

    useEffect(() => {
        dispatch(fetchPeoples({results: resultsOnPage, page: currentPage, gender: gFilter, nat: nFilter}));
    }, [ gFilter, nFilter, resultsOnPage ]);

    useEffect( () => {
        let result = dataSearchFilter(peoples, search);
        setFPeople(result)
    }, [ search ]);

    return (
        <PeoplesWrapper>
            <table className="w-full border-spacing-y-2 border-separate">
                <thead>
                    <tr>
                        <td className="pl-5">Profile</td>
                        <td>Location</td>
                        <td>Email</td>
                        <td>Birthday</td>
                        <td>Gender</td>
                        <td>Nationality</td>
                        <td>Phone</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading
                            ?
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="loader">
                                <Loader />
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                            :
                            fPeople.map( (p) => {
                                    return <PeoplesItem key={p.email} item={p}/>
                                })
                    }
                </tbody>
            </table>
        </PeoplesWrapper>
    );
};

const PeoplesWrapper = styled.div`
  width: 100%;
  background: #13161D;
  border-radius: 16px;
  padding: 0 12px;
  font-weight: 600;
  color: #DCD8D3;
  font-size: 14px;
  overflow-y: auto;
  thead {
    position: sticky;
    top: 0;
    background: #13161D;
    z-index: 2;
    td {
      padding-top: 20px;
      padding-bottom: 20px;
      color: #8C8988;
      font-weight: 400;
    }
  }
  tbody .loader {
    display: flex;
    justify-content: center;
  }
`

export default Peoples;