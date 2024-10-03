// const BASE_URL = process.env.BASE_URL;


// export const fetchOrder = async () => {
//   try {
//     const url = `${BASE_URL}/api/orderdetails/`;
//     console.log('Fetching from URL:', url); // Add this line
//     const response = await fetch(url);
//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       console.error('Error response:', errorData);
//       throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     throw error;
//   }
// };


const baseURL = "/api/orderdetails"

export const fetchOrder = async () => {
    try {
      console.log('Fetching orders from:', baseURL);
      const response = await fetch(baseURL);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch orders:', errorText);
        throw new Error('Failed to fetch orders: ' + errorText);
      }
  
      const data = await response.json();
      console.log('Fetched data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  };

// export const fetchOrder = async () =>{
//     try{
//         const response = await fetch(baseURL);
//         if(!response.ok){
//             throw new Error('Failed to fetch orders' + await response.text());
//         }
//         return await response.json();
//         }catch (error){
//             console.error('Error fetching orders:', error);
//             throw error;
//         }
// }