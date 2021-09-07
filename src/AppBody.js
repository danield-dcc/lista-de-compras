import React from 'react'


const AppBody = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <img src="mercado.jpg" alt="Mercado" className="img-fluid mx-auto d-block" />
                </div>
                <div className="col-sm-9 mt-2">
                    <form>
                        <div class="form-group">
                            <label for="produto">Produto:</label>
                            <input type="email" class="form-control" placeholder="Nome do produto" id="email" />
                        </div>
                        <div class="form-group">
                            <label for="quantidade">Quantidade</label>
                            <input type="number" class="form-control" placeholder="Quantidade" id="quantidade" />
                        </div>
                        <div class="form-group">
                            <label for="preco">Preço</label>
                            <input type="number" class="form-control" placeholder="Preço por unidade" id="preco" />
                        </div>
                    </form>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Comprado</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppBody