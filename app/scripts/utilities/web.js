var webutil={};

// returns the raw address after removing any parameters
webutil.stripRippleAddress = function (addr) {
    if (typeof addr === 'string') {
        var index = addr.indexOf("?");
        if (index >= 0) {
            return(addr.slice(0,index));
        }
    }
    return addr;
};

//returns the destination tag of an address if there is one
webutil.getDestTagFromAddress = function (addr) {
    var index = addr.indexOf("?");
    if (index >= 0) {
        addr      = addr.slice(index,addr.length);
        index     = addr.indexOf("dt=");

        if(index >= 0) {
            addr  = addr.slice(index+3,addr.length);
            index = addr.indexOf("&");

            if(index > 0) {
                return addr.slice(0,index);
            } else {
                return addr;
            }
        }

        index = addr.indexOf("d=");
        if(index >= 0) {
            addr  = addr.slice(index + 2,addr.length);
            index = addr.indexOf("&");

            if(index > 0) {
                return addr.slice(0,index);
            } else {
                return addr;
            }
        }
    }
    return void 0;
};


webutil.findIssuer= function(lines, currency)
{
    var maxIssuer=null;
    var maxLimit=0;

    for (var n in lines) {
        if (lines.hasOwnProperty(n)) {
            if (lines[n].currency === currency) {
                var limit = +lines[n].limit.to_text();
                if (limit > maxLimit) {
                    maxLimit = limit;
                    maxIssuer = lines[n].account;
                }
            }
        }
    }
    return maxIssuer;
};

webutil.getContact = function (contacts,value)
{
    for (var i=0;i<contacts.length;i++) {
        if (contacts[i].name === value || contacts[i].address === value) {
            return contacts[i];
        }
    }

    return false;
};