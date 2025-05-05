import { useState } from 'preact/hooks';
import Status from '../../status.js';

export default function Home() {
	const [count, setCount] = useState(0);

	return <Status dataStatus="loading"></Status>;
}
