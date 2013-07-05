
/*
 * GET home page.
 */

exports.analyze = function(req, res){
  res.render('analyze', { title: 'PRINDS' , subtitle: 'analyze event data with regular expressions'});
};