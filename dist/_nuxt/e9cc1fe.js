(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{534:function(t,e,n){"use strict";n.d(e,"b",(function(){return y})),n.d(e,"a",(function(){return M})),n.d(e,"e",(function(){return D})),n.d(e,"f",(function(){return S})),n.d(e,"c",(function(){return w})),n.d(e,"d",(function(){return Y}));var r=n(537),o=n.n(r),f=n(538),h=n.n(f),c=n(539),d=n.n(c),l=n(540),m=n.n(l),$=n(541),v=n.n($);function y(t){return o()(t).format("DD MMMM YYYY h:mm:ss A")}function M(t){return o()(t).format("DD MMMM YYYY")}function D(t){return o()(t).format("h:mm:ss A")}function S(t){return o()(t).format("YYYY")}function w(t){return o()(t).format("MMMM")}function Y(t){return o()(t).fromNow()}o.a.extend(h.a),o.a.extend(d.a),o.a.extend(m.a),o.a.extend(v.a),o.a.tz.setDefault("Asia/Bangkok");o.a},537:function(t,e,n){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},y=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},M={s:y,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+y(r,2,"0")+":"+y(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=v;var p=function(t){return t instanceof O},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new O(n)},Y=M;Y.l=S,Y.i=p,Y.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var O=function(){function v(t){this.$L=S(t.locale,null,!0),this.parse(t)}var y=v.prototype;return y.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(Y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},y.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},y.$utils=function(){return Y},y.isValid=function(){return!(this.$d.toString()===l)},y.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},y.isAfter=function(t,e){return w(t)<this.startOf(e)},y.isBefore=function(t,e){return this.endOf(e)<w(t)},y.$g=function(t,e,n){return Y.u(t)?this[e]:this.set(n,t)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(t,e){var n=this,r=!!Y.u(e)||e,h=Y.p(t),l=function(t,e){var i=Y.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},m=function(t,e){return Y.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},$=this.$W,v=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,v):l(0,v+1);case o:var g=this.$locale().weekStart||0,D=($<g?$+7:$)-g;return l(r?y-D:y+(6-D),v);case a:case d:return m(M+"Hours",0);case u:return m(M+"Minutes",1);case s:return m(M+"Seconds",2);case i:return m(M+"Milliseconds",3);default:return this.clone()}},y.endOf=function(t){return this.startOf(t,!1)},y.$set=function(t,e){var n,o=Y.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],m=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var $=this.clone().set(d,1);$.$d[l](m),$.init(),this.$d=$.set(d,Math.min(this.$D,$.daysInMonth())).$d}else l&&this.$d[l](m);return this.init(),this},y.set=function(t,e){return this.clone().$set(t,e)},y.get=function(t){return this[Y.p(t)]()},y.add=function(r,h){var d,l=this;r=Number(r);var m=Y.p(h),$=function(t){var e=w(l);return Y.w(e.date(e.date()+Math.round(t*r)),l)};if(m===f)return this.set(f,this.$M+r);if(m===c)return this.set(c,this.$y+r);if(m===a)return $(1);if(m===o)return $(7);var v=(d={},d[s]=e,d[u]=n,d[i]=t,d)[m]||1,y=this.$d.getTime()+r*v;return Y.w(y,this)},y.subtract=function(t,e){return this.add(-1*t,e)},y.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=Y.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return Y.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:Y.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:Y.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:Y.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:Y.s(u,2,"0"),s:String(this.$s),ss:Y.s(this.$s,2,"0"),SSS:Y.s(this.$ms,3,"0"),Z:i};return r.replace($,(function(t,e){return e||m[t]||i.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(r,d,l){var m,$=Y.p(d),v=w(r),y=(v.utcOffset()-this.utcOffset())*e,M=this-v,g=Y.m(this,v);return g=(m={},m[c]=g/12,m[f]=g,m[h]=g/3,m[o]=(M-y)/6048e5,m[a]=(M-y)/864e5,m[u]=M/n,m[s]=M/e,m[i]=M/t,m)[$]||M,l?g:Y.a(g)},y.daysInMonth=function(){return this.endOf(f).$D},y.$locale=function(){return D[this.$L]},y.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},y.clone=function(){return Y.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},v}(),T=O.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,O,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}()},538:function(t,e,n){t.exports=function(){"use strict";return function(t,e,n){t=t||{};var r=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(t,e,n,o){return r.fromToBase(t,e,n,o)}n.en.relativeTime=o,r.fromToBase=function(e,r,i,f,u){for(var h,a,s,c=i.$locale().relativeTime||o,d=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],l=d.length,m=0;m<l;m+=1){var $=d[m];$.d&&(h=f?n(e).diff(i,$.d,!0):i.diff(e,$.d,!0));var p=(t.rounding||Math.round)(Math.abs(h));if(s=h>0,p<=$.r||!$.r){p<=1&&m>0&&($=d[m-1]);var v=c[$.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,r,$.l,s);break}}if(r)return a;var y=s?c.future:c.past;return"function"==typeof y?y(a):y.replace("%s",a)},r.to=function(t,e){return i(t,e,this,!0)},r.from=function(t,e){return i(t,e,this)};var f=function(t){return t.$u?n.utc():n()};r.toNow=function(t){return this.to(f(this),t)},r.fromNow=function(t){return this.from(f(this),t)}}}()},539:function(t,e,n){t.exports=function(){"use strict";var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,n,r){var u=n.prototype;r.utc=function(t){return new n({date:t,utc:!0,args:arguments})},u.utc=function(i){var e=r(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var f=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else f.call(this)};var a=u.utcOffset;u.utcOffset=function(s,n){var r=this.$utils().u;if(r(s))return this.$u?0:r(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var n=(""+s[0]).match(e)||["-",0,0],r=n[0],u=60*+n[1]+ +n[2];return 0===u?0:"+"===r?u:-u}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(n)return o.$offset=u,o.$u=0===s,o;if(0!==s){var f=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+f,t)).$offset=u,o.$x.$localOffset=f}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return!!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var c=u.toDate;u.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():c.call(this)};var d=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return d.call(this,t,i,e);var s=this.local(),n=r(t).local();return d.call(s,n,i,e)}}}()},540:function(t,e,n){t.exports=function(){"use strict";var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,r){var o,a=function(t,n,i){void 0===i&&(i={});var r=new Date(t),o=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",r=t+"|"+i,o=e[r];return o||(o=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[r]=o),o}(n,i);return o.formatToParts(r)},u=function(e,n){for(var i=a(e,n),o=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,h=f.value,c=t[s];c>=0&&(o[c]=parseInt(h,10))}var d=o[3],l=24===d?0:d,m=o[0]+"-"+o[1]+"-"+o[2]+" "+l+":"+o[4]+":"+o[5]+":000",$=+e;return(r.utc(m).valueOf()-($-=$%1e3))/6e4},f=i.prototype;f.tz=function(t,e){void 0===t&&(t=o);var n=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:t}),u=Math.round((i-new Date(a))/1e3/60),f=r(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-u,!0);if(e){var s=f.utcOffset();f=f.add(n-s,"minute")}return f.$x.$timezone=t,f},f.offsetName=function(t){var e=this.$x.$timezone||r.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return"timezonename"===t.type.toLowerCase()}));return n&&n.value};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=r(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return s.call(n,t,e).tz(this.$x.$timezone,!0)},r.tz=function(t,e,n){var i=n&&e,a=n||e||o,f=u(+r(),a);if("string"!=typeof t)return r(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,r=u(i,n);if(e===r)return[i,e];var o=u(i-=60*(r-e)*1e3,n);return r===o?[i,r]:[t-60*Math.min(r,o)*1e3,Math.max(r,o)]}(r.utc(t,i).valueOf(),f,a),h=s[0],c=s[1],d=r(h).utcOffset(c);return d.$x.$timezone=a,d},r.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},r.tz.setDefault=function(t){o=t}}}()},541:function(t,e,n){t.exports=function(){"use strict";var t,s,e=1e3,i=6e4,n=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,u=31536e6,f=2592e6,a=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,h={years:u,months:f,days:r,hours:n,minutes:i,seconds:e,milliseconds:1,weeks:6048e5},c=function(t){return t instanceof p},d=function(t,s,e){return new p(t,e,s.$l)},l=function(t){return s.p(t)+"s"},m=function(t){return t<0},$=function(t){return m(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},g=function(t,s){return t?m(t)?{negative:!0,format:""+v(t)+s}:{negative:!1,format:""+t+s}:{negative:!1,format:""}},p=function(){function m(t,s,e){var i=this;if(this.$d={},this.$l=e,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),s)return d(t*h[l(s)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(s){i.$d[l(s)]=t[s]})),this.calMilliseconds(),this;if("string"==typeof t){var n=t.match(a);if(n){var r=n.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=m.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(s,e){return s+(t.$d[e]||0)*h[e]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=$(t/u),t%=u,this.$d.months=$(t/f),t%=f,this.$d.days=$(t/r),t%=r,this.$d.hours=$(t/n),t%=n,this.$d.minutes=$(t/i),t%=i,this.$d.seconds=$(t/e),t%=e,this.$d.milliseconds=t},v.toISOString=function(){var t=g(this.$d.years,"Y"),s=g(this.$d.months,"M"),e=+this.$d.days||0;this.$d.weeks&&(e+=7*this.$d.weeks);var i=g(e,"D"),n=g(this.$d.hours,"H"),r=g(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var u=g(o,"S"),f=t.negative||s.negative||i.negative||n.negative||r.negative||u.negative,a=n.format||r.format||u.format?"T":"",h=(f?"-":"")+"P"+t.format+s.format+i.format+a+n.format+r.format+u.format;return"P"===h||"-P"===h?"P0D":h},v.toJSON=function(){return this.toISOString()},v.format=function(t){var e=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:s.s(this.$d.years,2,"0"),YYYY:s.s(this.$d.years,4,"0"),M:this.$d.months,MM:s.s(this.$d.months,2,"0"),D:this.$d.days,DD:s.s(this.$d.days,2,"0"),H:this.$d.hours,HH:s.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:s.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:s.s(this.$d.seconds,2,"0"),SSS:s.s(this.$d.milliseconds,3,"0")};return e.replace(o,(function(t,s){return s||String(i[t])}))},v.as=function(t){return this.$ms/h[l(t)]},v.get=function(t){var s=this.$ms,e=l(t);return"milliseconds"===e?s%=1e3:s="weeks"===e?$(s/h[e]):this.$d[e],0===s?0:s},v.add=function(t,s,e){var i;return i=s?t*h[l(s)]:c(t)?t.$ms:d(t,this).$ms,d(this.$ms+i*(e?-1:1),this)},v.subtract=function(t,s){return this.add(t,s,!0)},v.locale=function(t){var s=this.clone();return s.$l=t,s},v.clone=function(){return d(this.$ms,this)},v.humanize=function(s){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!s)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},m}();return function(e,i,n){t=n,s=n().$utils(),n.duration=function(t,s){var e=n.locale();return d(t,{$l:e},s)},n.isDuration=c;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,s){return c(t)&&(t=t.asMilliseconds()),r.bind(this)(t,s)},i.prototype.subtract=function(t,s){return c(t)&&(t=t.asMilliseconds()),o.bind(this)(t,s)}}}()},593:function(t,e,n){"use strict";n.r(e);var r=n(532),o=(n(5),n(13),n(534)),f={name:"LandingPage",props:{valueChart:{type:Array||Object,required:!0},title:{type:String,required:!0}},data:function(){return{data:[],options:{chart:{id:"realtime",height:350,width:"100%",type:"line",animations:{enabled:!0,easing:"linear",dynamicAnimation:{speed:1e3}},toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{curve:"smooth"},title:{text:"Back sensor",align:"left"},markers:{size:0},legend:{show:!0},xaxis:{type:"datetime",rang:7e6,labels:{formatter:function(t,e){return Object(o.e)(e)}}}},series:[{name:"ความเร่งแกน X",data:[]},{name:"ความเร่งแกน Y",data:[]},{name:"ความเร่งแกน Z",data:[]}]}},mounted:function(){var t=this;this.valueChart.forEach((function(e){var n=e.date,r=e.value;t.series[0].data.push({x:new Date(n),y:parseInt(r.AcX)}),t.series[1].data.push({x:new Date(n),y:parseInt(r.AcY)}),t.series[2].data.push({x:new Date(n),y:parseInt(r.AcZ)})})),this.$refs.chartBackHistory.updateSeries(this.series,!1,!0),this.$refs.chartBackHistory.updateOptions({title:{text:"Back sensor of ".concat(this.title)}})}},h=n(75),component=Object(h.a)(f,(function(){var t=this,e=t._self._c;return e(r.a,[e("ApexCharts",{ref:"chartBackHistory",attrs:{options:t.options,series:t.series,"chart-id":"lineChart"}}),t._v(" "),e("client-only")],1)}),[],!1,null,null,null);e.default=component.exports}}]);