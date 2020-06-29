// Unquote string (utility)
function unquote(value) {
    if (value.charAt(0) == '"' && value.charAt(value.length - 1) == '"') return value.substring(1, value.length - 1);
    return value;
}

// Parse a Link header
function parseLinkHeader2(header) {
    var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
    var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;

    var matches = header.match(linkexp);
    var rels = new Object();
    for (var i = 0; i < matches.length; i++) {
        var split = matches[i].split('>');
        var href = split[0].substring(1);
        var ps = split[1];
        var link = new Object();
        link.href = href;
        var s = ps.match(paramexp);
        for (var j = 0; j < s.length; j++) {
            var p = s[j];
            var paramsplit = p.split('=');
            var name = paramsplit[0];
            link[name] = unquote(paramsplit[1]);
        }

        if (link.rel != undefined) {
            rels[link.rel] = link;
        }
    }

    return rels;
}