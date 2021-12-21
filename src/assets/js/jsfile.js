function calls(arr) {
     var d={}
     for (var i = 0; i < arr.length; i++) {
         kk=arr[i][1].split('/')
         temp=[]
         for (var j = 0; j < kk.length; j++) {
             temp.push(kk[j].split(''))
         }
         d[arr[i][0]]=temp
     }
     productionRules=d;
     let eleminatedRules = eliminateLeftRecursion(productionRules)
     eleminatedRules = toPretty(eleminatedRules)
     return eleminatedRules
}
function calls2(arr) {
    var d={}
    for (var i = 0; i < arr.length; i++) {
        kk=arr[i][1].split('/')
        temp=[]
        for (var j = 0; j < kk.length; j++) {
            temp.push(kk[j].split(''))
        }
        d[arr[i][0]]=temp
    }
    productionRules=d;
    let eleminatedRules = eliminateLeftRecursion(productionRules)
    eleminatedRules = leftFactoring(productionRules)
    eleminatedRules = toPretty(eleminatedRules)
    return eleminatedRules
}
function calculateFirstFollow(arr) {
    var d={}
    for (var i = 0; i < arr.length; i++) {
        kk=arr[i][1].split('/')
        temp=[]
        for (var j = 0; j < kk.length; j++) {
            temp.push(kk[j].split(''))
        }
        d[arr[i][0]]=temp
    }
    productionRules=d;
    let eleLeftRecursion = eliminateLeftRecursion(productionRules)
    let eleLeftFactoring = leftFactoring(eleLeftRecursion)
    let nullable = calcNullables(eleLeftFactoring)
    let First = calcFirsts(eleLeftFactoring, nullable)
    let Follow = calcFollows(eleLeftFactoring, nullable, First)
    return [First, Follow]
}
function calls2(arr){
    var d={}
    for (var i = 0; i < arr.length; i++) {
        kk=arr[i][1].split('/')
        temp=[]
        for (var j = 0; j < kk.length; j++) {
            temp.push(kk[j].split(''))
        }
        d[arr[i][0]]=temp
    }
    productionRules=d;
    let eleminatedRules = leftFactoring(productionRules)
    eleminatedRules = toPretty(eleminatedRules)
    return eleminatedRules

}

function leftFactoring(grammar) {
    'use strict';
    let i, j, k, l,
        generation,
        longest,
        hasPrefix,
        helperName,
        keys = Object.keys(grammar);

    function arrayEqual(a, b) {
        
        if (a.length !== b.length) {
            return false;
        }
        for (let idx = 0; idx < a.length; idx += 1) {
            if (a[idx] !== b[idx]) {
                return false;
            }
        }
        return true;
    }

    for (i = 0; i < keys.length; i += 1) {
        helperName = keys[i] + "'";
        hasPrefix = true;
        while (hasPrefix) {
            hasPrefix = false;
            longest = [];
            generation = grammar[keys[i]];
            for (j = 0; j < generation.length; j += 1) {
                for (k = j + 1; k < generation.length; k += 1) {
                    for (l = 0; l < generation[j].length && l < generation[k].length; l += 1) {
                        if (generation[j][l] !== generation[k][l]) {
                            break;
                        }
                    }
                    if (l > 0) {
                        hasPrefix = true;
                        if (l > longest.length) {
                            longest = generation[j].slice(0, l);
                        }
                    }
                }
            }
            if (hasPrefix) {
                while (grammar.hasOwnProperty(helperName)) {
                    helperName += "'";
                }
                grammar[helperName] = [];
                for (j = 0, k = 0; k < generation.length; k += 1) {
                    if (generation[k].length >= longest.length && arrayEqual(generation[k].slice(0, longest.length), longest)) {
                        if (generation[k].length === longest.length) {
                            grammar[helperName].push(['ϵ']);
                        } else {
                            grammar[helperName].push(generation[k].slice(longest.length));
                        }
                    } else {
                        grammar[keys[i]][j] = grammar[keys[i]][k];
                        j += 1;
                    }
                }
                grammar[keys[i]] = [longest.concat([helperName])].concat(grammar[keys[i]].slice(0, j));
            }
        }
    }
    return grammar;
}
function eliminateLeftRecursion(grammar) {
    'use strict';
    let i, j, k, l,
        extended,
        hasDirectRec,
        helperName,
        keys = Object.keys(grammar);
    for (i = 0; i < keys.length; i += 1) {
        for (j = 0; j < i; j += 1) {
            extended = [];
            for (k = 0; k < grammar[keys[i]].length; k += 1) {
                if (grammar[keys[i]][k].length > 0 && grammar[keys[i]][k][0] === keys[j]) {
                    for (l = 0; l < grammar[keys[j]].length; l += 1) {
                        extended.push(grammar[keys[j]][l].concat(grammar[keys[i]][k].slice(1)));
                    }
                } else if (grammar[keys[i]][k].length > 0) {
                    extended.push(grammar[keys[i]][k]);
                }
            }
            grammar[keys[i]] = extended;
        }
        hasDirectRec = false;
        for (k = 0; k < grammar[keys[i]].length; k += 1) {
            if (grammar[keys[i]][k].length > 0 && grammar[keys[i]][k][0] === keys[i]) {
                hasDirectRec = true;
                break;
            }
        }
        if (hasDirectRec) {
            helperName = keys[i] + "'";
            while (grammar.hasOwnProperty(helperName)) {
                helperName += "'";
            }
            grammar[helperName] = [];
            for (j = 0, k = 0; k < grammar[keys[i]].length; k += 1) {
                if (grammar[keys[i]][k].length > 0) {
                    if (grammar[keys[i]][k][0] === keys[i]) {
                        grammar[helperName].push(grammar[keys[i]][k].slice(1).concat([helperName]));
                    } else {
                        if (grammar[keys[i]][k].length === 1 && grammar[keys[i]][k][0] === 'ϵ') {
                            grammar[keys[i]][k] = [helperName];
                        } else {
                            grammar[keys[i]][k].push(helperName);
                        }
                        grammar[keys[i]][j] = grammar[keys[i]][k];
                        j += 1;
                    }
                }
            }
            grammar[keys[i]] = grammar[keys[i]].slice(0, j);
            grammar[helperName].push(['ϵ']);
        }
    }
    return grammar;
}
function toPretty(grammar) {
    'use strict';
    let i, j,
        pretty = '',
        left = 0,
        keys = Object.keys(grammar);

    function space(num) {
        let s = '';
        while (num > 0) {
            s += ' ';
            num -= 1;
        }
        return s;
    }

    keys.forEach(function (key) {
        if (key.length > left) {
            left = key.length;
        }
    });

    for (i = 0; i < keys.length; i += 1) {
        for (j = 0; j < grammar[keys[i]].length; j += 1) {
            if (j === 0) {
                // pretty += space(left - keys[i].length);
                pretty += keys[i];
                pretty += ' -> ';
            } else {
                // pretty += space(left);
                pretty += ' | ';
            }
            pretty += grammar[keys[i]][j].join('');
        }
        pretty += '\n'
    }

    return pretty;
}


