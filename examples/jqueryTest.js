var $ = require('jquery')(require("jsdom").jsdom().defaultView);
$("body").append("<div>TEST</div>");
console.log($("body").html());