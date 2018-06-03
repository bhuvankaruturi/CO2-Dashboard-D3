//main JS file
var width = 800;
var height = 600;
var minValue, maxValue, geoData, totalData;

d3.queue()
	.defer(d3.csv, "./data/all_data.csv", (row, i, header) => {
		return {
			country: row.Country,
			countryCode: row['Country Code'],
			year: +row.Year,
			emissionsPerCap: +row['Emissions Per Capita'],
			emissions: +row['Emissions']
		}
	})
	.defer(d3.json, "https://unpkg.com/world-atlas@1/world/110m.json")
	.await((error, countryData, topoData) => {
		if(error) console.log(error);
		else {
			totalData = countryData;
			minValue = d3.min(countryData, d => d.year);
			maxValue = d3.max(countryData, d => d.year);
			d3.select("#year").text(minValue);
			geoData = topojson.feature(topoData, topoData.objects.countries).features;
			var yearData = countryData.filter(d => d.year === minValue);

			var select = d3.select(".header")
							.append('select')
							.property("name", "emission types");

			select.append('option')
					.property('value', 'emissionsPerCap')
					.text('Emissions Per Capita');

			select.append('option')
					.text('Emissions')
					.property('value', 'emissions');

			var map = d3.select("#map")
						.selectAll('svg')
						.attr("width", width)
						.attr("height", height);

			var pie = d3.select("#piechart")
						.selectAll('svg')
						.attr("width", 300)
						.attr("height", 300);

			var bar = d3.select("#barchart")
						.selectAll('svg')
						.attr('width', 500)
						.attr('height', 300)

			d3.select(".header")
				.select("input")
				.property('min', minValue)
				.property('max', maxValue)
				.property('value', minValue)
				.on('input', function(){
					var val = +d3.event.target.value;
					d3.select("#year").text(val)
					yearData = countryData.filter(d => d.year == val);
					drawMap(yearData);
					drawPie(yearData);
				});

			d3.select("select")
				.on('change', function(){
					drawMap(yearData);
					drawPie(yearData);
				})

			drawMap(yearData);
			drawPie(yearData);
		}
	});
