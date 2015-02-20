var ContentProvider = function() {
	var Firebase = require("firebase"),
		database = new Firebase("https://nara.firebaseio.com/")
/*		,
		posts = database.child('posts');

	posts.set({
		home: '\
			<h2>About us</h2>\
			<div class="pull-right" style="margin: 0 0 1em 1em"><img src="images/image-four-stems.png"></div>\
			<p>The Nordic countries are world leading in the field of National Quality\
				Registers. The registries concerning implant surgery are frequently cited\
				in the international literature and considered to be “role models” for\
				the efforts to initiate similar registries in other countries.</p>\
			<p>Despite the fact that the mission for the registers has been clinical\
				improvement work, there has also been a high research activity. A national\
				observational study has some obvious advantages compared to a RCT: a large\
				number of patients, high statistical power, possibility to perform adequate\
				analyses of uncommon complications and the ability to avoid performance\
				bias.</p>\
			<p>The Nordic Arthroplasty Register Association (NARA) was established in\
				2007. The network’s main target is to further improve and facilitate the\
				Nordic research concerning implant surgery. The first project has been\
				completed, it consists of a compilation of anonymous data for total hip\
				replacement (THR) surgery from Norway, Denmark and Sweden (1995-2006) containing\
				280,000 THRs.</p>\
			<p>NARA aims to perform analyses of the patient demographics of the participating\
				countries, outcome in general and for specific implants and try to construct\
				a standardised “case-mix indicator” to be used in comparisons. Furthermore,\
				to stimulate the PhDstudents from the different countries to use the unique\
				Nordic data in their research activity.</p>\
			<p>\
				<a class="btn btn-default" href="bylaws" role="button">View bylaws &raquo;</a>\
			</p>',
		bylaws: '\
			<h2>The NARA collaboration contract</h2>\
			<h4>Version 4, 12th of December 2007</h4>\
			<ul>\
				<li>The name of the association is Nordic Arthroplasty Register Association\
					(NARA).</li>\
				<li>The members are the national Nordic registers which register arthroplasty\
					and hemiarthroplasty. The aim of the association is to be a place to work\
					for improved quality of arthroplasty surgery in the way of:</li>\
				<ul>\
					<li>A yearly Nordic register meeting</li>\
					<li>An academic seminar at every Nordic Orthopaedic Association meeting every\
						other year</li>\
					<li>Promote joint Nordic research where it will be of common interest and\
						higher the quality</li>\
					<li>Cooperate on method developing in research and quality work in register\
						studies</li>\
				</ul>\
				<li>Coordinate a joint Nordic standpoint towards other international register\
					associations.</li>\
				<li>The steering committee of the association should consist of two representatives\
					from each member country (two voting member from each country and two deputies).\
					The members are elected for two years at the time. There is no limit in\
					the number of times a representative can be elected to the steering committee.\
					The representatives have to be approved of by the mother association of\
					the national register. The meetings in the association should not be restricted\
					to only the members of the steering committee.</li>\
				<li>An executive committee of 3 members (Chairman, secretary and member at\
					large) should be elected at a steering committee meeting every 2th year.\
					The work task of the executive committee shall be to prepare technical\
					details around upcoming meetings.</li>\
				<li>The meeting expenses are covered by the host register. The travel expenses\
					to meetings are covered by the separate national registers.</li>\
			</ul>',
		todo: '\
			<p>TODO:\
			<ul>\
				<li>Nothing left to do right now, really.</li>\
			</ul>\
			</p>'
	});
*/
	this.database = database;
};

ContentProvider.prototype.find = function(aURL, aCallback) {
	this.database.child('posts' + aURL).on('value',
		function(aSnapshot) {
			aCallback(aSnapshot.val());
		}, 
		function () {
			aCallback('<h1>Sorry. No can do.</h1>... but we have some fine content <a href="/home">here</a>?');
		}
	);	
};

exports.ContentProvider = ContentProvider;