(function() {

    $(document).ready(function() {
    
        console.log("visulize page : " + $(location).attr('pathname'));
        if ($(location).attr('pathname') === '/visualize/demonstration') {

            var j = jproc();

            var process = j.Process();

            process.connection(j.processRandomGenerator());

            j.analyze().hierarchy(process);

            var svg = d3.select("#chart-0").append("svg").attr('id','svg-0');;

            $('#chart-0').height($('#chart-0').width() / 2);
            svg.width = $('#chart-0').width();
            svg.height = $('#chart-0').height();
            svg.attr("viewBox", "0 0 " + svg.width + " " + svg.height);

            var standard = Standard(process, svg);

            var svg2 = d3.select("#chart-1").append("svg").attr('id','svg-1');
            $('#chart-1').height($('#chart-0').height()/1.5);
            svg2.width = $('#chart-1').width();
            svg2.height = $('#chart-1').height();
            svg2.attr("viewBox", -(svg2.width/(svg2.width/svg2.height)) +" 0 " + svg2.width + " " + svg2.height)

            adjancedMatrix = AdjacenyMatrix(process, svg2);

        
            $(document).on("click", "#rerun-all", function(){
                $("#svg-0").empty();
                delete standard;
                delete process;
                process = j.Process();
                process.connection(j.processRandomGenerator());
                j.analyze().hierarchy(process);
                standard = Standard(process, svg)
                
                $("#svg-1").empty();
                delete adjancedMatrix;
                adjancedMatrix = AdjacenyMatrix(process, svg2);
            }); 
            
          $(document).on("click", "#rerun-chart-0", function(){
               
                $("#svg-0").empty();
                delete standard;
                delete process;
                process = j.Process();
                process.connection(j.processRandomGenerator());
                j.analyze().hierarchy(process);
                standard = Standard(process, svg)
            }); 
            
         $(document).on("click", "#rerun-chart-1", function(){
                
                $("#svg-1").empty();
                delete adjancedMatrix;
                adjancedMatrix = AdjacenyMatrix(process, svg2);
            }); 
        }
        
   
    });
})();



