export const EditPhotoSave = async (base64Image) => {
    const CLOUDINARY_URL = import.meta.env.VITE_VERCEL_CLOUDINARY_URL;

    const blob = await (await fetch(base64Image)).blob(); // Convierte la cadena base64 en un Blob

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'ladyfitLovers');

    try {
        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            
            return data.secure_url; // Obten la URL de la imagen desde la respuesta
        } else {
            console.error('Error al cargar la imagen base64 a Cloudinary');
            return null; // O devuelve un valor apropiado en caso de error
        }
    } catch (error) {
        console.error('Error al cargar la imagen base64:', error);
        return null; // O devuelve un valor apropiado en caso de error
    }

};