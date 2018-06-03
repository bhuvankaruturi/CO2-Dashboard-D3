//bar JS file
var drawBar = function(countryData){
	
	var val = d3.select("select").property("value");
	countryData = countryData.sort((a, b) => a.year - b.year);

	var barSvg = d3.select("#barchart")
						.select("svg");

	var barChartWidth = barSvg.attr("width");

	var barChartHeight = barSvg.attr("height");

	var barPadding = 2, xPadding = 60, yPadding = 30;

	var barWidth = (barChartWidth - 2 * xPadding) / countryData.length ;

	barSvg.selectAll('.heading').remove();

	barSvg.append('text')
			.classed('heading', true)
			.attr('x', barChartWidth/2)
			.attr('y', yPadding/1.5)
			.attr('text-anchor', 'middle')
			.attr('font-size', '1.5em')
			.text(countryData[0].country);

	var bars = d3.select("#barchart")
					.select("svg")
					.selectAll(".bar")
					.data(countryData);

	var xScale = d3.scaleLinear()
					.domain(d3.extent(countryData, d => d.year))
					.range([xPadding, barChartWidth - xPadding]);

	var yScale = d3.scaleLinear()
					.domain(d3.extent(countryData, d => d[val]))
					.range([barChartHeight - yPadding, yPadding]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	barSvg.selectAll('.axes').remove();

	barSvg.append('g')
			.attr('transform', 'translate(0,' + (barChartHeight - yPadding) + ')')
			.call(xAxis)
			.classed('axes', true);

	barSvg.append('g')
			.attr('transform', 'translate(' + xPadding + ',0)')
			.call(yAxis)
			.classed('axes', true);

	bars.exit().remove();

	bars.enter()
		.append('rect')
		.classed('bar', true)
		.merge(bars)
		.attr('x', d=> xScale(d.year))
		.transition()
		.delay((d, i) => i * 100)
		.ease(d3.easeLinear)
		.attr('y', d => yScale(d[val]))
		.attr('width', barWidth - barPadding)
		.attr('height', d => barChartHeight - yScale(d[val]) - yPadding)
		.attr('fill', d => {
			if(d.year == d3.select('input').property('value')) return '#2274f7';
			else return '#0fc7ff';
		});
}