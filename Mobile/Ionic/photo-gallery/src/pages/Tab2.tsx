// Importaciones de módulos y componentes de Ionic
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonActionSheet,
    IonFabList,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
  } from '@ionic/react';
  
  // Importaciones de iconos de Ionicons
  import {
    add,
    trashSharp,
    camera,
    trash,
    close,
    ellipsisVerticalSharp,
    clipboardSharp,
  } from 'ionicons/icons';
  
  // Importación del componente ExploreContainer
  import ExploreContainer from '../components/ExploreContainer';
  
  // Estilos CSS específicos para Tab2
  import './Tab2.css';
  
  // Importación de la función personalizada usePhotoGallery
  import { usePhotoGallery } from '../hooks/usePhotoGallery';
  
  // Definición del componente Tab1
  const Tab1: React.FC = () => {
    // Llamada a la función usePhotoGallery y asignación de resultados a variables
    const { photos, takePhoto, deletePhoto, seleccionarFoto, topPredictions } = usePhotoGallery();
  
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
          {/* Cuadrícula para mostrar fotos */}
          <IonGrid>
            <IonRow>
              {/* Mapeo y renderizado de fotos */}
              {photos.map((photo, index) => (
                <IonCol size="12" key={photo.filepath}>
                  {/* Botones para acciones en la foto */}
                  <IonFab vertical="top" horizontal="end">
                    {/* Botón para eliminar la foto */}
                    <IonFabButton color="danger" size="small" onClick={() => deletePhoto(index)}>
                      <IonIcon icon={trashSharp}></IonIcon>
                    </IonFabButton>
                    {/* Botón para seleccionar la foto */}
                    <IonFabButton color="success" size="small" onClick={() => seleccionarFoto(photo.webviewPath)}>
                      <IonIcon icon={clipboardSharp}></IonIcon>
                    </IonFabButton>
                  </IonFab>
  
                  {/* Mostrar la imagen */}
                  <IonImg src={photo.webviewPath} />
  
                  {/* Mostrar predicciones si existen */}
                  {topPredictions.length > 0 && (
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>Predicción</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        {topPredictions.length > 0 ? (
                          // Mapear y mostrar predicciones
                          topPredictions.map((prediction, index) => (
                            <div key={index}>
                              <p>Categoría: {prediction.label}</p>
                              <p>Confianza: {(prediction.confidence * 100).toFixed(2)}%</p>
                            </div>
                          ))
                        ) : (
                          // Mensaje si no hay predicciones
                          <p>No se han realizado predicciones aún.</p>
                        )}
                      </IonCardContent>
                    </IonCard>
                  )}
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
  
          {/* Botón flotante para tomar una foto */}
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
  
  // Exportar el componente Tab1
  export default Tab1;
  