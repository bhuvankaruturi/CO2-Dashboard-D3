//pie JS file
var drawPie = function(yearData){

	var pie = d3.select("#piechart").select("svg");

	var radius = pie.attr("width") / 2;

	var g = pie.append('g').attr('transform', 'translate(' + pie.attr("width")/2 + ',' + pie.attr("height")/2 + ')');

	var val = d3.select('select').property('value');

	var arcs = d3.pie()
					.value(d => d[val]);

	var colorScale = d3.scaleOrdinal()
						.domain(d3.extent(yearData, d => d[val]))
						.range(d3.schemeCategory20);

	var path = d3.arc()
					.innerRadius(0)
					.outerRadius(radius);

	var circles = g.selectAll('.arcs')
					.data(arcs(yearData));


	circles.enter()
			.append('path')
			.classed('arcs', true)
			.attr('d', path)
			.attr('fill', d => colorScale(d.data[val]))
			.style('stroke', 'white')
			.style('stroke-width', 0.25)
			.on('mouseover touchstart', function(d){
				var tooltip = d3.select('.tooltip')
				tooltip.style('opacity', 1)
					.style('left', (d3.event.pageX - tooltip.node().offsetWidth/2) + 'px')
					.style('top', (d3.event.pageY + 10) + 'px')
					.html(`<p>Name: ${d.data.country}</p>
						<p>Year: ${d.data.year}</p>
						<p>Emissions Per Capita: ${Math.floor(d.data.emissionsPerCap)}%</p>
						<p>Emissions: ${Math.floor(d.data.emissions)}</p>`);
			})
			.on('mouseout touchend', function(d){
				d3.select('.tooltip').style('opacity', 0);
			});

}