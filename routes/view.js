
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('view', { title: 'PRINDS' , subtitle: 'a process viewer app'});
};