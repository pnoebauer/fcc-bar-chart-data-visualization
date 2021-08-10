const tooltip = d3
	.select('.container')
	.append('div')
	.attr('id', 'tooltip')
	.style('opacity', 0);

const w = 900;
const h = 500;

const padding = 50;

const svg = d3
	.select('.container')
	.append('svg')
	.attr('height', h)
	.attr('width', w)
	.style('background-color', '#fff');

// y-axis label
svg
	.append('text')
	.attr('x', -300)
	.attr('y', 80)
	.attr('transform', 'rotate(-90)')
	.text('Gross Domestic Product');

// x-axis label (info)
svg
	.append('text')
	.attr('x', 400)
	.attr('y', 490)
	.text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf');

async function plotBarsFromData() {
	const res = await fetch(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
	);
	const projectData = await res.json();
	// console.log(projectData);

	const dataSet = projectData.data;
	// const dataSet = projectData.data.slice(0, 8);

	const xScale = d3
		.scaleTime()
		.domain(d3.extent(dataSet, d => new Date(d[0])))
		.range([padding, w - padding]);

	// console.log(d3.max(dataSet, d => new Date(d[0])));

	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(dataSet, d => d[1])])
		.range([h - padding, padding]);

	// console.log((w - 2 * padding) / dataSet.length, width per bar);

	const convertToQuarter = date => {
		const quarter = Math.floor(new Date(date).getMonth() / 4 + 1);
		return `Q${quarter} ${new Date(date).getFullYear()}`;
	};

	svg
		.selectAll('rect')
		.data(dataSet)
		.enter()
		.append('rect')
		.attr('x', d => xScale(new Date(d[0])))
		.attr('y', d => yScale(d[1]))
		.attr('data-date', d => d[0])
		.attr('data-gdp', d => d[1])
		.attr('width', (1 * (w - 2 * padding)) / dataSet.length)
		.attr('height', d => h - yScale(d[1]) - padding)
		.attr('class', 'bar')
		.attr('fill', 'rgb(51, 173, 255)')
		.on('mouseover', function (d, i) {
			// d3.select(this).style('fill', 'green');
			// console.log(d, i);
			tooltip.transition().duration(200).style('opacity', 0.9);
			tooltip
				.html(`${convertToQuarter(i[0])} <br/> $${i[1]} Billion`)
				.attr('data-date', i[0])
				// .style('left', d.pageX + 'px')
				.style('left', d.offsetX + 'px')
				.style('top', h - padding + 'px');
		})
		.on('mouseout', function (d, i) {
			// d3.select(this).style('fill', 'black');
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
	yAxis.ticks(10);

	svg
		.append('g')
		.attr('transform', `translate(${padding}, 0)`)
		.attr('id', 'y-axis')
		.call(yAxis);
}

plotBarsFromData();
