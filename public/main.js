const convertInternetSpeedUnit = (value) => {
  return (value / 125000).toFixed(2);
};

const updateContainerContent = (container, content) => {
  for (const [key, value] of Object.entries(content)) {
    if (!['download', 'upload', 'ping', 'loss'].includes(key)) {
      continue;
    }

    if (['download', 'upload'].includes(key)) {
      container.querySelector('.' + key).textContent = convertInternetSpeedUnit(value ?? 0);
      continue;
    }

    container.querySelector('.' + key).textContent = (value ?? 0).toFixed(2);
  }
};

const loadOverallSummaryContent = async () => {
  const container = document.querySelector('#overall-summary');

  const response = await fetch('/api/internet-speed-snapshot/summary');
  const content = await response.json();

  updateContainerContent(container, content);
};

const loadRecentSummaryContent = async () => {
  const container = document.querySelector('#recent-summary');
  const since = new Date(new Date().getTime() - 86400000).toISOString();

  const response = await fetch('/api/internet-speed-snapshot/summary?since=' + since);
  const content = await response.json();

  updateContainerContent(container, content);
};

const loadLastSnapshotContent = async () => {
  const container = document.querySelector('#last-snapshot');

  const response = await fetch('/api/internet-speed-snapshot/last');
  const content = await response.json();

  updateContainerContent(container, content);
};

const initializeInternetPerformanceChart = async () => {
  const canvas = document.querySelector('#internet-performance-chart');

  const response = await fetch('/api/internet-speed-snapshot/?limit=288');
  const snapshots = await response.json().then((results) => results.reverse());

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: snapshots.map((snapshot) => new Date(snapshot.timestamp).toLocaleTimeString()),
      datasets: [
        {
          label: 'Download [Mbps]',
          data: snapshots.map((snapshot) => convertInternetSpeedUnit(snapshot.download ?? 0)),
          lineTension: 0.1,
        },
        {
          label: 'Upload [Mbps]',
          data: snapshots.map((snapshot) => convertInternetSpeedUnit(snapshot.upload ?? 0)),
          lineTension: 0.1,
        },
        {
          label: 'Ping [ms]',
          data: snapshots.map((snapshot) => snapshot.ping ?? 0),
          lineTension: 0.1,
        },
        {
          label: 'Packet loss [%]',
          data: snapshots.map((snapshot) => snapshot.loss ?? 0),
          lineTension: 0.1,
        },
      ],
    },
  });

  window.chart = chart;
};

const initializeNetworkMonitorDashboard = () => {
  try {
    loadOverallSummaryContent();
    loadRecentSummaryContent();
    loadLastSnapshotContent();
    initializeInternetPerformanceChart();
  } catch (error) {
    console.error('Failed to initialize the Network Monitor dashboard', error);
  }
};

document.addEventListener('DOMContentLoaded', initializeNetworkMonitorDashboard);
