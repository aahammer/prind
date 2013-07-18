(function() {

    $(document).ready(function() {

        var page = $(location).attr('pathname').split('/')[1];
        var topic = $(location).attr('pathname').split('/')[2];

        console.log(page + '///' + topic + '   ' + $(location).attr('pathname'));
        if (page === 'home') $('#nav-home').addClass('active');
        if (page === 'extract') $('#nav-extract').addClass('active');
        if (page === 'analyze') $('#nav-analyze').addClass('active');
        if (page === 'visualize') $('#nav-visualize').addClass('active');

        if (topic === 'overview') $('#topic-overview').addClass('active');
        if (topic === 'demonstration') $('#topic-demonstration').addClass('active');
        if (topic === 'technology') $('#topic-technology').addClass('active');
        if (topic === 'theory') $('#topic-theory').addClass('active');
        if (topic === 'about') $('#topic-about').addClass('active');

    });

})();