function calcNullables(grammar) {
    'use strict';
    let i, j, k,
        nullables = {},
        keys = Object.keys(grammar);
    for (i = 0; i < keys.length; i += 1) {
        for (j = 0; j < grammar[keys[i]].length; j += 1) {
            for (k = 0; k < grammar[keys[i]][j].length; k += 1) {
                if (!grammar.hasOwnProperty(grammar[keys[i]][j][k])) {
                    nullables[grammar[keys[i]][j][k]] = false;
                }
            }
        }
    }
    if (nullables.hasOwnProperty('?')) {
        nullables['?'] = true;
    }
    function calcRec(key, path) {
        let ii, jj;
        if (path.indexOf(key) >= 0) {
            return false;
        }
        path = path.concat([key]);
        if (nullables.hasOwnProperty(key)) {
            return nullables[key];
        }
        for (ii = 0; ii < grammar[key].length; ii += 1) {
            for (jj = 0; jj < grammar[key][ii].length; jj += 1) {
                if (!calcRec(grammar[key][ii][jj], path)) {
                    break;
                }
            }
            if (jj === grammar[key][ii].length) {
                nullables[key] = true;
                return true;
            }
        }
        nullables[key] = false;
        return false;
    }
    keys.forEach(function (key) {
        calcRec(key, []);
    });
    return nullables;
}
function calcFirsts(grammar, preNullables) {
    'use strict';
    let i, j, k,
        nullables = preNullables || calcNullables(grammar),
        firsts = {},
        finished = false,
        keys = Object.keys(grammar);
    for (i = 0; i < keys.length; i += 1) {
        for (j = 0; j < grammar[keys[i]].length; j += 1) {
            for (k = 0; k < grammar[keys[i]][j].length; k += 1) {
                if (!grammar.hasOwnProperty(grammar[keys[i]][j][k])) {
                    firsts[grammar[keys[i]][j][k]] = [grammar[keys[i]][j][k]];
                }
            }
        }
    }
    function calcRec(key, path) {
        let ii, jj, kk, first;
        if (!grammar.hasOwnProperty(key)) {
            return firsts[key];
        }
        if (path.indexOf(key) >= 0) {
            return firsts[key];
        }
        path = path.concat([key]);
        if (!firsts.hasOwnProperty(key)) {
            firsts[key] = [];
            finished = false;
        }
        for (ii = 0; ii < grammar[key].length; ii += 1) {
            for (jj = 0; jj < grammar[key][ii].length; jj += 1) {
                first = calcRec(grammar[key][ii][jj], path);
                for (kk = 0; kk < first.length; kk += 1) {
                    if (firsts[key].indexOf(first[kk]) < 0 && first[kk] !== '?') {
                        firsts[key].push(first[kk]);
                        finished = false;
                    }
                }
                if (!nullables[grammar[key][ii][jj]]) {
                    break;
                }
            }
            if (jj === grammar[key][ii].length) {
                if (firsts[key].indexOf('?') < 0) {
                    firsts[key].push('?');
                }
            }
        }
        return firsts[key];
    }
    function finalFirst(key) {
        let i, j, k, m
        let temp = false

        for (i = 0; i < grammar[key].length; i += 1) {
            j = 0

            while (j < grammar[key][i].length && firsts[grammar[key][i][j]].indexOf('ϵ') >= 0) {
                firsts[key] = firsts[key].concat(firsts[grammar[key][i][j]])
                j += 1
            }
            if (j === grammar[key][i].length) {
                temp = true
            }
            if (j < grammar[key][i].length) {
                firsts[key] = firsts[key].concat(firsts[grammar[key][i][j]])
                firsts[key] = firsts[key].filter(i => i !== 'ϵ');

            }
        }
        if (temp) {
            firsts[key] = firsts[key].concat(['ϵ'])
        }
    }
    while (!finished) {
        finished = true;
        for (i = 0; i < keys.length; i += 1) {
            calcRec(keys[i], []);
        }
    }
    for (i = 0; i < keys.length; i += 1) {
        finalFirst(keys[i]);
    }
    for (i = 0; i < keys.length; i += 1) {
        let p = Array.from(new Set(firsts[keys[i]]));
        firsts[keys[i]] = p
    }
    Object.keys(firsts).forEach(function (key) {
        firsts[key].sort();
    });
    // console.log(firsts)
    return firsts;
}
function calcFollows(grammar, preNullables, preFirsts) {
    'use strict';
    let i,
        nullables = preNullables || calcNullables(grammar),
        firsts = preFirsts || calcFirsts(grammar),
        follows = {},
        finished = false,
        keys = Object.keys(grammar);
    for (i = 0; i < keys.length; i += 1) {
        if (i === 0) {
            follows[keys[i]] = ['$'];
        } else {
            follows[keys[i]] = [];
        }
    }
    function calc(key) {
        var ii, jj, kk, ll, mid, first;
        for (ii = 0; ii < grammar[key].length; ii += 1) {
            for (jj = 0; jj < grammar[key][ii].length; jj += 1) {
                // A -> aBb
                mid = grammar[key][ii][jj];
                if (grammar.hasOwnProperty(mid)) {
                    for (kk = jj + 1; kk < grammar[key][ii].length; kk += 1) {
                        first = firsts[grammar[key][ii][kk]];
                        for (ll = 0; ll < first.length; ll += 1) {
                            if (first[ll] !== 'ϵ' && follows[mid].indexOf(first[ll]) < 0) {
                                follows[mid].push(first[ll]);
                                finished = false;
                            }
                        }
                        if (!nullables[grammar[key][ii][kk]]) {
                            break;
                        }
                    }
                    if (kk === grammar[key][ii].length) {
                        for (ll = 0; ll < follows[key].length; ll += 1) {
                            if (follows[mid].indexOf(follows[key][ll]) < 0) {
                                follows[mid].push(follows[key][ll]);
                                finished = false;
                            }
                        }
                    }
                }
            }
        }
    }

    function FinalFollow(key) {
        let ii, jj, kk, ll, mid, first;
        for (ii = 0; ii < grammar[key].length; ii += 1) {
            for (jj = 0; jj < grammar[key][ii].length; jj += 1) {
                mid = grammar[key][ii][jj];
                if (grammar.hasOwnProperty(mid)) {

                    kk = jj + 1;
                    while (kk < grammar[key][ii].length && firsts[grammar[key][ii][kk]].indexOf('ϵ') >= 0) {
                        follows[mid] = follows[mid].concat(firsts[grammar[key][ii][kk]])
                        kk += 1
                    }

                    if (kk < grammar[key][ii].length) {
                        follows[mid] = follows[mid].concat(firsts[grammar[key][ii][kk]])
                    }
                    if (kk === grammar[key][ii].length) {
                        if (firsts[grammar[key][ii][kk - 1]].indexOf('ϵ') >= 0) {
                            follows[mid] = follows[mid].concat(follows[key])
                        }
                    }
                }
            }
        }
    }
    while (!finished) {
        finished = true;
        for (i = 0; i < keys.length; i += 1) {
            calc(keys[i]);
        }
    }
    for (i = 0; i < keys.length; i += 1) {
        FinalFollow(keys[i]);
    }

    for (i = 0; i < keys.length; i += 1) {
        let p = Array.from(new Set(follows[keys[i]]));
        p = p.filter(j => j !== 'ϵ');
        follows[keys[i]] = p

    }

    keys.forEach(function (key) {
        follows[key].sort();
    });
    return follows;
}