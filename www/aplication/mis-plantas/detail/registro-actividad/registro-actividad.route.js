(function () {
  'use strict';

  angular.module('app')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('app.mis-plantas.registro-actividad', {
      cache: false,
      url: '/registro-actividad/:id',
      templateUrl: '/aplication/mis-plantas/detail/registro-actividad/registro-actividad.html',
      controller: 'RegistroActividad',
      resolve: {
        planta: function (misPlantasSrv, $stateParams) {
          return misPlantasSrv.getPlanta($stateParams.id);
        },
        estado: function (misPlantasSrv, $stateParams) {
          return misPlantasSrv.obtenerEstado($stateParams.id).then(function (data){
            if(data){
              return data;
            } else{
              return null;
            }
          });
        }
      }
    });
  }
}());
