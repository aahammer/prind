
/*
 * GET home page.
 */

exports.structure = function(req, res){
  res.render('structure', { page:'structure', title: 'PRINDS' , subtitle: 'a data structure app'});
};