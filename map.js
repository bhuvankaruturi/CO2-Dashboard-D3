//maps JS file
var drawMap = function(yearData) {

	d3.selectAll(".bar").remove();

	var projection = d3.geoMercator()
							.scale(120)
							.translate([width/2, height/2]);

	var path = d3.geoPath()
	 					.projection(projection);

	var colorValues = {
		emissionsPerCap: ["#f4c1c1", "#d10202"],
		emissions: ["#cfdff9", "#0146b5"] 
	};

	var val = d3.select('select').property('value');
	console.log(val);

	var colorScale = d3.scaleLinear()
						.domain(d3.extent(yearData, d => d[val]))
						.range(colorValues[val]);

	var atlas = d3.select("#map")
					.select('svg')
					.selectAll('.map')
					.data(geoData);


	atlas.style("stroke", "none")
		.attr("fill", d => {
			var country = yearData.filter(c => c.countryCode === d.id);	
			if(country.length === 0) return '#ccc';
			else return colorScale(country[0][val]);
		});

	var prevSelected;

	atlas.enter()
		.append("path")
		.classed("map", true)
		.on('click', function(d){
			var yearlyCountryData = totalData.filter(c  => c.countryCode == d.id);
			d3.select(this).style('stroke', 'black').style('stroke-width', 1);
			if(prevSelected && prevSelected != this) d3.select(prevSelected).style('stroke', 'none');
			if(prevSelected != this) drawBar(yearlyCountryData);
			prevSelected = this;
		})
		.attr("d", path)
		.attr("fill", d => {
			var country = yearData.filter(c => c.countryCode === d.id);
			if(country.length === 0) return '#ccc';
			else return colorScale(country[0][val]);
		});	
}