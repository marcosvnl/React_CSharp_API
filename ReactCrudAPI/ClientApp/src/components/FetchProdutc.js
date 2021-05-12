import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class FetchProdutc extends Component {
    static displayName = "Produtos";

    constructor(props) {
        super(props);
        this.state = { products: [], loading: true };

    }

    componentDidMount() {
        this.populateProductData();
    }

    static handleEdit(id) {
        window.location.href = "/product/edit/" + id;
    }

    static handleDelet(id) {
        if (!window.confirm("Deseja mesmo deletar esse produto: " + id + "?")) {
            return;
        }

        else {
            fetch('api/products/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-product";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderProduct(products) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="text-success">Código: </th>
                        <th className="text-success">Descrição: </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prod =>
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.description}</td>
                            <td>
                                <button className="btn btn-outline-success mr-3" onClick={(id) => this.handleEdit(prod.id)}>Editar</button>
                                <button className="btn btn-outline-danger" onClick={(id) => this.handleDelet(prod.id)}>Deletar</button>
                            </td>
                        </tr>                           
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p> : FetchProdutc.renderProduct(this.state.products);
        return (
            <div className="bg-secundary p-xl-3">
                <h1 className="text-success" id="tabelLabel">Produtos</h1>
                <p>Listagem de produtos</p>
                <p>
                    <Link to="/add-product">Cadastrar Produto</Link>
                </p>
                { contents }
            </div>
            )
    }

    async populateProductData() {
        const response = await fetch('api/Products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
}
