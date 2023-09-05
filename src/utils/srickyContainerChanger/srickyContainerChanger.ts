function srickyContainerChanger(isLoading: boolean) {
	console.log('Run srickyContainerChanger');

	const main_container = document.querySelector(
		'.main_container'
	) as HTMLElement;
	const stickyContainer = document.querySelector(
		'.sticky-container'
	) as HTMLDivElement;

	if (isLoading) return;

	stickyContainer.style.height = main_container.clientHeight + 'px';
}
export default srickyContainerChanger;
