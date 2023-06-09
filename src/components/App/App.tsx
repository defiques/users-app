import React, {FC} from 'react';
import {Container} from "../../ui/Container";
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import Peoples from "../Peoples/Peoples";
import Pages from "../Pages/Pages";

const App:FC = () => {
    return (
        <Container>
            <SearchBar />
            <Filter />
            <Peoples />
            <Pages />
        </Container>
    );
};

export default App;