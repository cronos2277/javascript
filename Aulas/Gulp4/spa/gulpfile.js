const {series,parallel,dest,src} = require("gulp");
const uglifycss = require("gulp-uglifycss");
const concat = require("gulp-concat");

const app = {
    html: function(callback){        
        return callback();
    },

    css: function(callback){        
        return callback();
    },

    javascript: function(callback){        
        return callback();
    },

    image: function(callback){    
        return callback();
    }

};

const deps = {    
    styles:function(){
        return src(
            'node_modules/font-awesome/css/font-awesome.css'
        ).pipe(
            uglifycss({
                "uglyComments":false
            })
        ).pipe(
            concat('deps.min.css')
        ).pipe(
            dest('build/assets/css')
        );
    },

    fonts:function(){
        return src(
            'node_modules/font-awesome/fonts/*.*'
        ).pipe(
            dest('build/assets/fonts')
        )
    }
};

const server = {
    watching:function(callback){
        return callback();
    },

    run:function(callback){
        return callback();
    }
};

module.exports.default = series(
    parallel(
        series(            
            app.css,            
            app.image),
        series(
            app.html,
            app.javascript
        ),
        series(
            deps.styles,
            deps.fonts
        )
    ),
    server.run,
    server.watching
);