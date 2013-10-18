JSDataViews
===========

JSDataViews is a library for querying and manipulating complex data structures.


Info
----

With JSDataViews users can create abstract interfaces to a given root-dataset.
These abstract interfaces are called DataViews and inspired by Views in query languages like SQL.


	var employees = dv([	
		{name:"john doe", age:20, status: "is working"},
	    {name:"lena", age:29, status: "is working"},
	    {name:"max mustermann", age:31, status: "is working"}
	]).view()
	var employeesOver30 = dv(employees).view("age>=30");
	employees["name:lena"]["age"] = 30;
	employeesOver30.status = "is dancing";

	for (var i = employees.length - 1; i >= 0; i--) {
		console.log(employees[i]["name"]+" ("+employees[i]["age"]+") "+employees[i]["status"]+" all night long");
	};
	//>>max mustermann (31) is dancing all night long
	//>>lena (30) is dancing all night long
	//>>john doe (20) is working all night long

Technology
----------

JSDataViews are build upon the Proxy API introduced in ECMAScript 6 and thus are some kind of meta programs.

Two concepts form the foundation of JSDataViews:

###Virtual Instances

Virtual Instances are objects which are self-computed at runtime. They are lazy initialized, i.e. they only represent data when they are accessed.

###Selector Properties

Selector Properties go beyond normal object properties in JavaScript. They are very similar to CSS DOM selectors known from frameworks like jQuery.

	employees['age>30']

Warning
-------

The code is very experimental and in an early development stage. It is not intended to be used in production code.
Without polyfills, the code will only run in newer FF versions.















<!-- Piwik Tracker -->
<img src="http://www.h1965153.stratoserver.net/piwik/piwik.php?idsite=1&amp;action_name=jsdataviews&amp;rec=1" style="border:0" alt="" />
