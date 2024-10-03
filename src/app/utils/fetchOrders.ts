const baseURL = "/api/orders"

export const fetchOrders = async () =>{
    try{
        const response = await fetch(baseURL);
        if(!response.ok){
            throw new Error('Failed to fetch orders' + await response.text());
        }
        return await response.json();
        }catch (error){
            console.error('Error fetching farmers:', error);
            throw error;
        }
}