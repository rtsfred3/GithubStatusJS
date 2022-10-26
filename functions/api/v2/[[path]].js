const validPath = ['summary.json', 'status.json', 'components.json', 'incidents/unresolved.json', 'incidents.json', 'scheduled-maintenances/upcoming.json', 'scheduled-maintenances/active.json', 'scheduled-maintenances.json'];

export async function onRequestGet({ params }) {
    if(!validPath.includes(params.path[0])){
        return new Response(JSON.stringify({ 'path': params.path[0] }), {
            headers: { "Content-Type": "application/json" },
        });
    }
    
    const res = await fetch(`https://www.githubstatus.com/api/v2/${params.path[0]}`);
    
    const data = await res.json();
    
    const info = JSON.stringify(data, null, 2);
    
    return new Response(info);
}
