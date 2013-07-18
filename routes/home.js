exports.home = function(req, res){
    console.log("sgsgsgdsdgsgg "+req.params.topic);
    
    var title  = '';
    var subtitle ='';
    if (req.params.topic === 'overview' ) {
        title = 'Welcome to PRINDS';
        subtitle = 'A small technology demonstration project';
    }
    if ( req.params.topic === 'theory'){
        title = 'Project Technology';
        subtitle = 'Everything you need to know about Process Intelligence';
    }
    if (req.params.topic === 'technology') {
        title = 'Project Theory';
        subtitle = 'Overall architecture and technology roadmap';
    }
    if (req.params.topic === 'contact' ) {
        title = 'Contact';
        subtitle = "Contact information and disclaimer";
    }
  res.render('home/'+req.params.topic, { page:'home', topic:req.params.topic, title:title , subtitle:subtitle});
};