"use client"
import React, { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaTimes } from "react-icons/fa";
import { addMaterial } from "@/app/utils/addMaterials";
import { MaterialData } from "../../utils/types";

const schema = yup.object().shape({
  material_name: yup.string().required("Material name is required"),
  brand_name: yup.string().required("Brand name is required"),
  category_name: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
  quantity: yup.number().required("Quantity is required").positive().integer(),
  price: yup.number().required("Price is required").positive(),
});

const AddMaterialModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MaterialData>({
    resolver: yupResolver(schema) as unknown as Resolver<MaterialData>,
    defaultValues: {
      material_name: "",
      brand_name: "",
      category_name: "",
      description: "",
      quantity: 0,
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<MaterialData> = async (data) => {
    setLoading(true);
    setFeedbackMessage(null);

    try {
      const response = await addMaterial(data);

      if (response.error) {
        setFeedbackMessage(`Failed to add material: ${response.error}`);
        setFeedbackType("error");
      } else {
        setFeedbackMessage("Material added successfully!");
        setFeedbackType("success");
        reset();
      }
    }catch (error: unknown) {
      let errorMessage = "Failed to add material: Unknown error";
  
      if (error instanceof Error) {
        errorMessage = `Failed to add material: ${error.message}`;
      }
  
      setFeedbackMessage(errorMessage);
      setFeedbackType("error");
    } finally {
      setLoading(false);  
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-3xl font-bold text-[#263C5A]">Add Materials</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-3xl">
                <label className="block font-medium text-2xl mb-1">
                  Material Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("material_name")}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.material_name ? "border-red-500" : ""
                  }`}
                />
                {errors.material_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.material_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1 mt-4 text-2xl">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("brand_name")}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.brand_name ? "border-red-500" : ""
                  }`}
                />
                {errors.brand_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.brand_name.message}
                  </p>
                )}
              </div>

              <label className="block text-2xl font-medium mb-1 mt-4">
                Category Name <span className="text-red-500">*</span>
              </label>

              <select
                {...register("category_name")}
                className={`w-full border px-3 py-2 rounded-md ${
                  errors.category_name ? "border-red-500" : ""
                }`}
              >
                <option value="">Select a category</option>
                <option value="Building materials">Building materials</option>
                <option value="Finishing materials">Finishing materials</option>
                <option value="Hardware and tools">Hardware and tools</option>
              </select>

              {errors.category_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_name.message}
                </p>
              )}

              <div>
                <label className="block text-2xl font-medium mb-1 mt-4">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description")}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Do not exceed 100 characters when entering the description
                </p>
              </div>
            </div>

            <div>
              <div>
                <label className="block text-2xl font-medium mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("quantity")}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.quantity ? "border-red-500" : ""
                  }`}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-2xl font-medium mb-1 mt-4">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("price")}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {feedbackMessage && (
            <div
              className={`mt-4 ${
                feedbackType === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {feedbackMessage}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-white text-[#F8B612] font-bold border border-[#263C5A] rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#F8B612] text-[#263C5A] font-bold rounded-lg hover:bg-[#E6A300] transition-colors duration-300"
            >
              {loading ? "Submitting..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaterialModal;
