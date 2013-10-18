function SelectorEngine(){
	this.pattern = /(:|=|>=|<=|>|<|!=)/
}
var _p = SelectorEngine.prototype

_p.each = function(obj, func){
	if (obj == null) return;
	var propNames = Object.getOwnPropertyNames(obj);
    console.log("propNames", propNames)
	propNames.forEach(func);
};

_p.isObject = function(obj) {
	return obj === Object(obj);
};

_p.isArray = function(obj) {
    return toString.call(obj) == '[object Array]';
};
_p.passedTest = function(value, test, testValue){
	//TODO use enums for performance?
	switch(test){
		case ":"  : return (value == testValue);
		case "!=" : return (value != testValue);
		case ">=" : return (value >= testValue);
		case "<=" : return (value <= testValue);
		case ">"  : return (value > testValue);
		case "<"  : return (value < testValue);
		case "="  : return (value == testValue);
		default: console.error("unsupported operator:", test); return false;
	}
};
_p.evalSelectorAux = function(obj, prop, test, testValue, elements, isRecursive){
    if(!(this.isObject(obj) || this.isArray(obj))){
        return [];
    }
    this.each(obj, function(p){
        var value = obj[p];
        console.log("check value", value)
        if(typeof value !== "undefined"){
            if(this.isArray(value) || this.isObject(value)){
                if(isRecursive){
                    this.evalSelectorAux(value, prop, test, testValue, elements, isRecursive)
                }
            }else{
                if(p == prop){
                    if(this.passedTest(value, test, testValue)){
                        elements.push(obj);
                    }//else not recursive -> do not call for nested values
                }//else nothing to test -> ignore p
            }
        }else{
            console.log("value undefined for", p, value)
        }
    }.bind(this))
    return elements;
}
_p.evalSelector = function(obj, selector){
	if(typeof selector === "undefined"){
		return undefined;
	}
    if(!(this.isObject(obj) || this.isArray(obj))){
        return [];
    }
    var 
    	pattern = this.pattern,
    	pv = selector.split(pattern, 3); //returns [property,operator,value]
    if(pv.length<=1){//only property
    	console.log("single", pv)
    	return obj[selector]
    }else if
    	(pv.length === 2){// missing property/value part
    	console.log("tuple", pv)
    }else{ //pv.length === 3
    	console.log("triple", pv)
    	var 
    		rest = selector.slice(pv.join("").length),
    		elements = [],
    		isRecursive = true;
        this.evalSelectorAux(obj, pv[0], pv[1], pv[2], elements, isRecursive)
    }
    if(rest.length > 0){
    	console.log("there is a rest", rest)
    }
    console.log("elements", elements, selector)
    return elements;
}
_p.isSelector = function(prop){
	var pattern = this.pattern;
	return (prop.search(pattern) !== -1)
}