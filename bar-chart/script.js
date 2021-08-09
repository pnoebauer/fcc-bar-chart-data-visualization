// const testData = [1, 2, 3];
// d3.select('body')
// 	.selectAll('div')
// 	.data(testData)
// 	.enter()
// 	.append('div')
// 	.attr('class', 'bar')
// 	.style('margin', '2px');

const dataSet = [
	['1947-01-01', 100],
	['1947-03-01', 200],
	['1947-05-01', 300],
	['1947-07-01', 400],
];

const w = 500;
const h = 400;

const padding = 100;

const svg = d3
	.select('body')
	.append('svg')
	.attr('height', h)
	.attr('width', w)
	.style('background-color', 'red');

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
	.attr('x', (d, i) => xScale(new Date(d[0])))
	.attr('y', (d, i) => yScale(d[1]))
	.attr('width', 15)
	.attr('height', (d, i) => h - yScale(d[1]) - padding);

const xAxis = d3.axisBottom(xScale);
svg
	.append('g')
	.attr('transform', `translate(0, ${h - padding})`)
	.attr('id', 'x-axis')
	.call(xAxis);
// .call(xAxis.ticks(d3.timeMonth));

const yAxis = d3.axisLeft(yScale);

svg
	.append('g')
	.attr('transform', `translate(${padding}, 0)`)
	.attr('id', 'y-axis')
	.call(yAxis);
