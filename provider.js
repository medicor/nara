var ContentProvider = function() {
	var contentful = require('contentful');

	this.client = contentful.createClient({
		accessToken: '868893066233d012c69668ee330b3ac9404d137f6192c23a4897a7d230aa3a81',
		space: '67syl9ujp44h'
	});

	//	this.request = require('request');
	//	this.mongo = require('mongodb').MongoClient;

	// Create pages with content.
	/*
	this.mongo.connect('mongodb://cloud.medicor.se:27017/nara', function(anError, aDatabase) {
	    if (anError || !aDatabase) {
			console.log(anError);
			return;
	    }
		aDatabase.createCollection('posts', function(anError, aCollection) {
			var posts = [{
				path: 'home',
				content: '\
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
				</p>'
			},{
				path: 'bylaws',
				content: '\
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
					</ul>'
			},{
				path: 'todo',
				content: '\
					<p>TODO:\
					<ul>\
						<li>Nothing left to do right now, really.</li>\
					</ul>\
					</p>'
			}];

		    if (anError || !aCollection) {
				console.log(anError);
				return;
		    }
			aCollection.insert(posts, {w: 0});
			aDatabase.close();
		});
	});
	*/
};
/*
ContentProvider.prototype.find = function(aURL, aCallback) {
	this.mongo.connect('mongodb://cloud.medicor.se:27017/nara', function(anError, aDatabase) {
	    if (anError || !aDatabase) {
			aCallback('<h1>Sorry. No can do.</h1><p>Database cannot be accessed at this momement. Please try again in a while.</p>');
	    }
	    aDatabase.collection('posts').findOne({ path: aURL }, function(anError, aPost) {
	    	if (!aPost) {
				aCallback('<h1>Sorry. No can do.</h1><p>... but we have some fine content <a href="/home">here</a>!</p>');
	    	} else {
				aCallback(aPost.content);
	    	}
			aDatabase.close();
		});
	});
};
*/

/*
ContentProvider.prototype.find = function(aSlug, aCallback) {
	this.request.get({
		url: 'https://cdn.contentful.com/spaces/67syl9ujp44h/entries?access_token=868893066233d012c69668ee330b3ac9404d137f6192c23a4897a7d230aa3a81&content_type=2wKn6yEnZewu2SCCkus4as&fields.slug=' + aSlug,
		json: true
	},
	function(anError, aResponse, anObject) {
		if (!anError && aResponse.statusCode == 200 && anObject.items.length > 0) {
			//console.log(anObject.items[0].fields);
			aCallback(anObject.items[0].fields);
		}
		else {
			aCallback({
				title: '<h1>Sorry. No can do.</h1>',
				body: '<p>... but we have some fine content <a href="/home">here</a>!</p>'
			});
		}
	});
};
*/

ContentProvider.prototype.find = function(aSlug, aCallback) {
	this.client.getEntries({
		'content_type': '2wKn6yEnZewu2SCCkus4as',
		'fields.slug': aSlug
	}).then(anEntryList => {
		if (anEntryList.items.length === 1) {
			aCallback(anEntryList.items[0].fields);
		}
		else {
			aCallback({
				title: '# Sorry. No can do!',
				body: '... but we have some fine content [here](/home)!'
			});
		}
	}).catch(aReason => {
		console.log(aReason);
		aCallback({
			title: '# Hmmm ...',
			body: '... some strange error occured ... hmmm.'
		});
	});
};

exports.ContentProvider = ContentProvider;