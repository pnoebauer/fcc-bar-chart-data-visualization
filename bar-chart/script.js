// const testData = [1, 2, 3];
// d3.select('body')
// 	.selectAll('div')
// 	.data(testData)
// 	.enter()
// 	.append('div')
// 	.attr('class', 'bar')
// 	.style('margin', '2px');

const dataSet = [
	['1947-01-01', 243.1],
	['1947-04-01', 246.3],
	['1947-07-01', 250.1],
	['1947-01-11', 280.1],
];

const w = 500;
const h = 500;
const padding = 60;

const svg = d3
	.select('body')
	.append('svg')
	.attr('height', h)
	.attr('width', w)
	.style('background-color', 'red');

const xScale = d3
	.scaleLinear()
	.domain([d3.min(dataSet, d => new Date(d[0])), d3.max(dataSet, d => new Date(d[0]))])
	.range([padding, w - padding]);

// console.log(d3.max(dataSet, d => d[0]));
// console.log(new Date(d3.max(dataSet, d => d[0])));
// console.log(d3.max(dataSet, d => new Date(d[0])));

const yScale = d3
	.scaleLinear()
	.domain([d3.min(dataSet, d => d[1]), d3.max(dataSet, d => d[1])])
	.range([h - padding, padding]);

svg
	.selectAll('rect')
	.data(dataSet)
	.enter()
	.append('rect')
	.attr('x', (d, i) => {
		console.log(d[0], i, xScale(new Date(d[0])), 'x');
		return xScale(new Date(d[0]));
	})
	// .attr('y', (d, i) => {
	// 	console.log(d[1], i, yScale(d[1]), 'y');
	// 	return yScale(d[1]);
	// })
	.attr('y', d => yScale(d[1]))
	.attr('width', 15)
	// .attr('height', 50);
	// .attr('height', d => yScale(d[1]));
	.attr('height', d => yScale(h - d[1]));
