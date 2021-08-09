// const testData = [1, 2, 3];
// d3.select('body')
// 	.selectAll('div')
// 	.data(testData)
// 	.enter()
// 	.append('div')
// 	.attr('class', 'bar')
// 	.style('margin', '2px');

const tooltip = d3.select('body').append('div').attr('id', 'tooltip').style('opacity', 0);

const w = 500;
const h = 200;

const padding = 22;

const svg = d3
	.select('body')
	.append('svg')
	.attr('height', h)
	.attr('width', w)
	.style('background-color', 'red');

const dataSet = [
	['1947-01-01', 100],
	['1947-03-01', 200],
	['1947-05-01', 300],
	['1947-07-01', 400],
];

const xScale = d3
	// .scaleLinear()
	.scaleTime()
	// .domain([d3.min(dataSet, d => new Date(d[0])), d3.max(dataSet, d => new Date(d[0]))])
	.domain([
		d3.min(dataSet, d => new Date(d[0])),
		new Date(d3.max(dataSet, d => new Date(d[0])).getTime() + 1000 * 60 * 60 * 24 * 31),
	])
	.range([padding, w - padding]);

// console.log(d3.max(dataSet, d => d[0]));
// console.log(new Date(d3.max(dataSet, d => d[0])));
// console.log(d3.max(dataSet, d => new Date(d[0])));

const yScale = d3
	.scaleLinear()
	// .domain([d3.min(dataSet, d => d[1]), d3.max(dataSet, d => d[1])])
	.domain([0, d3.max(dataSet, d => d[1])])
	.range([h - padding, padding]);

// console.log([d3.min(dataSet, d => d[1]), d3.max(dataSet, d => d[1])], 'domain');

svg
	.selectAll('rect')
	.data(dataSet)
	.enter()
	.append('rect')
	.attr('x', d => xScale(new Date(d[0])))
	.attr('y', d => console.log(d[1], yScale(d[1])) || yScale(d[1]))
	.attr('data-date', d => d[0])
	.attr('data-gdp', d => d[1])
	.attr('width', 15)
	.attr('height', d => h - yScale(d[1]) - padding)
	.attr('class', 'bar')
	// .on('mouseover', (d, i) => console.log(d, i));
	.on('mouseover', (d, i) => {
		console.log(d, i);
		tooltip.transition().duration(200).style('opacity', 0.9);
		tooltip
			.html(i[0] + '<br/>' + i[1])
			.attr('data-date', i[0])
			.style('left', d.pageX + 'px')
			.style('top', h - padding + 'px');
		// .style('top', d.pageY - 28 + 'px');
	})
	.on('mouseout', d => {
		tooltip.transition().duration(500).style('opacity', 0);
	});

const xAxis = d3.axisBottom(xScale).ticks();

svg
	.append('g')
	.attr('transform', `translate(0, ${h - padding})`)
	.attr('id', 'x-axis')
	.call(xAxis);
// .call(xAxis.ticks(d3.timeMonth));

const yAxis = d3.axisLeft(yScale);
yAxis.ticks(2);

svg
	.append('g')
	.attr('transform', `translate(${padding}, 0)`)
	.attr('id', 'y-axis')
	.call(yAxis);
