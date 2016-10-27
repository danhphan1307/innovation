/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import { LatLngLiteral } from './services/google-maps-types';
export { LatLngBounds, LatLngBoundsLiteral, LatLngLiteral, PolyMouseEvent } from './services/google-maps-types';
/**
 * MouseEvent gets emitted when the user triggers mouse events on the map.
 */
export interface MouseEvent {
    coords: LatLngLiteral;
}
