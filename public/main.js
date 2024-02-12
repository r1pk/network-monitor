const convertBytesToMegabits = (value) => {
  return (value / 125000).toFixed(2);
};

const updateCardContent = (card, content) => {
  for (const [key, value] of Object.entries(content)) {
    if (!['download', 'upload', 'ping', 'loss'].includes(key)) {
      continue;
    }

    if (['download', 'upload'].includes(key)) {
      card.querySelector('.' + key).textContent = convertBytesToMegabits(value ?? 0);
    } else {
      card.querySelector('.' + key).textContent = (value ?? 0).toFixed(2);
    }
  }
};

const createLineChart = (config) => {
  return new Chart(document.querySelector(config.selector), {
    type: 'line',
    data: {
      labels: config.labels,
      datasets: [config.dataset],
    },
    options: config.options,
  });
};

const loadOverallSummaryContent = async () => {
  const card = document.querySelector('#overall-summary');

  const response = await fetch('/api/internet-speed-snapshot/summary');
  const content = await response.json();

  updateCardContent(card, content);
};

const loadRecentSummaryContent = async () => {
  const card = document.querySelector('#recent-summary');
  const since = new Date(new Date().getTime() - 86400000).toISOString();

  const response = await fetch('/api/internet-speed-snapshot/summary?since=' + since);
  const content = await response.json();

  updateCardContent(card, content);
};

const loadLastSnapshotContent = async () => {
  const card = document.querySelector('#last-snapshot');

  const response = await fetch('/api/internet-speed-snapshot/last');
  const content = await response.json();

  updateCardContent(card, content);
};

const createDashboardCharts = async () => {
  const response = await fetch('/api/internet-speed-snapshot/?limit=288');
  const snapshots = await response.json().then((results) => results.reverse());

  const labels = snapshots.map((snapshot) => new Date(snapshot.timestamp).toLocaleTimeString());
  const options = {
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 1,
      },
    },
  };

  createLineChart({
    selector: '#chart-download',
    labels: labels,
    dataset: {
      label: 'Download [Mbps]',
      data: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.download ?? 0)),
    },
    options: options,
  });

  createLineChart({
    selector: '#chart-upload',
    labels: labels,
    dataset: {
      label: 'Upload [Mbps]',
      data: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.upload ?? 0)),
    },
    options: options,
  });

  createLineChart({
    selector: '#chart-ping',
    labels: labels,
    dataset: {
      label: 'Ping [ms]',
      data: snapshots.map((snapshot) => snapshot.ping ?? 0),
    },
    options: options,
  });

  createLineChart({
    selector: '#chart-loss',
    labels: labels,
    dataset: {
      label: 'Packet Loss [%]',
      data: snapshots.map((snapshot) => snapshot.loss ?? 0),
    },
    options: Object.assign({}, options, {
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    }),
  });
};

const initializeNetworkMonitorDashboard = () => {
  try {
    loadOverallSummaryContent();
    loadRecentSummaryContent();
    loadLastSnapshotContent();
    createDashboardCharts();
  } catch (error) {
    console.error('Failed to initialize the Network Monitor dashboard', error);
  }
};

document.addEventListener('DOMContentLoaded', initializeNetworkMonitorDashboard);
