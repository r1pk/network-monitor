import Plot from 'react-plotly.js';

export const PacketLossChart = ({ snapshots }) => {
  const config = {
    responsive: true,
    displayModeBar: false,
  };
  const layout = {
    title: 'Packet Loss',
    xaxis: {
      title: 'Time',
      tickformat: '%H:%M:%S',
      tickmode: 'auto',
      type: 'date',
    },
    yaxis: {
      title: 'Packet Loss (%)',
      range: [0, null],
    },
    height: 360,
  };
  const data = [
    {
      type: 'scatter',
      mode: 'lines',
      x: snapshots.map((snapshot) => new Date(snapshot.timestamp)),
      y: snapshots.map((snapshot) => snapshot.loss),
      line: {
        width: 1,
        color: '#111111',
      },
      hovertemplate: '%{x|%Y-%m-%d %H:%M:%S}, %{y}%' + '<extra></extra>',
    },
  ];

  return <Plot config={config} layout={layout} data={data} style={{ display: 'block' }} />;
};
