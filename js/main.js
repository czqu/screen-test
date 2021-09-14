$(document).ready(function() {
    $("#resolution").html(screen.width + "x" + screen.height + "x" + screen.colorDepth);
    $("#bodysize").html($("#welcome").width() + "x" + $("#welcome").height());
    slide = new Array();
    current_slide = 0;
    var d = 1;
    $("#main li").each(function(j) {
        var l = $(this).attr("id");
        var k = $(this).data("title");
        var h = slide.push({
            id: l,
            title: k,
            description: $(this).data("desc")
        });
        $("#control_buttons").append($("<a />").attr("id", "btn-" + l).text(k).click(function() {
            go(h - 1)
        }))
    });
    var g = function() {
        var h = $("#btn-" + slide[current_slide].id);
        var j = h.offset().left;
        var l = ($("#container").width() - h.width()) / 2;
        var i = $("#control_buttons");
        var k = i.position();
        k.left += l - j;
        i.css("left", k.left)
    };
    go = function(h) {
        if (slide.length > 0 && h >= 0 && h < slide.length) {
            location.hash = slide[h].id;
            current_slide = h;
            $("#control .top .title").text(slide[h].title);
            $("#control .top .description").text(slide[h].description)
        }
        setTimeout(function() {
            d = (h == 0)
        },
        100);
        g()
    };
    $("#main").bind("mousewheel",
    function(h, i) {
        if (d) {
            return
        }
        if (i > 0) {
            go(current_slide - 1)
        } else {
            go(current_slide + 1)
        }
    }).bind("click",
    function(h) {
        if (d) {
            return
        }
        go(current_slide + 1)
    });
    $(document).keyup(function(h) {
        if (d) {
            return
        }
        switch (h.keyCode) {
        case 37:
            go(current_slide - 1);
            break;
        case 39:
        case 13:
        case 32:
            go(current_slide + 1);
            break;
        case 27:
            go(0)
        }
    });
    var b = 0;
    var e = 0;
    var f = 0;
    $("#main").bind("mousemove",
    function() {
        if (slide[current_slide].id.substring(0, 5) == "test-") {
            e = $.now();
            $("#control").removeClass("control_hide").addClass("control_show");
            if (f == 0) {
                f = setInterval(function() {
                    if (!b && $.now() - e > 2000) {
                        $("#control").removeClass("control_show").addClass("control_hide");
                        clearInterval(f);
                        f = 0
                    }
                },
                200)
            }
        }
    });
    $("#control").mouseenter(function() {
        b = 1
    }).mouseleave(function() {
        b = 0
    });
    var c = 0;
    var a = 0;
    $(window).resize(function(h) {
        $("#resolution").html(screen.width + "x" + screen.height + "x" + screen.colorDepth);
        $("#bodysize").html($("#welcome").width() + "x" + $("#welcome").height());
        $("#resolution_tips").text($("#body").width() + "x" + $("#container").height()).show();
        c = $.now();
        if (a == 0) {
            a = setInterval(function() {
                if ($.now() - c > 1000) {
                    $("#resolution_tips").fadeOut();
                    clearInterval(a);
                    a = 0
                }
            },
            200)
        }
        g()
    });
    $("#start").click(function() {
        go(1);
        quanping_xianshi()
    });
    go(0)
});
function quanping_anniu() {
    if ($("#welcome").height() === window.screen.height && $("#welcome").width() === window.screen.width) {
        document.getElementById("quanping_xianshi").style.display = "none";
        document.getElementById("quanping_tuichu").style.display = "block"
    } else {
        document.getElementById("quanping_tuichu").style.display = "none";
        document.getElementById("quanping_xianshi").style.display = "block"
    }
}
window.setInterval(function() {
    quanping_anniu()
},
1000);
function quanping_xianshi() {
    var a = document.documentElement;
    if (a.requestFullscreen) {
        a.requestFullscreen()
    } else {
        if (a.mozRequestFullScreen) {
            a.mozRequestFullScreen()
        } else {
            if (a.webkitRequestFullScreen) {
                a.webkitRequestFullScreen()
            }
        }
    }
}
function quanping_tuichu() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else {
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else {
            if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
        }
    }
};