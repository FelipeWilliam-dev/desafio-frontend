import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';

function CurrentGraph({ battery, setActiveData }) {
  const data = battery.filter(d => d.inst_curr !== undefined);

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const d = params[0].data;
        return `
          <strong>${dayjs(d.timestamp).format('DD/MM/YY - HH:mm:ss')}</strong><br/>
          Corrente: ${d.inst_curr} mAh
          SASD: ${d.rem_cap}
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
    <>
    
    <div className='graph-back-area'>
      <h2>Corrente Instantânea (mAh)</h2>
      <ReactECharts
        option={option}
        style={{ height: 500, width: '100%'}}
        onEvents={{ mouseover: handleMouseOver }}
      />
    </div>
    </>
  );
}

export default CurrentGraph;
