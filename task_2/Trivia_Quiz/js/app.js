(function () {
'use strict';

angular.module('Quiz', [])
	   .controller('QuizController', QuizController);

QuizController.$inject = ['$scope', '$http'];

function QuizController($scope, $http) {
	$scope.questionObj = null;
	$scope.playerAnswer = [];
	$scope.answerInChars = "";
	$scope.isRight = false;
	$scope.isWrong = false;
	$scope.correctAnswers = 0;
	$scope.totalQuestions = 0;

// Get new question 
	$scope.getQuestion = function () {

// Clear player answer 
		$scope.playerAnswer = [];
		$scope.isRight = false;
		$scope.isWrong = false;

		$http.get('https://jservice.io/api/random').then(function (response) {
// Count whitespaces in answer
			if (response.data[0].answer.match(/\s/g)) {
				var whitespaces = response.data[0].answer.match(/\s/g).length;
			} else {
				var whitespaces = 0;
			}
// Accept questions without "<" sign and which's answer has maximum 1 whitespace
// I think those are easier ones			
			if (response.data[0].answer.indexOf('<') !== -1 || whitespaces > 1) {
				$scope.getQuestion();			
			} else {
				// console.log(response.data[0]);
				console.log(response.data[0].answer);				
				$scope.questionObj = response.data[0];
				$scope.answerInChars = $scope.questionObj.answer.split('');
				$scope.shuffled = response.data[0].answer.split('').sort(function(){return 0.5-Math.random()});
				$scope.answerLength = $scope.answerInChars.length;
				$scope.totalQuestions++;
			}
			
		})
	}

// Moves clicked letter to answer area and deletes it from answer letter pool	
	$scope.choose = function (index) {
		$scope.playerAnswer.push($scope.shuffled[index]);
		$scope.shuffled.splice(index, 1);

		if ($scope.playerAnswer.length === $scope.answerLength) {
			for(var i = 0; i < $scope.answerLength; i++) {
				if ($scope.playerAnswer[i] === $scope.answerInChars[i]) {
					continue;
				} else {
					return $scope.isWrong = true;
				}
			}

			$scope.correctAnswers++;
			$scope.isRight = true;
		}
	}

// Moves clicked letter to answer letters pool and deletes from answer area
	$scope.pushBack = function (index) {
		$scope.shuffled.push($scope.playerAnswer[index])
		$scope.playerAnswer.splice(index, 1);
	}
}

})();