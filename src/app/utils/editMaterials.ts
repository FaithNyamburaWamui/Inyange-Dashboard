import { MaterialData } from './types'; 

const baseUrl = '/api/materials'; 
export const editMaterial = async (details: MaterialData) => {
    const editForm = (data: MaterialData): FormData => {
        const formData = new FormData();
        formData.append('material_name', data.material_name);
        formData.append('brand_name', data.brand_name);
        formData.append('category_name', data.category_name);
        formData.append('description', data.description);
        formData.append('quantity', data.quantity.toString());
        formData.append('price', data.price.toString());

        if (data.image && typeof data.image !== 'string') {
            formData.append('image', data.image);
        }

        return formData;
    };

    try {
        const formData = editForm(details);

        const response = await fetch(`${baseUrl}/${details.material_id}`, { 
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
        
    } catch (error) {
        console.error("Fetch error:", error); 
        return { error: error.message };
    }
};