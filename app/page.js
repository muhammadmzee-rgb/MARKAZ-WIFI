'use client';
import {useEffect,useState} from 'react';
const menu=[['▦','Dashboard'],['📡','MikroTik Routers'],['🎫','Voucher Packages'],['🎟','Vouchers'],['💰','Sales'],['💳','Payments'],['🏢','Sites'],['👥','Tenants']];
export default function Page(){
 const [active,setActive]=useState('Dashboard');
 const [routers,setRouters]=useState([]);
 const [show,setShow]=useState(false);
 const [form,setForm]=useState({name:'',host:'',user:'admin',password:'',port:'8728'});
 useEffect(()=>{try{setRouters(JSON.parse(localStorage.getItem('mw_routers')||'[]'))}catch{}},[]);
 function save(){if(!form.name||!form.host)return alert('Enter router name and IP/Host.');const x={...form,id:Date.now(),status:'Not connected'};const next=[...routers,x];setRouters(next);localStorage.setItem('mw_routers',JSON.stringify(next));setForm({name:'',host:'',user:'admin',password:'',port:'8728'});setShow(false)}
 function remove(id){const next=routers.filter(x=>x.id!==id);setRouters(next);localStorage.setItem('mw_routers',JSON.stringify(next))}
 return <div className="shell"><aside><h1>MARKAZ WIFI</h1>{menu.map(([ic,n])=><button className={active===n?'on':''} onClick={()=>setActive(n)} key={n}><span>{ic}</span>{n}</button>)}<div className="bottom">MarkazwifiBismillah<br/><small>Mock Mode</small></div></aside>
 <main><header><b>{active}</b><div>● Mock Router Mode</div></header><section className="page">
 {active==='MikroTik Routers'?<><div className="title"><div><h2>MikroTik Routers</h2><p>Add and manage MikroTik routers. Real API connection can be enabled later.</p></div><button className="primary" onClick={()=>setShow(true)}>＋ Add Router</button></div>
 <div className="panel">{routers.length===0?<div className="empty"><div className="big">📡</div><h3>No routers added</h3><p>Add your first MikroTik router to start managing it.</p><button className="primary" onClick={()=>setShow(true)}>Add MikroTik Router</button></div>:<table><thead><tr><th>Name</th><th>Host</th><th>API Port</th><th>User</th><th>Status</th><th></th></tr></thead><tbody>{routers.map(r=><tr key={r.id}><td>{r.name}</td><td>{r.host}</td><td>{r.port}</td><td>{r.user}</td><td><span className="badge">{r.status}</span></td><td><button className="delete" onClick={()=>remove(r.id)}>Delete</button></td></tr>)}</tbody></table>}</div>
 {show&&<div className="modal"><div className="modalbox"><h3>Add MikroTik Router</h3><label>Router Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Markaz Tanga"/></label><label>IP / Host<input value={form.host} onChange={e=>setForm({...form,host:e.target.value})} placeholder="e.g. 192.168.88.1"/></label><label>API Username<input value={form.user} onChange={e=>setForm({...form,user:e.target.value})}/></label><label>API Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><label>API Port<input value={form.port} onChange={e=>setForm({...form,port:e.target.value})}/></label><div className="actions"><button onClick={()=>setShow(false)}>Cancel</button><button className="primary" onClick={save}>Save Router</button></div></div></div>}
 </>:<><h2>{active}</h2><div className="panel"><h3>{active}</h3><p>This module is prepared for the next live integration. The MikroTik Routers module is already interactive in this version.</p></div></>}
 </section></main></div>
}