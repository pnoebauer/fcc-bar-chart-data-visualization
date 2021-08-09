const testData = [1, 2, 3];

d3.select('body')
	.selectAll('div')
	.data(testData)
	.enter()
	.append('div')
	.attr('class', 'bar')
	.style('margin', '2px');
