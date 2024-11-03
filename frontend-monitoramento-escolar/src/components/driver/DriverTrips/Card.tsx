import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

type TCard = {
  child: string;
  addressChild: string;
  time: string;
  duration: string;
  addressSchool: string;
};

export function CardDriverTrips({
  addressChild,
  child,
  duration,
  time,
  addressSchool,
}: TCard) {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const { data: childData } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: addressChild,
              key: `${process.env.REACT_APP_GOOGLE_MAPS}`,
            },
          },
        );

        const childLocation = childData.results[0].geometry.location;

        const { data: schoolData } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: addressSchool,
              key: `${process.env.REACT_APP_GOOGLE_MAPS}`,
            },
          },
        );

        const schoolLocation = schoolData.results[0].geometry.location;
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: childLocation,
            destination: schoolLocation,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          },
        );
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    fetchDirections();
  }, [addressChild, addressSchool]);
  return (
    <div>
      <div>Endereço inicial: {addressChild}</div>
      <div>Endereço Final: {addressSchool}</div>
      <div>Criança: {child}</div>
      <div>Tempo estimado: {duration}</div>
      <div>Hora: {time}</div>
      <LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS}`}>
        <GoogleMap mapContainerStyle={containerStyle} zoom={10}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
