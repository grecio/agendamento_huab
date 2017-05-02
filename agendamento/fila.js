var agendamentoApp = angular.module('agendamento', ['ui.utils.masks', 'ui.mask', 'firebase', 'angular.filter']);

agendamentoApp.controller('filaCtrl', function ($scope, $http, $window, $firebaseArray, $firebaseObject, $filter) {

    var ref = firebase.database().ref();

    $scope.data = $firebaseObject(ref);
    $scope.agendamentos = [];

    $scope.data.$loaded()
        .then(function (data) {

            angular.forEach(data.agendamentos, function (element) {
                $scope.agendamentos.push({
                    nome: element.nome ? element.nome : '-',
                    siape: element.siape,
                    dia: parseInt(element.horario.dia),
                    hora: element.horario.hora
                });
            });


        })
        .catch(function (err) {
            console.error(err);
        });


    $scope.min = function (arr) {
        return $filter('min')
            ($filter('map')(arr, 'dia'));
    };

});
