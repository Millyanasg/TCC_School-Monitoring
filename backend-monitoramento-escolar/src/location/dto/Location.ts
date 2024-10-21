import { ChildLocations } from '@prisma/client';

export class Location {
  type: ChildLocations['type'];
  location: {
    latitude: number;
    longitude: number;
  };

  static from(childLocation: ChildLocations): Location {
    return {
      type: childLocation.type,
      location: {
        latitude: childLocation.latitude,
        longitude: childLocation.longitude,
      },
    };
  }
}
