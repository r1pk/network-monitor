/* constants */
const RECENT_SINCE_DATE = new Date(new Date().getTime() - 86400000);
const NUMBER_OF_RECENT_SNAPSHOTS = 288;

/* utilities */
const request = (url, options = {}) => {
  return fetch(url, options).then((response) => response.json());
};

const adjustNumberRepresentation = (value = 0) => {
  return value.toFixed(2);
};

const convertBytesToMegabits = (value = 0) => {
  return adjustNumberRepresentation(value / 125000);
};

const normalizeSpeedTestSnapshotContent = (snapshot) => {
  return Object.assign({}, snapshot, {
    download: convertBytesToMegabits(snapshot.download) + ' Mbps',
    upload: convertBytesToMegabits(snapshot.upload) + ' Mbps',
    ping: adjustNumberRepresentation(snapshot.ping) + ' ms',
    loss: adjustNumberRepresentation(snapshot.loss) + ' %',
  });
};

const updateContainerContent = (container, content) => {
  for (const [key, value] of Object.entries(content)) {
    const element = container.querySelector('[data-key="' + key + '"]');

    if (element === null) {
      continue;
    }

    element.textContent = value;
  }
};

const createLineChart = (selector, labels, dataset) => {
  const element = document.querySelector(selector);
  const options = {
    elements: {
      line: {
        borderWidth: 1,
        borderColor: '#f1f2f3',
      },
      point: {
        radius: 1,
        borderColor: '#f1f2f3',
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  return new Chart(element, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [dataset],
    },
    options: options,
  });
};

/* loaders */
const loadOverallAverageSpeedTestSnapshot = async () => {
  try {
    const container = document.querySelector('#overall-average-snapshot');

    const snapshot = await request('/api/speed-test-snapshot/average');
    const content = normalizeSpeedTestSnapshotContent(snapshot);

    return updateContainerContent(container, content);
  } catch (error) {
    console.log('Error occurred while loading overall average speed test snapshot:', error);
  }
};

const loadRecentAverageSpeedTestSnapshot = async () => {
  try {
    const container = document.querySelector('#recent-average-snapshot');

    const snapshot = await request('/api/speed-test-snapshot/average?since=' + RECENT_SINCE_DATE.toISOString());
    const content = normalizeSpeedTestSnapshotContent(snapshot);

    return updateContainerContent(container, content);
  } catch (error) {
    console.log('Error occurred while loading recent average speed test snapshot:', error);
  }
};

const loadLatestSpeedTestSnapshot = async () => {
  try {
    const container = document.querySelector('#latest-snapshot');

    const snapshot = await request('/api/speed-test-snapshot/latest');
    const content = normalizeSpeedTestSnapshotContent(snapshot);

    return updateContainerContent(container, content);
  } catch (error) {
    console.log('Error occurred while loading latest speed test snapshot:', error);
  }
};

const loadSpeedTestSnapshotCharts = async () => {
  try {
    const snapshots = await request('/api/speed-test-snapshot?limit=' + NUMBER_OF_RECENT_SNAPSHOTS);

    const dataset = snapshots.reverse();
    const labels = dataset.map((snapshot) => new Date(snapshot.timestamp).toLocaleTimeString());

    createLineChart('#download-speed-chart', labels, {
      label: 'Download Speed [Mbps]',
      data: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.download)),
    });
    createLineChart('#upload-speed-chart', labels, {
      label: 'Upload Speed [Mbps]',
      data: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.upload)),
    });
    createLineChart('#ping-chart', labels, {
      label: 'Ping [ms]',
      data: snapshots.map((snapshot) => adjustNumberRepresentation(snapshot.ping)),
    });
    createLineChart('#packet-loss-chart', labels, {
      label: 'Packet Loss [%]',
      data: snapshots.map((snapshot) => adjustNumberRepresentation(snapshot.loss)),
    });
  } catch (error) {
    console.log('Error occurred while loading recent speed test snapshot charts:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadOverallAverageSpeedTestSnapshot();
  loadRecentAverageSpeedTestSnapshot();
  loadLatestSpeedTestSnapshot();
  loadSpeedTestSnapshotCharts();
});
