(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{536:function(n,t,e){"use strict";e.d(t,"b",(function(){return x})),e.d(t,"a",(function(){return M})),e.d(t,"e",(function(){return v})),e.d(t,"f",(function(){return y})),e.d(t,"c",(function(){return k})),e.d(t,"d",(function(){return D}));var r=e(538),o=e.n(r),c=e(539),f=e.n(c),d=e(540),l=e.n(d),m=e(541),h=e.n(m),Y=e(542),w=e.n(Y);function x(n){return o()(n).format("DD MMMM YYYY h:mm:ss A")}function M(n){return o()(n).format("DD MMMM YYYY")}function v(n){return o()(n).format("h:mm:ss A")}function y(n){return o()(n).format("YYYY")}function k(n){return o()(n).format("MMMM")}function D(n){return o()(n).fromNow()}o.a.extend(f.a),o.a.extend(l.a),o.a.extend(h.a),o.a.extend(w.a),o.a.tz.setDefault("Asia/Bangkok");o.a},560:function(n,t){},567:function(n,t){},568:function(n,t){},569:function(n,t){},570:function(n,t){},571:function(n,t){},572:function(n,t){},573:function(n,t){},589:function(n,t,e){"use strict";e.r(t);var r=e(532),o=e(21),c=(e(27),e(5),e(90),e(558)),f=e.n(c),d=e(536),l={name:"LandingPage",props:{round:{type:Number,required:!0}},data:function(){return{options:{chart:{id:"realtime",height:350,width:"100%",type:"line",animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:1e3}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth"},title:{text:"Front sensor",align:"left"},markers:{size:0},legend:{show:!0},xaxis:{type:"datetime",rang:7e6,labels:{formatter:function(n,t){return Object(d.e)(t)}}}},series:[{name:"ความเร่งแกน X",data:[]},{name:"ความเร่งแกน Y",data:[]},{name:"ความเร่งแกน Z",data:[]}]}},mounted:function(){var n=this;this.client=f.a.connect("mqtt://157.245.53.254",{port:8083,username:"horse-traking",password:"123456"}),this.client.subscribe("horse/accumulator/one"),this.client.on("message",(function(t,e){var r=e.toString().split(",");if(r.length>2){var c=Object(o.a)(r,3),f=c[0],d=c[1],l=c[2],m=new Date;n.series[0].data.push({x:m,y:parseInt(f)}),n.series[1].data.push({x:m,y:parseInt(d)}),n.series[2].data.push({x:m,y:parseInt(l)}),n.$refs.chart.updateSeries(n.series,!1,!0)}else n.$refs.chart.updateSeries(n.series,!1,!0)}))}},m=e(75),component=Object(m.a)(l,(function(){var n=this,t=n._self._c;return t(r.a,[t("ApexCharts",{ref:"chart",attrs:{options:n.options,series:n.series,"chart-id":"lineChart"}}),n._v(" "),t("client-only")],1)}),[],!1,null,null,null);t.default=component.exports}}]);