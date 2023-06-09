import {IPeople} from "../models/IPeople";

export const fetchFilters = (data: IPeople[], field: 'nationality' | 'gender') => {
    const res: string[] = [];
    for (let i = 0; i < data.length; i++) {
        if (!res.includes(data[i][field])) {
            res.push(data[i][field])
        }
    }
    return res;
};