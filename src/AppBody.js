import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";




const AppBody = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [lista, setLista] = useState([]);
    const [alterar, setAlterar] = useState(false)
    const [data_id, setData_id] = useState(0)
    // const [estaNoCarrinho, setEstaNoCarrinho] = useState(false)

    const onSubmit = (data, e) => {
        //adiciona novo atributo
        data.id = new Date().getTime();
        data.comprado = false
        // console.log(data)

        //salvando lista em localStorage
        const listaDeCompras = localStorage.getItem("listaDeCompras")
            ? JSON.parse(localStorage.getItem("listaDeCompras"))
            : "";

        localStorage.setItem("listaDeCompras", JSON.stringify([...listaDeCompras, data]));

        //atualizando lista
        setLista(...lista, data)

        //limpar cada campo
        setValue("produto", "");
        setValue("quantidade", "");
        setValue("preco", "");
    }


    // "efeito colateral", ocorre quando a página é carregada
    useEffect(() => {
        setLista(localStorage.getItem("listaDeCompras")
            ? JSON.parse(localStorage.getItem("listaDeCompras"))
            : []);
    }, []);

    const handleClick = e => {
        //obtém a linha sobre a qual o usuario cliclou, ou seja, qual elemento tr foi clicado
        const tr = e.target.closest("tr")
        //verificando os dados da linha clicada pelo usuário
        // console.log(e.target)
        // console.log(tr)
        // console.log(tr.getAttribute("data-id"));

        const id = Number(tr.getAttribute("data-id"));

        if (e.target.classList.contains("fa-edit")) {
            // console.log("alterar")

            //atribui a cada varieavel do form, o conteudo da linha clicada
            setValue("comprado", tr.cells[0].innerText);
            setValue("produto", tr.cells[1].innerText);
            setValue("quantidade", tr.cells[2].innerText);
            setValue("preco", tr.cells[3].innerText);

            setAlterar(true); //ativa o botão alterar
            setData_id(id);   //qual o id que devemos alterar

        } else if (e.target.classList.contains("fa-minus-circle")) {
            console.log("Excluir")

            //obtém o modelo da linha dobre a qual o usuario cliclou
            const produto = tr.cells[1].innerText

            if (window.confirm(`Confirma a exclusão do produto "${produto}"`)) {
                //aplica um filtro para recperar todas as linha, exeto aquela que foi exluida
                const novaLista = lista.filter((carro) => { return carro.id !== id });

                //atualiza o localStorage
                localStorage.setItem("listaDeCompras", JSON.stringify(novaLista))

                //atualiza a tabela(refresh)
                setLista(novaLista)
            }
        }
    }

    const onUpdate = (data) => {

        const listaDeCompras = JSON.parse(localStorage.getItem("listaDeCompras"))


        const listaDeCompras2 = []

        //for para oegar na lista o id do carro que foi cicado para alteração lá data_id
        for (const lista of listaDeCompras) {
            if (lista.id === data_id) {
                data.id = data_id; //esta sendo carencentado ao data, pois ele não vem com o formulário de entrada
                listaDeCompras2.push(data) // os dados do form(alterados) + data.id
            } else {
                listaDeCompras2.push(lista)
            }
        }

        //atualiza os dados em lcalStorage
        localStorage.setItem("listaDeCompras", JSON.stringify(listaDeCompras2))

        //atualiza a lista(para fazer um refresh na página)
        setLista(listaDeCompras2);

        setValue("comprado", "");
        setValue("produto", "");
        setValue("quantidade", "");
        setValue("preco", "");

        //volta o botão de incluir
        setAlterar(false);

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    <img src="mercado.jpg" alt="Mercado" className="img-fluid mx-auto d-block" />
                </div>
                <div className="col-sm-9 mt-2">
                    <form onSubmit={alterar ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="produto">Produto:</label>
                            <input type="text" className="form-control" placeholder="Nome do produto" id="email"
                                {...register("produto", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 3
                                })}
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantidade">Quantidade</label>
                            <input type="number" className="form-control" placeholder="Quantidade" id="quantidade"
                                {...register("quantidade", {
                                    required: true,
                                })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preco">Preço</label>
                            <input type="number" className="form-control" placeholder="Preço por unidade" id="preco"
                                {...register("preco", {
                                    required: true,
                                })} />
                        </div>

                        <div className="input-group-append">
                            <input
                                type="submit"
                                className={alterar ? "d-none" : "btn btn-primary"}
                                value="Adicionar" />
                        </div>
                        <div className="input-group-append">
                            <input
                                type="submit"
                                className={alterar ? "btn btn-success" : "d-none"}
                                value="Alterar"
                            />
                        </div>
                    </form>
                    <div
                        className={
                            (errors.produto || errors.quantidade || errors.preco) &&
                            "alert alert-danger"
                        }
                    >
                        {errors.produto && (
                            <span>Produto deve ser preenchido (até 20 caracteres); </span>
                        )}
                        {errors.quantidade && <span>Quantidade deve ser preenchida; </span>}
                        {errors.preco && (
                            <span>Preço deve ser preenchido; </span>
                        )}
                    </div>
                </div>


                <table className="table table-striped  mt-2">
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
                        {lista.map((item) => {
                            return (
                                <tr key={item.id}
                                    data-id={item.id}
                                    onClick={handleClick}>
                                    <td>false</td>
                                    <td>{item.produto}</td>
                                    <td>{item.quantidade}</td>
                                    <td>{item.preco}</td>
                                    <td>
                                        <i className="far fa-edit text-success mr-2" title="Alterar"></i>
                                        <i className="fas fa-minus-circle text-danger" title="Excluir"></i>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppBody