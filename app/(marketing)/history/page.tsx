import { Metadata } from 'next';
import HistoryClient from './history-client';

export const metadata: Metadata = {
  title: 'Betting History | The Pick AI',
  description: 'View our transparent, verifiable betting history and performance metrics.',
};

export default function HistoryPage() {
  return <HistoryClient />;
}
