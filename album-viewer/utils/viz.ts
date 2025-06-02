// generate a plot with D3.js of the selling price of the album by year
// x-axis are the month series and y-axis show the numbers of albums sold
// data from the sales of album are loaded in from an external source and are in json format
import * as d3 from 'd3';
import { AlbumSalesData } from './types';
import { format } from 'date-fns';

// load the data from a jason file and create the d3 svg in the function
export async function createAlbumSalesChart(dataUrl: string, svgElement: SVGSVGElement) {
  try {
    const data: AlbumSalesData[] = await d3.json(dataUrl);

    // Parse the date and format it
    data.forEach(d => {
      d.date = new Date(d.date);
      d.formattedDate = format(d.date, 'MMM yyyy');
    });

    // Set dimensions and margins for the SVG
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = svgElement.clientWidth - margin.left - margin.right;
    const height = svgElement.clientHeight - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select(svgElement)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up the x and y scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.formattedDate))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sold) || 0])
      .nice()
      .range([height, 0]);

    // Add the x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Add the y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    // Create bars for the chart
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.formattedDate) || 0)
      .attr('y', d => yScale(d.sold))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.sold))
      .attr('fill', '#69b3a2');

  } catch (error) {
    console.error('Error loading or processing data:', error);
  }
}