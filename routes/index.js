
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { page:'home', title: 'PRINDS' , subtitle: 'a process intelligence demonstration space'});
};