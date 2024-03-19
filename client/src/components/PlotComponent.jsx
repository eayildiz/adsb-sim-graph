import React, { useRef, useEffect } from 'react';
import d3 from 'd3';
import { scaleLinear } from 'd3';

const PlotComponent = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const xScale = scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([margin.left, innerWidth]);

    const yScale = scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([innerHeight, margin.top]);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

  }, [data, width, height]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default PlotComponent;