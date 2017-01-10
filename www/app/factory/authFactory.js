// /**
//  * Created by nomisnaujpc on 07/01/2017.
//  */
//
// (function () {
//   angular
//     .module('truckApp.Factory',[])
//     .factory('comunFactory', comunFactory);
//   comunFactory.$inject = ['$firebaseAuth'];
//   function comunFactory($firebaseAuth) {
//     return {
//       auth:auth
//     };
//     function auth($firebaseAuth){
//       return $firebaseAuth();
//     }
//   }
// })();

angular
  .module('truckApp.Factory', [])
  .factory("comunFactory", ["$firebaseAuth",
    function ($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);
