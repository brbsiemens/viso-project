import {useJsApiLoader} from '@react-google-maps/api'
import {Map} from './components/Map'
import {defaultCenter} from './constants/mapConstant'

const API_KEY = import.meta.env.VITE_API_MAPS_KEY

function App() {
	const {isLoaded} = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: API_KEY,
	})
	return <>{isLoaded ? <Map center={defaultCenter} /> : <h1>Error</h1>}</>
}

export default App
