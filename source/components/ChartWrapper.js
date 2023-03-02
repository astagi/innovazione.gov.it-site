import React from 'react';
import BasicChart from './BasicChart';
import PieChart from './PieChart';
import Table from './Table';

import {
  generateCSV,
  generateCSVPie,
  downLoadPng,
  downloadCSV,
} from './utils/chartUtils';

export default function ChartWrapper(props) {
  const {
    id,
    config,
    dataSource,
    title,
    subtitle,
    info,
    source,
    labelsDownload,
    labelsShare,
    labelsSource,
  } = props;

  const [echartInstance, setEchartInstance] = React.useState(null);

  const series = Array.isArray(dataSource.series)
    ? dataSource.series[0]
    : dataSource.series;

  const chartType = series.type;

  const csvData =
    chartType === 'pie' ? generateCSVPie(series) : generateCSV(dataSource);

  console.log('csvData', csvData);
  return (
    <div className="p-2 p-md-4">
      <h3 className="mid-caption--lead fw-semibold text-black">{title}</h3>
      <p className="mid-caption">{subtitle}</p>
      <ul
        className="nav nav-tabs mid-nav-tabs lightgrey-bg-a3"
        id="myTab"
        role="tablist"
      >
        {['Grafico', 'Tabella dati', 'Info'].map((name, i) => (
          <li
            key={`${id}-tab_${i}`}
            className="nav-item lightgrey-bg-a3"
            id="dataviz-tabs"
          >
            <a
              aria-controls={`tab${i + 1}-${id}-content`}
              aria-selected="true"
              className={`nav-link ${i === 0 ? 'active' : ''}`}
              data-bs-toggle="tab"
              href={`#tab${i + 1}-${id}-content`}
              id={`tab${i + 1}-${id}`}
              role="tab"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content mid-tabs-content" id="myTabContent">
        <div
          aria-labelledby={`tab1-${id}`}
          className="tab-pane mid-tabs-pane my-4 fade show active"
          style={{ height: config.h }}
          id={`tab1-${id}-content`}
          role="tabpanel"
        >
          {/* <div key={id} className="d-flex justify-content-center"> */}
          <div key={id} className="mid-chart" style={{ height: config.h }}>
            {chartType === 'pie' ? (
              <PieChart
                id={id}
                config={config}
                dataSource={dataSource}
                setEchartInstance={setEchartInstance}
              />
            ) : (
              <BasicChart
                id={id}
                config={config}
                dataSource={dataSource}
                setEchartInstance={setEchartInstance}
              />
            )}
          </div>
        </div>
        <div
          aria-labelledby={`tab2-${id}`}
          className="tab-pane mid-tabs-pane py-4 fade"
          id={`tab2-${id}-content`}
          role="tabpanel"
        >
          <Table id={id} ds={dataSource} />
        </div>
        <div
          aria-labelledby={`tab3-${id}`}
          className="tab-pane mid-tabs-pane py-4 fade"
          id={`tab3-${id}-content`}
          role="tabpanel"
        >
          <div dangerouslySetInnerHTML={{ __html: `${info || ' '}` }} />
        </div>
      </div>
      <div className="d-md-flex justify-content-md-between">
        <div className="py-2">
          <span className="fw-semibold text-uppercase">
            {labelsSource || 'Fonte dati'}:
          </span>
          <a
            href={source}
            className="ms-2 fw-semibold"
            target="_blank"
            aria-label={labelsSource || 'Fonte dati'}
          >
            {source}
          </a>
        </div>
        <div className="py-2 d-flex flex-wrap align-items-center">
          <span className="ps-md-2 pe-3 pe-md-0 pb-3 pb-md-0 fw-bold text-primary">
            <a
              className="mid-button-link"
              title={labelsDownload || 'Scarica CSV'}
              aria-label={labelsDownload || 'Scarica CSV'}
              onClick={() => downloadCSV(csvData, id)}
            >
              {labelsDownload || 'Scarica'} CSV
              <svg
                className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={`${labelsDownload || 'Scarica'} CSV`}
                role="img"
              >
                <use href="/images/sprite.svg#it-download"></use>
              </svg>
            </a>
          </span>
          <span className="ps-md-2 pe-3 pe-md-0 pb-3 pb-md-0 fw-bold text-primary">
            <button
              className="mid-button-link"
              title={labelsDownload || 'Scarica PNG'}
              aria-label={labelsDownload || 'Scarica PNG'}
              onClick={() => downLoadPng(echartInstance, id)}
            >
              {labelsDownload || 'Scarica'} PNG
              <svg
                className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={`${labelsDownload || 'Scarica'} PNG`}
                role="img"
              >
                <use href="/images/sprite.svg#it-download"></use>
              </svg>
            </button>
          </span>
          <span className="ps-md-2 fw-bold text-primary">
            <button
              className="mid-button-link"
              title={labelsShare || 'Condividi'}
              aria-label={labelsShare || 'Condividi'}
            >
              {labelsShare || 'Condividi'}
              <svg
                className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={labelsShare || 'Condividi'}
                role="img"
              >
                <use href="/images/sprite.svg#it-share"></use>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
