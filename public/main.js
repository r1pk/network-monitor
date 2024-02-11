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

const initializeDashboardCharts = async () => {
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

  new Chart(document.querySelector('#chart-download'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Download [Mbps]',
          data: snapshots.map((snapshot) => convertInternetSpeedUnit(snapshot.download ?? 0)),
        },
      ],
    },
    options: options,
  });

  new Chart(document.querySelector('#chart-upload'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Upload [Mbps]',
          data: snapshots.map((snapshot) => convertInternetSpeedUnit(snapshot.upload ?? 0)),
        },
      ],
    },
    options: options,
  });

  new Chart(document.querySelector('#chart-ping'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Ping [ms]',
          data: snapshots.map((snapshot) => snapshot.ping ?? 0),
        },
      ],
    },
    options: options,
  });

  new Chart(document.querySelector('#chart-loss'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Packet Loss [%]',
          data: snapshots.map((snapshot) => snapshot.loss ?? 0),
        },
      ],
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
    initializeDashboardCharts();
  } catch (error) {
    console.error('Failed to initialize the Network Monitor dashboard', error);
  }
};

document.addEventListener('DOMContentLoaded', initializeNetworkMonitorDashboard);
