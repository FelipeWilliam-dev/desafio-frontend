import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

function CpuTempGraph({ temperature, setActiveData }) {
  const data = temperature.filter(d => d.temp_cpu !== undefined);

  const option = {
    title: { text: 'Temperatura da CPU (°C)' },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const d = params[0].data;
        return `
          <strong>${dayjs(d.timestamp).format('DD/MM/YY - HH:mm:ss')}</strong><br/>
          Temp. CPU: ${d.temp_cpu} °C
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
      data: data.map(d => ({ ...d, value: d.temp_cpu })),
      type: 'line',
      smooth: true,
      lineStyle: { color: '#d00000' }
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

export default CpuTempGraph;
