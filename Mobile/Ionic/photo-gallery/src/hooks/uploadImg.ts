import React, { useState, useEffect } from 'react';
import { CameraResultType, CameraSource, Camera } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import * as tf from '@tensorflow/tfjs';

// Definición del componente UploadImg
const UploadImg: React.FC = () => {
  // Variables de estado para el componente
  const [fotoSeleccionada, setFotoSeleccionada] = useState<string | undefined>(undefined);
  const [imagenCard, setImagenCard] = useState<string | undefined>(undefined);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [topPredictions, setTopPredictions] = useState<{ label: string; confidence: number }[]>([]);

  // Efecto de carga inicial para cargar el modelo y las categorías
  useEffect(() => {
    async function loadModelAndCategories() {
      // Cargar el modelo de TensorFlow
      const loadedModel = await tf.loadLayersModel('/src/models/model.json');
      setModel(loadedModel);

      // Cargar las categorías desde un archivo JSON
      const response = await fetch('/src/models/categories.json');
      const categoriesData = await response.json();
      setCategories(categoriesData);
    }

    loadModelAndCategories();
  }, []);

  // Función para realizar la predicción de la imagen
  const predecirImagen = async () => {
    if (!model || !fotoSeleccionada) {
      return;
    }

    const image = new Image();
    image.src = fotoSeleccionada;

    await image.onload;

    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dibujar la imagen en un lienzo de 50x50 píxeles
      ctx.drawImage(image, 0, 0, 50, 50);
    }
    // Convertir la imagen en un tensor de TensorFlow
    const tensor = tf.browser.fromPixels(canvas).toFloat().div(tf.scalar(255));
    const inputTensor = tensor.expandDims();

    // Realizar la predicción con el tensor de entrada redimensionado y preprocesado
    const predictions = await model.predict(inputTensor) as tf.Tensor;
    const predictionData = await predictions.data();
    const topPredictions = Array.from(predictionData)
      .map((confidence, index) => ({ confidence, label: categories[index] }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3); // Obtén las 3 principales predicciones

    console.log(topPredictions); // Imprime las predicciones en la consola
    setTopPredictions(topPredictions);
  };

  // Función para seleccionar una foto
  const seleccionarFoto = async () => {
    const { Camera } = Plugins;

    // Capturar una foto desde la galería del dispositivo
    const image = await Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64,
    });

    // Convertir la foto en formato base64
    const imagenBase64 = `data:image/jpeg;base64,${image.base64String}`;
    setFotoSeleccionada(imagenBase64);
    setImagenCard(imagenBase64);
    predecirImagen();
  };

  // Cambia esto por la representación que necesitas en tu componente UploadImg
  return null;
};

// Exportar el componente UploadImg
export default UploadImg;
