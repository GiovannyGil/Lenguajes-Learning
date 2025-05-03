// Importaciones de módulos y librerías necesarias
import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import * as tf from '@tensorflow/tfjs';

// Nombre de la clave para almacenar las fotos en el almacenamiento
const PHOTO_STORAGE = 'photos';

// Declaración de la función personalizada usePhotoGallery
export function usePhotoGallery() {
    // Declaración de variables de estado
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const [topPredictions, setTopPredictions] = useState<{ label: string; confidence: number }[]>([]);
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    // Efecto de carga inicial para cargar el modelo y las categorías
    useEffect(() => {
        async function loadModelAndCategories() {
            // Cargar el modelo
            const loadedModel = await tf.loadLayersModel('/src/models/model.json');
            setModel(loadedModel);

            // Cargar las categorías
            const response = await fetch('/src/models/categories.json');
            const categoriesData = await response.json();
            setCategories(categoriesData);
        }

        loadModelAndCategories();
    }, []);

    // Función para guardar una foto
    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        let base64Data: string|Blob;

        if (isPlatform('hybrid')) {
            // Leer el archivo en entornos híbridos
            const file = await Filesystem.readFile({
                path: photo.path!,
            });
            base64Data = file.data;
        } else {
            // Obtener datos en formato base64 desde la ruta web de la foto
            base64Data = await base64FromPath(photo.webPath!);
        }

        // Escribir el archivo en el sistema de archivos
        const savedFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        if (isPlatform('hybrid')) {
            // Devolver la ruta del archivo y la ruta web en entornos híbridos
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        } else {
            // Devolver la ruta del archivo y la ruta web en entornos web
            return {
                filepath: fileName,
                webviewPath: photo.webPath,
            };
        }
    };

    // Función para eliminar una foto
    const deletePhoto = async (photoIndex: number) => {
        // Filtrar las fotos para eliminar la seleccionada
        const updatedPhotos = photos.filter((_, index) => index !== photoIndex);
        setPhotos(updatedPhotos);

        // Actualizar las fotos en el almacenamiento
        Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(updatedPhotos) });
    };

    // Función para seleccionar una foto y realizar predicciones
    const seleccionarFoto = async (photo: string) => {
        try {
            const image = new Image();
            image.src = photo;

            await image.onload;

            // Crear un lienzo y dibujar la imagen en él
            const canvas = document.createElement('canvas');
            canvas.width = 50;
            canvas.height = 50;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(image, 0, 0, 50, 50);
            }

            // Convertir el lienzo a un tensor de TensorFlow
            const tensor = tf.browser.fromPixels(canvas).toFloat().div(tf.scalar(255));
            const inputTensor = tensor.expandDims();

            // Realizar la predicción con el tensor de entrada redimensionado y preprocesado
            if (model) {
                const predictions = await model.predict(inputTensor) as tf.Tensor;
                // Resto de la lógica de predicción
                const predictionData = await predictions.data();
                const topPredictions = Array.from(predictionData)
                    .map((confidence, index) => ({ confidence, label: categories[index] }))
                    .sort((a, b) => b.confidence - a.confidence)
                    .slice(0, 3); // Obtener las 3 principales predicciones

                console.log(topPredictions); // Imprimir las predicciones en la consola
                setTopPredictions(topPredictions);
            } else {
                console.error('El modelo no está disponible.');
            }
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
        }
    };

    // Función para tomar una foto
    const takePhoto = async () => {
        // Obtener una foto de la cámara
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });

        // Generar un nombre de archivo único
        const fileName = Date.now() + '.jpeg';
        // Guardar la foto y obtener sus rutas
        const savedFileImage = await savePicture(photo, fileName);
        // Agregar la nueva foto a la lista de fotos
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos);
        // Actualizar las fotos en el almacenamiento
        Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
    };

    // Devolver las funciones y variables necesarias
    return {
        photos,
        takePhoto,
        deletePhoto,
        seleccionarFoto,
        topPredictions,
    };
}

// Función para obtener datos en formato base64 a partir de una ruta de archivo
export async function base64FromPath(path: string): Promise<string> {
    // Obtener la respuesta de la solicitud HTTP
    const response = await fetch(path);
    // Obtener el blob de la respuesta
    const blob = await response.blob();
    // Devolver una promesa que resuelva en formato base64
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject('El método no devolvió una cadena');
            }
        };
        // Leer el blob como una URL de datos (base64)
        reader.readAsDataURL(blob);
    });
}

// Interfaz para definir la estructura de un objeto de foto de usuario
export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}
