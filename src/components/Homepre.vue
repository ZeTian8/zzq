<template>
<!-- 首页图表 -->
  <div>
    <chart-block
      id="pie"
      style="width: 450px; height: 400px;"
      ref="charts"
    ></chart-block>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  //饼状图
  mounted() {
    let Chart = echarts.init(document.getElementById("pie"));
    Chart.setOption({
      tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    x: "left",
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: "center",
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "30",
            fontWeight: "bold",
          },
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" },
      ],
    },
  ],
    });
  },
};
</script>

<style lang="scss" scoped>
</style>