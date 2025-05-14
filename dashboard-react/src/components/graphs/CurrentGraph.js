import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

function CurrentGraph({ battery, setActiveData }) {
  const data = battery.filter(d => d.inst_curr !== undefined);

  const option = {
    title: { text: 'Corrente Instantânea (mAh)' },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const d = params[0].data;
        return `
          <strong>${dayjs(d.timestamp).format('DD/MM/YY - HH:mm:ss')}</strong><br/>
          Corrente: ${d.inst_curr} mAh
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
      data: data.map(d => ({ ...d, value: d.inst_curr })),
      type: 'line',
      smooth: true,
      lineStyle: { color: '#8884d8' },
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

export default CurrentGraph;
