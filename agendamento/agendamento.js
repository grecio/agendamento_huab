var agendamentoApp = angular.module('agendamento', ['ui.utils.masks', 'ui.mask', 'firebase']);

agendamentoApp.controller('agendamentoCtrl', function ($scope, $http, $window, $firebaseArray, $firebaseObject) {


    var ref = firebase.database().ref();

    $scope.exibeForm = false;

    $scope.agendamento = {
        siape: null,
        nome: ''
    };


    $scope.data = $firebaseObject(ref);
    $scope.funcionarios = [];
    $scope.horarios = [];
    $scope.agendamentos = null;
    $scope.agendamentoRealizado = null;

    $scope.exibirForm = function () {

        $scope.resetForm();

        $scope.exibeForm = true;
        $scope.agendamentoRealizado = null;

        $scope.data.$loaded()
            .then(function () {

                $scope.funcionarios = $scope.data.funcionarios;
                $scope.horarios = $scope.data.horarios;

                $scope.agendamentos = $firebaseArray(ref.child("agendamentos"));

            })
            .catch(function (err) {
                console.error(err);
            });

    };

    $scope.voltar = function () {
        $scope.exibeForm = false;
        $scope.agendamentoRealizado = null;
    };


    $scope.buscar = function () {

        var item = $scope.funcionarios.filter(function (item) {
            return item.siape === parseInt($scope.agendamento.siape);
        });

        if (item.length)
            $scope.agendamento.nome = item[0].nome;

    };

    $scope.preencherHorarios = function () {
        $scope.agendamento.disponiveis = $scope.horarios[$scope.agendamento.dia].disponiveis;

        console.info($scope.agendamento.disponiveis);
    };

    $scope.agendar = function () {

        console.info($scope.agendamentos[0]);

        $scope.agendamentos.$add({
            siape: $scope.agendamento.siape,
            nome: $scope.agendamento.nome,
            horario: {
                dia: $scope.agendamento.dia,
                hora: $scope.horarioSelectedItem.hora
            }
        }).then(function () {
            $scope.agendamentoRealizado = true;
        });
    };

    $scope.resetForm = function () {

        $scope.agendamento = {
            siape: null,
            nome: ''
        };

        $scope.funcionarios.length = 0;
        $scope.horarios.length = 0;
        $scope.agendamentos = null;
        $scope.agendamentoRealizado = null;

    };

});
