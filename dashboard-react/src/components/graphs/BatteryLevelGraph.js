import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

function BatteryLevelGraph({ data, setActiveData }) {
  const filtered = data.filter(d => d.battery_level !== undefined);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const d = params[0].data;
        setTimeout(() => setActiveData(d), 0);
        return `
          <strong>${dayjs(d.timestamp).format('DD/MM/YY - HH:mm:ss')}</strong><br/>
          Current: ${d.inst_curr ?? '-'} mAh<br/>
          Capacity: ${d.battery_level ?? '-'} %<br/>
          Temp. Battery: ${d.temp_bat != null ? (d.temp_bat / 1000).toFixed(1) : '-'} °C<br/>
          Temp. CPU: ${d.temp_cpu != null ? (d.temp_cpu / 1000).toFixed(1) : '-'} °C
        `;
      }
    },
    xAxis: {
      type: 'category',
      data: filtered.map(d => dayjs(d.timestamp).format('HH:mm:ss')),
      axisLabel: { rotate: 45 }
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: filtered.map(d => ({ ...d, value: d.battery_level })),
        type: 'line',
        areaStyle: {}
      }
    ]
  };

  const handleMouseOver = (e) => {
    if (e?.data)
      setActiveData(e.data);
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
