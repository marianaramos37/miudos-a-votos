import Axios from "axios";
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Select from 'react-select';

import SearchbarDropdown from "./searchBar";
import Table from 'react-bootstrap/Table'

import { utils, writeFile } from 'xlsx'

class Res extends React.Component {
    state = {
        results: [],
        results1: [],
        results2: [],
        results3: [],
        resultsSec: []
    }

    handleOnExport = () => {
        var wb = utils.book_new()
       
        var ws1 = utils.json_to_sheet(this.state.results1);
        var ws2 = utils.json_to_sheet(this.state.results2);
        var ws3 = utils.json_to_sheet(this.state.results3);
        var wsS = utils.json_to_sheet(this.state.resultsS);

        utils.book_append_sheet(wb,ws1,"1º Ciclo");
        utils.book_append_sheet(wb,ws2,"2º Ciclo");
        utils.book_append_sheet(wb,ws3,"3º Ciclo");
        utils.book_append_sheet(wb,wsS,"Secundário"); 

        writeFile(wb,"ResultadosMiudosAVotos2022.xlsx")
    }

    getResults = () => {
        Axios.get('https://miudos-a-votos.herokuapp.com/api/getresults')
            .then((response) => response.data)
            .then((response) => {
                this.setState({ results: response }, () => {
                    const filtered1 = this.state.results.filter( function(obj) {
                        return obj.ciclo == 1
                    });
                    const filtered2 = this.state.results.filter( function(obj) {
                        return obj.ciclo == 2
                    });
                    const filtered3 = this.state.results.filter( function(obj) {
                        return obj.ciclo == 3
                    });
                    const filteredS = this.state.results.filter( function(obj) {
                        return obj.ciclo == 4
                    });
                    this.setState({ results1: filtered1 })
                    this.setState({ results2: filtered2 })
                    this.setState({ results3: filtered3 })
                    this.setState({ resultsS: filteredS })
                });
            });
    };

    componentDidMount = () => {
        this.getResults()
    };

    render() {
        return (
            <Container className="mt-5" style={this.form_style} >
                <div className="d-grid gap-2">
                <Button className="mb-5 " variant="success" type="submit" onClick={this.handleOnExport}>
                            Baixar dados para excel
                        </Button>
    
    </div>
                <Table size="sm" striped bordered hover>
                    <thead>
                        <tr>
                            <th># Voto</th>
                            <th>Dia e hora</th>
                            <th>Escola</th>
                            <th>Ciclo</th>
                            <th>Livro</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.results.map((info) => {
                        return (
                            <tr key={info.id}>
                                <td>{info.id}</td>
                                <th>{info.data.slice(0, 19).replace('T', ' ')}</th>
                                <td>{info.escola}</td>
                                <td>{info.ciclo}</td>
                                <td>{info.livro}</td>
                                <td>{info.autor}</td>
                            </tr>
                        );
                    })}</tbody>
                </Table>
            </Container>
        )

    }
}

export default Res;
