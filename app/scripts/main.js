var App = App || {};

// var bla = function(){
// 	App.scrollDown();
// 	$(window).off('scroll');
// 	window.setTimeout(function(){
// 		$(window).on('scroll', function(){
// 			bla();
// 		});
// 	},1000);
// };

// $(window).on('scroll', function(){ bla();});


(function(){
	'use strict';

	App = {

		initTeams : function(){
			
			var teamSchema = {
				'name' : 'string',
				'position' : 'string',
				'description' : 'string'
			};
			var url = 'https://docs.google.com/spreadsheet/pub?key=0AvsGYBn6aGTpdENOQTV5UU15aFpoMHlTSlJzWkhvdGc&output=html';
			this.getData(teamSchema, url, function(team){
				var i;
				for (i=0;i<team.length;i++){
					$('#team').append( _.template( $('#teammate-template').html() , team[i] ));
				}
			});

		},

		initOverview : function(){
			var overviewSchema = {
				'background':'string',
				'problem':'string',
				'goal':'string'
			};
			var url = 'https://docs.google.com/spreadsheet/pub?key=0AvsGYBn6aGTpdEJxenJBQk56dG5UdFJ3TzhGR2ZSVWc&output=html';
			this.getData(overviewSchema, url, function(overview){
				$('#overview').append( _.template( $('#overview-template').html() , overview[0] ));
			});
		},

		initResearch : function(){
			var research = {
				'brief' : 'To narrow our scope, we focused on anxiety, mobility and access to information.',
				'map' : ''
			};
			var researchToolsSchema = {
				'tools' : 'string',
				'description' : 'string'
			};
			var url = 'https://docs.google.com/spreadsheet/pub?key=0AvsGYBn6aGTpdG1BbFVBYUhhZ2ZBVTdjY2drOUxBa1E&output=html';
			this.getData(researchToolsSchema, url, function(data){
				research.tools = data;
				$('.toolsintro').append( _.template( $('#research-template').html() , research ));
			});

			var map = L.mapbox.map('map', 'mayakreidieh.hlcd5mek', {'zoomControl':false,infoControl: false})
				.setView([41.083786, -74.98], 7);
			map.scrollWheelZoom.disable();


		},

		getData : function(schema, url, callback){
			var cms = pepper(url, schema);
			cms.sync()
			.then(function(data) {
			    callback(data);
			})
			.fail(function (error) {
			    console.log('Failed to sync: '+ error);
			});
		},

		init: function(){
			// App.initTeams();
			App.initOverview();
			// App.initResearch();

			$( window ).resize(function() {
			});

			// Listen to navigation
			var colors = {
				'main': 'rgba(56,168,221,1)',
				'overview':'rgb(56,160,100)',//green
				'mission':'rgb(100,185,175)',
				'team': '#D15D52', //'rgb(195,75,55)',
				'research':'#F6C637'
			}
			$('.nav').on('click',function(){
				var id = $(this).data('link');
				$('.nav').css({'font-size':'0.8em'});
				$(this).css({'font-size':'0.9em'});
				$('section').css({'background':colors[id]});
				$('html,body').animate({
					scrollTop: $('#'+id).offset().top},
				500, 'linear');
			});

			$('.tools').on('click', function(){
				var id = $(this).data('link');
				console.log(id);
				var t = $( '#' + id.replace(/ /g,"") );
				console.log(t);
				$('.toolsec').fadeOut();
				$(t[0]).fadeIn();
			});

			$('#main').fadeIn();
		},

		scrollDown : function(){
			console.log('scroll down');
			$('#map').fadeOut(300);
			$('#rtitle').fadeOut(300);
			$('#map-overlay').css({'width':'60vw'});
			window.setTimeout(function(){
				$('#info-text').fadeIn(600);
				$('#info-user img').fadeIn(600);
			}, 500);
		}

	};

	App.init();

}());