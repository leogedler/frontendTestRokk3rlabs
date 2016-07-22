'use strict';

angular.module('rokkerTest.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analytics', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs : 'view1Ctrl'
  })
}])

.controller('View1Ctrl', ['$http', function($http) {
	var view1Ctrl = this;
	view1Ctrl.dataLabels = [];
	view1Ctrl.dataCount = [];
	view1Ctrl.dataSpeed = [];
	view1Ctrl.dataTime = [];


	// Retrieve data form jason file
	$http.get('activity-data.json').success(function(data) {
	    view1Ctrl.mainInfo = data;


	    for (var i = view1Ctrl.mainInfo.length - 1; i >= 0; i--) {
	    	view1Ctrl.dataLabels.push(view1Ctrl.mainInfo[i].zoneId);
	    	view1Ctrl.dataCount.push(view1Ctrl.mainInfo[i].data.count);
	    	view1Ctrl.dataSpeed.push(view1Ctrl.mainInfo[i].data.speed);
	    	view1Ctrl.dataTime.push(Math.ceil(view1Ctrl.mainInfo[i].data.time/600000000000));
	    };


	    // Bar chart init
		var barChart = document.getElementById("bar");
		var BarChart = new Chart(barChart, {
		    type: 'bar',
		    data: {
		        labels: view1Ctrl.dataLabels,
		        datasets: [{
		            label: 'Número de carros promedio en las calles',
		            data: view1Ctrl.dataCount,
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.2)',
		                'rgba(54, 162, 235, 0.2)',
		                'rgba(255, 206, 86, 0.2)',
		                'rgba(75, 192, 192, 0.2)',
		                'rgba(153, 102, 255, 0.2)'
		            ],
		            borderColor: [
		                'rgba(255,99,132,1)',
		                'rgba(54, 162, 235, 1)',
		                'rgba(255, 206, 86, 1)',
		                'rgba(75, 192, 192, 1)',
		                'rgba(153, 102, 255, 1)'
		            ],
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});



		// Line chart init
		var lineChart = document.getElementById("line");
		var LineChart = new Chart(lineChart, {
		    type: 'line',
		    data: {
		        labels: view1Ctrl.dataLabels,
			    datasets: [
			        {
			            label: "Velocidad promedio en calles",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(75,192,192,0.4)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: view1Ctrl.dataSpeed,
			            spanGaps: false,
			        }
			    ]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});


	
		// Donus chart init
		var donusChart = document.getElementById("donus");
		var DonusChart = new Chart(donusChart, {
		    type: 'doughnut',
		    data: {
			    labels: view1Ctrl.dataLabels,
			    datasets: [
			        {
			            data: view1Ctrl.dataTime,
			            backgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#FFCE56",
			                "#80ff80"
			            ],
			            hoverBackgroundColor: [
			                "#FF6384",
			                "#36A2EB",
			                "#FFCE56",
			                "#80ff80"
			            ]
			        }]
			}

		});


		// Iterations
		var i = setInterval(function(){
		    // do your thing

		    for (var i = view1Ctrl.dataCount.length - 1; i >= 0; i--) {
		    	view1Ctrl.dataCount[i] = Math.floor(Math.random() * 20) + 1;
		    	view1Ctrl.dataSpeed[i] = Math.floor(Math.random() * 50) + 1;
		    	view1Ctrl.dataTime[i] = Math.floor(Math.random() * 5) + 1;
		    };

		    // Update charts
		    BarChart.update();
		    LineChart.update();
		    DonusChart.update();

		}, 60000);

	});



}]);