import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL; 

export async function PUT(request: NextRequest, { params }: { params: { material_id: string } }) {
    const { material_id } = params;

    if (!material_id) {
        return NextResponse.json({ error: 'Material ID is required' }, { status: 400 });
    }

    try {
        
        const formData = await request.formData();

        const requestData: { [key: string]: string | File } = {};
        formData.forEach((value, key) => {
            requestData[key] = value;
        });

        console.log("Received form data for update:", requestData);

        
        const response = await fetch(`${baseURL}/api/materials/${material_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("PUT error response:", errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const updatedData = await response.json();
        return NextResponse.json(updatedData, { status: 200 });

    } catch (error) {
        console.error("Error during PUT request:", error);
        return NextResponse.json(
            { error: 'An unexpected error occurred: ' + (error as Error).message },
            { status: 500 }
        );
    }
}