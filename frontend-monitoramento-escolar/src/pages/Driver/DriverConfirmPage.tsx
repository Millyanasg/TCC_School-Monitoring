import { Layout } from '@frontend/components/Layout/Layout';
import { ConfirmTrip } from '@frontend/components/driver/ConfirmTrip';
import { OnGoingTrip } from '@frontend/components/driver/OnGoingTrip';

/**
 * DriverConfirmPage component renders the appropriate component based on the trip status.
 * If there is an ongoing trip, it renders the OnGoingTrip component.
 * Otherwise, it renders the ConfirmTrip component.
 *
 * @returns {JSX.Element} The rendered component based on the trip status.
 */
export const DriverConfirmPage = () => {
  const isOnGoingTrip = true;
  return <Layout>{isOnGoingTrip ? <OnGoingTrip /> : <ConfirmTrip />}</Layout>;
};
