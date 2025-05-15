import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

function BatteryLevelGraph({ battery, setActiveData }) {
  const data = battery.filter(d => d.battery_level !== undefined);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const d = params[0].data;
        return `
          <strong>${dayjs(d.timestamp).format('DD/MM/YY - HH:mm:ss')}</strong><br/>
          Capacidade: ${d.battery_level} %
        `;
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(d => dayjs(d.timestamp).format('HH:mm:ss')),
      axisLabel: { rotate: 45 }
    },
    yAxis: { type: 'value' },
    series: [{
      data: data.map(d => ({ ...d, value: d.battery_level })),
      type: 'bar',
      itemStyle: { color: '#82ca9d' }
    }]
  };

  const handleMouseOver = (e) => {
    if (e?.data) setActiveData(e.data);
  };

  return (
    <div className='graph-back-area'>
      <h2>Nível da Bateria (%)</h2>
      <ReactECharts
        option={option}
        style={{ height: 500 }}
        onEvents={{ mouseover: handleMouseOver }}
      />
    </div>
  );
}

export default BatteryLevelGraph;
