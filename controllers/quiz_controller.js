
var models = require('../models/models.js');

exports.question=function(req,res) {
	models.Quiz.findAll().then( function(quiz) {res.render('quizes/question',{pregunta: quiz[0].pregunta })} );
};


exports.answer=function(req,res) {
	models.Quiz.find(req.params.quizId).then( function(quiz) {
	if (req.query.respuesta === quiz.respuesta ){
		res.render('quizes/answer', {quiz: quiz, respuesta:'Correcto', errors: [] });
	} else {
		res.render('quizes/answer', {quiz: quiz, respuesta:'Incorrecto', errors: [] });	
	}
})
};


exports.author=function(req,res){
res.render('author');
};
// GET /quizes/id:/answer
exports.show= function(req,res) {
	models.Quiz.find(req.params.quizId).then(
	function(quiz) {
		res.render('quizes/show',{quiz: quiz, errors: [] });
	})
	
};

exports.index= function(req,res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs',{quizes: quizes, errors: [] });
	})
};

exports.new= function(req,res) {
	var quiz= models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	res.render('quizes/new',{quiz: quiz, errors: []});
};

exports.create= function(req,res) {
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if (err) {
			res.render('quizes/new',{quiz: quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){res.redirect('/quizes');})
		}
	});


};

exports.edit = function(req,res){
	
	models.Quiz.find(req.params.quizId).then(function(quiz) {
	res.render('quizes/edit',{quiz: req.params.quizId, errors: []});
	} )
};

exports.update = function(req,res){
var quiz=models.Quiz.build(req.body.quiz);


quiz.validate().then(function(err){
		if (err) {
			res.render('quizes/new',{quiz: req.quiz, errors: err.errors});
		} else {
			quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){res.redirect('/quizes');})
		}
	});

}
