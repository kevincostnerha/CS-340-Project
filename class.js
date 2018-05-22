module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getClasses(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM class", function(error, results, fields){
            if(error){
                res.end();
            }
            context.classes = results;
            complete();
            
        });
    }

    router.post('/', function(req, res){
        console.log(req.body.className);
        console.log(req.body.category);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO class (course, category) VALUES (?,?)";
        var inserts = [req.body.className, req.body.category];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.end();
            } else {
                res.redirect('/class');
            }
        });
    })

    router.get('/', function(req, res){
        var context = {};
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, complete);
        function complete(){
            res.render('class', context);
        }
    })
    return router;
}();

