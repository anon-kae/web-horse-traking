(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{534:function(t,n,e){"use strict";e.d(n,"b",(function(){return x})),e.d(n,"a",(function(){return M})),e.d(n,"e",(function(){return v})),e.d(n,"f",(function(){return k})),e.d(n,"c",(function(){return y})),e.d(n,"d",(function(){return A}));var r=e(537),o=e.n(r),c=e(538),f=e.n(c),d=e(539),l=e.n(d),m=e(540),h=e.n(m),Y=e(541),w=e.n(Y);function x(t){return o()(t).format("DD MMMM YYYY h:mm:ss A")}function M(t){return o()(t).format("DD MMMM YYYY")}function v(t){return o()(t).format("h:mm:ss A")}function k(t){return o()(t).format("YYYY")}function y(t){return o()(t).format("MMMM")}function A(t){return o()(t).fromNow()}o.a.extend(f.a),o.a.extend(l.a),o.a.extend(h.a),o.a.extend(w.a),o.a.tz.setDefault("Asia/Bangkok");o.a},561:function(t,n){},569:function(t,n){},570:function(t,n){},571:function(t,n){},572:function(t,n){},573:function(t,n){},574:function(t,n){},575:function(t,n){},590:function(t,n,e){"use strict";e.r(n);var r=e(532),o=e(21),c=(e(5),e(90),e(559)),f=e.n(c),d=e(534),l={name:"LandingPage",data:function(){return{data:[],options:{chart:{id:"realtime",height:350,width:"100%",type:"line",animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:1e3}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth"},title:{text:"Back sensor",align:"left"},markers:{size:0},legend:{show:!0},xaxis:{type:"datetime",rang:7e6,labels:{formatter:function(t,n){return Object(d.e)(n)}}}},series:[{name:"ความเร่งแกน X",data:[]},{name:"ความเร่งแกน Y",data:[]},{name:"ความเร่งแกน Z",data:[]}]}},mounted:function(){var t=this;this.client=f.a.connect("mqtt://157.245.53.254",{port:8083,username:"horse-traking",password:"123456"}),this.client.subscribe("horse/accumulator/two"),this.client.on("message",(function(n,e){var r=e.toString().split(",");if(r.length>2){var c=Object(o.a)(r,3),f=c[0],d=c[1],l=c[2],m=new Date;t.data.push({value:{AcX:f,AcY:d,AcZ:l},date:m}),t.series[0].data.push({x:m,y:parseInt(f)}),t.series[1].data.push({x:m,y:parseInt(d)}),t.series[2].data.push({x:m,y:parseInt(l)}),t.$refs.chart.updateSeries(t.series,!1,!0),localStorage.setItem("labs2",JSON.stringify(t.data))}else t.$refs.chart.updateSeries(t.series,!1,!0)}))}},m=e(75),component=Object(m.a)(l,(function(){var t=this,n=t._self._c;return n(r.a,[n("ApexCharts",{ref:"chart",attrs:{options:t.options,series:t.series,"chart-id":"lineChart"}}),t._v(" "),n("client-only")],1)}),[],!1,null,null,null);n.default=component.exports}}]);