(function(root){
const zone='America/New_York',launch='2026-10-28';
function dayKey(now=new Date()){const p=new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);return ['year','month','day'].map(k=>p.find(x=>x.type===k).value).join('-')}
function ordinal(day){return Math.floor(Date.parse(day+'T00:00:00Z')/86400000)}
function dateAt(i){return new Date((ordinal(launch)+i)*86400000).toISOString().slice(0,10)}
function index(now=new Date()){return ordinal(dayKey(now))-ordinal(launch)}
function nextMidnight(now=new Date()){let lo=now.getTime(),hi=lo+27*3600000;const today=dayKey(now);while(hi-lo>1){const m=Math.floor((lo+hi)/2);if(dayKey(new Date(m))===today)lo=m;else hi=m}return hi}
function stats(records,today){const days=Object.keys(records).filter(d=>d<=today&&records[d].daily===true).sort();let cursor=ordinal(today),streak=0;if(!days.includes(today))cursor--;const set=new Set(days.map(ordinal));while(set.has(cursor)){streak++;cursor--}return {streak,played:days.length,correct:days.filter(d=>records[d].correct).length}}
const api={dayKey,ordinal,dateAt,index,nextMidnight,stats,launch};root.TriviaCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
