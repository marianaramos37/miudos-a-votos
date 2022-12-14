import Axios from "axios";
import React from 'react';
import Container from 'react-bootstrap/Container';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';

import SearchbarDropdown from "./searchBar";
import Image from 'react-bootstrap/Image';

class RbeForm extends React.Component {

    state = {
        bookList: [],
        bookListNames: [],
        searchResults: [],
        show: false,
        showAlert: false
    }

    form_style = {
        background: "white",
        boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.25)",
    };

    submitBook(school, year, book, book_author) {
        Axios.post('https://miudos-a-votos.herokuapp.com/api/insert', {
            school: school,
            year: year,
            book_name: book,
            book_author: book_author,
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }).then(() => {
            this.setState({ showAlert: true })
        })
    }

    getBooksList = () => {
        Axios.get('https://miudos-a-votos.herokuapp.com/api/get')
            .then((response) => response.data)
            .then((response) => {
                this.setState({ bookList: response }, () => {
                    const filtered = this.state.bookList.map(({ book_name, book_author, book_id }) => {
                        return book_name + " | " + book_author;
                    });
                    this.setState({ bookListNames: filtered })
                });
            });
    };

    handleSubmit = (e) => {
        e.preventDefault()

        if (!this.state.show && !this.state.bookListNames.includes(e.target[5].value)) {

            e.target[5].value = null
        }
        else {
            let school = e.target[0].value
            var year = 0

            if (e.target[1].checked) { year = e.target[1].id }
            if (e.target[2].checked) { year = e.target[2].id }
            if (e.target[3].checked) { year = e.target[3].id }
            if (e.target[4].checked) { year = e.target[4].id }

            let book = ""
            let book_author = ""
            if (!this.state.show) {
                let values = e.target[5].value.split(' | ')
                console.log(values)
                book = values[0]
                book_author = values[1]
            }
            else {
                book = document.getElementById("novo_livro").value
                book_author = document.getElementById("novo_livro").value
            }
            console.log(book)

            this.submitBook(school, year, book, book_author)
        }
    }


    componentDidMount = () => {
        this.getBooksList()
    };

    onInputChange = (event) => {
        var res = this.state.bookListNames.filter((option) => option.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "").includes(event.target.value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "")))
        this.setState({ searchResults: res })
    };

    setSelection = (event) => {
        this.setState({ show: event.target.checked })
        console.log(event.target.checked)
    };

    escrever = (event) => {
        return (
            <Form.Group className="mb-4" id="escrever">
                <Form.Label className="text-start d-flex" >Preenche nos campos abaixo o t??tulo e nome do autor do livro que queres nomear.</Form.Label>
                <Form.Label className="text-start d-flex" >Nota: se se tratar de um livro de uma cole????o, n??o basta indicares de que cole????o se trata: deves escrever o t??tulo do livro especifico ou o n??mero do volume que queres nomear. Escreve cuidadosamente tudo em mai??sculas.</Form.Label>
                <Form.Control id="novo_livro" name="book_name" placeholder="T??tulo completo do livro" required={this.state.show} />
                <Form.Control id="novo_autor" className="mt-2" name="book_author" placeholder="Autor do livro" required={this.state.show} />
            </Form.Group>
        )
    }

    render() {
        return (
            <Container className="mt-4 p-5" style={this.form_style} >

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.showAlert}>
                    <Modal.Body style={{ background: '#009899', color: "white", paddingBottom: "50px" }} className="text-center">
                        <Image style={{ width: 10 + 'em' }} src={require('../assets/vote.jpg')} />
                        <Modal.Title>Voto registado com sucesso!</Modal.Title>
                        Obrigada pela tua participa????o! Podes fechar a janela do browser.
                    </Modal.Body>
                </Modal>
                <Form onSubmit={this.handleSubmit}>
                    <h2 className="text-start mb-4">Apresenta????o de livros candidatos 2022/2023</h2>
                    <p className="text-start">
                        Este formul??rio serve para registares o livro que gostarias que fosse candidato nesta elei????o de "Mi??dos a votos: quais os livros mais fixes?'.
                    </p>
                    <p className="text-start">Podes escolher qualquer livro, mas s?? podes nomear o teu livro preferido uma ??nica vez.</p>
                    <p className="text-start">A data limite das nomea????es ?? 18 de novembro de 2022, at?? ??s 23:59 horas (Portugal Continental). Se a tua escola ainda n??o se tiver inscrito, fala com o professor bibliotec??rio ou com outro professor, que saber?? como pode faz??-lo.</p>
                    <p className="text-start">Esta ?? uma iniciativa da Vis??o J??nior e da Rede de Bibliotecas Escolares, destinada ??s escolas do 1.??, 2.?? e 3.?? ciclos e do ensino secund??rio, e conta com o apoio da Comiss??o Nacional de Elei????es, do Plano Nacional de Leitura, da Pordata, da R??dio Mi??dos e da Funda????o Calouste Gulbenkian.</p>
                    <p className="text-start mb-4">O regulamento da iniciativa pode ser consultado em <a style={{ color: "black", weight: "bold" }} href="https://www.visaojunior.pt">www.visaojunior.pt</a> e <a style={{ color: "black", weight: "bold" }} href="https://www.rbe.mec.pt/np4/home.html">www.rbe.mec.pt/np4/home.html</a>.</p>
                    <hr className="pt-1" style={{ color: "#cc6400" }} />
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-start d-flex">Nome completo da escola que frequentas *</Form.Label>
                        <Form.Control type="text" name="book_author" placeholder="Escola" required />
                        <Form.Text className="text-muted">
                            Os teus dados n??o ir??o ser divulgados ou partilhados.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4 text-start" controlId="formBasicPassword">
                        <Form.Label className="text-start d-flex">Que ciclo de escolaridade frequentas? *</Form.Label>
                        <Form.Check type="radio" label="1.?? ciclo (1.?? ao 4.?? ano)" id={1} name="group" required />
                        <Form.Check type="radio" label="2.?? ciclo (5.?? ao 6.?? ano)" id={2} name="group" />
                        <Form.Check type="radio" label="3.?? ciclo (7.?? ao 9.?? ano)" id={3} name="group" />
                        <Form.Check type="radio" label="Ensino Secund??rio (10.?? ao 12.?? ano)" id={4} name="group" />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="text-start d-flex">Seleciona da lista o livro mais fixe * </Form.Label>
                        <SearchbarDropdown options={this.state.searchResults} onInputChange={this.onInputChange} isDisabled={this.state.show} />
                    </Form.Group>

                    <Form.Group className="mb-3 text-start d-flex">
                        <Form.Label className="text-start d-flex">Se n??o encontras o livro na lista, carrega aqui: </Form.Label>
                        <Form.Label className="text-light d-flex"> _ </Form.Label>
                        <Form.Check
                            style={{ color: "green", paddingTop: "2px" }}
                            onClick={this.setSelection}
                            type="checkbox"
                        />
                    </Form.Group>

                    {this.state.show ? this.escrever() : null}


                    <div className="d-grid gap-2">
                        <Button variant="success" type="submit" >
                            Submeter
                        </Button>
                    </div>
                </Form>

            </Container>
        )

    }
}

export default RbeForm;
