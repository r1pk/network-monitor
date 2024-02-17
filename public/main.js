/* constants and defaults */
const BYTES_PER_MEGABIT = 125000;

const DATA_TRANSFORMERS = {
  download: (value = 0) => convertBytesToMegabits(value),
  upload: (value = 0) => convertBytesToMegabits(value),
  ping: (value = 0) => value.toFixed(2),
  loss: (value = 0) => value.toFixed(2),
};
const DEFAULT_LINE_CHART_OPTIONS = {
  elements: {
    line: {
      borderWidth: 1,
      borderColor: '#0a0a0a',
    },
    point: {
      radius: 1,
      borderColor: '#0a0a0a',
    },
  },
};

const RECENT_SUMMARY_SINCE_DATE = new Date(new Date().getTime() - 86400000);
const NUMBER_OF_RECENT_SNAPSHOTS = 288;

/* utilities */
const convertBytesToMegabits = (bytes) => {
  return (bytes / BYTES_PER_MEGABIT).toFixed(2);
};

const populateCardContent = async (selector, url, transformers) => {
  const card = document.querySelector(selector);

  const response = await fetch(url);
  const content = await response.json();

  for (const [key, value] of Object.entries(content)) {
    const element = card.querySelector('.' + key);

    if (element) {
      element.textContent = transformers[key] ? transformers[key](value) : value;
    }
  }
};

const createLineChart = (config) => {
  const element = document.querySelector(config.selector);
  const options = Object.assign({}, DEFAULT_LINE_CHART_OPTIONS, config.options);

  return new Chart(element, {
    type: 'line',
    data: {
      labels: config.labels,
      datasets: [config.dataset],
    },
    options: options,
  });
};

/* dashboard */
const initializeNetworkMonitorDashboard = async () => {
  try {
    const response = await fetch('/api/internet-speed-snapshot/?limit=' + NUMBER_OF_RECENT_SNAPSHOTS);
    const snapshots = await response.json().then((results) => results.reverse());
    const labels = snapshots.map((snapshot) => new Date(snapshot.timestamp).toLocaleTimeString());

    populateCardContent('#overall-summary', '/api/internet-speed-snapshot/summary', DATA_TRANSFORMERS);
    populateCardContent(
      '#recent-summary',
      '/api/internet-speed-snapshot/summary?since=' + RECENT_SUMMARY_SINCE_DATE.toISOString(),
      DATA_TRANSFORMERS,
    );
    populateCardContent('#last-snapshot', '/api/internet-speed-snapshot/last', DATA_TRANSFORMERS);

    createLineChart({
      selector: '#download-chart',
      labels: labels,
      dataset: {
        label: 'Download [Mbps]',
        data: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.download ?? 0)),
      },
    });
    createLineChart({
      selector: '#upload-chart',
      labels: labels,
      dataset: {
        label: 'Upload [Mbps]',
        data: snapshots.map((snapshot) => convertBytesToMegabits(snapshot.upload ?? 0)),
      },
    });
    createLineChart({
      selector: '#ping-chart',
      labels: labels,
      dataset: {
        label: 'Ping [ms]',
        data: snapshots.map((snapshot) => snapshot.ping ?? 0),
      },
    });
    createLineChart({
      selector: '#loss-chart',
      labels: labels,
      dataset: {
        label: 'Packet Loss [%]',
        data: snapshots.map((snapshot) => snapshot.loss ?? 0),
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to initialize network monitor dashboard', error);
  }
};

document.addEventListener('DOMContentLoaded', initializeNetworkMonitorDashboard);
