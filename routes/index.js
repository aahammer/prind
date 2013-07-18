
/*
 * GET home page.
 */

exports.index = function(req, res){

 res.redirect('home/overview');
  //res.render('home/overview', { page:'home', topic:'overview', title: 'PRINDS' , subtitle: 'a process intelligence demonstration space'});
};