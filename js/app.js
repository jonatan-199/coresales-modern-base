fetch('data/dashboard.json').then(r=>r.json()).then(d=>{
document.getElementById('dashboard').innerHTML=`<h1>${d.title}</h1><p>${d.subtitle}</p>`;
});