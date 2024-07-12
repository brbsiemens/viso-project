import {GoogleMap, Marker} from '@react-google-maps/api'
import {useCallback, useRef, useState} from 'react'
import {CenterCoordinatesType} from '../../types/coordinateType'
import {containerStyle, defaultOptions} from '../../constants/mapConstant'
import {app} from '../../firebaseConfig'
import {getDatabase, ref, set, push} from 'firebase/database'
import './style.css'

interface MapCentre {
	center: CenterCoordinatesType
}

const Map = ({center}: MapCentre) => {
	const mapRef = useRef<google.maps.Map | undefined>(undefined)
	const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([])

	const onLoad = useCallback(function callback(map: google.maps.Map) {
		mapRef.current = map
	}, [])
	const onUnmount = useCallback(function callback(map: google.maps.Map) {
		mapRef.current = undefined
	}, [])
	const addMarker = useCallback(
		(e: google.maps.MapMouseEvent) => {
			if (e.latLng) {
				const lat = e.latLng.lat()
				const lng = e.latLng.lng()
				setMarkers([...markers, {lat, lng}])
				saveData()
			}
		},
		[markers],
	)

	const deleteMarker = useCallback(
		(e: google.maps.MapMouseEvent) => {
			if (e.latLng) {
				const lat = e.latLng.lat()
				const lng = e.latLng.lng()
				const filteredMarkers = markers.filter(marker => !(marker.lat === lat && marker.lng === lng))
				setMarkers(filteredMarkers)
			}
		},
		[markers],
	)

	const saveData = async () => {
		const db = getDatabase(app)
		const newDocRef = push(ref(db, 'map/markers'))
		set(newDocRef, {
			location: markers,
		})
	}

	return (
		<div className='container'>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onLoad={onLoad}
				onDblClick={addMarker}
				onUnmount={onUnmount}
				options={defaultOptions}>
				{markers.map((pos: google.maps.LatLngLiteral, i: number) => (
					<Marker
						key={i}
						position={pos}
						onDblClick={deleteMarker}
					/>
				))}
			</GoogleMap>
		</div>
	)
}
export {Map}
