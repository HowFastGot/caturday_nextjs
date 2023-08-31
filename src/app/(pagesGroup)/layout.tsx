import Toolbar from '@/components/Toolbar';

function PagesLayout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Toolbar />
			{children}
		</>
	);
}
export default PagesLayout;
