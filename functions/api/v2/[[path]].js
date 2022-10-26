// const jsonResponse = (value: any, init: ResponseInit = {}) =>
//   new Response(JSON.stringify(value), {
//     headers: { "Content-Type": "application/json", ...init.headers },
//     ...init,
//   });

const validPath = ['summary.json', 'status.json', 'components.json', 'incidents/unresolved.json', 'incidents.json', 'scheduled-maintenances/upcoming.json', 'scheduled-maintenances/active.json', 'scheduled-maintenances.json'];

export async function onRequestGet({ params }) {
    if(!validPath.includes(params.path)){
        return new Response(JSON.stringify({}), {
            headers: { "Content-Type": "application/json", ...init.headers },
        });
    }
    
    const res = await fetch(`https://www.githubstatus.com/api/v2/${params.path}`);
    
    const data = await res.json();
    
    const info = JSON.stringify(data, null, 2);
    
    return new Response(info);
}
