import { GeoPosition } from '@frontend/stores/driver/driverTrip.store';

export type Trip = {
  tripId: string;
  startLocation: GeoPosition;
  endLocation: GeoPosition;
};

export function watchDriverPosition(
  callback: (position: GeolocationPosition) => void,
) {
  if (navigator.geolocation) {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        callback(position);
      },
      (error) => {
        console.error('Erro ao obter a localização:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );

    return watchId;
  } else {
    console.error('Geolocalização não é suportada pelo navegador.');
    return null;
  }
}
export const fetchStartTrip = async (
  startLocation: { latitude: number; longitude: number },
  endLocation: { latitude: number; longitude: number },
) => {
  console.log('Iniciando fetchStartTrip com endereços definidos');

  return {
    tripId: `trip-${Date.now()}`,
    startLocation,
    endLocation,
  };
};

export async function getDistance(
  startLocation: { latitude: number; longitude: number },
  currentPosition: { latitude: number; longitude: number },
) {
  const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const origins = encodeURIComponent(
    `${currentPosition.latitude},${currentPosition.longitude}`,
  );
  const destinations = encodeURIComponent(
    `${startLocation.latitude},${startLocation.longitude}`,
  );
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${VITE_GOOGLE_MAPS_API_KEY}`;

  try {
    console.log(`Fazendo requisição para URL: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na resposta: ${response.statusText}`);
    }

    const data = await response.json();
    if (data?.rows?.length > 0 && data.rows[0].elements.length > 0) {
      const element = data.rows[0].elements[0];
      const distance = element.distance?.text || 'Desconhecido';
      const duration = element.duration?.text || 'Desconhecido';

      console.log(`Distância: ${distance}, Tempo estimado: ${duration}`);
      return { distance, duration };
    } else {
      throw new Error('Dados da API estão em um formato inesperado.');
    }
  } catch (error) {
    console.error('Erro ao calcular a distância:', error);
    return null;
  }
}
