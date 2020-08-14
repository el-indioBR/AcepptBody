$(function() {

    var operacao = "A"; //"A"=Adição; "E"=Edição

    var indice_selecionado = -1;

    var tbClientes = localStorage.getItem("tbClientes"); // Recupera os dados armazenados

    tbClientes = JSON.parse(tbClientes); // Converte string para objeto

    if (tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
        tbClientes = [];

    function Adicionar() {
        var cli = GetCliente("Codigo", $("#codigo").val());

        if (cli != null) {
            alert("Código já cadastrado.");
            return;
        }

        var cliente = JSON.stringify({
            Codigo: $("#codigo").val(),
            Nome: $("#nome").val(),
            Telefone: $("#titulo").val(),
            Email: $("#texto").val()
        });

        tbClientes.push(cliente);

        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

        alert("Registro adicionado.");
        return true;
    }

    function Editar() {
        tbClientes[indice_selecionado] = JSON.stringify({
            Codigo: $("#codigo").val(),
            Nome: $("#nome").val(),
            Telefone: $("#titulo").val(),
            Email: $("#texto").val()
        });
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Informações editadas.")
        operacao = "A";
        return true;
    }

    function Listar() {
        $("#tblListar").html("");
        $("#tblListar").html(

        );

        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);
            $("#tblListar").append("<div>" +
                "	<img src='/Img/editar_4.png' alt='" + i + "' class='btnEditar'/><img src='/Img/delete.png' alt='" + i + "' class='btnExcluir'/>" +
                "<h1>Código</h1> <p> " + cli.Codigo + "</p>" +
                "<h1>Nome</h1> <p> " + cli.Nome + "</p>" +
                "<h1>Título</h1> <p> " + cli.Telefone + "</p>" +
                "<h1>Texto</h1> <p> " + cli.Email + "</p>" +
                "</div>");
        }
    }

    function Excluir() {
        tbClientes.splice(indice_selecionado, 1);
        localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
        alert("Registro excluído.");
    }

    function GetCliente(propriedade, valor) {
        var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
    }

    Listar();

    $("#form-cadastro").on("submit", function() {
        if (operacao == "A")
            return Adicionar();
        else
            return Editar();
    });

    $("#tblListar").on("click", ".btnEditar", function() {
        operacao = "E";
        indice_selecionado = parseInt($(this).attr("alt"));
        var cli = JSON.parse(tbClientes[indice_selecionado]);
        $("#codigo").val(cli.Codigo);
        $("#nome").val(cli.Nome);
        $("#titulo").val(cli.Telefone);
        $("#texto").val(cli.Email);
        $("#codigo").attr("readonly", "readonly");
        $("#nome").focus();
    });

    $("#tblListar").on("click", ".btnExcluir", function() {
        indice_selecionado = parseInt($(this).attr("alt"));
        Excluir();
        Listar();
    });
});