import { LocationProvider, Router, Route, lazy, ErrorBoundary, hydrate, prerender as ssr } from 'preact-iso';
import Home from './pages/home/index.js';
import StatusIndex from './pages/status/index.js';
import NotFound from './pages/_404.js';
import Header from './header.js';

// import Status from './status.js';

// require('./status.js');

// import { StatuspageDictionary, StatuspageHTMLElements, StatuspageWebComponents } from '../../modules/Statuspage.esm.js';

// customElements.define(StatuspageWebComponents.Status.is, class extends HTMLElement {
//     set dataStatus(status) {
//         this.setAttribute('data-status', status);
//     }
// });

// const Status = lazy(() => import('./pages/status/index.js'));

export function App() {
	return (
		<LocationProvider>
			<div class="app">
                {/* <statuspage-status data-status="loading"></statuspage-status> */}
				<Header />
				<ErrorBoundary>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/status/" component={StatusIndex} />
						<Route default component={NotFound} />
					</Router>
				</ErrorBoundary>
			</div>
		</LocationProvider>
	);
}

hydrate(<App />);

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
