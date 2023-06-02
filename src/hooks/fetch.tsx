const doGraphQLFetch = async (url: string, query: string, variables?: object) => { 
    const header: HeadersInit = {
        'Content-Type': 'application/json',
    };
        
    const response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({query, variables}),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const json = await response.json();
    return json.data;
};

export {doGraphQLFetch};