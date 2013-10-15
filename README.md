JSDataViews
===========

JSDataViews is a library for querying and manipulating complex data structures.


Info
----

With JSDataViews users can create abstract interfaces to a given root-dataset.
The abstract interfaces are called DataViews and inspired by Views in query languages like SQL.


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

Warning
-------

The code is very experimental and in an early development stage.
Without polyfills, the code will only run in newer FF versions.