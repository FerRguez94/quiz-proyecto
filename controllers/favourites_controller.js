var models = require('../models/models.js');


exports.update= function(req,res) {
	var usuario=req.user;
	var quiz=req.quiz.id;

	usuario.hasQuiz(quiz).then(function(result) {
		
		if (result) {
			console.log("el usuario ya lo tiene como favorito");
			models.Favourites.find({where:{ UserId: Number(usuario.id), QuizId: Number(quiz) }}).then(
				function(entrada) {entrada.destroy().then(function(){console.log("destruido")}); });
		} else {	
			usuario.addQuiz(quiz);
			console.log("usuario "+usuario.id+" marco como avorito "+quiz);
		}
	})
	res.redirect("/quizes");

};

exports.show= function(req,res) {
	var usuario=req.user;
	var quizes=[];
	models.Favourites.findAll({ where:{UserId: Number(usuario.id)} }).then(function(entradas){
			for (i in entradas) {
				quizes.push(entradas[i].QuizId);
			}
			console.log("longitud"+quizes.length);
			models.Quiz.findAll( {where:{ id: quizes} }).then(function(quizess){
				res.render('quizes/index.ejs',{quizes: quizess,errors: [],ids:"TodosSonFavoritos"});
			})	
		});

	

}
