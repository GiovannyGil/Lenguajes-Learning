import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,IonImg,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonFab ,IonCardTitle, IonFabButton, IonIcon } from '@ionic/react';

// Importación del componente ExploreContainer
import ExploreContainer from '../components/ExploreContainer';

// Importaciones adicionales de React y Capacitor
import React, { useState, useEffect } from 'react';
import { CameraResultType, CameraSource, Camera } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import * as tf from '@tensorflow/tfjs';

// Importación de un icono de Ionicons
import { cloudUploadSharp } from 'ionicons/icons';

// Estilos CSS específicos para Tab1
import './Tab1.css';

// Definición del componente Tab1
const Tab1: React.FC = () => {
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

  return (
    // Componente de página principal
    <IonPage>
      {/* Encabezado de la página */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Contenido de la página */}
      <IonContent>
        <IonCard>
          <img alt="" src={imagenCard || 'https://ionicframework.com/docs/img/demos/card-media.png'} />
          <IonCardHeader>
            {/* Botón para iniciar la predicción */}
            <IonButton color="danger" size="small" onClick={() => predecirImagen()}>Predecir</IonButton>
            <IonCardTitle>Categoria</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {/* mostrar mejores conincidencias */}
            {topPredictions.length > 0 ? (
              topPredictions.map((prediction, index) => (
                <div key={index}>
                  <p>Categoría: {prediction.label}</p>
                  <p>Confianza: {(prediction.confidence * 100).toFixed(2)}%</p>
                </div>
              ))
            ) : (
              <p>No se han realizado predicciones aún.</p>
            )}
          </IonCardContent>
        </IonCard>

        {/* Botón flotante para seleccionar una foto */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => seleccionarFoto()}>
            <IonIcon icon={cloudUploadSharp} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

// Exportar el componente Tab1
export default Tab1;