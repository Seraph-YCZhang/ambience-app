import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import QuickCheck from '@/components/QuickCheck';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between'>
			<Header />
			<Form />
			<QuickCheck />
			<Footer />
		</main>
	);
}
