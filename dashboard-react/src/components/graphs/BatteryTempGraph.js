import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

function BatteryTempGraph({ temperature, setActiveData }) {
  const data = temperature.filter(d => d.temp_bat !== undefined);

  const option = {
    title: { text: 'Temperatura da Bateria (°C)' },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const d = params[0].data;
        return `
          <strong>${dayjs(d.timestamp).format('DD/MM/YY - HH:mm:ss')}</strong><br/>
          Temp. Bateria: ${d.temp_bat} °C
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
      data: data.map(d => ({ ...d, value: d.temp_bat })),
      type: 'line',
      smooth: true,
      lineStyle: { color: '#ff7300' }
    }]
  };

  const handleMouseOver = (e) => {
    if (e?.data) setActiveData(e.data);
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 300 }}
      onEvents={{ mouseover: handleMouseOver }}
    />
  );
}

export default BatteryTempGraph;