jproc = function() {

  var jproc = {}; 

   Array.prototype.contains = function(id) {



    var r = this.filter(function (e) { return e.id == id;});

    if (r.length > 0) return r[0];
    else return false;

   };

    Array.prototype.addItem = function(item) {
      if (!this.contains(item.id)) { this.push(item); return true;}
      return false;
    };

   function Connection(source, target) {

    this.id = source.id + '->' + target.id;  
    this.source = source;
    this.target = target;

    this.data = {};
 
   };

  function Activity(name) {
     this.id = name;
     this.source = [];
     this.target = [];

     this.data = {};

     this.x = 0;
     this.y = 1;
     this.fixed = false;

  
     this.max = {x:500, y:500};
     this.min = {x:0, y:0}


     this.fx = function (){
        if (!this.fixed) return (this.x < this.max.x) ? Math.max(this.min.x, this.x) : Math.min(this.max.x, this.x);
        return this.x; 
      };


     this.fy = function (){
        if (!this.fixed) return (this.y < this.max.y) ? Math.max(this.min.y, this.y) : Math.min(this.max.y, this.y); 
        return this.y;
      };

   };


  jproc.analyze = function() {

    analyze = {};

    var start = function(process) {
      var start = [];
      process.activity().forEach( function(a) { //console.log(a.source);

        if (a.source.length == 0) start.push(a); });
      return start;
    };

    var end = function(process) {
      var end = [];
      process.activity().forEach( function(a) { //console.log(a.source);

        if (a.target.length == 0) end.push(a); });
      return end;
    };
    
   var breadthfirst = function(activity, func)
    {

      function recurse(current, func, l, count, tmp) {


        var next = [];

        // arbeite alle knoten ab
        current.forEach(function(a,i){   
         
          if ( ! (a.id in tmp)) {
        
            // merke dir wer bereits besucht wurde
            func(a,l,i,count);
            tmp[a.id] = 'visited';
            next = next.concat(a.target);
            count++;
          }
        });

        // gib die tiefe zurueck
        if (next.length == 0) return l;
        return recurse(next, func,l+1, count, tmp);

      }

      var tmp = {};
      return recurse(activity, func, 1, 1, tmp);
    };
 

    analyze.hierarchy = function(process) {

      process.start = [];
      process.end = [];

      var depth = breadthfirst(start(process), function(a,l,i,c){
        a.level = l;
        a.levelIndex = i;
        a.breadthIndex = c;

        if (a.source.length == 0) {
          a.isStartNode = true;
          process.start.push(a);
        }
        else a.isStartNode = false;
        if (a.target.length == 0) {
          a.isEndNode = true;
          process.end.push(a);
        }
        else a.isEndNode = false;
      });

      process.depth = depth;
      process.end[0].level = depth;

    }

    return analyze;
  }

  


  jproc.Process = function() {  


    if(false === (this instanceof jproc.Process)) {
        return new jproc.Process();
    }

    var activity = [];
    var connection = [];




    this.activity = function(){return activity;};

    this.connection = function(x) {

      if (!arguments.length) return connection;

      x.forEach( function(v) {  
        if (!connection.contains(v.source + '->' + v.target)  && !(v.source == v.target)   ) {
          var source = activity.contains(v.source) || 
                      (function() { var a = new Activity(v.source); activity.push(a); return a;})();
          var target = activity.contains(v.target) || 
                      (function() { var a = new Activity(v.target); activity.push(a); return a;})();

          source.target.addItem(target);
          target.source.addItem(source);

          connection.push(new Connection(source, target));
        }
      });

 

      return this;
    
    };

  };

   function PEvent() {
     this.timestamp;
     this.trace;
     this.activity;
   };


  jproc.PEventlog = function() { 
    var pevents = [];
  };




  jproc.processRandomGenerator = function() {



  var count = 5; var level =5;

  var max = {index:count-1, level:level-1};

  var matrix = [];
  for (var i = 0; i < level;i++){
    matrix[i] = [];
  }
  matrix[0][0] = [];
  matrix[0][1] = [];
  matrix[0][2] = [];

  linkDistance = function (){ 
                    var  d = Math.floor(d3.random.normal(1,1)());
                    return (d < 1) ? 1 : d;
                };
  linkNumber = function() {return Math.floor(d3.random.normal(1, 1)())};


  function createActivities(matrix, level) {

    matrix[level].forEach(function (a, index){
      if (!(typeof a == 'undefined')) {     
        var i = 0;
        var linkNumber= Math.floor(d3.random.normal(1, 1)());

        do { 
          targetIndex = Math.floor(Math.random() * (count));
          targetLevel = Math.min(linkDistance() + level, max.level);
          targetLevel = targetLevel < 1 ? 1 : targetLevel;

            if (level == max.level) {
               matrix[level][index].push(
                 {source:{level:level,index:index}, target:{level:'E', index:'E'}}
                 );
            }
    
            else {
               matrix[targetLevel][targetIndex] = [];
               matrix[level][index].push(
                 {source:{level:level,index:index}, target:{level:targetLevel, index:targetIndex}}
                 );
            }

    

          //console.log('['+level+','+index+']'+ '->' +'['+targetLevel+','+targetIndex+']');
          i++; 
        } 
        while ( i < linkNumber )
      }
    });

    if (level < max.level) createActivities(matrix, level+1);
  } 
  createActivities(matrix,0);

  var c = [];
  matrix.forEach(function (matrixLevel, levelIndex){
    matrixLevel.forEach(function (a, index){
      if (typeof a === 'object' && levelIndex <= max.level) {
  
         if (levelIndex == max.level) {
            a.forEach(function (e, i) { 
              // e.target.level = max.level +1;
               c.push({source:'A'+e.source.level+''+e.source.index,target:'End'});
            });
         } 
         if (levelIndex == 0) {
            a.forEach(function (e, i) { 
               c.push({source:'Start',target:'A'+e.target.level+''+e.target.index}); 
            });
         } 
         if (!(levelIndex == max.level) && !levelIndex == 0) {
            a.forEach(function (e, i) { 
                  c.push(
                     {source:'A'+e.source.level+''+e.source.index,
                      target:'A'+e.target.level+''+e.target.index});
            });
         }
            
      }
    });
  });

 
  return c;
}

  return jproc;

};







  var Standard = function(process, svg) {
      standard = {}, process = process, svg =svg, view = svg.selectAll().append("svg:g") ;

      var initializeData = function() {

         process.activity().forEach(function(a) {
            if (a.isStartNode || a.isEndNode) {
              a.min.x = 0; a.max.x = svg.width;
              a.min.y = 0; a.max.y = svg.height;
            } else {
              a.min.x = svg.width * ( 1 / (process.depth * 2));
              a.max.x = svg.width * ( 1 - (1 / (process.depth * 2)));
              a.min.y = svg.height*0.05;
              a.max.y = svg.height - svg.height*0.05;
            }
          });


         var scale = {  x:d3.scale.linear().domain([0,1]).range([0,svg.width]),
                        y:d3.scale.linear().domain([0,1]).range([0,svg.height]),
                        r:d3.scale.linear().domain([0,1]).range([0,(svg.height+svg.width)/2])
         };
         
         process.activity().forEach( function (a) {

            var r =  0.2 / ( Math.log(process.activity().length + 8/process.activity().length) 
                      * Math.log(process.activity().length
            ));
            x = Math.random(); y = Math.random();
            if (a.isStartNode) { 
               x = 1 / (process.depth * 2);
               y = 0.5;
            };
            if (a.isEndNode) {  
               x = 1 - (1 /  (process.depth *2));
               y = 0.5;
            };
            a._x=x; 
            a._y=y;
            a._r=r;
         });

       
         process.activity().forEach( function(a) {
            a.x = scale.x(a._x);
            a.y = scale.y(a._y);
            a.r = scale.r(a._r);
         });
      };


      var initializeView = function() {
/*

<defs><marker id="myMarker" viewBox="0 0 10 10" refX="1" refY="5" 
  markerUnits="strokeWidth" orient="auto"
  markerWidth="4" markerHeight="3">
  <polyline points="0,0 10,5 0,10 1,5" fill="darkblue" />
</marker></defs>
.... 
<line x1="20" y1="10" x2="130" y2="140" stroke="blue" 
  stroke-width="20" marker-end="url(#myMarker)" /> */

         view.defs = svg.append("svg:defs");

         view.marker = view.defs.append("svg:marker")
                        .attr("id", 'marker')
                         .attr('viewBox', '0 0 10 10')
                        .attr('refX', 9)
                        .attr('refY', 5)
                        .attr('markerUnits', 'strokeWidth')
                        .attr('orient', 'auto');
         view.marker.append("svg:polyline").attr("points", '0,0 10,5 0,10 1,5' ).attr('fill', 'black' );

         view.line =  svg.selectAll().data(process.connection()).enter().append("svg:line");
         view.path = svg.selectAll().data(process.connection()).enter().append("svg:path");

         view.activity = svg.selectAll().data(process.activity()).enter().append("svg:g");
         view.activity.circle = view.activity.append("svg:circle");
         view.activityLabel = svg.selectAll().data(process.activity()).enter().append("svg:g");
         view.activityLabel.textBox = view.activityLabel.append("svg:rect");
         view.activityLabel.text = view.activityLabel.append("svg:text");

      };

      var draw = function() {


     
         var normalize = function(v, value) {
            var length = Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2));
            return (length - value) / length;
         } 
         /* find a point on a line described by two points. */
          /* The point is determined by value offset at the end of line */
          var scale = function(p1, p2, off) {

            var pt =  {x:0,y:0};

            pt.x = p2.fx() - p1.fx();
            pt.y = p2.fy() - p1.fy();

            var s = normalize(pt, off);

            return  {x:(pt.x*s)+p1.fx(), y:(pt.y*s)+p1.fy()};
          }   

         view.marker.attr('markerWidth', process.activity()[0].r /1.7)
                    .attr('markerHeight', process.activity()[0].r /1.7);

         view.line.attr("x1", function(c) { return c.source.fx()})
                  .attr("y1", function(c) { return c.source.fy()})
                  .attr("x2", function(c) { return scale(c.source, c.target, c.target.r+2).x})
                  .attr("y2", function(c) { return scale(c.source, c.target, c.target.r+2).y})
                  .attr('marker-end', "url(#marker)")
                  .style("stroke", "rgb(20,20,20)")
                  .attr("stroke-width",1);


         view.activityLabel.text.text(function(a) { 
                  a.textLength = this.getComputedTextLength();return a.id;
               })
               .attr("y",function(a){ return a.r*1.8;});

          view.activityLabel.textBox.attr("width", function(a) {return a.textLength+3}).attr("height", 11)
              .attr("transform", function (a) { 
                  return "translate ("+ (-1) +','+((a.r*1.8) -9)+")";
               })
              .attr("fill", "rgb(255,255,255)").attr("opacity", 0.9)
              .attr("rx",4).attr("ry",4).attr("z-index", 100);

          view.activity.circle.attr("r", function(a) {return a.r;}).attr("fill", "rgb(255,20,20)").attr("opacity", 1);
          view.activityLabel.attr("transform", function (a) { return "translate ("+a.fx()+','+a.fy()+")";});
          view.activity.attr("transform", function (a) { return "translate ("+a.fx()+','+a.fy()+")";});
       };
       //this.redraw();


     
      var animate = function() {
  
         var simpleProcess = d3.layout.simpleProcess()
            .activity(process.activity())
            .connection(process.connection())
            .size([svg.width, svg.height])
            .depth(process.depth)
            .numberOfActivties(process.activity().length)
            .start();

         simpleProcess.force().on("tick", draw); 
         draw();
         view.activity.call(simpleProcess.force().drag());

      
      };

      initializeData();
      initializeView();
      draw();
      animate();
      
      return standard;
   };






   var AdjacenyMatrix = function(process, svg) {

      //Storage variables
      var adjacenyMatrix = {}, process = process, svg = svg, view = svg.append("svg:g");
      
      //Layout -> textLength should be calculated of maximum svg text length
      var textLength = 30;
      var slotSize = (svg.height - textLength) / (process.activity().length + 0.5); 
      var cellSize = slotSize*0.8;

   
      // ADD DATA TO PROCESS
      // adds adjacency information to activities
      var generateData = function() {
         var end = false;
         process.activity().sort(function(a1,a2) {return a1.breadthIndex > a2.breadthIndex}).forEach(function(a) {
               if (a.isEndNode) { end = true; a.adjacencyIndex = process.activity().length; return; }
               if (end)  a.adjacencyIndex = a.breadthIndex-1;
               else a.adjacencyIndex = a.breadthIndex;
         });
      }


      // helper to get get activities in adjacenceOrder
      var sortActivity = function() { return process.activity().sort(function(a1,a2) {
                                             return (a1.adjacencyIndex < a2.adjacencyIndex) ? -1 : 1;
                                          });
                                    };
      // helper functions to calculate matrix rows and colums from linear index
      var row = function(i) {
         return i % process.activity().length;
      }
      var column = function(i) {
         return Math.ceil((i+1) / process.activity().length)-1;
      }

      var initializeView = function() {
          //All different display view
         // levelbars -> creates a spanning data element from adjanced activities
         view.level = view.selectAll('.level')
                           .data( function(e) { 
                              var level = [], currentLevel = 0, span = 0, offset = 0;
                              sortActivity().slice(0,-1).forEach(function(a){
                                 if (a.level > currentLevel) {
                                   span = 0;
                                   currentLevel++;
                                   level.push({offset:offset});
                                 } 
                                 offset++;
                                 level[currentLevel-1].span = ++span;
                              });
                              level.push({span:1,offset:offset});
                              return level;
                           }).enter().append("svg:rect");

          // slots are all matrix cells, empty or not. cells conatin a connection
          view.slot = view.selectAll().data(new Array(process.activity().length*process.activity().length)).enter().append("svg:g");
          view.slot.rect = view.slot.append("svg:rect").attr('rx',cellSize/8).attr('ry',cellSize/8);
          view.cell = view.selectAll().data(process.connection()).enter().append("svg:g");
          view.cell.rect = view.cell.append("svg:rect").attr('rx',cellSize/8).attr('ry',cellSize/8);
          // labels for x and y axis
          view.label = {};
          view.label.x = view.selectAll().data( function(e) { return sortActivity(); }).enter().append("svg:text");
          view.label.y = view.selectAll().data( function(e) { return sortActivity(); }).enter().append("svg:text");
          view.diagonal = view.append("svg:line");
      }

    
      var draw = function() {


         view.attr("transform", "translate ("+textLength+","+slotSize/2+")");
         view.level.attr("width", function(l,i) { return (slotSize/2) + ((slotSize) * (l.span -1)) })
                   .attr("height",function() { return textLength + slotSize * process.activity().length+slotSize/2})
                   .attr("class", "level")
                   .attr("transform", function(l) {
                     var s = (slotSize * l.offset) + (slotSize / 4);
                     var t = -slotSize*0.5 ;
                     return 'translate (' + s + ',' + t +')';
               })
         view.label.y.text( function(a){ return a.id;} )
               .attr( "x", function(a,i){ return -30;} )
               .attr( "y", function(a,i){ return (slotSize/2+3)+(row(i) *slotSize)} );
         view.label.x.text( function(a){ return a.id;} )
               .attr("transform", function() {return 'translate(0,'+ process.activity().length * slotSize +') rotate (-90)'})
               .attr( "x", function(a,i){ return -25}) // )
               .attr( "y", function(a,i){ return (slotSize/2+3)+(row(i) *slotSize)} );
         view.slot.attr("transform", function(e,i) {
             var s = slotSize * row(i);
             var t = slotSize * column(i); 
             return 'translate (' + s + ',' + t +')';
           });
         view.slot.rect.attr("class", function(e,i) { 
                         if (row(i) == column(i)) return "diagonal";
                         return "slot";
                       })
                       .attr("width", slotSize)
                       .attr("height", slotSize);
         view.cell.attr("transform", function(c) {
             var s = 0* slotSize * (c.target.adjacencyIndex-1) + ((slotSize - cellSize) / 2);
             var t = slotSize * (c.source.adjacencyIndex -1) +((slotSize - cellSize) / 2);;
             return 'translate (' + s + ',' + t +')';
           });
         view.cell.rect.attr("class", "cell").attr("width", cellSize).attr("height", cellSize);
         view.diagonal.attr("x1", 0).attr("y1", 0)
                      .attr("x2", slotSize * process.activity().length)
                      .attr("y2", slotSize * process.activity().length)
                      .style("stroke", "#999"); 
       }

      var animate = function() {
         
         view.cell.transition().delay(0).duration(2000).ease('exp').attr("transform", function(c) {
             var s = slotSize * (c.target.adjacencyIndex-1) + ((slotSize - cellSize) / 2);
             var t = slotSize * (c.source.adjacencyIndex -1) +((slotSize - cellSize) / 2);;
             return 'translate (' + s + ',' + t +')';
         });
      }

      generateData();
      initializeView();
      draw();
      animate();

      return adjacenyMatrix;
   }



