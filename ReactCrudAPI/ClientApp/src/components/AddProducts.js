import React, { Component } from 'react';

export class Product {
    constructor() {
        this.id = 0;
        this.description = "";
    }
}

export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", product: new Product(), loading: true };
        this.inicialize();
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    async inicialize() {
        var id = this.props.match.params["id"];

        if (id > 0) {
            const response = await fetch('api/Products/' + id);
            const data = await response.json();
            this.setState({ title: "Editar", product: data, loading: false });
        }
        else {
            this.state = { title: "Novo Produto", product: new Product(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p> : this.renderCreateForm();
        return (
            <div className="bg-secundary p-xl-3">
                <h1 className="text-success">{this.state.title}</h1>
                <h4 className="text-success">Produto</h4>
                { contents }
            </div>
        );
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push("/fetch-product");
    }

    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if (this.state.product.id) {
            const response1 = fetch('api/Products/' + this.state.product.id, { method: 'PUT', body: data })
        /*this.props.history.push("/fetch-product");*/
            .then(json => {
                window.location.href = "fetch-product";
                alert('Produto alterado com Sucesso!');
            })
        }
        else {
            const response2 = fetch('api/Products/', { method: 'POST', body: data })
        /*this.props.history.push("/fetch-product");*/
                .then(json => {
                    window.location.href = "fetch-product";
                    alert('Produto cadastrado com Sucesso!');
                })
        }
    }

    renderCreateForm() {
        return (
            <form onSubmit={ this.handleSave }>
                <div className="form-grup row">
                    <input type="hidden" name="id" value={ this.state.product.id} />
                </div>
                <div className="form-grup row pl-0 mb-3">
                    <div className="col-md-6 ml-0">
                        <input className="form-control" type="text" name="description" defaultValue={ this.state.product.description} required />
                    </div>
                </div>
                <div className="from-grup">
                    <button className="btn btn-outline-success mr-3" value={ this.state.product.id }>Salvar</button>
                    <button className="btn btn-outline-warning" onClick={ this.handleCancel }>Cancelar</button>
                </div>
            </form>
            );
    }
}