(function( window, undefined ){

	//polyfill for .bind()
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (oThis) {
	    if (typeof this !== "function") {
	      // closest thing possible to the ECMAScript 5 internal IsCallable function
	      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }
	    var aArgs = Array.prototype.slice.call(arguments, 1), 
	        fToBind = this, 
	        fNOP = function () {},
	        fBound = function () {
	          return fToBind.apply(this instanceof fNOP && oThis
	                                 ? this
	                                 : oThis,
	                               aArgs.concat(Array.prototype.slice.call(arguments)));
	        };
	    fNOP.prototype = this.prototype;
	    fBound.prototype = new fNOP();
	    return fBound;
	  };
	}

	var
		version = "0.1";

    var DataView = function( obj ) {
    	return new DataWrapper( obj );
    };

    var DataWrapper = function( obj ){
    	//TODO use proxy.set on target to track modification
    	this.target = obj;
    	this.selector = "";
 
    };
    var se = new SelectorEngine();
    var vLogic = {
	    get: function(declaration, prop){
	    	var dataRepresentation = null;
	    	if(typeof declaration === "function"){ //evaluate declaration to retrieve data (VI)
	    		dataRepresentation = declaration();
	    	}else{
	    		dataRepresentation = declaration; //no declaration: initial dataset eg
	    	}
	    	if(typeof prop === "string"){ 
	    		if(prop === "size"){
	        		return dataRepresentation.length;
	    		}else if(!isNaN(parseInt(prop))){ //type is number
	    			return dataRepresentation[parseInt(prop)];
	    		}else if(se.isSelector(prop)){
	    			var matchingElements = se.evalSelector(dataRepresentation, prop)
	    			return new Proxy(matchingElements, vLogic);
	    		}else{
	    			//FIXME handle arrays, objects, ..
	    			return dataRepresentation[prop];
	    		}
	    	}else{
	    		return dataRepresentation.prop;
	    	}
	    },
	    set: function(declaration, prop, val){
	    	var dataRepresentation = null;
	    	if(typeof declaration === "function"){ //
	    		dataRepresentation = declaration();
	    	}else{
	    		dataRepresentation = declaration; //no declaration: initial dataset eg
	    	}
			for (var i = dataRepresentation.length - 1; i >= 0; i--) {
			    dataRepresentation[i][prop] = val;
			};    	    	
	    }
	};
    
    DataView.fn = DataWrapper.prototype = {
    	view : function( declaration) {
    		if(declaration){
    			if(typeof declaration === "string"){
    				var selector = declaration;
    				return new Proxy((function(){
    					return se.evalSelector(this.target, selector)
    				}.bind(this)), vLogic);
    			}else if(typeof declaration === "function"){
					return new Proxy(declaration, vLogic);
    			}else{
    				console.error("DataView bad data declaration")
    			}
    		}else{
    			//use initial dataset as declaration
    			return new Proxy(this.target, vLogic);
    		}
    	}
    };

	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.dv = DataView;
	}
})(window)
