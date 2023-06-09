import React, {FC} from 'react';
import styled from "@emotion/styled";
import {IPeople} from "../../models/IPeople";

interface PeoplesItemProps {
    item: IPeople
}

const PeoplesItem:FC<PeoplesItemProps> = ({ item} ) => {
    return (
        <PeopleItemRow>
            <td>
                <img src={item.img} alt={item.img} />
                {item.firstName} {item.lastName}
            </td>
            <td>{item.city} {item.country}</td>
            <td>{item.email}</td>
            <td>{item.birthDay}</td>
            <td>{item.gender}</td>
            <td>{item.nationality}</td>
            <td>{item.phone}</td>
        </PeopleItemRow>
    );
};

const PeopleItemRow = styled.tr`
  background: #181B22;
  td {
    padding:23px 0;
    border: 1px rgba(207, 123, 90, 0.2);
    border-style: solid none solid none;
    &:first-of-type {
      border-style: solid none solid solid;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      padding-left: 17px;
    }
    &:last-of-type {
      border-style: solid solid solid none;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }
  img {
    display: inline-block;
    width: 34px;
    height: 34px;
    border: 1px solid #CF7B5A;
    border-radius: 40px;
    margin-right: 12px;
  }
`

export default PeoplesItem;