d3.layout.simpleProcess = function() {

  var simpleProcess = {}, 
      activity, 
      connection, 
      gravity = 0,
      alpha = 0.1,
      charge = -200,
      size = [1,1]
      depth = 6,
      numberOfActivties = 0;

  var linkDistance = (function(l,i,t) {                
                      diff = (Math.abs(l.target.level - l.source.level));

                      diff = (diff == 0) ? 1 : diff;
                      //console.log(w + ':' + diff + ':'+ w / (levels+2));
                   
            
                      var d = ((Math.sqrt((size[0]*size[1])*0.5 / numberOfActivties) / Math.log(depth)) *(diff));
                      //console.log(Math.floor(size[1])+":"+Math.floor(d)+"->"+Math.floor(size[0]/d) + ":" +Math.floor(size[1]/d));
                      //var d = (Math.sqrt((size[0]*size[1])) / (depth*Math.log(depth))) * (diff);
                      return d;   
       });

   var linkStrength = (function(l,i,t) {   

                      diff = Math.abs(l.target.level - l.source.level);

                      s = 1 - ( 1/ (diff+2));
                      if (l.source.level == 0) s =0;
                      return s;   
       });


  var force = d3.layout.force()
      .nodes(activity)
      .links(connection)
      .linkDistance(linkDistance)
      .linkStrength(linkStrength)
      .gravity(gravity)
      .alpha(alpha)
      .charge(charge)
      .size(size);

  simpleProcess.activity = function(x) {
      if (!arguments.length) return activity;
      activity = x;
      return simpleProcess;
  };

  simpleProcess.connection = function(x) {
      if (!arguments.length) return connection;
      connection = x;
      return simpleProcess;
  };

  simpleProcess.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return simpleProcess;
  };

  simpleProcess.force = function(x) {
      if (!arguments.length) return force;
      force = x;
      return simpleProcess;
  };

  simpleProcess.depth = function(x) {
      if (!arguments.length) return depth;
      depth = x;
      return simpleProcess;
  };

  simpleProcess.numberOfActivties = function(x) {
      if (!arguments.length) return numberOfActivties;
      numberOfActivties = x;
      return simpleProcess;
  };


  simpleProcess.start = function(x) {
    activity.forEach( function(a,i) 
        {a.fixed = ( a.source.length == 0  || a.target.length == 0 ? true : false)});
    force.nodes(activity).links(connection).size(size).start();


    return simpleProcess;
  }

  //return simpleProcess;
  return simpleProcess;
}