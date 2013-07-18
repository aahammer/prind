
/*
 * GET home page.
 */

exports.analyze = function(req, res){
  res.render('analyze/'+req.params.topic, { page:'analyze', topic:req.params.topic, title: 'PRINDS Analyze' , subtitle: 'Make sense of your process data'});
};