import {IPeople} from "../models/IPeople";

export const transformData = (data: any):IPeople[] => {

    return data.map( (d: any) => {

        return {
            firstName: d.name.first,
            lastName: d.name.last,
            city: d.location.city,
            country: d.location.country,
            birthDay: new Date(d.dob.date).toLocaleDateString(),
            email: d.email,
            gender: d.gender,
            nationality: d.nat,
            phone: d.phone,
            img: d.picture.medium
        }
    })
};