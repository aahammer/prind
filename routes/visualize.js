
/*
 * GET home page.
 */

exports.visualize = function(req, res){
  res.render('visualize/'+req.params.topic, { page:'visualize', topic:req.params.topic, title: 'PRINDS Visualize' , subtitle: 'Present process data with D3.js'});
};