import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import './AppBody.css'



const AppBody = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [lista, setLista] = useState([]);
    const [alterar, setAlterar] = useState(false)
    const [data_id, setData_id] = useState(0)

    const onSubmit = (data) => {
        //adiciona novo atributoS
        data.id = new Date().getTime();
        data.comprado = false

        const listaDeCompras = localStorage.getItem("listaDeCompras")
            ? JSON.parse(localStorage.getItem("listaDeCompras"))
            : "";

        localStorage.setItem("listaDeCompras", JSON.stringify([...listaDeCompras, data]));

        //atualizando lista
        setLista([...lista, data])

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

            //atribui a cada varieavel do form, o conteudo da linha clicada
            setValue("comprado", tr.cells[0].innerText);
            setValue("produto", tr.cells[1].innerText);
            setValue("quantidade", tr.cells[2].innerText);
            setValue("preco", tr.cells[3].innerText);

            setAlterar(true); //ativa o botão alterar
            setData_id(id);   //qual o id que devemos alterar

        } else if (e.target.classList.contains("fa-minus-circle")) {

            //obtém o modelo da linha dobre a qual o usuario cliclou
            const produto = tr.cells[1].innerText

            if (window.confirm(`Confirma a exclusão do produto "${produto}"`)) {

                const novaLista = lista.filter((carro) => { return carro.id !== id });

                localStorage.setItem("listaDeCompras", JSON.stringify(novaLista))

                //atualiza a tabela(refresh)
                setLista(novaLista)
            }
        }
    }


    const onUpdate = (data) => {

        const listaDeCompras = JSON.parse(localStorage.getItem("listaDeCompras"))

        const listaDeCompras2 = []

        for (const lista of listaDeCompras) {
            if (lista.id === data_id) {
                data.id = data_id;
                data.comprado = lista.comprado  //adiciona tbm o comprado = false ou true
                listaDeCompras2.push(data)
            } else {
                listaDeCompras2.push(lista)
            }
        }

        localStorage.setItem("listaDeCompras", JSON.stringify(listaDeCompras2))

        setLista(listaDeCompras2);

        setValue("produto", "");
        setValue("quantidade", "");
        setValue("preco", "");

        //volta o botão de incluir
        setAlterar(false);

    }

    const handleComprado = (e) => {

        //console.log(e.target.value)
        const id = +e.target.value
        const listaDeCompras = JSON.parse(localStorage.getItem("listaDeCompras"))
        // setComprado(comprado = !comprado)

        let novalistaDeCompras2 = []

        for (const protucts of listaDeCompras) {
            if (protucts.comprado === false && protucts.id === id) {
                protucts.comprado = true
                novalistaDeCompras2.push(protucts)
            } else if (protucts.id === id && protucts.comprado === true) {
                protucts.comprado = false
                novalistaDeCompras2.push(protucts)
            } else {
                novalistaDeCompras2.push(protucts)
            }
        }

        localStorage.setItem("listaDeCompras", JSON.stringify(novalistaDeCompras2))

        setLista(novalistaDeCompras2);
    }

    const limparLista = () => {
        // eslint-disable-next-line no-restricted-globals
        const ok = confirm("Deseja limpar a lista de Produtos?")
        if (ok === false) {
            return
        } else {
            localStorage.removeItem("listaDeCompras")
            setLista([])
        }
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
                            <input type="text" className="form-control" placeholder="Nome do produto"
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
                            <input type="number" className="form-control" placeholder="Quantidade"
                                {...register("quantidade", {
                                    required: true,
                                })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preco">Preço</label>
                            <input type="number" step="any" className="form-control" placeholder="Preço por unidade"
                                {...register("preco", {
                                    required: true,
                                })} />
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <div className="input-group-append ">
                                    <input
                                        type="submit"
                                        className={alterar ? "d-none" : "btn btn-outline-primary"}
                                        value="Adicionar"
                                    />
                                </div>
                                <div className="input-group-append">
                                    <input
                                        type="submit"
                                        className={alterar ? "btn btn-outline-success" : "d-none"}
                                        value="Alterar"
                                    />
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <div className="input-group-append ml-4">
                                    <input
                                        type="button"
                                        className="btn btn-outline-danger" onClick={limparLista}
                                        value="Limpar Lista"
                                    />
                                </div>
                            </div>
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
                                    <td> <input type="checkbox" className="form-check-input" onChange={handleComprado} name="comprado" value={item.id} /></td>
                                    {item.comprado ? (
                                        <td className='itemComprado'>
                                            {item.produto}
                                        </td>
                                    ) : <td>
                                        {item.produto}
                                    </td>}
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