import { MaterialData } from "./types";

const url = '/api/materials';

export const addMaterial = async (details: MaterialData) => {
  const addForm = (data: MaterialData): FormData => {
    const formData = new FormData();
    formData.append('material_name', data.material_name);
    formData.append('brand_name', data.brand_name);
    formData.append('category_name', data.category_name);
    formData.append('description', data.description);
    formData.append('quantity', data.quantity.toString());
    formData.append('price', data.price.toString());

   
    return formData;
  };

  try {
    const formData = addForm(details);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to add material');
    }
    return result;
  }catch (error: unknown) { // Specify the error type as unknown
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return { error: error.message }; // Now you can safely access error.message
    } else {
      return { error: 'An unknown error occurred.' }; // Handle non-Error cases
    }
};



}