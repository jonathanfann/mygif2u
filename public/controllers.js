angular.module('myApp', [])
    .controller('gr8Controller', ['$scope', function($scope) {
        $scope.q = 'Search';
        $scope.doSubmit = function(q, query) {
            console.log(query);
            q = query;
            console.log(q);
        };
    }]);

app.controller('SomeController', ['$scope', 'emails', function($scope, emails) {
    emails.success(function(data) {

        $scope.emails = data;
    });

    $scope.myName = "John";
    $scope.update = function(name) {
        $scope.myName = name;
    };

}]);
