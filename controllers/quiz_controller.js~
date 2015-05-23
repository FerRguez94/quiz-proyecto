
var models = require('../models/models.js');


exports.question=function(req,res) {
	models.Quiz.findAll().then( function(quiz) {res.render('quizes/question',{pregunta: quiz[0].pregunta })} );
};


exports.answer=function(req,res) {
	var resultado='incorrecto';
	if (req.query.respuesta === req.quiz.respuesta ){
		resultado='Correcto';
	}		

	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado,errors: []});	
	

};


exports.author=function(req,res){
res.render('author',{quiz: req.quiz,errors: []});
};
// GET /quizes/id:/answer
exports.show= function(req,res) {
	
	res.render('quizes/show',{quiz: req.quiz,errors: []});

	
};

exports.load=function(req,res,next,quizId){
	models.Quiz.find({
		where: {id: Number(quizId)},
		include: [{ model: models.Comment }]
		}).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			} else {
				next(new Error('No existe quizId'));
			}
		})

};
exports.index= function(req,res) {
	var options={};
	if(req.user){
		options.where={UserId: req.user.id}
	}
	if (req.query.search){
		req.query.search.replace(/ /g,'%');
		models.Quiz.findAll({where:["pregunta like ?","%"+req.query.search+"%"],order: '`pregunta` ASC'}).then(function(quizes) {
		res.render('quizes/index.ejs',{quizes: quizes,errors: []});
		})
		
	} else{
		models.Quiz.findAll(options).then(function(quizes) {
			res.render('quizes/index.ejs',{quizes: quizes,errors: []});
		})
	}
};

exports.new= function(req,res) {
	var quiz= models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta",errors: []}
	);
	res.render('quizes/new',{quiz: quiz,errors: []});
};

exports.create= function(req,res) {
	req.body.quiz.UserId=req.session.user.id;
	if(req.files.image) {
		req.body.quiz.image = req.files.image.name
	}
	var quiz=models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if (err){
			res.render('quizes/new',{quiz:quiz, errors:err.errors});
		}else{
			quiz.save({fields: ["pregunta", "respuesta","UserId","image"]}).then(function(){res.redirect('/quizes');})
		}
	})


};
exports.edit=function(req,res){
	var quiz=req.quiz;
	res.render('quizes/edit',{quiz: quiz,errors: []});
};




exports.update= function(req,res) {
	if(req.files.image) {
		req.body.quiz.image = req.files.image.name
	}
	req.quiz.pregunta=req.body.quiz.pregunta;
	req.quiz.respuesta=req.body.quiz.respuesta;
	
	req.quiz.validate().then(function(err){
		if (err){
			res.render('quizes/edit',{quiz:quiz, errors:err.errors});
		}else{
			req.quiz.save({fields: ["pregunta", "respuesta", "image"]}).then(function(){res.redirect('/quizes');})
		}
	})


};

exports.destroy=function(req,res){
	quizId=req.quiz.id;
	models.Quiz.find({
		where: {id: Number(quizId)},
		include: [{ model: models.Comment }]
		}).then(
		function(quiz){
			if(quiz){
				for (i in quiz.Comments)
					quiz.Comments[i].destroy();
				
				quiz.destroy().then( function(){ res.redirect('/quizes');}).catch(function(error){next(error)})
			}
		})
}

exports.ownershipRequired = function(req, res, next) {
	var objQuizOwner=req.quiz.UserId;
	var logUser = req.session.user.id;
	var isAdmin = req.session.user.isAdmin;
	if (isAdmin || logUser===objQuizOwner) {
		next();
	} else {
		res.redirect('/');
	}
};

exports.statistics = function(req,res) {
	
	models.Quiz.count().then(function(preguntas){
			
		models.Comment.count().then(function(comentarios){	
		
			models.Quiz.findAll({
				include: [{ model: models.Comment }]
			}).then(function(quizes){
					quizcomentado=0;
					if(quizes){
						for(i in quizes){
							if (quizes[i].Comments.length)						
								quizcomentado++
						}
						
					} else {
						
					}
					res.render('quizes/statistics',{preguntas:preguntas, comentarios:comentarios, 						quizcomentado:quizcomentado,errors:[]});
				
				})


		})
	})

};
